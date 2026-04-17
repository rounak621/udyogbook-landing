'use client'
import { useEffect, useRef, useState } from 'react'

export default function FreeTools() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="freetools" style={{ padding: 'clamp(60px, 8vw, 100px) var(--section-px)', background: '#F8FAFC' }}>
      <style suppressHydrationWarning>{`
        .tools-inner { max-width: 1000px; margin: 0 auto; }
        .tools-header { text-align: center; margin-bottom: 48px; }
        .tools-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .tool-card {
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        .tool-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: var(--bg); border: 1px solid var(--gray-200);
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; margin-bottom: 20px;
        }
        .tool-title { font-size: 20px; font-weight: 600; margin-bottom: 12px; color: var(--black); }
        .tool-desc { font-size: 15px; color: var(--gray-600); line-height: 1.6; margin-bottom: 24px; flex-grow: 1; }
        .tool-link {
          font-weight: 600; color: var(--orange);
          display: inline-flex; align-items: center; gap: 4px;
        }
        .tool-link:hover { color: var(--orange-dark); text-decoration: underline; }
        @media (max-width: 768px) {
          .tools-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="tools-inner" ref={ref}>
        <div className={`tools-header fade-up${visible ? ' visible' : ''}`}>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: 12 }}>
            Free tools for Indian businesses
          </h2>
          <p style={{ fontSize: 16, color: 'var(--gray-600)' }}>
            No signup required. Use them right now.
          </p>
        </div>

        <div className={`tools-grid fade-up d1${visible ? ' visible' : ''}`}>
          <div className="card tool-card">
            <div className="tool-icon">🧮</div>
            <h3 className="tool-title">GST Calculator</h3>
            <p className="tool-desc">Calculate CGST, SGST, and IGST instantly for any amount and GST slab. Free, no account needed.</p>
            <a href="/gst-calculator" className="tool-link">Open Calculator →</a>
          </div>

          <div className="card tool-card">
            <div className="tool-icon">📄</div>
            <h3 className="tool-title">Free Invoice Templates</h3>
            <p className="tool-desc">Download GST-compliant invoice templates in HTML format. All mandatory fields included.</p>
            <a href="/invoice-template" className="tool-link">Download Free →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
