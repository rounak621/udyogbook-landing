import * as fs from 'fs'

const BASE_ORIGIN = 'https://udyogbook.in'
const LOCAL_ORIGIN = 'http://localhost:3000'
const DELAY_MS = 200 // Max 5 requests per second

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function normalizePath(rawHref) {
  if (!rawHref) return null
  let href = rawHref.trim()
  if (href.startsWith(BASE_ORIGIN)) {
    href = href.substring(BASE_ORIGIN.length)
  } else if (href.startsWith(LOCAL_ORIGIN)) {
    href = href.substring(LOCAL_ORIGIN.length)
  }

  if (href === '') href = '/'

  // Only consider relative paths starting with /
  if (!href.startsWith('/')) return null
  if (href.startsWith('//')) return null

  // Strip query and hash
  href = href.split('#')[0].split('?')[0]

  // Ignore static assets and special routes
  if (
    href.startsWith('/api/') ||
    href.startsWith('/_next/') ||
    href.endsWith('.apk') ||
    href.endsWith('.png') ||
    href.endsWith('.jpg') ||
    href.endsWith('.jpeg') ||
    href.endsWith('.ico') ||
    href.endsWith('.svg') ||
    href.endsWith('.xml') ||
    href.endsWith('.txt')
  ) {
    return null
  }

  // Remove trailing slash except for root '/'
  if (href.length > 1 && href.endsWith('/')) {
    href = href.slice(0, -1)
  }

  return href || '/'
}

function extractCanonical(html) {
  // Matches <link rel="canonical" href="..."> or <link href="..." rel="canonical">
  const match1 = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
  if (match1) return match1[1]
  const match2 = html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)
  if (match2) return match2[1]
  return null
}

function hasNoindex(html) {
  const match = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)
  if (match) {
    const content = match[1].toLowerCase()
    return content.includes('noindex')
  }
  return false
}

function extractLinks(html) {
  const links = new Set()
  const regex = /<a[^>]+href=["']([^"']+)["']/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    const raw = match[1]
    const p = normalizePath(raw)
    if (p) links.add(p)
  }
  return Array.from(links)
}

async function fetchSitemapUrls() {
  const sitemaps = ['core', 'blog', 'chapters', 'headings', 'sac']
  const sitemapUrls = new Map() // fullUrl -> { id, lastmod }

  for (const id of sitemaps) {
    const res = await fetch(`${LOCAL_ORIGIN}/sitemap/${id}.xml`)
    if (!res.ok) {
      throw new Error(`Failed to fetch sitemap ${id}: ${res.status}`)
    }
    const xml = await res.text()
    const urlBlocks = xml.split('<url>').slice(1)
    for (const block of urlBlocks) {
      const locMatch = block.match(/<loc>(.*?)<\/loc>/)
      if (!locMatch) continue
      const fullUrl = locMatch[1].trim()
      const lastmodMatch = block.match(/<lastmod>(.*?)<\/lastmod>/)
      const lastmod = lastmodMatch ? lastmodMatch[1].trim() : null
      sitemapUrls.set(fullUrl, { id, lastmod })
    }
  }

  return sitemapUrls
}

async function main() {
  console.log('=== STARTING SEO VERIFICATION ===\n')

  // 1. Fetch all sitemaps
  console.log('1. Fetching all sitemaps from local server...')
  const sitemapMap = await fetchSitemapUrls()
  console.log(`Found ${sitemapMap.size} URLs across 5 sitemaps.`)

  const sitemapPathSet = new Set()
  for (const fullUrl of sitemapMap.keys()) {
    const p = normalizePath(fullUrl)
    if (p) sitemapPathSet.add(p)
  }

  // 2. BFS Crawl from /
  console.log('\n2. Starting BFS crawl from / following <a href> (throttled to max 5 req/sec)...')
  const visited = new Map() // path -> { status, canonical, noindex, depth }
  const queue = [{ path: '/', depth: 0 }]
  const enqueued = new Set(['/'])

  let reqCount = 0
  const startTime = Date.now()

  while (queue.length > 0) {
    const { path, depth } = queue.shift()
    reqCount++

    const fetchStart = Date.now()
    let status = 0
    let html = ''
    try {
      const res = await fetch(`${LOCAL_ORIGIN}${path}`, {
        headers: { 'User-Agent': 'UdyogSEOVerifier/1.0' },
      })
      status = res.status
      html = await res.text()
    } catch (err) {
      status = 500
      console.error(`Error fetching ${path}:`, err.message)
    }

    const canonical = extractCanonical(html)
    const noindex = hasNoindex(html)
    visited.set(path, { status, canonical, noindex, depth })

    const outLinks = extractLinks(html)
    for (const link of outLinks) {
      if (!enqueued.has(link)) {
        enqueued.add(link)
        queue.push({ path: link, depth: depth + 1 })
      }
    }

    if (reqCount % 100 === 0 || queue.length === 0) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
      const rps = (reqCount / (elapsed || 1)).toFixed(2)
      console.log(
        `Crawled ${reqCount} pages | Queue remaining: ${queue.length} | Elapsed: ${elapsed}s (${rps} req/s)`
      )
    }

    // Rate limit: ensure 200ms per request (max 5 req/sec)
    const fetchDuration = Date.now() - fetchStart
    if (fetchDuration < DELAY_MS) {
      await sleep(DELAY_MS - fetchDuration)
    }
  }

  // 3. Test any orphan sitemap URLs (not reached by BFS)
  const orphans = []
  for (const sitemapPath of sitemapPathSet) {
    if (!visited.has(sitemapPath)) {
      orphans.push(sitemapPath)
    }
  }

  if (orphans.length > 0) {
    console.log(`\nTesting ${orphans.length} orphan sitemap URLs directly...`)
    for (const path of orphans) {
      reqCount++
      const fetchStart = Date.now()
      let status = 0
      let html = ''
      try {
        const res = await fetch(`${LOCAL_ORIGIN}${path}`)
        status = res.status
        html = await res.text()
      } catch (err) {
        status = 500
      }
      const canonical = extractCanonical(html)
      const noindex = hasNoindex(html)
      visited.set(path, { status, canonical, noindex, depth: -1 })

      const fetchDuration = Date.now() - fetchStart
      if (fetchDuration < DELAY_MS) {
        await sleep(DELAY_MS - fetchDuration)
      }
    }
  }

  // 4. Analysis and reporting
  console.log('\n=== VERIFICATION RESULTS ===\n')

  // Table 1: Sitemap URLs Verification
  const statusCounts = {}
  let selfCanonicalCount = 0
  const nonSelfCanonicals = []
  let noindexCount = 0

  for (const [fullUrl, info] of sitemapMap.entries()) {
    const p = normalizePath(fullUrl)
    const result = visited.get(p)
    if (!result) {
      statusCounts['untested'] = (statusCounts['untested'] || 0) + 1
      continue
    }

    statusCounts[result.status] = (statusCounts[result.status] || 0) + 1

    const expectedCanonical = `${BASE_ORIGIN}${p === '/' ? '' : p}`
    if (result.canonical === expectedCanonical) {
      selfCanonicalCount++
    } else {
      nonSelfCanonicals.push({
        url: fullUrl,
        actualCanonical: result.canonical,
        expectedCanonical,
      })
    }

    if (result.noindex) {
      noindexCount++
    }
  }

  console.log('Table 1: Sitemap URLs Status and Canonical Verification')
  console.log('---------------------------------------------------------')
  console.log(`Total Sitemap URLs: ${sitemapMap.size}`)
  console.log(`HTTP Status Counts:`, JSON.stringify(statusCounts, null, 2))
  console.log(`Self-Canonical Matching URLs: ${selfCanonicalCount} / ${sitemapMap.size}`)
  console.log(`Non-Self Canonicals Count: ${nonSelfCanonicals.length}`)
  if (nonSelfCanonicals.length > 0) {
    console.log('Non-Self Canonicals List:')
    for (const item of nonSelfCanonicals) {
      console.log(`  - URL: ${item.url}`)
      console.log(`    Actual: ${item.actualCanonical}`)
      console.log(`    Expected: ${item.expectedCanonical}`)
    }
  }
  console.log(`Meta Robots noindex on Sitemap URLs: ${noindexCount} (target: 0)`)

  // Table 2: BFS Reachability and Orphans
  console.log('\nTable 2: BFS Crawl Reachability and Orphans')
  console.log('---------------------------------------------------------')
  console.log(`Total Visited via BFS: ${visited.size - orphans.length}`)
  console.log(`Total Sitemap URLs: ${sitemapMap.size}`)
  console.log(`Reachable Sitemap URLs: ${sitemapMap.size - orphans.length}`)
  console.log(`Orphan Sitemap URLs Count: ${orphans.length} (target: 0)`)
  if (orphans.length > 0) {
    console.log('Orphans List:')
    for (const o of orphans) {
      console.log(`  - ${o}`)
    }
  }

  // Check 6-digit SAC codes max depth
  let maxSacDepth = 0
  let sacCount = 0
  for (const [fullUrl, info] of sitemapMap.entries()) {
    if (info.id === 'sac' && fullUrl.includes('/sac/') && fullUrl.length > `${BASE_ORIGIN}/tools/hsn-code-finder/sac/`.length + 4) {
      sacCount++
      const p = normalizePath(fullUrl)
      const data = visited.get(p)
      if (data && data.depth > maxSacDepth) {
        maxSacDepth = data.depth
      }
    }
  }
  console.log(`6-digit SAC Codes Count: ${sacCount}`)
  console.log(`Max Click Depth for 6-digit SAC Codes from /: ${maxSacDepth} clicks (target: <= 4 clicks)`)

  // Table 3: Lastmod Distribution
  console.log('\nTable 3: Lastmod Distribution Across Sitemap Files')
  console.log('---------------------------------------------------------')
  const lastmodDist = {}
  let withLastmod = 0
  let withoutLastmod = 0
  for (const { lastmod } of sitemapMap.values()) {
    if (lastmod) {
      withLastmod++
      lastmodDist[lastmod] = (lastmodDist[lastmod] || 0) + 1
    } else {
      withoutLastmod++
    }
  }
  console.log(`URLs with lastmod: ${withLastmod}`)
  console.log(`URLs without lastmod: ${withoutLastmod}`)
  console.log(`Distinct lastmod dates: ${Object.keys(lastmodDist).length}`)
  const sortedDist = Object.entries(lastmodDist).sort((a, b) => b[1] - a[1])
  for (const [date, count] of sortedDist) {
    console.log(`  ${date}: ${count}`)
  }

  // Save report JSON
  fs.writeFileSync(
    'verification_results.json',
    JSON.stringify(
      {
        totalSitemapUrls: sitemapMap.size,
        statusCounts,
        selfCanonicalCount,
        nonSelfCanonicals,
        noindexCount,
        reachableSitemapUrls: sitemapMap.size - orphans.length,
        orphansCount: orphans.length,
        maxSacDepth,
        lastmodDist,
      },
      null,
      2
    )
  )

  console.log('\nVerification complete. Saved report to verification_results.json.')
}

main().catch(err => {
  console.error('Fatal error during verification:', err)
  process.exit(1)
})
