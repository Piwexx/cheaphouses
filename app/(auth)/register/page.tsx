import type { Metadata } from 'next'
import Link from 'next/link'
import RegisterForm from '@/components/forms/RegisterForm'

export const metadata: Metadata = {
  title: 'Create account — Cheap Houses',
}

export default function RegisterPage() {
  return (
    <div className="auth-card">
      <div className="section-label">Members</div>
      <h1 className="auth-title">Create your account</h1>
      <RegisterForm />
      <p className="auth-alt">
        Already have one? <Link href="/login">Log in</Link>.
      </p>
    </div>
  )
}
