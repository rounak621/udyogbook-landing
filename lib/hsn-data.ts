import fs from 'fs'
import path from 'path'

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

export const RATE_SOURCE_BANNER =
  'GST rates as per CBIC Notifications 09/2025 and 10/2025 (Central Tax - Rate), effective 22 September 2025. Last updated: October 2026. Always verify on the official GST portal before filing.'

export const RESIDUAL_RATE_TITLE =
  'Not specifically listed in the rate schedules. Residual entry: 18%'

export const RESIDUAL_RATE_NOTE =
  'Goods not specified elsewhere are taxed at 18% (CGST 9% + SGST 9%) as per Schedule II, S. No. 639'

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

export function getAll6DigitSACCodes(): SACItem[] {
  loadData()
  return _sacData!.filter(x => x.c.length === 6)
}

export function getRatesForHSN(code: string): MatchedRate[] {
  loadData()
  const cleanCode = String(code).trim().replace(/\D/g, '')
  if (!cleanCode) return []

  const matches: MatchedRate[] = []

  for (const row of _goodsRatesData!) {
    if (!row.codes || row.codes.length === 0) continue
    const spec = (row.spec || '').toLowerCase()
    // Catch-all rows: spec contains "Any chapter" / "All goods" or codes[] is empty
    if (/any\s*chapter/i.test(row.spec) || /a\s*n\s*y\s*chapter/i.test(row.spec) || spec.includes('all goods')) {
      continue
    }

    let matchedCode: string | null = null
    let isSubCode = false
    let isParentOrExact = false

    for (const c of row.codes) {
      if (cleanCode.startsWith(c)) {
        isParentOrExact = true
        if (!matchedCode || c.length > matchedCode.length) {
          matchedCode = c
        }
      } else if (c.startsWith(cleanCode)) {
        if (!matchedCode || c.length > matchedCode.length) {
          matchedCode = c
        }
      }
    }

    if (matchedCode) {
      isSubCode = !isParentOrExact
      matches.push({
        ...row,
        matchedCode,
        isSubCode,
        matchSpecificity: matchedCode.length,
      })
    }
  }

  // Sort most specific code first, then by schedule / sn
  matches.sort((a, b) => {
    if (b.matchSpecificity !== a.matchSpecificity) {
      return b.matchSpecificity - a.matchSpecificity
    }
    return (a.sn || 0) - (b.sn || 0)
  })

  return matches
}

export function formatRateDisplay(rate: GoodsRateItem): {
  headline: string
  split: string
} {
  if (rate.gst === 0) {
    return {
      headline: '0% (Nil / exempt)',
      split: 'CGST Nil + SGST Nil / IGST Nil',
    }
  }

  if (rate.cess) {
    const half = (rate.gst / 2).toString().replace(/\.0$/, '')
    const cgstStr = rate.cgst || `${half}%`
    return {
      headline: '28% + compensation cess',
      split: `CGST ${cgstStr} + SGST ${cgstStr} / IGST 28% + Cess`,
    }
  }

  const half = (rate.gst / 2).toString().replace(/\.0$/, '')
  const cgstStr = rate.cgst || `${half}%`
  return {
    headline: `${rate.gst}%`,
    split: `CGST ${cgstStr} + SGST ${cgstStr} / IGST ${rate.gst}%`,
  }
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

  const rates = getRatesForHSN(code)

  return {
    heading,
    chapterCode,
    chapter,
    children,
    siblings,
    rates,
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
