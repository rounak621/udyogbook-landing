import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '../lib/blog-posts'
import { getAllHSNChapters, getAllHSNHeadings, getAll6DigitSACCodes } from '../lib/hsn-data'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://udyogbook.in'
    const lastModified = new Date('2026-09-08')

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1.0 },
        { url: `${baseUrl}/pricing`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/custom-solutions`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/tools`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/tools/gst-calculator`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/tools/invoice-template`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/tools/digital-signature`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/tools/hsn-code-finder`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/gst-compliance`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/privacy-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/terms-of-service`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/refund-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/cookie-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    ]

    // Dynamic blog pages
    const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // HSN 2-digit chapter pages
    const chapterPages: MetadataRoute.Sitemap = getAllHSNChapters().map(ch => ({
        url: `${baseUrl}/tools/hsn-code-finder/chapter/${ch.c}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // HSN 4-digit heading pages
    const hsnPages: MetadataRoute.Sitemap = getAllHSNHeadings().map(h => ({
        url: `${baseUrl}/tools/hsn-code-finder/hsn/${h.c}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // SAC 6-digit code pages
    const sacPages: MetadataRoute.Sitemap = getAll6DigitSACCodes().map(s => ({
        url: `${baseUrl}/tools/hsn-code-finder/sac/${s.c}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...staticPages, ...blogPages, ...chapterPages, ...hsnPages, ...sacPages]
}