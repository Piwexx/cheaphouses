import Link from 'next/link'
import { Suspense } from 'react'
import { logoutAction } from '@/actions/auth'
import { getCurrentUser } from '@/lib/supabase/server'

async function UserActions() {
  // proxy.ts guards /dashboard; the page itself also redirects if unauthenticated
  const user = await getCurrentUser()

  return (
    <>
      {user?.email && <span className="dash-user">{user.email}</span>}
      <form action={logoutAction}>
        <button type="submit" className="hdr-login">Log out</button>
      </form>
    </>
  )
}

export default function DashboardLayout({
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
              <UserActions />
            </Suspense>
          </div>
        </div>
      </header>
      <main className="dash-main">{children}</main>
    </div>
  )
}
