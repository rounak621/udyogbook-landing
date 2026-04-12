import type { Metadata } from 'next'
import LaunchModalProvider from './components/LaunchModalProvider'

export const metadata: Metadata = {
  title: {
    default: 'Udyog — GST Billing Software for Indian Businesses',
    template: '%s | Udyog'
  },
  description: 'Create GST invoices in seconds with voice billing, manage inventory, track payments, and collaborate with your CA. Built for Indian retailers, traders, and MSMEs.',
  keywords: [
    'GST billing software India',
    'GST invoice software',
    'billing software for small business India',
    'MSME billing software',
    'voice billing app India',
    'CA portal software',
    'inventory management India',
    'Vyapar alternative',
    'myBillBook alternative',
    'GST invoice maker',
    'online billing software India',
    'shop billing software',
    'kirana store billing software',
    'rental management software India',
    'udyog billing',
    'udyogbook'
  ],
  authors: [{ name: 'Udyog', url: 'https://udyogbook.in' }],
  creator: 'Udyog',
  publisher: 'Udyog',
  metadataBase: new URL('https://udyogbook.in'),
  openGraph: {
    title: 'Udyog — Bill banao, bolke.',
    description: "India's smartest GST billing platform. Create invoices with your voice, manage inventory, and collaborate with your CA.",
    url: 'https://udyogbook.in',
    siteName: 'Udyog',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Udyog — GST Billing Software for Indian Businesses',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Udyog — GST Billing for Indian Businesses',
    description: 'Create GST invoices with your voice. Built for Indian MSMEs.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://udyogbook.in',
  },
  verification: {
    google: 'oP-ry-1Ab18vApvlXUTunE8RlNd47Tw-qWpVUXWeY38',
  },
  category: 'technology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TKM2HJ66');`
        }} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CTGVDRNMNE" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CTGVDRNMNE');
          `
        }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Udyog',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              description: 'GST billing software for Indian businesses',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
              aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '2300' },
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TKM2HJ66"
            height="0"
            width="0"
            style={{display:'none', visibility:'hidden'}}
          />
        </noscript>
        <style suppressHydrationWarning>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          body {
            font-family: 'DM Sans', 'Helvetica Neue', sans-serif;
            background: #ffffff;
            color: #0f172a;
            overflow-x: hidden;
          }
          :root {
            --orange: #F97316;
            --orange-dark: #ea580c;
            --orange-light: #FFF5E6;
            --black: #111111;
            --white: #ffffff;
            --bg: #fafaf8;
            --bg-alt: #ffffff;
            --gray-100: #f5f5f2;
            --gray-200: #e8e8e4;
            --gray-400: #999999;
            --gray-600: #666666;
            --font-display: 'Fraunces', serif;
            --font-body: 'DM Sans', 'Helvetica Neue', sans-serif;
            --radius-sm: 8px;
            --radius-md: 12px;
            --radius-lg: 20px;
            --radius-full: 100px;
            --section-px: clamp(20px, 5vw, 80px);
            --max-w: 1200px;
          }
          a { text-decoration: none; color: inherit; }
          button { cursor: pointer; font-family: var(--font-body); border: none; }
          img { max-width: 100%; display: block; }

          .btn-orange {
            display: inline-flex; align-items: center; justify-content: center; gap: 6px;
            background: var(--orange); color: #fff;
            padding: 14px 28px; border-radius: 10px;
            font-size: 15px; font-weight: 500; font-family: var(--font-body);
            transition: background 0.2s, transform 0.15s;
            white-space: nowrap;
          }
          .btn-orange:hover { background: var(--orange-dark); transform: translateY(-1px); }

          .btn-outline {
            display: inline-flex; align-items: center; justify-content: center; gap: 6px;
            background: transparent; color: var(--black);
            border: 1.5px solid var(--black);
            padding: 13px 28px; border-radius: 10px;
            font-size: 15px; font-weight: 500; font-family: var(--font-body);
            transition: all 0.2s;
            white-space: nowrap;
          }
          .btn-outline:hover { background: var(--black); color: #fff; }

          .btn-outline-white {
            display: inline-flex; align-items: center; justify-content: center; gap: 6px;
            background: transparent; color: #fff;
            border: 1.5px solid rgba(255,255,255,0.35);
            padding: 13px 28px; border-radius: 10px;
            font-size: 15px; font-weight: 500; font-family: var(--font-body);
            transition: all 0.2s;
            white-space: nowrap;
          }
          .btn-outline-white:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.7); }

          .badge {
            display: inline-block;
            background: var(--orange-light); color: #c2410c;
            font-size: 11px; font-weight: 700;
            padding: 4px 14px; border-radius: var(--radius-full);
            letter-spacing: 0.06em; text-transform: uppercase;
            border: 1px solid #fed7aa;
          }

          .section-label {
            font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
            text-transform: uppercase; color: var(--orange);
            margin-bottom: 12px; display: block;
          }

          .display { font-family: var(--font-display); font-weight: 400; letter-spacing: -0.02em; line-height: 1.1; }
          .italic { font-style: italic; }
          .text-orange { color: var(--orange); }

          .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
          .fade-up.visible { opacity: 1; transform: translateY(0); }
          .d1 { transition-delay: 0.08s; }
          .d2 { transition-delay: 0.16s; }
          .d3 { transition-delay: 0.24s; }
          .d4 { transition-delay: 0.32s; }
          .d5 { transition-delay: 0.40s; }
          .d6 { transition-delay: 0.48s; }

          .card {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: var(--radius-lg);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.07); }

          @media (max-width: 900px) {
            .cols-3 { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 600px) {
            .cols-3, .cols-2 { grid-template-columns: 1fr !important; }
            .cols-3-plans { grid-template-columns: 1fr !important; }
            .mobile-col { flex-direction: column !important; }
            .hide-mobile { display: none !important; }
            .mobile-center { text-align: center !important; }
          }
        `}</style>
        <LaunchModalProvider>
          {children}
        </LaunchModalProvider>
      </body>
    </html>
  )
}
