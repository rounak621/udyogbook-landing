import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy — Udyog | How We Use Cookies',
  description: 'Learn how Udyog uses cookies to improve your experience. We use essential, analytics, and preference cookies. You can control cookie settings at any time.',
  keywords: 'udyog cookie policy, cookies billing software, cookie consent india',
}

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68, background: '#fff', minHeight: '100vh', paddingBottom: 80 }}>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What are cookies?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, keep you logged in, and understand how you use the site."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does Udyog use cookies?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Udyog uses essential cookies to keep you logged in and remember your preferences, analytics cookies to understand how our platform is used, and functional cookies to save your settings."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I disable cookies on Udyog?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can disable non-essential cookies through your browser settings at any time. However, disabling essential cookies may affect your ability to log in and use the Udyog platform."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does Udyog share cookie data with third parties?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Udyog does not sell your cookie data to third parties. We use analytics data only to improve our platform. We may use trusted third-party services like Google Analytics which have their own cookie policies."
                  }
                }
              ]
            })
          }}
        />

        {/* Hero */}
        <section style={{ background: '#0F172A', padding: 'clamp(60px,8vw,100px) var(--section-px)', textAlign: 'center' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F97316', marginBottom: 14, display: 'inline-block' }}>LEGAL</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,56px)', fontWeight: 400, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
              Cookie Policy
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              Last updated: April 2026
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div style={{ maxWidth: 780, margin: '0 auto', padding: 'clamp(48px,6vw,80px) var(--section-px)' }}>
          <style suppressHydrationWarning>{`
            .cp-content h2 { font-size: 24px; font-weight: 700; color: #0f172a; margin-top: 48px; margin-bottom: 16px; font-family: var(--font-display); }
            .cp-content p { font-size: 16px; color: #475569; line-height: 1.8; margin-bottom: 24px; }
            .cp-content ul, .cp-content ol { font-size: 16px; color: #475569; line-height: 1.8; margin-bottom: 24px; padding-left: 20px; }
            .cp-content li { margin-bottom: 8px; }
            
            .cp-table-wrap { overflow-x: auto; margin-bottom: 32px; border: 1px solid #e2e8f0; border-radius: 12px; }
            .cp-table { width: 100%; border-collapse: collapse; min-width: 600px; }
            .cp-table th, .cp-table td { padding: 14px 20px; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
            .cp-table th { background: #f8fafc; font-weight: 600; color: #0f172a; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em; }
            .cp-table tr:last-child td { border-bottom: none; }
            .cp-table td:nth-child(1) { font-weight: 600; color: #0f172a; }
            .cp-table td:nth-child(2) { color: #64748b; }
            .cp-table td:nth-child(3) { color: #0f172a; white-space: nowrap; }
            .cp-table td:nth-child(4) { font-weight: 500; }
            .cp-yes { color: #16a34a; }
            .cp-no { color: #dc2626; }
            
            .cp-faq-item { border-bottom: 1px solid #E2E8F0; padding: 24px 0; }
            .cp-faq-item:last-child { border-bottom: none; }
            .cp-faq-q { font-size: 18px; font-weight: 600; color: #0f172a; margin-bottom: 12px; }
            .cp-faq-a { font-size: 15px; color: #64748b; line-height: 1.7; }
          `}</style>
          
          <div className="cp-content">
            <h2 style={{ marginTop: 0 }}>What are cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners information about how their site is being used. Cookies cannot run programs or deliver viruses to your computer. They are uniquely assigned to your browser and can only be read by the web server that issued them.
            </p>

            <h2>How Udyog uses cookies</h2>
            <p>
              Udyog uses cookies to ensure the platform works correctly, remember your preferences, keep you securely logged in, and understand how our users interact with the product so we can improve it. We do not use cookies to show you advertisements or track you across other websites.
            </p>
            
            <div className="cp-table-wrap">
              <table className="cp-table">
                <thead>
                  <tr>
                    <th>Cookie Type</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                    <th>Can be disabled?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Essential cookies</td>
                    <td>Keep you logged in, maintain session security, remember your account</td>
                    <td>Session / 30 days</td>
                    <td className="cp-no">No — required for platform to work</td>
                  </tr>
                  <tr>
                    <td>Preference cookies</td>
                    <td>Remember your language, display settings, and UI preferences</td>
                    <td>1 year</td>
                    <td className="cp-yes">Yes</td>
                  </tr>
                  <tr>
                    <td>Analytics cookies</td>
                    <td>Understand which features are used most, improve the product</td>
                    <td>90 days</td>
                    <td className="cp-yes">Yes</td>
                  </tr>
                  <tr>
                    <td>Security cookies</td>
                    <td>Prevent fraud and protect your account from unauthorised access</td>
                    <td>Session</td>
                    <td className="cp-no">No — required for security</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Third-party cookies</h2>
            <p>
              Udyog may use trusted third-party services that set their own cookies. These include:
            </p>
            <ul>
              <li>Google Analytics — to understand how users navigate the platform (analytics.google.com/privacy)</li>
              <li>Clerk — for authentication and session management (clerk.com/privacy)</li>
              <li>Razorpay — for payment processing security (razorpay.com/privacy)</li>
            </ul>
            <p>
              These third parties have their own privacy and cookie policies. Udyog does not control these cookies and recommends reviewing the privacy policies of these services.
            </p>

            <h2>Your cookie choices</h2>
            <p>
              You have control over the cookies stored on your device. Here is how you can manage them:
            </p>
            <ol>
              <li>
                <strong>Browser settings</strong> — Most browsers allow you to view, delete, and block cookies. Visit your browser's help section to learn how.
                <div style={{ marginTop: 8, padding: '12px 16px', background: '#F8FAFC', borderRadius: 8, fontSize: 14 }}>
                  <div style={{ marginBottom: 4 }}><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</div>
                  <div style={{ marginBottom: 4 }}><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</div>
                  <div><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</div>
                </div>
              </li>
            </ol>
            <p style={{ fontSize: 14, background: '#fef2f2', color: '#991b1b', padding: '12px 16px', borderRadius: 8, borderLeft: '4px solid #ef4444' }}>
              <strong>Note:</strong> Disabling essential cookies will prevent you from logging into Udyog.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              Udyog may update this Cookie Policy from time to time as our platform evolves or as regulations change. When we make changes, we will update the "Last updated" date at the top of this page. We encourage you to review this page periodically. Continued use of Udyog after changes constitutes acceptance of the updated policy.
            </p>

            <h2>Contact us</h2>
            <p>
              If you have any questions about how Udyog uses cookies, please contact us at <strong>contact@udyogbook.in</strong>. We aim to respond to all privacy-related queries within 48 hours.
            </p>
            
            <hr style={{ border: 0, borderBottom: '1px solid #E2E8F0', margin: '48px 0' }} />
            
            <h2 style={{ fontSize: 28, marginBottom: 24, textAlign: 'center' }}>Frequently Asked Questions</h2>
            <div itemScope itemType="https://schema.org/FAQPage">
              <div className="cp-faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="cp-faq-q" itemProp="name">What are cookies?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="cp-faq-a" itemProp="text">Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, keep you logged in, and understand how you use the site.</p>
                </div>
              </div>
              <div className="cp-faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="cp-faq-q" itemProp="name">Does Udyog use cookies?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="cp-faq-a" itemProp="text">Yes. Udyog uses essential cookies to keep you logged in and remember your preferences, analytics cookies to understand how our platform is used, and functional cookies to save your settings.</p>
                </div>
              </div>
              <div className="cp-faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="cp-faq-q" itemProp="name">Can I disable cookies on Udyog?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="cp-faq-a" itemProp="text">You can disable non-essential cookies through your browser settings at any time. However, disabling essential cookies may affect your ability to log in and use the Udyog platform.</p>
                </div>
              </div>
              <div className="cp-faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="cp-faq-q" itemProp="name">Does Udyog share cookie data with third parties?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="cp-faq-a" itemProp="text">Udyog does not sell your cookie data to third parties. We use analytics data only to improve our platform. We may use trusted third-party services like Google Analytics which have their own cookie policies.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
