export default function SEOContent() {
  return (
    <div style={{ background: '#f9fafb', borderTop: '1px solid #e5e7eb', marginTop: 40 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 20px' }}>

        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#111', marginBottom: 16 }}>
          Why use a Digital Signature on your GST Invoice?
        </h2>
        <p style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.8, marginBottom: 32 }}>
          A digital signature on your GST invoice makes your business look professional and credible. Under Indian GST rules, invoices with authorized signatures are legally valid. Instead of printing, signing, and scanning — simply add your digital signature directly to your invoice in seconds.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#111', marginBottom: 16 }}>
          How to Create a Digital Signature in 3 Steps
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { step: '1', title: 'Draw, Type or Upload', desc: 'Choose how you want to create your signature — draw with mouse or finger, type your name in a handwriting font, or upload an existing signature.' },
            { step: '2', title: 'Preview Your Signature', desc: 'See exactly how your signature will look. Adjust color, thickness, and font style until you are happy with the result.' },
            { step: '3', title: 'Download Free PNG', desc: 'Click download to get your signature as a high-resolution transparent PNG. Ready to use on invoices, contracts and documents.' },
          ].map(item => (
            <div key={item.step} style={{ background: '#f9fafb', borderRadius: 12, padding: 24 }}>
              <div style={{ width: 40, height: 40, background: '#f97316', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>
                {item.step}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#111', marginBottom: 24 }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
          {[
            {
              q: 'Is this digital signature legally valid in India?',
              a: 'For GST invoices and general business documents, a scanned or digital image of your handwritten signature is accepted. For documents requiring a certified digital signature (like IT returns), you need a DSC (Digital Signature Certificate) from a licensed CA.'
            },
            {
              q: 'How do I add this signature to my GST invoice?',
              a: 'If you use Udyog for billing, upload your signature in Settings → Business Profile → Signature. It will automatically appear on all your invoices. For other tools, download the PNG and insert it into your invoice template.'
            },
            {
              q: 'What format is the downloaded signature?',
              a: 'Your signature is downloaded as a PNG file with a transparent background. This means no white box will appear around your signature when you place it on a document or invoice.'
            },
            {
              q: 'Is this tool really free? Are there any hidden charges?',
              a: 'Yes, completely free. No signup, no watermark, no hidden charges. Your signature is created entirely in your browser — we never store or upload your signature to our servers.'
            },
            {
              q: 'Does it work on mobile phones?',
              a: 'Yes. The draw mode supports touch input, so you can sign with your finger on any smartphone or tablet. Works on Android and iPhone browsers without any app download.'
            },
            {
              q: 'डिजिटल सिग्नेचर कैसे बनाएं? (How to make digital signature in Hindi)',
              a: 'ऊपर दिए गए टूल में Draw, Type या Upload में से कोई एक option चुनें। अपना signature बनाएं और Download बटन पर click करें। आपका signature transparent PNG format में download हो जाएगा।'
            },
          ].map(faq => (
            <div key={faq.q} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 8 }}>{faq.q}</h3>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', borderRadius: 16, padding: '40px 32px', textAlign: 'center', marginTop: 48, color: '#fff' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Ready to use your signature on GST invoices?</h2>
          <p style={{ fontSize: 16, opacity: 0.9, marginBottom: 24 }}>Join thousands of businesses using Udyog for professional GST billing</p>
          <a
            href="https://app.udyogbook.in/sign-up"
            style={{ display: 'inline-block', background: '#fff', color: '#f97316', padding: '14px 32px', borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}
          >
            Start Free Trial — No Credit Card Required
          </a>
        </div>

      </div>
    </div>
  )
}
