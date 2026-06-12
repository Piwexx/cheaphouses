'use client'

import { useState } from 'react'
import { ChevronIcon } from '@/components/ui/icons'
import type { Faq } from '@/lib/db'

interface FAQItemProps {
  item: Faq
}

export default function FAQItem({ item }: FAQItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`faq-item${open ? ' is-open' : ''}`}>
      <button
        className="faq-item__q"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{item.question}</span>
        <span className="faq-icon">
          <ChevronIcon />
        </span>
      </button>
      <div
        className="faq-item__a-wrap"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="faq-item__a-inner">
          <p className="faq-ans">
            {item.answer}
            {item.linkHref && item.linkText && (
              <>
                {' '}
                <a className="faq-ans-link" href={item.linkHref}>
                  {item.linkText} →
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
