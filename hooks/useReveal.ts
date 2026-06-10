'use client'

import { useRef, useState, useEffect } from 'react'

export function useReveal(): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      const t = setTimeout(() => setVisible(true), 0)
      return () => clearTimeout(t)
    }
    const fallback = setTimeout(() => setVisible(true), 600)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          clearTimeout(fallback)
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(ref.current)
    return () => {
      clearTimeout(fallback)
      io.disconnect()
    }
  }, [])

  return [ref, visible]
}
