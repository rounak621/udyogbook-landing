'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Search, ExternalLink, Package, Briefcase, AlertCircle, Info } from 'lucide-react'
import CopyCodeButton from './CopyCodeButton'

interface RateItem {
  gst: number
  cgst: string
  cess: boolean
  d: string
  spec: string
  isSubCode?: boolean
}

interface IndexItem {
  c: string
  d: string
  p: string[]
  t: 'hsn' | 'sac'
  s: string
  r: RateItem[]
  o?: RateItem[]
  t2Main?: boolean
}

const RATE_SOURCE_BANNER =
  'GST rates as per CBIC Notifications 09/2025 and 10/2025 (Central Tax - Rate), effective 22 September 2025. Last updated: October 2026. Always verify on the official GST portal before filing.'

const POPULAR_SEARCHES = [
  { label: 'T-Shirts (6109)', query: '6109' },
  { label: 'Tea (0902)', query: '0902' },
  { label: 'Rice / Chawal (1006)', query: 'chawal' },
  { label: 'Kapda (Apparel)', query: 'kapda' },
  { label: 'Mobile (8517)', query: 'mobile' },
  { label: 'Footwear / Jootey', query: 'jootey' },
  { label: 'Construction (9954)', query: '9954' },
]

export default function FinderClient() {
  const [data, setData] = useState<IndexItem[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'hsn' | 'sac'>('hsn')

  useEffect(() => {
    fetch('/hsn-data/search-index.json')
      .then(res => res.json())
      .then((items: IndexItem[]) => {
        setData(items)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load search index:', err)
        setLoading(false)
      })
  }, [])

  const results = useMemo(() => {
    if (!query.trim()) {
      return data.filter(item => item.t === activeTab).slice(0, 12)
    }

    const q = query.trim().toLowerCase()
    const isNumeric = /^\d+$/.test(q)
    const tokens = q.split(/\s+/).filter(Boolean)

    const filtered = data.filter(item => {
      if (item.t !== activeTab) return false

      if (isNumeric) {
        return item.c.startsWith(q)
      }

      return tokens.every(tok => item.s.includes(tok) || item.c.includes(tok))
    })

    return filtered.slice(0, 20)
  }, [data, query, activeTab])

  const hsnCount = useMemo(() => {
    if (!query.trim()) return data.filter(x => x.t === 'hsn').length
    const q = query.trim().toLowerCase()
    const isNum = /^\d+$/.test(q)
    const tokens = q.split(/\s+/).filter(Boolean)
    return data.filter(x => x.t === 'hsn' && (isNum ? x.c.startsWith(q) : tokens.every(tok => x.s.includes(tok)))).length
  }, [data, query])

  const sacCount = useMemo(() => {
    if (!query.trim()) return data.filter(x => x.t === 'sac').length
    const q = query.trim().toLowerCase()
    const isNum = /^\d+$/.test(q)
    const tokens = q.split(/\s+/).filter(Boolean)
    return data.filter(x => x.t === 'sac' && (isNum ? x.c.startsWith(q) : tokens.every(tok => x.s.includes(tok)))).length
  }, [data, query])

  const formatRateHeadline = (r: RateItem) => {
    if (r.gst === 0) return '0% (Nil / exempt)'
    if (r.cess) return '28% + compensation cess'
    const half = (r.gst / 2).toString().replace(/\.0$/, '')
    const cgstStr = r.cgst || `${half}%`
    return `${r.gst}% (CGST ${cgstStr} + SGST ${cgstStr} / IGST ${r.gst}%)`
  }

  const getRatePillStyle = (r: RateItem) => {
    if (r.gst === 0) {
      return { background: '#15803D', color: '#FFFFFF' }
    }
    if (r.gst === 5) {
      return { background: '#0F172A', color: '#FFFFFF' }
    }
    if (r.gst === 18) {
      return { background: '#C2410C', color: '#FFFFFF' }
    }
    // 28%, 40%, or cess
    return { background: '#991B1B', color: '#FFFFFF' }
  }

  return (
    <div style={{ width: '100%', maxWidth: 1040, margin: '0 auto' }}>
      <style>{`
        .hsn-search-input::placeholder {
          color: #4B5563;
          opacity: 1;
        }
      `}</style>

      {/* Rate Source Banner */}
      <div
        style={{
          background: '#F1F5F9',
          border: '1px solid #CBD5E1',
          borderRadius: 12,
          padding: '14px 18px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
          fontSize: 14,
          color: '#0F172A',
          lineHeight: 1.6,
        }}
      >
        <Info size={20} style={{ flexShrink: 0, marginTop: 2, color: '#EA580C' }} />
        <div>{RATE_SOURCE_BANNER}</div>
      </div>

      {/* Search Input Card */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 16,
          border: '1px solid #D1D5DB',
          padding: '24px 20px',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
          marginBottom: 24,
        }}
      >
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <Search
            size={22}
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#4B5563',
            }}
          />
          <input
            type="text"
            className="hsn-search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search code or keywords in English & Hinglish (e.g. 6109, rice, kapda, footwear)..."
            style={{
              width: '100%',
              height: 56,
              paddingLeft: 52,
              paddingRight: 44,
              fontSize: 16,
              borderRadius: 12,
              border: '2px solid #9CA3AF',
              outline: 'none',
              boxSizing: 'border-box',
              color: '#0F172A',
              background: '#FFFFFF',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            }}
            onFocus={e => {
              e.target.style.borderColor = '#EA580C'
              e.target.style.boxShadow = '0 0 0 3px rgba(234, 88, 12, 0.25)'
            }}
            onBlur={e => {
              e.target.style.borderColor = '#9CA3AF'
              e.target.style.boxShadow = 'none'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                position: 'absolute',
                right: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                background: '#0F172A',
                border: 'none',
                borderRadius: '50%',
                width: 24,
                height: 24,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: 12,
                fontWeight: 'bold',
              }}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Search Suggestions */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#374151', fontWeight: 700, marginRight: 4 }}>Popular:</span>
          {POPULAR_SEARCHES.map(item => (
            <button
              key={item.label}
              onClick={() => {
                setQuery(item.query)
                if (item.query === '9954') setActiveTab('sac')
                else setActiveTab('hsn')
              }}
              style={{
                background: '#FFFFFF',
                border: '1px solid #D1D5DB',
                borderRadius: 20,
                padding: '6px 14px',
                fontSize: 13,
                color: '#1F2937',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#EA580C'
                e.currentTarget.style.color = '#EA580C'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#D1D5DB'
                e.currentTarget.style.color = '#1F2937'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs for Goods (HSN) and Services (SAC) */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, borderBottom: '1px solid #D1D5DB', paddingBottom: 12 }}>
        <button
          onClick={() => setActiveTab('hsn')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            borderRadius: 8,
            border: activeTab === 'hsn' ? '2px solid #0F172A' : '1px solid #D1D5DB',
            background: activeTab === 'hsn' ? '#0F172A' : '#FFFFFF',
            color: activeTab === 'hsn' ? '#FFFFFF' : '#0F172A',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          <Package size={18} color={activeTab === 'hsn' ? '#FFFFFF' : '#0F172A'} />
          Goods (HSN)
          <span
            style={{
              background: activeTab === 'hsn' ? '#EA580C' : '#F1F5F9',
              color: activeTab === 'hsn' ? '#FFFFFF' : '#0F172A',
              borderRadius: 12,
              padding: '2px 8px',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {loading ? '...' : hsnCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('sac')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            borderRadius: 8,
            border: activeTab === 'sac' ? '2px solid #0F172A' : '1px solid #D1D5DB',
            background: activeTab === 'sac' ? '#0F172A' : '#FFFFFF',
            color: activeTab === 'sac' ? '#FFFFFF' : '#0F172A',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          <Briefcase size={18} color={activeTab === 'sac' ? '#FFFFFF' : '#0F172A'} />
          Services (SAC)
          <span
            style={{
              background: activeTab === 'sac' ? '#EA580C' : '#F1F5F9',
              color: activeTab === 'sac' ? '#FFFFFF' : '#0F172A',
              borderRadius: 12,
              padding: '2px 8px',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {loading ? '...' : sacCount}
          </span>
        </button>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <p style={{ fontSize: 14, color: '#374151', margin: 0, fontWeight: 600 }}>
          {query.trim()
            ? `Showing top ${results.length} result${results.length === 1 ? '' : 's'} for "${query}"`
            : `Showing popular ${activeTab === 'hsn' ? 'HSN headings' : 'SAC service codes'}`}
        </p>
        <span style={{ fontSize: 13, color: '#4B5563', fontWeight: 500 }}>Click card or heading for full tariff breakdown</span>
      </div>

      {/* Results List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#374151' }}>
          <p style={{ fontSize: 16, fontWeight: 600 }}>Loading HSN & SAC index...</p>
        </div>
      ) : results.length === 0 ? (
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid #D1D5DB',
            padding: '48px 24px',
            textAlign: 'center',
          }}
        >
          <AlertCircle size={40} color="#4B5563" style={{ marginBottom: 14 }} />
          <h3 style={{ fontSize: 18, color: '#0F172A', fontWeight: 700, marginBottom: 8 }}>No matching codes found</h3>
          <p style={{ fontSize: 15, color: '#374151', maxWidth: 480, margin: '0 auto 20px', lineHeight: 1.6 }}>
            We could not find any {activeTab === 'hsn' ? 'goods heading' : 'service code'} matching &ldquo;{query}&rdquo;. Try another term, spelling, or chapter number.
          </p>
          <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '16px 20px', maxWidth: 540, margin: '0 auto', textAlign: 'left', border: '1px solid #D1D5DB' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: '0 0 6px 0' }}>
              Residual GST Rule for Goods:
            </p>
            <p style={{ fontSize: 14, color: '#374151', margin: 0, lineHeight: 1.6 }}>
              Goods not specified in any schedule are taxed at <strong>18% (CGST 9% + SGST 9%)</strong> as per Schedule II, S. No. 639 of Notification 09/2025.
            </p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {results.map(item => {
            const detailUrl =
              item.t === 'hsn'
                ? `/tools/hsn-code-finder/hsn/${item.c}`
                : `/tools/hsn-code-finder/sac/${item.c}`

            const fullChain = [...(item.p || []), item.d].filter(Boolean).join(' > ')

            return (
              <div
                key={`${item.t}-${item.c}`}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 16,
                  border: '1px solid #D1D5DB',
                  padding: '24px 22px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
                }}
              >
                {/* Card Top: Code Pill, Type, Copy Button, Detail Link */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span
                      style={{
                        background: '#0F172A',
                        color: '#FFFFFF',
                        fontFamily: 'monospace',
                        fontSize: 16,
                        fontWeight: 700,
                        padding: '6px 14px',
                        borderRadius: 6,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {item.t.toUpperCase()} {item.c}
                    </span>

                    <CopyCodeButton code={item.c} />

                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                        background: item.t === 'hsn' ? '#0F172A' : '#0369A1',
                        padding: '4px 10px',
                        borderRadius: 6,
                      }}
                    >
                      {item.t === 'hsn' ? '4-Digit Heading' : 'Service Code'}
                    </span>
                  </div>

                  <Link
                    href={detailUrl}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#C2410C',
                      textDecoration: 'none',
                    }}
                  >
                    View Tariff Page <ExternalLink size={14} />
                  </Link>
                </div>

                {/* Description Header */}
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', margin: '0 0 8px 0', lineHeight: 1.4 }}>
                  <Link href={detailUrl} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {item.d}
                  </Link>
                </h3>

                {/* Full Parent Chain */}
                {fullChain && (
                  <p style={{ fontSize: 13, color: '#374151', margin: '0 0 16px 0', lineHeight: 1.6 }}>
                    <strong style={{ color: '#0F172A' }}>Classification Chain:</strong> {fullChain}
                  </p>
                )}

                {/* Rates Section */}
                {item.t === 'hsn' ? (
                  <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '16px', border: '1px solid #D1D5DB' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0F172A', marginBottom: 12 }}>
                      Applicable GST Rates & Conditions
                    </div>
                    {item.r && item.r.length > 0 ? (
                      <div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                          {item.r.map((r, rIdx) => (
                            <div
                              key={rIdx}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 12,
                                paddingBottom: rIdx < item.r.length - 1 ? 12 : 0,
                                borderBottom: rIdx < item.r.length - 1 ? '1px dashed #D1D5DB' : 'none',
                              }}
                            >
                              <div style={{ flexShrink: 0 }}>
                                <span
                                  style={{
                                    display: 'inline-block',
                                    ...getRatePillStyle(r),
                                    fontWeight: 800,
                                    fontSize: 13,
                                    padding: '4px 10px',
                                    borderRadius: 6,
                                  }}
                                >
                                  {formatRateHeadline(r)}
                                </span>
                                {r.isSubCode && (
                                  <div
                                    style={{
                                      display: 'inline-block',
                                      background: '#B45309',
                                      color: '#FFFFFF',
                                      fontSize: 11,
                                      fontWeight: 700,
                                      padding: '2px 8px',
                                      borderRadius: 4,
                                      marginTop: 4,
                                    }}
                                  >
                                    Applies to some sub-codes
                                  </div>
                                )}
                              </div>
                              <div style={{ fontSize: 14, color: '#1F2937', lineHeight: 1.6, flex: 1 }}>
                                {r.d}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* If Tier 2 was shown as main because Tier 1 was empty (Rule 3) */}
                        {item.t2Main && (
                          <div
                            style={{
                              background: '#FFFFFF',
                              borderRadius: 8,
                              border: '1px solid #D1D5DB',
                              padding: '12px 14px',
                              marginTop: 12,
                              fontSize: 13,
                              color: '#1F2937',
                              lineHeight: 1.5,
                            }}
                          >
                            If none of these descriptions fit your goods, the residual rate is 18% (Schedule II, S. No. 639).
                          </div>
                        )}

                        {/* If Tier 1 has rows and Tier 2 has rows: collapsed section (Rule 2) */}
                        {item.o && item.o.length > 0 && (
                          <details
                            style={{
                              marginTop: 14,
                              background: '#FFFFFF',
                              border: '1px solid #D1D5DB',
                              borderRadius: 8,
                              padding: '12px 16px',
                            }}
                          >
                            <summary
                              style={{
                                cursor: 'pointer',
                                fontWeight: 700,
                                fontSize: 14,
                                color: '#0F172A',
                                userSelect: 'none',
                              }}
                            >
                              Other entries in this chapter ({item.o.length})
                            </summary>
                            <p style={{ fontSize: 13, color: '#374151', margin: '8px 0 12px 0' }}>
                              These apply only if your goods match the description.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                              {item.o.map((oRate, oIdx) => (
                                <div
                                  key={oIdx}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 12,
                                    fontSize: 13,
                                    paddingTop: oIdx > 0 ? 10 : 0,
                                    borderTop: oIdx > 0 ? '1px dashed #D1D5DB' : 'none',
                                  }}
                                >
                                  <span
                                    style={{
                                      display: 'inline-block',
                                      ...getRatePillStyle(oRate),
                                      fontWeight: 800,
                                      fontSize: 12,
                                      padding: '3px 8px',
                                      borderRadius: 4,
                                      flexShrink: 0,
                                    }}
                                  >
                                    {formatRateHeadline(oRate)}
                                  </span>
                                  <span style={{ color: '#1F2937', lineHeight: 1.5, flex: 1 }}>
                                    {oRate.d}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </details>
                        )}
                      </div>
                    ) : (
                      <div style={{ fontSize: 14, color: '#1F2937' }}>
                        <span style={{ fontWeight: 700, color: '#0F172A' }}>
                          Not specifically listed in the rate schedules. Residual entry: 18%
                        </span>
                        <p style={{ margin: '6px 0 0 0', fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
                          Goods not specified elsewhere are taxed at 18% (CGST 9% + SGST 9%) as per Schedule II, S. No. 639
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* SAC Services Rate Notice */
                  <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '16px', border: '1px solid #D1D5DB' }}>
                    <p style={{ fontSize: 14, color: '#1F2937', margin: '0 0 12px 0', lineHeight: 1.6 }}>
                      Service GST rates are being added to our direct search database. You can check current rates on the official GST portal.
                    </p>
                    <a
                      href="https://www.gst.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        background: '#0F172A',
                        color: '#FFFFFF',
                        fontSize: 14,
                        fontWeight: 700,
                        padding: '10px 18px',
                        borderRadius: 8,
                        textDecoration: 'none',
                      }}
                    >
                      Check service GST rate on the official GST portal <ExternalLink size={15} />
                    </a>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
