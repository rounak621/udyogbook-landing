'use client'
import { useEffect, useRef, useState } from 'react'

const INDUSTRIES = [
  { icon: '🛒', title: 'Kirana & Grocery', desc: 'Bill daily customers in seconds, track stock automatically' },
  { icon: '👗', title: 'Textile & Clothing', desc: 'Manage fabric inventory, sizes, and seasonal stock' },
  { icon: '📷', title: 'Camera & Equipment Rental', desc: 'Track equipment, auto-calculate late fees, rental invoices' },
  { icon: '🍽️', title: 'Restaurants & Food', desc: 'Table billing, GST on food, daily sales reports' },
  { icon: '💼', title: 'Freelancers & Consultants', desc: 'Service invoices with SAC codes, TDS tracking, CA portal' },
  { icon: '📊', title: 'CA Firms & Accountants', desc: 'Manage multiple client accounts from one CA portal login' },
]

export default function Industries() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  return (
    <section style={{ padding: 'clamp(60px,8vw,100px) var(--section-px)', background: '#fff' }} ref={ref}>
      <style suppressHydrationWarning>{`
        .ind-inner { max-width: 1280px; margin: 0 auto; }
        .ind-header { text-align: center; margin-bottom: 48px; }
        .ind-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .ind-card {
          background: #fff; border: 1px solid #E2E8F0; border-radius: 16px;
          padding: 24px; transition: all 0.2s; cursor: pointer;
        }
        .ind-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .ind-emoji { font-size: 32px; margin-bottom: 16px; display: block; }
        .ind-title { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
        .ind-desc { font-size: 13px; color: #64748b; line-height: 1.6; }
        @media (max-width: 900px) { .ind-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .ind-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="ind-inner" ref={ref}>
        <div className={`ind-header fade-up${visible ? ' visible' : ''}`}>
          <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,44px)', marginBottom: 16, color: '#0f172a' }}>
            Built for every Indian business.
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', maxWidth: 480, margin: '0 auto' }}>
            From kirana stores to CA firms — Udyog works for your business type.
          </p>
        </div>
        <div className="ind-grid">
          {INDUSTRIES.map((ind, i) => (
            <div key={ind.title} className={`ind-card fade-up d${(i%3)+1}${visible ? ' visible' : ''}`}>
              <span className="ind-emoji">{ind.icon}</span>
              <p className="ind-title">{ind.title}</p>
              <p className="ind-desc">{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
