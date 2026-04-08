'use client'
import { useEffect, useRef, useState } from 'react'
import { Check, X } from 'lucide-react'

const FEATURES = [
  { name: 'Voice billing (Hinglish)', udyog: true, billbook: false, vyapar: false },
  { name: 'GST-compliant invoices', udyog: true, billbook: true, vyapar: true },
  { name: 'CA dedicated portal', udyog: true, billbook: false, vyapar: false },
  { name: 'Inventory management', udyog: true, billbook: true, vyapar: true },
  { name: 'WhatsApp payment reminders', udyog: true, billbook: true, vyapar: false },
  { name: 'Real-time dashboard', udyog: true, billbook: true, vyapar: true },
  { name: 'Multi-business support', udyog: true, billbook: true, vyapar: true },
  { name: 'Rental Equipment Management', udyog: true, billbook: false, vyapar: false },
  { name: 'Starting price', udyog: '₹149/mo', billbook: '₹399/mo', vyapar: '₹599/mo' },
]

export default function ComparisonTable() {
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
        .cmp-inner { max-width: 900px; margin: 0 auto; }
        .cmp-header { text-align: center; margin-bottom: 48px; }
        .cmp-table { width: 100%; border-collapse: collapse; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .cmp-th { padding: 16px 20px; text-align: center; font-size: 14px; font-weight: 700; }
        .cmp-th.udyog-col { background: #F97316; color: #fff; }
        .cmp-th.other-col { background: #f8f8f8; color: #666; }
        .cmp-th.feat-col { background: #f8f8f8; color: #333; text-align: left; }
        .cmp-tr:nth-child(even) td { background: #fafafa; }
        .cmp-tr:nth-child(even) td.udyog-val { background: #FFF5E6; }
        .cmp-td { padding: 14px 20px; font-size: 14px; color: #555; border-bottom: 1px solid #f0f0f0; text-align: center; }
        .cmp-td.feat-name { text-align: left; font-weight: 500; color: #333; }
        .cmp-td.udyog-val { background: #FFFBF5; font-weight: 700; color: #333; }
        .cmp-check { color: #16a34a; }
        .cmp-cross { color: #dc2626; }
        .cmp-price-udyog { color: #F97316; font-size: 16px; font-weight: 800; }
        @media (max-width: 600px) { .cmp-table { font-size: 12px; } .cmp-td, .cmp-th { padding: 10px 12px; } }
      `}</style>

      <div className="cmp-inner" ref={ref}>
        <div className={`cmp-header fade-up${visible ? ' visible' : ''}`}>
          <span className="section-label">Why Udyog</span>
          <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,44px)', marginBottom: 12 }}>
            More features, <span className="italic" style={{ color: '#F97316' }}>lower price</span>
          </h2>
          <p style={{ fontSize: 16, color: '#666' }}>See how Udyog compares to other billing software in India.</p>
        </div>

        <div className={`fade-up${visible ? ' visible' : ''}`} style={{ overflowX: 'auto' }}>
          <table className="cmp-table">
            <thead>
              <tr>
                <th className="cmp-th feat-col">Feature</th>
                <th className="cmp-th udyog-col">Udyog ⭐</th>
                <th className="cmp-th other-col">myBillBook</th>
                <th className="cmp-th other-col">Vyapar</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((f, i) => (
                <tr key={f.name} className="cmp-tr">
                  <td className="cmp-td feat-name">{f.name}</td>
                  <td className="cmp-td udyog-val">
                    {typeof f.udyog === 'boolean'
                      ? f.udyog ? <Check size={18} className="cmp-check" style={{ margin: '0 auto', color: '#16a34a' }} />
                        : <X size={18} className="cmp-cross" style={{ margin: '0 auto', color: '#dc2626' }} />
                      : <span className="cmp-price-udyog">{f.udyog}</span>}
                  </td>
                  <td className="cmp-td">
                    {typeof f.billbook === 'boolean'
                      ? f.billbook ? <Check size={18} style={{ margin: '0 auto', color: '#16a34a' }} />
                        : <X size={18} style={{ margin: '0 auto', color: '#dc2626' }} />
                      : f.billbook}
                  </td>
                  <td className="cmp-td">
                    {typeof f.vyapar === 'boolean'
                      ? f.vyapar ? <Check size={18} style={{ margin: '0 auto', color: '#16a34a' }} />
                        : <X size={18} style={{ margin: '0 auto', color: '#dc2626' }} />
                      : f.vyapar}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
