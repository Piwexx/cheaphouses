'use cache'

import { InstagramIcon, TikTokIcon, YouTubeIcon } from '@/components/ui/icons'

export default async function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="foot" role="contentinfo">
      <div className="foot-inner">
        <div className="foot-brand">
          <div className="foot-wordmark">Cheap Houses</div>
          <div className="foot-tagline">Underpriced properties, curated weekly</div>
        </div>
        <div className="foot-bottom">
          <p className="foot-copy">&copy; {year} Cheap Houses. All rights reserved.</p>
          <div className="foot-right">
            <div className="foot-social" aria-label="Social media">
              <a href="#" aria-label="Instagram" rel="noopener noreferrer" className="hdr-social-link">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="TikTok" rel="noopener noreferrer" className="hdr-social-link">
                <TikTokIcon />
              </a>
              <a href="#" aria-label="YouTube" rel="noopener noreferrer" className="hdr-social-link">
                <YouTubeIcon />
              </a>
            </div>
            <a href="mailto:hello@cheaphouses.com" className="foot-contact-email">
              hello@cheaphouses.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
