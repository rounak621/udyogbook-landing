import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GST Compliance — Udyog',
  description: 'How Udyog ensures GST compliance for Indian businesses.',
}

export default function GSTCompliancePage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68, background: '#fff', minHeight: '100vh' }}>
        <section style={{ background: '#0F172A', padding: 'clamp(48px,6vw,72px) var(--section-px)', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 400, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10 }}>GST Compliance</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, maxWidth: 480, margin: '0 auto' }}>How Udyog keeps your business GST-compliant automatically.</p>
        </section>
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            {[
              { title: 'GST-Compliant Invoices', content: 'Every invoice generated on Udyog includes all mandatory GST fields: GSTIN of buyer and seller, HSN/SAC codes, CGST/SGST/IGST breakdowns, place of supply, and invoice serial numbers. Our invoice templates are reviewed regularly to ensure compliance with the latest GST Council notifications.' },
              { title: 'GSTR-1 and GSTR-3B Reports', content: 'Udyog (Premium and Enterprise plans) automatically generates GSTR-1 and GSTR-3B reports from your invoices. Data is formatted as per GSTN requirements and can be exported in JSON format for direct upload to the GST portal, or shared with your CA.' },
              { title: 'HSN/SAC Code Support', content: 'Our product database includes HSN codes for goods and SAC codes for services. GST rates are auto-applied based on HSN/SAC codes, reducing errors in tax calculation. We update our database whenever the GST Council revises rates.' },
              { title: 'e-Invoicing (IRN Generation)', content: 'For businesses with turnover above the e-invoicing threshold, Udyog supports IRN (Invoice Reference Number) generation through the IRP (Invoice Registration Portal). e-Invoices are generated with a QR code as mandated by CBIC.' },
              { title: 'Input Tax Credit (ITC) Tracking', content: 'Udyog tracks your purchase bills and helps you identify ITC claims. Our GSTR-2B reconciliation feature (coming soon) will automatically match your purchase data with supplier filings to maximize your ITC claims.' },
              { title: 'CA Collaboration', content: 'Share your financials securely with your CA through the dedicated CA Portal. Your CA gets read-only access to run reports, verify GST data, and prepare returns — without needing to WhatsApp you for every document.' },
              { title: 'Data Retention', content: 'GST law requires businesses to maintain records for 6 years. Udyog stores all your invoice data securely for this period. You can export your complete invoice history at any time in CSV or PDF format.' },
              { title: 'Disclaimer', content: 'While Udyog provides tools to assist with GST compliance, it does not constitute legal or tax advice. GST laws are complex and subject to frequent changes. We strongly recommend working with a qualified Chartered Accountant for your GST filings and compliance matters.' },
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
