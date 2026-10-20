import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import SignupCta from '../../../../components/SignupCta'
import { getChapter99Details, sentenceCase } from '../../../../../lib/hsn-data'
import { selfCanonical } from '../../../../../lib/seo'
import { ArrowLeft, BookOpen, Layers, Briefcase } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Chapter 99: Services & SAC Codes Directory | Udyog',
  description:
    'Browse all 31 GST service groups and 649 SAC codes under Chapter 99. Official CBIC Services Accounting Code directory for Indian GST.',
  keywords:
    'sac codes, chapter 99 gst, services accounting code list, sac code directory, gst services chapter 99',
  alternates: selfCanonical('/tools/hsn-code-finder/chapter/99'),
  openGraph: {
    title: 'Chapter 99: Services & SAC Codes Directory | Udyog',
    description:
      'Browse all 31 GST service groups and 649 SAC codes under Chapter 99. Official CBIC Services Accounting Code directory for Indian GST.',
    url: 'https://udyogbook.in/tools/hsn-code-finder/chapter/99',
    type: 'article',
  },
}

export default function Chapter99Page() {
  const { chapter, groups, totalCodes } = getChapter99Details()

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
              <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Chapter 99 (Services)</span>
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
                CHAPTER 99
              </span>
              <span style={{ color: '#94A3B8', fontSize: 14 }}>
                Services Accounting Code (SAC) Directory
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px,3.8vw,40px)',
                fontWeight: 400,
                lineHeight: 1.25,
                margin: '0 0 16px 0',
                color: '#FFFFFF',
              }}
            >
              Chapter 99: Services Accounting Codes (SAC)
            </h1>

            <p style={{ fontSize: 16, color: '#E2E8F0', lineHeight: 1.7, maxWidth: 780, margin: 0 }}>
              Chapter 99 of the Indian Goods and Services Tax (GST) classification covers all services.
              It comprises {groups.length} four-digit service groups containing {totalCodes} individual six-digit
              Services Accounting Codes (SAC).
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '36px clamp(16px,4vw,24px) 64px' }}>
          {/* Back link */}
          <div style={{ marginBottom: 24 }}>
            <Link prefetch={false}
              href="/tools/hsn-code-finder"
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
              <ArrowLeft size={16} /> Back to HSN & SAC Code Finder
            </Link>
          </div>

          {/* Key Facts Summary */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #D1D5DB',
              borderRadius: 12,
              padding: 24,
              marginBottom: 32,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 20,
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>
                Tariff Scope
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>
                All Services
              </div>
              <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
                Services Accounting Code (SAC)
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>
                Service Groups
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>
                {groups.length} Groups
              </div>
              <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
                4-digit headings (9954 to 9999)
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>
                Total Tariff Items
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>
                {totalCodes} SAC Codes
              </div>
              <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
                6-digit invoice-ready service codes
              </div>
            </div>
          </div>

          {/* Service Groups Directory */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Layers size={22} color="#EA580C" />
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                All 31 SAC Service Groups
              </h2>
            </div>
            <p style={{ fontSize: 14, color: '#4B5563', margin: '0 0 20px 0' }}>
              Select a service group below to explore all 6-digit Services Accounting Codes within that group.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
                gap: 12,
              }}
            >
              {groups.map(group => {
                const groupName = sentenceCase(group.d)
                return (
                  <Link prefetch={false}
                    key={group.c}
                    href={`/tools/hsn-code-finder/sac/${group.c}`}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #D1D5DB',
                      borderRadius: 10,
                      padding: '16px 18px',
                      textDecoration: 'none',
                      color: '#0F172A',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: 90,
                      boxSizing: 'border-box',
                      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            color: '#EA580C',
                            fontSize: 14,
                          }}
                        >
                          Group {group.c}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: '#64748B',
                            background: '#F1F5F9',
                            padding: '2px 8px',
                            borderRadius: 12,
                          }}
                        >
                          {group.codesCount} {group.codesCount === 1 ? 'code' : 'codes'}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: '#0F172A',
                          lineHeight: 1.4,
                        }}
                      >
                        {groupName}
                      </div>
                    </div>
                    <div style={{ marginTop: 10, fontSize: 12, color: '#EA580C', fontWeight: 600 }}>
                      View all codes →
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Structural Overview Section */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #D1D5DB',
              borderRadius: 12,
              padding: 28,
              marginBottom: 36,
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', margin: '0 0 12px 0' }}>
              How Services Accounting Codes (SAC) Work Under Indian GST
            </h3>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, marginBottom: 12 }}>
              Under Indian Goods and Services Tax, physical goods are classified into HSN Chapters 01 through 98,
              while all services are categorized under Chapter 99. Each SAC code uses a 6-digit structure:
            </p>
            <ul style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, margin: 0, paddingLeft: 20 }}>
              <li>
                <strong>First 2 digits (99):</strong> Identifies the entry as a service under Chapter 99.
              </li>
              <li>
                <strong>Middle 2 digits:</strong> Identifies the service group (one of the 31 groups listed above).
              </li>
              <li>
                <strong>Last 2 digits:</strong> Specifies the detailed tariff item describing the specific service.
              </li>
            </ul>
          </div>

          {/* CTA Banner */}
          <SignupCta
            variant="inline"
            medium="finder"
            campaign="hsn-code-finder"
            content="bottom"
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
