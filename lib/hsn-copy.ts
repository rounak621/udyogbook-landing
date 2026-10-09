import type { HSNItem, SACItem, RateMatchResult, GoodsRateItem } from './hsn-data'

export const ACRONYMS = [
  'GST',
  'HSN',
  'SAC',
  'LPG',
  'CNG',
  'PVC',
  'UHT',
  'LED',
  'LCD',
  'TV',
  'CD',
  'DVD',
  'USB',
  'UPS',
  'CPU',
  'GPS',
  'AC',
  'DC',
  'HS',
  'NES',
]

/**
 * Checks if a string is predominantly Title Case (most words starting with a capital letter).
 */
export function isMostlyTitleCase(text: string): boolean {
  const words = text.split(/\s+/).filter(w => /^[a-zA-Z]/.test(w))
  if (words.length <= 1) return false
  let capCount = 0
  for (const w of words) {
    if (w[0] === w[0].toUpperCase() && w[0] !== w[0].toLowerCase()) {
      capCount++
    }
  }
  return capCount / words.length > 0.5
}

/**
 * Restores specific acronyms to uppercase and preserves "T-shirts" / "T-shirt".
 */
export function restoreAcronyms(text: string): string {
  let s = text
  for (const ac of ACRONYMS) {
    if (ac === 'UPS') {
      // Avoid matching "made ups" (textiles)
      s = s.replace(/(?<!made\s)\bups\b/gi, 'UPS')
    } else {
      const re = new RegExp(`\\b${ac.toLowerCase()}\\b`, 'gi')
      s = s.replace(re, ac)
    }
  }
  s = s.replace(/\bt-shirts\b/gi, 'T-shirts')
  s = s.replace(/\bt-shirt\b/gi, 'T-shirt')
  return s
}

/**
 * Rule A: sentenceCase(text)
 * Lower-cases everything, then capitalises the first letter of the text only.
 * Restores specified acronyms in upper case and keeps "T-shirts" with a capital T.
 * Keeps text inside brackets lower-case unless it is an acronym.
 * Does not use sentence-case on SAC descriptions that are already sentence case;
 * applies only when most words start with a capital letter.
 */
export function sentenceCase(text: string): string {
  let trimmed = text
    .replace(/\s*\([a-z0-9\s]*\.*$/i, '')
    .replace(/(\.{3,}|…)+/g, '')
    .replace(/[\s,;:(\[\-–—.]+$/, '')
    .trim()
  if (!trimmed) return ''

  if (!isMostlyTitleCase(trimmed)) {
    const restored = restoreAcronyms(trimmed)
    return restored.charAt(0).toUpperCase() + restored.slice(1)
  }

  const lower = trimmed.toLowerCase()
  const capitalized = lower.charAt(0).toUpperCase() + lower.slice(1)
  return restoreAcronyms(capitalized)
}

/**
 * Lowers the first letter of sentenceCase(text) unless the first word is an acronym or T-shirts.
 */
export function lowerFirstUnlessAcronym(text: string): string {
  const sc = sentenceCase(text)
  if (!sc) return ''
  if (/^t-shirts?\b/i.test(sc)) {
    return sc.charAt(0).toUpperCase() + sc.slice(1)
  }
  const firstWord = sc.split(/[\s,;:(\[]/)[0]
  if (ACRONYMS.includes(firstWord.toUpperCase())) {
    return sc
  }
  return sc.charAt(0).toLowerCase() + sc.slice(1)
}

/**
 * Cleans trailing whitespace, punctuation, and stop words: "and", "or", "of", "for", "the", "with", "in".
 */
export function cleanTrailingWordsAndPunct(str: string): string {
  let s = str.replace(/(\.{3,}|…)+/g, '').trim()
  s = s.replace(/[\s,;:(\[\-–—.]+$/, '').trim()
  const stopWordsRegex = /\b(and|or|of|for|the|with|in)$/i
  let changed = true
  while (changed) {
    changed = false
    const match = s.match(stopWordsRegex)
    if (match) {
      s = s.slice(0, match.index).trim()
      s = s.replace(/[\s,;:(\[\-–—.]+$/, '').trim()
      changed = true
    }
  }
  return s
}

/**
 * Rule B: shortName(text)
 * Takes sentenceCase(text), cuts at the first of: comma, semicolon, colon, " (", " whether", " other than", " principally"; trims.
 * If still longer than 60 characters, cuts at the last full word that fits in 60 characters.
 * Never adds "…" or "...".
 * Removes trailing "and", "or", "of", "for", "the", "with", "in".
 */
export function shortName(text: string): string {
  const sc = sentenceCase(text)
  const delimiters = [',', ';', ':', ' (', ' whether', ' other than', ' principally']
  let cutIndex = -1

  for (const delim of delimiters) {
    const idx = sc.indexOf(delim)
    if (idx !== -1) {
      if (cutIndex === -1 || idx < cutIndex) {
        cutIndex = idx
      }
    }
  }

  let s = cutIndex !== -1 ? sc.slice(0, cutIndex) : sc
  s = cleanTrailingWordsAndPunct(s)

  if (s.length > 60) {
    let sub = s.slice(0, 60)
    const lastSpace = sub.lastIndexOf(' ')
    if (lastSpace > 0) {
      sub = sub.slice(0, lastSpace)
    }
    s = cleanTrailingWordsAndPunct(sub)
  }

  return s
}

/**
 * Shortens a string by whole words from the end until it fits within maxLen.
 * If it cannot fit even one word, returns ''.
 */
export function shortenByWholeWords(name: string, maxLen: number): string {
  let s = cleanTrailingWordsAndPunct(name)
  if (s.length <= maxLen) return s

  while (s.length > maxLen) {
    const lastSpace = s.lastIndexOf(' ')
    if (lastSpace === -1) return ''
    s = s.slice(0, lastSpace)
    s = cleanTrailingWordsAndPunct(s)
  }
  return s
}

/**
 * Rule C: rateSummary for HSN pages
 * Distinct main-rate percentages from matcher output, sorted ascending, joined with " or ".
 * If more than 3 distinct rates, use "varies by item".
 * For rates with cess, write "28% + cess".
 * Exempt is "0%".
 */
export function getRateSummary(mainRates: Array<{ gst: number; cess?: boolean }>): string {
  if (!mainRates || mainRates.length === 0) {
    return '18%'
  }
  const map = new Map<string, number>()
  for (const r of mainRates) {
    let str = `${r.gst}%`
    let val = r.gst
    if (r.gst === 0) {
      str = '0%'
      val = 0
    } else if (r.cess) {
      str = '28% + cess'
      val = 28.01
    }
    if (!map.has(str)) {
      map.set(str, val)
    }
  }
  const sorted = Array.from(map.entries())
    .sort((a, b) => a[1] - b[1])
    .map(e => e[0])

  if (sorted.length > 3) {
    return 'varies by item'
  }
  return sorted.join(' or ')
}

/**
 * Formats a 6-digit or 8-digit tariff code with spaces: "6109 10 00" or "6109 10".
 */
export function formatTariffCode(code: string): string {
  if (code.length === 8) {
    return `${code.slice(0, 4)} ${code.slice(4, 6)} ${code.slice(6, 8)}`
  }
  if (code.length === 6) {
    return `${code.slice(0, 4)} ${code.slice(4, 6)}`
  }
  return code
}

/**
 * Rule G - Sentence 3:
 * "This heading has {n} tariff items, for example {code1}, {code2} and {code3}."
 * Uses distinct 8-digit tariff codes only, formatted as "6109 10 00", the first three in code order.
 * n = number of distinct 8-digit codes under the heading. If n is 0, uses distinct 6-digit codes.
 * If heading has no sub-codes, omits sentence 3.
 */
export function getSentence3(headingCode: string, allChildren: HSNItem[]): string {
  const codes8 = Array.from(
    new Set(allChildren.filter(x => x.c.startsWith(headingCode) && x.c.length === 8).map(x => x.c))
  ).sort()

  if (codes8.length > 0) {
    const formatted = codes8.slice(0, 3).map(formatTariffCode)
    let exStr = ''
    if (formatted.length === 1) exStr = formatted[0]
    else if (formatted.length === 2) exStr = `${formatted[0]} and ${formatted[1]}`
    else exStr = `${formatted[0]}, ${formatted[1]} and ${formatted[2]}`
    return `This heading has ${codes8.length} tariff items, for example ${exStr}.`
  }

  const codes6 = Array.from(
    new Set(allChildren.filter(x => x.c.startsWith(headingCode) && x.c.length === 6).map(x => x.c))
  ).sort()

  if (codes6.length > 0) {
    const formatted = codes6.slice(0, 3).map(formatTariffCode)
    let exStr = ''
    if (formatted.length === 1) exStr = formatted[0]
    else if (formatted.length === 2) exStr = `${formatted[0]} and ${formatted[1]}`
    else exStr = `${formatted[0]}, ${formatted[1]} and ${formatted[2]}`
    return `This heading has ${codes6.length} tariff items, for example ${exStr}.`
  }

  return ''
}

export interface HSNPageCopy {
  shortName: string
  rateSummary: string
  metaTitle: string
  h1: string
  metaDescription: string
  introParagraph: string
  breadcrumbName: string
}

/**
 * Generates all copy for an HSN Heading page (Rules D, E, F, G, J).
 */
export function getHSNCopy(
  heading: HSNItem,
  rateResult: RateMatchResult,
  children: HSNItem[]
): HSNPageCopy {
  const code = heading.c
  const sName = shortName(heading.d)
  const rSum = getRateSummary(rateResult.mainRates)

  // Rule D: HSN title before " | Udyog" (max 52 chars, total <= 60 chars)
  const baseTitle = `HSN ${code} GST Rate (${rSum})`
  const maxNameInTitle = 52 - baseTitle.length - 3 // 3 for " – "
  const sNameForTitle = shortenByWholeWords(sName, maxNameInTitle)
  const metaTitle = sNameForTitle ? `${baseTitle} – ${sNameForTitle}` : baseTitle

  // Rule E: HSN H1 (max 90 chars)
  const baseH1 = `HSN ${code}: `
  const suffixH1 = ` – GST Rate`
  const maxNameInH1 = 90 - baseH1.length - suffixH1.length
  const sNameForH1 = shortenByWholeWords(sName, maxNameInH1)
  const h1 = `${baseH1}${sNameForH1 || sName}${suffixH1}`

  // Rule F: HSN meta description (max 155 chars, never cut mid-word, no "…")
  const gstPart = rSum === 'varies by item' ? 'GST varies by item' : `GST is ${rSum}`
  const sentenceB = 'See conditions, sub-codes and the CGST/SGST split.'
  const baseWithB = `HSN ${code} (): ${gstPart} (effective 22 Sep 2025). ${sentenceB}`
  const maxNameWithB = 155 - baseWithB.length
  const shortenedNameWithB = shortenByWholeWords(sName, maxNameWithB)

  let metaDescription = ''
  if (shortenedNameWithB) {
    metaDescription = `HSN ${code} (${shortenedNameWithB}): ${gstPart} (effective 22 Sep 2025). ${sentenceB}`
  } else {
    const baseWithoutB = `HSN ${code} (): ${gstPart} (effective 22 Sep 2025).`
    const maxNameWithoutB = 155 - baseWithoutB.length
    const shortenedNameWithoutB = shortenByWholeWords(sName, maxNameWithoutB)
    if (shortenedNameWithoutB) {
      metaDescription = `HSN ${code} (${shortenedNameWithoutB}): ${gstPart} (effective 22 Sep 2025).`
    } else {
      metaDescription = `HSN ${code}: ${gstPart} (effective 22 Sep 2025).`
    }
  }

  // Rule G: HSN intro paragraph under H1 (full text, no truncation anywhere)
  const sentence1 = `HSN ${code} covers ${lowerFirstUnlessAcronym(heading.d)}.`

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
    sentence2 = `GST on HSN ${code} is ${distinctRates[0]} (rates effective 22 September 2025).`
  } else if (distinctRates.length > 1) {
    const rateListStr =
      distinctRates.length === 2
        ? `${distinctRates[0]} or ${distinctRates[1]}`
        : `${distinctRates.slice(0, -1).join(', ')} or ${distinctRates[distinctRates.length - 1]}`
    sentence2 = `GST on HSN ${code} is ${rateListStr} depending on the conditions listed below (rates effective 22 September 2025).`
  } else {
    sentence2 = `GST on HSN ${code} is 18% under residual Schedule II, S. No. 639 (rates effective 22 September 2025).`
  }

  const sentence3 = getSentence3(code, children)
  const introParagraph = sentence3 ? `${sentence1} ${sentence2} ${sentence3}` : `${sentence1} ${sentence2}`

  return {
    shortName: sName,
    rateSummary: rSum,
    metaTitle,
    h1,
    metaDescription,
    introParagraph,
    breadcrumbName: sName,
  }
}

export interface SACPageCopy {
  shortName: string
  metaTitle: string
  h1: string
  metaDescription: string
  introParagraph: string
  breadcrumbName: string
}

/**
 * Generates all copy for an SAC Code page (Rules H, J).
 */
export function getSACCopy(
  sac: SACItem,
  heading: SACItem | undefined,
  headingCode: string,
  siblings: SACItem[]
): SACPageCopy {
  const code = sac.c
  const sName = shortName(sac.d)

  // Rule H: Title "SAC {code}: {shortName}" within 60 chars total (<= 52 before " | Udyog")
  const baseTitle = `SAC ${code}: `
  const maxNameInTitle = 52 - baseTitle.length
  const sNameForTitle = shortenByWholeWords(sName, maxNameInTitle)
  const metaTitle = sNameForTitle ? `${baseTitle}${sNameForTitle}` : `SAC ${code}`

  // Rule H: H1 "SAC {code}: {shortName} – Service Code"
  const baseH1 = `SAC ${code}: `
  const suffixH1 = ` – Service Code`
  const maxNameInH1 = 90 - baseH1.length - suffixH1.length
  const sNameForH1 = shortenByWholeWords(sName, maxNameInH1)
  const h1 = `${baseH1}${sNameForH1 || sName}${suffixH1}`

  // Rule H: Meta description (at most 155 chars, no mid-word cut)
  const basePrefix = `SAC ${code} is the service accounting code for `
  const baseSuffix = `. Check the GST rate for this service on the official GST portal.`
  const maxNameInMeta = 155 - basePrefix.length - baseSuffix.length
  const sNameForMeta = shortenByWholeWords(lowerFirstUnlessAcronym(sName), maxNameInMeta)
  const metaDescription = sNameForMeta ? `${basePrefix}${sNameForMeta}${baseSuffix}` : `${basePrefix.trim()}${baseSuffix}`

  // Rule H: Intro paragraph (full description, no truncation)
  const headingDesc = heading ? sentenceCase(heading.d) : ''
  const groupText = headingDesc ? `service group ${headingCode} (${headingDesc})` : `service group ${headingCode}`
  const introParagraph = `SAC ${code} is the Services Accounting Code for ${lowerFirstUnlessAcronym(sac.d)}. It belongs to ${groupText} with ${siblings.length} related service codes.`

  return {
    shortName: sName,
    metaTitle,
    h1,
    metaDescription,
    introParagraph,
    breadcrumbName: sName,
  }
}

export interface ChapterPageCopy {
  shortName: string
  metaTitle: string
  h1: string
  metaDescription: string
  introParagraph: string
  breadcrumbName: string
}

/**
 * Generates all copy for an HSN Chapter hub page (Rules I, J).
 */
export function getChapterCopy(chapter: HSNItem, headingsCount: number): ChapterPageCopy {
  const ch = chapter.c
  const sName = shortName(chapter.d)

  // Rule I: Title "HSN Chapter {ch}: {shortName of chapter title}" within 60 chars total (<= 52 before " | Udyog")
  const baseTitle = `HSN Chapter ${ch}: `
  const maxNameInTitle = 52 - baseTitle.length
  const sNameForTitle = shortenByWholeWords(sName, maxNameInTitle)
  const metaTitle = sNameForTitle ? `${baseTitle}${sNameForTitle}` : `HSN Chapter ${ch}`

  // Rule I: H1 "HSN Codes Chapter {ch}: {shortName}" (max 90 chars)
  const baseH1 = `HSN Codes Chapter ${ch}: `
  const maxNameInH1 = 90 - baseH1.length
  const sNameForH1 = shortenByWholeWords(sName, maxNameInH1)
  const h1 = `${baseH1}${sNameForH1 || sName}`

  // Rule I: Meta description (at most 155 chars, no mid-word cut, no "…")
  const basePrefix = `HSN Chapter ${ch} covers `
  const baseSuffix = `. Explore all ${headingsCount} headings with official CBIC GST rates effective 22 September 2025.`
  const maxNameInMeta = 155 - basePrefix.length - baseSuffix.length
  const sNameForMeta = shortenByWholeWords(lowerFirstUnlessAcronym(sName), maxNameInMeta)
  const metaDescription = sNameForMeta ? `${basePrefix}${sNameForMeta}${baseSuffix}` : `${basePrefix.trim()}${baseSuffix}`

  // Rule I: Intro paragraph (full chapter title in sentence case, no truncation)
  const introParagraph = `Chapter ${ch} of the GST HSN tariff classifies ${lowerFirstUnlessAcronym(chapter.d)}. This chapter contains ${headingsCount} 4-digit tariff heading${headingsCount === 1 ? '' : 's'} with applicable GST rates effective 22 September 2025.`

  return {
    shortName: sName,
    metaTitle,
    h1,
    metaDescription,
    introParagraph,
    breadcrumbName: sName,
  }
}
