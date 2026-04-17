import { Metadata } from 'next'
import GSTCalculatorClient from './ClientPage'

export const metadata: Metadata = {
  title: 'Free GST Calculator India 2026 — Calculate CGST, SGST, IGST Instantly | Udyog',
  description: 'Free online GST calculator for India. Calculate GST inclusive and exclusive amounts, CGST/SGST/IGST breakdown, for all GST slabs — 5%, 12%, 18%, 28%. Instant results.',
  keywords: 'gst calculator, gst calculator india, cgst sgst calculator, igst calculator, gst calculation online, 18% gst calculator',
  alternates: {
    canonical: 'https://udyogbook.in/gst-calculator',
  },
}

export default function GSTCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How is GST calculated in India?", "acceptedAnswer": { "@type": "Answer", "text": "GST is calculated as a percentage of the taxable value. For 18% GST on ₹1,000: GST = ₹180, total = ₹1,180. For intra-state it splits into CGST + SGST (9% each). For inter-state the full 18% is charged as IGST." } },
      { "@type": "Question", "name": "What are the GST rate slabs in India?", "acceptedAnswer": { "@type": "Answer", "text": "India has 5 GST slabs: 0% (essential items), 5% (basic necessities), 12% (processed food, computers), 18% (most services and goods), 28% (luxury items like cars, ACs)." } },
      { "@type": "Question", "name": "What is GST inclusive vs GST exclusive?", "acceptedAnswer": { "@type": "Answer", "text": "GST exclusive: tax is added on top of the price. GST inclusive: tax is already included in the shown price. For ₹1,180 inclusive at 18%: taxable value = ₹1,000, GST = ₹180." } },
      { "@type": "Question", "name": "When to charge CGST+SGST vs IGST?", "acceptedAnswer": { "@type": "Answer", "text": "Charge CGST+SGST when buyer and seller are in the same state. Charge IGST when they are in different states or for exports." } },
      { "@type": "Question", "name": "Is GST applicable on all goods and services?", "acceptedAnswer": { "@type": "Answer", "text": "Most goods and services attract GST but some are exempt: fresh vegetables, milk, eggs, healthcare, and education. Petroleum and alcohol are outside GST." } }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GSTCalculatorClient />
    </>
  )
}
