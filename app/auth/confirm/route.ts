import { NextResponse, type NextRequest } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { EmailOtpType } from '@supabase/supabase-js'

// Target of the Supabase auth emails (magic link, signup confirmation).
// The templates must link to: {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type={{ .Type }}
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next')
  const safeNext = next && next.startsWith('/') ? next : '/dashboard'

  if (tokenHash && type) {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
    if (!error) {
      return NextResponse.redirect(new URL(safeNext, request.url))
    }
  }

  return NextResponse.redirect(new URL('/login?error=link', request.url))
}
