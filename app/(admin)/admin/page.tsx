import type { Metadata } from 'next'
import Link from 'next/link'
import DeleteListingButton from '@/components/forms/DeleteListingButton'
import PublishToggle from '@/components/forms/PublishToggle'
import { getAllListingsAdmin } from '@/lib/db'
import { requireAdmin } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Admin — Cheap Houses',
}

export default async function AdminPage() {
  await requireAdmin()
  const listings = await getAllListingsAdmin()

  return (
    <div className="admin-inner">
      <div className="section-label">Admin</div>
      <div className="admin-toolbar">
        <h1 className="admin-title">Listings</h1>
        <Link href="/admin/listings/new" className="admin-cta">New listing</Link>
      </div>

      <div className="admin-table-wrap">
        {listings.length === 0 ? (
          <p className="admin-empty">No listings yet — create the first one.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Property</th>
                <th>Price</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {listings.map(listing => (
                <tr key={listing.id}>
                  <td>
                    <div
                      className="admin-thumb"
                      style={{ backgroundImage: `url('${listing.image}')` }}
                      role="img"
                      aria-label={listing.title}
                    />
                  </td>
                  <td>
                    <div className="admin-row-title">{listing.title}</div>
                    <div className="admin-row-sub">
                      {listing.locationShort}
                      {listing.isNew && ' · New'}
                    </div>
                  </td>
                  <td>{listing.currencySymbol}{listing.price}</td>
                  <td>
                    <span className={`dash-badge dash-badge--${listing.published ? 'ok' : 'muted'}`}>
                      {listing.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <Link href={`/admin/listings/${listing.id}/edit`} className="admin-btn">
                        Edit
                      </Link>
                      <PublishToggle id={listing.id} published={listing.published} />
                      <DeleteListingButton id={listing.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
