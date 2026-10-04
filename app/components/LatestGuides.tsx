import React from 'react'
import { getPostBySlug } from '../../lib/blog-posts'

const GUIDE_SLUGS = [
  'freelancer-consultant-gst-invoice-india',
  'gst-invoice-format-service-provider-india',
  'gst-on-rental-services-india',
  'quotation-format-indian-service-businesses',
  'service-invoice-vs-sales-invoice-india',
  'track-overdue-rental-returns-india',
]

export default function LatestGuides() {
  const guides = GUIDE_SLUGS.map(slug => getPostBySlug(slug)).filter(Boolean)

  return (
    <section style={{ padding: 'clamp(56px, 7vw, 96px) var(--section-px)', background: '#F8FAFC' }}>
      <style suppressHydrationWarning>{`
        .guides-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 40px;
        }
        @media (max-width: 992px) {
          .guides-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .guides-grid { grid-template-columns: 1fr; }
        }
        .guide-card {
          background: #ffffff;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .guide-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
          border-color: #CBD5E1;
        }
      `}</style>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F97316', marginBottom: 10, display: 'block' }}>
              RESOURCES &amp; GUIDES
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, color: '#0F172A', lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0 }}>
              Latest guides for Indian businesses
            </h2>
          </div>
          <a href="/blog" style={{ fontSize: 14, fontWeight: 700, color: '#F97316', textDecoration: 'none' }}>
            View all guides →
          </a>
        </div>

        <div className="guides-grid">
          {guides.map(post => post && (
            <a key={post.slug} href={`/blog/${post.slug}`} className="guide-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: post.color || '#F97316',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    background: (post.color || '#F97316') + '18',
                    padding: '3px 10px',
                    borderRadius: 100,
                  }}>
                    {post.category}
                  </span>
                  <span style={{ fontSize: 12, color: '#94A3B8' }}>{post.readTime}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', lineHeight: 1.4, marginBottom: 10 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, marginBottom: 20 }}>
                  {post.excerpt}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{post.date}</span>
                <span style={{ fontSize: 13, color: '#F97316', fontWeight: 600 }}>Read guide →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
