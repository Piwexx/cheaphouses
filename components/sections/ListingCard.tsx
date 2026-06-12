'use client'

import { formatPrice } from '@/lib/utils'
import { LISTING_TONES } from '@/lib/data'
import type { AugmentedListing } from '@/types'

interface ListingCardProps {
  listing: AugmentedListing & { _key: number }
}

export default function ListingCard({ listing: l }: ListingCardProps) {
  return (
    <a
      className="listing-card"
      href={l.link ?? '#'}
      target={l.link ? '_blank' : undefined}
      rel={l.link ? 'noopener noreferrer' : undefined}
      aria-label={`${l.title} in ${l.locationShort}`}
    >
      <div
        className="card-img"
        style={{
          background: `url('${l.image}') center/cover, ${LISTING_TONES[l.tone]}`,
        }}
      >
        <span className="card-badge">
          {l.locationShort}
        </span>
        {l.isNew && <span className="card-new-badge">New</span>}
      </div>
      <div className="card-body">
        <div className="card-price">
          <span className="cur-sym">{l.currencySymbol}</span>
          {formatPrice(l.price)}
        </div>
        <div className="card-loc">{l.locationShort}</div>
        <div className="card-title">{l.title}</div>
        <div className="card-meta">
          {l.meta.map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>
      </div>
    </a>
  )
}
