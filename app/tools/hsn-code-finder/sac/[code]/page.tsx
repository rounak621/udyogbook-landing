import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import SignupCta from '../../../../components/SignupCta'
import CopyCodeButton from '../../CopyCodeButton'
import {
  getAll6DigitSACCodes,
  getSACDetails,
  getSACPageSummary,
  sentenceCase,
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

  const { sac, heading, headingCode, siblings } = details
  const summary = getSACPageSummary(sac, heading, headingCode, siblings)

  return {
    title: summary.metaTitle,
    description: summary.metaDescription,
    keywords: `sac code ${sac.c}, gst sac ${sac.c}, service accounting code ${sac.c}`,
    alternates: {
      canonical: `https://udyogbook.in/tools/hsn-code-finder/sac/${sac.c}`,
    },
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
              <Link href="/tools" style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 500 }}>
                Free Tools
              </Link>
              <span>/</span>
              <Link href="/tools/hsn-code-finder" style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 500 }}>
                HSN & SAC Code Finder
              </Link>
              <span>/</span>
              <span style={{ color: '#FED7AA', fontWeight: 600 }}>Group {headingCode}</span>
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

            {heading && (
              <p style={{ fontSize: 14, color: '#CBD5E1', margin: 0, lineHeight: 1.6, overflowWrap: 'anywhere' }}>
                <strong style={{ color: '#FFFFFF' }}>Service Group {headingCode}:</strong> {sentenceCase(heading.d)}
              </p>
            )}
          </div>
        </div>

        {/* Content Area */}
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

          {/* Classification Details */}
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
              <Briefcase size={22} color="#0F172A" />
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Service Classification
              </h2>
            </div>

            <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '16px 20px', border: '1px solid #D1D5DB', marginBottom: 24 }}>
              <p style={{ fontSize: 13, color: '#4B5563', margin: '0 0 6px 0', fontWeight: 700 }}>
                Classification Chain:
              </p>
              <p style={{ fontSize: 15, color: '#0F172A', margin: 0, lineHeight: 1.6 }}>
                {fullChain}
              </p>
            </div>

            {/* Official GST Portal Lookup notice */}
            <div
              style={{
                background: '#F8FAFC',
                borderRadius: 12,
                padding: '24px',
                border: '1px solid #D1D5DB',
              }}
            >
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', margin: '0 0 8px 0' }}>
                GST Rates for Services
              </h3>
              <p style={{ fontSize: 15, color: '#374151', margin: '0 0 18px 0', lineHeight: 1.6 }}>
                Service rates are being added to our direct search database. You can check current applicable rates on the official GST portal.
              </p>
              <a
                href="https://www.gst.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: '#0F172A',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 14,
                  minHeight: 44,
                  padding: '12px 22px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  boxSizing: 'border-box',
                }}
              >
                Check service GST rate on the official GST portal <ExternalLink size={16} />
              </a>
            </div>
          </div>

          <SignupCta
            variant="code"
            medium="finder"
            campaign={sac.c}
            content="code"
          />

          {/* Sibling SAC Codes in Same Group */}
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
              Create GST invoices with SAC {sac.c} automatically in Udyog
            </h3>
            <p style={{ fontSize: 16, color: '#E2E8F0', maxWidth: 580, margin: '0 auto 24px', lineHeight: 1.6 }}>
              Issue compliant tax invoices for professional, consulting, and contractor services with automated SAC rate mapping.
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
      <SignupCta
        variant="bar"
        medium="finder"
        campaign={sac.c}
        content="bar"
      />
    </>
  )
}
