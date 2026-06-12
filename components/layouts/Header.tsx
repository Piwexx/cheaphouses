import { Suspense } from 'react'
import { TikTokIcon, InstagramIcon } from '@/components/ui/icons'
import { getCurrentUser } from '@/lib/supabase/server'

// Session-dependent link is isolated here so the rest of the header (and the
// pages using it) stays statically prerenderable under cacheComponents.
async function AuthLink() {
  const user = await getCurrentUser()
  return user ? (
    <a className="hdr-login" href="/dashboard">Dashboard</a>
  ) : (
    <a className="hdr-login" href="/login">Log in</a>
  )
}

export default function Header() {
  return (
    <header className="hdr">
      <div className="hdr-inner">
        <a href="#top" className="wordmark">Cheap Houses</a>
        <nav className="hdr-nav">
          <a className="nav-link" href="#preview">View listings</a>
        </nav>
        <div className="hdr-actions">
          <div className="hdr-social">
            <a href="#" aria-label="TikTok" rel="noopener noreferrer" className="hdr-social-link">
              <TikTokIcon />
            </a>
            <a href="#" aria-label="Instagram" rel="noopener noreferrer" className="hdr-social-link">
              <InstagramIcon />
            </a>
          </div>
          <Suspense fallback={<a className="hdr-login" href="/login">Log in</a>}>
            <AuthLink />
          </Suspense>
          <a className="hdr-cta" href="#pricing">Become a member</a>
        </div>
      </div>
    </header>
  )
}
