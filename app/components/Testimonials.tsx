'use client'
import { useEffect, useRef, useState } from 'react'
import { Star } from 'lucide-react'

const TESTIMONIALS = [
  { text: 'Maya ne mera kaam aadha kar diya. Bolke bill banata hoon ab — koi typing nahi, koi calculation nahi.', name: 'Rajesh Sharma', role: 'Textile Trader', location: 'Surat, Gujarat', avatar: 'RS', color: '#f97316' },
  { text: 'Finally a tool where my clients and I are on the same page. The CA portal saves me 3 hours every filing cycle.', name: 'Priya Mehta', role: 'Chartered Accountant', location: 'Mumbai, Maharashtra', avatar: 'PM', color: '#8b5cf6' },
  { text: 'GST filing used to be a nightmare. Now my CA does it in minutes from the portal without bothering me.', name: 'Anil Gupta', role: 'Electronics Retailer', location: 'Delhi', avatar: 'AG', color: '#0ea5e9' },
  { text: 'Inventory tracking is seamless. Every sale and purchase auto-updates stock. I always know what I have.', name: 'Sunita Patel', role: 'FMCG Distributor', location: 'Ahmedabad, Gujarat', avatar: 'SP', color: '#10b981' },
  { text: 'WhatsApp reminders have reduced my outstanding receivables by 40%. Customers actually pay on time now.', name: 'Manoj Verma', role: 'Pharma Distributor', location: 'Indore, MP', avatar: 'MV', color: '#ec4899' },
  { text: 'As a new business owner with no accounting background, Udyog made it dead simple. Strongly recommended.', name: 'Ritu Singh', role: 'Boutique Owner', location: 'Jaipur, Rajasthan', avatar: 'RS', color: '#f59e0b' },
]

export default function Testimonials() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{ padding: 'clamp(60px, 8vw, 100px) var(--section-px)', background: '#fff' }}>
      <style suppressHydrationWarning>{`
        .t-inner { max-width: var(--max-w); margin: 0 auto; }
        .t-header { text-align: center; margin-bottom: 48px; }
        .t-stars-row { display: flex; justify-content: center; align-items: center; gap: 4px; margin-top: 12px; }
        .t-rating-text { font-size: 14px; color: var(--gray-400); margin-left: 6px; }
        .t-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .t-card {
          background: var(--white); border: 1px solid var(--gray-200);
          border-radius: 18px; padding: 26px;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex; flex-direction: column;
        }
        .t-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.07); }
        .t-card-stars { display: flex; gap: 2px; margin-bottom: 14px; }
        .t-text { font-size: 15px; color: #333; line-height: 1.7; font-style: italic; flex: 1; margin-bottom: 20px; }
        .t-author { display: flex; align-items: center; gap: 11px; }
        .t-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 13px; flex-shrink: 0; font-family: var(--font-body); }
        .t-name { font-size: 14px; font-weight: 600; }
        .t-roleloc { font-size: 12px; color: var(--gray-400); margin-top: 2px; }
        @media (max-width: 900px) { .t-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .t-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div className="t-inner" ref={ref}>
        <div className={`t-header fade-up${visible ? ' visible' : ''}`}>
          <span className="section-label">Testimonials</span>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: 8 }}>
            Businesses <span className="italic text-orange">love</span> Udyog
          </h2>
          <div className="t-stars-row">
            {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />)}
            <span className="t-rating-text">4.9 / 5 from 2,300+ reviews</span>
          </div>
        </div>

        <div className="t-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name + i} className={`t-card fade-up d${(i % 3) + 1}${visible ? ' visible' : ''}`}>
              <div className="t-card-stars">
                {[1,2,3,4,5].map(j => <Star key={j} size={13} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <p className="t-text">&ldquo;{t.text}&rdquo;</p>
              <div className="t-author">
                <div className="t-avatar" style={{ background: t.color }}>{t.avatar}</div>
                <div>
                  <p className="t-name">{t.name}</p>
                  <p className="t-roleloc">{t.role} · {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
