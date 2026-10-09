const fs = require('fs')
const path = require('path')

const ratesPath = path.join(__dirname, '../data/hsn-source/goods_rates.json')
const goodsRatesData = JSON.parse(fs.readFileSync(ratesPath, 'utf8'))

function getRatesForHSN(code) {
  const cleanCode = String(code).trim().replace(/\D/g, '')
  if (!cleanCode) return []

  const matches = []

  for (const row of goodsRatesData) {
    if (!row.codes || row.codes.length === 0) continue
    const spec = (row.spec || '').toLowerCase()
    // Catch-all rows: spec contains "Any chapter" / "All goods" or codes[] is empty
    if (/any\s*chapter/i.test(row.spec) || /a\s*n\s*y\s*chapter/i.test(row.spec) || spec.includes('all goods')) {
      continue
    }

    let matchedCode = null
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

  matches.sort((a, b) => {
    if (b.matchSpecificity !== a.matchSpecificity) {
      return b.matchSpecificity - a.matchSpecificity
    }
    return (a.sn || 0) - (b.sn || 0)
  })

  return matches
}

function formatRate(r) {
  if (r.gst === 0) return '0% (Nil / exempt)'
  if (r.cess) return '28% + compensation cess'
  const half = (r.gst / 2).toString().replace(/\.0$/, '')
  const cgstStr = r.cgst || (half + '%')
  return `${r.gst}% (CGST ${cgstStr} + SGST ${cgstStr} / IGST ${r.gst}%)`
}

const tests = [
  {
    code: '0902',
    name: '0902 -> Tea 5%, and green leaves Nil',
    validate: m =>
      m.some(r => r.gst === 5 && r.d.toLowerCase().includes('tea')) &&
      m.some(r => r.gst === 0 && r.d.toLowerCase().includes('green leaves')),
  },
  {
    code: '0401',
    name: '0401 -> Nil',
    validate: m => m.some(r => r.gst === 0 && (r.d.toLowerCase().includes('milk') || r.cgst === 'Nil')),
  },
  {
    code: '0406',
    name: '0406 -> cheese 5% and paneer Nil',
    validate: m =>
      m.some(r => r.gst === 5 && r.d.toLowerCase().includes('cheese')) &&
      m.some(r => r.gst === 0 && r.d.toLowerCase().includes('paneer')),
  },
  {
    code: '1101',
    name: '1101 -> 5% packed, Nil loose',
    validate: m =>
      m.some(r => r.gst === 5 && r.d.toLowerCase().includes('pre-packaged')) &&
      m.some(r => r.gst === 0 && r.d.toLowerCase().includes('other than pre-packaged')),
  },
  {
    code: '1006',
    name: '1006 -> 5% packed, Nil loose',
    validate: m =>
      m.some(r => r.gst === 5 && r.d.toLowerCase().includes('pre-packaged')) &&
      m.some(r => r.gst === 0 && r.d.toLowerCase().includes('other than pre-packaged')),
  },
  {
    code: '6109',
    name: '6109 -> up to 2500 5%, above 2500 18%',
    validate: m =>
      m.some(r => r.gst === 5 && r.d.includes('2500')) &&
      m.some(r => r.gst === 18 && r.d.includes('2500')),
  },
  {
    code: '4820',
    name: '4820 -> notebooks Nil and registers 18%',
    validate: m =>
      m.some(r => r.gst === 0 && r.d.toLowerCase().includes('notebooks')) &&
      m.some(r => r.gst === 18 && r.d.toLowerCase().includes('registers')),
  },
  {
    code: '3401',
    name: '3401 -> toilet soap 5%, other 18%',
    validate: m =>
      m.some(r => r.gst === 5 && r.d.toLowerCase().includes('toilet soap')) &&
      m.some(r => r.gst === 18 && r.d.toLowerCase().includes('soap')),
  },
  {
    code: '8517',
    name: '8517 -> 18%',
    validate: m => m.some(r => r.gst === 18 && r.spec === '8517'),
  },
  {
    code: '2402',
    name: '2402 -> 28% + cess',
    validate: m => m.some(r => r.gst === 28 && r.cess === true),
  },
  {
    code: '8703',
    name: '8703 -> must show 18% and 40% rows with conditions',
    validate: m => m.some(r => r.gst === 18) && m.some(r => r.gst === 40),
  },
  {
    code: '7113',
    name: '7113 -> 3%',
    validate: m => m.some(r => r.gst === 3 && r.d.toLowerCase().includes('jewellery')),
  },
  {
    code: '99999999',
    name: '99999999 style unknown code -> residual 18% message',
    validate: m => m.length === 0,
  },
]

console.log('=== HSN RATE MATCHING VERIFICATION ===\n')
let allPassed = true

for (const t of tests) {
  const matches = getRatesForHSN(t.code)
  const passed = t.validate(matches)
  if (!passed) allPassed = false

  console.log(`Test: ${t.name}`)
  console.log(`Input Code: ${t.code}`)
  console.log(`Result: ${passed ? 'PASS' : 'FAIL'}`)
  console.log(`Matches count: ${matches.length}`)
  if (matches.length === 0) {
    console.log(`  Output: Not specifically listed in the rate schedules. Residual entry: 18%`)
  } else {
    for (const r of matches.slice(0, 3)) {
      console.log(`  Rate: ${formatRate(r)} | Spec: ${r.spec} | Cond: ${r.d.slice(0, 70)}...`)
    }
    if (matches.length > 3) {
      console.log(`  (... and ${matches.length - 3} more matching rows)`)
    }
  }
  console.log('----------------------------------------------------')
}

console.log(`\nOVERALL TEST SUITE: ${allPassed ? 'ALL PASS' : 'FAILURES DETECTED'}`)
process.exit(allPassed ? 0 : 1)
