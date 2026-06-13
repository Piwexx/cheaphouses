import type { Metadata } from 'next'
import Link from 'next/link'
import ListingForm from '@/components/forms/ListingForm'
import { requireAdmin } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'New listing — Admin — Cheap Houses',
}

export default async function NewListingPage() {
  await requireAdmin()

  return (
    <div className="admin-inner">
      <Link href="/admin" className="admin-back">← Back to listings</Link>
      <div className="admin-toolbar">
        <h1 className="admin-title">New listing</h1>
      </div>
      <ListingForm />
    </div>
  )
}
