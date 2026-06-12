import { getFaqs } from '@/lib/db'
import FAQItem from './FAQItem'

export default async function FAQ() {
  const faqs = await getFaqs()

  return (
    <section className="faq" id="faq">
      <div className="faq-inner">
        <h2 className="faq-h2">Frequently asked questions</h2>
        {faqs.map(faq => (
          <FAQItem key={faq.id} item={faq} />
        ))}
      </div>
    </section>
  )
}
