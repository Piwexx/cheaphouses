import { TikTokIcon, InstagramIcon } from '@/components/ui/icons'

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
          <a className="hdr-login" href="#">Log in</a>
          <a className="hdr-cta" href="#pricing">Become a member</a>
        </div>
      </div>
    </header>
  )
}
