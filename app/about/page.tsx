import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AboutCTAButtons from './AboutCTAButtons'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Udyog — India\'s Next-Generation GST Billing Platform',
  description: 'Udyog is India\'s GST-ready billing and business management platform for retailers, traders, MSMEs, and CAs. Our story, mission, and the team behind the product.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68, minHeight: '100vh', background: '#fff' }}>
        {/* Hero section */}
        <section style={{ background: '#0F172A', padding: 'clamp(60px,8vw,100px) var(--section-px)', textAlign: 'center' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F97316', marginBottom: 14, display: 'inline-block' }}>OUR STORY</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,56px)', fontWeight: 400, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
              Built by people who love small business
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto' }}>
              We are a small, passionate team based in Mumbai. We talk to real business owners every week — kirana stores, textile traders, camera rental shops — to make sure Udyog solves real problems.
            </p>
          </div>
        </section>

        {/* About section */}
        <section style={{ background: '#fff', padding: 'clamp(56px,7vw,80px) var(--section-px)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 400, color: '#0f172a', marginBottom: 20 }}>
              What is Udyog?
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.8, marginBottom: 32 }}>
              Udyog is India's next-generation GST-ready billing and business management platform built specially for retailers, traders, MSMEs, and Chartered Accountants. We bring together billing, inventory, GST compliance, CA collaboration, and rental business management into one powerful, easy-to-use platform — designed for how Indian businesses actually operate. No complexity. No unnecessary features. Everything you need, nothing you don't.
            </p>
            {/* 3-column stat row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', gap: '8px 0', marginTop: 32 }}>
              <div style={{ padding: '0 24px 0 0', display: 'inline-flex', alignItems: 'baseline' }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#F97316' }}>5,000+</span>
                <span style={{ fontSize: 13, color: '#64748b', marginLeft: 6 }}>businesses onboarded</span>
              </div>
              <div style={{ width: 1, height: 32, background: 'rgba(0,0,0,0.15)' }} className="stat-hide-mobile" />
              <div style={{ padding: '0 24px', display: 'inline-flex', alignItems: 'baseline' }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#F97316' }}>₹500Cr+</span>
                <span style={{ fontSize: 13, color: '#64748b', marginLeft: 6 }}>invoiced on platform</span>
              </div>
              <div style={{ width: 1, height: 32, background: 'rgba(0,0,0,0.15)' }} className="stat-hide-mobile" />
              <div style={{ padding: '0 0 0 24px', display: 'inline-flex', alignItems: 'baseline' }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#F97316' }}>₹149/yr</span>
                <span style={{ fontSize: 13, color: '#64748b', marginLeft: 6 }}>starting price</span>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story section */}
        <section style={{ background: '#F8FAFC', padding: 'clamp(56px,7vw,80px) var(--section-px)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 400, color: '#0f172a', marginBottom: 20 }}>
              Our Story
            </h2>
            <p style={{ fontSize: 18, color: '#0f172a', lineHeight: 1.6, marginBottom: 16 }}>
              Udyog was born from a simple yet powerful question: Why is billing software in India so complicated?
            </p>
            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.8, marginBottom: 48 }}>
              And why do business owners still have to share GST documents with their CA over WhatsApp, email, and multiple platforms? We asked — why can't CAs access everything in real time?
            </p>
            
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>What we saw across India</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 40 }}>
              {/* Card 1 */}
              <div style={{ borderLeft: '3px solid #F97316', background: '#fff', borderRadius: 10, padding: '16px 20px' }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Complex, hard-to-use software</h4>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>"Most billing apps are built for accountants, not business owners. Real traders don't have time to learn complicated tools."</p>
              </div>
              {/* Card 2 */}
              <div style={{ borderLeft: '3px solid #F97316', background: '#fff', borderRadius: 10, padding: '16px 20px' }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Time-consuming manual GST work</h4>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>"Every month, hundreds of WhatsApp messages just to share invoices with a CA. Hours wasted on data entry."</p>
              </div>
              {/* Card 3 */}
              <div style={{ borderLeft: '3px solid #F97316', background: '#fff', borderRadius: 10, padding: '16px 20px' }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Limited access to simple digital tools</h4>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>"63 million Indian MSMEs. Most still use paper ledgers or outdated desktop software."</p>
              </div>
              {/* Card 4 */}
              <div style={{ borderLeft: '3px solid #F97316', background: '#fff', borderRadius: 10, padding: '16px 20px' }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Heavy dependence on others for compliance</h4>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>"Business owners depend entirely on their CA for GST filing, with no visibility into their own financials."</p>
              </div>
            </div>

            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.8 }}>
              That's when we decided to build something truly different. A platform that requires zero training, works seamlessly in Hinglish, and is designed for real Indian business workflows.
            </p>
          </div>
        </section>

        {/* Mission section */}
        <section style={{ background: '#0F172A', padding: 'clamp(56px,7vw,80px) var(--section-px)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F97316', marginBottom: 14, display: 'inline-block' }}>OUR MISSION</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 400, color: '#fff', marginBottom: 20 }}>
              One platform. Owner and CA. Always in sync.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 48 }}>
              To create a single, unified platform where business owners and their CA work together seamlessly. No document sharing. No follow-ups. No confusion. Udyog is built to simplify business operations and make GST compliance effortless through a voice-first, India-first approach.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 48 }}>
              {[
                "Eliminate manual GST document sharing between owners and CAs",
                "Enable real-time financial access for CAs and GST consultants",
                "Replace complex systems with simple, unified digital solutions",
                "Make GST filing faster, accurate, and completely hassle-free",
                "Empower non-technical users with voice-based billing via Maya AI",
                "Give every Indian MSME the tools that were only available to large enterprises"
              ].map((point, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ color: '#F97316', fontWeight: 'bold' }}>✓</span>
                  <span style={{ color: '#fff', fontSize: 15, lineHeight: 1.5 }}>{point}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 18, color: '#fff', fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
              "With Udyog, your CA can file GST anytime from your live data — while you focus only on growing your business."
            </p>
          </div>
        </section>

        {/* CTA section */}
        <section style={{ background: '#fff', padding: 'clamp(56px,7vw,80px) var(--section-px)', textAlign: 'center' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 400, color: '#0f172a', marginBottom: 32 }}>
              Want to know more?
            </h2>
            <AboutCTAButtons />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
