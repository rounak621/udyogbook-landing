import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import SignupCta from '../../../../components/SignupCta'
import CopyCodeButton from '../../CopyCodeButton'
import {
  getAllHSNChapters,
  getChapterDetails,
  getChapterPageSummary,
  formatRateDisplay,
  RATE_SOURCE_BANNER,
  RESIDUAL_RATE_TITLE,
  RESIDUAL_RATE_NOTE,
} from '../../../../../lib/hsn-data'
import { Info, ArrowLeft, ArrowRight, BookOpen, Layers } from 'lucide-react'

export async function generateStaticParams() {
  const chapters = getAllHSNChapters()
  return chapters.map(ch => ({ ch: ch.c }))
}

export async function generateMetadata({
  params,
}: {
  params: { ch: string }
}): Promise<Metadata> {
  const details = getChapterDetails(params.ch)
  if (!details) return {}

  const summary = getChapterPageSummary(details.chapter, details.headings.length)

  return {
    title: summary.metaTitle,
    description: summary.metaDescription,
    keywords: `hsn chapter ${details.chapter.c}, hsn codes chapter ${details.chapter.c}, gst rates chapter ${details.chapter.c}`,
    alternates: {
      canonical: `https://udyogbook.in/tools/hsn-code-finder/chapter/${details.chapter.c}`,
    },
    openGraph: {
      title: summary.metaTitle,
      description: summary.metaDescription,
      url: `https://udyogbook.in/tools/hsn-code-finder/chapter/${details.chapter.c}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: summary.metaTitle,
      description: summary.metaDescription,
    },
  }
}

export default function ChapterDetailPage({
  params,
}: {
  params: { ch: string }
}) {
  const details = getChapterDetails(params.ch)
  if (!details) notFound()

  const { chapter, chapterCode, headings } = details
  const cleanChapterDesc = chapter.d.replace(/\s+/g, ' ').trim()
  const summary = getChapterPageSummary(chapter, headings.length)

  const allChapters = getAllHSNChapters()
  const currentIndex = allChapters.findIndex(c => c.c === chapterCode)
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null

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
            name: `Chapter ${chapterCode} (${summary.breadcrumbName})`,
            item: `https://udyogbook.in/tools/hsn-code-finder/chapter/${chapterCode}`,
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
              <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Chapter {chapterCode}</span>
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
                Chapter {chapterCode}
              </span>
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
                {headings.length} {headings.length === 1 ? 'Tariff Heading' : 'Tariff Headings'}
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
                margin: '0 0 20px 0',
                maxWidth: 880,
                overflowWrap: 'anywhere',
                wordBreak: 'break-word',
              }}
            >
              {summary.introParagraph}
            </p>

            {/* Prev / Next chapter navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', paddingTop: 8 }}>
              {prevChapter && (
                <Link
                  href={`/tools/hsn-code-finder/chapter/${prevChapter.c}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 14px',
                    borderRadius: 6,
                    border: '1px solid #334155',
                    background: '#1E293B',
                    color: '#E2E8F0',
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: 'none',
                    minHeight: 44,
                    boxSizing: 'border-box',
                  }}
                >
                  <ArrowLeft size={16} /> Prev: Chapter {prevChapter.c}
                </Link>
              )}
              {nextChapter && (
                <Link
                  href={`/tools/hsn-code-finder/chapter/${nextChapter.c}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 14px',
                    borderRadius: 6,
                    border: '1px solid #334155',
                    background: '#1E293B',
                    color: '#E2E8F0',
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: 'none',
                    minHeight: 44,
                    boxSizing: 'border-box',
                  }}
                >
                  Next: Chapter {nextChapter.c} <ArrowRight size={16} />
                </Link>
              )}
              <Link
                href="/tools/hsn-code-finder"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 14px',
                  borderRadius: 6,
                  border: '1px solid #334155',
                  background: '#1E293B',
                  color: '#FED7AA',
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  minHeight: 44,
                  boxSizing: 'border-box',
                }}
              >
                <Layers size={16} /> All 98 Chapters
              </Link>
            </div>
          </div>
        </div>

        {/* Main Body */}
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '36px clamp(16px,4vw,24px) 64px' }}>
          {/* CBIC Notification Banner */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #D1D5DB',
              borderLeft: '4px solid #C2410C',
              borderRadius: 8,
              padding: '16px 20px',
              marginBottom: 28,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
            }}
          >
            <Info size={20} color="#C2410C" style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.6 }}>
              <strong style={{ color: '#0F172A', display: 'block', marginBottom: 2 }}>
                Official CBIC Rates (Notification 09/2025 &amp; 10/2025)
              </strong>
              {RATE_SOURCE_BANNER}. Main active GST slabs across goods are 0%, 5%, 18% and 40%.
            </div>
          </div>

          <SignupCta
            variant="inline"
            medium="finder"
            campaign={`chapter-${chapterCode}`}
            content="top"
          />

          {/* Headings List Header */}
          <div style={{ marginBottom: 20 }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 22,
                fontWeight: 600,
                color: '#0F172A',
                margin: '0 0 6px 0',
              }}
            >
              4-Digit Tariff Headings in Chapter {chapterCode}
            </h2>
            <p style={{ fontSize: 14, color: '#475569', margin: 0 }}>
              Select any heading below to view its complete 6-digit and 8-digit sub-codes, item-level rate specifications, and CBIC notification details.
            </p>
          </div>

          {/* Headings Cards List */}
          {headings.length === 0 ? (
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #D1D5DB',
                borderRadius: 8,
                padding: '32px 24px',
                textAlign: 'center',
                color: '#475569',
              }}
            >
              <BookOpen size={36} color="#94A3B8" style={{ margin: '0 auto 12px' }} />
              <p style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', margin: '0 0 6px 0' }}>
                No active 4-digit headings in Chapter {chapterCode}
              </p>
              <p style={{ fontSize: 14, color: '#64748B', margin: '0 0 20px 0', maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
                Chapter {chapterCode} is reserved in the Indian GST / Customs Tariff schedule for future use and contains no active goods classifications.
              </p>
              <Link
                href="/tools/hsn-code-finder"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 18px',
                  borderRadius: 6,
                  background: '#0F172A',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: 'none',
                  minHeight: 44,
                }}
              >
                Browse All Chapters
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {headings.map(h => {
                const headingDesc = h.d.replace(/\s+/g, ' ').trim()
                const mainRates = h.rateResult.mainRates

                return (
                  <div
                    key={h.c}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #D1D5DB',
                      borderRadius: 8,
                      padding: 20,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: 12,
                        flexWrap: 'wrap',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <Link
                          href={`/tools/hsn-code-finder/hsn/${h.c}`}
                          style={{
                            fontFamily: 'monospace',
                            fontSize: 18,
                            fontWeight: 800,
                            color: '#0F172A',
                            background: '#F1F5F9',
                            border: '1px solid #CBD5E1',
                            padding: '6px 14px',
                            borderRadius: 6,
                            textDecoration: 'none',
                            minHeight: 44,
                            display: 'inline-flex',
                            alignItems: 'center',
                            boxSizing: 'border-box',
                          }}
                        >
                          HSN {h.c}
                        </Link>
                        <CopyCodeButton code={h.c} />
                      </div>

                      <Link
                        href={`/tools/hsn-code-finder/hsn/${h.c}`}
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: '#C2410C',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          minHeight: 44,
                          boxSizing: 'border-box',
                        }}
                      >
                        View Sub-Codes &amp; Rates <ArrowRight size={16} />
                      </Link>
                    </div>

                    <div
                      style={{
                        fontSize: 15,
                        color: '#1E293B',
                        lineHeight: 1.6,
                        overflowWrap: 'anywhere',
                        wordBreak: 'break-word',
                      }}
                    >
                      {headingDesc}
                    </div>

                    {/* Rates Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#475569', marginRight: 4 }}>
                        GST Rate:
                      </span>
                      {mainRates.length > 0 ? (
                        mainRates.map((r, rIdx) => {
                          const display = formatRateDisplay(r)
                          const style = getRatePillStyle(r)

                          return (
                            <div
                              key={rIdx}
                              style={{
                                display: 'inline-flex',
                                flexDirection: 'column',
                                background: style.background,
                                color: style.color,
                                padding: '6px 12px',
                                borderRadius: 6,
                                minHeight: 44,
                                justifyContent: 'center',
                                boxSizing: 'border-box',
                                maxWidth: '100%',
                              }}
                            >
                              <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.02em' }}>
                                {display.headline}
                              </span>
                              {r.isSubCode && (
                                <span
                                  style={{
                                    fontSize: 14,
                                    marginTop: 2,
                                    color: '#FEF08A',
                                    fontWeight: 700,
                                    overflowWrap: 'anywhere',
                                    wordBreak: 'break-word',
                                  }}
                                >
                                  Applies to some sub-codes
                                </span>
                              )}
                            </div>
                          )
                        })
                      ) : (
                        <div
                          style={{
                            display: 'inline-flex',
                            flexDirection: 'column',
                            background: '#C2410C',
                            color: '#FFFFFF',
                            padding: '6px 12px',
                            borderRadius: 6,
                            minHeight: 44,
                            justifyContent: 'center',
                            boxSizing: 'border-box',
                            maxWidth: '100%',
                          }}
                        >
                          <span style={{ fontSize: 14, fontWeight: 800 }}>18%</span>
                          <span style={{ fontSize: 14, color: '#FFFFFF', fontWeight: 500, overflowWrap: 'anywhere' }}>
                            {RESIDUAL_RATE_NOTE}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Quick Turnover Rules Table */}
          <div
            style={{
              marginTop: 48,
              background: '#FFFFFF',
              border: '1px solid #D1D5DB',
              borderRadius: 8,
              padding: 24,
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                fontWeight: 600,
                color: '#0F172A',
                margin: '0 0 10px 0',
              }}
            >
              How Many HSN Digits Do You Need to Mention?
            </h3>
            <p style={{ fontSize: 14, color: '#475569', margin: '0 0 16px 0', lineHeight: 1.6 }}>
              Under GST Notification 78/2020-Central Tax, businesses must declare HSN codes on tax invoices according to annual aggregate turnover:
            </p>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: 14,
                  minWidth: 460,
                }}
              >
                <thead>
                  <tr style={{ background: '#F1F5F9', borderBottom: '2px solid #CBD5E1', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#0F172A' }}>Annual Turnover</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#0F172A' }}>B2B Invoices</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#0F172A' }}>B2C Invoices</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '12px 14px', color: '#1E293B', fontWeight: 600 }}>Up to ₹5 Crore</td>
                    <td style={{ padding: '12px 14px', color: '#334155' }}>4 Digits minimum</td>
                    <td style={{ padding: '12px 14px', color: '#334155' }}>Optional (4 Digits recommended)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                    <td style={{ padding: '12px 14px', color: '#1E293B', fontWeight: 600 }}>Above ₹5 Crore</td>
                    <td style={{ padding: '12px 14px', color: '#334155' }}>6 Digits mandatory</td>
                    <td style={{ padding: '12px 14px', color: '#334155' }}>6 Digits mandatory</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 14px', color: '#1E293B', fontWeight: 600 }}>Exports / Imports</td>
                    <td style={{ padding: '12px 14px', color: '#334155' }}>8 Digits mandatory</td>
                    <td style={{ padding: '12px 14px', color: '#334155' }}>8 Digits mandatory</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <SignupCta
        variant="bar"
        medium="finder"
        campaign={`chapter-${chapterCode}`}
        content="bar"
      />
    </>
  )
}
