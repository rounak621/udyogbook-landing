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
 * Hand-written override map for HSN Chapter numbers (01-97) to short names.
 * Each name is at most 36 characters so "HSN Chapter NN: {name} | Udyog" stays <= 60 chars.
 * Chapters 77 and 98 are omitted from this map and use the dynamic fallback logic.
 */
export const CHAPTER_NAMES: Record<string, string> = {
  '01': 'Live animals',
  '02': 'Meat and edible meat offal',
  '03': 'Fish and seafood',
  '04': 'Dairy, eggs and honey',
  '05': 'Other animal products',
  '06': 'Live plants and flowers',
  '07': 'Vegetables',
  '08': 'Fruit and nuts',
  '09': 'Coffee, tea and spices',
  '10': 'Cereals',
  '11': 'Milling products, flour, starch',
  '12': 'Oil seeds, grains and fruits',
  '13': 'Lac, gums and resins',
  '14': 'Vegetable plaiting materials',
  '15': 'Animal and vegetable fats, oils',
  '16': 'Meat and fish preparations',
  '17': 'Sugars and confectionery',
  '18': 'Cocoa and chocolate',
  '19': 'Bakery, cereal and pasta products',
  '20': 'Preserved vegetables and fruit',
  '21': 'Miscellaneous edible preparations',
  '22': 'Beverages, spirits and vinegar',
  '23': 'Food industry residues, animal feed',
  '24': 'Tobacco',
  '25': 'Salt, sulphur, stone, cement',
  '26': 'Ores, slag and ash',
  '27': 'Mineral fuels and oils',
  '28': 'Inorganic chemicals',
  '29': 'Organic chemicals',
  '30': 'Pharmaceutical products',
  '31': 'Fertilisers',
  '32': 'Dyes, paints, inks and tanning',
  '33': 'Cosmetics and perfumery',
  '34': 'Soap, candles and waxes',
  '35': 'Glues, enzymes and albuminoids',
  '36': 'Explosives, matches, fireworks',
  '37': 'Photographic goods',
  '38': 'Miscellaneous chemical products',
  '39': 'Plastics and plastic articles',
  '40': 'Rubber and rubber articles',
  '41': 'Raw hides, skins and leather',
  '42': 'Leather articles, bags, wallets',
  '43': 'Furskins and artificial fur',
  '44': 'Wood and wood articles',
  '45': 'Cork and cork articles',
  '46': 'Straw and basketware',
  '47': 'Pulp of wood, waste paper',
  '48': 'Paper, paperboard and articles',
  '49': 'Books, newspapers, printed matter',
  '50': 'Silk',
  '51': 'Wool and animal hair',
  '52': 'Cotton',
  '53': 'Other vegetable textile fibres',
  '54': 'Man-made filaments',
  '55': 'Man-made staple fibres',
  '56': 'Wadding, felt, nonwovens, cordage',
  '57': 'Carpets and floor coverings',
  '58': 'Special woven fabrics and lace',
  '59': 'Coated and laminated textile fabrics',
  '60': 'Knitted or crocheted fabrics',
  '61': 'Knitted apparel and clothing',
  '62': 'Woven apparel and clothing',
  '63': 'Made-up textile articles, rags',
  '64': 'Footwear',
  '65': 'Headgear and hats',
  '66': 'Umbrellas and walking sticks',
  '67': 'Feathers, artificial flowers, wigs',
  '68': 'Stone, plaster, cement articles',
  '69': 'Ceramic products',
  '70': 'Glass and glassware',
  '71': 'Pearls, gems, gold and jewellery',
  '72': 'Iron and steel',
  '73': 'Iron and steel articles',
  '74': 'Copper and copper articles',
  '75': 'Nickel and nickel articles',
  '76': 'Aluminium and aluminium articles',
  '78': 'Lead and lead articles',
  '79': 'Zinc and zinc articles',
  '80': 'Tin and tin articles',
  '81': 'Other base metals, cermets',
  '82': 'Tools, cutlery, spoons, forks',
  '83': 'Miscellaneous base metal articles',
  '84': 'Machinery and mechanical appliances',
  '85': 'Electrical machinery and electronics',
  '86': 'Railway locomotives, rolling stock',
  '87': 'Vehicles, cars, motorcycles',
  '88': 'Aircraft and spacecraft',
  '89': 'Ships, boats and floating structures',
  '90': 'Optical and medical instruments',
  '91': 'Clocks and watches',
  '92': 'Musical instruments',
  '93': 'Arms and ammunition',
  '94': 'Furniture, bedding, lamps',
  '95': 'Toys, games and sports goods',
  '96': 'Miscellaneous manufactured articles',
  '97': 'Works of art and antiques',
}

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
 * Rule 4: getCappedDescription(text)
 * Cap the description used in intro sentence 1 and in the H1 source.
 * 1. Takes the description in sentence case.
 * 2. Cuts at the first of: ':', ';', ' : '.
 * 3. If neither found, cuts at the first of: ', including' or ', other than'.
 * 4. If still longer than 180 characters, cuts at the last comma before 180.
 * 5. Cleans trailing punctuation and stop words. Never cuts mid-word and never adds '…'.
 */
export function getCappedDescription(text: string): string {
  let s = sentenceCase(text)
  if (!s) return ''

  // Step 1: cut at first of ':', ';', ' : '
  const colonMatch = s.search(/[\s]*[:;]/)
  if (colonMatch !== -1) {
    s = s.slice(0, colonMatch)
  } else {
    // Step 2: then ', including' or ', other than'
    const incMatch = s.search(/,\s*(?:including|other than)\b/i)
    if (incMatch !== -1) {
      s = s.slice(0, incMatch)
    }
  }

  s = cleanTrailingWordsAndPunct(s)

  // Step 3: if still longer than 180 characters, cut at the last comma before 180
  if (s.length > 180) {
    const lastComma = s.lastIndexOf(',', 180)
    if (lastComma !== -1) {
      s = s.slice(0, lastComma)
    } else {
      // If no comma, cut at last full word before 180
      s = shortenByWholeWords(s, 180)
    }
    s = cleanTrailingWordsAndPunct(s)
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
 * Generates all copy for an HSN Heading page (Rules D, E, F, G, J + Problem 3 & 4).
 */
export function getHSNCopy(
  heading: HSNItem,
  rateResult: RateMatchResult,
  children: HSNItem[]
): HSNPageCopy {
  const code = heading.c
  // Problem 4: Cap the description used in intro sentence 1 and in the H1 source
  const cappedDesc = getCappedDescription(heading.d)
  const sName = shortName(cappedDesc)
  const rSum = getRateSummary(rateResult.mainRates)

  // Rule D: HSN title before " | Udyog" (max 52 chars, total <= 60 chars)
  const baseTitle = `HSN ${code} GST Rate (${rSum})`
  const maxNameInTitle = 52 - baseTitle.length - 3 // 3 for " – "
  let sNameForTitle = shortenByWholeWords(sName, maxNameInTitle)
  while (sNameForTitle && (`${baseTitle} – ${sNameForTitle} | Udyog`.replace(/'/g, '&#x27;').length > 60)) {
    sNameForTitle = shortenByWholeWords(sNameForTitle, sNameForTitle.length - 1)
  }
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

  while (metaDescription.replace(/'/g, '&#x27;').length > 155) {
    const baseWithoutB = `HSN ${code} (): ${gstPart} (effective 22 Sep 2025).`
    const maxNameWithoutB = 155 - baseWithoutB.replace(/'/g, '&#x27;').length
    const shortenedNameWithoutB = shortenByWholeWords(sName, maxNameWithoutB)
    if (shortenedNameWithoutB) {
      metaDescription = `HSN ${code} (${shortenedNameWithoutB}): ${gstPart} (effective 22 Sep 2025).`
    } else {
      metaDescription = `HSN ${code}: ${gstPart} (effective 22 Sep 2025).`
      break
    }
  }

  // Rule G & Problem 4: Intro sentence 1 uses cappedDesc
  const sentence1 = `HSN ${code} covers ${lowerFirstUnlessAcronym(cappedDesc)}.`

  // Rule G & Problem 3: Sentence 2 uses "depending on the conditions listed below"
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
 * Generates all copy for an SAC Code page (Problem 2).
 */
export function getSACCopy(
  sac: SACItem,
  heading: SACItem | undefined,
  headingCode: string,
  siblings: SACItem[]
): SACPageCopy {
  const code = sac.c
  const ownDesc = sentenceCase(sac.d)
  const rawGroup = (sac.p && sac.p.length > 0) ? sac.p[sac.p.length - 1] : (heading?.d || '')
  const groupName = sentenceCase(rawGroup)

  // Title (before " | Udyog", max 52 chars so total with " | Udyog" is <= 60 chars):
  // If the code's own description is 30 characters or fewer, "SAC {code}: {own description}".
  // Otherwise "SAC {code}: {group name}" (shortened by whole words if needed).
  const baseTitle = `SAC ${code}: `
  const maxNameInTitle = 52 - baseTitle.length
  let titleName = ''
  if (ownDesc.length <= 30) {
    titleName = ownDesc
  } else {
    titleName = shortenByWholeWords(groupName, maxNameInTitle)
  }
  while (titleName && (`${baseTitle}${titleName} | Udyog`.replace(/'/g, '&#x27;').length > 60)) {
    titleName = shortenByWholeWords(titleName, titleName.length - 1)
  }
  const metaTitle = titleName ? `${baseTitle}${titleName}` : `SAC ${code}`

  // H1: If the own description is 100 characters or fewer and total H1 <= 120:
  // "SAC {code}: {full own description} – Service Code".
  // Otherwise "SAC {code}: {group name} – Service Code". Never cut a description mid-phrase.
  const suffixH1 = ' – Service Code'
  let h1 = ''
  const ownH1Candidate = `SAC ${code}: ${ownDesc}${suffixH1}`
  if (ownDesc.length <= 100 && ownH1Candidate.length <= 120) {
    h1 = ownH1Candidate
  } else {
    let gH1 = groupName
    if (`SAC ${code}: ${gH1}${suffixH1}`.length > 120) {
      gH1 = gH1.split(';')[0].trim()
    }
    if (`SAC ${code}: ${gH1}${suffixH1}`.length > 120) {
      gH1 = shortenByWholeWords(gH1, 120 - baseTitle.length - suffixH1.length)
    }
    h1 = `SAC ${code}: ${gH1}${suffixH1}`
  }

  // Meta description (155 or less):
  // "SAC {code} is the service accounting code for {own description in lower case}. Check the GST rate for this service on the official GST portal."
  // If longer than 155, use group name instead of own description. Never cut mid-word or mid-phrase.
  const basePrefix = `SAC ${code} is the service accounting code for `
  const baseSuffix = '. Check the GST rate for this service on the official GST portal.'
  const lowerOwn = lowerFirstUnlessAcronym(ownDesc)
  const lowerGroup = lowerFirstUnlessAcronym(groupName)

  let metaDescription = `${basePrefix}${lowerOwn}${baseSuffix}`
  if (metaDescription.length > 155) {
    metaDescription = `${basePrefix}${lowerGroup}${baseSuffix}`
  }
  if (metaDescription.length > 155) {
    metaDescription = `${basePrefix}${lowerGroup}.`
  }
  if (metaDescription.length > 155) {
    const clause = lowerGroup.split(';')[0].trim()
    metaDescription = `${basePrefix}${clause}.`
  }

  // Intro paragraph: keep current text without truncation
  const headingDesc = heading ? sentenceCase(heading.d) : ''
  const groupText = headingDesc ? `service group ${headingCode} (${headingDesc})` : `service group ${headingCode}`
  const introParagraph = `SAC ${code} is the Services Accounting Code for ${lowerFirstUnlessAcronym(sac.d)}. It belongs to ${groupText} with ${siblings.length} related service codes.`

  // Breadcrumb name: short, readable label
  const breadcrumbName = ownDesc.length <= 30 ? ownDesc : shortenByWholeWords(groupName, 35)

  return {
    shortName: ownDesc.length <= 30 ? ownDesc : groupName,
    metaTitle,
    h1,
    metaDescription,
    introParagraph,
    breadcrumbName,
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
 * Generates all copy for an HSN Chapter hub page (Problem 1).
 */
export function getChapterCopy(chapter: HSNItem, headingsCount: number): ChapterPageCopy {
  const ch = chapter.c
  // Problem 1: Hand-written override map for chapters 01-97, fallback for 77 & 98
  const sName = CHAPTER_NAMES[ch] || shortName(chapter.d)

  // Title: "HSN Chapter {ch}: {shortName}" within 60 chars total (<= 52 before " | Udyog")
  const baseTitle = `HSN Chapter ${ch}: `
  const maxNameInTitle = 52 - baseTitle.length
  let sNameForTitle = shortenByWholeWords(sName, maxNameInTitle)
  while (sNameForTitle && (`${baseTitle}${sNameForTitle} | Udyog`.replace(/'/g, '&#x27;').length > 60)) {
    sNameForTitle = shortenByWholeWords(sNameForTitle, sNameForTitle.length - 1)
  }
  const metaTitle = sNameForTitle ? `${baseTitle}${sNameForTitle}` : `HSN Chapter ${ch}`

  // H1: "HSN Codes Chapter {ch}: {short name}"
  const baseH1 = `HSN Codes Chapter ${ch}: `
  const maxNameInH1 = 90 - baseH1.length
  const sNameForH1 = shortenByWholeWords(sName, maxNameInH1)
  const h1 = `${baseH1}${sNameForH1 || sName}`

  // Meta description (<= 155 chars, keeping acronyms, unique, no "…"):
  // "HSN Chapter {ch} covers {short name in lower case, keeping acronyms}. Explore all {n} headings with official CBIC GST rates effective 22 September 2025."
  const lowerShortName = lowerFirstUnlessAcronym(sName)
  const basePrefix = `HSN Chapter ${ch} covers `
  const baseSuffix = `. Explore all ${headingsCount} headings with official CBIC GST rates effective 22 September 2025.`
  const maxNameInMeta = 155 - basePrefix.length - baseSuffix.length
  const sNameForMeta = shortenByWholeWords(lowerShortName, maxNameInMeta)
  const metaDescription = `${basePrefix}${sNameForMeta || lowerShortName}${baseSuffix}`

  // Intro paragraph: keeps the full official chapter title in sentence case (no cut)
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
