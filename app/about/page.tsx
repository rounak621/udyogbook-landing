import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Globe, Zap, Shield, Mic2, Users, TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us — Udyog',
  description: 'Learn about Udyog — built for Indian MSMEs, retailers, and traders to bill smarter.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68, background: '#fff', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ background: '#0F172A', padding: 'clamp(60px,8vw,100px) var(--section-px)', textAlign: 'center' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F97316', marginBottom: 14 }}>Our Story</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,56px)', fontWeight: 400, color: '#fff', lineHeight: 1.15, marginBottom: 20, letterSpacing: '-0.02em' }}>
              Built for <span style={{ fontStyle: 'italic', color: '#F97316' }}>Bharat</span>, by Bharat
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto' }}>
              Udyog was born from a simple frustration — why is billing software in India so complicated? We set out to build something every shopkeeper, trader, and retailer could use without training.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F97316', marginBottom: 12 }}>Our Mission</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 400, color: '#0f172a', lineHeight: 1.2, marginBottom: 20, letterSpacing: '-0.02em' }}>
                Make every Indian business <span style={{ fontStyle: 'italic', color: '#F97316' }}>GST-ready</span>
              </h2>
              <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.8, marginBottom: 16 }}>
                India has over 63 million MSMEs. Most of them still use handwritten ledgers or complicated desktop software. We believe every small business owner — whether a chaiwala, a textile trader, or a camera rental shop — deserves modern, simple, GST-compliant billing.
              </p>
              <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.8 }}>
                Udyog is built mobile-first, voice-first, and India-first. Our Maya AI voice assistant lets you create an invoice just by speaking in Hinglish — no typing, no training required.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { number: '5,000+', label: 'Businesses using Udyog' },
                { number: '₹500Cr+', label: 'Invoiced on platform' },
                { number: '8 sec', label: 'Average invoice creation time' },
                { number: '4.9/5', label: 'Average rating' },
              ].map(stat => (
                <div key={stat.label} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 14, padding: '24px 20px' }}>
                  <p style={{ fontSize: 32, fontWeight: 900, color: '#F97316', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 6 }}>{stat.number}</p>
                  <p style={{ fontSize: 13, color: '#64748b' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)', background: '#F8FAFC' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F97316', marginBottom: 12 }}>What We Stand For</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 400, color: '#0f172a', letterSpacing: '-0.02em' }}>Our Values</h2>
            </div>
            {(() => {
              const VALUES = [
                { Icon: Globe, color: '#F97316', bg: '#FFF5E6', title: 'India First', desc: 'Every feature is designed for Indian businesses — GST, Hinglish voice, WhatsApp sharing, and more.' },
                { Icon: Zap, color: '#8b5cf6', bg: '#f5f3ff', title: 'Radical Simplicity', desc: 'If a feature takes more than 3 taps, we rethink it. Complexity is the enemy of adoption.' },
                { Icon: Shield, color: '#10b981', bg: '#f0fdf4', title: 'Trust & Compliance', desc: 'GST-compliant invoices, secure data storage, and CA collaboration built into the core.' },
                { Icon: Mic2, color: '#F97316', bg: '#FFF5E6', title: 'Voice First', desc: 'Maya AI lets you bill by speaking. No typing. No training. Just say it and it\'s done.' },
                { Icon: Users, color: '#0ea5e9', bg: '#eff6ff', title: 'CA Partnership', desc: 'We believe your CA is your partner. Udyog gives them their own portal to serve you better.' },
                { Icon: TrendingUp, color: '#10b981', bg: '#f0fdf4', title: 'Growing with You', desc: 'From a solo kirana to a multi-branch business — Udyog scales with your growth.' },
              ]

              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                  {VALUES.map(({ Icon, color, bg, title, desc }) => (
                    <div key={title} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, padding: '28px 24px' }}>
                      <div style={{ width: 48, height: 48, background: bg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                        <Icon size={22} color={color} strokeWidth={1.75} />
                      </div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{title}</h3>
                      <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>{desc}</p>
                    </div>
                  ))}
                </div>
              )
            })()}
          </div>
        </section>

        {/* Team */}
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F97316', marginBottom: 12 }}>The Team</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 400, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 20 }}>
              Built by people who <span style={{ fontStyle: 'italic', color: '#F97316' }}>love small business</span>
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.8, marginBottom: 36 }}>
              We are a small, passionate team based in Mumbai. We talk to real business owners every week — kirana stores, textile traders, camera rental shops, pharmacies — to make sure Udyog solves real problems.
            </p>
            <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#F97316', color: '#fff', padding: '14px 28px', borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 16px rgba(249,115,22,0.35)' }}>
              Get in touch →
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
