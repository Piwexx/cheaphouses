import { FAQ_DATA } from '@/lib/data'
import FAQItem from './FAQItem'

export default function FAQ() {
  return (
    <section className="faq" id="faq">
      <div className="faq-inner">
        <h2 className="faq-h2">Frequently asked questions</h2>
        {FAQ_DATA.map((item, i) => (
          <FAQItem key={i} item={item} />
        ))}
      </div>
    </section>
  )
}
