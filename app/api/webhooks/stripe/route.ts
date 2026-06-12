import type Stripe from 'stripe'
import { z } from 'zod'
import { findOrCreateUserByEmail } from '@/lib/auth'
import { getUserIdByStripeCustomerId } from '@/lib/db'
import { stripe, syncStripeSubscription } from '@/lib/stripe'

const env = z
  .object({ STRIPE_WEBHOOK_SECRET: z.string().min(1, 'STRIPE_WEBHOOK_SECRET is required') })
  .parse({ STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET })

async function syncByCustomerId(sub: Stripe.Subscription): Promise<void> {
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id
  const userId = await getUserIdByStripeCustomerId(customerId)
  // No row yet means checkout.session.completed hasn't been processed — that
  // event carries the email needed to resolve the user, so let it do the insert.
  if (userId) await syncStripeSubscription(sub, userId)
}

export async function POST(request: Request) {
  const body = await request.text() // raw body — required for signature verification
  const signature = request.headers.get('stripe-signature')
  if (!signature) return new Response('Missing signature', { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET)
  } catch {
    return new Response('Invalid signature', { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      if (session.mode !== 'subscription' || !session.subscription) break

      const email = session.customer_details?.email
      const userId =
        session.client_reference_id ??
        (email ? (await findOrCreateUserByEmail(email)).id : null)
      if (!userId) break

      const subscriptionId =
        typeof session.subscription === 'string'
          ? session.subscription
          : session.subscription.id
      const sub = await stripe.subscriptions.retrieve(subscriptionId)
      await syncStripeSubscription(sub, userId)
      break
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      await syncByCustomerId(event.data.object)
      break
    }

    case 'invoice.paid':
    case 'invoice.payment_failed': {
      // Since the "basil" API version the subscription ref lives on invoice.parent
      const ref = event.data.object.parent?.subscription_details?.subscription
      const subscriptionId = typeof ref === 'string' ? ref : ref?.id
      if (subscriptionId) {
        const sub = await stripe.subscriptions.retrieve(subscriptionId)
        await syncByCustomerId(sub)
      }
      break
    }
  }

  return new Response(null, { status: 200 })
}
