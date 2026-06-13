'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  createListing,
  deleteListing,
  getListingById,
  setListingPublished,
  updateListing,
} from '@/lib/db'
import type { ListingInput } from '@/lib/db'
import { createSupabaseServerClient, requireAdmin } from '@/lib/supabase/server'
import { listingIdSchema, listingSchema } from '@/lib/validations'
import type { z } from 'zod'

export type ListingFormState =
  | { status: 'idle' }
  | { status: 'error'; message: string }

const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const BUCKET = 'listing-images'

// listingSchema carries imageUrl (a form-only field); ListingInput wants the
// resolved image instead.
function toListingInput(
  data: z.infer<typeof listingSchema>,
  image: string,
): ListingInput {
  return {
    state:          data.state,
    stateShort:     data.stateShort,
    location:       data.location,
    locationShort:  data.locationShort,
    price:          data.price,
    currencySymbol: data.currencySymbol,
    title:          data.title,
    meta:           data.meta,
    note:           data.note,
    link:           data.link,
    tone:           data.tone,
    isNew:          data.isNew,
    published:      data.published,
    image,
  }
}

// Priority: freshly uploaded file > pasted URL > current image (edit only).
// Uploads go through the cookie-bound client so the admin-only Storage RLS
// policies apply.
async function resolveImage(
  formData: FormData,
  imageUrl: string,
): Promise<{ image: string } | { error: string }> {
  const file = formData.get('imageFile')

  if (file instanceof File && file.size > 0) {
    if (!file.type.startsWith('image/')) {
      return { error: 'The uploaded file must be an image.' }
    }
    if (file.size > MAX_IMAGE_BYTES) {
      return { error: 'Image must be 5MB or smaller.' }
    }

    const rawExt = file.name.split('.').pop()?.toLowerCase() ?? ''
    const ext = /^[a-z0-9]{1,5}$/.test(rawExt) ? rawExt : 'jpg'
    const path = `${crypto.randomUUID()}.${ext}`

    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { contentType: file.type })
    if (error) return { error: `Image upload failed: ${error.message}` }

    return { image: supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl }
  }

  if (imageUrl) return { image: imageUrl }

  const current = formData.get('currentImage')
  if (typeof current === 'string' && current) return { image: current }

  return { error: 'Add an image — upload a file or paste an image URL.' }
}

// Best-effort: only removes objects that live in our bucket, never fails the action.
async function removeStoredImage(imageUrl: string): Promise<void> {
  const marker = `/object/public/${BUCKET}/`
  const idx = imageUrl.indexOf(marker)
  if (idx === -1) return
  try {
    const path = decodeURIComponent(imageUrl.slice(idx + marker.length))
    const supabase = await createSupabaseServerClient()
    await supabase.storage.from(BUCKET).remove([path])
  } catch {
    // Orphaned objects are acceptable; deleting the listing matters more.
  }
}

export async function createListingAction(
  _prevState: ListingFormState,
  formData: FormData,
): Promise<ListingFormState> {
  await requireAdmin()

  const parsed = listingSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { status: 'error', message: parsed.error.errors[0].message }
  }

  const resolved = await resolveImage(formData, parsed.data.imageUrl)
  if ('error' in resolved) return { status: 'error', message: resolved.error }

  try {
    await createListing(toListingInput(parsed.data, resolved.image))
  } catch {
    return { status: 'error', message: "Couldn't create the listing. Try again." }
  }

  revalidateTag('listings', 'max')
  redirect('/admin')
}

export async function updateListingAction(
  _prevState: ListingFormState,
  formData: FormData,
): Promise<ListingFormState> {
  await requireAdmin()

  const parsedId = listingIdSchema.safeParse(formData.get('id'))
  if (!parsedId.success) {
    return { status: 'error', message: 'Invalid listing id.' }
  }

  const parsed = listingSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { status: 'error', message: parsed.error.errors[0].message }
  }

  const resolved = await resolveImage(formData, parsed.data.imageUrl)
  if ('error' in resolved) return { status: 'error', message: resolved.error }

  try {
    await updateListing(parsedId.data, toListingInput(parsed.data, resolved.image))
  } catch {
    return { status: 'error', message: "Couldn't save the listing. Try again." }
  }

  revalidateTag('listings', 'max')
  redirect('/admin')
}

export async function deleteListingAction(formData: FormData): Promise<void> {
  await requireAdmin()

  const id = listingIdSchema.parse(formData.get('id'))
  const listing = await getListingById(id)
  if (!listing) return

  await deleteListing(id)
  await removeStoredImage(listing.image)
  revalidateTag('listings', 'max')
  // The action doesn't redirect, so refresh the admin table explicitly
  revalidatePath('/admin')
}

export async function toggleListingPublishedAction(formData: FormData): Promise<void> {
  await requireAdmin()

  const id = listingIdSchema.parse(formData.get('id'))
  const published = formData.get('published') === 'true'
  await setListingPublished(id, !published)
  revalidateTag('listings', 'max')
  // The action doesn't redirect, so refresh the admin table explicitly
  revalidatePath('/admin')
}
