'use client'

import { useFormStatus } from 'react-dom'
import { deleteListingAction } from '@/actions/listings'

function DeleteButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="admin-btn admin-btn--danger" disabled={pending}>
      {pending ? 'Deleting…' : 'Delete'}
    </button>
  )
}

export default function DeleteListingButton({ id }: { id: number }) {
  return (
    <form
      action={deleteListingAction}
      onSubmit={e => {
        if (!confirm('Delete this listing? This cannot be undone.')) e.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
    </form>
  )
}
