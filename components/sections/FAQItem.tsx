'use client'

import { useState } from 'react'
import { ChevronIcon } from '@/components/ui/icons'

interface FAQItemProps {
  item: {
    q: string
    a: string
    link?: { text: string; href: string }
  }
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
        <span>{item.q}</span>
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
            {item.a}
            {item.link && (
              <>
                {' '}
                <a className="faq-ans-link" href={item.link.href}>
                  {item.link.text} →
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
