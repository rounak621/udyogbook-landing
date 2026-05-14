import { MetadataRoute } from 'next'
import { getAllSlugs } from '../lib/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://udyogbook.in'
    const lastModified = new Date()

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1.0 },
        { url: `${baseUrl}/pricing`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/gst-calculator`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/invoice-template`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/tools/digital-signature`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/gst-compliance`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/privacy-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/terms-of-service`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/refund-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    ]

    // Dynamic blog pages
    const blogPages: MetadataRoute.Sitemap = getAllSlugs().map(slug => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [...staticPages, ...blogPages]
}