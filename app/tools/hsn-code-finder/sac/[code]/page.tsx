import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import SignupCta, { buildAppSignupUrl } from '../../../../components/SignupCta'
import CopyCodeButton from '../../CopyCodeButton'
import {
  getAll6DigitSACCodes,
  getAllSACGroups,
  getSACDetails,
  getSACGroupDetails,
  getSACPageSummary,
  getSACGroupPageSummary,
  sentenceCase,
  RATE_SOURCE_BANNER,
} from '../../../../../lib/hsn-data'
import { selfCanonical } from '../../../../../lib/seo'
import { Info, ArrowLeft, ArrowRight, ExternalLink, Briefcase, Layers } from 'lucide-react'

export async function generateStaticParams() {
  const codes = getAll6DigitSACCodes()
  const groups = getAllSACGroups()
  return [
    ...groups.map(g => ({ code: g.c })),
    ...codes.map(s => ({ code: s.c })),
  ]
}

export async function generateMetadata({
  params,
}: {
  params: { code: string }
}): Promise<Metadata> {
  // 4-digit SAC Service Group
  if (params.code.length === 4) {
    const details = getSACGroupDetails(params.code)
    if (!details) return {}
    const summary = getSACGroupPageSummary(details.group, details.codes.length)
    return {
      title: summary.metaTitle,
      description: summary.metaDescription,
      keywords: `sac group ${params.code}, gst sac ${params.code}, service group ${params.code}`,
      alternates: selfCanonical(`/tools/hsn-code-finder/sac/${params.code}`),
      openGraph: {
        title: summary.metaTitle,
        description: summary.metaDescription,
        url: `https://udyogbook.in/tools/hsn-code-finder/sac/${params.code}`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: summary.metaTitle,
        description: summary.metaDescription,
      },
    }
  }

  // 6-digit SAC Code
  const details = getSACDetails(params.code)
  if (!details) return {}

  const { sac, heading, headingCode, siblings } = details
  const summary = getSACPageSummary(sac, heading, headingCode, siblings)

  return {
    title: summary.metaTitle,
    description: summary.metaDescription,
    keywords: `sac code ${sac.c}, gst sac ${sac.c}, service accounting code ${sac.c}`,
    alternates: selfCanonical(`/tools/hsn-code-finder/sac/${sac.c}`),
    openGraph: {
      title: summary.metaTitle,
      description: summary.metaDescription,
      url: `https://udyogbook.in/tools/hsn-code-finder/sac/${sac.c}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: summary.metaTitle,
      description: summary.metaDescription,
    },
  }
}

export default function SACDetailPage({
  params,
}: {
  params: { code: string }
}) {
  // If 4-digit code: Render SAC Service Group Page
  if (params.code.length === 4) {
    const groupDetails = getSACGroupDetails(params.code)
    if (!groupDetails) notFound()

    const { group, codes } = groupDetails
    const groupName = sentenceCase(group.d)
    const summary = getSACGroupPageSummary(group, codes.length)

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
            {
              '@type': 'ListItem',
              position: 4,
              name: 'Chapter 99 (Services)',
              item: 'https://udyogbook.in/tools/hsn-code-finder/chapter/99',
            },
            {
              '@type': 'ListItem',
              position: 5,
              name: `Group ${group.c}`,
              item: `https://udyogbook.in/tools/hsn-code-finder/sac/${group.c}`,
            },
          ],
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
          <div style={{ background: '#0F172A', color: '#FFFFFF', padding: '36px clamp(16px,4vw,24px) 44px' }}>
            <div style={{ maxWidth: 1040, margin: '0 auto' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  color: '#E2E8F0',
                  marginBottom: 20,
                  flexWrap: 'wrap',
                }}
              >
                <Link prefetch={false} href="/tools" style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 500 }}>
                  Free Tools
                </Link>
                <span>/</span>
                <Link prefetch={false}
                  href="/tools/hsn-code-finder"
                  style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 500 }}
                >
                  HSN & SAC Code Finder
                </Link>
                <span>/</span>
                <Link prefetch={false}
                  href="/tools/hsn-code-finder/chapter/99"
                  style={{ color: '#FED7AA', textDecoration: 'none', fontWeight: 600 }}
                >
                  Chapter 99 (Services)
                </Link>
                <span>/</span>
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Group {group.c}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: '#EA580C',
                    color: '#FFFFFF',
                    fontFamily: 'monospace',
                    fontSize: 14,
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 6,
                    letterSpacing: '0.05em',
                  }}
                >
                  GROUP {group.c}
                </span>
                <span style={{ color: '#94A3B8', fontSize: 14 }}>
                  Chapter 99 Service Group
                </span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px,3.8vw,38px)',
                  fontWeight: 400,
                  lineHeight: 1.25,
                  margin: '0 0 16px 0',
                  color: '#FFFFFF',
                }}
              >
                SAC Group {group.c}: {groupName}
              </h1>

              <p style={{ fontSize: 16, color: '#E2E8F0', lineHeight: 1.7, maxWidth: 780, margin: 0 }}>
                {summary.introParagraph}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ maxWidth: 1040, margin: '0 auto', padding: '36px clamp(16px,4vw,24px) 64px' }}>
            {/* Back to Chapter 99 Hub */}
            <div style={{ marginBottom: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link prefetch={false}
                href="/tools/hsn-code-finder/chapter/99"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: '#0F172A',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  background: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: 8,
                  padding: '8px 14px',
                }}
              >
                <ArrowLeft size={16} /> Back to Chapter 99 (Services)
              </Link>
              <Link prefetch={false}
                href="/tools/hsn-code-finder"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: '#4B5563',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  background: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: 8,
                  padding: '8px 14px',
                }}
              >
                HSN & SAC Finder Home
              </Link>
            </div>

            {/* Group Summary Box */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #D1D5DB',
                borderRadius: 12,
                padding: 24,
                marginBottom: 32,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 20,
              }}
            >
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>
                  Service Group
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>
                  Group {group.c}
                </div>
                <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
                  {groupName}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>
                  Parent Chapter
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>
                  Chapter 99
                </div>
                <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
                  All Services Classification
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>
                  Total SAC Codes
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>
                  {codes.length} Codes
                </div>
                <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
                  6-digit tariff entries
                </div>
              </div>
            </div>

            {/* Codes List */}
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', margin: '0 0 8px 0' }}>
                SAC Codes in Group {group.c}
              </h2>
              <p style={{ fontSize: 14, color: '#4B5563', margin: '0 0 20px 0' }}>
                All {codes.length} six-digit Services Accounting Codes belonging to service group {group.c}:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {codes.map(c => {
                  const cleanDesc = c.d.replace(/\s+/g, ' ').trim()
                  return (
                    <Link prefetch={false}
                      key={c.c}
                      href={`/tools/hsn-code-finder/sac/${c.c}`}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #D1D5DB',
                        borderRadius: 10,
                        padding: '14px 18px',
                        textDecoration: 'none',
                        color: '#0F172A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 16,
                        boxSizing: 'border-box',
                        transition: 'border-color 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            color: '#0F172A',
                            background: '#F1F5F9',
                            padding: '6px 12px',
                            borderRadius: 6,
                            fontSize: 14,
                            flexShrink: 0,
                          }}
                        >
                          {c.c}
                        </span>
                        <span
                          style={{
                            fontSize: 14,
                            color: '#334155',
                            fontWeight: 500,
                            lineHeight: 1.5,
                            overflowWrap: 'anywhere',
                          }}
                        >
                          {cleanDesc}
                        </span>
                      </div>
                      <ArrowRight size={18} color="#EA580C" style={{ flexShrink: 0 }} />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* CTA */}
            <SignupCta
              variant="inline"
              medium="finder"
              campaign={group.c}
              content="bottom"
            />
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // If 6-digit code: Render SAC Code Detail Page
  const details = getSACDetails(params.code)
  if (!details) notFound()

  const { sac, headingCode, heading, siblings } = details
  const cleanDesc = sac.d.replace(/\s+/g, ' ').trim()
  const fullChain = [...sac.p, sac.d].filter(Boolean).join(' > ')
  const summary = getSACPageSummary(sac, heading, headingCode, siblings)

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
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Chapter 99 (Services)',
            item: 'https://udyogbook.in/tools/hsn-code-finder/chapter/99',
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: `Group ${headingCode}`,
            item: `https://udyogbook.in/tools/hsn-code-finder/sac/${headingCode}`,
          },
          {
            '@type': 'ListItem',
            position: 6,
            name: `SAC ${sac.c} (${summary.breadcrumbName})`,
            item: `https://udyogbook.in/tools/hsn-code-finder/sac/${sac.c}`,
          },
        ],
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
        <div style={{ background: '#0F172A', color: '#FFFFFF', padding: '36px clamp(16px,4vw,24px) 44px' }}>
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#E2E8F0', marginBottom: 20, flexWrap: 'wrap' }}>
              <Link prefetch={false} href="/tools" style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 500 }}>
                Free Tools
              </Link>
              <span>/</span>
              <Link prefetch={false} href="/tools/hsn-code-finder" style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 500 }}>
                HSN & SAC Code Finder
              </Link>
              <span>/</span>
              <Link prefetch={false} href="/tools/hsn-code-finder/chapter/99" style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 500 }}>
                Chapter 99 (Services)
              </Link>
              <span>/</span>
              <Link prefetch={false} href={`/tools/hsn-code-finder/sac/${headingCode}`} style={{ color: '#FED7AA', textDecoration: 'none', fontWeight: 600 }}>
                Group {headingCode}
              </Link>
              <span>/</span>
              <span style={{ color: '#FFFFFF', fontWeight: 700 }}>SAC {sac.c}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <span
                style={{
                  background: '#0F172A',
                  color: '#FFFFFF',
                  fontFamily: 'monospace',
                  fontSize: 18,
                  fontWeight: 800,
                  padding: '6px 16px',
                  borderRadius: 6,
                  border: '1.5px solid #334155',
                  letterSpacing: '0.05em',
                  minHeight: 44,
                  display: 'inline-flex',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                }}
              >
                SAC {sac.c}
              </span>
              <CopyCodeButton code={sac.c} />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  background: '#1E293B',
                  padding: '5px 12px',
                  borderRadius: 6,
                  border: '1px solid #334155',
                  minHeight: 36,
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                6-Digit Service Code
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px,3.8vw,36px)',
                fontWeight: 400,
                lineHeight: 1.25,
                margin: '0 0 16px 0',
                color: '#FFFFFF',
              }}
            >
              {summary.h1}
            </h1>

            <p style={{ fontSize: 16, color: '#E2E8F0', lineHeight: 1.7, maxWidth: 780, margin: 0 }}>
              {summary.introParagraph}
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '36px clamp(16px,4vw,24px) 64px' }}>
          {/* Rate Notice Banner */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #D1D5DB',
              borderRadius: 12,
              padding: 20,
              marginBottom: 32,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div
                style={{
                  background: '#FFF7ED',
                  border: '1px solid #FDBA74',
                  borderRadius: 8,
                  padding: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Info size={20} color="#C2410C" />
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', margin: '0 0 6px 0' }}>
                  GST Rate on Services — Chapter 99
                </h2>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, margin: '0 0 10px 0' }}>
                  GST rates on services depend on specific conditions, notifications, and whether input tax credit (ITC) is claimed. Most commercial services attract <strong style={{ color: '#0F172A' }}>18% GST</strong> (CGST 9% + SGST 9% or IGST 18%), with certain essential, transport, and hospitality services at 5% or 12%, and specific healthcare and educational services exempt.
                </p>
                <div style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.5 }}>
                  {RATE_SOURCE_BANNER}
                </div>
              </div>
            </div>
          </div>

          {/* Code Information Card */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #D1D5DB',
              borderRadius: 12,
              padding: 24,
              marginBottom: 32,
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', margin: '0 0 16px 0' }}>
              SAC Classification Details
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              <div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>SAC Code</span>
                <p style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: '4px 0 0', fontFamily: 'monospace' }}>
                  {sac.c}
                </p>
              </div>
              <div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Service Group</span>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#0F172A', margin: '4px 0 0' }}>
                  <Link prefetch={false} href={`/tools/hsn-code-finder/sac/${headingCode}`} style={{ color: '#C2410C', textDecoration: 'none' }}>
                    Group {headingCode}
                  </Link>
                  {heading ? ` (${sentenceCase(heading.d)})` : ''}
                </p>
              </div>
              <div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Chapter</span>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#0F172A', margin: '4px 0 0' }}>
                  <Link prefetch={false} href="/tools/hsn-code-finder/chapter/99" style={{ color: '#C2410C', textDecoration: 'none' }}>
                    Chapter 99 (Services)
                  </Link>
                </p>
              </div>
            </div>

            {fullChain && (
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Classification Hierarchy</span>
                <p style={{ fontSize: 14, color: '#374151', margin: '6px 0 0', lineHeight: 1.6 }}>
                  {fullChain}
                </p>
              </div>
            )}
          </div>

          {/* Sibling Codes in the Same Service Group */}
          {siblings.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Other Services in Group {headingCode} ({siblings.length})
                </h2>
                <Link prefetch={false}
                  href={`/tools/hsn-code-finder/sac/${headingCode}`}
                  style={{
                    color: '#C2410C',
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  View all in Group {headingCode} →
                </Link>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 10,
                }}
              >
                {siblings.map(sib => (
                  <Link prefetch={false}
                    key={sib.c}
                    href={`/tools/hsn-code-finder/sac/${sib.c}`}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #D1D5DB',
                      borderRadius: 8,
                      padding: '12px 14px',
                      textDecoration: 'none',
                      color: '#0F172A',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      minHeight: 44,
                      boxSizing: 'border-box',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: 14, color: '#C2410C' }}>
                        SAC {sib.c}
                      </span>
                      <ArrowRight size={15} color="#0F172A" />
                    </div>
                    <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {sib.d}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Return & CTA */}
          <div style={{ marginBottom: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link prefetch={false}
              href={`/tools/hsn-code-finder/sac/${headingCode}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: '#C2410C',
                fontSize: 15,
                fontWeight: 700,
                textDecoration: 'none',
                minHeight: 44,
                padding: '8px 14px',
                borderRadius: 8,
                border: '1px solid #D1D5DB',
                boxSizing: 'border-box',
              }}
            >
              <ArrowLeft size={16} /> Group {headingCode} Hub
            </Link>
            <Link prefetch={false}
              href="/tools/hsn-code-finder/chapter/99"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: '#0F172A',
                fontSize: 15,
                fontWeight: 700,
                textDecoration: 'none',
                minHeight: 44,
                padding: '8px 14px',
                borderRadius: 8,
                border: '1px solid #D1D5DB',
                boxSizing: 'border-box',
              }}
            >
              Chapter 99 (Services)
            </Link>
            <Link prefetch={false}
              href="/tools/hsn-code-finder"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: '#4B5563',
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
                minHeight: 44,
                padding: '8px 14px',
                borderRadius: 8,
                border: '1px solid #D1D5DB',
                boxSizing: 'border-box',
              }}
            >
              HSN & SAC Finder
            </Link>
          </div>

          <div
            style={{
              background: '#0F172A',
              borderRadius: 16,
              padding: 'clamp(36px,5vw,56px) 24px',
              textAlign: 'center',
              color: '#FFFFFF',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,30px)', fontWeight: 400, color: '#FFFFFF', margin: '0 0 12px 0' }}>
              Create GST invoices with SAC {sac.c} automatically in Udyog
            </h3>
            <p style={{ fontSize: 16, color: '#E2E8F0', maxWidth: 580, margin: '0 auto 24px', lineHeight: 1.6 }}>
              Issue compliant tax invoices for professional, consulting, and contractor services with automated SAC rate mapping.
            </p>
            <a
              href={buildAppSignupUrl('finder', sac.c, 'bottom')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#C2410C',
                color: '#FFFFFF',
                minHeight: 44,
                padding: '12px 32px',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(194, 65, 12, 0.3)',
                boxSizing: 'border-box',
              }}
            >
              Start Free Trial in Udyog →
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <SignupCta
        variant="bar"
        medium="finder"
        campaign={sac.c}
        content="bar"
      />
    </>
  )
}
