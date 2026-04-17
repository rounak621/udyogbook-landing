'use client'
import { useEffect, useRef, useState } from 'react'

const INDUSTRIES = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
    name: 'Kirana & Grocery',
    desc: 'Bill daily walk-in customers in seconds. Track stock automatically so you never run out.',
    bullets: ["Voice billing in Hindi/Hinglish", "Auto stock deduction on every sale", "Daily cash report in one tap"]
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/></svg>,
    name: 'Textile & Clothing',
    desc: 'Manage fabric inventory by colour, size, and design. Handle bulk orders and seasonal stock.',
    bullets: ["Item variants — size, colour, design", "Bulk invoice creation", "Seasonal inventory reports"]
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
    name: 'Camera & Equipment Rental',
    desc: 'Track exactly which equipment is with which customer. Auto-calculate late fees and deposits.',
    bullets: ["Equipment check-in/check-out tracking", "Automatic late fee calculation", "GST on rental services (SAC 997319)"]
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
    name: 'Restaurants & Food',
    desc: 'Table billing, food GST rates, and daily sales reports — all in one place.',
    bullets: ["5% GST on restaurant food auto-applied", "Table-wise billing", "Daily sales summary report"]
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>,
    name: 'Freelancers & Consultants',
    desc: 'Service invoices with SAC codes, TDS tracking, and a CA portal for smooth tax filing.',
    bullets: ["SAC code auto-fill for services", "TDS deduction tracking", "Share invoices with CA directly"]
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    name: 'CA Firms & Accountants',
    desc: 'Manage multiple client businesses from one CA portal login. No more WhatsApp for documents.',
    bullets: ["Multiple client accounts in one login", "Direct access to client financials", "GSTR-1 report generation per client"]
  },
]

export default function Industries() {
  const [visible, setVisible] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  const selected = INDUSTRIES[selectedIdx]

  return (
    <section style={{ padding: 'clamp(60px,8vw,100px) var(--section-px)', background: '#F8FAFC' }} ref={ref}>
      <style suppressHydrationWarning>{`
        .ind-wrap { max-width: 1100px; margin: 0 auto; }
        .ind-head { text-align: center; margin-bottom: 48px; }
        .ind-layout { display: grid; grid-template-columns: 320px 1fr; gap: 40px; }
        
        .ind-sidebar { display: flex; flex-direction: column; gap: 4px; }
        .ind-item {
          padding: 12px 16px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 10px;
          border-left: 3px solid transparent; transition: all 0.2s;
          color: #475569;
        }
        .ind-item svg { color: #F97316; flex-shrink: 0; }
        .ind-item-label { font-size: 15px; font-weight: 500; }
        .ind-item:hover { background: #fff; }
        .ind-item.active {
          background: #FFF7ED; color: #F97316; border-left-color: #F97316;
        }
        .ind-item.active:hover { background: #FFF7ED; }
        
        .ind-panel { background: #0F172A; border-radius: 16px; padding: 40px; color: #fff; }
        .ind-p-title { font-family: var(--font-display); font-size: 32px; font-weight: 400; margin-bottom: 16px; }
        .ind-p-desc { font-size: 15px; color: rgba(255,255,255,0.6); line-height: 1.6; margin-bottom: 32px; }
        .ind-p-bullets { list-style: none; padding: 0; margin: 0 0 40px 0; display: flex; flex-direction: column; gap: 16px; }
        .ind-p-bullet { display: flex; align-items: flex-start; gap: 12px; font-size: 15px; color: rgba(255,255,255,0.85); }
        .ind-p-check { color: #F97316; font-weight: bold; flex-shrink: 0; }
        .ind-p-link { color: #F97316; font-weight: 600; font-size: 15px; display: inline-flex; align-items: center; gap: 6px; }
        .ind-p-link:hover { text-decoration: underline; }

        .ind-mobile { display: none; }
        @media (max-width: 800px) {
          .ind-layout { display: none; }
          .ind-mobile { display: flex; flex-direction: column; gap: 24px; }
          .ind-mob-card { background: #0F172A; border-radius: 16px; padding: 32px; color: #fff; }
          .ind-mob-head { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
          .ind-mob-head svg { color: #F97316; flex-shrink: 0; }
          .ind-mob-title { font-family: var(--font-display); font-size: 24px; font-weight: 400; }
        }
      `}</style>
      
      <div className="ind-wrap" ref={ref}>
        <div className={`ind-head fade-up${visible ? ' visible' : ''}`}>
          <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,44px)', marginBottom: 16, color: '#0f172a' }}>
            Built for every Indian business.
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', maxWidth: 480, margin: '0 auto' }}>
            From kirana stores to CA firms — Udyog works for your business type.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className={`ind-layout fade-up d1${visible ? ' visible' : ''}`}>
          <div className="ind-sidebar">
            {INDUSTRIES.map((ind, i) => (
              <div 
                key={ind.name} 
                className={`ind-item ${selectedIdx === i ? 'active' : ''}`}
                onClick={() => setSelectedIdx(i)}
              >
                {ind.icon}
                <span className="ind-item-label">{ind.name}</span>
              </div>
            ))}
          </div>
          <div className="ind-panel">
            <h3 className="ind-p-title">{selected.name}</h3>
            <p className="ind-p-desc">{selected.desc}</p>
            <ul className="ind-p-bullets">
              {selected.bullets.map((b, i) => (
                <li key={i} className="ind-p-bullet">
                  <span className="ind-p-check">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <a href="#" className="ind-p-link">Learn more →</a>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className={`ind-mobile fade-up d1${visible ? ' visible' : ''}`}>
          {INDUSTRIES.map((ind, i) => (
            <div key={ind.name} className="ind-mob-card">
              <div className="ind-mob-head">
                {ind.icon}
                <h3 className="ind-mob-title">{ind.name}</h3>
              </div>
              <p className="ind-p-desc" style={{ marginBottom: 24 }}>{ind.desc}</p>
              <ul className="ind-p-bullets" style={{ marginBottom: 24 }}>
                {ind.bullets.map((b, i) => (
                  <li key={i} className="ind-p-bullet">
                    <span className="ind-p-check">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="ind-p-link">Learn more →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
