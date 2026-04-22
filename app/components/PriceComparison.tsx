'use client'
import { useEffect, useRef, useState } from 'react'

export default function PriceComparison() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  return (
    <section style={{ background: '#F0FDF4', padding: 'clamp(48px, 6vw, 72px) var(--section-px)' }} ref={ref}>
      <style suppressHydrationWarning>{`
        .pc-inner { max-width: 720px; margin: 0 auto; }
        .pc-header { text-align: center; margin-bottom: 48px; }
        .pc-heading { font-size: clamp(32px, 4vw, 44px); font-weight: 400; color: #0f172a; line-height: 1.15; margin-bottom: 16px; font-family: var(--font-display); }
        .pc-sub { font-size: 16px; color: #475569; max-width: 600px; margin: 0 auto; line-height: 1.6; }
        
        .table-wrap { width: 100%; overflow-x: auto; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-radius: 12px; }
        .pc-table { width: 100%; border-collapse: collapse; background: #fff; min-width: 600px; }
        .pc-table th, .pc-table td { padding: 16px 20px; text-align: left; border-bottom: 1px solid #E2E8F0; font-size: 15px; }
        .pc-table th { background: #0F172A; color: #fff; font-weight: 600; }
        .pc-table .th-udyog { color: #F97316; }
        .pc-table td:first-child { font-weight: 500; color: #0f172a; width: 40%; }
        .pc-table td:not(:first-child) { text-align: center; }
        
        .pc-check { color: #16A34A; font-weight: bold; }
        .pc-x { color: #94A3B8; }
        
        .price-row td { padding: 24px 20px; background: #F8FAFC; }
        .price-row td:first-child { font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em; font-size: 13px; }
        .price-cross { color: #94A3B8; text-decoration: line-through; font-size: 16px; font-weight: 600; }
        .price-udyog { color: #16A34A; font-size: 24px; font-weight: 800; display: block; }
        
        .pc-cta-wrap { text-align: center; }
      `}</style>
      
      <div className={`pc-inner fade-up${visible ? ' visible' : ''}`}>
        <div className="pc-header">
          <h2 className="pc-heading">10x cheaper than competitors. More features too.</h2>
          <p className="pc-sub">Same GST billing. Same inventory. Plus voice billing and CA portal — at a fraction of the price.</p>
        </div>
        
        <div className="table-wrap">
          <table className="pc-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Vyapar</th>
                <th>myBillBook</th>
                <th className="th-udyog">Udyog</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Voice billing (Hinglish)</td>
                <td><span className="pc-x">✗</span></td>
                <td><span className="pc-x">✗</span></td>
                <td><span className="pc-check">✓ Maya AI*</span></td>
              </tr>
              <tr>
                <td>CA collaboration portal</td>
                <td><span className="pc-x">✗</span></td>
                <td><span className="pc-x">✗</span></td>
                <td><span className="pc-check">✓</span></td>
              </tr>
              <tr>
                <td>Rental business support</td>
                <td><span className="pc-x">✗</span></td>
                <td><span className="pc-x">✗</span></td>
                <td><span className="pc-check">✓</span></td>
              </tr>
              <tr>
                <td>Free plan (unlimited invoices)</td>
                <td><span className="pc-x">✗</span></td>
                <td><span className="pc-x">✗</span></td>
                <td><span className="pc-check">✓</span></td>
              </tr>
              <tr className="price-row">
                <td>Annual price</td>
                <td><span className="price-cross">₹599/mo</span></td>
                <td><span className="price-cross">₹399/mo</span></td>
                <td><span className="price-udyog">₹149/mo</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="pc-cta-wrap">
          <a href="/pricing" className="btn-orange">Switch to Udyog — ₹149/mo →</a>
          <p style={{ fontSize: 12, color: '#64748b', marginTop: 12 }}>*Maya AI is not included in the Basic plan.</p>
        </div>
      </div>
    </section>
  )
}
