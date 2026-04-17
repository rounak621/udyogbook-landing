import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import type { Metadata } from 'next'
import { BLOG_POSTS } from '../../lib/blog-posts'

export const metadata: Metadata = {
  title: 'Blog — GST Guides, Billing Tips & Business Insights | Udyog',
  description: 'Tips, guides, and insights for Indian small businesses on GST, billing, voice invoicing, and business growth. Written by the Udyog team.',
  openGraph: {
    title: 'Udyog Blog — GST Guides & Billing Tips for Indian Businesses',
    description: 'GST guides, billing tips, and business insights for Indian MSMEs, retailers, and traders.',
    url: 'https://udyogbook.in/blog',
  },
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68, background: '#fff', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ background: '#0F172A', padding: 'clamp(60px,8vw,100px) var(--section-px)', textAlign: 'center' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F97316', marginBottom: 14 }}>Udyog Blog</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 400, color: '#fff', lineHeight: 1.15, marginBottom: 16, letterSpacing: '-0.02em' }}>
              Insights for <span style={{ fontStyle: 'italic', color: '#F97316' }}>Indian business owners</span>
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
              GST guides, billing tips, and growth strategies for MSMEs, retailers, and traders.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)' }}>
          <style suppressHydrationWarning>{`
            .blog-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; text-decoration: none; display: block; }
            .blog-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
            .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
            @media (max-width: 900px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 600px) { .blog-grid { grid-template-columns: 1fr; } }
          `}</style>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="blog-grid">
              {BLOG_POSTS.map(post => (
                <a key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                  <div style={{ height: 6, background: post.color }} />
                  <div style={{ padding: '24px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: post.color, textTransform: 'uppercase', letterSpacing: '0.06em', background: post.color + '18', padding: '3px 10px', borderRadius: 100 }}>{post.category}</span>
                      <span style={{ fontSize: 11, color: '#94a3b8' }}>{post.readTime}</span>
                    </div>
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', lineHeight: 1.4, marginBottom: 10 }}>{post.title}</h2>
                    <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65, marginBottom: 16 }}>{post.excerpt}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>{post.date}</span>
                      <span style={{ fontSize: 13, color: '#F97316', fontWeight: 600 }}>Read more →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Newsletter CTA */}
            <div style={{ marginTop: 64, background: '#0F172A', borderRadius: 20, padding: 'clamp(32px,4vw,48px)', textAlign: 'center' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F97316', marginBottom: 12 }}>Stay Updated</p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 400, color: '#fff', marginBottom: 12, letterSpacing: '-0.02em' }}>
                Get GST tips in your inbox
              </h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>Weekly insights for Indian business owners. No spam.</p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <input type="email" placeholder="your@email.com" style={{ padding: '12px 16px', borderRadius: 9, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: '#fff', fontSize: 14, width: 260, outline: 'none' }} />
                <button style={{ background: '#F97316', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 9, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Subscribe</button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
