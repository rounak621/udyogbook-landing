'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  Barcode,
  Layers,
  Settings2,
  Languages,
  BarChart3,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  PhoneCall,
  FileText,
  Building2,
  Users,
  Check,
  Zap,
  Star,
  Lock,
  ChevronRight,
} from 'lucide-react'

const FORMSPREE_CUSTOM_SOLUTIONS_ID = 'xrpgokjb'

const WORKFLOW_STEPS = [
  {
    num: '01',
    title: 'Tell us your specific need',
    desc: 'Share the exact bottleneck, workflow, or custom feature you cannot find in standard tools — barcode scanning, custom templates, or proprietary business logic.',
    icon: FileText,
  },
  {
    num: '02',
    title: 'We scope & quote your solution',
    desc: 'Our engineering team reviews your requirements, maps them to Udyog’s modular architecture, and provides a transparent quote and delivery timeline within 48 hours.',
    icon: Clock,
  },
  {
    num: '03',
    title: 'We build on top of Udyog',
    desc: 'Instead of coding from scratch, we extend our production-tested billing platform. You get rock-solid stability, zero GST bugs, and delivery in weeks, not months.',
    icon: Layers,
  },
  {
    num: '04',
    title: 'Deploy with ongoing support',
    desc: 'Launch your tailored billing software with complete staff onboarding, seamless legacy data migration, and continuous statutory GST updates.',
    icon: Zap,
  },
]

const EXAMPLE_SOLUTIONS = [
  {
    icon: Barcode,
    title: 'Barcode & QR Scanning for Retail',
    desc: 'Connect USB/wireless barcode scanners and thermal receipt printers. Scan items directly into GST bills at checkout with automatic batch, serial, and IMEI tracking.',
    tag: 'Retail & Supermarkets',
    color: '#F97316',
  },
  {
    icon: FileText,
    title: 'Industry-Specific Invoice Layouts',
    desc: 'Specialized print formats tailored for jewellery (hallmarking, gross/net purity), pharma (batch, expiry, drug license), or textiles (meters, cut-pieces, folds).',
    tag: 'Specialized Trade',
    color: '#10B981',
  },
  {
    icon: Settings2,
    title: 'Custom POS & Inventory Sync',
    desc: 'Bidirectional sync with your existing ERP, warehouse management system, or e-commerce storefront (Shopify/WooCommerce) without double data entry.',
    tag: 'Integrations',
    color: '#3B82F6',
  },
  {
    icon: Languages,
    title: 'Multi-Language Regional Invoicing',
    desc: 'Generate, print, and WhatsApp invoices in regional Indian languages (Tamil, Telugu, Gujarati, Marathi, Bengali, Kannada) beyond standard English and Hindi.',
    tag: 'Regional Commerce',
    color: '#8B5CF6',
  },
  {
    icon: BarChart3,
    title: 'Custom Analytics & Audit Dashboards',
    desc: 'Specialized business intelligence views: sales rep commission tracking, real-time gross margins per SKU, supplier rebate calculations, and 1-click CA audit exports.',
    tag: 'Business Intelligence',
    color: '#EC4899',
  },
  {
    icon: Building2,
    title: 'White-Label Franchise Solutions',
    desc: 'Deploy a centralized billing system customized with your corporate identity across franchise outlets, with master head-office oversight and multi-branch ledgers.',
    tag: 'Franchises & Chains',
    color: '#F59E0B',
  },
]

export default function CustomSolutionsPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    industry: '',
    phone: '',
    email: '',
    description: '',
    budget_range: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_CUSTOM_SOLUTIONS_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({
          full_name: '',
          company_name: '',
          industry: '',
          phone: '',
          email: '',
          description: '',
          budget_range: '',
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const scrollToForm = () => {
    const el = document.getElementById('quote-form')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 76, minHeight: '100vh', background: '#fff' }}>
        <style suppressHydrationWarning>{`
          /* Hero styles */
          .cs-hero {
            background: #0F172A;
            padding: clamp(56px, 7vw, 96px) var(--section-px);
            position: relative;
            overflow: hidden;
            color: #fff;
          }
          .cs-hero::before {
            content: '';
            position: absolute; top: -100px; right: -80px;
            width: 320px; height: 320px; border-radius: 50%;
            background: radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%);
            pointer-events: none;
          }
          .cs-hero-inner {
            max-width: 980px;
            margin: 0 auto;
            text-align: center;
            position: relative;
            z-index: 1;
          }
          .cs-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(249,115,22,0.12);
            border: 1px solid rgba(249,115,22,0.3);
            color: #F97316;
            border-radius: 100px;
            padding: 6px 16px;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 24px;
          }
          .cs-hero-title {
            font-family: var(--font-display);
            font-size: clamp(34px, 5.5vw, 58px);
            font-weight: 400;
            color: #fff;
            line-height: 1.15;
            margin-bottom: 22px;
            letter-spacing: -0.02em;
          }
          .cs-hero-sub {
            font-size: clamp(16px, 2.2vw, 20px);
            color: rgba(255,255,255,0.7);
            line-height: 1.65;
            max-width: 780px;
            margin: 0 auto 36px;
          }
          .cs-hero-actions {
            display: flex;
            gap: 14px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 44px;
          }
          .btn-cs-primary {
            background: #F97316;
            color: #fff;
            border: none;
            padding: 15px 34px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 20px rgba(249,115,22,0.4);
            font-family: var(--font-body);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }
          .btn-cs-primary:hover {
            background: #ea580c;
            transform: translateY(-2px);
          }
          .btn-cs-secondary {
            background: rgba(255,255,255,0.06);
            color: #fff;
            border: 1.5px solid rgba(255,255,255,0.2);
            padding: 14px 28px;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }
          .btn-cs-secondary:hover {
            border-color: #F97316;
            color: #F97316;
            background: rgba(249,115,22,0.08);
          }
          .cs-hero-stats {
            display: flex;
            justify-content: center;
            gap: clamp(24px, 5vw, 64px);
            padding-top: 32px;
            border-top: 1px solid rgba(255,255,255,0.08);
            flex-wrap: wrap;
          }
          .cs-stat-val { font-size: 26px; font-weight: 800; color: #F97316; }
          .cs-stat-lbl { font-size: 12px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px; }

          /* Steps Section */
          .cs-section {
            padding: clamp(60px, 8vw, 100px) var(--section-px);
            max-width: 1280px;
            margin: 0 auto;
          }
          .cs-section-header {
            text-align: center;
            max-width: 720px;
            margin: 0 auto 56px;
          }
          .cs-section-label {
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #F97316;
            margin-bottom: 10px;
            display: block;
          }
          .cs-section-title {
            font-family: var(--font-display);
            font-size: clamp(28px, 4.5vw, 44px);
            font-weight: 400;
            color: #0F172A;
            line-height: 1.2;
            margin-bottom: 14px;
            letter-spacing: -0.01em;
          }
          .cs-section-desc {
            font-size: 16px;
            color: #64748B;
            line-height: 1.65;
          }
          .cs-steps-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
            position: relative;
          }
          .cs-step-card {
            background: #F8FAFC;
            border: 1.5px solid #E2E8F0;
            border-radius: 18px;
            padding: 28px 24px;
            transition: all 0.2s;
            display: flex;
            flex-direction: column;
          }
          .cs-step-card:hover {
            border-color: #F97316;
            background: #FFF5E6;
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(249,115,22,0.08);
          }
          .cs-step-num {
            font-size: 12px;
            font-weight: 800;
            color: #F97316;
            letter-spacing: 0.08em;
            margin-bottom: 14px;
          }
          .cs-step-icon {
            width: 44px;
            height: 44px;
            background: #fff;
            border: 1.5px solid #E2E8F0;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 18px;
            color: #0F172A;
          }
          .cs-step-title {
            font-size: 18px;
            font-weight: 700;
            color: #0F172A;
            margin-bottom: 10px;
          }
          .cs-step-desc {
            font-size: 14px;
            color: #64748B;
            line-height: 1.65;
          }

          /* Examples Grid */
          .cs-examples-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            margin-bottom: 40px;
          }
          .cs-example-card {
            background: #fff;
            border: 1.5px solid #E2E8F0;
            border-radius: 20px;
            padding: 30px 26px;
            transition: all 0.25s;
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 16px rgba(0,0,0,0.03);
          }
          .cs-example-card:hover {
            border-color: #F97316;
            transform: translateY(-4px);
            box-shadow: 0 16px 40px rgba(0,0,0,0.07);
          }
          .cs-example-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 18px;
          }
          .cs-example-icon {
            width: 48px;
            height: 48px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .cs-example-tag {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            padding: 4px 10px;
            border-radius: 100px;
            background: #F1F5F9;
            color: #475569;
          }
          .cs-example-title {
            font-size: 19px;
            font-weight: 700;
            color: #0F172A;
            margin-bottom: 10px;
            line-height: 1.35;
          }
          .cs-example-desc {
            font-size: 14px;
            color: #64748B;
            line-height: 1.7;
            flex: 1;
          }
          .cs-custom-prompt-banner {
            background: #F8FAFC;
            border: 1.5px dashed #CBD5E1;
            border-radius: 16px;
            padding: 24px 32px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
          }
          .cs-prompt-text {
            font-size: 16px;
            font-weight: 600;
            color: #334155;
            text-align: left;
          }

          /* Comparison / Trust */
          .cs-trust-wrap {
            background: #F8FAFC;
            border-radius: 28px;
            padding: clamp(48px, 6vw, 72px) clamp(24px, 5vw, 64px);
            margin: 0 auto;
            border: 1.5px solid #E2E8F0;
          }
          .cs-comp-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 40px;
          }
          .cs-comp-col {
            background: #fff;
            border-radius: 16px;
            border: 1.5px solid #E2E8F0;
            padding: 28px;
            display: flex;
            flex-direction: column;
          }
          .cs-comp-col.highlight {
            border-color: #F97316;
            background: #fff;
            box-shadow: 0 10px 30px rgba(249,115,22,0.12);
            position: relative;
          }
          .cs-comp-badge {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: #F97316;
            color: #fff;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            padding: 4px 14px;
            border-radius: 100px;
          }
          .cs-comp-head {
            font-size: 18px;
            font-weight: 700;
            color: #0F172A;
            margin-bottom: 6px;
          }
          .cs-comp-sub {
            font-size: 13px;
            color: #64748B;
            margin-bottom: 20px;
          }
          .cs-comp-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            font-size: 14px;
            color: #334155;
            margin-bottom: 14px;
            line-height: 1.5;
          }

          /* Form Section */
          .cs-form-wrap {
            max-width: 820px;
            margin: 0 auto;
            background: #fff;
            border: 1.5px solid #E2E8F0;
            border-radius: 24px;
            padding: clamp(32px, 5vw, 56px);
            box-shadow: 0 12px 48px rgba(0,0,0,0.06);
          }
          .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
          .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
          .form-label { font-size: 13px; font-weight: 600; color: #374151; }
          .form-input {
            padding: 12px 14px; border: 1.5px solid #E2E8F0; border-radius: 10px;
            font-size: 14px; color: #0F172A; font-family: var(--font-body);
            transition: border-color 0.2s; outline: none; background: #fff;
          }
          .form-input:focus { border-color: #F97316; box-shadow: 0 0 0 3px rgba(249,115,22,0.1); }
          .form-textarea { min-height: 120px; resize: vertical; }
          .form-select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 14px center;
            padding-right: 38px;
          }
          .form-submit {
            width: 100%; padding: 16px; background: #F97316; color: #fff; border: none;
            border-radius: 10px; font-size: 16px; font-weight: 700; cursor: pointer;
            font-family: var(--font-body); transition: all 0.2s;
            box-shadow: 0 4px 18px rgba(249,115,22,0.35);
            display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          }
          .form-submit:hover { background: #ea580c; transform: translateY(-1px); }

          /* Final CTA Banner */
          .cs-bottom-banner {
            background: #0F172A;
            border-radius: 24px;
            padding: clamp(48px, 6vw, 72px) clamp(24px, 5vw, 64px);
            text-align: center;
            color: #fff;
            position: relative;
            overflow: hidden;
            margin: 60px 0 0;
          }
          .cs-bottom-banner::before {
            content: '';
            position: absolute; bottom: -80px; left: -40px;
            width: 240px; height: 240px; border-radius: 50%;
            background: radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%);
            pointer-events: none;
          }

          @media (max-width: 960px) {
            .cs-steps-grid { grid-template-columns: repeat(2, 1fr); }
            .cs-examples-grid { grid-template-columns: repeat(2, 1fr); }
            .cs-comp-grid { grid-template-columns: 1fr; }
          }
          @media (max-width: 640px) {
            .cs-steps-grid { grid-template-columns: 1fr; }
            .cs-examples-grid { grid-template-columns: 1fr; }
            .form-row { grid-template-columns: 1fr; }
            .cs-custom-prompt-banner { text-align: center; justify-content: center; }
            .cs-prompt-text { text-align: center; }
          }
        `}</style>

        {/* ── SECTION 1: HERO ────────────────────────────────────────── */}
        <div className="cs-hero">
          <div className="cs-hero-inner">
            <div className="cs-badge">
              <Sparkles size={14} />
              <span>Custom Invoicing & Billing Engineering</span>
            </div>

            <h1 className="cs-hero-title">
              Searched everywhere for billing software that fits your exact workflow — and found{' '}
              <span style={{ fontStyle: 'italic', color: '#F97316' }}>nothing?</span>
            </h1>

            <p className="cs-hero-sub">
              We&apos;ll build the exact billing solution your business needs — personalized, affordable, and ready in weeks, not months.
            </p>

            <div className="cs-hero-actions">
              <button onClick={scrollToForm} className="btn-cs-primary">
                <span>Tell Us What You Need</span>
                <ArrowRight size={18} />
              </button>
              <a href="#examples" className="btn-cs-secondary">
                <span>Explore Example Solutions</span>
                <ChevronRight size={16} />
              </a>
            </div>

            <div className="cs-hero-stats">
              <div>
                <p className="cs-stat-val">2–3 Weeks</p>
                <p className="cs-stat-lbl">Average Delivery Time</p>
              </div>
              <div>
                <p className="cs-stat-val">80% Less</p>
                <p className="cs-stat-lbl">Cost vs Agency Dev</p>
              </div>
              <div>
                <p className="cs-stat-val">100%</p>
                <p className="cs-stat-lbl">GST & Audit Compliant</p>
              </div>
              <div>
                <p className="cs-stat-val">99.9%</p>
                <p className="cs-stat-lbl">Platform Uptime</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: HOW IT WORKS ─────────────────────────────────── */}
        <section className="cs-section">
          <div className="cs-section-header">
            <span className="cs-section-label">Tailored Invoicing Engine</span>
            <h2 className="cs-section-title">How we deliver your custom billing software</h2>
            <p className="cs-section-desc">
              Building from scratch takes 6 months and costs a fortune. We customize our battle-tested Udyog billing platform for your specific business workflow.
            </p>
          </div>

          <div className="cs-steps-grid">
            {WORKFLOW_STEPS.map((s) => {
              const IconComponent = s.icon
              return (
                <div key={s.num} className="cs-step-card">
                  <span className="cs-step-num">STEP {s.num}</span>
                  <div className="cs-step-icon">
                    <IconComponent size={22} color="#F97316" />
                  </div>
                  <h3 className="cs-step-title">{s.title}</h3>
                  <p className="cs-step-desc">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── SECTION 3: WHAT WE CAN BUILD FOR YOU ────────────────────── */}
        <section id="examples" style={{ background: '#F8FAFC', padding: 'clamp(60px, 8vw, 100px) var(--section-px)', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="cs-section-header">
              <span className="cs-section-label">Real Customization Examples</span>
              <h2 className="cs-section-title">What we can build for your business</h2>
              <p className="cs-section-desc">
                These are illustrative examples of features we regularly build for Indian businesses. Every business is unique — tell us your exact requirements.
              </p>
            </div>

            <div className="cs-examples-grid">
              {EXAMPLE_SOLUTIONS.map((ex, idx) => {
                const IconComp = ex.icon
                return (
                  <div key={idx} className="cs-example-card">
                    <div className="cs-example-top">
                      <div className="cs-example-icon" style={{ background: `${ex.color}15` }}>
                        <IconComp size={24} color={ex.color} />
                      </div>
                      <span className="cs-example-tag">{ex.tag}</span>
                    </div>
                    <h3 className="cs-example-title">{ex.title}</h3>
                    <p className="cs-example-desc">{ex.desc}</p>
                  </div>
                )
              })}
            </div>

            <div className="cs-custom-prompt-banner">
              <div className="cs-prompt-text">
                <p style={{ margin: 0, color: '#0F172A', fontWeight: 700, fontSize: 17 }}>
                  Have a unique workflow or proprietary billing requirement?
                </p>
                <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: 14, fontWeight: 400 }}>
                  We don’t believe in rigid one-size-fits-all software. Describe your exact operational need and our engineers will scope it.
                </p>
              </div>
              <button onClick={scrollToForm} className="btn-cs-primary" style={{ padding: '12px 24px', fontSize: 14 }}>
                <span>Describe Your Workflow</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: TRUST & CREDIBILITY ─────────────────────────── */}
        <section className="cs-section">
          <div className="cs-trust-wrap">
            <div className="cs-section-header" style={{ marginBottom: 36 }}>
              <span className="cs-section-label">Why Choose Udyog Custom Solutions</span>
              <h2 className="cs-section-title">Why extend Udyog instead of coding from scratch?</h2>
              <p className="cs-section-desc">
                Traditional software agencies build billing engines from scratch — taking months and introducing calculation bugs. Udyog gives you bespoke customization with enterprise foundation.
              </p>
            </div>

            <div className="cs-comp-grid">
              {/* Option A: Agency from Scratch */}
              <div className="cs-comp-col">
                <p className="cs-comp-head">Hiring a Dev Agency</p>
                <p className="cs-comp-sub">Custom code built from zero</p>
                <div className="cs-comp-item">
                  <span style={{ color: '#EF4444', fontWeight: 800 }}>✕</span>
                  <span><strong>6 to 12 months</strong> development timeline</span>
                </div>
                <div className="cs-comp-item">
                  <span style={{ color: '#EF4444', fontWeight: 800 }}>✕</span>
                  <span><strong>₹5,00,000+</strong> upfront development costs</span>
                </div>
                <div className="cs-comp-item">
                  <span style={{ color: '#EF4444', fontWeight: 800 }}>✕</span>
                  <span>High risk of GST rounding and tax filing calculation bugs</span>
                </div>
                <div className="cs-comp-item">
                  <span style={{ color: '#EF4444', fontWeight: 800 }}>✕</span>
                  <span>Breaks every time the GST Council alters filing rules</span>
                </div>
              </div>

              {/* Option B: Udyog Custom (Highlighted) */}
              <div className="cs-comp-col highlight">
                <span className="cs-comp-badge">Recommended</span>
                <p className="cs-comp-head" style={{ color: '#F97316' }}>Udyog Custom Solutions</p>
                <p className="cs-comp-sub">Bespoke features on a battle-tested core</p>
                <div className="cs-comp-item">
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span><strong>2 to 4 weeks</strong> rapid turnaround</span>
                </div>
                <div className="cs-comp-item">
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span><strong>80% lower cost</strong> than ground-up custom builds</span>
                </div>
                <div className="cs-comp-item">
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span>Built on our proven core <strong>powering GST billing for growing businesses across India</strong></span>
                </div>
                <div className="cs-comp-item">
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span>Automatic statutory GST updates, ISO security & cloud backups</span>
                </div>
              </div>

              {/* Option C: Off-the-shelf Generic Apps */}
              <div className="cs-comp-col">
                <p className="cs-comp-head">Generic Billing Apps</p>
                <p className="cs-comp-sub">Tally, Vyapar, Busy, Zoho Books</p>
                <div className="cs-comp-item">
                  <span style={{ color: '#EF4444', fontWeight: 800 }}>✕</span>
                  <span>Rigid templates that cannot adapt to your workflow</span>
                </div>
                <div className="cs-comp-item">
                  <span style={{ color: '#EF4444', fontWeight: 800 }}>✕</span>
                  <span>Feature requests ignored or stuck on multi-year roadmaps</span>
                </div>
                <div className="cs-comp-item">
                  <span style={{ color: '#EF4444', fontWeight: 800 }}>✕</span>
                  <span>Forces your staff to perform messy offline workarounds</span>
                </div>
                <div className="cs-comp-item">
                  <span style={{ color: '#EF4444', fontWeight: 800 }}>✕</span>
                  <span>Zero dedicated engineering support for unique business logic</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: LEAD CAPTURE FORM ───────────────────────────── */}
        <section id="quote-form" style={{ padding: 'clamp(40px, 6vw, 80px) var(--section-px)', background: '#fff' }}>
          <div className="cs-form-wrap">
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <span className="cs-section-label">Tell Us About Your Project</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 36px)', color: '#0F172A', fontWeight: 400, margin: '6px 0 10px' }}>
                Request a Custom Solution Scope & Quote
              </h2>
              <p style={{ fontSize: 15, color: '#64748B', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
                Fill out the details below. Our engineering leads will review your workflow and contact you within 24 hours with a scope assessment.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    className="form-input"
                    type="text"
                    name="full_name"
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Business / Company Name *</label>
                  <input
                    className="form-input"
                    type="text"
                    name="company_name"
                    placeholder="e.g. Kumar Retails Pvt Ltd"
                    value={formData.company_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Business Type / Industry *</label>
                  <select
                    className="form-input form-select"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your industry</option>
                    <option value="Retail & Supermarket">Retail & Supermarket</option>
                    <option value="Wholesale & Distribution">Wholesale & Distribution</option>
                    <option value="Manufacturing & Fabrication">Manufacturing & Fabrication</option>
                    <option value="Equipment & Event Rental">Equipment & Event Rental</option>
                    <option value="Healthcare, Clinic & Pharma">Healthcare, Clinic & Pharma</option>
                    <option value="Jewellery & Precious Metals">Jewellery & Precious Metals</option>
                    <option value="Textile, Apparel & Garments">Textile, Apparel & Garments</option>
                    <option value="Professional Services & Agency">Professional Services & Agency</option>
                    <option value="Logistics & Transport">Logistics & Transport</option>
                    <option value="Other">Other Unique Industry</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp Number *</label>
                  <input
                    className="form-input"
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    placeholder="ramesh@kumarretails.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Estimated Budget Range (Optional)</label>
                  <select
                    className="form-input form-select"
                    name="budget_range"
                    value={formData.budget_range}
                    onChange={handleChange}
                  >
                    <option value="">Select budget range (optional)</option>
                    <option value="Under ₹10,000">Under ₹10,000</option>
                    <option value="₹10,000 – ₹25,000">₹10,000 – ₹25,000</option>
                    <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                    <option value="₹50,000+">₹50,000+</option>
                    <option value="Not sure yet / Need guidance">Not sure yet / Need guidance</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Describe the exact billing workflow or feature you need *</label>
                <textarea
                  className="form-input form-textarea"
                  name="description"
                  placeholder="Explain what you are trying to achieve (e.g. 'We need wireless barcode scanning at 4 checkout counters that prints custom thermal receipts with loyalty points, and syncs stock with our warehouse')..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="form-submit"
                disabled={status === 'loading'}
                style={{ opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
              >
                {status === 'loading' ? 'Submitting Scope Request...' : 'Get a Custom Quote →'}
              </button>

              {status === 'success' && (
                <div style={{ marginTop: 18, background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <CheckCircle2 size={24} color="#16A34A" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p style={{ fontWeight: 700, color: '#15803D', fontSize: 15, margin: 0 }}>
                      Custom Quote Request Received!
                    </p>
                    <p style={{ fontSize: 13, color: '#16A34A', margin: '4px 0 0', lineHeight: 1.5 }}>
                      Thank you! Our technical architecture team will review your workflow and reach out via phone or email within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div style={{ marginTop: 18, background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: 12, padding: '16px 20px' }}>
                  <p style={{ fontWeight: 700, color: '#DC2626', fontSize: 14, margin: 0 }}>
                    Unable to submit form. Please reach out to our team directly at{' '}
                    <a href="mailto:contact@udyogbook.in" style={{ textDecoration: 'underline', color: '#DC2626' }}>
                      contact@udyogbook.in
                    </a>{' '}
                    or call{' '}
                    <a href="tel:+917021922933" style={{ textDecoration: 'underline', color: '#DC2626' }}>
                      +91 70219 22933
                    </a>.
                  </p>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* ── SECTION 6: FINAL CTA BANNER ────────────────────────────── */}
        <section style={{ padding: '0 var(--section-px) clamp(60px, 8vw, 100px)', maxWidth: 1280, margin: '0 auto' }}>
          <div className="cs-bottom-banner">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 400, color: '#fff', marginBottom: 16 }}>
              Stop forcing your business into{' '}
              <span style={{ fontStyle: 'italic', color: '#F97316' }}>rigid billing tools.</span>
            </h2>
            <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.65)', maxWidth: 620, margin: '0 auto 36px', lineHeight: 1.65 }}>
              Let’s build the exact billing software your company deserves — fast, affordable, and tailored for you.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={scrollToForm} className="btn-cs-primary" style={{ padding: '16px 36px', fontSize: 16 }}>
                <span>Get Your Custom Quote Today →</span>
              </button>
              <a
                href="https://wa.me/917021922933?text=Hi%2C%20I%20am%20interested%20in%20a%20custom%20billing%20solution%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cs-secondary"
                style={{ padding: '15px 28px', fontSize: 15 }}
              >
                <PhoneCall size={18} color="#F97316" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 24 }}>
              No obligation · 48-hour scope estimate · Dedicated engineering support
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
