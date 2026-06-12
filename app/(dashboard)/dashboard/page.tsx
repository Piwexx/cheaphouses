import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createPortalSessionAction } from '@/actions/billing'
import { getSubscriptionForUser } from '@/lib/db'
import { getBillingFromPriceId } from '@/lib/stripe'
import { getCurrentUser } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Dashboard — Cheap Houses',
}

const STATUS_LABELS: Record<string, string> = {
  trialing:           'Trial',
  active:             'Active',
  past_due:           'Past due',
  canceled:           'Canceled',
  unpaid:             'Unpaid',
  incomplete:         'Incomplete',
  incomplete_expired: 'Expired',
  paused:             'Paused',
}

function statusTone(status: string): 'ok' | 'warn' | 'muted' {
  if (status === 'active' || status === 'trialing') return 'ok'
  if (status === 'past_due' || status === 'unpaid' || status === 'incomplete') return 'warn'
  return 'muted'
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day:   'numeric',
    year:  'numeric',
  })
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>
}) {
  const { welcome } = await searchParams
  const user = await getCurrentUser()
  if (!user) redirect('/login')

  const subscription = await getSubscriptionForUser(user.id)
  const hasMembership = subscription !== null && subscription.status !== 'canceled'

  return (
    <div className="dash-inner">
      {welcome === '1' && (
        <div className="dash-welcome" role="status">
          Welcome aboard — your membership is live. Friday&apos;s full issue is on its way.
        </div>
      )}

      <div className="section-label">Membership</div>
      <h1 className="dash-title">Your subscription</h1>

      {hasMembership ? (
        <div className="dash-card">
          <div className="dash-row">
            <span className="dash-key">Plan</span>
            <span className="dash-val">
              {getBillingFromPriceId(subscription.priceId) === 'annual'
                ? 'Annual — $120 / year'
                : 'Monthly — $12 / month'}
            </span>
          </div>
          <div className="dash-row">
            <span className="dash-key">Status</span>
            <span className={`dash-badge dash-badge--${statusTone(subscription.status)}`}>
              {STATUS_LABELS[subscription.status] ?? subscription.status}
            </span>
          </div>
          {subscription.currentPeriodEnd && (
            <div className="dash-row">
              <span className="dash-key">
                {subscription.cancelAtPeriodEnd ? 'Ends on' : 'Renews on'}
              </span>
              <span className="dash-val">{formatDate(subscription.currentPeriodEnd)}</span>
            </div>
          )}
          {subscription.cancelAtPeriodEnd && (
            <p className="dash-note">
              Your membership is set to cancel at the end of the period. You can resume
              it any time before then.
            </p>
          )}
          {subscription.status === 'past_due' && (
            <p className="dash-note dash-note--warn">
              Your last payment didn&apos;t go through. Update your payment method to keep
              your membership active.
            </p>
          )}
          <form action={createPortalSessionAction}>
            <button type="submit" className="plan-cta plan-cta--accent plan-cta--full">
              Manage subscription
            </button>
          </form>
          <p className="plan-fine">
            Change plan, update payment method or cancel — handled securely by Stripe.
          </p>
        </div>
      ) : (
        <div className="dash-card">
          <p className="dash-empty">
            {subscription?.status === 'canceled'
              ? 'Your membership has ended. Rejoin any time — the archive will be waiting.'
              : "You don't have an active membership yet."}
          </p>
          <Link href="/#pricing" className="plan-cta plan-cta--accent plan-cta--full">
            Become a member
          </Link>
        </div>
      )}
    </div>
  )
}
