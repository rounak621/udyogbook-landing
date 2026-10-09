export interface GoodsRateItem {
  sch: string
  sn: number
  codes: string[]
  spec: string
  d: string
  gst: number
  cgst: string
  cess: boolean
}

export interface MatchedRate extends GoodsRateItem {
  matchedCode: string
  isSubCode: boolean
  matchSpecificity: number
}

export interface RateMatchResult {
  tier1: MatchedRate[]
  tier2: MatchedRate[]
  mainRates: MatchedRate[]
  hasTier1: boolean
  hasTier2: boolean
  isTier2Main: boolean
  isResidualOnly: boolean
  residualNote: string | null
}

export interface RateDisplay {
  headline: string
  split: string
}

export declare const RATE_SOURCE_BANNER: string
export declare const RESIDUAL_RATE_TITLE: string
export declare const RESIDUAL_RATE_NOTE: string
export declare const TIER2_COLLAPSED_TITLE: string
export declare const TIER2_COLLAPSED_LINE: string
export declare const TIER2_RESIDUAL_LINE: string

export declare function matchHSNRates(
  code: string,
  goodsRates: GoodsRateItem[]
): RateMatchResult

export declare function formatRateDisplay(rate: GoodsRateItem): RateDisplay
