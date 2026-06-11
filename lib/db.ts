import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
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
  country:         string
  flag:            string
  country_short:   string
  location:        string
  location_short:  string
  price:           string
  currency_symbol: string
  title:           string
  meta:            string[]
  note:            string
  image:           string
  tone:            string
  is_new:          boolean
}

const VALID_TONES = new Set<string>(['olive', 'terracotta', 'granite', 'cedar', 'pine', 'timber'])

function rowToListing(row: ListingRow): Listing {
  if (!VALID_TONES.has(row.tone)) throw new Error(`Unknown tone value: ${row.tone}`)
  return {
    id:            row.id,
    country:       row.country,
    flag:          row.flag,
    countryShort:  row.country_short,
    location:      row.location,
    locationShort: row.location_short,
    price:         row.price,
    currencySymbol: row.currency_symbol,
    title:         row.title,
    meta:          row.meta,
    note:          row.note,
    image:         row.image,
    tone:          row.tone as ListingTone,
    isNew:         row.is_new,
  }
}

export async function getListings(): Promise<Listing[]> {
  'use cache'
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('id', { ascending: true })

  if (error) throw new Error(`getListings: ${error.message}`)
  return (data as ListingRow[]).map(rowToListing)
}

export async function subscribeEmail(email: string): Promise<'ok' | 'duplicate'> {
  const supabase = getSupabase()
  const { error } = await supabase
    .from('subscribers')
    .insert({ email: email.toLowerCase().trim() })

  if (error) {
    if (error.code === '23505') return 'duplicate'
    throw new Error(`subscribeEmail: ${error.message}`)
  }
  return 'ok'
}
