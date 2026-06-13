import Link from 'next/link'
import { Suspense } from 'react'
import { logoutAction } from '@/actions/auth'
import { getCurrentUser } from '@/lib/supabase/server'

async function AdminUserActions() {
  // proxy.ts guards /admin by role; each admin page also calls requireAdmin()
  const user = await getCurrentUser()

  return (
    <>
      <Link href="/dashboard" className="hdr-login">Dashboard</Link>
      {user?.email && <span className="dash-user">{user.email}</span>}
      <form action={logoutAction}>
        <button type="submit" className="hdr-login">Log out</button>
      </form>
    </>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dash">
      <header className="hdr">
        <div className="hdr-inner">
          <Link href="/" className="wordmark">Cheap Houses</Link>
          <div className="hdr-actions">
            <Suspense fallback={null}>
              <AdminUserActions />
            </Suspense>
          </div>
        </div>
      </header>
      <main className="dash-main">{children}</main>
    </div>
  )
}
