import { COUNTRIES, HERO_HEADLINES } from '@/lib/data'
import SignupForm from '@/components/forms/SignupForm'
import type { HeadlineVariant } from '@/types'

interface HeroProps {
  headlineVariant?: HeadlineVariant
}

export default function Hero({ headlineVariant = 'classic' }: HeroProps) {
  const lines = HERO_HEADLINES[headlineVariant]

  return (
    <section className="hero" id="signup">
      <div className="hero-layout">
        <h1 className="hero-h1">
          {lines[0]}
          <br />
          <em>{lines[1]}</em>
          <br />
          {lines[2]}
        </h1>

        <p className="hero-sub">
          One curator. Every listing reviewed by hand. No algorithm. No agent fees. No
          listings that hide the problems.
        </p>

        <div className="hero-form-wrap">
          <SignupForm />
          <p className="hero-form-note">
            Fridays · Free forever · 8,400 readers · Unsubscribe in one click
          </p>
        </div>

        <div className="country-display" role="list" aria-label="Countries covered">
          {COUNTRIES.map((c, i) => (
            <span key={i} className="country-tag" role="listitem">
              {c.flag} {c.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
