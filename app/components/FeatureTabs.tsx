'use client'
import { useEffect, useRef, useState } from 'react'
import { FileText, Package, BarChart3, Shield, Mic2, MessageCircle } from 'lucide-react'

const TABS = [
  {
    id: 'billing',
    label: 'Billing',
    Icon: FileText,
    heading: 'Create GST invoices in 8 seconds',
    desc: 'Generate professional GST-compliant invoices with auto-calculated CGST, SGST, IGST. Share via WhatsApp, email, or PDF instantly.',
    points: ['Auto GST calculation', 'Multiple invoice themes', 'WhatsApp & email sharing', 'Bulk invoice creation', 'Payment tracking'],
  },
  {
    id: 'voice',
    label: 'Voice Billing',
    Icon: Mic2,
    heading: 'Just speak — Maya creates the bill',
    desc: 'India\'s first voice-powered billing. Say "Ravi Traders ka bill banao" in Hinglish and Maya creates, calculates, and confirms the invoice.',
    points: ['Hinglish voice support', 'Auto party matching', 'GST auto-applied', 'Confirm before saving', 'Works offline too'],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    Icon: Package,
    heading: 'Real-time stock management',
    desc: 'Track every item automatically. Stock updates with every sale and purchase. Get low-stock alerts before you run out.',
    points: ['Auto stock update', 'Low stock alerts', 'Multiple warehouses', 'Batch & expiry tracking', 'Barcode support'],
  },
  {
    id: 'reports',
    label: 'Reports',
    Icon: BarChart3,
    heading: 'Business insights at a glance',
    desc: 'Know your best-selling products, top customers, and monthly trends. Export data for CA in one click.',
    points: ['P&L statement', 'GST reports (GSTR-1, 3B)', 'Sales & purchase reports', 'Party ledger', 'CA export ready'],
  },
  {
    id: 'gst',
    label: 'GST & CA',
    Icon: Shield,
    heading: 'GST compliance made effortless',
    desc: 'Invite your CA directly. They get their own portal to file GST, view financials, and run reconciliations — no back-and-forth.',
    points: ['CA dedicated portal', 'GSTR filing support', 'e-Invoice generation', 'e-Way bills', 'Tally export'],
  },
  {
    id: 'payments',
    label: 'Payments',
    Icon: MessageCircle,
    heading: 'Get paid faster with smart reminders',
    desc: 'Send automated payment reminders via WhatsApp. Track who owes you and who you owe — all in one place.',
    points: ['WhatsApp reminders', 'Payment link sharing', 'Receivables dashboard', 'Payables tracking', 'Bank reconciliation'],
  },
]

export default function FeatureTabs() {
  const [active, setActive] = useState('billing')
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  const tab = TABS.find(t => t.id === active)!

  return (
    <section style={{ padding: 'clamp(60px,8vw,100px) var(--section-px)', background: '#fff' }} ref={ref}>
      <style suppressHydrationWarning>{`
        .ft-inner { max-width: 1280px; margin: 0 auto; }
        .ft-header { text-align: center; margin-bottom: 48px; }
        .ft-tabs { display: flex; gap: 0; border-bottom: 2px solid #f0f0f0; margin-bottom: 48px; overflow-x: auto; }
        .ft-tab {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 24px; font-size: 14px; font-weight: 600;
          color: #888; border-bottom: 2px solid transparent;
          margin-bottom: -2px; cursor: pointer; background: none; border-top: none; border-left: none; border-right: none;
          white-space: nowrap; transition: all 0.2s; font-family: var(--font-body);
        }
        .ft-tab:hover { color: #333; }
        .ft-tab.active { color: #F97316; border-bottom-color: #F97316; }
        .ft-content { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .ft-text-heading { font-size: clamp(24px, 3vw, 36px); font-weight: 700; color: #111; margin-bottom: 16px; line-height: 1.25; }
        .ft-text-desc { font-size: 16px; color: #666; line-height: 1.7; margin-bottom: 28px; }
        .ft-points { display: flex; flex-direction: column; gap: 12px; }
        .ft-point { display: flex; align-items: center; gap: 10px; font-size: 15px; color: #333; font-weight: 500; }
        .ft-point-dot { width: 20px; height: 20px; background: #FFF5E6; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ft-point-dot::after { content: ''; width: 7px; height: 7px; background: #F97316; border-radius: 50%; display: block; }
        .ft-visual { background: linear-gradient(135deg, #FFF8F0 0%, #FFF5E6 100%); border-radius: 20px; padding: 32px; min-height: 320px; display: flex; align-items: center; justify-content: center; border: 1px solid #FFE4C4; }
        .ft-visual-inner { width: 100%; }
        .ft-mock-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .ft-mock-title { font-size: 16px; font-weight: 700; color: #111; }
        .ft-mock-btn { background: #F97316; color: #fff; font-size: 11px; font-weight: 700; padding: 6px 14px; border-radius: 6px; }
        .ft-mock-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #fff; border-radius: 8px; margin-bottom: 8px; border: 1px solid #f5f5f5; }
        .ft-mock-label { font-size: 12px; color: #444; font-weight: 500; }
        .ft-mock-value { font-size: 13px; font-weight: 700; color: #111; }
        .ft-mock-badge { font-size: 10px; background: #fef2f2; color: #dc2626; padding: 2px 8px; border-radius: 4px; font-weight: 700; }
        .ft-mock-badge.paid { background: #f0fdf4; color: #16a34a; }
        @media (max-width: 800px) { .ft-content { grid-template-columns: 1fr; } .ft-visual { min-height: 200px; } }
      `}</style>

      <div className="ft-inner">
        <div className={`ft-header fade-up${visible ? ' visible' : ''}`}>
          <span className="section-label">Everything in one place</span>
          <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,44px)', marginBottom: 12 }}>
            All the tools your business needs,{' '}
            <span className="italic" style={{ color: '#F97316' }}>built for India</span>
          </h2>
          <p style={{ fontSize: 16, color: '#666', maxWidth: 520, margin: '0 auto' }}>
            From voice billing to GST filing — everything works together so you never have to switch apps.
          </p>
        </div>

        {/* Tabs */}
        <div className="ft-tabs">
          {TABS.map(t => (
            <button key={t.id} className={`ft-tab${active === t.id ? ' active' : ''}`} onClick={() => setActive(t.id)}>
              <t.Icon size={15} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="ft-content">
          <div>
            <h3 className="ft-text-heading">{tab.heading}</h3>
            <p className="ft-text-desc">{tab.desc}</p>
            <div className="ft-points">
              {tab.points.map(p => (
                <div key={p} className="ft-point">
                  <div className="ft-point-dot" />
                  {p}
                </div>
              ))}
            </div>
            <a href="https://app.udyogbook.in/sign-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 28, background: '#F97316', color: '#fff', padding: '12px 24px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              Try {tab.label} free →
            </a>
          </div>

          <div className="ft-visual">
            <div className="ft-visual-inner">
              <div className="ft-mock-header">
                <span className="ft-mock-title">{tab.heading.split(' ').slice(0,3).join(' ')}</span>
                <span className="ft-mock-btn">+ New</span>
              </div>
              {[
                ['Nikita Fabrics', '₹13,125', 'unpaid'],
                ['Shree Om Ent.', '₹5,967', 'paid'],
                ['Mahindra Ltd', '₹4,066', 'unpaid'],
                ['Ravi Traders', '₹8,240', 'paid'],
              ].map(([name, amt, status]) => (
                <div key={name} className="ft-mock-row">
                  <span className="ft-mock-label">{name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="ft-mock-value">{amt}</span>
                    <span className={`ft-mock-badge${status === 'paid' ? ' paid' : ''}`}>{status === 'paid' ? 'Paid' : 'Unpaid'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
