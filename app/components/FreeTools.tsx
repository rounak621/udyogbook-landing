'use client'
import { useEffect, useRef, useState } from 'react'

export default function FreeTools() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="freetools" style={{ padding: '96px 20px', background: '#fff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }} ref={ref}>

        {/* Header */}
        <div className={`fade-up${visible ? ' visible' : ''}`} style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#fff7ed', color: '#f97316', padding: '6px 16px',
            borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 16,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
            </svg>
            Free Tools
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#111827', marginBottom: 14, lineHeight: 1.2 }}>
            Free tools for Indian businesses
          </h2>
          <p style={{ fontSize: 17, color: '#6b7280', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
            No signup required. Use them right now.
          </p>
        </div>

        {/* Cards Grid */}
        <div className={`fade-up d1${visible ? ' visible' : ''}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>

          {/* GST Calculator */}
          <a href="/gst-calculator" style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#fff', borderRadius: 20, border: '1.5px solid #e5e7eb',
              padding: '32px 28px', height: '100%', boxSizing: 'border-box',
              transition: 'all 0.2s', cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#f97316'
              el.style.boxShadow = '0 8px 32px rgba(249,115,22,0.12)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#e5e7eb'
              el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
              el.style.transform = 'translateY(0)'
            }}
            >
              <div style={{
                width: 56, height: 56, background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20, border: '1px solid #fed7aa',
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>GST Calculator</h3>
                <span style={{ background: '#f0fdf4', color: '#16a34a', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20, border: '1px solid #bbf7d0' }}>FREE</span>
              </div>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, marginBottom: 24 }}>
                Calculate CGST, SGST, and IGST instantly for any amount and GST slab. Free, no account needed.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f97316', fontSize: 14, fontWeight: 600 }}>
                Open Calculator
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </a>

          {/* Free Invoice Templates */}
          <a href="/invoice-template" style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#fff', borderRadius: 20, border: '1.5px solid #e5e7eb',
              padding: '32px 28px', height: '100%', boxSizing: 'border-box',
              transition: 'all 0.2s', cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#f97316'
              el.style.boxShadow = '0 8px 32px rgba(249,115,22,0.12)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#e5e7eb'
              el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
              el.style.transform = 'translateY(0)'
            }}
            >
              <div style={{
                width: 56, height: 56, background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20, border: '1px solid #fed7aa',
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>Invoice Templates</h3>
                <span style={{ background: '#f0fdf4', color: '#16a34a', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20, border: '1px solid #bbf7d0' }}>FREE</span>
              </div>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, marginBottom: 24 }}>
                Download GST-compliant invoice templates in HTML format. All mandatory fields included.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f97316', fontSize: 14, fontWeight: 600 }}>
                Download Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </a>

          {/* Digital Signature Maker */}
          <a href="/tools/digital-signature" style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#fff', borderRadius: 20, border: '1.5px solid #e5e7eb',
              padding: '32px 28px', height: '100%', boxSizing: 'border-box',
              transition: 'all 0.2s', cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#f97316'
              el.style.boxShadow = '0 8px 32px rgba(249,115,22,0.12)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#e5e7eb'
              el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
              el.style.transform = 'translateY(0)'
            }}
            >
              <div style={{
                width: 56, height: 56, background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20, border: '1px solid #fed7aa',
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>Digital Signature</h3>
                <span style={{ background: '#f0fdf4', color: '#16a34a', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20, border: '1px solid #bbf7d0' }}>FREE</span>
              </div>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, marginBottom: 24 }}>
                Create professional digital signatures online. Draw, type or upload — download as transparent PNG for your GST invoices.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f97316', fontSize: 14, fontWeight: 600 }}>
                Create Free Signature
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </a>

        </div>
      </div>
    </section>
  )
}
