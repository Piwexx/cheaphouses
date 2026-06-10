import type { Listing, Country, FilterDef, FilterValues, HeadlineVariant } from '@/types'

export const LISTINGS: Listing[] = [
  {
    id: 1, country: 'Portugal', flag: '🇵🇹', countryShort: 'Portugal',
    location: 'Alentejo · Portugal', locationShort: 'Alentejo, Portugal',
    price: '28.000', currencySymbol: '€',
    title: 'Stone farmhouse with 3,800m² of land',
    meta: ['3 rooms', '140 m²', 'Fixer-upper'],
    note: 'The roof collapsed in the east wing in the 90s and was never fixed. **The rest of the structure is solid** — a local builder in Évora estimated €17–22K to make it livable. The land is 3,800m² with olive trees. No agent; contact the municipal office directly.',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1400&q=80&fit=crop',
    tone: 'olive', isNew: true,
  },
  {
    id: 2, country: 'Italy', flag: '🇮🇹', countryShort: 'Italy',
    location: 'Calabria · Italy', locationShort: 'Calabria, Italy',
    price: '19.000', currencySymbol: '€',
    title: '2-bedroom stone house, 11 years in probate',
    meta: ['2 rooms', '85 m²', 'Rewire needed'],
    note: 'Inherited by three siblings who could not agree on a sale price for a decade. **The probate is now resolved**; they want it gone before tax season. Habitable as-is but the wiring is from the 70s and would need a full pass. Shared wall both sides. Comune wants new residents.',
    image: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=1400&q=80&fit=crop',
    tone: 'terracotta', isNew: true,
  },
  {
    id: 3, country: 'Germany', flag: '🇩🇪', countryShort: 'Germany',
    location: 'Mecklenburg · Germany', locationShort: 'Mecklenburg, Germany',
    price: '26.000', currencySymbol: '€',
    title: 'Brick farmhouse on 1.2 hectares',
    meta: ['4 rooms', '180 m²', 'Agricultural'],
    note: 'Classified agricultural — a foreigner can buy it but converting to residential takes 18 months of municipal paperwork. **The building itself is in good shape**: new roof in 2018, dry inside, original parquet under the lino. Land has two outbuildings and an old apple orchard.',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1400&q=80&fit=crop',
    tone: 'timber', isNew: false,
  },
  {
    id: 4, country: 'Spain', flag: '🇪🇸', countryShort: 'Spain',
    location: 'Galicia · Spain', locationShort: 'Galicia, Spain',
    price: '13.500', currencySymbol: '€',
    title: 'Granite cottage, single-lane road access',
    meta: ['2 rooms', '80 m²', 'No mains gas'],
    note: 'The lowest-priced thing in this newsletter all year. **It is cheap for reasons:** no mains gas, no central heating, and a 4km single-lane road that floods in November. Roof is solid, walls are 60cm granite, dry inside. The previous owner cooked in the courtyard.',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1400&q=80&fit=crop',
    tone: 'granite', isNew: false,
  },
  {
    id: 5, country: 'Japan', flag: '🇯🇵', countryShort: 'Japan',
    location: 'Hyogo Prefecture · Japan', locationShort: 'Hyogo, Japan',
    price: '3,200,000', currencySymbol: '¥',
    title: 'Akiya farmhouse with rice field views',
    meta: ['5 rooms', '120 m²', 'Vacant home'],
    note: '12 years empty. Structural inspection mandatory before any sale — budget ¥150K for it. **Tatami rooms need replacing** but the post-and-beam frame is original cedar and tight. The village has a relocation grant that can offset up to ¥2M of the work for residents under 40.',
    image: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=1400&q=80&fit=crop',
    tone: 'cedar', isNew: true,
  },
  {
    id: 6, country: 'USA', flag: '🇺🇸', countryShort: 'West Virginia',
    location: 'Pocahontas County · West Virginia', locationShort: 'Pocahontas Co., WV',
    price: '35,000', currencySymbol: '$',
    title: 'Mountain bungalow on 1.2 acres',
    meta: ['2 rooms', '85 m²', 'Cosmetic'],
    note: 'Estate sale. Cosmetic work only — floors, paint, one window. **Septic was redone in 2019.** 35 minutes to the nearest grocery; an hour to a hospital. If you want quiet, this is quiet. If you want delivery, this is not the listing for you.',
    image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1400&q=80&fit=crop',
    tone: 'pine', isNew: false,
  },
  {
    id: 7, country: 'Canada', flag: '🇨🇦', countryShort: 'Nova Scotia',
    location: 'Nova Scotia · Canada', locationShort: 'Nova Scotia, Canada',
    price: '58,000', currencySymbol: 'CA$',
    title: 'Century farmhouse, 4 acres of cleared land',
    meta: ['3 rooms', '110 m²', 'New roof 2022'],
    note: 'Roof was redone in 2022, oil furnace replaced 2020, otherwise original. **The well water tests clean**; the septic needs a pump-out and an inspection. Owners moved to Halifax and are firm at this price.',
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=1400&q=80&fit=crop',
    tone: 'pine', isNew: false,
  },
  {
    id: 8, country: 'Sweden', flag: '🇸🇪', countryShort: 'Sweden',
    location: 'Dalarna · Sweden', locationShort: 'Dalarna, Sweden',
    price: '43.000', currencySymbol: '€',
    title: 'Red timber cottage near lake',
    meta: ['2 rooms', '70 m²', 'Falu red'],
    note: 'Falu-red panel exterior repainted three summers ago. **No central heating** — wood stove and electric panels. 600m to the lake, walking-distance to a station with a 90-min train to Stockholm. Habitable as-is for a summer house; an honest winter home would need insulation work.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1400&q=80&fit=crop',
    tone: 'terracotta', isNew: true,
  },
  {
    id: 9, country: 'Portugal', flag: '🇵🇹', countryShort: 'Portugal',
    location: 'Beira Baixa · Portugal', locationShort: 'Beira Baixa, Portugal',
    price: '47.500', currencySymbol: '€',
    title: 'Village house with vineyard and well',
    meta: ['3 rooms', '120 m²', 'Habitable'],
    note: 'Habitable as-is, with a working well and 800m² of mature vineyard out back. **Kitchen was redone in 2021.** The catch is the village — fewer than 200 people, no school, the bakery closes for August. If isolation is the appeal, this is the listing.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=80&fit=crop',
    tone: 'olive', isNew: false,
  },
  {
    id: 10, country: 'Italy', flag: '🇮🇹', countryShort: 'Italy',
    location: 'Sicily · Italy', locationShort: 'Sicily, Italy',
    price: '1', currencySymbol: '€',
    title: 'One-euro townhouse, Mussomeli scheme',
    meta: ['4 rooms', '95 m²', 'Reno obligation'],
    note: 'The famous €1 program. **Real catch:** you must commit €25K of renovation within 3 years and post a €5K deposit. Building has a fresh roof (2022) but no plumbing on the upper floor. The municipality is genuinely helpful with paperwork.',
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1400&q=80&fit=crop',
    tone: 'terracotta', isNew: true,
  },
  {
    id: 11, country: 'France', flag: '🇫🇷', countryShort: 'France',
    location: 'Creuse · France', locationShort: 'Creuse, France',
    price: '36.000', currencySymbol: '€',
    title: 'Stone longère with attached barn',
    meta: ['3 rooms', '110 m²', 'Habitable'],
    note: 'Longère typology — long single-storey stone with attached barn. **Habitable but spartan.** Septic was replaced 2019; roof is original slate and needs watching. 12 minutes from Guéret. The Creuse is the cheapest department in France and is depopulating; do your research on services.',
    image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1400&q=80&fit=crop',
    tone: 'granite', isNew: false,
  },
  {
    id: 12, country: 'Spain', flag: '🇪🇸', countryShort: 'Spain',
    location: 'Aragon · Spain', locationShort: 'Aragon, Spain',
    price: '24.000', currencySymbol: '€',
    title: 'Adobe village house, three floors',
    meta: ['5 rooms', '160 m²', 'Light reno'],
    note: 'Three floors plus attic, all habitable. **Adobe construction — thick walls, cool in summer.** The catch is the village population (94) and the 40-minute drive to a proper supermarket. Seller is the daughter of the previous owner; she lives in Zaragoza and wants a quick close.',
    image: 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=1400&q=80&fit=crop',
    tone: 'terracotta', isNew: false,
  },
  {
    id: 13, country: 'Japan', flag: '🇯🇵', countryShort: 'Japan',
    location: 'Tokushima Prefecture · Japan', locationShort: 'Tokushima, Japan',
    price: '2,800,000', currencySymbol: '¥',
    title: 'Mountain akiya on terraced land',
    meta: ['4 rooms', '95 m²', 'Akiya bank'],
    note: 'Listed through the prefectural akiya bank; the owner left a decade ago. **Inspection mandatory** — budget ¥180K. Terraced land is 1,400m², mostly bamboo now. The local relocation office helps with paperwork and translation if you commit to two years of residency.',
    image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=1400&q=80&fit=crop',
    tone: 'cedar', isNew: false,
  },
  {
    id: 14, country: 'Germany', flag: '🇩🇪', countryShort: 'Germany',
    location: 'Saxony-Anhalt · Germany', locationShort: 'Saxony-Anhalt, Germany',
    price: '55.000', currencySymbol: '€',
    title: 'Half-timbered townhouse, three floors',
    meta: ['6 rooms', '195 m²', 'Listed'],
    note: 'Plumbing and wiring are 1970s and need replacing. **Roof tiles last redone 2014.** Listed building — facade changes need municipal approval but the town actively helps with restoration grants. Walking-distance to the train station and a Lidl.',
    image: 'https://images.unsplash.com/photo-1582160683329-9bf8a9c7c9c1?w=1400&q=80&fit=crop',
    tone: 'timber', isNew: false,
  },
  {
    id: 15, country: 'USA', flag: '🇺🇸', countryShort: 'Vermont',
    location: 'Northeast Kingdom · Vermont', locationShort: 'NEK, Vermont',
    price: '48,000', currencySymbol: '$',
    title: 'Hunting cabin on 6 wooded acres',
    meta: ['1 room', '40 m²', 'Off-grid'],
    note: 'Off-grid. **No utilities, no septic, no road frontage past November.** Cabin is solid, dry, and tight — woodstove, propane fridge, gravity-fed spring water. Buyers should drive in before committing; the access trail is a 0.4-mile walk in mud season.',
    image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1400&q=80&fit=crop',
    tone: 'pine', isNew: true,
  },
  {
    id: 16, country: 'Canada', flag: '🇨🇦', countryShort: 'New Brunswick',
    location: 'New Brunswick · Canada', locationShort: 'New Brunswick, Canada',
    price: '72,000', currencySymbol: 'CA$',
    title: 'Cedar-shingle home on 8 acres',
    meta: ['4 rooms', '140 m²', 'Move-in'],
    note: 'Move-in ready. **Cedar shingles redone 2020, drilled well 2018, new propane furnace 2023.** 8 acres of mixed woodland, mostly maple and birch. 25 minutes to Fredericton. Owners are downsizing and motivated; this one will move.',
    image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=1400&q=80&fit=crop',
    tone: 'pine', isNew: true,
  },
]

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
