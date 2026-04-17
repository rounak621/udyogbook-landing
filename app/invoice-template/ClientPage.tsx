'use client'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'

const FAQS = [
  { q: "What is the correct GST invoice format in India?", a: "A GST invoice must include: supplier name/address/GSTIN, buyer name/address/GSTIN, invoice number and date, HSN/SAC code, description, quantity, taxable value, GST rate and amount (CGST/SGST or IGST), place of supply, and total value. These are mandated under Rule 46 of CGST Rules." },
  { q: "Can I use my own GST invoice format?", a: "Yes. The GST law does not prescribe a fixed template — only the mandatory fields. As long as all required fields are present, you can use any format. However, using a pre-built compliant template avoids missing fields." },
  { q: "What is HSN code and is it mandatory on GST invoice?", a: "HSN (Harmonized System of Nomenclature) is a code that classifies goods for GST purposes. It is mandatory for businesses with turnover above ₹5 crore (6-digit HSN) and above ₹1.5 crore (4-digit HSN). Below ₹1.5 crore it is optional but recommended." },
  { q: "What is the difference between a tax invoice and a bill of supply?", a: "A tax invoice is issued by GST-registered businesses for taxable supplies and shows the GST charged. A bill of supply is issued for exempt supplies or by composition scheme dealers who cannot charge GST." },
  { q: "How many copies of GST invoice should be made?", a: "For goods: 3 copies — Original for buyer, Duplicate for transporter, Triplicate for supplier. For services: 2 copies — Original for recipient, Duplicate for supplier." }
]

const CHECKLIST = [
  "Supplier's name, address, and GSTIN",
  "Consecutive invoice number (max 16 characters)",
  "Date of issue",
  "Buyer's name, address, and GSTIN (B2B)",
  "HSN code (goods) or SAC code (services)",
  "Description of goods or services",
  "Quantity and unit of measurement",
  "Taxable value before GST",
  "Applicable GST rate",
  "CGST and SGST amounts (intra-state)",
  "IGST amount (inter-state)",
  "Place of supply (state name + code)",
  "Total invoice value in figures and words",
  "Supplier signature or digital signature"
]

export default function InvoiceTemplateClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleDownload = () => setShowModal(true)

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68, background: '#fff', minHeight: '100vh' }}>
        
        {/* Section 1 - Hero */}
        <section style={{ background: '#0F172A', padding: 'clamp(48px,6vw,80px) var(--section-px)', textAlign: 'center' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{
              display: 'inline-block',
              background: '#FFF5E6', color: '#c2410c',
              fontSize: 11, fontWeight: 700,
              padding: '4px 14px', borderRadius: 100,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              border: '1px solid #fed7aa', marginBottom: 14
            }}>Free Download</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 400, color: '#fff', lineHeight: 1.15, marginBottom: 16, letterSpacing: '-0.02em' }}>
              Free GST Invoice Format — Excel & PDF Templates 2026
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 640, margin: '0 auto', marginBottom: 32 }}>
              Download ready-to-use GST invoice templates with all mandatory fields pre-filled. Compliant with latest GST Council rules. No signup required.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={handleDownload} className="btn-outline-white">
                Download Excel Template
              </button>
              <button onClick={handleDownload} className="btn-outline-white">
                Download PDF Template
              </button>
            </div>
          </div>
        </section>

        {/* Section 2 - Template Preview Cards */}
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)', background: '#F8FAFC' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              
              {/* Card 1 */}
              <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 20, padding: 32, position: 'relative' }}>
                <div style={{ position: 'absolute', top: -12, right: 24, background: '#10B981', color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 12px', borderRadius: 100, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Most Popular</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Standard GST Invoice</h3>
                <p style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}><strong>Best for:</strong> Retailers, traders, manufacturers</p>
                <p style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}><strong>Fields included:</strong> All mandatory GST fields</p>
                <p style={{ fontSize: 14, color: '#475569', marginBottom: 24 }}><strong>Formats:</strong> Excel, PDF</p>
                <button onClick={handleDownload} className="btn-orange" style={{ width: '100%', justifyContent: 'center' }}>Download Free →</button>
              </div>

              {/* Card 2 */}
              <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 20, padding: 32 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Service Invoice</h3>
                <p style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}><strong>Best for:</strong> Freelancers, consultants, agencies</p>
                <p style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}><strong>Fields included:</strong> SAC code, service description, TDS section</p>
                <p style={{ fontSize: 14, color: '#475569', marginBottom: 24 }}><strong>Formats:</strong> Excel, PDF</p>
                <button onClick={handleDownload} className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Download Free →</button>
              </div>

              {/* Card 3 */}
              <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 20, padding: 32 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Proforma Invoice</h3>
                <p style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}><strong>Best for:</strong> Export businesses, advance payments</p>
                <p style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}><strong>Fields included:</strong> Proforma number, validity date, payment terms</p>
                <p style={{ fontSize: 14, color: '#475569', marginBottom: 24 }}><strong>Formats:</strong> Excel, PDF</p>
                <button onClick={handleDownload} className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Download Free →</button>
              </div>

            </div>
          </div>
        </section>

        {/* Section 3 - Mandatory Fields Checklist */}
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)', background: '#fff' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 400, color: '#0f172a', marginBottom: 32, letterSpacing: '-0.02em', textAlign: 'center' }}>
              What every GST invoice must include (Rule 46, CGST Rules)
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
              {CHECKLIST.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ background: '#dcfce7', borderRadius: '50%', padding: 4, flexShrink: 0, marginTop: 2 }}>
                    <Check size={14} color="#166534" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 15, color: '#334155', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4 - Educational Content */}
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)', background: '#F8FAFC' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', color: '#334155', lineHeight: 1.8, fontSize: 16 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 20, color: '#0f172a' }}>Understanding GST Invoice Formats</h2>
            <p style={{ marginBottom: 16 }}>A GST invoice acts as the definitive legal proof of a transaction involving goods or services. It is essential not only for demanding payment from your clients but also for claiming Input Tax Credit (ITC). If your invoice formula is flawed or lacks mandatory details like the 16-character alphanumeric invoice number or HSN codes, your buyer may be denied ITC, eroding their trust in your business.</p>
            
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 24, marginBottom: 12 }}>Tax Invoice vs Bill of Supply vs Proforma Invoice</h3>
            <p style={{ marginBottom: 16 }}>A <strong>Tax Invoice</strong> is issued when you supply taxable items and legitimately collect GST. In contrast, a <strong>Bill of Supply</strong> is used for exempt goods (like fresh milk or vegetables) or if you are registered under the Composition Scheme and cannot charge tax. A <strong>Proforma Invoice</strong> is simply a preliminary bill or an estimated quotation sent to an international or domestic buyer before the actual delivery to trigger an advance payment.</p>

            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 24, marginBottom: 12 }}>How Many Copies Do You Need?</h3>
            <p style={{ marginBottom: 16 }}>For the supply of goods, the law strictly mandates 3 copies: the Original for the buyer, the Duplicate for the transporter handling the delivery, and the Triplicate for you (the supplier). For services, only 2 copies are needed since there is no physical transport: the Original for the recipient and the Duplicate for your own records.</p>
            
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 24, marginBottom: 12 }}>Why Switching from Excel to Udyog is Essential</h3>
            <p style={{ marginBottom: 16 }}>Using an Excel template means configuring complex formulas manually, tracking serial numbers yourself, and facing extreme difficulty when auditing time arrives. If you miss a field or calculate CGST/SGST incorrectly on an IGST invoice, the penalties can be steep. Udyog Billing Software permanently eliminates this risk. It generates picture-perfect, 100% compliant GST invoices automatically in just 8 seconds, securing your compliance and preserving your peace of mind.</p>
          </div>
        </section>

        {/* Section 5 - Comparison Table */}
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)', background: '#fff' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 32, letterSpacing: '-0.02em', color: '#0f172a', textAlign: 'center' }}>Manual Template vs Udyog</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #0f172a' }}>
                    <th style={{ padding: '16px', fontWeight: 800, color: '#0f172a' }}>Feature</th>
                    <th style={{ padding: '16px', fontWeight: 800, color: '#64748b' }}>Manual Excel Template</th>
                    <th style={{ padding: '16px', fontWeight: 800, color: '#F97316' }}>Udyog Software</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['GST calculation', 'Manual, error-prone', 'Automatic'],
                    ['CGST/SGST/IGST split', 'You calculate', 'Auto-detected by state'],
                    ['Invoice numbering', 'Manual tracking', 'Auto-sequential'],
                    ['Customer database', 'Re-enter every time', 'Saved, one click'],
                    ['WhatsApp sharing', 'Download then share', 'One click share'],
                    ['GSTR-1 report', 'Compile manually', 'Auto-generated'],
                    ['Time per invoice', '3–5 minutes', '8 seconds'],
                    ['Price', 'Free', 'Free (paid from ₹149/year)']
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #E2E8F0', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                      <td style={{ padding: '16px', fontWeight: 600, color: '#334155' }}>{row[0]}</td>
                      <td style={{ padding: '16px', color: '#64748b' }}>{row[1]}</td>
                      <td style={{ padding: '16px', fontWeight: 700, color: '#0f172a' }}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 6 - FAQ */}
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)', background: '#F8FAFC' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 400, color: '#0f172a', textAlign: 'center', marginBottom: 40, letterSpacing: '-0.02em' }}>
              Frequently asked <span style={{ fontStyle: 'italic', color: '#F97316' }}>questions</span>
            </h2>
            <div itemScope itemType="https://schema.org/FAQPage">
              {FAQS.map((faq, i) => (
                <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}
                  >
                    <span itemProp="name" style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{faq.q}</span>
                    {openFaq === i ? <ChevronUp size={18} color="#F97316" style={{ flexShrink: 0 }} /> : <ChevronDown size={18} color="#94a3b8" style={{ flexShrink: 0 }} />}
                  </button>
                  {openFaq === i && (
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" style={{ paddingBottom: 18 }}>
                      <p itemProp="text" style={{ fontSize: 14, color: '#64748b', lineHeight: 1.75 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7 - CTA */}
        <section style={{ padding: 'clamp(48px,6vw,72px) var(--section-px)', background: '#0F172A', textAlign: 'center' }}>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,38px)', fontWeight: 400, color: '#fff', marginBottom: 14, letterSpacing: '-0.02em' }}>
              Why use a template when Udyog does it automatically?
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>
              Generate perfect GST invoices in 8 seconds. No Excel, no manual calculations, no errors. Free forever.
            </p>
            <a href="https://app.udyogbook.in/signup" className="btn-orange" style={{ textDecoration: 'none' }}>
              Start Free — No Credit Card →
            </a>
          </div>
        </section>

      </main>

      {/* Modal / Alert equivalent */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
          padding: 24, backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: '#fff', borderRadius: 24, padding: 'clamp(32px, 5vw, 48px)',
            maxWidth: 460, textAlign: 'center', boxShadow: '0 24px 64px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 400, color: '#0f172a', marginBottom: 16 }}>
              Sign up free on Udyog to download this template and create unlimited GST invoices automatically.
            </h3>
            <p style={{ fontSize: 15, color: '#64748b', marginBottom: 32 }}>Takes 10 seconds. No credit card required.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="https://app.udyogbook.in/signup" className="btn-orange" style={{ justifyContent: 'center' }}>
                Create Free Account →
              </a>
              <button 
                onClick={() => setShowModal(false)}
                style={{
                  background: 'none', border: 'none', padding: '14px',
                  fontSize: 15, fontWeight: 600, color: '#64748b', cursor: 'pointer'
                }}
              >Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
