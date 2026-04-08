import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Udyog',
  description: 'Privacy Policy for Udyog — how we collect, use, and protect your data.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68, background: '#fff', minHeight: '100vh' }}>
        <section style={{ background: '#0F172A', padding: 'clamp(48px,6vw,72px) var(--section-px)', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 400, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10 }}>Privacy Policy</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Last updated: April 8, 2026</p>
        </section>
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            {[
              { title: '1. Information We Collect', content: 'We collect information you provide directly to us, such as when you create an account, enter business details, create invoices, or contact us for support. This includes: business name and GSTIN, contact information (email, phone), transaction data (invoices, purchase bills, customer/supplier details), and device and usage information.' },
              { title: '2. How We Use Your Information', content: 'We use the information we collect to: provide, maintain, and improve our services; process transactions and send related information; send technical notices and support messages; respond to your comments and questions; and comply with legal obligations including GST regulations under Indian law.' },
              { title: '3. Data Storage and Security', content: 'Your data is stored on secure servers in India. We use industry-standard encryption (256-bit SSL) to protect data in transit and at rest. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.' },
              { title: '4. GST Data Compliance', content: 'As a GST billing platform, we handle sensitive financial data. All invoice data, GSTIN information, and financial records are stored in compliance with Indian data protection laws and GST regulations. We do not share your GST data with third parties except as required by law or with your explicit consent (e.g., sharing with your CA through the CA Portal).' },
              { title: '5. Data Sharing', content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with: your authorized CA through the CA Portal (with your consent); service providers who assist in our operations; law enforcement when required by applicable law.' },
              { title: '6. Your Rights', content: 'You have the right to: access the personal data we hold about you; correct inaccurate data; request deletion of your data (subject to legal retention requirements); export your data in a machine-readable format; withdraw consent where processing is based on consent.' },
              { title: '7. Cookies', content: 'We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. See our Cookie Policy for details.' },
              { title: '8. Contact Us', content: 'If you have questions about this Privacy Policy, please contact us at udyogbook@gmail.com or call +91 79774 22531. Our office is located in Mumbai, Maharashtra, India.' },
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
