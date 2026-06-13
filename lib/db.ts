import { createClient } from '@supabase/supabase-js'
import { cacheTag } from 'next/cache'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { Listing, ListingTone } from '@/types'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL:  z.string().url('NEXT_PUBLIC_SUPABASE_URL must be a valid URL'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),
})

const env = envSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL:  process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
})

function getSupabase() {
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
}

interface ListingRow {
  id:              number
  state:           string
  state_short:     string
  location:        string
  location_short:  string
  price:           string
  currency_symbol: string
  title:           string
  meta:            string[]
  note:            string
  image:           string
  link:            string | null
  tone:            string
  is_new:          boolean
  published:       boolean
}

const VALID_TONES = new Set<string>(['olive', 'terracotta', 'granite', 'cedar', 'pine', 'timber'])

function rowToListing(row: ListingRow): Listing {
  if (!VALID_TONES.has(row.tone)) throw new Error(`Unknown tone value: ${row.tone}`)
  return {
    id:            row.id,
    state:         row.state,
    stateShort:    row.state_short,
    location:      row.location,
    locationShort: row.location_short,
    price:         row.price,
    currencySymbol: row.currency_symbol,
    title:         row.title,
    meta:          row.meta,
    note:          row.note,
    image:         row.image,
    link:          row.link,
    tone:          row.tone as ListingTone,
    isNew:         row.is_new,
    published:     row.published,
  }
}

export type ListingInput = Omit<Listing, 'id'>

function listingToRow(input: ListingInput): Omit<ListingRow, 'id'> {
  return {
    state:           input.state,
    state_short:     input.stateShort,
    location:        input.location,
    location_short:  input.locationShort,
    price:           input.price,
    currency_symbol: input.currencySymbol,
    title:           input.title,
    meta:            input.meta,
    note:            input.note,
    image:           input.image,
    link:            input.link,
    tone:            input.tone,
    is_new:          input.isNew,
    published:       input.published,
  }
}

export async function getListings(): Promise<Listing[]> {
  'use cache'
  cacheTag('listings')
  // The explicit published filter is required: this client is service-role
  // and bypasses RLS.
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('published', true)
    .order('id', { ascending: true })

  if (error) throw new Error(`getListings: ${error.message}`)
  return (data as ListingRow[]).map(rowToListing)
}

// Admin queries below use the cookie-bound anon client on purpose: the RLS
// policies from migration 008 (admin-only writes) must actually apply, so a
// bug in requireAdmin() can't silently grant writes.

export async function getAllListingsAdmin(): Promise<Listing[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('id', { ascending: true })

  if (error) throw new Error(`getAllListingsAdmin: ${error.message}`)
  return (data as ListingRow[]).map(rowToListing)
}

export async function getListingById(id: number): Promise<Listing | null> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw new Error(`getListingById: ${error.message}`)
  return data ? rowToListing(data as ListingRow) : null
}

export async function createListing(input: ListingInput): Promise<Listing> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('listings')
    .insert(listingToRow(input))
    .select()
    .single()

  if (error) throw new Error(`createListing: ${error.message}`)
  return rowToListing(data as ListingRow)
}

// With RLS a non-admin gets 0 affected rows without an error, so update/delete
// must check the count.
export async function updateListing(id: number, input: ListingInput): Promise<void> {
  const supabase = await createSupabaseServerClient()
  const { count, error } = await supabase
    .from('listings')
    .update(listingToRow(input), { count: 'exact' })
    .eq('id', id)

  if (error) throw new Error(`updateListing: ${error.message}`)
  if (count === 0) throw new Error(`updateListing: listing ${id} not found or not allowed`)
}

export async function deleteListing(id: number): Promise<void> {
  const supabase = await createSupabaseServerClient()
  const { count, error } = await supabase
    .from('listings')
    .delete({ count: 'exact' })
    .eq('id', id)

  if (error) throw new Error(`deleteListing: ${error.message}`)
  if (count === 0) throw new Error(`deleteListing: listing ${id} not found or not allowed`)
}

export async function setListingPublished(id: number, published: boolean): Promise<void> {
  const supabase = await createSupabaseServerClient()
  const { count, error } = await supabase
    .from('listings')
    .update({ published }, { count: 'exact' })
    .eq('id', id)

  if (error) throw new Error(`setListingPublished: ${error.message}`)
  if (count === 0) throw new Error(`setListingPublished: listing ${id} not found or not allowed`)
}

export async function subscribeEmail(
  email: string,
): Promise<{ result: 'ok'; token: string } | { result: 'duplicate' }> {
  const token = randomUUID()
  const supabase = getSupabase()
  const { error } = await supabase.from('subscribers').insert({
    email: email.toLowerCase().trim(),
    confirm_token: token,
    token_expires_at: new Date(Date.now() + 86_400_000).toISOString(),
  })

  if (error) {
    if (error.code === '23505') return { result: 'duplicate' }
    throw new Error(`subscribeEmail: ${error.message}`)
  }
  return { result: 'ok', token }
}

export interface Faq {
  id: number
  question: string
  answer: string
  linkText: string | null
  linkHref: string | null
  sortOrder: number
}

interface FaqRow {
  id: number
  question: string
  answer: string
  link_text: string | null
  link_href: string | null
  sort_order: number
}

export async function getFaqs(): Promise<Faq[]> {
  'use cache'
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('faqs')
    .select('id, question, answer, link_text, link_href, sort_order')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) throw new Error(`getFaqs: ${error.message}`)
  return (data as FaqRow[]).map(row => ({
    id: row.id,
    question: row.question,
    answer: row.answer,
    linkText: row.link_text,
    linkHref: row.link_href,
    sortOrder: row.sort_order,
  }))
}

export interface SubscriptionRecord {
  userId:               string
  stripeCustomerId:     string
  stripeSubscriptionId: string
  priceId:              string
  status:               string
  cancelAtPeriodEnd:    boolean
  currentPeriodStart:   string | null
  currentPeriodEnd:     string | null
}

interface SubscriptionRow {
  user_id:                string
  stripe_customer_id:     string
  stripe_subscription_id: string
  price_id:               string
  status:                 string
  cancel_at_period_end:   boolean
  current_period_start:   string | null
  current_period_end:     string | null
}

function rowToSubscription(row: SubscriptionRow): SubscriptionRecord {
  return {
    userId:               row.user_id,
    stripeCustomerId:     row.stripe_customer_id,
    stripeSubscriptionId: row.stripe_subscription_id,
    priceId:              row.price_id,
    status:               row.status,
    cancelAtPeriodEnd:    row.cancel_at_period_end,
    currentPeriodStart:   row.current_period_start,
    currentPeriodEnd:     row.current_period_end,
  }
}

export async function upsertSubscription(record: SubscriptionRecord): Promise<void> {
  const supabase = getSupabase()
  const { error } = await supabase.from('subscriptions').upsert(
    {
      user_id:                record.userId,
      stripe_customer_id:     record.stripeCustomerId,
      stripe_subscription_id: record.stripeSubscriptionId,
      price_id:               record.priceId,
      status:                 record.status,
      cancel_at_period_end:   record.cancelAtPeriodEnd,
      current_period_start:   record.currentPeriodStart,
      current_period_end:     record.currentPeriodEnd,
    },
    { onConflict: 'stripe_subscription_id' },
  )
  if (error) throw new Error(`upsertSubscription: ${error.message}`)
}

// No 'use cache': per-user data that must reflect webhook updates immediately
export async function getSubscriptionForUser(
  userId: string,
): Promise<SubscriptionRecord | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw new Error(`getSubscriptionForUser: ${error.message}`)
  return data ? rowToSubscription(data as SubscriptionRow) : null
}

export async function getStripeCustomerIdForUser(userId: string): Promise<string | null> {
  const sub = await getSubscriptionForUser(userId)
  return sub?.stripeCustomerId ?? null
}

export async function getUserIdByStripeCustomerId(
  stripeCustomerId: string,
): Promise<string | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', stripeCustomerId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw new Error(`getUserIdByStripeCustomerId: ${error.message}`)
  return data?.user_id ?? null
}

export async function confirmSubscriber(
  token: string,
): Promise<'confirmed' | 'invalid' | 'expired' | 'already_confirmed'> {
  const supabase = getSupabase()

  const { data, error } = await supabase
    .from('subscribers')
    .select('id, confirmed_at, token_expires_at')
    .eq('confirm_token', token)
    .single()

  if (error || !data) return 'invalid'
  if (data.confirmed_at) return 'already_confirmed'
  if (data.token_expires_at && new Date(data.token_expires_at) < new Date()) return 'expired'

  const { count } = await supabase
    .from('subscribers')
    .update({ confirmed_at: new Date().toISOString(), confirm_token: null, token_expires_at: null })
    .eq('id', data.id)
    .is('confirmed_at', null)

  return count === 0 ? 'already_confirmed' : 'confirmed'
}
