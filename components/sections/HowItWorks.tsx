import { HomeIcon, DocIcon, MailIcon } from '@/components/ui/icons'

const steps = [
  {
    n: '01',
    Icon: HomeIcon,
    title: 'We scout, every day',
    body: 'Estate sales, county auctions, inheritance disputes, motivated sellers who never listed on Zillow or Realtor.com. 200+ candidates pass through the queue each week.',
  },
  {
    n: '02',
    Icon: DocIcon,
    title: 'We name the catch',
    body: "Every property gets a hand-written note. Roof, plumbing, legal status, neighbors, distance to a real grocery. We tell you what'll cost money before you fly out.",
  },
  {
    n: '03',
    Icon: MailIcon,
    title: 'You read it Friday',
    body: 'One email. Eight properties. Direct contact details for sellers or municipal offices. No paywall, no upsell, no algorithm picking what you see.',
  },
]

export default function HowItWorks() {
  return (
    <section className="what reveal in" id="how">
      <div className="what-inner">
        <h2 className="what-h2">
          What you get in your <em>inbox</em>
        </h2>
        <div className="what-grid">
          {steps.map((s) => (
            <div className="what-item" key={s.n}>
              <span className="what-num">{s.n}</span>
              <div className="what-icon" aria-hidden="true">
                <s.Icon />
              </div>
              <div className="what-title">{s.title}</div>
              <p className="what-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
