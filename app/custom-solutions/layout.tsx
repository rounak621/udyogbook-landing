import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Billing Software Solutions | Udyog',
  description: "Looking for custom billing software in India? We customize Udyog's GST billing platform for your exact workflow in weeks. Get your personalized quote today.",
  keywords: 'custom billing software india, bespoke gst billing software, customized invoicing solution, retail billing software customization, udyog custom solutions',
  alternates: {
    canonical: 'https://udyogbook.in/custom-solutions',
  },
  openGraph: {
    title: 'Custom Billing Software Solutions | Udyog',
    description: "Tailored billing software built on top of Udyog's proven GST platform. Personalized, affordable, and ready in weeks.",
    url: 'https://udyogbook.in/custom-solutions',
    type: 'website',
  },
}

export default function CustomSolutionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
