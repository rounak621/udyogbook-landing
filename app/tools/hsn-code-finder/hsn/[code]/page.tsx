import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import CopyCodeButton from '../../CopyCodeButton'
import {
  getAllHSNHeadings,
  getHSNHeadingDetails,
  getHSNPageSummary,
  sentenceCase,
  formatRateDisplay,
  RATE_SOURCE_BANNER,
  RESIDUAL_RATE_TITLE,
  RESIDUAL_RATE_NOTE,
  TIER2_COLLAPSED_TITLE,
  TIER2_COLLAPSED_LINE,
} from '../../../../../lib/hsn-data'
import { Info, ArrowLeft, ArrowRight, Tag } from 'lucide-react'

export async function generateStaticParams() {
  const headings = getAllHSNHeadings()
  return headings.map(h => ({ code: h.c }))
}

export async function generateMetadata({
  params,
}: {
  params: { code: string }
}): Promise<Metadata> {
  const details = getHSNHeadingDetails(params.code)
  if (!details) return {}

  const { heading, rateResult, children } = details
  const summary = getHSNPageSummary(heading, rateResult, children)

  return {
    title: summary.metaTitle,
    description: summary.metaDescription,
    keywords: `hsn code ${heading.c}, gst rate ${heading.c}, hsn ${heading.c} gst rate`,
    alternates: {
      canonical: `https://udyogbook.in/tools/hsn-code-finder/hsn/${heading.c}`,
    },
    openGraph: {
      title: summary.metaTitle,
      description: summary.metaDescription,
      url: `https://udyogbook.in/tools/hsn-code-finder/hsn/${heading.c}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: summary.metaTitle,
      description: summary.metaDescription,
    },
  }
}

export default function HSNHeadingDetailPage({
  params,
}: {
  params: { code: string }
}) {
  const details = getHSNHeadingDetails(params.code)
  if (!details) notFound()

  const { heading, chapterCode, chapter, children, siblings, rateResult } = details
  const cleanHeadingDesc = heading.d.replace(/\s+/g, ' ').trim()
  const summary = getHSNPageSummary(heading, rateResult, children)

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
            name: 'HSN Code Finder',
            item: 'https://udyogbook.in/tools/hsn-code-finder',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: `Chapter ${chapterCode}`,
            item: `https://udyogbook.in/tools/hsn-code-finder/chapter/${chapterCode}`,
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: `HSN ${heading.c} (${summary.breadcrumbName})`,
            item: `https://udyogbook.in/tools/hsn-code-finder/hsn/${heading.c}`,
          },
        ],
      },
    ],
  }

  const getRatePillStyle = (r: { gst: number; cess: boolean }) => {
    if (r.gst === 0) {
      return { background: '#15803D', color: '#FFFFFF' }
    }
    if (r.gst === 5) {
      return { background: '#0F172A', color: '#FFFFFF' }
    }
    if (r.gst === 18) {
      return { background: '#C2410C', color: '#FFFFFF' }
    }
    return { background: '#991B1B', color: '#FFFFFF' }
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 76, minHeight: '100vh', background: '#F8FAFC' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Top Breadcrumb & Hero */}
        <div style={{ background: '#0F172A', color: '#FFFFFF', padding: '36px clamp(16px,4vw,24px) 44px' }}>
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#E2E8F0', marginBottom: 20, flexWrap: 'wrap' }}>
              <Link href="/tools" style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 500 }}>
                Free Tools
              </Link>
              <span>/</span>
              <Link href="/tools/hsn-code-finder" style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 500 }}>
                HSN Code Finder
              </Link>
              <span>/</span>
              <Link href={`/tools/hsn-code-finder/chapter/${chapterCode}`} style={{ color: '#FED7AA', textDecoration: 'none', fontWeight: 600 }}>
                Chapter {chapterCode}
              </Link>
              <span>/</span>
              <span style={{ color: '#FFFFFF', fontWeight: 700 }}>HSN {heading.c}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <span
                style={{
                  background: '#C2410C',
                  color: '#FFFFFF',
                  fontFamily: 'monospace',
                  fontSize: 18,
                  fontWeight: 800,
                  padding: '6px 16px',
                  borderRadius: 6,
                  letterSpacing: '0.05em',
                  minHeight: 44,
                  display: 'inline-flex',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                }}
              >
                HSN {heading.c}
              </span>
              <CopyCodeButton code={heading.c} />
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
                4-Digit Heading
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px,3.8vw,38px)',
                fontWeight: 400,
                lineHeight: 1.25,
                margin: '0 0 14px 0',
                color: '#FFFFFF',
                overflowWrap: 'anywhere',
                wordBreak: 'break-word',
              }}
            >
              {summary.h1}
            </h1>

            {/* Generated Plain-Language Intro Paragraph */}
            <p
              style={{
                fontSize: 16,
                color: '#E2E8F0',
                lineHeight: 1.7,
                margin: '0 0 16px 0',
                maxWidth: 880,
                overflowWrap: 'anywhere',
                wordBreak: 'break-word',
              }}
            >
              {summary.introParagraph}
            </p>

            {chapter && (
              <p style={{ fontSize: 14, color: '#CBD5E1', margin: 0, lineHeight: 1.6, overflowWrap: 'anywhere' }}>
                <strong style={{ color: '#FFFFFF' }}>
                  <Link
                    href={`/tools/hsn-code-finder/chapter/${chapterCode}`}
                    style={{ color: '#FED7AA', textDecoration: 'underline' }}
                  >
                    Chapter {chapterCode}
                  </Link>
                  :
                </strong>{' '}
                {sentenceCase(chapter.d)}
              </p>
            )}
          </div>
        </div>

        {/* Content Container */}
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '36px clamp(16px,4vw,24px)' }}>
          {/* Rate Source Banner */}
          <div
            style={{
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              borderRadius: 12,
              padding: '14px 18px',
              marginBottom: 28,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              fontSize: 14,
              color: '#0F172A',
              lineHeight: 1.6,
              overflowWrap: 'anywhere',
              wordBreak: 'break-word',
            }}
          >
            <Info size={20} style={{ flexShrink: 0, marginTop: 2, color: '#EA580C' }} />
            <div>{RATE_SOURCE_BANNER}</div>
          </div>

          {/* Section 1: Official GST Rates */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #D1D5DB',
              padding: '28px 20px',
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
              marginBottom: 32,
              overflowWrap: 'anywhere',
              wordBreak: 'break-word',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <Tag size={22} color="#C2410C" />
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                GST Rates for Heading {heading.c}
              </h2>
            </div>

            {rateResult.mainRates.length > 0 ? (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {rateResult.mainRates.map((r, idx) => {
                    const display = formatRateDisplay(r)
                    return (
                      <div
                        key={idx}
                        style={{
                          background: '#F8FAFC',
                          borderRadius: 12,
                          border: '1px solid #D1D5DB',
                          padding: '18px 20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 8,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                          <span
                            style={{
                              ...getRatePillStyle(r),
                              fontWeight: 800,
                              fontSize: 14,
                              padding: '6px 14px',
                              borderRadius: 6,
                              lineHeight: 1.3,
                            }}
                          >
                            {display.headline}
                          </span>
                          <span style={{ fontSize: 13, color: '#0F172A', fontWeight: 700 }}>
                            {display.split}
                          </span>
                          {r.isSubCode && (
                            <span
                              style={{
                                background: '#B45309',
                                color: '#FFFFFF',
                                fontSize: 11,
                                fontWeight: 700,
                                padding: '3px 8px',
                                borderRadius: 4,
                              }}
                            >
                              Applies to some sub-codes
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: 14, color: '#1F2937', lineHeight: 1.6, margin: 0 }}>
                          {r.d}
                        </p>
                        <div style={{ fontSize: 13, color: '#4B5563', marginTop: 2 }}>
                          Reference: Schedule {r.sch}, S. No. {r.sn} {r.spec ? `(Spec: ${r.spec})` : ''}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* If Tier 2 was shown as main because Tier 1 was empty (Rule 3) */}
                {rateResult.isTier2Main && (
                  <div
                    style={{
                      background: '#FFFFFF',
                      borderRadius: 10,
                      border: '1px solid #D1D5DB',
                      padding: '14px 18px',
                      marginTop: 18,
                      fontSize: 14,
                      color: '#1F2937',
                      lineHeight: 1.6,
                    }}
                  >
                    {rateResult.residualNote || 'If none of these descriptions fit your goods, the residual rate is 18% (Schedule II, S. No. 639).'}
                  </div>
                )}

                {/* If Tier 1 exists and Tier 2 has rows: show collapsed section (Rule 2) */}
                {rateResult.hasTier1 && rateResult.hasTier2 && rateResult.tier2.length > 0 && (
                  <details
                    style={{
                      marginTop: 24,
                      background: '#FFFFFF',
                      border: '1px solid #D1D5DB',
                      borderRadius: 12,
                      padding: '12px 18px',
                    }}
                  >
                    <summary
                      style={{
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: 15,
                        color: '#0F172A',
                        userSelect: 'none',
                        minHeight: 44,
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      {TIER2_COLLAPSED_TITLE} ({rateResult.tier2.length})
                    </summary>
                    <p style={{ fontSize: 13, color: '#374151', margin: '4px 0 16px 0', lineHeight: 1.5 }}>
                      {TIER2_COLLAPSED_LINE}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {rateResult.tier2.map((r, idx) => {
                        const display = formatRateDisplay(r)
                        return (
                          <div
                            key={idx}
                            style={{
                              background: '#F8FAFC',
                              borderRadius: 10,
                              border: '1px solid #D1D5DB',
                              padding: '14px 16px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 6,
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                              <span
                                style={{
                                  ...getRatePillStyle(r),
                                  fontWeight: 800,
                                  fontSize: 13,
                                  padding: '4px 10px',
                                  borderRadius: 4,
                                }}
                              >
                                {display.headline}
                              </span>
                              <span style={{ fontSize: 12, color: '#0F172A', fontWeight: 600 }}>
                                {display.split}
                              </span>
                            </div>
                            <p style={{ fontSize: 14, color: '#1F2937', lineHeight: 1.5, margin: 0 }}>
                              {r.d}
                            </p>
                            <div style={{ fontSize: 12, color: '#4B5563', marginTop: 2 }}>
                              Reference: Schedule {r.sch}, S. No. {r.sn} {r.spec ? `(Spec: ${r.spec})` : ''}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </details>
                )}
              </div>
            ) : (
              <div
                style={{
                  background: '#F8FAFC',
                  borderRadius: 12,
                  border: '1px solid #D1D5DB',
                  padding: '20px',
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  {RESIDUAL_RATE_TITLE}
                </div>
                <p style={{ fontSize: 14, color: '#1F2937', margin: 0, lineHeight: 1.6 }}>
                  {RESIDUAL_RATE_NOTE}
                </p>
              </div>
            )}
          </div>

          {/* Section 2: Child Tariff Codes (6-digit & 8-digit) */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #D1D5DB',
              padding: '28px 20px',
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
              marginBottom: 32,
              overflowWrap: 'anywhere',
              wordBreak: 'break-word',
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', margin: '0 0 6px 0' }}>
              Sub-Headings & Tariff Items Under {heading.c}
            </h2>
            <p style={{ fontSize: 14, color: '#374151', margin: '0 0 20px 0' }}>
              Showing {children.length} sub-classification code{children.length === 1 ? '' : 's'} with complete hierarchy descriptions.
            </p>

            {children.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {children.map(ch => {
                  const fullChain = [...ch.p, ch.d].filter(Boolean).join(' > ')
                  const isLeaf8 = ch.c.length === 8
                  const is6 = ch.c.length === 6

                  return (
                    <div
                      key={ch.c}
                      style={{
                        background: '#F8FAFC',
                        borderRadius: 10,
                        border: '1px solid #D1D5DB',
                        padding: '14px 18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                          <span
                            style={{
                              fontFamily: 'monospace',
                              fontWeight: 700,
                              fontSize: 15,
                              color: '#0F172A',
                              background: '#FFFFFF',
                              border: '1px solid #CBD5E1',
                              padding: '6px 12px',
                              borderRadius: 6,
                              minHeight: 44,
                              display: 'inline-flex',
                              alignItems: 'center',
                              boxSizing: 'border-box',
                            }}
                          >
                            {ch.c}
                          </span>
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: '#FFFFFF',
                              background: isLeaf8 ? '#15803D' : is6 ? '#0F172A' : '#374151',
                              padding: '4px 10px',
                              borderRadius: 4,
                            }}
                          >
                            {ch.c.length}-Digit {isLeaf8 ? 'Tariff Item' : is6 ? 'Sub-heading' : 'Group'}
                          </span>
                        </div>
                        <CopyCodeButton code={ch.c} />
                      </div>
                      <p style={{ fontSize: 14, color: '#1F2937', lineHeight: 1.6, margin: 0 }}>
                        <strong style={{ color: '#0F172A' }}>Chain:</strong> {fullChain}
                      </p>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p style={{ fontSize: 14, color: '#374151', margin: 0 }}>
                No further sub-headings are defined under this 4-digit heading. Heading {heading.c} ({cleanHeadingDesc}) is the primary tariff reference.
              </p>
            )}
          </div>

          {/* Section 3: Sibling Headings in Chapter */}
          {siblings.length > 0 && (
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                border: '1px solid #D1D5DB',
                padding: '28px 20px',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
                marginBottom: 32,
              }}
            >
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', margin: '0 0 16px 0' }}>
                Other Headings in Chapter {chapterCode}
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 12,
                }}
              >
                {siblings.map(sib => (
                  <Link
                    key={sib.c}
                    href={`/tools/hsn-code-finder/hsn/${sib.c}`}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #D1D5DB',
                      borderRadius: 10,
                      padding: '12px 14px',
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      minHeight: 44,
                      boxSizing: 'border-box',
                      overflowWrap: 'anywhere',
                      wordBreak: 'break-word',
                      transition: 'border-color 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#C2410C', fontSize: 15 }}>
                        HSN {sib.c}
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

          {/* Section 4: Return Link & Signup CTA */}
          <div style={{ marginBottom: 32 }}>
            <Link
              href="/tools/hsn-code-finder"
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
              <ArrowLeft size={16} /> Search all 21,000+ HSN & SAC codes
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
              Create GST invoices with HSN {heading.c} automatically in Udyog
            </h3>
            <p style={{ fontSize: 16, color: '#E2E8F0', maxWidth: 580, margin: '0 auto 24px', lineHeight: 1.6 }}>
              Udyog automatically maps product items to the right HSN codes and applies current tax rates with zero manual errors.
            </p>
            <a
              href="https://app.udyogbook.in/sign-in?utm_source=hsn_finder"
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
    </>
  )
}
