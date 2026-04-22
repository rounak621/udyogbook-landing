const SIGN_UP_URL = 'https://app.udyogbook.in/sign-in'

export default function CTABanner() {
  return (
    <section style={{ padding: 'clamp(60px, 8vw, 100px) var(--section-px)', background: 'var(--bg)' }}>
      <style suppressHydrationWarning>{`
        .cta-inner { max-width: var(--max-w); margin: 0 auto; }
        .cta-box {
          background: var(--black);
          border-radius: 24px;
          padding: clamp(48px, 6vw, 80px) clamp(32px, 6vw, 80px);
          text-align: center;
          position: relative; overflow: hidden;
        }
        .cta-box::before {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 220px; height: 220px; border-radius: 50%;
          background: radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-box::after {
          content: '';
          position: absolute; bottom: -80px; left: -40px;
          width: 280px; height: 280px; border-radius: 50%;
          background: radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-title { font-size: clamp(36px, 6vw, 56px); color: #fff; margin-bottom: 16px; position: relative; z-index: 1; }
        .cta-sub { font-size: clamp(15px, 2vw, 18px); color: rgba(255,255,255,0.55); max-width: 520px; margin: 0 auto 36px; line-height: 1.65; position: relative; z-index: 1; }
        .cta-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; }
        .cta-note { margin-top: 16px; font-size: 13px; color: rgba(255,255,255,0.25); position: relative; z-index: 1; }
        .cta-stats { display: flex; justify-content: center; gap: clamp(24px, 5vw, 56px); margin-top: 48px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.08); flex-wrap: wrap; position: relative; z-index: 1; }
        .cta-stat-num { font-size: 32px; font-weight: 800; color: var(--orange); letter-spacing: -0.02em; }
        .cta-stat-label { font-size: 13px; color: rgba(255,255,255,0.4); margin-top: 2px; }
      `}</style>

      <div className="cta-inner">
        <div className="cta-box">
          <h2 className="display cta-title">
            Ready to bill{' '}
            <span className="italic text-orange">smarter?</span>
          </h2>
          <p className="cta-sub">
            Join 5,000+ Indian businesses already using Udyog.
            Start your free trial today — setup takes under 2 minutes.
          </p>
          <div className="cta-actions">
            <a href={SIGN_UP_URL} className="btn-orange" style={{ fontSize: 16, padding: '15px 36px' }}>
              Start free trial →
            </a>
            <button className="btn-outline-white" style={{ fontSize: 16, padding: '15px 32px' }}>
              Book a demo
            </button>
          </div>
          <p className="cta-note">14-day free trial · No credit card required · Cancel anytime</p>

          <div className="cta-stats">
            {[['5,000+', 'Businesses'], ['₹500Cr+', 'Invoiced'], ['4.9/5', 'Rating'], ['< 2min', 'Setup time']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <p className="cta-stat-num">{num}</p>
                <p className="cta-stat-label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
