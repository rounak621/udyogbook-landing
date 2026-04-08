'use client'
import { useEffect } from 'react'

interface LaunchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LaunchModal({ isOpen, onClose }: LaunchModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(15,23,42,0.7)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <style suppressHydrationWarning>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 24,
          padding: 'clamp(32px, 5vw, 48px)',
          maxWidth: 480,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
          animation: 'slideUp 0.25s ease',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: '#f1f5f9', border: 'none', borderRadius: '50%',
            width: 32, height: 32, cursor: 'pointer',
            fontSize: 16, color: '#64748b',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          ✕
        </button>

        {/* Emoji */}
        <div style={{ fontSize: 52, marginBottom: 16 }}>🚀</div>

        {/* Badge */}
        <div style={{
          display: 'inline-block',
          background: '#FFF5E6', color: '#F97316',
          fontSize: 11, fontWeight: 800,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '4px 14px', borderRadius: 100,
          border: '1px solid #FED7AA',
          marginBottom: 16,
        }}>
          Launching Soon
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(22px, 4vw, 30px)',
          fontWeight: 400,
          color: '#0f172a',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          marginBottom: 12,
        }}>
          We&apos;re putting the final touches! 🎉
        </h2>

        {/* Subtext */}
        <p style={{
          fontSize: 15, color: '#64748b',
          lineHeight: 1.7, marginBottom: 28,
        }}>
          Udyog is launching very soon. Be the first to know when we go live — drop your email and we&apos;ll notify you instantly.
        </p>

        {/* Email input */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <input
            type="email"
            placeholder="your@email.com"
            style={{
              flex: 1, padding: '12px 14px',
              border: '1.5px solid #E2E8F0',
              borderRadius: 10, fontSize: 14,
              color: '#0f172a', outline: 'none',
              fontFamily: 'var(--font-body)',
            }}
            onFocus={e => e.target.style.borderColor = '#F97316'}
            onBlur={e => e.target.style.borderColor = '#E2E8F0'}
          />
          <button
            style={{
              background: '#F97316', color: '#fff',
              border: 'none', borderRadius: 10,
              padding: '12px 20px', fontWeight: 700,
              fontSize: 14, cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 14px rgba(249,115,22,0.4)',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#ea580c')}
            onMouseLeave={e => (e.currentTarget.style.background = '#F97316')}
          >
            Notify me →
          </button>
        </div>

        {/* Fine print */}
        <p style={{ fontSize: 12, color: '#94a3b8' }}>
          No spam. We&apos;ll only email you when Udyog launches.
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: '#f1f5f9', margin: '24px 0' }} />

        {/* Contact info */}
        <p style={{ fontSize: 13, color: '#64748b' }}>
          Questions? Reach us at{' '}
          <a href="mailto:udyogbook@gmail.com" style={{ color: '#F97316', fontWeight: 600, textDecoration: 'none' }}>
            udyogbook@gmail.com
          </a>
          {' '}or{' '}
          <a href="tel:+917977422531" style={{ color: '#F97316', fontWeight: 600, textDecoration: 'none' }}>
            +91 79774 22531
          </a>
        </p>
      </div>
    </div>
  )
}
