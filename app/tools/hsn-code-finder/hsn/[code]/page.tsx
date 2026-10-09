import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import CopyCodeButton from '../../CopyCodeButton'
import {
  getAllHSNHeadings,
  getHSNHeadingDetails,
  formatRateDisplay,
  RATE_SOURCE_BANNER,
  RESIDUAL_RATE_TITLE,
  RESIDUAL_RATE_NOTE,
} from '../../../../../lib/hsn-data'
import { Info, ArrowLeft, ArrowRight, ShieldCheck, Tag } from 'lucide-react'

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

  const { heading } = details
  const cleanDesc = heading.d.replace(/\s+/g, ' ').trim()

  return {
    title: `HSN Code ${heading.c}: ${cleanDesc} — GST Rate | Udyog`,
    description: `Check GST rate for HSN Code ${heading.c} (${cleanDesc}). View official CBIC rates, CGST/SGST split, conditions, and all child tariff codes under heading ${heading.c}.`,
    keywords: `hsn code ${heading.c}, gst rate ${heading.c}, hsn ${heading.c} gst rate, ${cleanDesc} gst rate`,
    alternates: {
      canonical: `https://udyogbook.in/tools/hsn-code-finder/hsn/${heading.c}`,
    },
    openGraph: {
      title: `HSN Code ${heading.c}: ${cleanDesc} — GST Rate`,
      description: `Official GST rates and tariff breakdown for HSN heading ${heading.c}.`,
      url: `https://udyogbook.in/tools/hsn-code-finder/hsn/${heading.c}`,
      type: 'article',
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

  const { heading, chapterCode, chapter, children, siblings, rates } = details
  const cleanHeadingDesc = heading.d.replace(/\s+/g, ' ').trim()

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
            name: `HSN ${heading.c}`,
            item: `https://udyogbook.in/tools/hsn-code-finder/hsn/${heading.c}`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68, minHeight: '100vh', background: '#F8FAFC' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Top Breadcrumb & Return Link */}
        <div style={{ background: '#0F172A', color: '#fff', padding: '24px var(--section-px, 20px) 32px' }}>
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#94A3B8', marginBottom: 16, flexWrap: 'wrap' }}>
              <Link href="/tools" style={{ color: '#94A3B8', textDecoration: 'none' }}>
                Free Tools
              </Link>
              <span>/</span>
              <Link href="/tools/hsn-code-finder" style={{ color: '#94A3B8', textDecoration: 'none' }}>
                HSN Code Finder
              </Link>
              <span>/</span>
              <span style={{ color: '#F97316' }}>Chapter {chapterCode}</span>
              <span>/</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>HSN {heading.c}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
              <span
                style={{
                  background: '#F97316',
                  color: '#fff',
                  fontFamily: 'monospace',
                  fontSize: 18,
                  fontWeight: 800,
                  padding: '6px 16px',
                  borderRadius: 8,
                  letterSpacing: '0.05em',
                }}
              >
                HSN {heading.c}
              </span>
              <CopyCodeButton code={heading.c} />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#FED7AA',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '4px 10px',
                  borderRadius: 6,
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
                margin: '0 0 12px 0',
                color: '#fff',
              }}
            >
              HSN Code {heading.c}: {cleanHeadingDesc} — GST Rate
            </h1>

            {chapter && (
              <p style={{ fontSize: 14, color: '#CBD5E1', margin: 0, lineHeight: 1.6 }}>
                <strong>Chapter {chapterCode}:</strong> {chapter.d}
              </p>
            )}
          </div>
        </div>

        {/* Content Container */}
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '32px var(--section-px, 20px)' }}>
          {/* Rate Source Banner */}
          <div
            style={{
              background: '#FFF7ED',
              border: '1px solid #FED7AA',
              borderRadius: 12,
              padding: '12px 16px',
              marginBottom: 28,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              fontSize: 13,
              color: '#9A3412',
              lineHeight: 1.5,
            }}
          >
            <Info size={18} style={{ flexShrink: 0, marginTop: 1, color: '#EA580C' }} />
            <div>{RATE_SOURCE_BANNER}</div>
          </div>

          {/* Section 1: Official GST Rates */}
          <div
            style={{
              background: '#fff',
              borderRadius: 18,
              border: '1.5px solid #E2E8F0',
              padding: '28px 24px',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
              marginBottom: 32,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Tag size={20} color="#F97316" />
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                GST Rates for Heading {heading.c}
              </h2>
            </div>

            {rates.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {rates.map((r, idx) => {
                  const display = formatRateDisplay(r)
                  return (
                    <div
                      key={idx}
                      style={{
                        background: '#F8FAFC',
                        borderRadius: 12,
                        border: '1px solid #E2E8F0',
                        padding: '18px 20px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                        <span
                          style={{
                            background: r.gst === 0 ? '#ECFDF5' : r.cess ? '#FEF2F2' : '#FFF7ED',
                            color: r.gst === 0 ? '#059669' : r.cess ? '#DC2626' : '#C2410C',
                            border: `1px solid ${r.gst === 0 ? '#A7F3D0' : r.cess ? '#FECACA' : '#FED7AA'}`,
                            fontWeight: 800,
                            fontSize: 16,
                            padding: '4px 12px',
                            borderRadius: 6,
                          }}
                        >
                          {display.headline}
                        </span>
                        <span style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>
                          {display.split}
                        </span>
                        {r.isSubCode && (
                          <span
                            style={{
                              background: '#FEF3C7',
                              color: '#92400E',
                              fontSize: 11,
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: 4,
                            }}
                          >
                            Applies to some sub-codes
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, margin: '0 0 6px 0' }}>
                        {r.d}
                      </p>
                      <div style={{ fontSize: 12, color: '#64748B' }}>
                        Reference: Schedule {r.sch}, S. No. {r.sn} {r.spec ? `(Spec: ${r.spec})` : ''}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div
                style={{
                  background: '#F8FAFC',
                  borderRadius: 12,
                  border: '1px solid #E2E8F0',
                  padding: '20px',
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>
                  {RESIDUAL_RATE_TITLE}
                </div>
                <p style={{ fontSize: 14, color: '#475569', margin: 0, lineHeight: 1.6 }}>
                  {RESIDUAL_RATE_NOTE}
                </p>
              </div>
            )}
          </div>

          {/* Section 2: Child Tariff Codes (6-digit & 8-digit) */}
          <div
            style={{
              background: '#fff',
              borderRadius: 18,
              border: '1.5px solid #E2E8F0',
              padding: '28px 24px',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
              marginBottom: 32,
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', margin: '0 0 6px 0' }}>
              Sub-Headings & Tariff Items Under {heading.c}
            </h2>
            <p style={{ fontSize: 14, color: '#64748B', margin: '0 0 20px 0' }}>
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
                        border: '1px solid #E2E8F0',
                        padding: '14px 18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span
                            style={{
                              fontFamily: 'monospace',
                              fontWeight: 700,
                              fontSize: 15,
                              color: '#0F172A',
                              background: '#fff',
                              border: '1px solid #CBD5E1',
                              padding: '2px 8px',
                              borderRadius: 6,
                            }}
                          >
                            {ch.c}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: isLeaf8 ? '#15803D' : is6 ? '#0284C7' : '#64748B',
                            }}
                          >
                            {ch.c.length}-Digit {isLeaf8 ? 'Tariff Item' : is6 ? 'Sub-heading' : 'Group'}
                          </span>
                        </div>
                        <CopyCodeButton code={ch.c} />
                      </div>
                      <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.6, margin: 0 }}>
                        <span style={{ color: '#64748B' }}>Chain:</span> {fullChain}
                      </p>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>
                No further sub-headings are defined under this 4-digit heading. Heading {heading.c} is the primary tariff reference.
              </p>
            )}
          </div>

          {/* Section 3: Sibling Headings in Chapter */}
          {siblings.length > 0 && (
            <div
              style={{
                background: '#fff',
                borderRadius: 18,
                border: '1.5px solid #E2E8F0',
                padding: '28px 24px',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
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
                      border: '1px solid #E2E8F0',
                      borderRadius: 10,
                      padding: '12px 14px',
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      transition: 'border-color 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#F97316', fontSize: 14 }}>
                        HSN {sib.c}
                      </span>
                      <ArrowRight size={14} color="#94A3B8" />
                    </div>
                    <span style={{ fontSize: 12, color: '#475569', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
                gap: 6,
                color: '#F97316',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <ArrowLeft size={16} /> Search all 21,000+ HSN & SAC codes
            </Link>
          </div>

          <div
            style={{
              background: '#0F172A',
              borderRadius: 18,
              padding: 'clamp(36px,5vw,56px) 28px',
              textAlign: 'center',
              color: '#fff',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,30px)', fontWeight: 400, margin: '0 0 12px 0' }}>
              Create GST invoices with HSN {heading.c} automatically in Udyog
            </h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', maxWidth: 560, margin: '0 auto 24px', lineHeight: 1.6 }}>
              Udyog automatically maps product items to the right HSN codes and applies current tax rates with zero manual errors.
            </p>
            <a
              href="https://app.udyogbook.in/sign-in?utm_source=hsn_finder"
              style={{
                display: 'inline-block',
                background: '#F97316',
                color: '#fff',
                padding: '12px 28px',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: 'none',
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
