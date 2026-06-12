import type { FilterDef, FilterValues, HeadlineVariant } from '@/types'

export const LISTING_TONES: Record<string, string> = {
  olive:      'linear-gradient(170deg, #9b8e6e 0%, #6a5c40 55%, #4a3f2a 100%)',
  terracotta: 'linear-gradient(165deg, #c89a78 0%, #9b6849 50%, #6a4329 100%)',
  granite:    'linear-gradient(180deg, #aab0ab 0%, #7c8079 50%, #4f5450 100%)',
  cedar:      'linear-gradient(170deg, #a88c6a 0%, #7a5e3f 55%, #4a3622 100%)',
  pine:       'linear-gradient(175deg, #8fa389 0%, #5e7456 55%, #3a4d36 100%)',
  timber:     'linear-gradient(160deg, #b89a72 0%, #80633f 55%, #4a3520 100%)',
}

export const HERO_HEADLINES: Record<HeadlineVariant, string[]> = {
  classic:   ['Underpriced properties,', 'found and curated', 'across the USA.'],
  algorithm: ['The houses no algorithm', 'will show you.', 'Delivered every Friday.'],
  honest:    ['$35,000 in West Virginia.', 'Honestly assessed.', 'In your inbox every Friday.'],
}

export const FILTER_DEFS: FilterDef[] = [
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

export const FILTER_DEFAULTS: FilterValues = { price: 'all', type: 'all', condition: 'all' }

export const PILL_LABELS: Record<string, Record<string, string>> = {}
FILTER_DEFS.forEach(({ group, options }) => {
  PILL_LABELS[group] = {}
  options.forEach(({ val, label }) => { PILL_LABELS[group][val] = label })
})

export const FAQ_DATA = [
  { q: 'What is Cheap Houses?', a: 'A curated selection of underpriced properties from across the USA. We review 200+ listings every week and publish only the ones worth a second look — with direct seller contact info and renovation estimates where available.' },
  { q: 'What states do you cover?', a: 'All 50 states. We focus on rural and small-town properties across every region — Appalachia, the Deep South, the Great Plains, the Midwest, New England, and the Mountain West. More listings are added every Friday.' },
  { q: "What's the price ceiling?", a: "$199K is the hard ceiling. Most listings are well below that — often under $50K. The point is finding properties that are genuinely underpriced relative to their condition, location, or potential." },
  { q: 'Why are these properties so cheap?', a: 'Different reasons every time — and we always explain which one. Common reasons: location (rural, remote), condition (needs work, rewiring), legal complexity (probate, agricultural classification), or a motivated seller who wants to close fast. The catch is always in the note.' },
  { q: 'Is it free?', a: 'Browsing is free — you can see listings and prices. Full access, including direct seller contacts, renovation estimates, and the complete archive, requires a Membership. $10/month billed annually, or $15/month month-to-month.' },
  { q: 'What does membership include exactly?', a: 'Full access to every listing in the archive, direct seller and municipal contact info, renovation estimates where available, and search by state, budget, and condition. No ads, no agents, no commission. Cancel anytime.' },
  { q: 'How do I cancel?', a: 'One click in your account settings. No retention flow, no confirmation screen, no guilt-trip. Cancel anytime and you keep access until the end of your billing period.', link: { text: 'Go to account', href: '#' } },
  { q: 'Can foreigners buy property in the USA?', a: 'Yes. The US has no restriction on foreign property ownership. The process is straightforward: you can close in 30–60 days, financing is available for foreign buyers (though at higher rates and stricter requirements), and title insurance protects the purchase. An LLC structure is common for tax and liability reasons.' },
  { q: 'How much does it really cost to buy?', a: 'The asking price is only part of it. US closings add 2–5% in transaction costs: title insurance, recording fees, transfer taxes (varies by state). For rural and distressed properties, budget separately for a general inspection ($300–600), well/septic inspection if applicable ($200–400), and title search. On a $30K property, total acquisition overhead is typically $2–5K.' },
]
