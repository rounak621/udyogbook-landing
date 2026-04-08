import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy — Udyog',
  description: 'Cookie Policy for Udyog — how we use cookies and tracking technologies.',
}

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68, background: '#fff', minHeight: '100vh' }}>
        <section style={{ background: '#0F172A', padding: 'clamp(48px,6vw,72px) var(--section-px)', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 400, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10 }}>Cookie Policy</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Last updated: April 8, 2026</p>
        </section>
        <section style={{ padding: 'clamp(48px,6vw,80px) var(--section-px)' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            {[
              { title: 'What Are Cookies', content: 'Cookies are small text files placed on your device when you visit our website. They help us provide a better experience by remembering your preferences, keeping you logged in, and understanding how you use our service.' },
              { title: 'Types of Cookies We Use', content: 'Essential Cookies: Required for the website to function. These include authentication cookies (to keep you logged in) and security cookies. They cannot be disabled. Performance Cookies: Help us understand how visitors interact with our website by collecting anonymous usage data. We use this to improve our service. Preference Cookies: Remember your settings and preferences such as language, theme, and business selection.' },
              { title: 'Third-Party Cookies', content: 'We use a limited number of trusted third-party services that may set cookies: Clerk (authentication), Google Analytics (anonymous usage statistics). We do not use advertising or tracking cookies. Udyog products are ad-free and we do not allow advertisers to track you.' },
              { title: 'Managing Cookies', content: 'You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Note that disabling essential cookies will prevent you from logging in and using the Service. To manage cookies, go to your browser settings and look for Privacy or Cookie options.' },
              { title: 'Session Storage', content: 'We also use session storage (a browser technology similar to cookies) to temporarily store information during your session, such as your active business selection. This data is automatically cleared when you close your browser.' },
              { title: 'Updates to This Policy', content: 'We may update this Cookie Policy from time to time. We will notify you of significant changes via email or a notice on our website.' },
              { title: 'Contact', content: 'For questions about our Cookie Policy, contact us at udyogbook@gmail.com.' },
            ].map(section => (
              <div key={section.title} style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{section.title}</h2>
                <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.8 }}>{section.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
