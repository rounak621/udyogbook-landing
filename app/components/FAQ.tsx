'use client'
import { useEffect, useRef, useState } from 'react'

const FAQS = [
  {
    q: 'Is Udyog compliant with Indian GST laws?',
    a: 'Yes. Every invoice follows the GST invoice format mandated by the Indian government, including HSN/SAC codes, tax breakdowns (CGST/SGST/IGST), place of supply, and e-way bill support. All invoices are audit-ready.',
  },
  {
    q: 'Can I use it in Hindi or Hinglish?',
    a: 'Absolutely. Our voice assistant Maya understands Hinglish — you can say "Ravi Traders ka bill banao, 500 items" and she\'ll create the invoice, calculate GST, and confirm with you before saving. No typing needed.',
  },
  {
    q: 'How does the CA portal work?',
    a: 'You invite your CA via email. They get a separate login and can view all your financials, generate reports, manage GST filings, and run reconciliations — without any back-and-forth over WhatsApp or email.',
  },
  {
    q: 'Can I import my data from Tally or other software?',
    a: 'Yes. Udyog supports CSV imports for customers, products, and opening balances. If you\'re migrating from Tally, our support team will help you with a guided migration at no extra cost.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We follow bank-grade security practices and are hosted on AWS India region for data residency compliance. We never sell or share your data.',
  },
  {
    q: 'What happens after the 14-day trial?',
    a: 'You can choose a paid plan or continue on the Starter plan (free forever, with some limits). We\'ll remind you before the trial ends. No automatic charges — ever.',
  },
  {
    q: 'Do I need to install anything?',
    a: 'No. Udyog is entirely web-based. It works on any browser on desktop or mobile. No installation, no updates, no IT support needed.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="faq" style={{ padding: 'clamp(60px, 8vw, 100px) var(--section-px)', background: '#fff' }}>
      <style suppressHydrationWarning>{`
        .faq-inner { max-width: 760px; margin: 0 auto; }
        .faq-header { text-align: center; margin-bottom: 48px; }
        .faq-list { border-top: 1px solid var(--gray-200); }
        .faq-item { border-bottom: 1px solid var(--gray-200); }
        .faq-btn {
          width: 100%; background: none; border: none; padding: 22px 0;
          display: flex; justify-content: space-between; align-items: center;
          cursor: pointer; text-align: left; gap: 16px;
        }
        .faq-q { font-size: 16px; font-weight: 500; color: var(--black); line-height: 1.4; }
        .faq-icon {
          width: 28px; height: 28px; border-radius: 50%;
          border: 1.5px solid var(--gray-200);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: var(--black); font-size: 18px; font-weight: 300;
          transition: all 0.2s;
        }
        .faq-item.open .faq-icon { background: var(--orange); border-color: var(--orange); color: #fff; transform: rotate(45deg); }
        .faq-answer { overflow: hidden; transition: max-height 0.35s ease, opacity 0.3s ease; }
        .faq-answer-inner { padding-bottom: 22px; }
        .faq-a { font-size: 15px; color: var(--gray-600); line-height: 1.75; }
        .faq-still { margin-top: 40px; text-align: center; background: var(--bg); border-radius: 16px; padding: 28px; }
        .faq-still-title { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
        .faq-still-sub { font-size: 14px; color: var(--gray-600); margin-bottom: 18px; }
      `}</style>

      <div className="faq-inner" ref={ref}>
        <div className={`faq-header fade-up${visible ? ' visible' : ''}`}>
          <span className="section-label">FAQ</span>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: 12 }}>
            Questions?{' '}
            <span className="italic text-orange">Answered.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--gray-600)' }}>Everything you need to know before signing up.</p>
        </div>

        <div className={`faq-list fade-up${visible ? ' visible' : ''}`}>
          {FAQS.map((faq, i) => (
            <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
              <button
                className="faq-btn"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="faq-q">{faq.q}</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer" style={{ maxHeight: open === i ? 400 : 0, opacity: open === i ? 1 : 0 }}>
                <div className="faq-answer-inner">
                  <p className="faq-a">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`faq-still fade-up${visible ? ' visible' : ''}`}>
          <p className="faq-still-title">Still have questions?</p>
          <p className="faq-still-sub">Our team is available Mon–Sat, 9am–7pm IST. Average response time: under 2 hours.</p>
          <a href="mailto:hello@udyog.in" className="btn-outline" style={{ fontSize: 14 }}>Email us →</a>
        </div>
      </div>
    </section>
  )
}
