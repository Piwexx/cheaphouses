'use server'

import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { loginSchema, magicLinkSchema, registerSchema } from '@/lib/validations'

export type AuthState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export async function loginAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email:    formData.get('email'),
    password: formData.get('password'),
  })
  if (!parsed.success) {
    return { status: 'error', message: parsed.error.errors[0].message }
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)
  if (error) {
    return { status: 'error', message: 'Wrong email or password.' }
  }

  const next = formData.get('next')
  redirect(typeof next === 'string' && next.startsWith('/') ? next : '/dashboard')
}

export async function magicLinkAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = magicLinkSchema.safeParse({ email: formData.get('email') })
  if (!parsed.success) {
    return { status: 'error', message: parsed.error.errors[0].message }
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: { emailRedirectTo: `${SITE_URL}/auth/confirm?next=/dashboard` },
  })
  if (error) {
    return { status: 'error', message: "Couldn't send the link. Try again in a minute." }
  }
  return {
    status: 'success',
    message: `Check ${parsed.data.email} — your sign-in link is on its way.`,
  }
}

export async function registerAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = registerSchema.safeParse({
    email:    formData.get('email'),
    password: formData.get('password'),
  })
  if (!parsed.success) {
    return { status: 'error', message: parsed.error.errors[0].message }
  }

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.signUp({
    ...parsed.data,
    options: { emailRedirectTo: `${SITE_URL}/auth/confirm?next=/dashboard` },
  })
  if (error) {
    return { status: 'error', message: error.message }
  }
  // Supabase returns a user with no identities when the email is already registered
  if (data.user && data.user.identities?.length === 0) {
    return { status: 'error', message: 'That email already has an account — log in instead.' }
  }
  if (data.session) redirect('/dashboard')

  return {
    status: 'success',
    message: `Almost there — confirm your email at ${parsed.data.email} to finish signing up.`,
  }
}

export async function logoutAction(): Promise<void> {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect('/')
}
