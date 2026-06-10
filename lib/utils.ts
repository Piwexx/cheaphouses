import { createElement, Fragment } from 'react'
import type { ReactNode } from 'react'
import type { Listing, AugmentedListing, FilterValues, SortOption } from '@/types'
import { COUNTRY_CODE } from '@/lib/data'

export function formatPrice(raw: string, sym: string): string {
  const num = parseInt(raw.replace(/[.,\s]/g, ''), 10)
  if (sym === '¥' && num >= 1_000_000) {
    const m = num / 1_000_000
    return (m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)) + 'M'
  }
  return num.toLocaleString('en-US')
}

export function emph(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) =>
    p.startsWith('**')
      ? createElement('strong', { key: i }, p.slice(2, -2))
      : createElement(Fragment, { key: i }, p)
  )
}

export function augmentListings(listings: Listing[]): AugmentedListing[] {
  return listings.map(l => {
    let p: number
    if (l.currencySymbol === '¥')
      p = Math.round(parseFloat(l.price.replace(/[^0-9]/g, '')) / 150)
    else if (l.currencySymbol === 'CA$')
      p = Math.round(parseFloat(l.price.replace(/[^0-9]/g, '')) / 1.35)
    else
      p = parseInt(l.price.replace(/[.,]/g, '').replace(/[^0-9]/g, ''), 10) || 0

    const meta = l.meta.join(' ').toLowerCase()
    let _cond: AugmentedListing['_cond'] = 'partial'
    if (meta.includes('move-in') || meta.includes('habitable')) _cond = 'good'
    else if (meta.includes('fixer') || meta.includes('ruin') || meta.includes('reno obligation') || meta.includes('vacant')) _cond = 'ruin'
    else if (meta.includes('cosmetic') || meta.includes('light reno') || meta.includes('new roof')) _cond = 'average'

    const t = l.title.toLowerCase()
    let _type: AugmentedListing['_type'] = 'village'
    if (t.includes('akiya') || t.includes('kominka') || t.includes('minka')) _type = 'akiya'
    else if (t.includes('farmhouse') || t.includes('quinta') || t.includes('longère') || t.includes('bungalow')) _type = 'farmhouse'
    else if (t.includes('cottage') || t.includes('cabin')) _type = 'cottage'

    return { ...l, _p: p, _cc: COUNTRY_CODE[l.country] || 'xx', _cond, _type }
  })
}

export function filterListings(
  all: AugmentedListing[],
  filters: FilterValues,
  sortBy: SortOption,
): AugmentedListing[] {
  const matchPrice = (p: number, v: string): boolean => {
    if (v === 'all') return true
    if (v === 'under20') return p < 20000
    if (v === 'under50') return p >= 20000 && p < 50000
    if (v === 'under100') return p >= 50000 && p < 100000
    return p >= 100000
  }
  const matchCond = (c: string, v: string): boolean => {
    if (v === 'all') return true
    if (v === 'livable') return c === 'good' || c === 'average'
    return c === v
  }

  const list = all.filter(l =>
    (filters.country === 'all' || l._cc === filters.country) &&
    matchPrice(l._p, filters.price) &&
    (filters.type === 'all' || l._type === filters.type) &&
    matchCond(l._cond, filters.condition)
  )

  return [...list].sort((a, b) =>
    sortBy === 'price-asc' ? a._p - b._p
    : sortBy === 'price-desc' ? b._p - a._p
    : (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
  )
}
