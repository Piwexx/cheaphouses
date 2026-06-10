export type ListingTone = 'olive' | 'terracotta' | 'granite' | 'cedar' | 'pine' | 'timber'

export interface Listing {
  id: number
  country: string
  flag: string
  countryShort: string
  location: string
  locationShort: string
  price: string
  currencySymbol: string
  title: string
  meta: string[]
  note: string
  image: string
  tone: ListingTone
  isNew: boolean
}

export interface AugmentedListing extends Listing {
  _p: number
  _cc: string
  _cond: 'good' | 'average' | 'partial' | 'ruin'
  _type: 'farmhouse' | 'cottage' | 'village' | 'akiya'
}

export interface Country {
  flag: string
  name: string
}

export type FilterGroup = 'country' | 'price' | 'type' | 'condition'
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
