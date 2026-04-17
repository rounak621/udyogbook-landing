'use client'
import { useEffect, useRef, useState } from 'react'

export default function MayaAISpotlight() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  return (
    <section style={{ background: '#0F172A', padding: 'clamp(56px, 7vw, 88px) var(--section-px)' }} ref={ref}>
      <style suppressHydrationWarning>{`
        .maya-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr; gap: 64px; align-items: center; }
        .maya-badge { display: inline-block; background: #F97316; color: #fff; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 100px; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 24px; }
        .maya-heading { font-size: clamp(32px, 4vw, 48px); font-weight: 400; color: #fff; line-height: 1.15; margin-bottom: 16px; font-family: var(--font-display); }
        .maya-desc { font-size: 17px; color: rgba(255,255,255,0.7); line-height: 1.6; margin-bottom: 32px; }
        .maya-bullets { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
        .maya-bullet { display: flex; align-items: flex-start; gap: 12px; font-size: 15px; color: rgba(255,255,255,0.85); line-height: 1.5; }
        .maya-check { color: #F97316; flex-shrink: 0; font-weight: bold; }
        .maya-vs { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; }
        .maya-vs-badge { background: #FEF2F2; color: #DC2626; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 100px; }
        
        .maya-right { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; position: relative; }
        .maya-ui-top { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
        .maya-mic { width: 48px; height: 48px; border-radius: 50%; background: #0f172a; border: 2px solid #F97316; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
        .maya-text { font-size: 16px; color: #fff; font-style: italic; opacity: 0.9; }
        
        .maya-invoice { background: rgba(255,255,255,0.1); border-radius: 12px; padding: 16px; margin-bottom: 20px; }
        .maya-inv-row { display: flex; justify-content: space-between; font-size: 14px; color: rgba(255,255,255,0.8); margin-bottom: 8px; }
        .maya-inv-row:last-child { margin-bottom: 0; padding-top: 8px; border-top: 1px dashed rgba(255,255,255,0.2); color: #fff; font-weight: 700; }
        
        .maya-success { background: rgba(34,197,94,0.2); color: #4ade80; font-size: 13px; font-weight: 600; text-align: center; padding: 8px; border-radius: 100px; }
        
        @media (max-width: 900px) { .maya-inner { grid-template-columns: 1fr; } .maya-right { display: none; } }
      `}</style>

      <div className={`maya-inner fade-up${visible ? ' visible' : ''}`}>
        <div className="maya-left">
          <span className="maya-badge">UNIQUE TO UDYOG</span>
          <h2 className="maya-heading">Meet Maya — India&apos;s first Hinglish voice billing AI</h2>
          <p className="maya-desc">
            Just say &quot;Ramesh ko 10 shirt ka bill banao, 500 rupaye wali&quot; and Maya creates a complete GST invoice in 8 seconds. No typing. No menus. No accounting knowledge needed.
          </p>
          
          <div className="maya-bullets">
            <div className="maya-bullet">
              <span className="maya-check">✓</span>
              <span>Understands Hindi, English, and Hinglish naturally</span>
            </div>
            <div className="maya-bullet">
              <span className="maya-check">✓</span>
              <span>Auto-calculates CGST/SGST/IGST based on buyer state</span>
            </div>
            <div className="maya-bullet">
              <span className="maya-check">✓</span>
              <span>Sends invoice on WhatsApp instantly after creation</span>
            </div>
          </div>

          <div className="maya-vs">
            <span className="maya-vs-badge">Not available on Vyapar</span>
            <span className="maya-vs-badge">Not available on myBillBook</span>
          </div>

          <a href="https://app.udyogbook.in/signup" className="btn-orange">
            Try Maya free →
          </a>
        </div>

        <div className="maya-right">
          <div className="maya-ui-top">
            <div className="maya-mic">🎤</div>
            <div className="maya-text">&quot;Ramesh ko 10 shirt ka bill banao...&quot;</div>
          </div>
          
          <div className="maya-invoice">
            <div className="maya-inv-row"><span>Name:</span> <span>Ramesh</span></div>
            <div className="maya-inv-row"><span>Items:</span> <span>10 Shirts × ₹500</span></div>
            <div className="maya-inv-row"><span>GST 12%:</span> <span>₹600</span></div>
            <div className="maya-inv-row"><span>Total:</span> <span>₹5,600</span></div>
          </div>
          
          <div className="maya-success">✓ Invoice created in 8 seconds</div>
        </div>
      </div>
    </section>
  )
}
