import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BLOG_POSTS, getPostBySlug, getAllSlugs, type BlogSection } from '../../../lib/blog-posts'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://udyogbook.in/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
    },
  }
}

function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case 'h2':
      return (
        <h2 key={index} style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 700, color: '#0f172a', marginTop: 40, marginBottom: 12, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
          {section.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 key={index} style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginTop: 28, marginBottom: 10 }}>
          {section.text}
        </h3>
      )
    case 'p':
      return (
        <p key={index} style={{ fontSize: 16, color: '#475569', lineHeight: 1.85, marginBottom: 16 }}>
          {section.text}
        </p>
      )
    case 'ul':
      return (
        <ul key={index} style={{ margin: '12px 0 20px', paddingLeft: 0, listStyle: 'none' }}>
          {section.items?.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '6px 0', fontSize: 15, color: '#475569', lineHeight: 1.7 }}>
              <span style={{ color: '#10b981', flexShrink: 0, marginTop: 3, fontSize: 14 }}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol key={index} style={{ margin: '12px 0 20px', paddingLeft: 0, listStyle: 'none', counterReset: 'step-counter' }}>
          {section.items?.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '8px 0', fontSize: 15, color: '#475569', lineHeight: 1.7 }}>
              <span style={{ background: '#F97316', color: '#fff', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      )
    case 'table':
      return (
        <div key={index} style={{ overflowX: 'auto', margin: '20px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#0F172A' }}>
                {section.headers?.map(h => (
                  <th key={h} style={{ color: '#fff', fontWeight: 600, padding: '10px 14px', textAlign: 'left', whiteSpace: 'nowrap', fontSize: 13 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows?.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '10px 14px', color: j === 0 ? '#0f172a' : '#475569', fontWeight: j === 0 ? 500 : 400, lineHeight: 1.5 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'highlight':
      return (
        <div key={index} style={{ background: (section.color || '#F97316') + '12', border: `1px solid ${section.color || '#F97316'}30`, borderLeft: `4px solid ${section.color || '#F97316'}`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
          {section.label && (
            <p style={{ fontSize: 12, fontWeight: 700, color: section.color || '#F97316', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{section.label}</p>
          )}
          <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.75, margin: 0 }}>{section.text}</p>
        </div>
      )
    case 'cta':
      return (
        <div key={index} style={{ background: '#0F172A', borderRadius: 16, padding: 'clamp(24px,4vw,36px)', textAlign: 'center', margin: '36px 0' }}>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 20 }}>{section.text}</p>
          <a href="https://app.udyogbook.in/signup" style={{ display: 'inline-block', background: '#F97316', color: '#fff', padding: '12px 28px', borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
            {section.label || 'Try Udyog Free'} →
          </a>
        </div>
      )
    default:
      return null
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  } : null

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "datePublished": post.date,
    "author": { "@type": "Organization", "name": "Udyog" },
    "publisher": {
      "@type": "Organization",
      "name": "Udyog",
      "logo": { "@type": "ImageObject", "url": "https://udyogbook.in/udyog-logo.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://udyogbook.in/blog/${post.slug}` }
  }

  return (
    <>
      <Navbar />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <main style={{ paddingTop: 68, background: '#fff', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ background: '#0F172A', padding: 'clamp(48px,6vw,80px) var(--section-px)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
              <a href="/blog" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Blog</a>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>→</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: post.color, background: post.color + '20', padding: '2px 10px', borderRadius: 100 }}>{post.category}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,44px)', fontWeight: 400, color: '#fff', lineHeight: 1.2, marginBottom: 20, letterSpacing: '-0.02em' }}>
              {post.title}
            </h1>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{post.date}</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>·</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{post.readTime}</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>·</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>By Udyog Team</span>
            </div>
          </div>
        </section>

        {/* Article body */}
        <section style={{ padding: 'clamp(40px,5vw,64px) var(--section-px)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {post.content.map((section, i) => renderSection(section, i))}
          </div>
        </section>

        {/* FAQ section */}
        {post.faqs && post.faqs.length > 0 && (
          <section style={{ background: '#F8FAFC', padding: 'clamp(40px,5vw,64px) var(--section-px)' }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
                Frequently asked questions
              </h2>
              <p style={{ fontSize: 15, color: '#64748b', marginBottom: 32 }}>Quick answers to common questions.</p>
              {post.faqs.map((faq, i) => (
                <div key={i} itemScope itemType="https://schema.org/Question"
                  style={{ borderBottom: '1px solid #E2E8F0', padding: '20px 0' }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }} itemProp="name">
                    {faq.q}
                  </p>
                  <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.8, margin: 0 }} itemProp="text">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related posts */}
        <section style={{ padding: 'clamp(40px,5vw,64px) var(--section-px)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>More from Udyog Blog</h2>
            <style suppressHydrationWarning>{`
              .related-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
              @media (max-width: 600px) { .related-grid { grid-template-columns: 1fr; } }
            `}</style>
            <div className="related-grid">
              {BLOG_POSTS.filter(p => p.slug !== post.slug && p.content.length > 1).slice(0, 2).map(related => (
                <a key={related.slug} href={`/blog/${related.slug}`} style={{ textDecoration: 'none', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: '18px 20px', display: 'block' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: related.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{related.category}</span>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginTop: 6, marginBottom: 0, lineHeight: 1.4 }}>{related.title}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{ background: '#0F172A', padding: 'clamp(48px,6vw,72px) var(--section-px)', textAlign: 'center' }}>
          <div style={{ maxWidth: 520, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,36px)', fontWeight: 400, color: '#fff', marginBottom: 14, letterSpacing: '-0.02em' }}>
              Ready to try Udyog?
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
              Free plan. No credit card. First invoice in 2 minutes.
            </p>
            <a href="https://app.udyogbook.in/signup" style={{ display: 'inline-block', background: '#F97316', color: '#fff', padding: '13px 32px', borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              Start free →
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
