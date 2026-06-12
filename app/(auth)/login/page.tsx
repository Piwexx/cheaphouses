import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import LoginForm from '@/components/forms/LoginForm'

export const metadata: Metadata = {
  title: 'Log in — Cheap Houses',
}

type LoginSearchParams = Promise<{ next?: string; error?: string; from?: string }>

async function LoginContent({ searchParams }: { searchParams: LoginSearchParams }) {
  const { next, error, from } = await searchParams

  return (
    <>
      {from === 'checkout' && (
        <p className="auth-notice">
          Your membership is active — log in with the email you used at checkout.
        </p>
      )}
      {error === 'link' && (
        <p className="auth-notice auth-notice--warn">
          That link expired or was already used. Request a fresh one below.
        </p>
      )}
      <LoginForm next={next} />
    </>
  )
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: LoginSearchParams
}) {
  return (
    <div className="auth-card">
      <div className="section-label">Members</div>
      <h1 className="auth-title">Welcome back</h1>
      <Suspense fallback={<LoginForm />}>
        <LoginContent searchParams={searchParams} />
      </Suspense>
      <p className="auth-alt">
        No account yet? <Link href="/register">Create one</Link> — or just{' '}
        <Link href="/#pricing">become a member</Link>.
      </p>
    </div>
  )
}
