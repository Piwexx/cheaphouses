'use client'

import { useState } from 'react'
import { createCheckoutSessionAction } from '@/actions/billing'
import { CheckIcon } from '@/components/ui/icons'
import type { BillingCycle } from '@/types'

export default function Pricing() {
  const [billing, setBilling] = useState<BillingCycle>('annual')
  const price = billing === 'annual' ? '10' : '12'

  return (
    <section className="pricing reveal in" id="pricing">
      <div className="pricing-inner">
        <div className="section-label">Membership</div>
        <div className="pricing-header">
          <h2 className="pricing-h2">
            Two ways to read <em>Cheap Houses</em>
          </h2>
          <p className="pricing-sub">
            The newsletter is free, forever. Membership unlocks every listing we
            find &mdash; the full archive, direct seller &amp; municipal contacts,
            and search on the members&apos; platform.
          </p>
          <div className="billing-toggle">
            <button
              className={`billing-btn${billing === 'monthly' ? ' active' : ''}`}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </button>
            <button
              className={`billing-btn${billing === 'annual' ? ' active' : ''}`}
              onClick={() => setBilling('annual')}
            >
              Annual <span className="billing-save">Save 17%</span>
            </button>
          </div>
        </div>

        <div className="pricing-grid">
          <div className="plan-card plan-card--free">
            <div className="plan-eyebrow">Free</div>
            <div className="plan-price-row">
              <span className="plan-price-num">Free</span>
              <span className="plan-price-period">/ forever</span>
            </div>
            <p className="plan-desc">
              Eight hand-picked properties every Friday. No credit card, no catch.
            </p>
            <div className="plan-divider" />
            <ul className="plan-features">
              <li><CheckIcon /><span>8 properties per issue</span></li>
              <li><CheckIcon /><span>Curator&apos;s note on every listing</span></li>
              <li><CheckIcon /><span>All 50 states covered</span></li>
              <li><CheckIcon /><span>Delivered every Friday</span></li>
            </ul>
            <a href="#signup" className="plan-cta plan-cta--outline">
              Get the free newsletter
            </a>
          </div>

          <div className="plan-card plan-card--member">
            <div className="plan-eyebrow plan-eyebrow--accent">Member</div>
            <div className="plan-price-row">
              <span className="plan-price-num">
                <span className="cur-sym">$</span>{price}
              </span>
              <span className="plan-price-period">
                / month{billing === 'annual' ? ', billed annually' : ''}
              </span>
            </div>
            <p className="plan-desc">
              The complete picture. Every property we find, the contacts you need to act
              on it, and a platform to browse it all — no agents, no waiting.
            </p>
            <div className="plan-divider" />
            <ul className="plan-features">
              <li><CheckIcon /><span>20+ properties per issue, full archive</span></li>
              <li><CheckIcon /><span>Direct seller &amp; municipal contacts</span></li>
              <li><CheckIcon /><span>Renovation estimates where available</span></li>
              <li><CheckIcon /><span>Search by state, budget &amp; condition</span></li>
              <li><CheckIcon /><span>Browse every listing on the members&apos; platform</span></li>
              <li><CheckIcon /><span>No ads, no agents, no commission</span></li>
            </ul>
            <form action={createCheckoutSessionAction}>
              <input type="hidden" name="billing" value={billing} />
              <button type="submit" className="plan-cta plan-cta--accent plan-cta--full">
                Become a member
              </button>
            </form>
            <p className="plan-fine">Cancel any time · No lock-in</p>
          </div>
        </div>
      </div>
    </section>
  )
}
