'use client'
import { useEffect, useRef, useState } from 'react'
import { Mic2, FileText, BarChart3, Users, Package, MessageCircle } from 'lucide-react'

const FEATURES = [
  {
    Icon: Mic2,
    title: 'Voice Billing with Maya',
    desc: 'Speak in Hinglish — Maya creates invoices instantly. No typing, no calculations. Works for everyone, even without accounting knowledge.',
    tag: 'AI-Powered',
  },
  {
    Icon: FileText,
    title: 'GST-Ready Invoices',
    desc: 'Auto-calculated CGST, SGST, and IGST. HSN codes, e-way bills, and PDF export — fully compliant with Indian tax law.',
    tag: 'GST Compliant',
  },
  {
    Icon: BarChart3,
    title: 'Live Dashboard',
    desc: 'Track sales, purchases, receivables, and payables in real time. Visual charts that make your finances instantly understandable.',
    tag: 'Real-time',
  },
  {
    Icon: Users,
    title: 'CA Collaboration',
    desc: 'Invite your Chartered Accountant directly. They get a dedicated portal — view financials, file GST, generate reports. No back-and-forth.',
    tag: 'Pro Feature',
  },
  {
    Icon: Package,
    title: 'Inventory Tracking',
    desc: 'Stock levels auto-update with every sale and purchase. Low-stock alerts so you never run out unexpectedly.',
    tag: 'Auto-sync',
  },
  {
    Icon: MessageCircle,
    title: 'WhatsApp Reminders',
    desc: 'Send payment reminders via WhatsApp with one tap. Recover outstanding dues faster, professionally.',
    tag: 'One tap',
  },
]

export default function Features() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" style={{ padding: 'clamp(60px, 8vw, 100px) var(--section-px)', background: '#fff' }}>
      <style suppressHydrationWarning>{`
        .features-inner { max-width: var(--max-w); margin: 0 auto; }
        .features-header { text-align: center; margin-bottom: 56px; }
        .features-grid { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 1px; 
          background: #E2E8F0;
          border: 1px solid #E2E8F0;
        }
        .feature-card {
          background: #fff;
          padding: 32px 28px;
        }
        .feature-tag {
          display: block; 
          font-size: 11px; 
          font-weight: 700;
          letter-spacing: 0.08em; 
          text-transform: uppercase;
          color: #F97316;
          margin-bottom: 6px; 
        }
        .feature-title { 
          font-size: 17px; 
          font-weight: 700; 
          color: #0f172a; 
          margin-bottom: 8px; 
        }
        .feature-desc { 
          font-size: 14px; 
          color: #64748b; 
          line-height: 1.75; 
        }
        @media (max-width: 900px) { 
          .features-grid { grid-template-columns: repeat(2, 1fr); } 
        }
        @media (max-width: 600px) { 
          .features-grid { 
            grid-template-columns: 1fr; 
            background: transparent;
            border: none;
            gap: 0;
            border-radius: 0;
          } 
          .feature-card {
            border-bottom: 1px solid #E2E8F0;
            padding: 24px 0;
          }
          .feature-card:last-child {
            border-bottom: none;
          }
        }
      `}</style>

      <div className="features-inner" ref={ref}>
        <div className={`features-header fade-up${visible ? ' visible' : ''}`}>
          <span className="section-label">Features</span>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: 16 }}>
            Everything you need,{' '}
            <span className="italic text-orange">nothing you don&apos;t</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--gray-600)', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
            Built for the way Indian businesses actually work — fast, GST-compliant, and voice-first.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map(({ Icon, title, desc, tag }, i) => (
            <div
              key={title}
              className={`feature-card fade-up d${i + 1}${visible ? ' visible' : ''}`}
            >
              <Icon size={28} color="#F97316" strokeWidth={1.75} style={{ marginBottom: 16 }} />
              <span className="feature-tag">{tag}</span>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
