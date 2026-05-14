import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
            // Google AI
            { userAgent: 'Google-Extended', allow: '/' },
            // OpenAI
            { userAgent: 'GPTBot', allow: '/' },
            { userAgent: 'ChatGPT-User', allow: '/' },
            { userAgent: 'OAI-SearchBot', allow: '/' },
            // Anthropic Claude
            { userAgent: 'anthropic-ai', allow: '/' },
            { userAgent: 'Claude-Web', allow: '/' },
            { userAgent: 'ClaudeBot', allow: '/' },
            // Perplexity
            { userAgent: 'PerplexityBot', allow: '/' },
            // Microsoft Copilot
            { userAgent: 'Bingbot', allow: '/' },
            { userAgent: 'msnbot', allow: '/' },
            // Meta AI
            { userAgent: 'meta-externalagent', allow: '/' },
            // Apple
            { userAgent: 'Applebot', allow: '/' },
            // Common AI research bots
            { userAgent: 'cohere-ai', allow: '/' },
            { userAgent: 'AI2Bot', allow: '/' },
            { userAgent: 'Diffbot', allow: '/' },
            { userAgent: 'YouBot', allow: '/' },
        ],
        sitemap: 'https://udyogbook.in/sitemap.xml',
        host: 'https://udyogbook.in',
    }
}