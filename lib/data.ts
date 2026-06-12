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
      { val: 'under200', label: '$100K – $200K' },
    ],
  },
  {
    group: 'type', title: 'Property type', options: [
      { val: 'all', label: 'All types' }, { val: 'farmhouse', label: 'Farmhouse' },
      { val: 'cottage', label: 'Cottage' }, { val: 'village', label: 'Village house' },
      { val: 'akiya', label: 'Akiya' }, { val: 'cabin', label: 'Cabin' },
      { val: 'ranch', label: 'Ranch' }, { val: 'offgrid', label: 'Off-grid' },
    ],
  },
  {
    group: 'condition', title: 'Condition', options: [
      { val: 'all', label: 'All conditions' }, { val: 'livable', label: 'Move-in ready' },
      { val: 'partial', label: 'Partial work needed' }, { val: 'ruin', label: 'Full renovation' },
    ],
  },
]

export const FILTER_DEFAULTS: FilterValues = { price: 'all', type: 'all', condition: 'all', state: 'all' }

export const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas',
  CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware',
  FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho',
  IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas',
  KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
  MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
  NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
  NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
  OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah',
  VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia',
  WI: 'Wisconsin', WY: 'Wyoming',
}

export const PILL_LABELS: Record<string, Record<string, string>> = {}
FILTER_DEFS.forEach(({ group, options }) => {
  PILL_LABELS[group] = {}
  options.forEach(({ val, label }) => { PILL_LABELS[group][val] = label })
})
