import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Udyog team for product queries, demos, support, or partnership inquiries.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
