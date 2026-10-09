const fs = require('fs')
const path = require('path')
const {
  matchHSNRates,
  formatRateDisplay,
  RESIDUAL_RATE_TITLE,
  RESIDUAL_RATE_NOTE,
  TIER2_COLLAPSED_TITLE,
  TIER2_COLLAPSED_LINE,
  TIER2_RESIDUAL_LINE,
} = require('../lib/rate-matcher')

const ROOT = path.join(__dirname, '..')
const ratesPath = path.join(ROOT, 'data/hsn-source/goods_rates.json')
const hsnPath = path.join(ROOT, 'data/hsn-source/hsn_codes.json')

const rates = JSON.parse(fs.readFileSync(ratesPath, 'utf8'))
const hsn = JSON.parse(fs.readFileSync(hsnPath, 'utf8'))

console.log('=== HSN RATE MATCHING VERIFICATION (2-TIER CBIC RULES) ===\n')

let allPassed = true

function runTestCase({
  name,
  code,
  checkFn,
}) {
  const result = matchHSNRates(code, rates)
  const { tier1, tier2, mainRates, isTier2Main, isResidualOnly, residualNote } = result

  let pass = true
  let failReason = ''

  try {
    checkFn(result)
  } catch (err) {
    pass = false
    failReason = err.message
  }

  if (!pass) allPassed = false

  console.log(`Test: ${name}`)
  console.log(`Input Code: ${code}`)
  console.log(`Result: ${pass ? 'PASS' : 'FAIL'}`)
  if (!pass) {
    console.log(`Failure Reason: ${failReason}`)
  }

  console.log(`Tier 1 (Main candidates) count: ${tier1.length}`)
  for (const r of tier1) {
    const disp = formatRateDisplay(r)
    console.log(`  [Tier 1] ${disp.headline} | Code: ${r.matchedCode} | Spec: ${r.spec || '-'} | Desc: ${r.d}`)
  }

  console.log(`Tier 2 (Chapter-wide) count: ${tier2.length}`)
  for (const r of tier2) {
    const disp = formatRateDisplay(r)
    console.log(`  [Tier 2] ${disp.headline} | Code: ${r.matchedCode} | Spec: ${r.spec || '-'} | Desc: ${r.d}`)
  }

  console.log(`Main Displayed Rates count: ${mainRates.length} (isTier2Main: ${isTier2Main})`)
  for (const r of mainRates) {
    const disp = formatRateDisplay(r)
    console.log(`  [Main] ${disp.headline} | Code: ${r.matchedCode} | Desc: ${r.d}`)
  }
  if (isTier2Main) {
    console.log(`  [Main Note] ${residualNote || TIER2_RESIDUAL_LINE}`)
  }
  if (isResidualOnly) {
    console.log(`  [Residual Output] ${RESIDUAL_RATE_TITLE}`)
    console.log(`  [Residual Note] ${RESIDUAL_RATE_NOTE}`)
  }

  console.log('----------------------------------------------------')
}

// 1. 0902: main must contain tea 5% and green leaves Nil. Forbidden in main: any "seed quality" row.
runTestCase({
  name: '0902 -> Tea 5% and green leaves Nil. Forbidden in main: seed quality',
  code: '0902',
  checkFn: ({ mainRates }) => {
    const hasTea5 = mainRates.some(r => r.gst === 5 && /tea/i.test(r.d))
    const hasLeaves0 = mainRates.some(r => r.gst === 0 && /green leaves/i.test(r.d))
    const hasSeed = mainRates.some(r => /seed quality/i.test(r.d))
    if (!hasTea5) throw new Error('Missing tea 5% in main')
    if (!hasLeaves0) throw new Error('Missing green leaves Nil in main')
    if (hasSeed) throw new Error('Forbidden "seed quality" row found in main')
  },
})

// 2. 4820: main must contain notebooks Nil and registers 18%. Forbidden: "Rupee notes".
runTestCase({
  name: '4820 -> Notebooks Nil and registers 18%. Forbidden in main: Rupee notes',
  code: '4820',
  checkFn: ({ mainRates }) => {
    const hasNotebooks0 = mainRates.some(r => r.gst === 0 && /notebook/i.test(r.d))
    const hasRegisters18 = mainRates.some(r => r.gst === 18 && /registers/i.test(r.d))
    const hasRupeeNotes = mainRates.some(r => /rupee notes/i.test(r.d))
    if (!hasNotebooks0) throw new Error('Missing notebooks Nil in main')
    if (!hasRegisters18) throw new Error('Missing registers 18% in main')
    if (hasRupeeNotes) throw new Error('Forbidden "Rupee notes" row found in main')
  },
})

// 3. 7113: main must contain jewellery 3%. Forbidden: "Rupee notes".
runTestCase({
  name: '7113 -> Jewellery 3%. Forbidden in main: Rupee notes',
  code: '7113',
  checkFn: ({ mainRates }) => {
    const hasJewellery3 = mainRates.some(r => r.gst === 3 && /jewellery/i.test(r.d))
    const hasRupeeNotes = mainRates.some(r => /rupee notes/i.test(r.d))
    if (!hasJewellery3) throw new Error('Missing jewellery 3% in main')
    if (hasRupeeNotes) throw new Error('Forbidden "Rupee notes" row found in main')
  },
})

// 4. 8517: main must contain only the 8517 rows. Forbidden in main: "renewable energy", "pumps".
runTestCase({
  name: '8517 -> Only 8517 rows. Forbidden in main: renewable energy, pumps',
  code: '8517',
  checkFn: ({ mainRates }) => {
    const all8517 = mainRates.every(r => r.matchedCode.startsWith('8517'))
    const hasRenewable = mainRates.some(r => /renewable energy/i.test(r.d))
    const hasPumps = mainRates.some(r => /pumps/i.test(r.d))
    if (!all8517) throw new Error('Main contains rows not matching 8517 code')
    if (hasRenewable) throw new Error('Forbidden "renewable energy" row found in main')
    if (hasPumps) throw new Error('Forbidden "pumps" row found in main')
  },
})

// 5. 1006: packed 5% and loose Nil. Forbidden: "seed quality".
runTestCase({
  name: '1006 -> Rice packed 5% and loose Nil. Forbidden in main: seed quality',
  code: '1006',
  checkFn: ({ mainRates }) => {
    const hasPacked5 = mainRates.some(r => r.gst === 5 && /pre-packaged/i.test(r.d))
    const hasLoose0 = mainRates.some(r => r.gst === 0 && /other than pre-packaged/i.test(r.d))
    const hasSeed = mainRates.some(r => /seed quality/i.test(r.d))
    if (!hasPacked5) throw new Error('Missing packed rice 5% in main')
    if (!hasLoose0) throw new Error('Missing loose rice Nil in main')
    if (hasSeed) throw new Error('Forbidden "seed quality" row found in main')
  },
})

// 6. 1101: packed 5% and loose Nil. Forbidden: "seed quality".
runTestCase({
  name: '1101 -> Flour packed 5% and loose Nil. Forbidden in main: seed quality',
  code: '1101',
  checkFn: ({ mainRates }) => {
    const hasPacked5 = mainRates.some(r => r.gst === 5 && /pre-packaged/i.test(r.d))
    const hasLoose0 = mainRates.some(r => r.gst === 0 && /other than pre-packaged/i.test(r.d))
    const hasSeed = mainRates.some(r => /seed quality/i.test(r.d))
    if (!hasPacked5) throw new Error('Missing packed flour 5% in main')
    if (!hasLoose0) throw new Error('Missing loose flour Nil in main')
    if (hasSeed) throw new Error('Forbidden "seed quality" row found in main')
  },
})

// 7. 6109: no Tier 1; Tier 2 main must show both the up-to-2500 5% row and the above-2500 18% row, plus the residual 18% line.
runTestCase({
  name: '6109 -> No Tier 1; Tier 2 main shows 5% (<=2500) and 18% (>2500) plus residual 18% note',
  code: '6109',
  checkFn: ({ tier1, mainRates, isTier2Main, residualNote }) => {
    if (tier1.length > 0) throw new Error(`Expected no Tier 1, got ${tier1.length} rows`)
    if (!isTier2Main) throw new Error('Expected isTier2Main to be true')
    const has5 = mainRates.some(r => r.gst === 5 && /not exceeding rs/i.test(r.d))
    const has18 = mainRates.some(r => r.gst === 18 && /exceeding rs/i.test(r.d))
    if (!has5) throw new Error('Missing 5% row (<= 2500) in main')
    if (!has18) throw new Error('Missing 18% row (> 2500) in main')
    if (!residualNote || !residualNote.includes('Schedule II, S. No. 639')) {
      throw new Error('Missing residual 18% line in note')
    }
  },
})

// 8. 6403: main must show the footwear rows from chapter 64 (up to Rs 2500 per pair 5%) and the 6403 18% row.
runTestCase({
  name: '6403 -> Main shows footwear row from chapter 64 (5% <=2500) and 6403 18% row',
  code: '6403',
  checkFn: ({ mainRates }) => {
    const hasFootwear5 = mainRates.some(r => r.gst === 5 && /not exceeding rs\.?2500 per pair/i.test(r.d))
    const has6403_18 = mainRates.some(r => r.gst === 18 && r.matchedCode === '6403')
    if (!hasFootwear5) throw new Error('Missing chapter 64 footwear 5% row in main')
    if (!has6403_18) throw new Error('Missing 6403 18% row in main')
  },
})

// 9. 8703: must still show the 18% and 40% rows with conditions.
runTestCase({
  name: '8703 -> Shows 18% and 40% rows with conditions',
  code: '8703',
  checkFn: ({ mainRates }) => {
    const has18 = mainRates.some(r => r.gst === 18)
    const has40 = mainRates.some(r => r.gst === 40)
    if (!has18) throw new Error('Missing 18% rows in main')
    if (!has40) throw new Error('Missing 40% rows in main')
  },
})

// 10. 2402: 28% + cess.
runTestCase({
  name: '2402 -> 28% + compensation cess',
  code: '2402',
  checkFn: ({ mainRates }) => {
    const hasCess = mainRates.some(r => r.gst === 28 && r.cess === true)
    if (!hasCess) throw new Error('Missing 28% + compensation cess row in main')
  },
})

// 11. 0406: cheese 5% and paneer Nil.
runTestCase({
  name: '0406 -> Cheese 5% and paneer Nil',
  code: '0406',
  checkFn: ({ mainRates }) => {
    const hasCheese5 = mainRates.some(r => r.gst === 5 && /cheese/i.test(r.d))
    const hasPaneer0 = mainRates.some(r => r.gst === 0 && /chena or paneer/i.test(r.d))
    if (!hasCheese5) throw new Error('Missing cheese 5% in main')
    if (!hasPaneer0) throw new Error('Missing paneer Nil in main')
  },
})

// 12. 3401: toilet soap 5%, other 18%.
runTestCase({
  name: '3401 -> Toilet soap 5%, other 18%',
  code: '3401',
  checkFn: ({ mainRates }) => {
    const hasSoap5 = mainRates.some(r => r.gst === 5 && /toilet soap/i.test(r.d))
    const hasOther18 = mainRates.some(r => r.gst === 18 && /soap/i.test(r.d))
    if (!hasSoap5) throw new Error('Missing toilet soap 5% in main')
    if (!hasOther18) throw new Error('Missing soap 18% in main')
  },
})

// 13. 0401: milk Nil.
runTestCase({
  name: '0401 -> Fresh milk and pasteurised milk Nil',
  code: '0401',
  checkFn: ({ mainRates }) => {
    const hasMilk0 = mainRates.some(r => r.gst === 0 && /milk/i.test(r.d))
    if (!hasMilk0) throw new Error('Missing milk Nil in main')
  },
})

// 14. 99999999: residual message.
runTestCase({
  name: '99999999 -> Unknown code shows residual 18% message',
  code: '99999999',
  checkFn: ({ isResidualOnly, mainRates }) => {
    if (!isResidualOnly) throw new Error('Expected isResidualOnly to be true')
    if (mainRates.length !== 0) throw new Error('Expected mainRates to be empty')
  },
})

// 15. Generic Safety Test
console.log('=== GENERIC SAFETY TEST (ALL 4-DIGIT HSN HEADINGS) ===')
console.log('Rule: fail if any main-tier row comes only from a 2-digit code while a 4-digit row also matched.')
console.log('(Note: Chapter 64 footwear headings 6401-6405 intentionally include the Chapter 64 5% footwear entry alongside 4-digit 18% entries per statutory schedule.)\n')

const headings4Digit = hsn.filter(x => x.c.length === 4)
let safetyTested = 0
let safetyFailed = 0
const safetyFailures = []

for (const heading of headings4Digit) {
  safetyTested++
  const res = matchHSNRates(heading.c, rates)
  const has4Digit = res.mainRates.some(r => r.matchedCode.length >= 4)
  const twoDigitRows = res.mainRates.filter(r => r.matchedCode.length === 2)

  if (has4Digit && twoDigitRows.length > 0) {
    const isExpectedCh64 =
      heading.c.startsWith('64') &&
      twoDigitRows.every(r => r.sn === 392 && r.sch === 'I')

    if (!isExpectedCh64) {
      safetyFailed++
      safetyFailures.push({
        code: heading.c,
        description: heading.d,
        twoDigitRows: twoDigitRows.map(r => ({ code: r.matchedCode, d: r.d.slice(0, 60) })),
      })
    }
  }
}

console.log(`Generic Safety Test Results:`)
console.log(`  Count Tested: ${safetyTested}`)
console.log(`  Count Failed: ${safetyFailed}`)

if (safetyFailed > 0) {
  allPassed = false
  console.log('Safety Test Failures sample:', safetyFailures.slice(0, 5))
} else {
  console.log('  Safety Test Status: PASS (zero leaked 2-digit rows across all 4-digit headings)')
}

console.log('\n----------------------------------------------------')
console.log(`OVERALL TEST SUITE: ${allPassed ? 'ALL PASS' : 'SOME FAILURES'}`)
console.log('----------------------------------------------------')

if (!allPassed) {
  process.exit(1)
}
