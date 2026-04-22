'use client'
import Image from 'next/image'
import { Mic, ShieldCheck, Zap, Star } from 'lucide-react'
import { useLaunchModal } from './LaunchModalProvider'
import { useState } from 'react'
import ComingSoonModal from './ComingSoonModal'

const SIGN_UP_URL = 'https://app.udyogbook.in/sign-in'

export default function Hero() {
  const { openModal } = useLaunchModal()
  const [showModal, setShowModal] = useState(false)
  return (
    <>
    <section style={{ background: '#ffffff', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>
      <style suppressHydrationWarning>{`
        :root {
          --mango: #F97316;
          --mango-dark: #ea580c;
          --mango-light: #FFF5E6;
        }
        /* ── DOT GRID ── */
        .hero-dot-grid {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
          opacity: 0.35;
        }

        /* ── BLOBS ── */
        .blob-wrap { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .blob1 {
          position: absolute; top: -80px; left: -100px;
          width: 680px; height: 640px;
          border-radius: 60% 40% 55% 45% / 50% 60% 40% 55%;
          background: radial-gradient(ellipse at 35% 40%, rgba(249,115,22,0.32) 0%, rgba(251,146,60,0.18) 50%, transparent 80%);
        }
        .blob2 {
          position: absolute; top: -20px; right: -80px;
          width: 580px; height: 580px;
          border-radius: 45% 55% 40% 60% / 55% 45% 60% 40%;
          background: radial-gradient(ellipse at 65% 45%, rgba(249,115,22,0.26) 0%, rgba(253,186,116,0.14) 55%, transparent 80%);
        }
        .blob3 {
          position: absolute; bottom: -100px; left: 32%;
          width: 460px; height: 420px;
          border-radius: 55% 45% 50% 50% / 40% 60% 50% 55%;
          background: radial-gradient(ellipse at 50% 60%, rgba(249,115,22,0.20) 0%, transparent 65%);
        }

        /* ── LAYOUT ── */
        .hero-outer { max-width: 1280px; margin: 0 auto; padding: 48px var(--section-px) 0; position: relative; z-index: 1; }
        .hero-grid { display: grid; grid-template-columns: 1fr 1.15fr; gap: 48px; align-items: center; min-height: 600px; }

        /* ── LEFT ── */
        .hero-left { display: flex; flex-direction: column; }
        .hero-stars {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; border: 1.5px solid #FED7AA;
          padding: 7px 16px; border-radius: 100px; width: fit-content; margin-bottom: 28px;
          box-shadow: 0 2px 12px rgba(249,115,22,0.15);
        }
        .hero-stars-text { font-size: 13px; color: #92400e; font-weight: 700; }
        .hero-h1 {
          font-family: var(--font-display); font-size: clamp(40px, 5.2vw, 68px);
          font-weight: 400; line-height: 1.08; letter-spacing: -0.025em;
          color: #0f172a; margin-bottom: 20px;
        }
        .hero-h1 .orange { color: #F97316; font-style: italic; }
        .hero-h1 .italic-black { font-style: italic; color: #334155; }
        .hero-p { font-size: clamp(15px, 1.6vw, 17px); color: #64748b; line-height: 1.75; margin-bottom: 32px; max-width: 400px; }
        .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; }
        .btn-mango {
          background: #F97316; color: #fff; border: none; padding: 15px 30px; border-radius: 10px;
          font-size: 16px; font-weight: 700; font-family: var(--font-body); cursor: pointer;
          transition: all 0.2s; box-shadow: 0 6px 24px rgba(249,115,22,0.45);
          text-decoration: none; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap;
        }
        .btn-mango:hover { background: #ea580c; transform: translateY(-2px); box-shadow: 0 10px 32px rgba(249,115,22,0.5); }
        .btn-demo {
          background: transparent; color: #0f172a; border: 2px solid #e2e8f0;
          padding: 15px 30px; border-radius: 10px; font-size: 16px; font-weight: 600;
          font-family: var(--font-body); cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }
        .btn-demo:hover { border-color: #F97316; color: #F97316; background: #FFF5E6; }
        .hero-fine { font-size: 12px; color: #94a3b8; margin-bottom: 28px; }
        .hero-badges { display: flex; gap: 20px; flex-wrap: wrap; }
        .hero-badge { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #475569; font-weight: 500; }

        /* ── INLINE STATS ── */
        .hero-stats-inline { display: flex; align-items: center; justify-content: flex-start; flex-wrap: wrap; gap: 8px 0; margin-bottom: 32px; }
        .stat-inline-item { padding: 0 24px; display: inline-flex; align-items: baseline; }
        .stat-inline-item:first-child { padding-left: 0; }
        .stat-inline-item:last-child { padding-right: 0; }
        .stat-inline-div { width: 1px; height: 32px; background: rgba(0,0,0,0.15); }
        .stat-inline-num { font-size: 20px; font-weight: 700; color: #F97316; }
        .stat-inline-lbl { font-size: 13px; color: #64748b; margin-left: 6px; }


        /* ── RIGHT — DASHBOARD ── */
        .hero-right { position: relative; display: flex; align-items: center; justify-content: center; padding-bottom: 40px; }

        /* Floating cards */
        .float-gst {
          position: absolute; bottom: -10px; left: -32px;
          background: #fff; border-radius: 14px; padding: 14px 18px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04);
          display: flex; align-items: center; gap: 12px;
          animation: floatA 3.2s ease-in-out infinite; z-index: 20;
          border: 1px solid rgba(249,115,22,0.15);
        }
        .float-invoice {
          position: absolute; top: 60px; right: -28px;
          background: #fff; border-radius: 14px; padding: 12px 16px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04);
          display: flex; align-items: center; gap: 10px;
          animation: floatB 3.8s ease-in-out infinite; z-index: 20;
          border: 1px solid rgba(249,115,22,0.15);
        }
        .float-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .float-label { font-size: 10px; color: #94a3b8; font-weight: 500; }
        .float-value { font-size: 16px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }
        .float-badge { background: #F97316; color: #fff; font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 100px; }

        /* Pulse dot */
        .gst-pulse { position: relative; }
        .gst-pulse::after {
          content: '';
          position: absolute;
          top: -2px; right: -2px;
          width: 8px; height: 8px;
          background: #22c55e;
          border-radius: 50%;
          border: 2px solid #fff;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.3);opacity:0.7} }

        /* Trust bar */
        .trust-bar { background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 20px var(--section-px); margin-top: 56px; position: relative; z-index: 1; }
        .trust-bar-inner { max-width: 1280px; margin: 0 auto; display: flex; align-items: center; gap: 24px; justify-content: center; flex-wrap: wrap; }
        .trust-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; white-space: nowrap; }
        .trust-sep { width: 1px; height: 16px; background: #CBD5E1; }
        .trust-items { display: flex; gap: 28px; flex-wrap: wrap; justify-content: center; }
        .trust-item { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.07em; }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-right { margin-top: 32px; }
          .scene-3d { transform: none !important; }
          .float-invoice { display: none; }
        }
        @media (max-width: 600px) {
          .hero-btns { flex-direction: column; }
          .float-gst { left: 0; }
          .stat-inline-div { display: none; }
          .stat-inline-item { padding: 0; width: 100%; margin-bottom: 4px; }
        }
      `}</style>

      <div className="hero-dot-grid" />
      <div className="blob-wrap">
        <div className="blob1" /><div className="blob2" /><div className="blob3" />
      </div>

      <div className="hero-outer">
        <div className="hero-grid">
          {/* LEFT */}
          <div className="hero-left">
            <div className="hero-stars">
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <span className="hero-stars-text">4.9/5 · 5,000+ businesses</span>
            </div>
            <h1 className="hero-h1">
              Bill banao, <span className="orange">bolke.</span><br />
              <span className="italic-black">Sirf</span> ek awaaz mein.
            </h1>
            <p className="hero-p">
              India&apos;s next-gen GST billing platform for retailers, traders &amp; MSMEs. Billing, inventory, GST compliance and CA collaboration — all in one place.
            </p>
            <div className="hero-stats-inline">
              <div className="stat-inline-item">
                <span className="stat-inline-num">3 sec</span>
                <span className="stat-inline-lbl">to create an invoice</span>
              </div>
              <div className="stat-inline-div" />
              <div className="stat-inline-item">
                <span className="stat-inline-num">5,000+</span>
                <span className="stat-inline-lbl">businesses</span>
              </div>
              <div className="stat-inline-div" />
              <div className="stat-inline-item">
                <span className="stat-inline-num">₹149</span>
                <span className="stat-inline-lbl">/mo</span>
              </div>
            </div>
            <div className="hero-btns">
              <a href="https://app.udyogbook.in/sign-in" className="btn-mango">Start free trial →</a>
            </div>
            <p className="hero-fine">No credit card · 14-day free trial · Cancel anytime</p>
            <div className="hero-badges">
              <div className="hero-badge"><ShieldCheck size={15} style={{ color: '#F97316' }} /><span>GST Compliant</span></div>
              <div className="hero-badge"><Mic size={15} style={{ color: '#F97316' }} /><span>Voice Billing</span></div>
              <div className="hero-badge"><Zap size={15} style={{ color: '#F97316' }} /><span>2-min setup</span></div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right">
            {/* Orange glow behind dashboard */}
            <div style={{
              position: 'absolute',
              width: '75%',
              height: '60%',
              background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.06) 50%, transparent 70%)',
              borderRadius: '50%',
              top: '20%',
              left: '12%',
              zIndex: 0,
              filter: 'blur(40px)',
              pointerEvents: 'none' as const,
            }} />
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '620px',
              margin: '0 auto',
            }}>
              <div style={{
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(0,0,0,0.15)',
              }}>
                <Image
                  src="/dashboard-screenshot.png"
                  alt="Udyog Dashboard"
                  width={1457}
                  height={822}
                  quality={95}
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </div>

              {/* Floating cards */}
              <div className="float-gst">
                <div className="float-icon gst-pulse" style={{ background: '#F0FDF4' }}>
                  <ShieldCheck size={20} color="#16a34a" />
                </div>
                <div>
                  <p className="float-label">GST Auto-calc</p>
                  <p className="float-value">₹13,125</p>
                </div>
              </div>
              <div className="float-invoice">
                <div className="float-icon" style={{ background: '#FFF5E6' }}>
                  <Mic size={18} color="#F97316" />
                </div>
                <div>
                  <p className="float-label">Voice invoice</p>
                  <p className="float-value" style={{ fontSize: 13 }}>Created in 3s</p>
                  <span className="float-badge">Maya AI</span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
        background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.95))',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
    </section>

    {/* Trust bar — outside section so gradient doesn't cover it */}
    <div className="trust-bar">
      <div className="trust-bar-inner">
        <span className="trust-label">Trusted across industries</span>
        <div className="trust-sep" />
        <div className="trust-items">
          {['Textile', 'Electronics', 'FMCG', 'Pharma', 'Construction', 'Retail'].map(s => (
            <span key={s} className="trust-item">{s}</span>
          ))}
        </div>
      </div>
    </div>
    <ComingSoonModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
