'use client'
import { useState } from 'react'
import ComingSoonModal from '../components/ComingSoonModal'

export default function AboutCTAButtons() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
        <button 
          onClick={() => setShowModal(true)} 
          style={{ 
            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            background: '#F97316', color: '#fff', padding: '14px 28px', 
            borderRadius: 10, fontWeight: 700, fontSize: 15, 
            textDecoration: 'none', boxShadow: '0 4px 16px rgba(249,115,22,0.35)', 
            display: 'inline-flex', alignItems: 'center', gap: 8 
          }}
        >
          Start free trial →
        </button>
        <a href="/contact" style={{ background: 'transparent', color: '#0f172a', border: '2px solid #E2E8F0', padding: '12px 28px', borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          Contact us →
        </a>
      </div>
      <ComingSoonModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
