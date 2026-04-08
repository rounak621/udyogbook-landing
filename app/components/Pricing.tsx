'use client'
import { useEffect, useRef, useState } from 'react'
import { Check, X, Zap, Star, Crown, Building2 } from 'lucide-react'
import { useLaunchModal } from './LaunchModalProvider'

const SIGN_UP_URL = 'https://app.udyogbook.in/sign-up'

const PLANS = [
  {
    Icon: Zap,
    name: 'Basic',
    tagline: 'Essential Billing',
    price: '₹149',
    period: 'per month',
    desc: 'For solo shop owners who just need digital bills',
    features: [
      { text: 'Unlimited Sales & Purchase Invoices', included: true },
      { text: 'Customer & Vendor Management', included: true },
      { text: 'Basic Stock Tracking', included: true },
      { text: 'Payment Reminders via WhatsApp', included: true },
      { text: 'Maya Voice Agent', included: false },
      { text: 'GST Reports', included: false },
      { text: 'CA Sync Portal', included: false },
    ],
    cta: 'Get started',
    highlighted: false,
    badge: null,
    accent: '#64748b',
  },
  {
    Icon: Star,
    name: 'Pro',
    tagline: 'Smart Business',
    price: '₹249',
    period: 'per month',
    desc: 'For growing businesses that want to save time with AI',
    features: [
      { text: 'All Basic features', included: true },
      { text: 'Maya AI Voice Billing', included: true },
      { text: 'AI Expense Tracking', included: true },
      { text: 'Staff Access (Limited)', included: true },
      { text: 'GST Reports', included: false },
      { text: 'CA Sync Portal', included: false },
    ],
    cta: 'Start free trial',
    highlighted: false,
    badge: null,
    accent: '#F97316',
  },
  {
    Icon: Crown,
    name: 'Premium',
    tagline: 'Complete Accounting',
    price: '₹299',
    period: 'per month',
    desc: 'For GST-registered businesses and complete peace of mind',
    features: [
      { text: 'All Pro features', included: true },
      { text: 'One-Click GST Reports (GSTR 1, 2, 3B, 9)', included: true },
      { text: 'Dedicated CA Collaboration Portal', included: true },
      { text: 'Profit & Loss Statements', included: true },
      { text: 'Advanced Staff Permissions', included: true },
    ],
    cta: 'Start free trial',
    highlighted: false,
    badge: null,
    accent: '#8b5cf6',
  },
  {
    Icon: Building2,
    name: 'Enterprise',
    tagline: 'Rental & Advanced Inventory',
    price: '₹499',
    period: 'per month',
    desc: 'Built specifically for rental businesses',
    features: [
      { text: 'All Premium features', included: true },
      { text: 'Rental Equipment Scheduling', included: true },
      { text: 'Automated In/Out Inventory Sync', included: true },
      { text: 'Overdue Return WhatsApp Reminders', included: true },
      { text: 'Automated Late Fee Deductions', included: true },
      { text: 'Custom Branding on Invoices', included: true },
    ],
    cta: 'Start free trial',
    highlighted: true,
    badge: 'Recommended',
    accent: '#F97316',
  },
]

export default function Pricing() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { openModal } = useLaunchModal()
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  return (
    <section id="pricing" style={{ padding: 'clamp(60px,8vw,100px) var(--section-px)', background: '#F8FAFC' }} ref={ref}>
      <style suppressHydrationWarning>{`
        .pricing-inner { max-width: 1280px; margin: 0 auto; }
        .pricing-header { text-align: center; margin-bottom: 48px; }
        .pricing-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; align-items: start; }
        .plan {
          border-radius: 20px; padding: 28px 24px;
          border: 2px solid #E2E8F0; background: #fff;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex; flex-direction: column; position: relative;
        }
        .plan:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.1); }
        .plan.featured { background: #0F172A; border-color: #F97316; color: #fff; box-shadow: 0 16px 48px rgba(249,115,22,0.25); }
        .plan-rec-badge {
          position: absolute; top: -13px; left: 50%; transform: translateX(-50%);
          background: #F97316; color: #fff; font-size: 11px; font-weight: 800;
          padding: 4px 16px; border-radius: 100px; letter-spacing: 0.06em;
          text-transform: uppercase; white-space: nowrap;
        }
        .plan-icon-wrap { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .plan-tagline { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 4px; }
        .plan-name { font-size: 22px; font-weight: 800; margin-bottom: 6px; }
        .plan-desc { font-size: 13px; line-height: 1.5; margin-bottom: 20px; }
        .plan.featured .plan-desc { color: rgba(255,255,255,0.5); }
        .plan-price { font-size: 44px; font-weight: 900; letter-spacing: -0.04em; line-height: 1; }
        .plan-period { font-size: 13px; margin-bottom: 24px; margin-top: 4px; }
        .plan.featured .plan-period { color: rgba(255,255,255,0.4); }
        .plan-divider { height: 1px; background: #F1F5F9; margin-bottom: 20px; }
        .plan.featured .plan-divider { background: rgba(255,255,255,0.1); }
        .plan-features { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; flex: 1; }
        .plan-feature { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; line-height: 1.4; }
        .plan.featured .plan-feature { color: rgba(255,255,255,0.85); }
        .plan-feature.excluded { opacity: 0.4; }
        .plan-cta {
          display: block; text-align: center; padding: 13px 20px;
          border-radius: 10px; font-size: 14px; font-weight: 700;
          transition: all 0.2s; font-family: var(--font-body); cursor: pointer;
          text-decoration: none; margin-top: auto;
        }
        .plan-cta-default { background: #F1F5F9; color: #334155; border: none; }
        .plan-cta-default:hover { background: #E2E8F0; }
        .plan-cta-orange { background: #F97316; color: #fff; border: none; box-shadow: 0 4px 16px rgba(249,115,22,0.4); }
        .plan-cta-orange:hover { background: #ea580c; transform: translateY(-1px); }
        .pricing-note { text-align: center; margin-top: 20px; font-size: 13px; color: #94a3b8; }
        @media (max-width: 1000px) { .pricing-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .pricing-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; } }
      `}</style>

      <div className="pricing-inner" ref={ref}>
        <div className={`pricing-header fade-up${visible ? ' visible' : ''}`}>
          <span className="section-label">Pricing</span>
          <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,44px)', marginBottom: 12, color: '#0f172a' }}>
            Simple, <span className="italic" style={{ color: '#F97316' }}>honest</span> pricing
          </h2>
          <p style={{ fontSize: 16, color: '#64748b' }}>All plans include a 14-day free trial. No credit card required.</p>
        </div>

        <div className="pricing-grid">
          {PLANS.map(({ Icon, name, tagline, price, period, desc, features, cta, highlighted, badge, accent }, i) => (
            <div key={name} className={`plan fade-up d${i+1}${visible ? ' visible' : ''}${highlighted ? ' featured' : ''}`}>
              {badge && <div className="plan-rec-badge">{badge}</div>}
              <div className="plan-icon-wrap" style={{ background: highlighted ? 'rgba(249,115,22,0.15)' : accent + '18' }}>
                <Icon size={20} color={highlighted ? '#F97316' : accent} strokeWidth={1.75} />
              </div>
              <p className="plan-tagline" style={{ color: highlighted ? 'rgba(255,255,255,0.5)' : accent }}>{tagline}</p>
              <p className="plan-name" style={{ color: highlighted ? '#fff' : '#0f172a' }}>{name}</p>
              <p className="plan-desc">{desc}</p>
              <p className="plan-price" style={{ color: highlighted ? '#F97316' : '#0f172a' }}>{price}</p>
              <p className="plan-period">/{period}</p>
              <div className="plan-divider" />
              <div className="plan-features">
                {features.map(f => (
                  <div key={f.text} className={`plan-feature${!f.included ? ' excluded' : ''}`}>
                    {f.included
                      ? <Check size={14} style={{ color: '#F97316', flexShrink: 0, marginTop: 1 }} />
                      : <X size={14} style={{ color: '#94a3b8', flexShrink: 0, marginTop: 1 }} />
                    }
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
              <button onClick={openModal} className={`plan-cta ${highlighted ? 'plan-cta-orange' : i >= 1 ? 'plan-cta-orange' : 'plan-cta-default'}`}>{cta}</button>
            </div>
          ))}
        </div>
        <p className="pricing-note">All plans billed monthly. Annual billing saves 20%. GST applicable.</p>
      </div>
    </section>
  )
}
