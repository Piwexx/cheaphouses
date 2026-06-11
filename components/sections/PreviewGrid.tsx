'use client'

import { useState, useMemo, useEffect } from 'react'
import { FILTER_DEFS, FILTER_DEFAULTS, PILL_LABELS } from '@/lib/data'
import { filterListings } from '@/lib/utils'
import { SlidersIcon, XIcon } from '@/components/ui/icons'
import ListingCard from './ListingCard'
import type { AugmentedListing, FilterValues, SortOption } from '@/types'

interface PreviewGridProps {
  listings: AugmentedListing[]
}

export default function PreviewGrid({ listings: allListings }: PreviewGridProps) {
  const [filters, setFilters] = useState<FilterValues>({ ...FILTER_DEFAULTS })
  const [pending, setPending] = useState<FilterValues>({ ...FILTER_DEFAULTS })
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = useMemo(
    () => filterListings(allListings, filters, sortBy),
    [allListings, filters, sortBy],
  )
  const items = useMemo(() => {
    const src = filtered.length > 0 ? filtered : allListings
    return Array.from(
      { length: src.length },
      (_, i) => ({ ...src[i], _key: i }),
    )
  }, [filtered, allListings])

  const activeCount = Object.values(filters).filter((v) => v !== 'all').length
  const activePills = Object.entries(filters)
    .filter(([, v]) => v !== 'all')
    .map(([group, val]) => ({
      group: group as keyof FilterValues,
      label: PILL_LABELS[group]?.[val] || val,
    }))

  const openModal = () => {
    setPending({ ...filters })
    setModalOpen(true)
  }
  const applyFilters = () => {
    setFilters({ ...pending })
    setModalOpen(false)
  }
  const clearAll = () => {
    setFilters({ ...FILTER_DEFAULTS })
    setPending({ ...FILTER_DEFAULTS })
    setModalOpen(false)
  }

  const pendingCount = useMemo(
    () => filterListings(allListings, pending, sortBy).length,
    [allListings, pending, sortBy],
  )

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  return (
    <section className="preview reveal in" id="preview">
      <div className="preview-inner">
        <div className="preview-header">
          <div className="preview-header-left">
            <h2 className="preview-h2">
              From this month&apos;s <em>shortlist</em>
            </h2>
            <p className="preview-sub">{filtered.length} of 200+ properties reviewed</p>
          </div>
        </div>

        <div className="preview-filter-bar">
          <button
            className={`filter-trigger${activeCount > 0 ? ' has-filters' : ''}`}
            onClick={openModal}
          >
            <SlidersIcon />
            Filters
            {activeCount > 0 && (
              <span className="filter-badge">{activeCount}</span>
            )}
          </button>
          <div className="filter-active-pills">
            {activePills.map(({ group, label }) => (
              <button
                key={group}
                className="active-pill"
                onClick={() =>
                  setFilters((f) => ({ ...f, [group]: 'all' }))
                }
              >
                {label} <span className="active-pill-x">&times;</span>
              </button>
            ))}
          </div>
          {activeCount > 0 && (
            <button className="clear-all-btn" onClick={clearAll}>
              Clear all
            </button>
          )}
          <div className="sort-wrap">
            <label className="sort-label" htmlFor="preview-sort">
              Sort
            </label>
            <select
              className="sort-select"
              id="preview-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="newest">Newest first</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="listings-grid">
            {items.map((l) => (
              <ListingCard listing={l} key={l._key} />
            ))}
          </div>
        ) : (
          <div className="preview-no-results">
            <p className="preview-no-icon">&#8709;</p>
            <p className="preview-no-title">No listings match these filters.</p>
            <button className="preview-no-clear" onClick={clearAll}>
              Clear filters
            </button>
          </div>
        )}
      </div>

      {modalOpen && (
        <>
          <div
            className="filter-overlay open"
            onClick={() => setModalOpen(false)}
          />
          <div
            className="filter-modal open"
            role="dialog"
            aria-label="Filters"
            aria-modal="true"
          >
            <div className="filter-modal-header">
              <span className="filter-modal-title">Filters</span>
              <button
                className="filter-modal-close"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                <XIcon />
              </button>
            </div>
            <div className="filter-modal-body">
              {FILTER_DEFS.map(({ group, title, options }) => (
                <div className="filter-section" key={group}>
                  <div className="filter-section-title">{title}</div>
                  <div className="modal-pills">
                    {options.map(({ val, label }) => (
                      <button
                        key={val}
                        className={`modal-pill${pending[group] === val ? ' active' : ''}`}
                        onClick={() =>
                          setPending((p) => ({ ...p, [group]: val }))
                        }
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="filter-modal-footer">
              <button
                className="filter-clear-btn"
                onClick={() => setPending({ ...FILTER_DEFAULTS })}
              >
                Clear all
              </button>
              <button className="filter-apply-btn" onClick={applyFilters}>
                Show {pendingCount} result{pendingCount !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
