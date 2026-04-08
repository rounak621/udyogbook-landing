'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLaunchModal } from './LaunchModalProvider'

const SIGN_UP_URL = 'https://app.udyogbook.in/sign-up'
const LOGIN_URL = 'https://app.udyogbook.in/sign-in'

const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { openModal } = useLaunchModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style suppressHydrationWarning>{`
        .nav-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          background: #fff;
          transition: box-shadow 0.3s;
          padding: 0 var(--section-px);
        }
        .nav-root.scrolled { box-shadow: 0 1px 0 #f0f0ee; }
        .nav-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          height: 76px;
        }
        .nav-logo { display: flex; align-items: center; text-decoration: none; }
        .nav-links { display: flex; align-items: center; gap: 32px; }
        .nav-link {
          font-size: 14px; font-weight: 500; color: #444;
          text-decoration: none; transition: color 0.2s;
        }
        .nav-link:hover { color: #f97316; }
        .nav-actions { display: flex; align-items: center; gap: 12px; }
        .nav-login {
          font-size: 14px; font-weight: 500; color: #444;
          background: none; border: none; cursor: pointer;
          font-family: var(--font-body); text-decoration: none;
          transition: color 0.2s;
        }
        .nav-login:hover { color: #111; }
        .nav-cta {
          background: #F97316; color: #fff;
          border: none; padding: 10px 20px; border-radius: 8px;
          font-size: 14px; font-weight: 700; font-family: var(--font-body);
          cursor: pointer; transition: background 0.2s;
          text-decoration: none; display: inline-block;
        }
        .nav-cta:hover { background: #ea580c; }
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; padding: 4px; cursor: pointer; border: none;
        }
        .hamburger span { display: block; width: 22px; height: 2px; background: #111; border-radius: 2px; transition: all 0.2s; }
        .mobile-menu {
          display: none; position: fixed; top: 76px; left: 0; right: 0; bottom: 0;
          background: #fff; z-index: 199; padding: 24px var(--section-px);
          flex-direction: column; gap: 4px; border-top: 1px solid #f0f0f0;
        }
        .mobile-menu.open { display: flex; }
        .mobile-nav-link { font-size: 18px; font-weight: 500; padding: 14px 0; border-bottom: 1px solid #f5f5f5; color: #111; display: block; text-decoration: none; }
        .mobile-nav-link:hover { color: #f97316; background: rgba(249,115,22,0.05); }
        .mobile-cta { margin-top: 20px; display: block; text-align: center; background: #F97316; color: #fff; padding: 14px; border-radius: 8px; font-weight: 700; text-decoration: none; }
        @media (max-width: 700px) {
          .nav-links, .nav-login { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>

      <nav className={`nav-root${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <Image
              src="/udyog-logo.png"
              alt="Udyog"
              width={140}
              height={44}
              style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
              priority
            />
          </a>

          <div className="nav-links">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>

          <div className="nav-actions">
            <a href={LOGIN_URL} className="nav-login">Log in</a>
            <button onClick={openModal} className="nav-cta" style={{ cursor: 'pointer' }}>Free trial</button>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(l => (
          <a key={l.label} href={l.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
        <a href={LOGIN_URL} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Log in</a>
        <button className="mobile-cta" onClick={() => { setMenuOpen(false); openModal(); }}>Start free trial →</button>
      </div>
    </>
  )
}
