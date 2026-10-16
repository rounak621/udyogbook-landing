import { MetadataRoute } from 'next'
import { execSync } from 'child_process'
import { BLOG_POSTS } from '../lib/blog-posts'
import {
  getAllHSNChapters,
  getAllHSNHeadings,
  getAll6DigitSACCodes,
  getAllSACGroups,
} from '../lib/hsn-data'

export async function generateSitemaps() {
  return [
    { id: 'core' },
    { id: 'blog' },
    { id: 'chapters' },
    { id: 'headings' },
    { id: 'sac' },
  ]
}

const baseUrl = 'https://udyogbook.in'

function getGitLastMod(filePath: string): Date | undefined {
  try {
    const stdout = execSync(`git log -1 --format=%cI -- ${filePath}`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (stdout) {
      const d = new Date(stdout)
      if (!isNaN(d.getTime())) return d
    }
  } catch {
    // If git is not available or file is untracked, omit lastmod
  }
  return undefined
}

export default async function sitemap({
  id,
}: {
  id: string
}): Promise<MetadataRoute.Sitemap> {
  switch (id) {
    case 'core': {
      const corePages: {
        path: string
        file: string
        changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
        priority: number
      }[] = [
        { path: '', file: 'app/page.tsx', changeFrequency: 'weekly', priority: 1.0 },
        { path: '/pricing', file: 'app/pricing/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
        { path: '/custom-solutions', file: 'app/custom-solutions/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
        { path: '/tools', file: 'app/tools/page.tsx', changeFrequency: 'weekly', priority: 0.9 },
        { path: '/tools/gst-calculator', file: 'app/tools/gst-calculator/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
        { path: '/tools/invoice-template', file: 'app/tools/invoice-template/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
        { path: '/tools/digital-signature', file: 'app/tools/digital-signature/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
        { path: '/tools/hsn-code-finder', file: 'app/tools/hsn-code-finder/page.tsx', changeFrequency: 'weekly', priority: 0.9 },
        { path: '/about', file: 'app/about/page.tsx', changeFrequency: 'monthly', priority: 0.8 },
        { path: '/contact', file: 'app/contact/page.tsx', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/blog', file: 'app/blog/page.tsx', changeFrequency: 'weekly', priority: 0.8 },
        { path: '/gst-compliance', file: 'app/gst-compliance/page.tsx', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/privacy-policy', file: 'app/privacy-policy/page.tsx', changeFrequency: 'yearly', priority: 0.3 },
        { path: '/terms-of-service', file: 'app/terms-of-service/page.tsx', changeFrequency: 'yearly', priority: 0.3 },
        { path: '/refund-policy', file: 'app/refund-policy/page.tsx', changeFrequency: 'yearly', priority: 0.3 },
        { path: '/cookie-policy', file: 'app/cookie-policy/page.tsx', changeFrequency: 'yearly', priority: 0.3 },
      ]

      return corePages.map(page => {
        const lastModified = getGitLastMod(page.file)
        return {
          url: `${baseUrl}${page.path}`,
          ...(lastModified ? { lastModified } : {}),
          changeFrequency: page.changeFrequency,
          priority: page.priority,
        }
      })
    }

    case 'blog': {
      return BLOG_POSTS.map(post => {
        const dateStr = post.dateModified || post.date
        const lastModified = new Date(dateStr)
        const validLastMod = !isNaN(lastModified.getTime()) ? lastModified : undefined

        return {
          url: `${baseUrl}/blog/${post.slug}`,
          ...(validLastMod ? { lastModified: validLastMod } : {}),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        }
      })
    }

    case 'chapters': {
      return getAllHSNChapters().map(ch => ({
        url: `${baseUrl}/tools/hsn-code-finder/chapter/${ch.c}`,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))
    }

    case 'headings': {
      return getAllHSNHeadings().map(h => ({
        url: `${baseUrl}/tools/hsn-code-finder/hsn/${h.c}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    }

    case 'sac': {
      const chapter99 = [
        {
          url: `${baseUrl}/tools/hsn-code-finder/chapter/99`,
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        },
      ]

      const groups = getAllSACGroups().map(g => ({
        url: `${baseUrl}/tools/hsn-code-finder/sac/${g.c}`,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))

      const codes = getAll6DigitSACCodes().map(s => ({
        url: `${baseUrl}/tools/hsn-code-finder/sac/${s.c}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))

      return [...chapter99, ...groups, ...codes]
    }

    default:
      return []
  }
}