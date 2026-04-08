'use client'
import { useEffect, useRef, useState } from 'react'
import { UserPlus, Building2, Mic2, Check } from 'lucide-react'

const STEPS = [
  {
    Icon: UserPlus,
    num: '01',
    title: 'Sign up free',
    desc: 'Create your account in under 60 seconds. Enter your business name and GSTIN. No credit card needed.',
  },
  {
    Icon: Building2,
    num: '02',
    title: 'Set up your business',
    desc: 'Add your products, parties, and bank details. Import from Tally or start fresh — your choice.',
  },
  {
    Icon: Mic2,
    num: '03',
    title: 'Start billing by voice',
    desc: 'Say "Ravi Traders ka bill banao" and Maya handles the rest. Invoice created, GST calculated, PDF ready.',
  },
]

export default function HowItWorks() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" style={{ padding: 'clamp(60px, 8vw, 100px) var(--section-px)', background: 'var(--bg)' }}>
      <style suppressHydrationWarning>{`
        .hiw-inner { max-width: var(--max-w); margin: 0 auto; }
        .hiw-header { text-align: center; margin-bottom: 56px; }
        .steps-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 0; position: relative; margin-bottom: 56px;
        }
        .steps-connector {
          position: absolute; top: 28px; left: calc(16.67% + 28px); right: calc(16.67% + 28px);
          height: 1px;
          background: repeating-linear-gradient(90deg, var(--gray-200) 0, var(--gray-200) 6px, transparent 6px, transparent 12px);
        }
        .step { padding: 0 28px; text-align: center; }
        .step-circle {
          width: 56px; height: 56px; border-radius: 50%;
          background: var(--white); border: 1.5px solid var(--gray-200);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px; position: relative; z-index: 1;
          transition: border-color 0.3s, background 0.3s;
        }
        .step:hover .step-circle { border-color: var(--orange); background: var(--orange-light); }
        .step-num { font-size: 11px; font-weight: 700; color: var(--gray-400); margin-bottom: 8px; letter-spacing: 0.06em; text-transform: uppercase; }
        .step-title { font-size: 18px; font-weight: 600; margin-bottom: 10px; }
        .step-desc { font-size: 14px; color: var(--gray-600); line-height: 1.65; }
        .voice-demo {
          background: var(--black); border-radius: 20px;
          padding: clamp(28px, 4vw, 48px);
          display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;
        }
        .vd-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--orange); margin-bottom: 14px; }
        .vd-quote { font-size: clamp(17px, 2.5vw, 22px); color: #fff; font-weight: 500; line-height: 1.45; margin-bottom: 12px; font-style: italic; }
        .vd-sub { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.65; }
        .vd-result {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 24px;
        }
        .vd-result-header { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
        .vd-avatar { width: 32px; height: 32px; background: var(--orange); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .vd-avatar-name { font-size: 13px; font-weight: 600; color: #fff; }
        .vd-avatar-sub { font-size: 11px; color: rgba(255,255,255,0.4); }
        .vd-waveform { display: flex; align-items: flex-end; gap: 3px; height: 28px; margin-bottom: 18px; }
        .vd-bar { border-radius: 2px; background: var(--orange); opacity: 0.6; flex-shrink: 0; width: 4px; }
        .vd-items { display: flex; flex-direction: column; gap: 9px; }
        .vd-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,0.85); }
        .vd-total { margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; }
        .vd-total-label { font-size: 13px; color: rgba(255,255,255,0.4); }
        .vd-total-value { font-size: 24px; font-weight: 800; color: var(--orange); letter-spacing: -0.02em; }
        @media (max-width: 700px) {
          .steps-grid { grid-template-columns: 1fr; gap: 32px; }
          .steps-connector { display: none; }
          .voice-demo { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="hiw-inner" ref={ref}>
        <div className={`hiw-header fade-up${visible ? ' visible' : ''}`}>
          <span className="section-label">How it works</span>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: 16 }}>
            Up and running in{' '}
            <span className="italic text-orange">3 steps</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--gray-600)', lineHeight: 1.6 }}>
            No training needed. No accountant required. Just sign up and start.
          </p>
        </div>

        <div className="steps-grid">
          <div className="steps-connector" />
          {STEPS.map(({ Icon, num, title, desc }, i) => (
            <div key={num} className={`step fade-up d${i + 1}${visible ? ' visible' : ''}`}>
              <div className="step-circle">
                <Icon size={22} color="var(--orange)" strokeWidth={1.75} />
              </div>
              <p className="step-num">{num}</p>
              <h3 className="step-title">{title}</h3>
              <p className="step-desc">{desc}</p>
            </div>
          ))}
        </div>

        <div className={`voice-demo fade-up${visible ? ' visible' : ''}`}>
          <div>
            <p className="vd-label">Maya in action</p>
            <p className="vd-quote">
              &ldquo;Ravi Traders ka bill banao. Item hai P U Chest Pad, 500 quantity. Aaj ka date.&rdquo;
            </p>
            <p className="vd-sub">
              Maya understands Hinglish, matches your existing customers and products, calculates GST automatically, and asks you to confirm — all in under 5 seconds.
            </p>
          </div>

          <div className="vd-result">
            <div className="vd-result-header">
              <div className="vd-avatar">
                <Mic2 size={14} color="#fff" strokeWidth={2} />
              </div>
              <div>
                <p className="vd-avatar-name">Maya</p>
                <p className="vd-avatar-sub">Smart Billing Assistant</p>
              </div>
            </div>

            <div className="vd-waveform">
              {[18, 26, 20, 30, 24, 18, 28, 22, 26, 16, 30, 20, 24, 18, 26].map((h, i) => (
                <div key={i} className="vd-bar" style={{ height: h }} />
              ))}
            </div>

            <div className="vd-items">
              {['Ravi Traders matched', 'P U Chest Pad @ ₹25 + 5% GST', 'Qty 500 pcs · Date: today'].map((item) => (
                <div key={item} className="vd-item">
                  <Check size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="vd-total">
              <span className="vd-total-label">Total amount</span>
              <span className="vd-total-value">₹13,125</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
