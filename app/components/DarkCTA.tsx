'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Phone, Zap, Mic2, BarChart3 } from 'lucide-react'
import { useLaunchModal } from './LaunchModalProvider'

export default function DarkCTA() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { openModal } = useLaunchModal()
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  return (
    <section style={{ background: '#0F172A', padding: 'clamp(60px,8vw,100px) var(--section-px)' }} ref={ref}>
      <style suppressHydrationWarning>{`
        .dcta-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .dcta-left {}
        .dcta-badge { display: inline-block; background: rgba(249,115,22,0.15); color: #F97316; font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 100px; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 20px; border: 1px solid rgba(249,115,22,0.3); }
        .dcta-heading { font-size: clamp(28px,4vw,48px); font-weight: 400; color: #fff; line-height: 1.15; margin-bottom: 16px; font-family: var(--font-display); letter-spacing: -0.02em; }
        .dcta-sub { font-size: 16px; color: rgba(255,255,255,0.5); line-height: 1.7; margin-bottom: 32px; }
        .dcta-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .dcta-btn-primary { background: #F97316; color: #fff; border: none; padding: 14px 28px; border-radius: 10px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: var(--font-body); text-decoration: none; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 20px rgba(249,115,22,0.4); }
        .dcta-btn-primary:hover { background: #ea580c; transform: translateY(-1px); }
        .dcta-btn-secondary { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.2); padding: 14px 28px; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: var(--font-body); display: inline-flex; align-items: center; gap: 8px; }
        .dcta-btn-secondary:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.05); }
        .dcta-right {}
        .dcta-cards { display: flex; flex-direction: column; gap: 16px; }
        .dcta-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px 24px; display: flex; align-items: center; gap: 16px; }
        .dcta-card-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(249,115,22,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .dcta-card-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 3px; }
        .dcta-card-sub { font-size: 13px; color: rgba(255,255,255,0.4); }
        .dcta-fine { margin-top: 16px; font-size: 13px; color: rgba(255,255,255,0.3); }
        @media (max-width: 800px) { .dcta-inner { grid-template-columns: 1fr; gap: 40px; } }
      `}</style>

      <div className="dcta-inner" ref={ref}>
        <div className={`dcta-left fade-up${visible ? ' visible' : ''}`}>
          <span className="dcta-badge">Start today — free</span>
          <h2 className="dcta-heading">
            Join 5,000+ businesses<br />
            <span style={{ fontStyle: 'italic', color: '#F97316' }}>billing smarter</span>
          </h2>
          <p className="dcta-sub">
            Set up in under 2 minutes. No credit card. No training needed.
            Just sign up and start billing — by voice or manually.
          </p>
          <div className="dcta-btns">
            <button onClick={openModal} className="dcta-btn-primary">
              Start free trial <ArrowRight size={16} />
            </button>
            <button onClick={openModal} className="dcta-btn-secondary">
              <Phone size={16} /> Talk to sales
            </button>
          </div>
          <p className="dcta-fine">14-day free trial · No credit card · Cancel anytime</p>
        </div>

        <div className={`dcta-right fade-up d2${visible ? ' visible' : ''}`}>
          <div className="dcta-cards">
            {(() => {
              const CARDS = [
                { Icon: Zap, color: '#F97316', bg: 'rgba(249,115,22,0.15)', title: 'Setup in 2 minutes', sub: 'Add your business, products, and parties in minutes' },
                { Icon: Mic2, color: '#F97316', bg: 'rgba(249,115,22,0.15)', title: 'Bill by voice instantly', sub: 'Speak in Hinglish — Maya creates the invoice for you' },
                { Icon: BarChart3, color: '#F97316', bg: 'rgba(249,115,22,0.15)', title: 'See your business grow', sub: 'Real-time dashboard, reports, and CA collaboration' },
              ]

              return CARDS.map(({ Icon, color, bg, title, sub }) => (
                <div key={title} className="dcta-card">
                  <div className="dcta-card-icon" style={{ background: bg }}>
                    <Icon size={20} color={color} strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="dcta-card-title">{title}</p>
                    <p className="dcta-card-sub">{sub}</p>
                  </div>
                </div>
              ))
            })()}
          </div>
        </div>
      </div>
    </section>
  )
}
