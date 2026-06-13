export type ListingTone = 'olive' | 'terracotta' | 'granite' | 'cedar' | 'pine' | 'timber'

export interface Listing {
  id: number
  state: string
  stateShort: string
  location: string
  locationShort: string
  price: string
  currencySymbol: string
  title: string
  meta: string[]
  note: string
  image: string
  link: string | null
  tone: ListingTone
  isNew: boolean
  published: boolean
}

export interface AugmentedListing extends Listing {
  _p: number
  _cond: 'good' | 'average' | 'partial' | 'ruin'
  _type: 'farmhouse' | 'cottage' | 'village' | 'akiya' | 'cabin' | 'ranch' | 'offgrid'
}

export type FilterGroup = 'price' | 'type' | 'condition' | 'state'
export type FilterValues = Record<FilterGroup, string>

export interface FilterOption {
  val: string
  label: string
}

export interface FilterDef {
  group: FilterGroup
  title: string
  options: FilterOption[]
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc'
export type BillingCycle = 'monthly' | 'annual'
export type HeadlineVariant = 'classic' | 'algorithm' | 'honest'
