'use client'
import { useEffect, useRef, useState } from 'react'
import { Shirt, Pill, ShoppingCart, Cpu, HardHat, UtensilsCrossed, Car, Truck } from 'lucide-react'

const INDUSTRIES = [
  { Icon: Shirt, name: 'Textile & Garments', desc: 'Manage fabric orders, GST on apparel, and supplier payments', color: '#F97316' },
  { Icon: Pill, name: 'Pharmacy & Medical', desc: 'Batch tracking, expiry alerts, and drug GST rates auto-applied', color: '#10b981' },
  { Icon: ShoppingCart, name: 'Retail & Grocery', desc: 'Fast POS billing, barcode scanning, and daily stock reports', color: '#0ea5e9' },
  { Icon: Cpu, name: 'Electronics', desc: 'Serial number tracking, warranty management, and GST invoicing', color: '#8b5cf6' },
  { Icon: HardHat, name: 'Construction', desc: 'Material billing, contractor payments, and project tracking', color: '#f59e0b' },
  { Icon: UtensilsCrossed, name: 'Food & Beverages', desc: 'Restaurant billing, table management, and daily sales reports', color: '#ec4899' },
  { Icon: Car, name: 'Auto & Spare Parts', desc: 'Parts inventory, service billing, and customer vehicle history', color: '#14b8a6' },
  { Icon: Truck, name: 'Wholesale & Distribution', desc: 'Bulk orders, dealer pricing, and receivables management', color: '#f97316' },
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
        .ind-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .ind-card {
          background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 16px;
          padding: 24px 20px; transition: all 0.25s; cursor: pointer;
        }
        .ind-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); border-color: var(--card-color); background: #fff; }
        .ind-icon-wrap { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
        .ind-name { font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 6px; }
        .ind-desc { font-size: 13px; color: #64748b; line-height: 1.55; }
        @media (max-width: 900px) { .ind-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .ind-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="ind-inner" ref={ref}>
        <div className={`ind-header fade-up${visible ? ' visible' : ''}`}>
          <span className="section-label">Industry Solutions</span>
          <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,44px)', marginBottom: 12, color: '#0f172a' }}>
            Built for <span className="italic" style={{ color: '#F97316' }}>every Indian business</span>
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', maxWidth: 480, margin: '0 auto' }}>
            Whether you sell clothes, medicine, or electronics — Udyog is tailored for your industry.
          </p>
        </div>
        <div className="ind-grid">
          {INDUSTRIES.map(({ Icon, name, desc, color }, i) => (
            <div key={name} className={`ind-card fade-up d${(i%4)+1}${visible ? ' visible' : ''}`} style={{ '--card-color': color } as React.CSSProperties}>
              <div className="ind-icon-wrap" style={{ background: color + '18' }}>
                <Icon size={24} color={color} strokeWidth={1.75} />
              </div>
              <p className="ind-name">{name}</p>
              <p className="ind-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
