export const SITE_URL = 'https://udyogbook.in'

/**
 * Returns an absolute canonical URL without a trailing slash.
 * For the homepage ('/' or ''), returns 'https://udyogbook.in'.
 * For other routes, returns 'https://udyogbook.in/path'.
 */
export function getCanonicalUrl(path: string): string {
  if (!path || path === '/') return SITE_URL
  const cleanPath = path.replace(/\/+$/, '')
  return `${SITE_URL}${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`
}

/**
 * Helper to generate alternates.canonical for Next.js metadata.
 */
export function selfCanonical(path: string) {
  return {
    canonical: getCanonicalUrl(path),
  }
}
