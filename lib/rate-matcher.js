/**
 * Shared HSN Rate Matching Logic
 * Implements 2-tier rate matching per CBIC Notifications 09/2025 & 10/2025.
 *
 * Rules:
 * - Tier 1 (main rates): rows where a code in codes[] has >= 4 digits and matches the searched code.
 * - Tier 2 (chapter-wide): rows where the matching code has only 2 digits.
 * - If Tier 1 has rows: show only Tier 1 as main rates. Tier 2 in collapsed section: "Other entries in this chapter".
 * - If Tier 1 is empty and Tier 2 has rows: show Tier 2 as main rates with residual 18% note.
 * - If both are empty: show residual 18% message.
 * - Rows with spec containing "any chapter" / "any other chapter" are always Tier 2.
 * - Chapter 64 footwear: entry S. No. 392 (sale value <= 2500, 5%) applies to footwear headings (6401-6405) in Tier 1.
 */

const RATE_SOURCE_BANNER =
  'GST rates as per CBIC Notifications 09/2025 and 10/2025 (Central Tax - Rate), effective 22 September 2025. Last updated: October 2026. Always verify on the official GST portal before filing.'

const RESIDUAL_RATE_TITLE =
  'Not specifically listed in the rate schedules. Residual entry: 18%'

const RESIDUAL_RATE_NOTE =
  'Goods not specified elsewhere are taxed at 18% (CGST 9% + SGST 9%) as per Schedule II, S. No. 639'

const TIER2_COLLAPSED_TITLE = 'Other entries in this chapter'

const TIER2_COLLAPSED_LINE = 'These apply only if your goods match the description.'

const TIER2_RESIDUAL_LINE =
  'If none of these descriptions fit your goods, the residual rate is 18% (Schedule II, S. No. 639).'

function matchHSNRates(code, goodsRates) {
  const cleanCode = String(code || '').trim().replace(/\D/g, '')
  if (!cleanCode || !goodsRates || !goodsRates.length) {
    return {
      tier1: [],
      tier2: [],
      mainRates: [],
      hasTier1: false,
      hasTier2: false,
      isTier2Main: false,
      isResidualOnly: true,
      residualNote: null,
    }
  }

  const tier1 = []
  const tier2 = []

  // Headings in Chapter 64 that are footwear (excluding 6406 which is parts)
  const isCh64FootwearHeading =
    cleanCode.startsWith('6401') ||
    cleanCode.startsWith('6402') ||
    cleanCode.startsWith('6403') ||
    cleanCode.startsWith('6404') ||
    cleanCode.startsWith('6405')

  for (const row of goodsRates) {
    if (!row.codes || row.codes.length === 0) continue

    const spec = (row.spec || '').toLowerCase()
    const isAnyChapter =
      /any\s*(other\s*)?chapter/i.test(row.spec) ||
      /a\s*n\s*y\s*(other\s*)?chapter/i.test(row.spec)

    // Check if this is Chapter 64 footwear entry (Schedule I, S. No. 392)
    const isCh64FootwearEntry =
      isCh64FootwearHeading && row.sn === 392 && row.sch === 'I'

    let matchedCode = null
    let isSubCode = false
    let is4Digit = false

    for (const c of row.codes) {
      const cleanC = String(c).trim().replace(/\D/g, '')
      if (cleanC.length >= 4) {
        if (cleanCode.startsWith(cleanC)) {
          if (!matchedCode || cleanC.length > matchedCode.length) {
            matchedCode = cleanC
          }
          is4Digit = true
        } else if (cleanC.startsWith(cleanCode)) {
          if (!matchedCode || cleanC.length > matchedCode.length) {
            matchedCode = cleanC
          }
          is4Digit = true
          isSubCode = true
        }
      } else if (cleanC.length === 2) {
        if (cleanCode.startsWith(cleanC)) {
          if (!matchedCode) matchedCode = cleanC
        }
      }
    }

    if (matchedCode) {
      const matchObj = {
        ...row,
        matchedCode,
        isSubCode,
        matchSpecificity: matchedCode.length,
      }

      if (isCh64FootwearEntry) {
        tier1.push(matchObj)
      } else if (isAnyChapter) {
        tier2.push(matchObj)
      } else if (is4Digit) {
        tier1.push(matchObj)
      } else if (matchedCode.length === 2) {
        tier2.push(matchObj)
      }
    }
  }

  // Sort Tier 1: specific code length descending, then gst ascending, then sn ascending
  tier1.sort((a, b) => {
    if (b.matchSpecificity !== a.matchSpecificity) {
      return b.matchSpecificity - a.matchSpecificity
    }
    if (a.gst !== b.gst) return a.gst - b.gst
    return (a.sn || 0) - (b.sn || 0)
  })

  // Sort Tier 2: gst ascending, then sn ascending
  tier2.sort((a, b) => {
    if (a.gst !== b.gst) return a.gst - b.gst
    return (a.sn || 0) - (b.sn || 0)
  })

  const hasTier1 = tier1.length > 0
  const hasTier2 = tier2.length > 0

  let mainRates = []
  let isTier2Main = false
  let isResidualOnly = false
  let residualNote = null

  if (hasTier1) {
    mainRates = tier1
  } else if (hasTier2) {
    mainRates = tier2
    isTier2Main = true
    residualNote = TIER2_RESIDUAL_LINE
  } else {
    isResidualOnly = true
  }

  return {
    tier1,
    tier2,
    mainRates,
    hasTier1,
    hasTier2,
    isTier2Main,
    isResidualOnly,
    residualNote,
  }
}

function formatRateDisplay(rate) {
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

module.exports = {
  matchHSNRates,
  formatRateDisplay,
  RATE_SOURCE_BANNER,
  RESIDUAL_RATE_TITLE,
  RESIDUAL_RATE_NOTE,
  TIER2_COLLAPSED_TITLE,
  TIER2_COLLAPSED_LINE,
  TIER2_RESIDUAL_LINE,
}
