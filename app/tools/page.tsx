import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Free Business & GST Tools for Indian MSMEs | Udyog',
  description: '100% free online business and GST tools by Udyog: GST Calculator, GST Invoice Templates (Excel & PDF), Digital Signature Maker, and HSN & SAC Code Finder. No signup required.',
  keywords: 'free gst tools, free billing tools, gst calculator, gst invoice templates, digital signature maker india, hsn code finder, sac code finder, free tools for msme',
  openGraph: {
    title: 'Free Business & GST Tools for Indian MSMEs — Udyog',
    description: 'Free online tools: GST Calculator, GST Invoice Templates, Digital Signature Maker, and HSN & SAC Code Finder. 100% free with no signup needed.',
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
    description: 'Calculate CGST, SGST, and IGST inclusive or exclusive amounts instantly across all GST slabs (5%, 12%, 18%, 28%).',
    href: '/tools/gst-calculator',
    cta: 'Open GST Calculator',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    name: 'GST Invoice Templates',
    badge: 'EXCEL & PDF',
    description: 'Download government-compliant GST invoice formats in Excel, PDF, and HTML ready to use for Indian businesses.',
    href: '/tools/invoice-template',
    cta: 'Download Templates',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <main style={{ paddingTop: 68, minHeight: '100vh', background: '#F8FAFC' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero Section */}
        <section style={{ background: '#0F172A', padding: 'clamp(56px,7vw,88px) var(--section-px, 24px)', textAlign: 'center' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F97316', marginBottom: 14, display: 'inline-block' }}>
              FREE UTILITIES FOR BUSINESSES
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 400, color: '#fff', lineHeight: 1.2, marginBottom: 18 }}>
              Free Tools for Indian Businesses
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
              Simple, accurate, and completely free tools to streamline billing, taxation, and invoice workflows. No signup or installation required.
            </p>
          </div>
        </section>

        {/* Tools Cards Grid */}
        <section style={{ padding: 'clamp(48px,6vw,72px) var(--section-px, 24px)' }}>
          <div style={{ maxWidth: 1120, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
              {TOOLS.map(tool => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div
                    style={{
                      background: '#fff',
                      borderRadius: 20,
                      border: '1.5px solid #E2E8F0',
                      padding: '36px 30px',
                      height: '100%',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
                          borderRadius: 16,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 22,
                          border: '1px solid #FED7AA',
                        }}
                      >
                        {tool.icon}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                          {tool.name}
                        </h2>
                        <span
                          style={{
                            background: '#F0FDF4',
                            color: '#16A34A',
                            fontSize: 11,
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: 20,
                            border: '1px solid #BBF7D0',
                          }}
                        >
                          {tool.badge}
                        </span>
                      </div>

                      <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.7, margin: '0 0 24px 0' }}>
                        {tool.description}
                      </p>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        color: '#F97316',
                        fontSize: 15,
                        fontWeight: 600,
                        paddingTop: 8,
                      }}
                    >
                      {tool.cta}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
        <section style={{ background: '#fff', borderTop: '1px solid #E2E8F0', padding: 'clamp(56px,7vw,80px) var(--section-px, 24px)', textAlign: 'center' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F97316', marginBottom: 12, display: 'inline-block' }}>
              READY FOR FULL AUTOMATION?
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,38px)', fontWeight: 400, color: '#0F172A', marginBottom: 14 }}>
              Take Your Billing Beyond Free Tools
            </h2>
            <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.7, marginBottom: 28 }}>
              Create GST invoices in 10 seconds, track inventory, file GSTR-1, and collaborate with your CA seamlessly with Udyog.
            </p>
            <a
              href="https://app.udyogbook.in/sign-in"
              style={{
                display: 'inline-block',
                background: '#F97316',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(249, 115, 22, 0.28)',
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
