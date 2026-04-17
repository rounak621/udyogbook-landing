import { Metadata } from 'next'
import InvoiceTemplateClient from './ClientPage'

export const metadata: Metadata = {
  title: 'Free GST Invoice Format Download — Excel & PDF Templates 2026 | Udyog',
  description: 'Download free GST invoice format in Excel and PDF for Indian businesses. Includes all mandatory fields: GSTIN, HSN code, CGST/SGST/IGST, place of supply. Ready to use.',
  keywords: 'gst invoice format download, gst invoice template excel, gst bill format pdf, free invoice template india, gst invoice format 2026',
  alternates: {
    canonical: 'https://udyogbook.in/invoice-template',
  },
}

export default function InvoiceTemplatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is the correct GST invoice format in India?", "acceptedAnswer": { "@type": "Answer", "text": "A GST invoice must include: supplier name/address/GSTIN, buyer name/address/GSTIN, invoice number and date, HSN/SAC code, description, quantity, taxable value, GST rate and amount (CGST/SGST or IGST), place of supply, and total value. These are mandated under Rule 46 of CGST Rules." } },
      { "@type": "Question", "name": "Can I use my own GST invoice format?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The GST law does not prescribe a fixed template — only the mandatory fields. As long as all required fields are present, you can use any format. However, using a pre-built compliant template avoids missing fields." } },
      { "@type": "Question", "name": "What is HSN code and is it mandatory on GST invoice?", "acceptedAnswer": { "@type": "Answer", "text": "HSN (Harmonized System of Nomenclature) is a code that classifies goods for GST purposes. It is mandatory for businesses with turnover above ₹5 crore (6-digit HSN) and above ₹1.5 crore (4-digit HSN). Below ₹1.5 crore it is optional but recommended." } },
      { "@type": "Question", "name": "What is the difference between a tax invoice and a bill of supply?", "acceptedAnswer": { "@type": "Answer", "text": "A tax invoice is issued by GST-registered businesses for taxable supplies and shows the GST charged. A bill of supply is issued for exempt supplies or by composition scheme dealers who cannot charge GST." } },
      { "@type": "Question", "name": "How many copies of GST invoice should be made?", "acceptedAnswer": { "@type": "Answer", "text": "For goods: 3 copies — Original for buyer, Duplicate for transporter, Triplicate for supplier. For services: 2 copies — Original for recipient, Duplicate for supplier." } }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InvoiceTemplateClient />
    </>
  )
}
