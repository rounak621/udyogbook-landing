'use client'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQS = [
  { q: "How is GST calculated in India?", a: "GST is calculated as a percentage of the taxable value. For 18% GST on ₹1,000: GST = ₹180, total = ₹1,180. For intra-state it splits into CGST + SGST (9% each). For inter-state the full 18% is charged as IGST." },
  { q: "What are the GST rate slabs in India?", a: "India has 5 GST slabs: 0% (essential items), 5% (basic necessities), 12% (processed food, computers), 18% (most services and goods), 28% (luxury items like cars, ACs)." },
  { q: "What is GST inclusive vs GST exclusive?", a: "GST exclusive: tax is added on top of the price. GST inclusive: tax is already included in the shown price. For ₹1,180 inclusive at 18%: taxable value = ₹1,000, GST = ₹180." },
  { q: "When to charge CGST+SGST vs IGST?", a: "Charge CGST+SGST when buyer and seller are in the same state. Charge IGST when they are in different states or for exports." },
  { q: "Is GST applicable on all goods and services?", a: "Most goods and services attract GST but some are exempt: fresh vegetables, milk, eggs, healthcare, and education. Petroleum and alcohol are outside GST." }
]

export default function GSTCalculatorClient() {
  const [amountStr, setAmountStr] = useState('')
  const [rate, setRate] = useState(18)
  const [calcType, setCalcType] = useState<'exclusive' | 'inclusive'>('exclusive')
  const [transType, setTransType] = useState<'intra' | 'inter'>('intra')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const amount = parseFloat(amountStr) || 0
  let taxable = 0
  let totalGST = 0
  let total = 0

  if (calcType === 'exclusive') {
    taxable = amount
    totalGST = taxable * (rate / 100)
    total = taxable + totalGST
  } else {
    taxable = amount / (1 + rate / 100)
    totalGST = amount - taxable
    total = amount
  }

  const cgst = transType === 'intra' ? totalGST / 2 : 0
  const sgst = transType === 'intra' ? totalGST / 2 : 0
  const igst = transType === 'inter' ? totalGST : 0

  const fmt = (num: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num)

  const copyResults = () => {
    let text = `Taxable Amount: ${fmt(taxable)}\n`
    if (transType === 'intra') {
      text += `CGST (${rate / 2}%): ${fmt(cgst)}\nSGST (${rate / 2}%): ${fmt(sgst)}\n`
    } else {
      text += `IGST (${rate}%): ${fmt(igst)}\n`
    }
    text += `Total Invoice Value: ${fmt(total)}`
    navigator.clipboard.writeText(text)
    alert('Results copied to clipboard!')
  }

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
            }}>Free Tool</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 400, color: '#fff', lineHeight: 1.15, marginBottom: 16, letterSpacing: '-0.02em' }}>
              Free GST Calculator India — CGST, SGST & IGST
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 640, margin: '0 auto' }}>
              Calculate GST instantly for any amount. Get CGST/SGST breakdown for intra-state and IGST for inter-state transactions. All 5 GST slabs supported.
            </p>
          </div>
        </section>

        {/* Section 2 - Calculator Tool */}
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)', background: '#F8FAFC' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', border: '1px solid #E2E8F0', borderRadius: 20, padding: 'clamp(24px, 4vw, 40px)', boxShadow: '0 16px 48px rgba(0,0,0,0.05)' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: 15, color: '#0f172a', marginBottom: 8 }}>Enter Amount (₹)</label>
                <input 
                  type="number"
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  placeholder="1,000"
                  style={{ width: '100%', padding: '16px 20px', fontSize: 20, border: '1.5px solid #E2E8F0', borderRadius: 10, outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: 15, color: '#0f172a', marginBottom: 8 }}>GST Rate</label>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {[0, 5, 12, 18, 28].map(r => (
                    <button
                      key={r}
                      onClick={() => setRate(r)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: 8,
                        fontWeight: 600,
                        fontSize: 15,
                        background: rate === r ? '#F97316' : '#fff',
                        color: rate === r ? '#fff' : '#475569',
                        border: `1.5px solid ${rate === r ? '#F97316' : '#E2E8F0'}`,
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                      }}
                    >{r}%</button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: 15, color: '#0f172a', marginBottom: 8 }}>Calculation Type</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { id: 'exclusive', label: 'GST Exclusive (add GST on top)' },
                      { id: 'inclusive', label: 'GST Inclusive (extract GST from price)' }
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => setCalcType(type.id as 'exclusive' | 'inclusive')}
                        style={{
                          padding: '12px 16px', borderRadius: 8, textAlign: 'left', fontWeight: 600, fontSize: 14,
                          background: calcType === type.id ? '#FFF5E6' : '#fff',
                          color: calcType === type.id ? '#c2410c' : '#475569',
                          border: `1.5px solid ${calcType === type.id ? '#F97316' : '#E2E8F0'}`,
                          cursor: 'pointer'
                        }}
                      >{type.label}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: 15, color: '#0f172a', marginBottom: 8 }}>Transaction Type</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { id: 'intra', label: 'Intra-state (CGST + SGST)' },
                      { id: 'inter', label: 'Inter-state (IGST)' }
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => setTransType(type.id as 'intra' | 'inter')}
                        style={{
                          padding: '12px 16px', borderRadius: 8, textAlign: 'left', fontWeight: 600, fontSize: 14,
                          background: transType === type.id ? '#FFF5E6' : '#fff',
                          color: transType === type.id ? '#c2410c' : '#475569',
                          border: `1.5px solid ${transType === type.id ? '#F97316' : '#E2E8F0'}`,
                          cursor: 'pointer'
                        }}
                      >{type.label}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 16, color: '#334155' }}>
                <span>Taxable Amount:</span>
                <span style={{ fontWeight: 600 }}>{fmt(taxable)}</span>
              </div>
              {transType === 'intra' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 16, color: '#475569' }}>
                    <span>CGST ({rate / 2}%):</span>
                    <span style={{ fontWeight: 600 }}>{fmt(cgst)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 16, color: '#475569' }}>
                    <span>SGST ({rate / 2}%):</span>
                    <span style={{ fontWeight: 600 }}>{fmt(sgst)}</span>
                  </div>
                </>
              )}
              {transType === 'inter' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 16, color: '#475569' }}>
                  <span>IGST ({rate}%):</span>
                  <span style={{ fontWeight: 600 }}>{fmt(igst)}</span>
                </div>
              )}
              <div style={{ height: 1, background: '#E2E8F0', margin: '16px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 20 }}>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>Total Invoice Value:</span>
                <span style={{ fontWeight: 800, color: '#F97316', fontSize: 28 }}>{fmt(total)}</span>
              </div>
              <div style={{ marginTop: 24, textAlign: 'right' }}>
                <button
                  onClick={copyResults}
                  style={{ background: 'none', border: '1.5px solid #0f172a', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, color: '#0f172a', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  Copy Results
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3 - Table */}
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)', background: '#fff' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 24, letterSpacing: '-0.02em', color: '#0f172a' }}>GST Rate Reference 2026</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                    <th style={{ padding: '16px', fontWeight: 600, color: '#334155' }}>GST Rate</th>
                    <th style={{ padding: '16px', fontWeight: 600, color: '#334155' }}>Common Items</th>
                    <th style={{ padding: '16px', fontWeight: 600, color: '#334155' }}>Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['0%', 'Essential goods', 'Fresh vegetables, milk, eggs, salt, books'],
                    ['5%', 'Basic necessities', 'Packaged food, footwear under ₹1,000, edible oils, medicines'],
                    ['12%', 'Standard goods', 'Computers, mobiles, processed food, butter, ghee'],
                    ['18%', 'Most goods & services', 'Restaurant food, IT services, telecom, CCTV, paint'],
                    ['28%', 'Luxury & sin goods', 'Cars, motorcycles, ACs, tobacco, cement']
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '16px', fontWeight: 700, color: '#0f172a' }}>{row[0]}</td>
                      <td style={{ padding: '16px', color: '#475569' }}>{row[1]}</td>
                      <td style={{ padding: '16px', color: '#64748b' }}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 4 - Educational Content */}
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)', background: '#F8FAFC' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', color: '#334155', lineHeight: 1.8, fontSize: 16 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 20, color: '#0f172a' }}>Understanding GST Calculation in India</h2>
            
            <p style={{ marginBottom: 16 }}>The Goods and Services Tax (GST) is a crucial indirect tax levied on the supply of goods and services across India. For Indian business owners, ensuring accurate GST calculation is not just about compliance—it is essential for protecting profit margins and facilitating seamless Input Tax Credit (ITC) for your buyers. With our free online calculator, you can instantly determine the exact taxable value and tax components for your invoices.</p>

            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 24, marginBottom: 12 }}>How to Calculate GST Step by Step</h3>
            <p style={{ marginBottom: 16 }}>Calculating GST correctly means knowing whether the price you are starting with is <strong>GST Exclusive</strong> or <strong>GST Inclusive</strong>. For example, if you sell a product for ₹5,000 (exclusive of 18% GST), the calculation is straightforward: ₹5,000 × 18% = ₹900. Your final invoice value becomes ₹5,900. However, if you want your final price to definitely be ₹5,000 (inclusive of 18% GST), the math steps backward: ₹5,000 / 1.18 = ₹4,237.28. The remaining ₹762.72 is your collected GST.</p>

            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 24, marginBottom: 12 }}>CGST vs SGST vs IGST</h3>
            <p style={{ marginBottom: 16 }}>When generating an invoice, determining the correct tax bucket is legally vital. If the buyer and the seller reside in the same state (Intra-state), the total GST rate is split equally into Central GST (CGST) and State GST (SGST). For example, an 18% rate becomes 9% CGST and 9% SGST. Conversely, if you are selling to a customer outside your state (Inter-state), the entire 18% is captured dynamically under Integrated GST (IGST).</p>

            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 24, marginBottom: 12 }}>Common Mistakes & How Udyog Helps</h3>
            <p style={{ marginBottom: 16 }}>Manual tax calculation frequently leads to rounding errors, selecting the wrong HSN code rate slab, or mistakenly applying CGST/SGST on an inter-state sale. These minor mathematical missteps can lead to massive compliance penalties during auditing. Fortunately, modern automated software solves this. When you use <strong>Udyog Billing Software</strong>, you never have to calculate GST manually again. Udyog automatically reads the state code from the buyer's GSTIN, computes the exact inclusive or exclusive values, and generates a flawless, compliant invoice in just 8 seconds.</p>
          </div>
        </section>

        {/* Section 5 - FAQ */}
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)', background: '#fff' }}>
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

        {/* Section 6 - CTA */}
        <section style={{ padding: 'clamp(48px,6vw,72px) var(--section-px)', background: '#0F172A', textAlign: 'center' }}>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,38px)', fontWeight: 400, color: '#fff', marginBottom: 14, letterSpacing: '-0.02em' }}>
              Stop calculating GST manually
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>
              Udyog calculates CGST, SGST, and IGST automatically on every invoice. Free plan, unlimited invoices.
            </p>
            <a href="https://app.udyogbook.in/signup" className="btn-orange" style={{ textDecoration: 'none' }}>
              Try Udyog Free →
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
