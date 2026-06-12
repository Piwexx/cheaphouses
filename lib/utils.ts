import { createElement, Fragment } from 'react'
import type { ReactNode } from 'react'
import type { Listing, AugmentedListing, FilterValues, SortOption } from '@/types'

export function emph(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) =>
    p.startsWith('**')
      ? createElement('strong', { key: i }, p.slice(2, -2))
      : createElement(Fragment, { key: i }, p)
  )
}

export function extractState(locationShort: string): string {
  const idx = locationShort.lastIndexOf(',')
  return idx === -1 ? '' : locationShort.slice(idx + 1).trim()
}

export function augmentListings(listings: Listing[]): AugmentedListing[] {
  return listings.map(l => {
    const p = parseInt(l.price.replace(/[.,]/g, '').replace(/[^0-9]/g, ''), 10) || 0

    const meta = l.meta.join(' ').toLowerCase()
    let _cond: AugmentedListing['_cond'] = 'partial'
    if (meta.includes('move-in') || meta.includes('habitable')) _cond = 'good'
    else if (meta.includes('fixer') || meta.includes('ruin') || meta.includes('reno obligation') || meta.includes('vacant')) _cond = 'ruin'
    else if (meta.includes('cosmetic') || meta.includes('light reno') || meta.includes('new roof')) _cond = 'average'

    const t = l.title.toLowerCase()
    let _type: AugmentedListing['_type'] = 'village'
    if (meta.includes('off-grid') || meta.includes('off grid') || t.includes('off-grid') || t.includes('off grid')) {
      _type = 'offgrid'
    } else if (t.includes('ranch') || meta.includes('ranch')) {
      _type = 'ranch'
    } else if (t.includes('cabin') || t.includes('camp')) {
      _type = 'cabin'
    } else if (t.includes('farmhouse') || t.includes('bungalow')) {
      _type = 'farmhouse'
    } else if (t.includes('cottage')) {
      _type = 'cottage'
    } else if (t.includes('akiya') || meta.includes('akiya')) {
      _type = 'akiya'
    }

    return { ...l, _p: p, _cond, _type }
  })
}

export function filterListings(
  all: AugmentedListing[],
  filters: FilterValues,
  sortBy: SortOption,
): AugmentedListing[] {
  const matchPrice = (p: number, v: string): boolean => {
    if (v === 'all')      return true
    if (v === 'under20')  return p < 20_000
    if (v === 'under50')  return p >= 20_000 && p < 50_000
    if (v === 'under100') return p >= 50_000 && p < 100_000
    if (v === 'under200') return p >= 100_000 && p < 200_000
    return false
  }
  const matchCond = (c: string, v: string): boolean => {
    if (v === 'all') return true
    if (v === 'livable') return c === 'good' || c === 'average'
    return c === v
  }

  const list = all.filter(l =>
    matchPrice(l._p, filters.price) &&
    (filters.type === 'all' || l._type === filters.type) &&
    matchCond(l._cond, filters.condition) &&
    (filters.state === 'all' || extractState(l.locationShort) === filters.state)
  )

  return [...list].sort((a, b) =>
    sortBy === 'price-asc' ? a._p - b._p
    : sortBy === 'price-desc' ? b._p - a._p
    : (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
  )
}
