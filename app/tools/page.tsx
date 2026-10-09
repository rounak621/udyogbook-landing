import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Free Business & GST Tools for MSMEs',
  description: '100% free online business and GST tools by Udyog: GST Calculator, GST Invoice Templates (Excel & PDF), Digital Signature Maker, and HSN & SAC Code Finder. No signup required.',
  keywords: 'free gst tools, free billing tools, gst calculator, gst invoice templates, digital signature maker india, hsn code finder, sac code finder, free tools for msme',
  openGraph: {
    title: 'Free Business & GST Tools for MSMEs',
    description: '100% free online business and GST tools by Udyog: GST Calculator, GST Invoice Templates, Digital Signature Maker, and HSN & SAC Code Finder. No signup required.',
    url: 'https://udyogbook.in/tools',
    type: 'website',
  },
  alternates: {
    canonical: 'https://udyogbook.in/tools',
  },
}

const TOOLS = [
  {
    name: 'GST Calculator',
    badge: 'FREE',
    description: 'Calculate CGST, SGST, and IGST inclusive or exclusive amounts instantly across all GST slabs (0%, 5%, 18% and 40%).',
    href: '/tools/gst-calculator',
    cta: 'Open GST Calculator',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    name: 'GST Invoice Templates',
    badge: 'EXCEL & PDF',
    description: 'Download GST invoice formats in Excel, PDF and HTML.',
    href: '/tools/invoice-template',
    cta: 'Download Templates',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    name: 'Digital Signature Maker',
    badge: 'ONLINE',
    description: 'Draw, type, or upload your signature online and download as a high-resolution transparent PNG for invoices and contracts.',
    href: '/tools/digital-signature',
    cta: 'Create Signature',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    name: 'HSN & SAC Code Finder',
    badge: 'GST RATES',
    description: 'Search 21,000+ official CBIC HSN goods codes and SAC service codes with current tax rates and Hinglish search.',
    href: '/tools/hsn-code-finder',
    cta: 'Find HSN & SAC Rates',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
]

export default function ToolsHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Business & GST Tools — Udyog",
    "description": "Free online tools for Indian businesses: GST Calculator, Invoice Templates, Digital Signature Maker, and HSN & SAC Code Finder.",
    "url": "https://udyogbook.in/tools",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": TOOLS.map((t, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": t.name,
        "description": t.description,
        "url": `https://udyogbook.in${t.href}`,
      })),
    },
  }

  return (
    <>
      <Navbar />
      <style>{`
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        @media (max-width: 1024px) {
          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 680px) {
          .tools-grid {
            grid-template-columns: 1fr;
          }
        }
        .tool-card {
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #D1D5DB;
          padding: 32px 26px;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        .tool-card:hover {
          border-color: #EA580C;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
      `}</style>
      <main style={{ paddingTop: 76, minHeight: '100vh', background: '#F8FAFC' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero Section */}
        <section style={{ background: '#0F172A', padding: '84px 24px 76px', textAlign: 'center' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: '#EA580C',
                color: '#FFFFFF',
                padding: '4px 12px',
                borderRadius: 6,
                marginBottom: 16,
                display: 'inline-block',
              }}
            >
              FREE UTILITIES FOR BUSINESSES
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 400, color: '#FFFFFF', lineHeight: 1.2, margin: '0 0 18px 0' }}>
              Free Tools for Indian Businesses
            </h1>
            <p style={{ fontSize: 17, color: '#E2E8F0', lineHeight: 1.7, maxWidth: 620, margin: '0 auto' }}>
              Simple, accurate, and completely free tools to streamline billing, taxation, and invoice workflows. No signup or installation required.
            </p>
          </div>
        </section>

        {/* Tools Cards Grid */}
        <section style={{ padding: 'clamp(44px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ maxWidth: 1160, margin: '0 auto' }}>
            <div className="tools-grid">
              {TOOLS.map(tool => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="tool-card">
                    <div>
                      {/* Solid orange icon box with white icon */}
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          background: '#EA580C',
                          borderRadius: 12,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 20,
                        }}
                      >
                        {tool.icon}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                          {tool.name}
                        </h2>
                        {/* Solid navy badge with white text */}
                        <span
                          style={{
                            background: '#0F172A',
                            color: '#FFFFFF',
                            fontSize: 12,
                            fontWeight: 700,
                            padding: '4px 10px',
                            borderRadius: 6,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {tool.badge}
                        </span>
                      </div>

                      <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.6, margin: '0 0 24px 0' }}>
                        {tool.description}
                      </p>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        color: '#C2410C',
                        fontSize: 15,
                        fontWeight: 700,
                        paddingTop: 8,
                      }}
                    >
                      {tool.cta}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA to Udyog Billing Software */}
        <section style={{ background: '#FFFFFF', borderTop: '1px solid #D1D5DB', padding: 'clamp(56px,7vw,80px) clamp(16px,4vw,24px)', textAlign: 'center' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: '#0F172A',
                color: '#FFFFFF',
                padding: '4px 12px',
                borderRadius: 6,
                marginBottom: 14,
                display: 'inline-block',
              }}
            >
              READY FOR FULL AUTOMATION?
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,38px)', fontWeight: 400, color: '#0F172A', margin: '0 0 14px 0' }}>
              Take Your Billing Beyond Free Tools
            </h2>
            <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.7, marginBottom: 28 }}>
              Create GST invoices in 10 seconds, track inventory, file GSTR-1, and collaborate with your CA seamlessly with Udyog.
            </p>
            <a
              href="https://app.udyogbook.in/sign-in"
              style={{
                display: 'inline-block',
                background: '#C2410C',
                color: '#FFFFFF',
                padding: '14px 32px',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(194, 65, 12, 0.3)',
              }}
            >
              Start Free Trial →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
