'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Check, X, Zap, Star, Crown, Building2, Smartphone, Sparkles, Monitor, Layers, ChevronDown, ChevronUp, Shield, Clock, CreditCard, RefreshCw } from 'lucide-react'
import ComingSoonModal from '../components/ComingSoonModal'
import { filterPlansByPlatform, PlatformType } from '../../lib/pricingData'

const ICON_MAP = {
  Zap,
  Star,
  Crown,
  Building2,
  Smartphone,
  Sparkles,
}

const COMPARISON_FEATURES = [
  { category: 'Billing', features: [
    { name: 'Unlimited Sales Invoices', plans: [true, true, true, true] },
    { name: 'Unlimited Purchase Bills', plans: [true, true, true, true] },
    { name: 'WhatsApp Invoice Sharing', plans: [true, true, true, true] },
    { name: 'GST-Compliant Invoices', plans: [true, true, true, true] },
    { name: 'Custom Invoice Themes', plans: [false, true, true, true] },
    { name: 'Custom Branding on Invoices', plans: [false, false, false, true] },
  ]},
  { category: 'AI & Voice', features: [
    { name: 'Maya AI Voice Billing', plans: [false, true, true, true] },
    { name: 'Hinglish Voice Support', plans: [false, true, true, true] },
    { name: 'AI Expense Tracking', plans: [false, true, true, true] },
  ]},
  { category: 'Inventory', features: [
    { name: 'Basic Stock Tracking', plans: [true, true, true, true] },
    { name: 'Low Stock Alerts', plans: [false, true, true, true] },
    { name: 'Stock Adjustments', plans: [false, true, true, true] },
    { name: 'Rental Equipment Scheduling', plans: [false, false, false, true] },
    { name: 'Automated In/Out Inventory Sync', plans: [false, false, false, true] },
  ]},
  { category: 'GST & Reports', features: [
    { name: 'Basic Reports', plans: [true, true, true, true] },
    { name: 'GSTR-1 Report', plans: [false, false, true, true] },
    { name: 'GSTR-3B Report', plans: [false, false, true, true] },
    { name: 'Profit & Loss Statement', plans: [false, false, true, true] },
    { name: 'CA Collaboration Portal', plans: [false, false, true, true] },
  ]},
  { category: 'Team', features: [
    { name: 'Staff Access', plans: [false, '2 users', '5 users', 'Unlimited'] },
    { name: 'Role-Based Permissions', plans: [false, false, true, true] },
  ]},
  { category: 'Rental (Enterprise only)', features: [
    { name: 'Rental Order Management', plans: [false, false, false, true] },
    { name: 'Late Fee Automation', plans: [false, false, false, true] },
    { name: 'Overdue WhatsApp Reminders', plans: [false, false, false, true] },
    { name: 'Rental Invoice Generation', plans: [false, false, false, true] },
  ]},
]

const FAQS = [
  { q: 'Is there a free trial?', a: 'Yes — all plans include a 14-day free trial. No credit card required. You can explore every feature before committing to a paid plan.' },
  { q: 'What is the billing cycle?', a: 'Udyog offers 1-year and 3-year subscription plans. Choosing a 3-year plan saves you 20% across all plans.' },
  { q: 'Do you offer monthly billing?', a: 'Subscriptions are billed annually or in 3-year terms. The 3-year plan gives you a 20% discount. Annual billing allows us to keep subscription prices as low as possible and continually ship new features.' },
  { q: 'Can I change my plan later?', a: 'Absolutely. You can upgrade or downgrade your plan at any time from your account settings. Upgrades take effect immediately. Downgrades take effect at the next billing cycle.' },
  { q: 'Are prices inclusive of GST?', a: 'No — prices shown are exclusive of GST. 18% GST will be applicable on all plans as per Indian tax regulations. Your GST invoice will be provided for every payment.' },
  { q: 'What payment methods do you accept?', a: 'We accept UPI, credit/debit cards, net banking, and all major Indian payment methods including Paytm, PhonePe, and Google Pay.' },
  { q: 'Do you offer refunds?', a: 'We do not offer refunds on subscription payments. However, you can cancel at any time — your plan remains active until the end of the billing period. We strongly recommend using the 14-day free trial before purchasing. See our full Refund Policy for details.' },
  { q: 'Is my data safe?', a: 'Yes. All data is stored on secure servers in India with 256-bit SSL encryption. We comply with Indian data protection laws. Your invoice data, customer information, and GST data are fully protected.' },
  { q: 'Can I use Udyog for multiple businesses?', a: 'Yes — you can manage multiple businesses from a single Udyog account depending on your plan limit (e.g. 2 for Saral, 6 for Vistaar, and unlimited on standard web plans).' },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'1year' | '3year'>('1year')
  const [platformFilter, setPlatformFilter] = useState<'desktop' | 'mobile' | 'both'>('desktop')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showFullComparison, setShowFullComparison] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const filteredPlans = filterPlansByPlatform(platformFilter)

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68, background: '#fff', minHeight: '100vh' }}>
        <style suppressHydrationWarning>{`
          @media (max-width: 1024px) {
            .pricing-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 640px) {
            .pricing-cards-grid { grid-template-columns: 1fr !important; max-width: 420px; margin: 0 auto !important; }
          }
        `}</style>

        {/* ── Hero ── */}
        <section style={{ background: '#0F172A', padding: 'clamp(48px,6vw,80px) var(--section-px)', textAlign: 'center' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F97316', marginBottom: 14 }}>Pricing</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 400, color: '#fff', lineHeight: 1.15, marginBottom: 16, letterSpacing: '-0.02em' }}>
              Simple, <span style={{ fontStyle: 'italic', color: '#F97316' }}>honest</span> pricing
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 28 }}>
              All plans include a 14-day free trial. No credit card required. Cancel anytime.
            </p>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { Icon: Shield, text: 'Secure payments' },
                { Icon: Clock, text: '14-day free trial' },
                { Icon: CreditCard, text: 'No credit card' },
                { Icon: RefreshCw, text: 'Cancel anytime' },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                  <Icon size={14} color="#F97316" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Plan Controls: Term Switcher & Platform Filter ── */}
        <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '24px var(--section-px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          
          {/* 1. Billing Term Switcher (1 Year vs 3 Years Save 20%) */}
          <div style={{
            display: 'inline-flex',
            background: '#fff',
            padding: 4,
            borderRadius: 100,
            border: '1.5px solid #CBD5E1',
            gap: 4
          }}>
            <button
              type="button"
              onClick={() => setBillingCycle('1year')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 22px',
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                background: billingCycle === '1year' ? '#0F172A' : 'transparent',
                color: billingCycle === '1year' ? '#FFFFFF' : '#64748B',
                boxShadow: billingCycle === '1year' ? '0 2px 8px rgba(15, 23, 42, 0.25)' : 'none',
              }}
            >
              1 Year
            </button>

            <button
              type="button"
              onClick={() => setBillingCycle('3year')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 22px',
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                background: billingCycle === '3year' ? '#0F172A' : 'transparent',
                color: billingCycle === '3year' ? '#FFFFFF' : '#64748B',
                boxShadow: billingCycle === '3year' ? '0 2px 8px rgba(15, 23, 42, 0.25)' : 'none',
              }}
            >
              <span>3 Years</span>
              <span style={{
                background: '#F97316',
                color: '#FFFFFF',
                fontSize: 10,
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: 100,
                letterSpacing: '0.04em'
              }}>
                Save 20%
              </span>
            </button>
          </div>

          {/* 2. Platform Filter Toggle */}
          <div style={{
            display: 'inline-flex',
            background: '#F1F5F9',
            padding: 4,
            borderRadius: 100,
            border: '1px solid #E2E8F0',
            gap: 4
          }}>
            <button
              type="button"
              onClick={() => setPlatformFilter('desktop')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 18px',
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                background: platformFilter === 'desktop' ? '#F97316' : 'transparent',
                color: platformFilter === 'desktop' ? '#FFFFFF' : '#64748B',
              }}
            >
              <Monitor size={14} />
              Desktop
            </button>

            <button
              type="button"
              onClick={() => setPlatformFilter('mobile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 18px',
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                background: platformFilter === 'mobile' ? '#F97316' : 'transparent',
                color: platformFilter === 'mobile' ? '#FFFFFF' : '#64748B',
              }}
            >
              <Smartphone size={14} />
              Mobile
            </button>

            <button
              type="button"
              onClick={() => setPlatformFilter('both')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 18px',
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                background: platformFilter === 'both' ? '#F97316' : 'transparent',
                color: platformFilter === 'both' ? '#FFFFFF' : '#64748B',
              }}
            >
              <Layers size={14} />
              Mobile + Desktop
            </button>
          </div>
        </div>

        {/* Savings callout — show when 3year selected */}
        {billingCycle === '3year' && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px var(--section-px)', textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: '#15803d', fontWeight: 600 }}>
              🎉 3-Year subscription = save 20% on all plans. Save up to ₹3,593.
            </p>
          </div>
        )}

        {/* ── Plan cards ── */}
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)', background: '#F8FAFC' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div
              className="pricing-cards-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: platformFilter === 'both' ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                gap: 16,
                alignItems: 'stretch',
                maxWidth: platformFilter === 'both' ? 680 : undefined,
                margin: platformFilter === 'both' ? '0 auto' : undefined,
              }}
            >
              {filteredPlans.map(plan => {
                const Icon = ICON_MAP[plan.iconName] || Zap
                const highlighted = plan.highlighted
                const is3Year = billingCycle === '3year'
                const displayMonthly = is3Year ? plan.threeYearMonthlyPrice : plan.monthlyPrice
                const displayTotal = is3Year ? plan.threeYearPrice : plan.yearlyPrice
                const savings = is3Year ? (plan.yearlyPrice * 3) - plan.threeYearPrice : 0

                return (
                  <div key={plan.id} style={{
                    borderRadius: 20, padding: '28px 24px',
                    border: `2px solid ${highlighted ? '#F97316' : '#E2E8F0'}`,
                    background: highlighted ? '#0F172A' : '#fff',
                    display: 'flex', flexDirection: 'column', height: '100%',
                    position: 'relative',
                    boxShadow: highlighted ? '0 16px 48px rgba(249,115,22,0.25)' : 'none',
                  }}>
                    {/* Badge top center */}
                    {plan.badge && (
                      <div style={{
                        position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                        background: highlighted ? '#F97316' : '#8b5cf6',
                        color: '#fff', fontSize: 10, fontWeight: 800,
                        padding: '4px 16px', borderRadius: 100,
                        letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                      }}>{plan.badge}</div>
                    )}

                    {/* Platform badge top right */}
                    <div style={{
                      position: 'absolute', top: 14, right: 14,
                      fontSize: 10, fontWeight: 700, padding: '3px 9px',
                      borderRadius: 100, letterSpacing: '0.04em',
                      ...(plan.platform === 'mobile'
                        ? { background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd' }
                        : plan.platform === 'web'
                        ? { background: highlighted ? 'rgba(255,255,255,0.1)' : '#f1f5f9', color: highlighted ? '#94a3b8' : '#475569', border: highlighted ? '1px solid rgba(255,255,255,0.2)' : '1px solid #cbd5e1' }
                        : { background: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa' })
                    }}>
                      {plan.platformBadge}
                    </div>

                    <div style={{ width: 40, height: 40, borderRadius: 10, background: highlighted ? 'rgba(249,115,22,0.15)' : plan.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                      <Icon size={20} color={highlighted ? '#F97316' : plan.color} strokeWidth={1.75} />
                    </div>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: highlighted ? 'rgba(255,255,255,0.5)' : plan.color, marginBottom: 4 }}>{plan.tagline}</p>
                    <p style={{ fontSize: 22, fontWeight: 800, color: highlighted ? '#fff' : '#0f172a', marginBottom: 6 }}>{plan.name}</p>
                    <p style={{ fontSize: 13, color: highlighted ? 'rgba(255,255,255,0.5)' : '#64748b', lineHeight: 1.5, marginBottom: 20, minHeight: 38 }}>{plan.description}</p>
                    
                    {/* Price display */}
                    <div style={{ marginBottom: 2 }}>
                      <span style={{ fontSize: 13, color: highlighted ? 'rgba(255,255,255,0.5)' : '#94a3b8', fontWeight: 500 }}>₹</span>
                      <span style={{ fontSize: 52, fontWeight: 900, letterSpacing: '-0.04em', color: highlighted ? '#F97316' : '#0f172a', lineHeight: 1 }}>
                        {displayMonthly}
                      </span>
                      <span style={{ fontSize: 14, color: highlighted ? 'rgba(255,255,255,0.4)' : '#94a3b8', fontWeight: 500 }}> /month</span>
                    </div>

                    {/* Billed info */}
                    <p style={{ fontSize: 12, color: highlighted ? 'rgba(255,255,255,0.35)' : '#94a3b8', marginBottom: is3Year ? 6 : 16 }}>
                      {is3Year ? (
                        <>Billed as ₹{displayTotal.toLocaleString('en-IN')} for 3 years</>
                      ) : (
                        <>Billed as ₹{displayTotal.toLocaleString('en-IN')}/year</>
                      )}
                    </p>

                    {/* Savings badge for 3year */}
                    {is3Year && (
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: '#f0fdf4', border: '1px solid #bbf7d0',
                        borderRadius: 8, padding: '4px 8px', marginBottom: 14,
                        fontSize: 11, color: '#15803d', fontWeight: 700, width: 'fit-content'
                      }}>
                        🎉 Save ₹{savings.toLocaleString('en-IN')} (20% OFF)
                      </div>
                    )}
                    
                    <div style={{ height: 1, background: highlighted ? 'rgba(255,255,255,0.1)' : '#F1F5F9', marginBottom: 20 }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, flex: 1 }}>
                      {plan.features.map(f => (
                        <div key={f.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, lineHeight: 1.4, color: highlighted ? (f.included ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)') : (f.included ? '#334155' : '#94a3b8'), opacity: f.included ? 1 : 0.5 }}>
                          {f.included
                            ? <Check size={14} style={{ color: '#F97316', flexShrink: 0, marginTop: 1 }} />
                            : <X size={14} style={{ color: '#94a3b8', flexShrink: 0, marginTop: 1 }} />
                          }
                          <span>{f.text}</span>
                        </div>
                      ))}
                    </div>
                    <a href="https://app.udyogbook.in/sign-in" style={{
                      display: 'block', width: '100%', textAlign: 'center', padding: '13px 20px',
                      border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                      borderRadius: 10, fontSize: 14, fontWeight: 700,
                      textDecoration: 'none', marginTop: 'auto',
                      background: highlighted || plan.name !== 'Basic' ? '#F97316' : '#F1F5F9',
                      color: highlighted || plan.name !== 'Basic' ? '#fff' : '#334155',
                      boxShadow: (highlighted || plan.name !== 'Basic') ? '0 4px 16px rgba(249,115,22,0.4)' : 'none',
                    }}>
                      {plan.cta}
                    </a>
                  </div>
                )
              })}
            </div>
            <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: '#94a3b8' }}>
              All prices exclusive of GST (18%). 3-year plan saves 20%. 14-day free trial on all plans.
            </p>
          </div>
        </section>

        {/* ── Full comparison table ── */}
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)', background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,38px)', fontWeight: 400, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 10 }}>
                Compare all <span style={{ fontStyle: 'italic', color: '#F97316' }}>features</span>
              </h2>
              <p style={{ fontSize: 15, color: '#64748b' }}>See exactly what's included in each plan.</p>
            </div>

            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(4,1fr)', borderBottom: '2px solid #0f172a', paddingBottom: 12, marginBottom: 0 }}>
              <div />
              {['Basic', 'Pro', 'Premium', 'Enterprise'].map((p, i) => (
                <div key={p} style={{ textAlign: 'center', fontWeight: 800, fontSize: 14, color: i === 3 ? '#F97316' : '#0f172a' }}>{p}</div>
              ))}
            </div>

            {/* Show first 2 categories always, rest behind toggle */}
            {COMPARISON_FEATURES.slice(0, showFullComparison ? undefined : 2).map(cat => (
              <div key={cat.category}>
                <div style={{ background: '#F8FAFC', padding: '10px 16px', fontWeight: 700, fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 8 }}>
                  {cat.category}
                </div>
                {cat.features.map((feat, fi) => (
                  <div key={feat.name} style={{ display: 'grid', gridTemplateColumns: '2fr repeat(4,1fr)', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', background: fi % 2 === 0 ? '#fff' : '#fafafa', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, color: '#334155' }}>{feat.name}</span>
                    {feat.plans.map((val, pi) => (
                      <div key={pi} style={{ textAlign: 'center' }}>
                        {val === true ? <Check size={16} style={{ color: '#F97316', margin: '0 auto' }} /> :
                         val === false ? <X size={16} style={{ color: '#e2e8f0', margin: '0 auto' }} /> :
                         <span style={{ fontSize: 12, fontWeight: 600, color: '#F97316' }}>{val}</span>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            {/* Toggle button */}
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <button
                onClick={() => setShowFullComparison(!showFullComparison)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: '1.5px solid #E2E8F0', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, color: '#374151', cursor: 'pointer' }}
              >
                {showFullComparison ? 'Show less' : 'View full comparison'}
                {showFullComparison ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section style={{ padding: 'clamp(40px,5vw,64px) var(--section-px)', background: '#F8FAFC' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 400, color: '#0f172a', textAlign: 'center', marginBottom: 32, letterSpacing: '-0.02em' }}>
              What our customers <span style={{ fontStyle: 'italic', color: '#F97316' }}>say</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {[
                { name: 'Ramesh Gupta', role: 'Textile Trader, Surat', quote: 'Udyog Basic plan is perfect for my shop. For ₹149/month I get unlimited bills — cheaper than my phone recharge and saves me hours every week.' },
                { name: 'Priya Sharma', role: 'CA, Mumbai', quote: 'The Premium plan\'s CA portal is a game-changer. I can access all my clients\' financials directly without them sending me WhatsApp screenshots at midnight.' },
                { name: 'Vikram Singh', role: 'Camera Rental Business, Delhi', quote: 'Enterprise plan is built exactly for rental businesses like mine. The automated late fees alone save me ₹15,000 every month in unpaid penalties.' },
              ].map(t => (
                <div key={t.name} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, padding: '24px 20px' }}>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                    {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#F59E0B', fontSize: 14 }}>★</span>)}
                  </div>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: '#94a3b8' }}>{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)', background: '#fff' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 400, color: '#0f172a', textAlign: 'center', marginBottom: 40, letterSpacing: '-0.02em' }}>
              Frequently asked <span style={{ fontStyle: 'italic', color: '#F97316' }}>questions</span>
            </h2>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid #E2E8F0' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}
                >
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={18} color="#F97316" style={{ flexShrink: 0 }} /> : <ChevronDown size={18} color="#94a3b8" style={{ flexShrink: 0 }} />}
                </button>
                {openFaq === i && (
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.75, paddingBottom: 18 }}>{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section style={{ padding: 'clamp(48px,6vw,72px) var(--section-px)', background: '#0F172A', textAlign: 'center' }}>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,38px)', fontWeight: 400, color: '#fff', marginBottom: 14, letterSpacing: '-0.02em' }}>
              Start your free trial <span style={{ fontStyle: 'italic', color: '#F97316' }}>today</span>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>14 days free. No credit card. Cancel anytime.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://app.udyogbook.in/sign-in" style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8, background: '#F97316', color: '#fff', padding: '14px 28px', borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 16px rgba(249,115,22,0.4)' }}>
                Start free trial →
              </a>
              <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                Talk to sales
              </a>
            </div>
          </div>
        </section>

      </main>
      <ComingSoonModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <Footer />
    </>
  )
}
