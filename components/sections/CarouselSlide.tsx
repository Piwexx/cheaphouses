'use client'

import { emph } from '@/lib/utils'
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
      <a
        className="pick-img"
        href={l.link ?? '#'}
        target={l.link ? '_blank' : undefined}
        rel={l.link ? 'noopener noreferrer' : undefined}
        aria-label={l.link ? `View original listing: ${l.title}` : undefined}
        style={{
          display: 'block',
          background: `url('${l.image}') center/cover, ${LISTING_TONES[l.tone]}`,
          cursor: l.link ? 'pointer' : 'default',
        }}
      >
        <div className="pick-img-grain" aria-hidden="true" />
        <div className="pick-price-badge">
          <small>Asking price</small>
          <span>
            <span className="cur-sym">{l.currencySymbol}</span>
            {l.price}
          </span>
        </div>
        <div className="pick-country-badge">
          {l.stateShort}
        </div>
      </a>
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
        {l.link && (
          <a
            className="view-listing-link"
            href={l.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View original listing →
          </a>
        )}
      </div>
    </div>
  )
}
