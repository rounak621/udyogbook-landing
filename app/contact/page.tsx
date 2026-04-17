'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Mail, Phone, Clock, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '',
    phone: '', topic: '', message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/mbdpbgyw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ first_name: '', last_name: '', email: '', phone: '', topic: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68, minHeight: '100vh', background: '#fff' }}>
        <style suppressHydrationWarning>{`
          .contact-hero { background: #0F172A; padding: clamp(48px,6vw,80px) var(--section-px); text-align: center; }
          .contact-hero-inner { max-width: 640px; margin: 0 auto; }
          .contact-body { max-width: 1280px; margin: 0 auto; padding: clamp(48px,6vw,80px) var(--section-px); display: grid; grid-template-columns: 1fr 1.3fr; gap: 64px; align-items: start; }
          .contact-info {}
          .contact-info-title { font-size: 22px; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
          .contact-info-sub { font-size: 15px; color: #64748b; line-height: 1.7; margin-bottom: 36px; }
          .contact-card { background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 16px; padding: 20px 24px; margin-bottom: 16px; display: flex; align-items: flex-start; gap: 16px; transition: all 0.2s; }
          .contact-card:hover { border-color: #F97316; background: #FFF5E6; }
          .contact-card-icon { width: 44px; height: 44px; background: #FFF5E6; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
          .contact-card-title { font-size: 13px; font-weight: 700; color: #F97316; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px; }
          .contact-card-value { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 3px; }
          .contact-card-note { font-size: 12px; color: #94a3b8; }
          .contact-form-wrap { background: #fff; border: 1.5px solid #E2E8F0; border-radius: 20px; padding: 36px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
          .contact-form-title { font-size: 22px; font-weight: 700; color: #0f172a; margin-bottom: 6px; }
          .contact-form-sub { font-size: 14px; color: #64748b; margin-bottom: 28px; }
          .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
          .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
          .form-label { font-size: 13px; font-weight: 600; color: #374151; }
          .form-input {
            padding: 12px 14px; border: 1.5px solid #E2E8F0; border-radius: 10px;
            font-size: 14px; color: #0f172a; font-family: var(--font-body);
            transition: border-color 0.2s; outline: none; background: #fff;
          }
          .form-input:focus { border-color: #F97316; box-shadow: 0 0 0 3px rgba(249,115,22,0.1); }
          .form-textarea { min-height: 120px; resize: vertical; }
          .form-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 36px; }
          .form-submit {
            width: 100%; padding: 14px; background: #F97316; color: #fff; border: none;
            border-radius: 10px; font-size: 16px; font-weight: 700; cursor: pointer;
            font-family: var(--font-body); transition: all 0.2s;
            box-shadow: 0 4px 16px rgba(249,115,22,0.4);
          }
          .form-submit:hover { background: #ea580c; transform: translateY(-1px); }
          .form-note { text-align: center; font-size: 12px; color: #94a3b8; margin-top: 12px; }
          @media (max-width: 800px) { .contact-body { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } }
        `}</style>

        {/* Hero */}
        <div className="contact-hero">
          <div className="contact-hero-inner">
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F97316', marginBottom: 14 }}>Contact Us</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 400, color: '#fff', lineHeight: 1.15, marginBottom: 16, letterSpacing: '-0.02em' }}>
              We&apos;re here to <span style={{ fontStyle: 'italic', color: '#F97316' }}>help</span>
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
              Have a question about billing, GST, or your account? Our team responds within 2 hours on business days.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="contact-body">
          {/* Info cards */}
          <div className="contact-info">
            <p className="contact-info-title">Get in touch</p>
            <p className="contact-info-sub">Choose the best way to reach us. We&apos;re available Mon–Sat, 9am–7pm IST.</p>

            <div className="contact-card">
              <div className="contact-card-icon"><Mail size={20} color="#F97316" /></div>
              <div>
                <p className="contact-card-title">Email</p>
                <a href="mailto:contact@udyogbook.in" className="contact-card-value" style={{ textDecoration: 'none', color: '#0f172a' }}>contact@udyogbook.in</a>
                <p className="contact-card-note">We reply within 2 hours on business days</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon"><Phone size={20} color="#F97316" /></div>
              <div>
                <p className="contact-card-title">Phone / WhatsApp</p>
                <a href="tel:+917977422531" className="contact-card-value" style={{ textDecoration: 'none', color: '#0f172a' }}>+91 79774 22531</a>
                <p className="contact-card-note">Call or WhatsApp us anytime</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon"><Clock size={20} color="#F97316" /></div>
              <div>
                <p className="contact-card-title">Support Hours</p>
                <p className="contact-card-value">Mon – Sat, 9am – 7pm IST</p>
                <p className="contact-card-note">Sunday: Email support only</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon"><MapPin size={20} color="#F97316" /></div>
              <div>
                <p className="contact-card-title">Location</p>
                <p className="contact-card-value">Mumbai, Maharashtra</p>
                <p className="contact-card-note">India 🇮🇳</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            <p className="contact-form-title">Send us a message</p>
            <p className="contact-form-sub">Fill out the form and we&apos;ll get back to you within 2 hours.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First name *</label>
                  <input className="form-input" type="text" name="first_name" placeholder="Ravi" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Last name</label>
                  <input className="form-input" type="text" name="last_name" placeholder="Sharma" value={formData.last_name} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email address *</label>
                <input className="form-input" type="email" name="email" placeholder="ravi@business.com" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label className="form-label">Phone number</label>
                <input className="form-input" type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label">What can we help you with? *</label>
                <select className="form-input form-select" name="topic" value={formData.topic} onChange={handleChange} required>
                  <option value="">Select a topic</option>
                  <option value="Billing & Invoicing">Billing & Invoicing</option>
                  <option value="GST & Compliance">GST & Compliance</option>
                  <option value="Voice Billing (Maya)">Voice Billing (Maya)</option>
                  <option value="CA Portal Setup">CA Portal Setup</option>
                  <option value="Pricing & Plans">Pricing & Plans</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea className="form-input form-textarea" name="message" placeholder="Tell us more about your question or issue..." value={formData.message} onChange={handleChange} required />
              </div>

              <button
                type="submit"
                className="form-submit"
                disabled={status === 'loading'}
                style={{ opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
              >
                {status === 'loading' ? 'Sending...' : 'Send message →'}
              </button>
              
              {status === 'success' && (
                <div style={{ marginTop: 14, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>✅</span>
                  <div>
                    <p style={{ fontWeight: 700, color: '#15803d', fontSize: 14 }}>Message sent successfully!</p>
                    <p style={{ fontSize: 12, color: '#16a34a', marginTop: 3 }}>We'll get back to you within 2 hours on business days.</p>
                  </div>
                </div>
              )}
              {status === 'error' && (
                <div style={{ marginTop: 14, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '14px 16px' }}>
                  <p style={{ fontWeight: 700, color: '#dc2626', fontSize: 14 }}>
                    Something went wrong. Please email us at{' '}
                    <a href="mailto:contact@udyogbook.in" style={{ textDecoration: 'underline' }}>contact@udyogbook.in</a>
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
