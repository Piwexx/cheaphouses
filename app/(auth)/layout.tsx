import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-page">
      <Link href="/" className="wordmark auth-wordmark">Cheap Houses</Link>
      {children}
    </div>
  )
}
