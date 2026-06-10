import SignupForm from '@/components/forms/SignupForm'

export default function CommunityBand() {
  return (
    <section className="community-band reveal in">
      <div className="community-inner">
        <div className="community-eyebrow">Stay in the loop</div>
        <h2 className="community-h2">
          Get underpriced properties
          <br />
          in your <em>inbox.</em>
        </h2>
        <p className="community-sub">
          Fridays. Eight properties, hand-checked, with the catch named before you
          click. No spam, no agent emails, unsubscribe in one click.
        </p>
        <div className="community-form-wrap">
          <SignupForm variant="community" />
        </div>
      </div>
    </section>
  )
}
