import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const REDIRECT_MAP: Record<string, string> = {
  '/blog/equipment-rental-business-management-software-india': '/blog/equipment-rental-billing-software-guide-india-2026',
  '/blog/camera-rental-business-billing-software-india': '/blog/best-rental-billing-software-india-2026',
  '/blog/gst-invoice-rental-business-india': '/blog/gst-on-rental-services-india',
}

const GONE_PATHS = new Set([
  '/blog/ca-collaboration-portal',
  '/blog/gstr-1-filing-guide-2026',
  '/blog/inventory-management-small-business-india',
  '/blog/negative-stock-indian-retailers',
  '/blog/wholesale-distributor-billing-software-india',
  '/blog/zoho-books-vs-udyog-2026',
  '/blog/billing-software-delhi-traders-2026',
  '/blog/ai-billing-small-business-india-guide',
  '/blog/maya-ai-voice-billing',
  '/blog/gst-invoice-kaise-banaye',
  '/blog/billing-software-mumbai-traders-2026',
  '/blog/gst-registration-ke-baad-kya-karein',
  '/blog/how-to-reduce-gst-filing-time-small-business',
  '/blog/furniture-event-equipment-rental-software-india',
  '/blog/rental-business-billing-software',
  '/blog/what-is-ai-billing-india',
  '/blog/gst-invoice-voice-hindi',
  '/blog/khatabook-vs-udyog-2026',
  '/blog/what-is-udyog-gst-billing-app',
  '/blog/mybillbook-vs-udyog-2026',
  '/blog/tent-shamiana-rental-business-billing-india',
  '/blog/billing-software-pune-small-business-2026',
  '/blog/gst-mistakes-small-business',
  '/blog/profitbooks-vs-udyog-2026',
  '/blog/how-maya-ai-creates-gst-invoices',
  '/blog/tally-vs-vyapar-vs-udyog-2026',
  '/blog/gst-billing-software-for-ca-india',
  '/blog/voice-ai-billing-vs-manual-billing-india',
  '/blog/udyog-vs-tally-small-business',
  '/blog/free-gst-invoice-template-download',
  '/blog/how-to-send-gst-invoice-whatsapp',
  '/blog/how-to-switch-tally-to-cloud-billing',
  '/blog/busy-accounting-vs-udyog-2026',
])

const GONE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Article Removed | Udyog</title>
  <meta name="robots" content="noindex, follow">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #fff; color: #0f172a; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
    .card { max-width: 480px; text-align: center; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px 32px; background: #fafaf8; }
    h1 { font-size: 24px; margin-bottom: 12px; color: #0f172a; }
    p { font-size: 15px; color: #64748b; line-height: 1.6; margin-bottom: 24px; }
    a { display: inline-block; background: #F97316; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; }
    a:hover { background: #ea580c; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Article Removed</h1>
    <p>This article has been permanently removed. Please explore our live GST guides, billing tips, and business insights on the Udyog Blog.</p>
    <a href="/blog">Browse Udyog Blog &rarr;</a>
  </div>
</body>
</html>`

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const normalizedPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

  if (GONE_PATHS.has(normalizedPath)) {
    return new NextResponse(GONE_HTML, {
      status: 410,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    })
  }

  if (REDIRECT_MAP[normalizedPath]) {
    const destination = REDIRECT_MAP[normalizedPath]
    return NextResponse.redirect(new URL(destination, request.url), 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/blog/:path*'],
}
