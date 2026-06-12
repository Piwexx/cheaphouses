import { NextResponse, type NextRequest } from 'next/server'
import type Stripe from 'stripe'
import { createSessionTokenForEmail, findOrCreateUserByEmail } from '@/lib/auth'
import { stripe, syncStripeSubscription } from '@/lib/stripe'
import { createSupabaseServerClient, getCurrentUser } from '@/lib/supabase/server'

// Stripe redirects here after a successful checkout. The webhook may or may not
// have arrived yet, so this handler does its own (idempotent) sync before
// logging the buyer in and sending them to the dashboard.
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id')
  if (!sessionId) {
    return NextResponse.redirect(new URL('/#pricing', request.url))
  }

  // Canonical state comes from Stripe — never trust query params beyond the id
  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription'],
    })
  } catch {
    return NextResponse.redirect(new URL('/#pricing', request.url))
  }

  const email = session.customer_details?.email
  const subscription = session.subscription as Stripe.Subscription | null
  if (
    session.payment_status !== 'paid' ||
    session.status !== 'complete' ||
    !email ||
    !subscription
  ) {
    return NextResponse.redirect(new URL('/#pricing', request.url))
  }

  const { id: userId } = await findOrCreateUserByEmail(email)
  await syncStripeSubscription(subscription, userId)

  // Auto-login unless a session for the buyer's email already exists. The
  // subscription belongs to whoever paid, so a session under another email
  // gets replaced by one for the checkout email.
  const currentUser = await getCurrentUser()
  if (currentUser?.email?.toLowerCase() !== email.toLowerCase()) {
    try {
      const tokenHash = await createSessionTokenForEmail(email)
      const supabase = await createSupabaseServerClient()
      const { error } = await supabase.auth.verifyOtp({
        type: 'email',
        token_hash: tokenHash,
      })
      if (error) throw error
    } catch {
      // Payment and sync succeeded — worst case the user logs in manually
      return NextResponse.redirect(new URL('/login?from=checkout', request.url))
    }
  }

  return NextResponse.redirect(new URL('/dashboard?welcome=1', request.url))
}
