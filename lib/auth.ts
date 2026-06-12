import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

// Admin (service role) auth helpers. Server-only — never import from Client Components.

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL:  z.string().url('NEXT_PUBLIC_SUPABASE_URL must be a valid URL'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),
})

const env = envSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL:  process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
})

function getAdminClient() {
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

/**
 * Idempotent: creates the auth user, or resolves the existing one by email.
 * Used after a Stripe checkout, where the payment is the proof of ownership,
 * so the email is marked as confirmed.
 */
export async function findOrCreateUserByEmail(
  email: string,
): Promise<{ id: string; created: boolean }> {
  const admin = getAdminClient()
  const normalized = email.toLowerCase().trim()

  const { data, error } = await admin.auth.admin.createUser({
    email: normalized,
    email_confirm: true,
  })

  if (!error) return { id: data.user.id, created: true }
  if (error.code !== 'email_exists') {
    throw new Error(`findOrCreateUserByEmail: ${error.message}`)
  }

  // generateLink resolves the existing user without sending any email
  const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
    type: 'magiclink',
    email: normalized,
  })
  if (linkError || !linkData.user) {
    throw new Error(`findOrCreateUserByEmail: ${linkError?.message ?? 'user not found'}`)
  }
  return { id: linkData.user.id, created: false }
}

/**
 * Returns a one-time token hash that can be consumed server-side with
 * supabase.auth.verifyOtp({ type: 'email', token_hash }) to create a session
 * without sending an email. Used for auto-login after Stripe checkout.
 */
export async function createSessionTokenForEmail(email: string): Promise<string> {
  const admin = getAdminClient()
  const { data, error } = await admin.auth.admin.generateLink({
    type: 'magiclink',
    email: email.toLowerCase().trim(),
  })
  if (error || !data.properties?.hashed_token) {
    throw new Error(`createSessionTokenForEmail: ${error?.message ?? 'no token generated'}`)
  }
  return data.properties.hashed_token
}
