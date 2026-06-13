'use client'

import { useActionState } from 'react'
import {
  createListingAction,
  updateListingAction,
  type ListingFormState,
} from '@/actions/listings'
import { listingToneValues } from '@/lib/validations'
import type { Listing } from '@/types'

const initialState: ListingFormState = { status: 'idle' }

export default function ListingForm({ listing }: { listing?: Listing }) {
  const isEdit = listing !== undefined
  const [state, formAction, pending] = useActionState(
    isEdit ? updateListingAction : createListingAction,
    initialState,
  )

  return (
    <form action={formAction} noValidate className="listing-form">
      {isEdit && <input type="hidden" name="id" value={listing.id} />}

      <label className="auth-label" htmlFor="listing-title">Title</label>
      <input
        id="listing-title"
        type="text"
        name="title"
        className="auth-input"
        placeholder="Brick farmhouse on 2 acres"
        defaultValue={listing?.title}
        required
      />

      <div className="listing-form-grid">
        <div>
          <label className="auth-label" htmlFor="listing-state">State</label>
          <input
            id="listing-state"
            type="text"
            name="state"
            className="auth-input"
            placeholder="Tennessee"
            defaultValue={listing?.state}
            required
          />
        </div>
        <div>
          <label className="auth-label" htmlFor="listing-state-short">State code</label>
          <input
            id="listing-state-short"
            type="text"
            name="stateShort"
            className="auth-input"
            placeholder="TN"
            defaultValue={listing?.stateShort}
            required
          />
        </div>
        <div>
          <label className="auth-label" htmlFor="listing-location">Location</label>
          <input
            id="listing-location"
            type="text"
            name="location"
            className="auth-input"
            placeholder="Unicoi County, Tennessee"
            defaultValue={listing?.location}
            required
          />
        </div>
        <div>
          <label className="auth-label" htmlFor="listing-location-short">Short location</label>
          <input
            id="listing-location-short"
            type="text"
            name="locationShort"
            className="auth-input"
            placeholder="Unicoi Co., TN"
            defaultValue={listing?.locationShort}
            required
          />
        </div>
        <div>
          <label className="auth-label" htmlFor="listing-price">Price</label>
          <input
            id="listing-price"
            type="text"
            name="price"
            className="auth-input"
            placeholder="42,000"
            defaultValue={listing?.price}
            required
          />
        </div>
        <div>
          <label className="auth-label" htmlFor="listing-currency">Currency symbol</label>
          <input
            id="listing-currency"
            type="text"
            name="currencySymbol"
            className="auth-input"
            placeholder="$"
            defaultValue={listing?.currencySymbol ?? '$'}
            required
          />
        </div>
        <div>
          <label className="auth-label" htmlFor="listing-tone">Tone</label>
          <select
            id="listing-tone"
            name="tone"
            className="auth-input"
            defaultValue={listing?.tone ?? 'olive'}
          >
            {listingToneValues.map(tone => (
              <option key={tone} value={tone}>{tone}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="auth-label" htmlFor="listing-link">Listing URL (optional)</label>
          <input
            id="listing-link"
            type="url"
            name="link"
            className="auth-input"
            placeholder="https://www.zillow.com/…"
            defaultValue={listing?.link ?? ''}
          />
        </div>
      </div>

      <label className="auth-label" htmlFor="listing-meta">Details — one per line</label>
      <textarea
        id="listing-meta"
        name="meta"
        className="auth-input"
        rows={3}
        placeholder={'3 rooms\n110 m²\nFixer-upper'}
        defaultValue={listing?.meta.join('\n')}
        required
      />

      <label className="auth-label" htmlFor="listing-note">Note — use **bold** for emphasis</label>
      <textarea
        id="listing-note"
        name="note"
        className="auth-input"
        rows={4}
        placeholder="Solid bones, **new roof in 2023**, walking distance to the square."
        defaultValue={listing?.note}
        required
      />

      <label className="auth-label" htmlFor="listing-image-file">Image — upload a file…</label>
      <input
        id="listing-image-file"
        type="file"
        name="imageFile"
        className="auth-input"
        accept="image/*"
      />

      <label className="auth-label" htmlFor="listing-image-url">…or paste an image URL</label>
      <input
        id="listing-image-url"
        type="url"
        name="imageUrl"
        className="auth-input"
        placeholder="https://images.unsplash.com/…"
      />

      {isEdit && (
        <>
          <input type="hidden" name="currentImage" value={listing.image} />
          <div
            className="admin-img-preview"
            style={{ backgroundImage: `url('${listing.image}')` }}
            role="img"
            aria-label="Current image"
          />
          <p className="dash-note">
            Leave both image fields empty to keep the current image.
          </p>
        </>
      )}

      <label className="admin-check" htmlFor="listing-is-new">
        <input
          id="listing-is-new"
          type="checkbox"
          name="isNew"
          defaultChecked={listing?.isNew ?? false}
        />
        Mark as new
      </label>

      <label className="admin-check" htmlFor="listing-published">
        <input
          id="listing-published"
          type="checkbox"
          name="published"
          defaultChecked={listing?.published ?? true}
        />
        Published
      </label>

      {state.status === 'error' && (
        <div className="signup__error" role="alert">{state.message}</div>
      )}

      <button type="submit" className="auth-btn" disabled={pending}>
        {pending
          ? 'Saving…'
          : isEdit ? 'Save changes' : 'Create listing'}
      </button>
    </form>
  )
}
