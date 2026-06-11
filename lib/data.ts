import type { Country, FilterDef, FilterValues, HeadlineVariant } from '@/types'

export const LISTING_TONES: Record<string, string> = {
  olive:      'linear-gradient(170deg, #9b8e6e 0%, #6a5c40 55%, #4a3f2a 100%)',
  terracotta: 'linear-gradient(165deg, #c89a78 0%, #9b6849 50%, #6a4329 100%)',
  granite:    'linear-gradient(180deg, #aab0ab 0%, #7c8079 50%, #4f5450 100%)',
  cedar:      'linear-gradient(170deg, #a88c6a 0%, #7a5e3f 55%, #4a3622 100%)',
  pine:       'linear-gradient(175deg, #8fa389 0%, #5e7456 55%, #3a4d36 100%)',
  timber:     'linear-gradient(160deg, #b89a72 0%, #80633f 55%, #4a3520 100%)',
}

export const COUNTRIES: Country[] = [
  { flag: '🇺🇸', name: 'USA' },
  { flag: '🇨🇦', name: 'Canada' },
  { flag: '🇪🇸', name: 'Spain' },
  { flag: '🇵🇹', name: 'Portugal' },
  { flag: '🇮🇹', name: 'Italy' },
  { flag: '🇩🇪', name: 'Germany' },
  { flag: '🇸🇪', name: 'Sweden' },
  { flag: '🇯🇵', name: 'Japan' },
]

export const HERO_HEADLINES: Record<HeadlineVariant, string[]> = {
  classic:   ['Underpriced properties,', 'found and curated', 'across 8 countries.'],
  algorithm: ['The houses no algorithm', 'will show you.', 'Delivered every Friday.'],
  honest:    ['€28,000 in Portugal.', 'Honestly assessed.', 'In your inbox every Friday.'],
}

export const COUNTRY_CODE: Record<string, string> = {
  Portugal: 'pt', Italy: 'it', Germany: 'de', Spain: 'es',
  Japan: 'jp', USA: 'us', Canada: 'ca', Sweden: 'se', France: 'fr',
}

export const FILTER_DEFS: FilterDef[] = [
  {
    group: 'country', title: 'Country', options: [
      { val: 'all', label: 'All countries' }, { val: 'us', label: '🇺🇸 USA' }, { val: 'ca', label: '🇨🇦 Canada' },
      { val: 'es', label: '🇪🇸 Spain' }, { val: 'pt', label: '🇵🇹 Portugal' }, { val: 'it', label: '🇮🇹 Italy' },
      { val: 'de', label: '🇩🇪 Germany' }, { val: 'se', label: '🇸🇪 Sweden' }, { val: 'jp', label: '🇯🇵 Japan' },
    ],
  },
  {
    group: 'price', title: 'Price range', options: [
      { val: 'all', label: 'All prices' }, { val: 'under20', label: 'Under $20K' },
      { val: 'under50', label: '$20K – $50K' }, { val: 'under100', label: '$50K – $100K' },
      { val: 'over100', label: 'Over $100K' },
    ],
  },
  {
    group: 'type', title: 'Property type', options: [
      { val: 'all', label: 'All types' }, { val: 'farmhouse', label: 'Farmhouse' },
      { val: 'cottage', label: 'Cottage' }, { val: 'village', label: 'Village house' },
      { val: 'akiya', label: 'Akiya' },
    ],
  },
  {
    group: 'condition', title: 'Condition', options: [
      { val: 'all', label: 'All conditions' }, { val: 'livable', label: 'Move-in ready' },
      { val: 'partial', label: 'Partial work needed' }, { val: 'ruin', label: 'Full renovation' },
    ],
  },
]

export const FILTER_DEFAULTS: FilterValues = { country: 'all', price: 'all', type: 'all', condition: 'all' }

export const PILL_LABELS: Record<string, Record<string, string>> = {}
FILTER_DEFS.forEach(({ group, options }) => {
  PILL_LABELS[group] = {}
  options.forEach(({ val, label }) => { PILL_LABELS[group][val] = label })
})

export const FAQ_DATA = [
  { q: 'What is Cheap Houses?', a: 'A curated selection of underpriced properties from around the world. We review 200+ listings every week and publish only the ones worth a second look — with direct seller contact info and renovation estimates where available.' },
  { q: 'What countries do you cover?', a: 'USA, Canada, Spain, Portugal, Italy, Germany, Sweden, and Japan. More countries are coming — we expand when we find a reliable source of good listings.' },
  { q: "What's the price ceiling?", a: "$199K is the hard ceiling. Most listings are well below that — often under $50K. The point is finding properties that are genuinely underpriced relative to their condition, location, or potential." },
  { q: 'Why are these properties so cheap?', a: 'Different reasons every time — and we always explain which one. Common reasons: location (rural, remote), condition (needs work, rewiring), legal complexity (probate, agricultural classification), or a motivated seller who wants to close fast. The catch is always in the note.' },
  { q: 'Is it free?', a: 'Browsing is free — you can see listings and prices. Full access, including direct seller contacts, renovation estimates, and the complete archive, requires a Membership. $10/month billed annually, or $15/month month-to-month.' },
  { q: 'What does membership include exactly?', a: 'Full access to every listing in the archive, direct seller and municipal contact info, renovation estimates where available, and search by country, budget, and condition. No ads, no agents, no commission. Cancel anytime.' },
  { q: 'How do I cancel?', a: 'One click in your account settings. No retention flow, no confirmation screen, no guilt-trip. Cancel anytime and you keep access until the end of your billing period.', link: { text: 'Go to account', href: '#' } },
  { q: 'Can foreigners actually buy in these countries?', a: 'Yes, in all 8 countries — but the process varies. Japan and Portugal are the most foreigner-friendly: open ownership, no restrictions. Spain, Italy, and Germany are open but involve more bureaucracy — expect 3–9 months to close. We flag the caveats in every listing note.' },
  { q: 'How much does it really cost to buy?', a: 'The asking price is only part of it. Every country adds transaction costs — taxes, notary fees, sometimes agent commission. Rough guide: Portugal 6–8%, Spain 10–14%, Italy 9–15%, Germany 7–12%, Sweden 4–6%, Japan 6–8%, USA 2–5%, Canada 3–6%.' },
]
