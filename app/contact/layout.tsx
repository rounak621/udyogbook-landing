import type { Metadata } from 'next'
import { selfCanonical } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Udyog team for product queries, demos, support, or partnership inquiries.',
  alternates: selfCanonical('/contact'),
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
