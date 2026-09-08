import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing Plans — Affordable GST Billing Software | Udyog',
  description: 'Simple, transparent pricing for Udyog GST billing software. Plans start at ₹149/month with a 14-day free trial. Compare Basic, Pro, Premium, and Enterprise.',
  alternates: {
    canonical: 'https://udyogbook.in/pricing',
  },
  openGraph: {
    title: 'Udyog Pricing — Simple, Transparent GST Billing Plans',
    description: 'Plans starting at ₹149/month. 14-day free trial on all plans. No credit card required.',
    url: 'https://udyogbook.in/pricing',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
