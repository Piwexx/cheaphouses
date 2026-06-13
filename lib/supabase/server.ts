import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import type { User } from '@supabase/supabase-js'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL:      z.string().url('NEXT_PUBLIC_SUPABASE_URL must be a valid URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required'),
})

const env = envSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL:      process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
})

// Anon-key client bound to the request cookies — for Server Components,
// Server Actions and Route Handlers. Session writes only stick in Actions
// and Route Handlers; in Server Components the refresh is proxy.ts's job.
export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          // Called from a Server Component — cookies are read-only there.
        }
      },
    },
  })
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// The role lives in app_metadata, which only the service role can write —
// users can't escalate it (unlike user_metadata).
export function isAdmin(user: User | null): boolean {
  return user?.app_metadata?.role === 'admin'
}

// Defense in depth alongside proxy.ts: call it in the admin layout and at the
// top of every admin Server Action.
export async function requireAdmin(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) redirect('/login?next=/admin')
  if (!isAdmin(user)) redirect('/dashboard')
  return user
}
