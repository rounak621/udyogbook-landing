'use client'
import { useEffect, useRef, useState } from 'react'

export default function StatsBar() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  return (
    <section style={{ background: '#0F172A', padding: 'clamp(40px,5vw,50px) var(--section-px)', textAlign: 'center' }} ref={ref}>
      <style suppressHydrationWarning>{`
        .stats-inner { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 20px; }
        .trust-heading { color: #fff; font-size: 18px; font-weight: 500; font-family: var(--font-display); letter-spacing: 0.02em; }
        .trust-pills { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
        .trust-pill { background: rgba(249,115,22,0.1); color: #F97316; border-radius: 100px; font-size: 12px; padding: 4px 12px; font-weight: 600; }
      `}</style>
      <div className={`stats-inner fade-up${visible ? ' visible' : ''}`}>
        <h3 className="trust-heading">Trusted by 5,000+ Indian businesses</h3>
        <div className="trust-pills">
          <span className="trust-pill">Kirana Stores</span>
          <span className="trust-pill">Textile Shops</span>
          <span className="trust-pill">CA Firms</span>
          <span className="trust-pill">Rental Businesses</span>
        </div>
      </div>
    </section>
  )
}
