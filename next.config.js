/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/blog/wholesale-distributor-billing-software-india', destination: '/blog', permanent: true },
      { source: '/blog/zoho-books-vs-udyog-2026', destination: '/blog', permanent: true },
      { source: '/blog/billing-software-delhi-traders-2026', destination: '/blog', permanent: true },
      { source: '/blog/ai-billing-small-business-india-guide', destination: '/blog', permanent: true },
      { source: '/blog/maya-ai-voice-billing', destination: '/blog', permanent: true },
      { source: '/blog/gst-invoice-kaise-banaye', destination: '/blog', permanent: true },
      { source: '/blog/billing-software-mumbai-traders-2026', destination: '/blog', permanent: true },
      { source: '/blog/gst-registration-ke-baad-kya-karein', destination: '/blog', permanent: true },
      { source: '/blog/how-to-reduce-gst-filing-time-small-business', destination: '/blog', permanent: true },
      { source: '/blog/furniture-event-equipment-rental-software-india', destination: '/blog', permanent: true },
      { source: '/blog/rental-business-billing-software', destination: '/blog', permanent: true },
      { source: '/blog/what-is-ai-billing-india', destination: '/blog', permanent: true },
      { source: '/blog/gst-invoice-voice-hindi', destination: '/blog', permanent: true },
      { source: '/blog/khatabook-vs-udyog-2026', destination: '/blog', permanent: true },
      { source: '/blog/what-is-udyog-gst-billing-app', destination: '/blog', permanent: true },
      { source: '/blog/mybillbook-vs-udyog-2026', destination: '/blog', permanent: true },
      { source: '/blog/tent-shamiana-rental-business-billing-india', destination: '/blog', permanent: true },
      { source: '/blog/billing-software-pune-small-business-2026', destination: '/blog', permanent: true },
      { source: '/blog/gst-mistakes-small-business', destination: '/blog', permanent: true },
      { source: '/blog/profitbooks-vs-udyog-2026', destination: '/blog', permanent: true },
      { source: '/blog/how-maya-ai-creates-gst-invoices', destination: '/blog', permanent: true },
      { source: '/blog/tally-vs-vyapar-vs-udyog-2026', destination: '/blog', permanent: true },
      { source: '/blog/gst-billing-software-for-ca-india', destination: '/blog', permanent: true },
      { source: '/blog/voice-ai-billing-vs-manual-billing-india', destination: '/blog', permanent: true },
      { source: '/blog/udyog-vs-tally-small-business', destination: '/blog', permanent: true },
      { source: '/blog/free-gst-invoice-template-download', destination: '/blog', permanent: true },
    ]
  },
}
module.exports = nextConfig