import type { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import DigitalSignatureTool from './DigitalSignatureTool'
import SEOContent from './SEOContent'

export const metadata: Metadata = {
  title: 'Free Digital Signature Maker Online | Create Transparent PNG — Udyog',
  description: 'Create your free digital signature online in seconds. Draw, type or upload your signature. Download as transparent PNG — perfect for GST invoices, contracts and business documents. No signup required.',
  keywords: 'free digital signature maker, digital signature generator online, create digital signature online, transparent signature PNG, signature for GST invoice, digital signature kaise banaye, free signature maker india',
  openGraph: {
    title: 'Free Digital Signature Maker Online — Udyog',
    description: 'Draw, type or upload your signature. Download as transparent PNG for free. Perfect for GST invoices.',
    url: 'https://udyogbook.in/tools/digital-signature',
    type: 'website',
  },
  alternates: {
    canonical: 'https://udyogbook.in/tools/digital-signature',
  },
}

export default function DigitalSignaturePage() {
  return (
    <>
      <Navbar />
      <DigitalSignatureTool />
      <SEOContent />
      <Footer />
    </>
  )
}
