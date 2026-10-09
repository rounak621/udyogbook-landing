import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import FinderClient from './FinderClient'
import {
  getAllHSNHeadings,
  getAll6DigitSACCodes,
  getAllHSNChapters,
} from '../../../lib/hsn-data'

export const metadata: Metadata = {
  title: 'HSN Code Finder & GST Rates 2026',
  description:
    'Search 21,000+ HSN and SAC codes with official CBIC GST rates (0%, 5%, 18% and 40%). Search by product name, Hinglish keywords, or 4-digit tariff code.',
  keywords:
    'hsn code finder, gst rate finder, sac code list, hsn search online, cbic gst rates, gst goods rates 2026, sac code search india',
  alternates: {
    canonical: 'https://udyogbook.in/tools/hsn-code-finder',
  },
  openGraph: {
    title: 'HSN Code Finder & GST Rates 2026',
    description:
      'Search 21,000+ HSN and SAC codes with official CBIC GST rates (0%, 5%, 18% and 40%). Search by product name, Hinglish keywords, or 4-digit tariff code.',
    url: 'https://udyogbook.in/tools/hsn-code-finder',
    type: 'website',
  },
}

const MOST_SEARCHED_HSN_CODES = [
  '6109', '6105', '6203', '6204', '6403', '1006', '1101', '1701', '1905', '0902',
  '0401', '0406', '2106', '2202', '3004', '3401', '3304', '3305', '8517', '8471',
  '8528', '8703', '8711', '7113', '7108', '7208', '7210', '2523', '6907', '9403',
  '9401', '4820', '4802', '3923', '8504', '8536', '8539', '8415', '8418', '8450',
]

const POPULAR_SAC_CODES = [
  '998311', '998313', '998314', '998315', '998361', '997212', '996331', '995411',
]

const FAQS = [
  {
    q: 'What is the difference between HSN and SAC codes in GST?',
    a: 'HSN (Harmonized System of Nomenclature) classifies physical goods across 98 chapters with 2, 4, 6, or 8 digits. SAC (Services Accounting Code) classifies all services under Chapter 99 with standard 6-digit codes.',
  },
  {
    q: 'How many digits of HSN code are mandatory on a GST tax invoice?',
    a: 'Businesses with aggregate turnover up to ₹5 crore must report at least 4 digits on B2B invoices. Businesses with turnover exceeding ₹5 crore must report 6 digits on all B2B and B2C invoices. Import and export transactions require full 8-digit tariff codes.',
  },
  {
    q: 'What is the GST rate if a product is not specifically listed in the rate schedules?',
    a: 'If goods are not specifically listed in Schedules I, III, IV, V, VI, or the exempt schedule, they fall under the residual entry in Schedule II (S. No. 639) and are taxed at 18% (CGST 9% + SGST 9% or IGST 18%).',
  },
  {
    q: 'How often are GST HSN and SAC rates updated by the Government?',
    a: 'GST rates are recommended by the GST Council and notified by the Central Board of Indirect Taxes and Customs (CBIC). Rates shown here reflect Notifications 09/2025 and 10/2025 (Central Tax - Rate) effective 22 September 2025.',
  },
]

export default function HSNCodeFinderPage() {
  const allHeadings = getAllHSNHeadings()
  const allSacs = getAll6DigitSACCodes()
  const allChapters = getAllHSNChapters()

  const mostSearchedHsns = MOST_SEARCHED_HSN_CODES.map(code => {
    const item = allHeadings.find(h => h.c === code)
    if (!item) return null
    const clean = item.d.replace(/\s+/g, ' ').trim()
    const rawClause = clean.split(/[;:\n]/)[0].trim().replace(/\.$/, '')
    const shortDesc = rawClause.length > 40 ? rawClause.slice(0, 39).trim() + '…' : rawClause
    return {
      code,
      label: `${code} - ${shortDesc}`,
      href: `/tools/hsn-code-finder/hsn/${code}`,
    }
  }).filter(Boolean) as { code: string; label: string; href: string }[]

  const popularSacs = POPULAR_SAC_CODES.map(code => {
    const item = allSacs.find(s => s.c === code)
    if (!item) return null
    const clean = item.d.replace(/\s+/g, ' ').trim()
    const rawClause = clean.split(/[;:\n]/)[0].trim().replace(/\.$/, '')
    const shortDesc = rawClause.length > 40 ? rawClause.slice(0, 39).trim() + '…' : rawClause
    return {
      code,
      label: `${code} - ${shortDesc}`,
      href: `/tools/hsn-code-finder/sac/${code}`,
    }
  }).filter(Boolean) as { code: string; label: string; href: string }[]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://udyogbook.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Free Tools',
            item: 'https://udyogbook.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'HSN & SAC Code Finder',
            item: 'https://udyogbook.in/tools/hsn-code-finder',
          },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Udyog HSN & SAC Code Finder',
        description:
          'Free online tool to search 21,000+ HSN goods codes and SAC service codes with official CBIC GST rates and Hinglish search.',
        url: 'https://udyogbook.in/tools/hsn-code-finder',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      },
    ],
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 76, minHeight: '100vh', background: '#F8FAFC' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero Section */}
        <section
          style={{
            background: '#0F172A',
            padding: '84px 24px 76px',
            textAlign: 'center',
            color: '#FFFFFF',
          }}
        >
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
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
              FREE GST RATE DIRECTORY
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(30px,4.5vw,48px)',
                fontWeight: 400,
                lineHeight: 1.2,
                margin: '0 0 16px 0',
                color: '#FFFFFF',
              }}
            >
              HSN & SAC Code Finder
            </h1>
            <p
              style={{
                fontSize: 17,
                color: '#E2E8F0',
                lineHeight: 1.7,
                maxWidth: 640,
                margin: '0 auto',
              }}
            >
              Search official CBIC GST rates for 21,000+ goods and services. Search by code, English description, or Hinglish product names.
            </p>
          </div>
        </section>

        {/* Finder Interactive Area */}
        <section style={{ padding: 'clamp(36px,5vw,56px) clamp(16px,4vw,24px)' }}>
          <FinderClient />
        </section>

        {/* Most Searched HSN Codes & Popular SAC Codes (Server-Rendered Plain Links) */}
        <section
          style={{
            background: '#FFFFFF',
            borderTop: '1px solid #D1D5DB',
            borderBottom: '1px solid #D1D5DB',
            padding: 'clamp(44px,6vw,64px) clamp(16px,4vw,24px)',
          }}
        >
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            {/* HSN Heading Links */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', margin: '0 0 6px 0' }}>
                    Most Searched HSN Codes
                  </h2>
                  <p style={{ fontSize: 14, color: '#4B5563', margin: 0 }}>
                    Direct links to popular 4-digit tariff headings with current GST rates and child codes.
                  </p>
                </div>
                <a
                  href="#browse-chapters"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#C2410C',
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: 'none',
                    minHeight: 44,
                    padding: '8px 14px',
                    borderRadius: 8,
                    border: '1px solid #D1D5DB',
                    boxSizing: 'border-box',
                  }}
                >
                  Browse all chapters ↓
                </a>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 10,
                }}
              >
                {mostSearchedHsns.map(item => (
                  <Link
                    key={item.code}
                    href={item.href}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #D1D5DB',
                      borderRadius: 8,
                      padding: '10px 14px',
                      textDecoration: 'none',
                      color: '#0F172A',
                      fontSize: 13,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: 44,
                      boxSizing: 'border-box',
                      overflowWrap: 'anywhere',
                      wordBreak: 'break-word',
                      transition: 'border-color 0.15s ease',
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular SAC Code Links */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', margin: '0 0 6px 0' }}>
                Popular Service Codes (SAC)
              </h2>
              <p style={{ fontSize: 14, color: '#4B5563', margin: '0 0 16px 0' }}>
                Direct links to frequently invoiced professional, IT, consulting, and rental service codes.
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 10,
                }}
              >
                {popularSacs.map(item => (
                  <Link
                    key={item.code}
                    href={item.href}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #D1D5DB',
                      borderRadius: 8,
                      padding: '10px 14px',
                      textDecoration: 'none',
                      color: '#0F172A',
                      fontSize: 13,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: 44,
                      boxSizing: 'border-box',
                      overflowWrap: 'anywhere',
                      wordBreak: 'break-word',
                      transition: 'border-color 0.15s ease',
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Browse All Chapters Section */}
            <div id="browse-chapters" style={{ paddingTop: 16 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', margin: '0 0 6px 0' }}>
                Browse All 98 HSN Chapters
              </h2>
              <p style={{ fontSize: 14, color: '#4B5563', margin: '0 0 16px 0' }}>
                Explore complete 4-digit tariff headings by chapter from Chapter 01 to Chapter 98.
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: 8,
                }}
              >
                {allChapters.map(ch => {
                  const clean = ch.d.replace(/\s+/g, ' ').trim()
                  const rawClause = clean.split(/[;:\n]/)[0].trim().replace(/\.$/, '')
                  const shortDesc = rawClause.length > 28 ? rawClause.slice(0, 27).trim() + '…' : rawClause
                  return (
                    <Link
                      key={ch.c}
                      href={`/tools/hsn-code-finder/chapter/${ch.c}`}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #D1D5DB',
                        borderRadius: 6,
                        padding: '10px 12px',
                        textDecoration: 'none',
                        color: '#0F172A',
                        fontSize: 13,
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        minHeight: 44,
                        boxSizing: 'border-box',
                        overflowWrap: 'anywhere',
                        wordBreak: 'break-word',
                      }}
                    >
                      <span>
                        <strong style={{ color: '#C2410C' }}>Ch. {ch.c}</strong> — {shortDesc}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Educational Content: HSN vs SAC & Turnover Rules */}
        <section
          style={{
            background: '#FFFFFF',
            borderBottom: '1px solid #D1D5DB',
            padding: 'clamp(48px,6vw,72px) clamp(16px,4vw,24px)',
          }}
        >
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 36 }}>
              {/* Block 1: HSN vs SAC */}
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', margin: '0 0 14px 0' }}>
                  HSN vs SAC: What is the Difference?
                </h2>
                <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, marginBottom: 14 }}>
                  <strong style={{ color: '#0F172A' }}>HSN (Harmonized System of Nomenclature):</strong> An internationally accepted 6-to-8 digit classification system used by customs and tax authorities to categorize physical commodities into 98 chapters. Under Indian GST, all manufactured and traded goods must be invoiced with their appropriate HSN code.
                </p>
                <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, margin: 0 }}>
                  <strong style={{ color: '#0F172A' }}>SAC (Services Accounting Code):</strong> A 6-digit classification system created by the Central Board of Indirect Taxes and Customs (CBIC) specifically for services. All service codes begin with <strong style={{ color: '#0F172A' }}>99</strong>, followed by 2 digits for the service group and 2 digits for the specific tariff item.
                </p>
              </div>

              {/* Block 2: Invoice Digit Requirements */}
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', margin: '0 0 14px 0' }}>
                  HSN Digit Requirements by Turnover
                </h2>
                <div style={{ border: '1px solid #D1D5DB', borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%' }}>
                    <table style={{ width: '100%', minWidth: 460, borderCollapse: 'collapse', fontSize: 14 }}>
                      <thead>
                        <tr style={{ background: '#F1F5F9', borderBottom: '1px solid #D1D5DB' }}>
                          <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700, color: '#0F172A' }}>Annual Turnover</th>
                          <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700, color: '#0F172A' }}>Mandatory Digits</th>
                          <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700, color: '#0F172A' }}>Applicability</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: '1px solid #D1D5DB' }}>
                          <td style={{ padding: '12px 14px', color: '#0F172A', fontWeight: 600 }}>Up to ₹5 Crore</td>
                          <td style={{ padding: '12px 14px', color: '#C2410C', fontWeight: 800 }}>4 Digits</td>
                          <td style={{ padding: '12px 14px', color: '#374151' }}>Mandatory on B2B invoices; optional on B2C</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #D1D5DB' }}>
                          <td style={{ padding: '12px 14px', color: '#0F172A', fontWeight: 600 }}>Above ₹5 Crore</td>
                          <td style={{ padding: '12px 14px', color: '#C2410C', fontWeight: 800 }}>6 Digits</td>
                          <td style={{ padding: '12px 14px', color: '#374151' }}>Mandatory on all B2B and B2C tax invoices</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '12px 14px', color: '#0F172A', fontWeight: 600 }}>Import / Export</td>
                          <td style={{ padding: '12px 14px', color: '#C2410C', fontWeight: 800 }}>8 Digits</td>
                          <td style={{ padding: '12px 14px', color: '#374151' }}>Mandatory regardless of annual turnover</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section style={{ padding: 'clamp(48px,6vw,72px) clamp(16px,4vw,24px)', background: '#F8FAFC' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', textAlign: 'center', margin: '0 0 32px 0' }}>
              Frequently Asked Questions on HSN & GST Rates
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 14,
                    border: '1px solid #D1D5DB',
                    padding: '22px 24px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', margin: '0 0 8px 0' }}>
                    {faq.q}
                  </h3>
                  <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Signup CTA Block */}
        <section
          style={{
            background: '#0F172A',
            padding: 'clamp(56px,7vw,80px) clamp(16px,4vw,24px)',
            textAlign: 'center',
            color: '#FFFFFF',
          }}
        >
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
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
                marginBottom: 14,
                display: 'inline-block',
              }}
            >
              BILLING AUTOMATION WITH UDYOG
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px,4vw,38px)',
                fontWeight: 400,
                color: '#FFFFFF',
                margin: '0 0 16px 0',
              }}
            >
              Create GST invoices with the correct HSN and tax automatically in Udyog
            </h2>
            <p style={{ fontSize: 16, color: '#E2E8F0', lineHeight: 1.7, marginBottom: 28 }}>
              No more manual rate lookups. Udyog automatically maps items to the right HSN, calculates CGST, SGST, IGST, and generates compliant e-invoices in seconds.
            </p>
            <a
              href="https://app.udyogbook.in/sign-in?utm_source=hsn_finder"
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
              Start Free Trial in Udyog →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
