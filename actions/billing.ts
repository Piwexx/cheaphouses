'use server'

import { redirect } from 'next/navigation'
import { getStripeCustomerIdForUser } from '@/lib/db'
import { getPriceId, stripe } from '@/lib/stripe'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { checkoutSchema } from '@/lib/validations'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

// Login is not required to start a checkout: Stripe collects the email and the
// success handler creates/links the account afterwards. If a session exists,
// the checkout is tied to the user up front via client_reference_id.
export async function createCheckoutSessionAction(formData: FormData): Promise<void> {
  const parsed = checkoutSchema.safeParse({ billing: formData.get('billing') })
  if (!parsed.success) throw new Error('Invalid billing cycle')

  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const existingCustomerId = user ? await getStripeCustomerIdForUser(user.id) : null

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: getPriceId(parsed.data.billing), quantity: 1 }],
    success_url: `${SITE_URL}/api/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/#pricing`,
    allow_promotion_codes: true,
    ...(existingCustomerId
      ? { customer: existingCustomerId }
      : user?.email
        ? { customer_email: user.email }
        : {}),
    ...(user ? { client_reference_id: user.id } : {}),
  })

  if (!session.url) throw new Error('Stripe did not return a checkout URL')
  redirect(session.url)
}

export async function createPortalSessionAction(): Promise<void> {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const customerId = await getStripeCustomerIdForUser(user.id)
  if (!customerId) redirect('/#pricing')

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${SITE_URL}/dashboard`,
  })
  redirect(session.url)
}
