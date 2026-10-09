'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Search, Copy, Check, ExternalLink, Package, Briefcase, AlertCircle, Info } from 'lucide-react'

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
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

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

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const results = useMemo(() => {
    if (!query.trim()) {
      // Default initial view: top 12 items for active tab
      return data.filter(item => item.t === activeTab).slice(0, 12)
    }

    const q = query.trim().toLowerCase()
    const isNumeric = /^\d+$/.test(q)
    const tokens = q.split(/\s+/).filter(Boolean)

    const filtered = data.filter(item => {
      if (item.t !== activeTab) return false

      if (isNumeric) {
        // Prefix match on code
        return item.c.startsWith(q)
      }

      // Word search: all tokens must match in searchable text or code
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

  return (
    <div style={{ width: '100%', maxWidth: 1040, margin: '0 auto' }}>
      {/* Rate Source Banner */}
      <div
        style={{
          background: '#FFF7ED',
          border: '1px solid #FED7AA',
          borderRadius: 12,
          padding: '12px 16px',
          marginBottom: 24,
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

      {/* Search Input Card */}
      <div
        style={{
          background: '#fff',
          borderRadius: 18,
          border: '1.5px solid #E2E8F0',
          padding: '24px 20px',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
          marginBottom: 24,
        }}
      >
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <Search
            size={20}
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94A3B8',
            }}
          />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search code or keywords in English & Hinglish (e.g. 6109, rice, kapda, footwear)..."
            style={{
              width: '100%',
              height: 52,
              paddingLeft: 48,
              paddingRight: 40,
              fontSize: 16,
              borderRadius: 12,
              border: '1.5px solid #CBD5E1',
              outline: 'none',
              boxSizing: 'border-box',
              color: '#0F172A',
              background: '#F8FAFC',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = '#F97316')}
            onBlur={e => (e.target.style.borderColor = '#CBD5E1')}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                position: 'absolute',
                right: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                background: '#E2E8F0',
                border: 'none',
                borderRadius: '50%',
                width: 22,
                height: 22,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569',
                fontSize: 12,
                fontWeight: 'bold',
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Search Suggestions */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#64748B', fontWeight: 600, marginRight: 4 }}>Popular:</span>
          {POPULAR_SEARCHES.map(item => (
            <button
              key={item.label}
              onClick={() => {
                setQuery(item.query)
                if (item.query === '9954') setActiveTab('sac')
                else setActiveTab('hsn')
              }}
              style={{
                background: '#F1F5F9',
                border: '1px solid #E2E8F0',
                borderRadius: 20,
                padding: '4px 12px',
                fontSize: 12,
                color: '#334155',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#FED7AA'
                e.currentTarget.style.color = '#9A3412'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#F1F5F9'
                e.currentTarget.style.color = '#334155'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs for Goods (HSN) and Services (SAC) */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, borderBottom: '1px solid #E2E8F0', paddingBottom: 12 }}>
        <button
          onClick={() => setActiveTab('hsn')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            borderRadius: 10,
            border: activeTab === 'hsn' ? '2px solid #F97316' : '1px solid #E2E8F0',
            background: activeTab === 'hsn' ? '#FFF7ED' : '#fff',
            color: activeTab === 'hsn' ? '#C2410C' : '#475569',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          <Package size={18} color={activeTab === 'hsn' ? '#F97316' : '#64748B'} />
          Goods (HSN)
          <span
            style={{
              background: activeTab === 'hsn' ? '#F97316' : '#E2E8F0',
              color: activeTab === 'hsn' ? '#fff' : '#475569',
              borderRadius: 12,
              padding: '2px 8px',
              fontSize: 11,
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
            borderRadius: 10,
            border: activeTab === 'sac' ? '2px solid #F97316' : '1px solid #E2E8F0',
            background: activeTab === 'sac' ? '#FFF7ED' : '#fff',
            color: activeTab === 'sac' ? '#C2410C' : '#475569',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          <Briefcase size={18} color={activeTab === 'sac' ? '#F97316' : '#64748B'} />
          Services (SAC)
          <span
            style={{
              background: activeTab === 'sac' ? '#F97316' : '#E2E8F0',
              color: activeTab === 'sac' ? '#fff' : '#475569',
              borderRadius: 12,
              padding: '2px 8px',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            {loading ? '...' : sacCount}
          </span>
        </button>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>
          {query.trim()
            ? `Showing top ${results.length} result${results.length === 1 ? '' : 's'} for "${query}"`
            : `Showing popular ${activeTab === 'hsn' ? 'HSN headings' : 'SAC service codes'}`}
        </p>
        <span style={{ fontSize: 13, color: '#94A3B8' }}>Click card or heading for full tariff breakdown</span>
      </div>

      {/* Results List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748B' }}>
          <p style={{ fontSize: 16 }}>Loading HSN & SAC index...</p>
        </div>
      ) : results.length === 0 ? (
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            border: '1px solid #E2E8F0',
            padding: '48px 24px',
            textAlign: 'center',
          }}
        >
          <AlertCircle size={36} color="#94A3B8" style={{ marginBottom: 12 }} />
          <h3 style={{ fontSize: 18, color: '#0F172A', marginBottom: 8 }}>No matching codes found</h3>
          <p style={{ fontSize: 14, color: '#64748B', maxWidth: 460, margin: '0 auto 20px' }}>
            We could not find any {activeTab === 'hsn' ? 'goods heading' : 'service code'} matching &ldquo;{query}&rdquo;. Try another term, spelling, or chapter number.
          </p>
          <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '16px', maxWidth: 520, margin: '0 auto', textAlign: 'left', border: '1px solid #E2E8F0' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: '0 0 6px 0' }}>
              Residual GST Rule for Goods:
            </p>
            <p style={{ fontSize: 13, color: '#475569', margin: 0, lineHeight: 1.6 }}>
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
                  background: '#fff',
                  borderRadius: 16,
                  border: '1.5px solid #E2E8F0',
                  padding: '24px 22px',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
                  transition: 'border-color 0.2s',
                }}
              >
                {/* Card Top: Code Pill, Type, Copy Button, Detail Link */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span
                      style={{
                        background: '#0F172A',
                        color: '#fff',
                        fontFamily: 'monospace',
                        fontSize: 16,
                        fontWeight: 700,
                        padding: '6px 14px',
                        borderRadius: 8,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {item.t.toUpperCase()} {item.c}
                    </span>
                    <button
                      onClick={() => handleCopy(item.c)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '6px 10px',
                        borderRadius: 8,
                        border: '1px solid #CBD5E1',
                        background: '#F8FAFC',
                        fontSize: 12,
                        fontWeight: 600,
                        color: copiedCode === item.c ? '#16A34A' : '#475569',
                        cursor: 'pointer',
                      }}
                      title="Copy code to clipboard"
                    >
                      {copiedCode === item.c ? (
                        <>
                          <Check size={14} color="#16A34A" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy Code
                        </>
                      )}
                    </button>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: item.t === 'hsn' ? '#EA580C' : '#0284C7',
                        background: item.t === 'hsn' ? '#FFF7ED' : '#F0F9FF',
                        border: `1px solid ${item.t === 'hsn' ? '#FFEDD5' : '#E0F2FE'}`,
                        padding: '3px 8px',
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
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#F97316',
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
                  <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 16px 0', lineHeight: 1.6 }}>
                    <span style={{ fontWeight: 600, color: '#475569' }}>Classification Chain:</span> {fullChain}
                  </p>
                )}

                {/* Rates Section */}
                {item.t === 'hsn' ? (
                  <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '14px 16px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', marginBottom: 10 }}>
                      Applicable GST Rates & Conditions
                    </div>
                    {item.r && item.r.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {item.r.map((r, rIdx) => (
                          <div
                            key={rIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 12,
                              paddingBottom: rIdx < item.r.length - 1 ? 10 : 0,
                              borderBottom: rIdx < item.r.length - 1 ? '1px dashed #CBD5E1' : 'none',
                            }}
                          >
                            <div style={{ flexShrink: 0 }}>
                              <span
                                style={{
                                  display: 'inline-block',
                                  background: r.gst === 0 ? '#ECFDF5' : r.cess ? '#FEF2F2' : '#FFF7ED',
                                  color: r.gst === 0 ? '#059669' : r.cess ? '#DC2626' : '#C2410C',
                                  border: `1px solid ${r.gst === 0 ? '#A7F3D0' : r.cess ? '#FECACA' : '#FED7AA'}`,
                                  fontWeight: 800,
                                  fontSize: 13,
                                  padding: '4px 10px',
                                  borderRadius: 6,
                                }}
                              >
                                {formatRateHeadline(r)}
                              </span>
                              {r.isSubCode && (
                                <div style={{ fontSize: 10, color: '#D97706', fontWeight: 600, marginTop: 3 }}>
                                  Applies to some sub-codes
                                </div>
                              )}
                            </div>
                            <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.5, flex: 1 }}>
                              {r.d}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ fontSize: 13, color: '#475569' }}>
                        <span style={{ fontWeight: 700, color: '#0F172A' }}>
                          Not specifically listed in the rate schedules. Residual entry: 18%
                        </span>
                        <p style={{ margin: '4px 0 0 0', fontSize: 12, color: '#64748B' }}>
                          Goods not specified elsewhere are taxed at 18% (CGST 9% + SGST 9%) as per Schedule II, S. No. 639
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* SAC Services Rate Notice */
                  <div style={{ background: '#F0F9FF', borderRadius: 12, padding: '14px 16px', border: '1px solid #BAE6FD' }}>
                    <p style={{ fontSize: 13, color: '#0369A1', margin: '0 0 10px 0', lineHeight: 1.6 }}>
                      Service GST rates are being added to our direct search database.
                    </p>
                    <a
                      href="https://www.gst.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        background: '#0284C7',
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: 600,
                        padding: '8px 16px',
                        borderRadius: 8,
                        textDecoration: 'none',
                      }}
                    >
                      Check service GST rate on the official GST portal <ExternalLink size={14} />
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
