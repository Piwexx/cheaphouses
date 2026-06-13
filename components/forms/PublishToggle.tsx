import { toggleListingPublishedAction } from '@/actions/listings'

// Server Component on purpose — a plain form posting to a Server Action
// needs no client state.
export default function PublishToggle({
  id,
  published,
}: {
  id: number
  published: boolean
}) {
  return (
    <form action={toggleListingPublishedAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="published" value={String(published)} />
      <button type="submit" className="admin-btn">
        {published ? 'Unpublish' : 'Publish'}
      </button>
    </form>
  )
}
