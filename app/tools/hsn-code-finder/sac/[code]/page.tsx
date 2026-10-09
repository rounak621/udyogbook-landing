import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import CopyCodeButton from '../../CopyCodeButton'
import {
  getAll6DigitSACCodes,
  getSACDetails,
  RATE_SOURCE_BANNER,
} from '../../../../../lib/hsn-data'
import { Info, ArrowLeft, ArrowRight, ExternalLink, Briefcase } from 'lucide-react'

export async function generateStaticParams() {
  const codes = getAll6DigitSACCodes()
  return codes.map(s => ({ code: s.c }))
}

export async function generateMetadata({
  params,
}: {
  params: { code: string }
}): Promise<Metadata> {
  const details = getSACDetails(params.code)
  if (!details) return {}

  const { sac } = details
  const cleanDesc = sac.d.replace(/\s+/g, ' ').trim()

  return {
    title: `SAC Code ${sac.c}: ${cleanDesc} — Service Accounting Code | Udyog`,
    description: `Check SAC Code ${sac.c} (${cleanDesc}). View official GST Services Accounting Code classification, service group, and GST rate lookup.`,
    keywords: `sac code ${sac.c}, gst sac ${sac.c}, service accounting code ${sac.c}, ${cleanDesc} gst rate`,
    alternates: {
      canonical: `https://udyogbook.in/tools/hsn-code-finder/sac/${sac.c}`,
    },
    openGraph: {
      title: `SAC Code ${sac.c}: ${cleanDesc} — Service Accounting Code`,
      description: `Official Service Accounting Code classification for SAC ${sac.c}.`,
      url: `https://udyogbook.in/tools/hsn-code-finder/sac/${sac.c}`,
      type: 'article',
    },
  }
}

export default function SACDetailPage({
  params,
}: {
  params: { code: string }
}) {
  const details = getSACDetails(params.code)
  if (!details) notFound()

  const { sac, headingCode, heading, siblings } = details
  const cleanDesc = sac.d.replace(/\s+/g, ' ').trim()
  const fullChain = [...sac.p, sac.d].filter(Boolean).join(' > ')

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
            name: `SAC ${sac.c}`,
            item: `https://udyogbook.in/tools/hsn-code-finder/sac/${sac.c}`,
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

        {/* Hero Section */}
        <div style={{ background: '#0F172A', color: '#fff', padding: '24px var(--section-px, 20px) 32px' }}>
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#94A3B8', marginBottom: 16, flexWrap: 'wrap' }}>
              <Link href="/tools" style={{ color: '#94A3B8', textDecoration: 'none' }}>
                Free Tools
              </Link>
              <span>/</span>
              <Link href="/tools/hsn-code-finder" style={{ color: '#94A3B8', textDecoration: 'none' }}>
                HSN & SAC Code Finder
              </Link>
              <span>/</span>
              <span style={{ color: '#0284C7' }}>Group {headingCode}</span>
              <span>/</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>SAC {sac.c}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
              <span
                style={{
                  background: '#0284C7',
                  color: '#fff',
                  fontFamily: 'monospace',
                  fontSize: 18,
                  fontWeight: 800,
                  padding: '6px 16px',
                  borderRadius: 8,
                  letterSpacing: '0.05em',
                }}
              >
                SAC {sac.c}
              </span>
              <CopyCodeButton code={sac.c} />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#BAE6FD',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '4px 10px',
                  borderRadius: 6,
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
                margin: '0 0 12px 0',
                color: '#fff',
              }}
            >
              SAC Code {sac.c}: {cleanDesc} — Service Accounting Code
            </h1>

            {heading && (
              <p style={{ fontSize: 14, color: '#CBD5E1', margin: 0, lineHeight: 1.6 }}>
                <strong>Service Group {headingCode}:</strong> {heading.d}
              </p>
            )}
          </div>
        </div>

        {/* Content Area */}
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

          {/* Classification Details */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Briefcase size={20} color="#0284C7" />
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Service Classification
              </h2>
            </div>

            <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '16px 20px', border: '1px solid #E2E8F0', marginBottom: 20 }}>
              <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 6px 0', fontWeight: 600 }}>
                Classification Chain:
              </p>
              <p style={{ fontSize: 15, color: '#0F172A', margin: 0, lineHeight: 1.6 }}>
                {fullChain}
              </p>
            </div>

            {/* Official GST Portal Lookup notice */}
            <div
              style={{
                background: '#F0F9FF',
                borderRadius: 14,
                padding: '24px',
                border: '1px solid #BAE6FD',
              }}
            >
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0369A1', margin: '0 0 8px 0' }}>
                GST Rates for Services
              </h3>
              <p style={{ fontSize: 14, color: '#0C4A6E', margin: '0 0 16px 0', lineHeight: 1.6 }}>
                Service rates are being added to our direct search database. You can check the current applicable notification rates directly on the official GST portal.
              </p>
              <a
                href="https://www.gst.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#0284C7',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 14,
                  padding: '12px 22px',
                  borderRadius: 8,
                  textDecoration: 'none',
                }}
              >
                Check service GST rate on the official GST portal <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Sibling SAC Codes in Same Group */}
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
                Other Services in Group {headingCode}
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
                    href={`/tools/hsn-code-finder/sac/${sib.c}`}
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
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0284C7', fontSize: 14 }}>
                        SAC {sib.c}
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

          {/* Return & CTA */}
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
              Create GST invoices with SAC {sac.c} automatically in Udyog
            </h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', maxWidth: 560, margin: '0 auto 24px', lineHeight: 1.6 }}>
              Issue compliant tax invoices for professional, consulting, and contractor services with automated SAC rate mapping.
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
