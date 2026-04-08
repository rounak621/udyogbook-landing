'use client'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: '5,000+', label: 'Businesses trust Udyog' },
  { value: '8 sec', label: 'To create a GST invoice' },
  { value: '₹500Cr+', label: 'Invoiced on platform' },
  { value: '4.9/5', label: 'Average rating' },
  { value: '99.9%', label: 'Uptime guaranteed' },
]

export default function StatsBar() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  return (
    <section style={{ background: '#0F172A', padding: 'clamp(40px,5vw,64px) var(--section-px)' }} ref={ref}>
      <style suppressHydrationWarning>{`
        .stats-inner { max-width: 1280px; margin: 0 auto; }
        .stats-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; }
        .stat-item { text-align: center; padding: 16px 12px; border-right: 1px solid rgba(255,255,255,0.08); }
        .stat-item:last-child { border-right: none; }
        .stat-val { font-size: clamp(28px, 4vw, 42px); font-weight: 800; color: #F97316; letter-spacing: -0.03em; line-height: 1; margin-bottom: 8px; }
        .stat-label { font-size: 13px; color: rgba(255,255,255,0.5); font-weight: 500; line-height: 1.4; }
        @media (max-width: 700px) { .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 1px; background: rgba(255,255,255,0.08); } .stat-item { background: #0F172A; border-right: none; } }
      `}</style>
      <div className="stats-inner">
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className={`stat-item fade-up d${i+1}${visible ? ' visible' : ''}`}>
              <p className="stat-val">{s.value}</p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
