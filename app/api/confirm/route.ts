import { NextRequest, NextResponse } from 'next/server'
import { confirmTokenSchema } from '@/lib/validations'
import { confirmSubscriber } from '@/lib/db'

export async function GET(request: NextRequest) {
  const parsed = confirmTokenSchema.safeParse({
    token: request.nextUrl.searchParams.get('token'),
  })

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid or missing token.' }, { status: 400 })
  }

  const result = await confirmSubscriber(parsed.data.token)

  switch (result) {
    case 'confirmed':
    case 'already_confirmed':
      return NextResponse.redirect(new URL('/?confirmed=1', request.url))
    case 'expired':
      return NextResponse.json(
        { error: 'Confirmation link expired. Please sign up again.' },
        { status: 410 },
      )
    default:
      return NextResponse.json({ error: 'Confirmation link not found.' }, { status: 404 })
  }
}
