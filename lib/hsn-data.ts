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

export function getHSNPageSummary(
  heading: HSNItem,
  rateResult: RateMatchResult,
  children: HSNItem[]
) {
  const cleanDesc = heading.d.replace(/\s+/g, ' ').trim()
  const rawFirstClause = cleanDesc.split(/[;:\n]/)[0].trim().replace(/\.$/, '')
  const firstClauseLower = rawFirstClause.charAt(0).toLowerCase() + rawFirstClause.slice(1)
  const sentence1 = `HSN ${heading.c} covers ${firstClauseLower}.`

  const distinctRates: string[] = []
  if (rateResult.mainRates && rateResult.mainRates.length > 0) {
    for (const r of rateResult.mainRates) {
      let rStr = `${r.gst}%`
      if (r.gst === 0) rStr = '0% (Nil / exempt)'
      else if (r.cess) rStr = '28% + compensation cess'
      if (!distinctRates.includes(rStr)) {
        distinctRates.push(rStr)
      }
    }
  }

  let sentence2 = ''
  if (distinctRates.length === 1) {
    sentence2 = `GST on HSN ${heading.c} is ${distinctRates[0]} (rates effective 22 September 2025).`
  } else if (distinctRates.length > 1) {
    const rateListStr =
      distinctRates.length === 2
        ? `${distinctRates[0]} or ${distinctRates[1]}`
        : `${distinctRates.slice(0, -1).join(', ')} or ${distinctRates[distinctRates.length - 1]}`
    sentence2 = `GST on HSN ${heading.c} is ${rateListStr} depending on the conditions listed below (rates effective 22 September 2025).`
  } else {
    sentence2 = `GST on HSN ${heading.c} is 18% under residual Schedule II, S. No. 639 (rates effective 22 September 2025).`
  }

  let sentence3 = ''
  if (children.length > 0) {
    const examples = children
      .slice(0, 3)
      .map(ch => {
        const cDesc = ch.d.replace(/\s+/g, ' ').trim().split(/[;:\n]/)[0].trim().replace(/\.$/, '')
        return cDesc.charAt(0).toLowerCase() + cDesc.slice(1)
      })
      .join(', ')
    sentence3 = `This heading has ${children.length} sub-codes, for example ${examples}.`
  } else {
    sentence3 = `This heading has no further sub-codes in the tariff schedule.`
  }

  const introParagraph = `${sentence1} ${sentence2} ${sentence3}`

  const rawMetaDesc = `${sentence1} ${sentence2}`
  let metaDescription = rawMetaDesc
  if (rawMetaDesc.length > 158) {
    const prefix = `HSN ${heading.c} covers `
    const allowedDescLen = 158 - prefix.length - 2 - sentence2.length
    let shortClause = firstClauseLower
    if (shortClause.length > allowedDescLen) {
      shortClause = shortClause.slice(0, Math.max(10, allowedDescLen - 1)).trim() + '…'
    }
    metaDescription = `${prefix}${shortClause}. ${sentence2}`
  }

  const prefix = `HSN ${heading.c} GST Rate:`
  const maxDescLen = 51 - prefix.length - 1
  const shortClause =
    rawFirstClause.length > maxDescLen
      ? rawFirstClause.slice(0, maxDescLen - 1).trim() + '…'
      : rawFirstClause
  const metaTitle = `${prefix} ${shortClause}`

  return {
    sentence1,
    sentence2,
    sentence3,
    introParagraph,
    metaDescription,
    metaTitle,
  }
}

export function getSACPageSummary(
  sac: SACItem,
  heading: SACItem | undefined,
  headingCode: string,
  siblings: SACItem[]
) {
  const cleanDesc = sac.d.replace(/\s+/g, ' ').trim().replace(/\.$/, '')
  const descLower = cleanDesc.charAt(0).toLowerCase() + cleanDesc.slice(1)
  const groupDesc = heading ? heading.d.replace(/\s+/g, ' ').trim().replace(/\.$/, '') : ''
  const groupText = groupDesc ? `service group ${headingCode} (${groupDesc})` : `service group ${headingCode}`

  const introParagraph = `SAC ${sac.c} is the Services Accounting Code for ${descLower}. It belongs to ${groupText} with ${siblings.length} related service codes.`
  let metaDescription = introParagraph
  if (introParagraph.length > 158) {
    const prefix = `SAC ${sac.c} covers `
    const suffix = `. Service group ${headingCode} (${siblings.length} related codes).`
    const allowed = 158 - prefix.length - suffix.length
    let shortDesc = descLower
    if (shortDesc.length > allowed) {
      shortDesc = shortDesc.slice(0, Math.max(10, allowed - 1)).trim() + '…'
    }
    metaDescription = `${prefix}${shortDesc}${suffix}`
  }

  const prefix = `SAC ${sac.c} Service Code:`
  const maxDescLen = 51 - prefix.length - 1
  const rawClause = cleanDesc.split(/[;:\n]/)[0].trim().replace(/\.$/, '')
  const shortClause =
    rawClause.length > maxDescLen
      ? rawClause.slice(0, maxDescLen - 1).trim() + '…'
      : rawClause
  const metaTitle = `${prefix} ${shortClause}`

  return {
    introParagraph,
    metaDescription,
    metaTitle,
  }
}

export function getChapterPageSummary(chapter: HSNItem, headingsCount: number) {
  const cleanDesc = chapter.d.replace(/\s+/g, ' ').trim().replace(/\.$/, '')
  const rawClause = cleanDesc.split(/[;:\n]/)[0].trim().replace(/\.$/, '')
  const descLower = rawClause.charAt(0).toLowerCase() + rawClause.slice(1)

  const introParagraph = `Chapter ${chapter.c} of the GST HSN tariff classifies ${descLower}. This chapter contains ${headingsCount} 4-digit tariff heading${headingsCount === 1 ? '' : 's'} with applicable GST rates effective 22 September 2025.`
  
  const prefix = `HSN Chapter ${chapter.c} covers `
  const suffix = `. ${headingsCount} headings with CBIC GST rates (eff. 22 Sep 2025).`
  const allowedDescLen = 158 - prefix.length - suffix.length
  let shortDesc = descLower
  if (shortDesc.length > allowedDescLen) {
    shortDesc = shortDesc.slice(0, Math.max(10, allowedDescLen - 1)).trim() + '…'
  }
  const metaDescription = `${prefix}${shortDesc}${suffix}`

  const titlePrefix = `Chapter ${chapter.c} HSN Codes:`
  const maxTitleDescLen = 51 - titlePrefix.length - 1
  const shortTitleClause =
    rawClause.length > maxTitleDescLen
      ? rawClause.slice(0, maxTitleDescLen - 1).trim() + '…'
      : rawClause
  const metaTitle = `${titlePrefix} ${shortTitleClause}`

  return {
    introParagraph,
    metaDescription,
    metaTitle,
  }
}
