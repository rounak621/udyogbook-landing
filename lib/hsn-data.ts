import fs from 'fs'
import path from 'path'
import {
  matchHSNRates,
  formatRateDisplay,
  RATE_SOURCE_BANNER,
  RESIDUAL_RATE_TITLE,
  RESIDUAL_RATE_NOTE,
  TIER2_COLLAPSED_TITLE,
  TIER2_COLLAPSED_LINE,
  TIER2_RESIDUAL_LINE,
  GoodsRateItem,
  MatchedRate,
  RateMatchResult,
  RateDisplay,
} from './rate-matcher'

export interface HSNItem {
  c: string
  d: string
  p: string[]
}

export interface SACItem {
  c: string
  d: string
  p: string[]
}

export type { GoodsRateItem, MatchedRate, RateMatchResult, RateDisplay }
export {
  matchHSNRates,
  formatRateDisplay,
  RATE_SOURCE_BANNER,
  RESIDUAL_RATE_TITLE,
  RESIDUAL_RATE_NOTE,
  TIER2_COLLAPSED_TITLE,
  TIER2_COLLAPSED_LINE,
  TIER2_RESIDUAL_LINE,
}

let _hsnData: HSNItem[] | null = null
let _sacData: SACItem[] | null = null
let _goodsRatesData: GoodsRateItem[] | null = null

function loadData() {
  if (!_hsnData) {
    const p = path.join(process.cwd(), 'data/hsn-source/hsn_codes.json')
    _hsnData = JSON.parse(fs.readFileSync(p, 'utf8'))
  }
  if (!_sacData) {
    const p = path.join(process.cwd(), 'data/hsn-source/sac_codes.json')
    _sacData = JSON.parse(fs.readFileSync(p, 'utf8'))
  }
  if (!_goodsRatesData) {
    const p = path.join(process.cwd(), 'data/hsn-source/goods_rates.json')
    _goodsRatesData = JSON.parse(fs.readFileSync(p, 'utf8'))
  }
}

export function getAllHSNItems(): HSNItem[] {
  loadData()
  return _hsnData!
}

export function getAllSACItems(): SACItem[] {
  loadData()
  return _sacData!
}

export function getAllGoodsRates(): GoodsRateItem[] {
  loadData()
  return _goodsRatesData!
}

export function getAllHSNHeadings(): HSNItem[] {
  loadData()
  return _hsnData!.filter(x => x.c.length === 4)
}

export function getAllHSNChapters(): HSNItem[] {
  loadData()
  return _hsnData!.filter(x => x.c.length === 2).sort((a, b) => a.c.localeCompare(b.c))
}

export function getAll6DigitSACCodes(): SACItem[] {
  loadData()
  return _sacData!.filter(x => x.c.length === 6)
}

export function getRatesForHSN(code: string): MatchedRate[] {
  loadData()
  return matchHSNRates(code, _goodsRatesData!).mainRates
}

export function getHSNHeadingDetails(code: string) {
  loadData()
  const heading = _hsnData!.find(x => x.c === code && x.c.length === 4)
  if (!heading) return null

  const chapterCode = code.slice(0, 2)
  const chapter = _hsnData!.find(x => x.c === chapterCode && x.c.length === 2)

  // Children: all codes under this heading
  const children = _hsnData!
    .filter(x => x.c.startsWith(code) && x.c.length > 4)
    .sort((a, b) => a.c.localeCompare(b.c))

  // Siblings: other 4-digit headings in the same chapter
  const siblings = _hsnData!
    .filter(x => x.c.startsWith(chapterCode) && x.c.length === 4 && x.c !== code)
    .sort((a, b) => a.c.localeCompare(b.c))

  const rateResult = matchHSNRates(code, _goodsRatesData!)

  return {
    heading,
    chapterCode,
    chapter,
    children,
    siblings,
    rates: rateResult.mainRates,
    rateResult,
  }
}

export function getSACDetails(code: string) {
  loadData()
  const sac = _sacData!.find(x => x.c === code)
  if (!sac) return null

  const headingCode = code.slice(0, 4)
  const heading = _sacData!.find(x => x.c === headingCode && x.c.length === 4)

  // Siblings: other 6-digit SAC codes sharing same 4-digit heading
  const siblings = _sacData!
    .filter(x => x.c.startsWith(headingCode) && x.c.length === 6 && x.c !== code)
    .sort((a, b) => a.c.localeCompare(b.c))

  return {
    sac,
    headingCode,
    heading,
    siblings,
  }
}

export function getChapterDetails(chapterCode: string) {
  loadData()
  const chapter = _hsnData!.find(x => x.c === chapterCode && x.c.length === 2)
  if (!chapter) return null

  const headings = _hsnData!
    .filter(x => x.c.startsWith(chapterCode) && x.c.length === 4)
    .sort((a, b) => a.c.localeCompare(b.c))
    .map(h => ({
      ...h,
      rateResult: matchHSNRates(h.c, _goodsRatesData!),
    }))

  return {
    chapter,
    chapterCode,
    headings,
  }
}

export * from './hsn-copy'
import {
  getHSNCopy,
  getSACCopy,
  getChapterCopy,
  HSNPageCopy,
  SACPageCopy,
  ChapterPageCopy,
} from './hsn-copy'

export function getHSNPageSummary(
  heading: HSNItem,
  rateResult: RateMatchResult,
  children: HSNItem[]
): HSNPageCopy {
  return getHSNCopy(heading, rateResult, children)
}

export function getSACPageSummary(
  sac: SACItem,
  heading: SACItem | undefined,
  headingCode: string,
  siblings: SACItem[]
): SACPageCopy {
  return getSACCopy(sac, heading, headingCode, siblings)
}

export function getChapterPageSummary(
  chapter: HSNItem,
  headingsCount: number
): ChapterPageCopy {
  return getChapterCopy(chapter, headingsCount)
}
