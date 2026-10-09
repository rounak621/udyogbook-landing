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
        gap: 4,
        padding: '4px 8px',
        borderRadius: 6,
        border: '1px solid #CBD5E1',
        background: '#fff',
        fontSize: 11,
        fontWeight: 600,
        color: copied ? '#16A34A' : '#475569',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
      title="Copy code to clipboard"
    >
      {copied ? (
        <>
          <Check size={12} color="#16A34A" /> Copied
        </>
      ) : (
        <>
          <Copy size={12} /> Copy
        </>
      )}
    </button>
  )
}
