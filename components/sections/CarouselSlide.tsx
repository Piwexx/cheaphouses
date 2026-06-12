'use client'

import { formatPrice, emph } from '@/lib/utils'
import { LISTING_TONES } from '@/lib/data'
import type { Listing } from '@/types'

interface CarouselSlideProps {
  listing: Listing
  expanded: boolean
  onToggle: () => void
}

export default function CarouselSlide({ listing: l, expanded, onToggle }: CarouselSlideProps) {
  return (
    <div className="pick-slide" role="listitem">
      <div
        className="pick-img"
        style={{
          background: `url('${l.image}') center/cover, ${LISTING_TONES[l.tone]}`,
        }}
      >
        <div className="pick-img-grain" aria-hidden="true" />
        <div className="pick-price-badge">
          <small>Asking price</small>
          <span>
            <span className="cur-sym">{l.currencySymbol}</span>
            {formatPrice(l.price)}
          </span>
        </div>
        <div className="pick-country-badge">
          {l.countryShort}
        </div>
      </div>
      <div className="pick-body">
        <p className="pick-loc">{l.location}</p>
        <h3 className="pick-title">{l.title}</h3>
        <div className="pick-meta">
          {l.meta.map((m, i) => (
            <span key={i} className="pick-meta-tag">{m}</span>
          ))}
        </div>
        <div className="curator-eyebrow">Curator&apos;s note</div>
        <p className={`curator-text${expanded ? ' expanded' : ''}`}>
          {emph(l.note)}
        </p>
        <button className="read-more-btn" onClick={onToggle} aria-expanded={expanded}>
          {expanded ? 'Read less' : 'Read more'}
        </button>
      </div>
    </div>
  )
}
