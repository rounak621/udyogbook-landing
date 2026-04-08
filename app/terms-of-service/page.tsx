import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Udyog',
  description: 'Terms of Service for Udyog billing software.',
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68, background: '#fff', minHeight: '100vh' }}>
        <section style={{ background: '#0F172A', padding: 'clamp(48px,6vw,72px) var(--section-px)', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 400, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10 }}>Terms of Service</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Last updated: April 8, 2026</p>
        </section>
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            {[
              { title: '1. Acceptance of Terms', content: 'By accessing or using Udyog ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. These terms apply to all users, including businesses, CAs, and staff members.' },
              { title: '2. Description of Service', content: 'Udyog is a GST-compliant billing, invoicing, and business management platform designed for Indian MSMEs. The Service includes invoice creation, inventory management, CA collaboration portal, voice billing (Maya AI), and related features.' },
              { title: '3. Account Registration', content: 'You must create an account to use the Service. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information during registration.' },
              { title: '4. Acceptable Use', content: 'You agree not to: use the Service for any unlawful purpose; upload false or misleading GST information; attempt to gain unauthorized access to any part of the Service; resell or redistribute the Service without authorization; use the Service to generate fraudulent invoices.' },
              { title: '5. GST Compliance Responsibility', content: 'While Udyog provides tools to help with GST compliance, you are solely responsible for ensuring the accuracy of your GST filings. Udyog does not provide legal or tax advice. We recommend consulting a qualified CA for complex GST matters.' },
              { title: '6. Payment and Billing', content: 'Paid plans are billed monthly or annually as selected. All prices are in Indian Rupees (INR) and are exclusive of applicable taxes. Subscription fees are non-refundable except as required by law. We reserve the right to change pricing with 30 days notice.' },
              { title: '7. Data Ownership', content: 'You retain ownership of all data you input into Udyog. We do not claim ownership of your business data, invoices, or customer information. Upon account termination, you may export your data within 30 days.' },
              { title: '8. Limitation of Liability', content: 'To the maximum extent permitted by law, Udyog shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service. Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim.' },
              { title: '9. Governing Law', content: 'These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.' },
              { title: '10. Contact', content: 'For questions about these Terms, contact us at udyogbook@gmail.com or +91 79774 22531.' },
            ].map(section => (
              <div key={section.title} style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{section.title}</h2>
                <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.8 }}>{section.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
