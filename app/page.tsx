import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import Features from './components/Features'
import FeatureTabs from './components/FeatureTabs'
import HowItWorks from './components/HowItWorks'
import Industries from './components/Industries'
import Testimonials from './components/Testimonials'
import ComparisonTable from './components/ComparisonTable'
import FAQ from './components/FAQ'
import DarkCTA from './components/DarkCTA'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'
import FreeTools from './components/FreeTools'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div style={{
          background: 'linear-gradient(90deg, #0F172A 0%, #1e293b 100%)',
          padding: '10px 20px',
          textAlign: 'center',
          fontSize: 13,
          color: 'rgba(255,255,255,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}>
          <span style={{ background: '#F97316', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 100, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Coming Soon
          </span>
          <span>Udyog is launching soon — </span>
          <a href="mailto:udyogbook@gmail.com" style={{ color: '#F97316', fontWeight: 700, textDecoration: 'none' }}>
            Join the waitlist →
          </a>
        </div>
        <Hero />
        <StatsBar />
        <Features />
        <FeatureTabs />
        <HowItWorks />
        <Industries />
        <Testimonials />
        <ComparisonTable />
        <FAQ />
        <FreeTools />
        <DarkCTA />
      </main>
      <Footer />
    </>
  )
}
