import Image from 'next/image'

const SIGN_UP_URL = 'https://app.udyogbook.in/sign-in'

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', padding: 'clamp(48px, 6vw, 80px) var(--section-px) 32px' }}>
      <style suppressHydrationWarning>{`
        .footer-inner { max-width: var(--max-w); margin: 0 auto; }
        .footer-top { display: grid; grid-template-columns: 1.5fr repeat(4, 1fr); gap: 32px; margin-bottom: 48px; }
        .footer-brand { max-width: 260px; }
        .footer-logo { display: flex; align-items: center; margin-bottom: 14px; }
        .footer-tagline { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.6; margin-bottom: 0; }
        .footer-col-title { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 16px; }
        .footer-link { display: block; font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 10px; transition: color 0.2s; text-decoration: none; }
        .footer-link:hover { color: rgba(255,255,255,0.85); }
        .footer-divider { height: 1px; background: rgba(255,255,255,0.06); margin-bottom: 24px; }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .footer-copy { font-size: 12px; color: rgba(255,255,255,0.25); }
        .footer-badges { display: flex; align-items: center; gap: 14px; }
        .footer-badge { font-size: 11px; color: rgba(255,255,255,0.25); display: flex; align-items: center; gap: 4px; }
        .footer-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; flex-shrink: 0; }
        @media (max-width: 900px) { .footer-top { grid-template-columns: repeat(2, 1fr); } .footer-brand { grid-column: 1 / -1; max-width: 100%; } }
        @media (max-width: 500px) { .footer-top { grid-template-columns: 1fr 1fr; } .footer-bottom { flex-direction: column; align-items: flex-start; } }
      `}</style>
      <div className="footer-inner">
        <div className="footer-top">

          {/* Brand column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <Image
                src="/udyog-logo.png"
                alt="Udyog"
                width={130}
                height={40}
                style={{ objectFit: 'contain', borderRadius: '10px' }}
              />
            </div>
            <p className="footer-tagline">
              Udyog is built to simplify business operations and make GST compliance effortless through a NextGen, technology-first, voice-first, and India-first approach where all business data is available in real-time for both the owner and their CA.
            </p>
            <div style={{ marginTop: 16 }}>
              <a
                href="https://play.google.com/store/apps/details?id=com.udyog.udyogmobile"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 14px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 01-.61-1.636V3.45c0-.627.227-1.218.61-1.636z" fill="#00C1A6"/>
                  <path d="M17.25 8.542l-3.458 3.458 3.458 3.458 3.882-2.203c1.107-.628 1.107-1.65 0-2.277L17.25 8.542z" fill="#FFD400"/>
                  <path d="M13.792 12L3.61 1.814c.435-.472 1.077-.735 1.767-.735.632 0 1.25.215 1.77.51l10.103 5.733L13.792 12z" fill="#00F076"/>
                  <path d="M13.792 12l3.458 3.458-10.103 5.734c-.52.294-1.138.51-1.77.51-.69 0-1.332-.263-1.767-.736L13.792 12z" fill="#F4374D"/>
                </svg>
                <span>Google Play</span>
              </a>
            </div>
          </div>

          {/* Product column */}
          <div>
            <p className="footer-col-title">Product</p>
            <a href="/#features" className="footer-link">Features</a>
            <a href="/#how-it-works" className="footer-link">Voice Billing</a>
            <a href="/pricing" className="footer-link">Pricing</a>
            <a href="/custom-solutions" className="footer-link">Custom Solutions</a>
            <a href="/#features" className="footer-link">CA Portal</a>
          </div>

          {/* Free Tools column */}
          <div>
            <p className="footer-col-title">Free Tools</p>
            <a href="/tools/digital-signature" className="footer-link">Digital Signature Maker</a>
            <a href="/tools/gst-calculator" className="footer-link">GST Calculator</a>
            <a href="/tools/invoice-template" className="footer-link">Invoice Templates</a>
          </div>

          {/* Company column */}
          <div>
            <p className="footer-col-title">Company</p>
            <a href="/about" className="footer-link">About Us</a>
            <a href="/blog" className="footer-link">Blog</a>
            <a href="/contact" className="footer-link">Contact</a>
          </div>

          {/* Legal column */}
          <div>
            <p className="footer-col-title">Legal</p>
            <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
            <a href="/terms-of-service" className="footer-link">Terms of Service</a>
            <a href="/refund-policy" className="footer-link">Refund Policy</a>
            <a href="/gst-compliance" className="footer-link">GST Compliance</a>
            <a href="/cookie-policy" className="footer-link">Cookie Policy</a>
          </div>

        </div>
        <div className="footer-divider" />
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 UDYOG TECHNOLOGIES · Made with ♥ in India
          </p>
          <div className="footer-badges">
            <span className="footer-badge">
              <span className="footer-badge-dot" />
              All systems operational
            </span>
            <span className="footer-badge">GST Compliant</span>
            <span className="footer-badge">ISO 27001</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
