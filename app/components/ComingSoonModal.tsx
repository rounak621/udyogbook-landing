'use client'
import { useEffect } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function ComingSoonModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 20,
          padding: '40px 36px', maxWidth: 440,
          width: '100%', textAlign: 'center',
          boxShadow: '0 24px 64px rgba(0,0,0,0.2)'
        }}
      >
        <div style={{
          width: 72, height: 72,
          background: 'linear-gradient(135deg, #F97316, #fb923c)',
          borderRadius: 20, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px', fontSize: 32
        }}>
          🚀
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
          Launching April 19, 2026!
        </h2>
        <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 24 }}>
          Udyog is launching very soon. Be among the first to experience
          AI-powered GST billing for your business.
        </p>

        {/* Countdown */}
        <div style={{
          background: '#F8FAFC', borderRadius: 12,
          padding: '16px 20px', marginBottom: 24,
          border: '1px solid #E2E8F0'
        }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Launching on
          </p>
          <p style={{ fontSize: 20, fontWeight: 800, color: '#F97316' }}>
            19 April 2026
          </p>
        </div>

        {/* Email signup */}
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
          Get notified when we launch:
        </p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <input
            type="email"
            placeholder="your@email.com"
            style={{
              flex: 1, border: '1px solid #E2E8F0',
              borderRadius: 8, padding: '10px 14px',
              fontSize: 13, color: '#374151', outline: 'none'
            }}
          />
          <button
            onClick={() => {
              alert('Thank you! We will notify you on launch.')
              onClose()
            }}
            style={{
              background: '#F97316', color: '#fff',
              border: 'none', borderRadius: 8,
              padding: '10px 16px', fontSize: 13,
              fontWeight: 700, cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Notify Me
          </button>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none',
            color: '#94a3b8', fontSize: 13,
            cursor: 'pointer', textDecoration: 'underline'
          }}
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}
