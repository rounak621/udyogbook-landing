'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        minHeight: 44,
        padding: '10px 14px',
        borderRadius: 8,
        border: '1.5px solid #0F172A',
        background: copied ? '#FFFFFF' : '#0F172A',
        color: copied ? '#0F172A' : '#FFFFFF',
        fontSize: 13,
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        boxSizing: 'border-box',
      }}
      title="Copy code to clipboard"
    >
      {copied ? (
        <>
          <Check size={14} strokeWidth={2.5} color="#0F172A" /> Copied
        </>
      ) : (
        <>
          <Copy size={14} strokeWidth={2} color="#FFFFFF" /> Copy code
        </>
      )}
    </button>
  )
}
