/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/gst-calculator', destination: '/tools/gst-calculator', permanent: true },
      { source: '/invoice-template', destination: '/tools/invoice-template', permanent: true },
    ]
  },
}
module.exports = nextConfig