import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy — Udyog',
  description: 'Refund policy for Udyog billing software subscriptions.',
}

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68, background: '#fff', minHeight: '100vh' }}>
        <section style={{ background: '#0F172A', padding: 'clamp(48px,6vw,72px) var(--section-px)', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 400, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10 }}>Refund Policy</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Last updated: April 8, 2026</p>
        </section>
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>

            {/* Summary box */}
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '20px 24px', marginBottom: 40, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>⚠️</span>
              <div>
                <p style={{ fontWeight: 700, color: '#dc2626', fontSize: 15, marginBottom: 4 }}>No Refund Policy</p>
                <p style={{ fontSize: 14, color: '#991b1b', lineHeight: 1.6 }}>
                  Udyog does not offer refunds on subscription payments. All sales are final. Please read the full policy below before purchasing.
                </p>
              </div>
            </div>

            {[
              { title: '1. No Refund Policy', content: 'All subscription payments made to Udyog (Udyog Technologies Pvt. Ltd.) are non-refundable. Once a payment has been processed for a subscription plan — whether monthly or annual — we do not provide refunds, credits, or pro-rated amounts for any reason, including but not limited to: unused subscription period, accidental purchase, dissatisfaction with the service, or discontinuation of use.' },
              { title: '2. Free Trial', content: 'We offer a 14-day free trial on all plans specifically so you can evaluate Udyog before committing to a paid subscription. We strongly encourage all users to thoroughly test the platform during the free trial period. No payment is collected during the trial, and no credit card is required to start.' },
              { title: '3. Cancellation Policy', content: 'You may cancel your subscription at any time from your account settings. Upon cancellation, your subscription will remain active until the end of the current billing period. You will not be charged for the next billing cycle. Cancellation does not entitle you to a refund for the current or any previous billing period.' },
              { title: '4. Exceptions', content: 'Refunds may be considered only in the following exceptional circumstances: (a) You were charged twice for the same subscription period due to a technical error on our part. (b) Your account was charged after you cancelled and received a cancellation confirmation. In such cases, please contact us within 7 days at udyogbook@gmail.com with your payment receipt and we will investigate and process a refund if the error is confirmed on our end.' },
              { title: '5. Disputes and Chargebacks', content: 'If you initiate a chargeback or payment dispute without first contacting us to resolve the issue, we reserve the right to suspend or terminate your account immediately. We encourage you to reach out to us at udyogbook@gmail.com before initiating any dispute — we are committed to resolving issues fairly and quickly.' },
              { title: '6. Price Changes', content: 'We reserve the right to change our subscription prices. If prices change, we will notify existing subscribers at least 30 days in advance via email. Price changes will not affect your current billing cycle — they will apply from the next renewal date.' },
              { title: '7. Contact Us', content: 'If you have questions about this Refund Policy or believe you qualify for an exception, please contact us at udyogbook@gmail.com or call +91 79774 22531. Our team is available Monday to Saturday, 9am to 7pm IST.' },
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
