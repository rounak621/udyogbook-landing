import type { Metadata } from 'next'
import { selfCanonical } from '../../lib/seo'
import { PRICING_FAQS } from '../../lib/pricingData'
import { getPlanOffersSchema, getBreadcrumbSchema, getFAQPageSchema } from '../../lib/schema'

export const metadata: Metadata = {
  title: 'Pricing Plans — Affordable GST Billing Software',
  description: 'Simple, transparent pricing for Udyog GST billing software. Plans start at ₹149/month with a 14-day free trial. Compare Basic, Pro, Premium, and Enterprise.',
  alternates: selfCanonical('/pricing'),
  openGraph: {
    title: 'Udyog Pricing — Simple, Transparent GST Billing Plans',
    description: 'Plans starting at ₹149/month. 14-day free trial on all plans. No credit card required.',
    url: 'https://udyogbook.in/pricing',
  },
}

const pricingSoftwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Udyog',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Android',
  description: 'Simple, transparent pricing for Udyog GST billing software. Plans start at ₹149/month with a 14-day free trial.',
  image: 'https://udyogbook.in/hero-mockup.png',
  offers: getPlanOffersSchema(),
}

const pricingFaqSchema = getFAQPageSchema(PRICING_FAQS)
const pricingBreadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', url: 'https://udyogbook.in' },
  { name: 'Pricing', url: 'https://udyogbook.in/pricing' },
])

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSoftwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingBreadcrumbSchema) }}
      />
      {children}
    </>
  )
}

