const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

const ROOT = path.join(__dirname, '..')
const DATA_DIR = path.join(ROOT, 'data/hsn-source')
const OUT_DIR = path.join(ROOT, 'public/hsn-data')
const CHAPTERS_DIR = path.join(OUT_DIR, 'chapters')

fs.mkdirSync(CHAPTERS_DIR, { recursive: true })

console.log('Building HSN & SAC data artifacts...')

// 1. Read input data
const hsn = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'hsn_codes.json'), 'utf8'))
const sac = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'sac_codes.json'), 'utf8'))
const rates = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'goods_rates.json'), 'utf8'))

// 2. Parse Hinglish map
const hinglishContent = fs.readFileSync(path.join(ROOT, 'scripts/hinglish-map.ts'), 'utf8')
const mapMatches = [...hinglishContent.matchAll(/hinglish:\s*(\[[^\]]+\]),\s*english:\s*(\[[^\]]+\])/g)]
const hinglishMap = mapMatches.map(m => ({
  hinglish: eval(m[1]),
  english: eval(m[2]),
}))

// Rate matching logic
function getRatesForHSN(code) {
  const cleanCode = String(code).trim().replace(/\D/g, '')
  if (!cleanCode) return []
  const matches = []

  for (const row of rates) {
    if (!row.codes || row.codes.length === 0) continue
    const spec = (row.spec || '').toLowerCase()
    // Ignore catch-all rows
    if (/any\s*chapter/i.test(row.spec) || /a\s*n\s*y\s*chapter/i.test(row.spec) || spec.includes('all goods')) {
      continue
    }

    let matchedCode = null
    let isSubCode = false
    let isParentOrExact = false

    for (const c of row.codes) {
      if (cleanCode.startsWith(c)) {
        isParentOrExact = true
        if (!matchedCode || c.length > matchedCode.length) matchedCode = c
      } else if (c.startsWith(cleanCode)) {
        if (!matchedCode || c.length > matchedCode.length) matchedCode = c
      }
    }

    if (matchedCode) {
      isSubCode = !isParentOrExact
      matches.push({
        sch: row.sch,
        sn: row.sn,
        spec: row.spec,
        gst: row.gst,
        cgst: row.cgst,
        cess: row.cess,
        d: row.d,
        matchedCode,
        isSubCode,
        matchSpecificity: matchedCode.length,
      })
    }
  }

  matches.sort((a, b) => {
    if (b.matchSpecificity !== a.matchSpecificity) return b.matchSpecificity - a.matchSpecificity
    return (a.sn || 0) - (b.sn || 0)
  })

  return matches
}

// 3. Map child descriptions to 4-digit heading
const hsnChildrenMap = new Map()
for (const item of hsn) {
  if (item.c.length > 4) {
    const heading = item.c.slice(0, 4)
    if (!hsnChildrenMap.has(heading)) hsnChildrenMap.set(heading, [])
    hsnChildrenMap.get(heading).push(item.d)
  }
}

// 4. Build search index (1,348 HSN headings + all SAC codes)
const hsnHeadings = hsn.filter(x => x.c.length === 4)
const searchIndex = []

for (const item of hsnHeadings) {
  const childDescs = (hsnChildrenMap.get(item.c) || []).join(' ')
  const fullText = (item.d + ' ' + (item.p || []).join(' ') + ' ' + childDescs).toLowerCase()

  const extraKeywords = new Set()
  for (const entry of hinglishMap) {
    for (const eng of entry.english) {
      if (fullText.includes(eng.toLowerCase())) {
        for (const h of entry.hinglish) {
          extraKeywords.add(h)
        }
        break
      }
    }
  }

  const ratesForHeading = getRatesForHSN(item.c).map(r => ({
    gst: r.gst,
    cgst: r.cgst,
    cess: r.cess,
    d: r.d,
    spec: r.spec,
    isSubCode: r.isSubCode,
  }))

  searchIndex.push({
    c: item.c,
    d: item.d,
    p: item.p || [],
    t: 'hsn',
    s: (item.c + ' ' + item.d + ' ' + (item.p || []).join(' ') + ' ' + childDescs + ' ' + [...extraKeywords].join(' ')).toLowerCase(),
    r: ratesForHeading,
  })
}

for (const item of sac) {
  const fullText = (item.d + ' ' + (item.p || []).join(' ')).toLowerCase()
  const extraKeywords = new Set()
  for (const entry of hinglishMap) {
    for (const eng of entry.english) {
      if (fullText.includes(eng.toLowerCase())) {
        for (const h of entry.hinglish) {
          extraKeywords.add(h)
        }
        break
      }
    }
  }

  searchIndex.push({
    c: item.c,
    d: item.d,
    p: item.p || [],
    t: 'sac',
    s: (item.c + ' ' + item.d + ' ' + (item.p || []).join(' ') + ' ' + [...extraKeywords].join(' ')).toLowerCase(),
    r: [],
  })
}

const searchIndexPath = path.join(OUT_DIR, 'search-index.json')
const searchIndexJson = JSON.stringify(searchIndex)
fs.writeFileSync(searchIndexPath, searchIndexJson)
const searchIndexGzip = zlib.gzipSync(searchIndexJson)

console.log(`Search index: ${searchIndex.length} items`)
console.log(`  Raw size: ${(searchIndexJson.length / 1024).toFixed(1)} KB`)
console.log(`  Gzip size: ${(searchIndexGzip.length / 1024).toFixed(1)} KB (target: < 400 KB)`)

// 5. Generate one JSON per chapter (2-digit) with its full codes
const chapterMap = new Map()
for (const item of hsn) {
  const ch = item.c.slice(0, 2)
  if (!chapterMap.has(ch)) chapterMap.set(ch, [])
  chapterMap.get(ch).push(item)
}

let maxChapter = ''
let maxChapterSize = 0

for (const [ch, items] of chapterMap) {
  const chJson = JSON.stringify(items)
  fs.writeFileSync(path.join(CHAPTERS_DIR, `${ch}.json`), chJson)
  const size = Buffer.byteLength(chJson)
  if (size > maxChapterSize) {
    maxChapterSize = size
    maxChapter = ch
  }
}

console.log(`Generated ${chapterMap.size} chapter JSON files`)
console.log(`  Largest chapter: Chapter ${maxChapter} (${(maxChapterSize / 1024).toFixed(1)} KB)`)
console.log('HSN data artifacts build complete.')
