import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://udyogbook.in'
  const sitemaps = [
    'core',
    'blog',
    'chapters',
    'headings',
    'sac',
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    id => `  <sitemap>
    <loc>${baseUrl}/sitemap/${id}.xml</loc>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
