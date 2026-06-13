import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ListingForm from '@/components/forms/ListingForm'
import { getListingById } from '@/lib/db'
import { requireAdmin } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Edit listing — Admin — Cheap Houses',
}

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()

  const { id } = await params
  const numericId = Number(id)
  if (!Number.isInteger(numericId) || numericId <= 0) notFound()

  const listing = await getListingById(numericId)
  if (!listing) notFound()

  return (
    <div className="admin-inner">
      <Link href="/admin" className="admin-back">← Back to listings</Link>
      <div className="admin-toolbar">
        <h1 className="admin-title">Edit listing</h1>
      </div>
      <ListingForm listing={listing} />
    </div>
  )
}
