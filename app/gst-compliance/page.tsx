import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GST Compliance Software for Indian Businesses — Udyog',
  description: 'How Udyog keeps your business 100% GST-compliant. Auto CGST/SGST/IGST calculation, GSTR-1 & GSTR-3B reports, e-invoicing, HSN codes, ITC tracking, and CA collaboration — all in one app.',
  keywords: 'gst compliance software india, gst invoice software, gst billing app, gst return filing software, e-invoicing software india, hsn code billing, cgst sgst igst calculator',
  openGraph: {
    title: 'GST Compliance Software for Indian Businesses — Udyog',
    description: 'Auto GST calculation, GSTR-1 reports, e-invoicing, HSN codes, and CA portal. Built for Indian MSMEs.',
    url: 'https://udyogbook.in/gst-compliance',
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is GST and why do Indian businesses need it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GST (Goods and Services Tax) is India's unified indirect tax system that replaced VAT, Service Tax, and Excise Duty in 2017. Any business with annual turnover above ₹40 lakh (₹20 lakh for services) must register for GST and issue GST-compliant invoices. Non-compliance attracts penalties and loss of Input Tax Credit."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between CGST, SGST, and IGST?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CGST (Central GST) and SGST (State GST) are charged on transactions within the same state — split equally between central and state government. IGST (Integrated GST) is charged on transactions between two different states. For example, if you sell goods from Delhi to a Delhi buyer, you charge CGST + SGST. If you sell to a buyer in Mumbai, you charge IGST. Udyog automatically calculates the correct tax type based on your and your buyer's GST state codes."
      }
    },
    {
      "@type": "Question",
      "name": "What fields are mandatory in a GST invoice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A valid GST invoice must include: supplier's name, address, and GSTIN; invoice number and date; buyer's name, address, and GSTIN (for B2B); description of goods/services; HSN/SAC code; quantity and unit; taxable value; applicable GST rate and amount (CGST/SGST or IGST); and total invoice value. Udyog generates all of these automatically."
      }
    },
    {
      "@type": "Question",
      "name": "What is e-invoicing and who needs it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "E-invoicing under GST requires businesses above a certain turnover threshold to register their invoices on the government's Invoice Registration Portal (IRP) and obtain an IRN (Invoice Reference Number) and QR code. As of 2024, businesses with turnover above ₹5 crore must use e-invoicing. Udyog supports IRN generation and QR code printing for eligible businesses."
      }
    },
    {
      "@type": "Question",
      "name": "How does Udyog help with GSTR-1 filing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Udyog (Premium and Enterprise plans) automatically compiles all your sales invoices into a GSTR-1 report formatted as per GSTN requirements. You can export it in JSON format for direct upload to the GST portal, or share it with your CA through the Udyog CA portal. This eliminates hours of manual data entry every month."
      }
    },
    {
      "@type": "Question",
      "name": "What is Input Tax Credit (ITC) and can Udyog help claim it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Input Tax Credit allows you to deduct the GST you paid on purchases from the GST you collect on sales, reducing your overall tax liability. Udyog tracks your purchase bills and helps identify ITC claims. Our GSTR-2B reconciliation feature automatically matches your purchase data with supplier filings to maximise your ITC."
      }
    },
    {
      "@type": "Question",
      "name": "Is Udyog suitable for businesses under GST composition scheme?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Udyog supports composition scheme invoicing. Composition dealers cannot charge GST on invoices but must display 'Composition Taxable Person' on their bills of supply. Udyog generates the correct format automatically when you set up your account as a composition dealer."
      }
    },
    {
      "@type": "Question",
      "name": "How long does Udyog store my GST records?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GST law requires businesses to maintain records for 6 years from the date of filing the annual return. Udyog stores all invoice and financial data securely for this period on AWS infrastructure with regular backups. You can export your complete invoice history at any time in CSV or PDF format."
      }
    }
  ]
}

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Udyog",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, Android, iOS",
  "offers": {
    "@type": "Offer",
    "price": "149",
    "priceCurrency": "INR",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "149",
      "priceCurrency": "INR",
      "unitText": "year"
    }
  },
  "description": "GST billing and invoicing software for Indian small businesses. Voice invoicing in Hinglish, GSTR-1 reports, CA portal, and inventory management.",
  "url": "https://udyogbook.in",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "2300"
  }
}

const COMPLIANCE_SECTIONS = [
  {
    icon: '🧾',
    title: 'GST-Compliant Invoices',
    content: 'Every invoice generated on Udyog includes all mandatory GST fields required by the GST Council: GSTIN of buyer and seller, HSN/SAC codes, CGST/SGST/IGST breakdowns based on state of supply, place of supply, invoice serial numbers, and taxable value. Our invoice templates are reviewed regularly against the latest GST Council notifications and CBIC circulars. You never have to worry about missing a field or using an outdated format.',
    badge: 'Auto-generated',
    badgeColor: '#10b981',
  },
  {
    icon: '📊',
    title: 'GSTR-1 and GSTR-3B Reports',
    content: 'Udyog (Premium and Enterprise plans) automatically compiles your sales data into GSTR-1 and GSTR-3B reports formatted exactly as per GSTN requirements. Export in JSON format for direct upload to the GST portal, or share directly with your CA through the Udyog CA Portal. No more end-of-month scramble to collect invoices and enter data manually. Everything is already organised.',
    badge: 'Premium feature',
    badgeColor: '#F97316',
  },
  {
    icon: '🏷️',
    title: 'HSN/SAC Code Support',
    content: 'Our product database includes HSN (Harmonized System of Nomenclature) codes for goods and SAC (Services Accounting Code) codes for services. GST rates are auto-applied when you select an HSN/SAC code — eliminating calculation errors. We update our code database whenever the GST Council revises rates or adds new categories. For businesses that have custom or unlisted items, you can manually assign HSN codes once and Udyog remembers them for all future invoices.',
    badge: 'Auto tax rates',
    badgeColor: '#8b5cf6',
  },
  {
    icon: '🔐',
    title: 'e-Invoicing (IRN Generation)',
    content: 'For businesses with annual turnover above ₹5 crore, e-invoicing is mandatory under GST. Udyog supports IRN (Invoice Reference Number) generation through the IRP (Invoice Registration Portal) as mandated by CBIC. e-Invoices are generated with a valid QR code, digitally signed, and formatted for both printing and portal submission. If your business crosses the threshold mid-year, Udyog will alert you and guide you through the transition.',
    badge: 'For ₹5Cr+ turnover',
    badgeColor: '#0ea5e9',
  },
  {
    icon: '💰',
    title: 'Input Tax Credit (ITC) Tracking',
    content: 'Input Tax Credit is one of the biggest financial advantages of GST — you can deduct the GST paid on purchases from the GST collected on sales. Udyog tracks all your purchase bills and identifies ITC-eligible amounts. Our GSTR-2B reconciliation feature automatically matches your purchase data against supplier filings on the GST portal, helping you identify missed claims and discrepancies before they become problems.',
    badge: 'Saves tax money',
    badgeColor: '#16a34a',
  },
  {
    icon: '👨‍💼',
    title: 'CA Collaboration Portal',
    content: 'Share your financials securely with your Chartered Accountant through the dedicated Udyog CA Portal. Your CA gets their own login with read-only access to view reports, verify GST data, download statements, and prepare returns — without you having to send a single screenshot, PDF, or WhatsApp message. This eliminates the chaos of last-minute document collection before every GST filing deadline. CAs can also be granted write access for specific actions if required.',
    badge: 'Unique to Udyog',
    badgeColor: '#F97316',
  },
  {
    icon: '🗄️',
    title: 'Data Retention & Export',
    content: 'GST law (Section 36 of the CGST Act) requires businesses to maintain records for 6 years from the date of filing the annual return. Udyog stores all your invoice and financial data securely on AWS infrastructure with daily backups and 99.9% uptime. You can export your complete invoice history at any time in CSV, Excel, or PDF format. Your data is never deleted and always accessible, even if you downgrade or cancel your subscription.',
    badge: '6-year retention',
    badgeColor: '#64748b',
  },
]

const CGST_SGST_TABLE = [
  { transaction: 'Delhi seller → Delhi buyer', cgst: '9%', sgst: '9%', igst: '—', total: '18%' },
  { transaction: 'Delhi seller → Mumbai buyer', cgst: '—', sgst: '—', igst: '18%', total: '18%' },
  { transaction: 'Mumbai seller → Bangalore buyer', cgst: '—', sgst: '—', igst: '12%', total: '12%' },
  { transaction: 'Chennai seller → Chennai buyer', cgst: '6%', sgst: '6%', igst: '—', total: '12%' },
]

export default function GSTCompliancePage() {
  return (
    <>
      <Navbar />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <main style={{ paddingTop: 68, background: '#fff', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ background: '#0F172A', padding: 'clamp(60px,8vw,96px) var(--section-px)', textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', background: 'rgba(249,115,22,0.15)', color: '#F97316', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 14px', borderRadius: 100, marginBottom: 20 }}>
              GST Compliance
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,5vw,52px)', fontWeight: 400, color: '#fff', lineHeight: 1.15, marginBottom: 18, letterSpacing: '-0.02em' }}>
              Stay 100% GST-compliant,{' '}
              <span style={{ fontStyle: 'italic', color: '#F97316' }}>automatically</span>
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: 32 }}>
              Udyog handles every GST requirement for Indian businesses — from correct invoice formats and HSN codes
              to GSTR-1 reports, e-invoicing, and CA collaboration. No accounting knowledge required.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Auto CGST/SGST/IGST', 'GSTR-1 Reports', 'e-Invoicing (IRN)', 'CA Portal', 'ITC Tracking'].map(tag => (
                <span key={tag} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', fontSize: 13, padding: '5px 14px', borderRadius: 100 }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* What is GST — educational section for SEO */}
        <section style={{ background: '#F8FAFC', padding: 'clamp(48px,6vw,72px) var(--section-px)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 700, color: '#0f172a', marginBottom: 16, letterSpacing: '-0.01em' }}>
              What is GST and why does it matter for your business?
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 16 }}>
              GST (Goods and Services Tax) is India's unified indirect tax system, introduced on 1 July 2017. It replaced a complex web of taxes including VAT, Service Tax, Central Excise, and Entry Tax with a single, streamlined system governed by the GST Council.
            </p>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 24 }}>
              Any business with annual turnover above <strong>₹40 lakh</strong> (₹20 lakh for service providers, ₹10 lakh in special category states) must register for GST, issue GST-compliant invoices, and file returns monthly or quarterly. Non-compliance leads to penalties up to ₹25,000 per offence and loss of Input Tax Credit — money that would otherwise come back to your business.
            </p>

            {/* CGST vs SGST vs IGST table */}
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
              CGST vs SGST vs IGST — When does each apply?
            </h3>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.75, marginBottom: 16 }}>
              The type of GST charged depends on whether the transaction is within the same state (intra-state) or across state borders (inter-state). Udyog detects this automatically from the GST state codes of buyer and seller.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#0F172A' }}>
                    {['Transaction', 'CGST', 'SGST', 'IGST', 'Total GST'].map(h => (
                      <th key={h} style={{ color: '#fff', fontWeight: 600, padding: '10px 14px', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CGST_SGST_TABLE.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '10px 14px', color: '#0f172a', fontWeight: 500 }}>{row.transaction}</td>
                      <td style={{ padding: '10px 14px', color: row.cgst === '—' ? '#94a3b8' : '#0f172a' }}>{row.cgst}</td>
                      <td style={{ padding: '10px 14px', color: row.sgst === '—' ? '#94a3b8' : '#0f172a' }}>{row.sgst}</td>
                      <td style={{ padding: '10px 14px', color: row.igst === '—' ? '#94a3b8' : '#F97316', fontWeight: row.igst !== '—' ? 600 : 400 }}>{row.igst}</td>
                      <td style={{ padding: '10px 14px', color: '#0f172a', fontWeight: 700 }}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 8 }}>Example rates shown. Actual GST rate depends on the HSN/SAC code of the product or service.</p>
          </div>
        </section>

        {/* Mandatory invoice fields */}
        <section style={{ padding: 'clamp(48px,6vw,72px) var(--section-px)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
              Mandatory fields in a GST invoice
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.75, marginBottom: 24 }}>
              Under Rule 46 of the CGST Rules, every tax invoice must contain the following fields. A missing field makes the invoice non-compliant and the buyer cannot claim ITC on it. Udyog fills all of these automatically.
            </p>
            <style suppressHydrationWarning>{`
              .fields-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
              @media (max-width: 600px) { .fields-grid { grid-template-columns: 1fr; } }
            `}</style>
            <div className="fields-grid">
              {[
                "Supplier's name, address, and GSTIN",
                "Consecutive invoice number (up to 16 characters)",
                "Date of issue of the invoice",
                "Buyer's name, address, and GSTIN (B2B transactions)",
                "HSN code (for goods) or SAC code (for services)",
                "Description of goods or services supplied",
                "Quantity and unit of measurement",
                "Total value of supply before tax",
                "Applicable GST rate (CGST + SGST or IGST)",
                "Amount of tax charged (CGST, SGST, or IGST)",
                "Place of supply (state name and state code)",
                "Signature or digital signature of supplier",
              ].map((field, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '12px 14px' }}>
                  <span style={{ color: '#10b981', fontSize: 16, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 14, color: '#334155', lineHeight: 1.5 }}>{field}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature sections */}
        <section style={{ background: '#F8FAFC', padding: 'clamp(48px,6vw,80px) var(--section-px)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 700, color: '#0f172a', marginBottom: 8, textAlign: 'center' }}>
              How Udyog handles every GST requirement
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', textAlign: 'center', marginBottom: 40, maxWidth: 580, margin: '0 auto 40px' }}>
              Every compliance feature is built into the core product — not an add-on you have to configure.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {COMPLIANCE_SECTIONS.map(section => (
                <article key={section.title} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, padding: 'clamp(20px,3vw,28px)', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 28, flexShrink: 0, marginTop: 2 }}>{section.icon}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: 0 }}>{section.title}</h3>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: section.badgeColor, padding: '2px 10px', borderRadius: 100 }}>{section.badge}</span>
                    </div>
                    <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.8, margin: 0 }}>{section.content}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section — critical for AEO/featured snippets */}
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 700, color: '#0f172a', marginBottom: 8, textAlign: 'center' }}>
              Frequently asked questions
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', textAlign: 'center', marginBottom: 40 }}>
              Everything you need to know about GST compliance for Indian small businesses.
            </p>
            <style suppressHydrationWarning>{`
              .faq-item { border-bottom: 1px solid #E2E8F0; padding: 20px 0; }
              .faq-item:first-child { border-top: 1px solid #E2E8F0; }
              .faq-q { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 10px; }
              .faq-a { font-size: 15px; color: #475569; line-height: 1.8; }
            `}</style>
            {[
              {
                q: "What is GST and why do Indian businesses need it?",
                a: "GST (Goods and Services Tax) is India's unified indirect tax that replaced VAT, Service Tax, and Excise Duty in 2017. Any business with annual turnover above ₹40 lakh (₹20 lakh for services) must register for GST, issue compliant invoices, and file monthly returns. Non-compliance attracts penalties up to ₹25,000 per offence and loss of Input Tax Credit."
              },
              {
                q: "What is the difference between CGST, SGST, and IGST?",
                a: "CGST + SGST are charged on transactions within the same state — split equally between central and state government. IGST is charged on transactions between two different states. For example, Delhi to Delhi sale attracts CGST + SGST, while Delhi to Mumbai attracts IGST. Udyog calculates the correct tax type automatically based on buyer and seller GST state codes."
              },
              {
                q: "What fields are mandatory in a GST invoice?",
                a: "A GST-compliant invoice must include: supplier and buyer GSTIN, invoice number and date, HSN/SAC code, description, quantity, taxable value, GST rate and amount (CGST/SGST or IGST), place of supply, and total invoice value. Udyog generates all mandatory fields automatically on every invoice."
              },
              {
                q: "What is e-invoicing and who needs it?",
                a: "E-invoicing requires businesses above ₹5 crore turnover to register invoices on the government's IRP portal and obtain an IRN (Invoice Reference Number) with a QR code. Udyog supports e-invoicing with automatic IRN generation and QR code printing. Businesses that cross the threshold mid-year are alerted by Udyog."
              },
              {
                q: "How does Udyog help with GSTR-1 filing?",
                a: "Udyog automatically compiles all your sales invoices into a GSTR-1 report formatted as per GSTN requirements. Export as JSON for direct portal upload, or share with your CA through the Udyog CA Portal. No more manual data entry at month-end — everything is already organised inside Udyog."
              },
              {
                q: "What is Input Tax Credit (ITC) and can Udyog help claim it?",
                a: "ITC lets you offset GST paid on purchases against GST collected on sales, reducing your tax liability. Udyog tracks all purchase bills and identifies ITC-eligible amounts. Our GSTR-2B reconciliation matches your purchase data with supplier filings to maximise your ITC claims and flag discrepancies."
              },
              {
                q: "Is Udyog suitable for businesses under the GST composition scheme?",
                a: "Yes. Composition scheme dealers cannot charge GST on invoices but must display 'Composition Taxable Person' on bills of supply. Udyog automatically generates the correct bill format when you configure your account as a composition dealer."
              },
              {
                q: "How long does Udyog store my GST records?",
                a: "GST law requires records to be maintained for 6 years. Udyog stores all invoice and financial data on AWS with daily backups for this full period. You can export your complete history at any time in CSV, Excel, or PDF format — even after cancelling your subscription."
              },
            ].map((faq, i) => (
              <div key={i} className="faq-item" itemScope itemType="https://schema.org/Question">
                <p className="faq-q" itemProp="name">{faq.q}</p>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p className="faq-a" itemProp="text">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#0F172A', padding: 'clamp(48px,6vw,72px) var(--section-px)', textAlign: 'center' }}>
          <div style={{ maxWidth: 580, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 400, color: '#fff', marginBottom: 14, letterSpacing: '-0.02em' }}>
              Stop worrying about GST compliance
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 28 }}>
              Join thousands of Indian businesses that use Udyog for GST-compliant billing. Start free, upgrade when you need GSTR reports and CA portal access.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/pricing" style={{ background: '#F97316', color: '#fff', padding: '13px 28px', borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-block' }}>
                Start free — ₹149/year
              </a>
              <a href="/contact" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '13px 28px', borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: 'none', display: 'inline-block', border: '1px solid rgba(255,255,255,0.15)' }}>
                Talk to sales
              </a>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 16 }}>
              No credit card required. Free plan includes unlimited invoices.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section style={{ padding: '24px var(--section-px)', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7 }}>
              <strong style={{ color: '#64748b' }}>Disclaimer:</strong> While Udyog provides tools to assist with GST compliance, the information on this page does not constitute legal or tax advice. GST laws are subject to frequent changes by the GST Council and CBIC. We strongly recommend working with a qualified Chartered Accountant for your GST filings and compliance matters. Always verify current rates and rules on the official GST portal at gstin.gov.in.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}