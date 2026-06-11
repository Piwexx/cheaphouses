'use client'

import { useState, useRef } from 'react'
import type { Listing } from '@/types'
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/icons'
import CarouselSlide from './CarouselSlide'

interface PicksCarouselProps {
  listings: Listing[]
}

export default function PicksCarousel({ listings: slides }: PicksCarouselProps) {
  const [idx, setIdx] = useState(0)
  const [expandedKeys, setExpandedKeys] = useState(new Set<number>())
  const touchXRef = useRef(0)

  const safeIdx = Math.min(idx, slides.length - 1)
  const go = (i: number) => setIdx(Math.max(0, Math.min(slides.length - 1, i)))

  const isExpanded = (id: number) => expandedKeys.has(id)
  const toggleExpanded = (id: number) =>
    setExpandedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })

  const onTouchStart = (e: React.TouchEvent) => {
    touchXRef.current = e.changedTouches[0].screenX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].screenX - touchXRef.current
    if (Math.abs(dx) > 40) go(dx < 0 ? safeIdx + 1 : safeIdx - 1)
  }

  return (
    <section className="sample" id="picks">
      <div className="sample-inner">
        <div className="section-label">Recent picks</div>
        <div
          className="carousel-outer"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') go(safeIdx - 1)
            if (e.key === 'ArrowRight') go(safeIdx + 1)
          }}
        >
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${safeIdx * 100}%)` }}
          >
            {slides.map((l) => (
              <CarouselSlide
                key={l.id}
                listing={l}
                expanded={isExpanded(l.id)}
                onToggle={() => toggleExpanded(l.id)}
              />
            ))}
          </div>
        </div>
        <div className="carousel-nav">
          <span className="c-count">
            {safeIdx + 1} / {slides.length}
          </span>
          <div className="c-dots" role="tablist" aria-label="Carousel pages">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`c-dot${i === safeIdx ? ' active' : ''}`}
                aria-label={`Go to pick ${i + 1}`}
                aria-current={i === safeIdx ? true : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <div className="c-arrows">
            <button
              className="c-arrow"
              aria-label="Previous pick"
              onClick={() => go(safeIdx - 1)}
              disabled={safeIdx === 0}
            >
              <ArrowLeftIcon />
            </button>
            <button
              className="c-arrow"
              aria-label="Next pick"
              onClick={() => go(safeIdx + 1)}
              disabled={safeIdx === slides.length - 1}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
