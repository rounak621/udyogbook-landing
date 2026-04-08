'use client'
import { useEffect, useRef, useState } from 'react'
import { Mic2, FileText, BarChart3, Users, Package, MessageCircle } from 'lucide-react'

const FEATURES = [
  {
    Icon: Mic2,
    title: 'Voice Billing with Maya',
    desc: 'Speak in Hinglish — Maya creates invoices instantly. No typing, no calculations. Works for everyone, even without accounting knowledge.',
    accent: '#f97316',
    tag: 'AI-Powered',
  },
  {
    Icon: FileText,
    title: 'GST-Ready Invoices',
    desc: 'Auto-calculated CGST, SGST, and IGST. HSN codes, e-way bills, and PDF export — fully compliant with Indian tax law.',
    accent: '#0ea5e9',
    tag: 'GST Compliant',
  },
  {
    Icon: BarChart3,
    title: 'Live Dashboard',
    desc: 'Track sales, purchases, receivables, and payables in real time. Visual charts that make your finances instantly understandable.',
    accent: '#10b981',
    tag: 'Real-time',
  },
  {
    Icon: Users,
    title: 'CA Collaboration',
    desc: 'Invite your Chartered Accountant directly. They get a dedicated portal — view financials, file GST, generate reports. No back-and-forth.',
    accent: '#8b5cf6',
    tag: 'Pro Feature',
  },
  {
    Icon: Package,
    title: 'Inventory Tracking',
    desc: 'Stock levels auto-update with every sale and purchase. Low-stock alerts so you never run out unexpectedly.',
    accent: '#f59e0b',
    tag: 'Auto-sync',
  },
  {
    Icon: MessageCircle,
    title: 'WhatsApp Reminders',
    desc: 'Send payment reminders via WhatsApp with one tap. Recover outstanding dues faster, professionally.',
    accent: '#ec4899',
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
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .feature-card {
          background: var(--white); border: 1px solid var(--gray-200);
          border-radius: 18px; padding: 28px 26px;
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative; overflow: hidden;
        }
        .feature-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 3px; border-radius: 18px 18px 0 0;
          background: var(--accent-color);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s ease;
        }
        .feature-card:hover { transform: translateY(-5px); box-shadow: 0 20px 56px rgba(0,0,0,0.08); }
        .feature-card:hover::before { transform: scaleX(1); }
        .feature-icon-wrap {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
        }
        .feature-tag {
          display: inline-block; font-size: 10px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 100px; margin-bottom: 10px;
        }
        .feature-title { font-size: 17px; font-weight: 600; margin-bottom: 8px; line-height: 1.3; }
        .feature-desc { font-size: 14px; color: var(--gray-600); line-height: 1.65; }
        @media (max-width: 900px) { .features-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .features-grid { grid-template-columns: 1fr !important; } }
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
          {FEATURES.map(({ Icon, title, desc, accent, tag }, i) => (
            <div
              key={title}
              className={`feature-card fade-up d${i + 1}${visible ? ' visible' : ''}`}
              style={{ '--accent-color': accent } as React.CSSProperties}
            >
              <div className="feature-icon-wrap" style={{ background: accent + '15' }}>
                <Icon size={22} color={accent} strokeWidth={1.75} />
              </div>
              <span className="feature-tag" style={{ background: accent + '15', color: accent }}>{tag}</span>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
