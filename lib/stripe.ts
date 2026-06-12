import Stripe from 'stripe'
import { z } from 'zod'
import { upsertSubscription } from '@/lib/db'
import type { BillingCycle } from '@/types'

const envSchema = z.object({
  STRIPE_SECRET_KEY:    z.string().min(1, 'STRIPE_SECRET_KEY is required'),
  STRIPE_PRICE_MONTHLY: z.string().min(1, 'STRIPE_PRICE_MONTHLY is required'),
  STRIPE_PRICE_ANNUAL:  z.string().min(1, 'STRIPE_PRICE_ANNUAL is required'),
})

const env = envSchema.parse({
  STRIPE_SECRET_KEY:    process.env.STRIPE_SECRET_KEY,
  STRIPE_PRICE_MONTHLY: process.env.STRIPE_PRICE_MONTHLY,
  STRIPE_PRICE_ANNUAL:  process.env.STRIPE_PRICE_ANNUAL,
})

export const stripe = new Stripe(env.STRIPE_SECRET_KEY)

export function getPriceId(billing: BillingCycle): string {
  return billing === 'annual' ? env.STRIPE_PRICE_ANNUAL : env.STRIPE_PRICE_MONTHLY
}

export function getBillingFromPriceId(priceId: string): BillingCycle | null {
  if (priceId === env.STRIPE_PRICE_ANNUAL) return 'annual'
  if (priceId === env.STRIPE_PRICE_MONTHLY) return 'monthly'
  return null
}

function epochToIso(seconds: number | null | undefined): string | null {
  return seconds ? new Date(seconds * 1000).toISOString() : null
}

/**
 * Single source of truth for persisting a subscription: maps the canonical
 * Stripe object to our DB row. Idempotent (upsert by stripe_subscription_id),
 * so the webhook and the checkout success handler can both call it in any order.
 */
export async function syncStripeSubscription(
  sub: Stripe.Subscription,
  userId: string,
): Promise<void> {
  // Since the "basil" API version, current_period_* lives on the item, not the subscription
  const item = sub.items.data[0]
  if (!item) throw new Error(`syncStripeSubscription: subscription ${sub.id} has no items`)

  await upsertSubscription({
    userId,
    stripeCustomerId:     typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
    stripeSubscriptionId: sub.id,
    priceId:              item.price.id,
    status:               sub.status,
    cancelAtPeriodEnd:    sub.cancel_at_period_end,
    currentPeriodStart:   epochToIso(item.current_period_start),
    currentPeriodEnd:     epochToIso(item.current_period_end),
  })
}
