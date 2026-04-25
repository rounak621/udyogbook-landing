'use client'
import { useState, useRef, useEffect } from 'react'

const FONT_FAMILIES = [
  { name: 'Dancing Script', css: 'Dancing+Script' },
  { name: 'Great Vibes', css: 'Great+Vibes' },
  { name: 'Pacifico', css: 'Pacifico' },
  { name: 'Caveat', css: 'Caveat' },
  { name: 'Sacramento', css: 'Sacramento' },
  { name: 'Satisfy', css: 'Satisfy' },
]

export default function DigitalSignatureTool() {
  const [activeTab, setActiveTab] = useState<'draw' | 'type' | 'upload'>('draw')
  const [penColor, setPenColor] = useState('#000000')
  const [penSize, setPenSize] = useState(3)
  const [typedName, setTypedName] = useState('')
  const [selectedFont, setSelectedFont] = useState('Dancing Script')
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=Dancing+Script&family=Great+Vibes&family=Pacifico&family=Caveat&family=Sacramento&family=Satisfy&display=swap`
    link.onload = () => {
      // Give fonts a moment to apply
      setTimeout(() => setFontsLoaded(true), 300)
    }
    document.head.appendChild(link)
  }, [])

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return
    setIsDrawing(true)
    setLastPos(getPos(e, canvas))
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const pos = getPos(e, canvas)
    ctx.beginPath()
    ctx.moveTo(lastPos.x, lastPos.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = penColor
    ctx.lineWidth = penSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    setLastPos(pos)
  }

  const stopDrawing = () => setIsDrawing(false)

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const downloadSignature = () => {
    if (activeTab === 'draw') {
      const canvas = canvasRef.current
      if (!canvas) return
      const link = document.createElement('a')
      link.download = 'signature.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } else if (activeTab === 'type') {
      const canvas = document.createElement('canvas')
      canvas.width = 600
      canvas.height = 200
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = `72px '${selectedFont}'`
      ctx.fillStyle = penColor
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(typedName, 300, 100)
      const link = document.createElement('a')
      link.download = 'signature.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } else if (activeTab === 'upload' && uploadedImage) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.drawImage(img, 0, 0)
        // Remove white/near-white pixels — make transparent
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2]
          if (r > 200 && g > 200 && b > 200) {
            data[i + 3] = 0
          }
        }
        ctx.putImageData(imageData, 0, 0)
        const link = document.createElement('a')
        link.download = 'signature-transparent.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
      }
      img.src = uploadedImage
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setUploadedImage(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <style suppressHydrationWarning>{`
        .sig-tab:hover { opacity: 0.9; }
        .sig-color-btn:hover { transform: scale(1.1); }
        .sig-download:hover { background: #ea580c !important; }
        .sig-cta-outline:hover { background: #fff7ed !important; }
        .sig-clear:hover { background: #f9fafb !important; }
        .sig-upload-zone:hover { border-color: #f97316 !important; }
        .sig-font-btn:hover { border-color: #fdba74 !important; }
      `}</style>

      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', padding: '100px 20px 60px', textAlign: 'center', color: '#fff' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
          Free Digital Signature Maker
        </h1>
        <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          Create your professional digital signature online for free. Draw, type or upload — download as transparent PNG instantly. No signup required.
        </p>
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          {['✓ 100% Free', '✓ No Signup', '✓ Transparent PNG', '✓ Works on Mobile'].map(badge => (
            <span key={badge} style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: 20, fontSize: 14, fontWeight: 600 }}>
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Tool Section */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden' }}>

          {/* Tab Bar */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
            {(['draw', 'type', 'upload'] as const).map(tab => (
              <button
                key={tab}
                className="sig-tab"
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1, padding: '16px', border: 'none', cursor: 'pointer',
                  background: activeTab === tab ? '#fff' : '#f9fafb',
                  color: activeTab === tab ? '#f97316' : '#6b7280',
                  fontWeight: activeTab === tab ? 700 : 500,
                  fontSize: 15,
                  borderBottom: activeTab === tab ? '2px solid #f97316' : '2px solid transparent',
                  fontFamily: 'inherit',
                }}
              >
                {tab === 'draw' ? '✏️ Draw' : tab === 'type' ? '⌨️ Type' : '📤 Upload'}
              </button>
            ))}
          </div>

          <div style={{ padding: 24 }}>
            {/* DRAW TAB */}
            {activeTab === 'draw' && (
              <div>
                {/* Controls */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <label style={{ fontSize: 13, color: '#374151', fontWeight: 600 }}>Color:</label>
                    {['#000000', '#1e3a8a', '#1e40af', '#374151'].map(color => (
                      <button
                        key={color}
                        className="sig-color-btn"
                        onClick={() => setPenColor(color)}
                        style={{
                          width: 28, height: 28, borderRadius: '50%', background: color,
                          border: penColor === color ? '3px solid #f97316' : '2px solid #e5e7eb',
                          cursor: 'pointer', transition: 'transform 0.15s',
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <label style={{ fontSize: 13, color: '#374151', fontWeight: 600 }}>Thickness:</label>
                    {[2, 3, 5, 8].map(size => (
                      <button
                        key={size}
                        onClick={() => setPenSize(size)}
                        style={{
                          width: 32, height: 32, borderRadius: 8,
                          border: penSize === size ? '2px solid #f97316' : '1px solid #e5e7eb',
                          background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        <div style={{ width: size * 2, height: size * 2, borderRadius: '50%', background: penColor }} />
                      </button>
                    ))}
                  </div>
                  <button
                    className="sig-clear"
                    onClick={clearCanvas}
                    style={{ marginLeft: 'auto', padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff', color: '#374151', cursor: 'pointer', fontWeight: 600, fontSize: 13, fontFamily: 'inherit', transition: 'background 0.15s' }}
                  >
                    🗑️ Clear
                  </button>
                </div>

                {/* Canvas */}
                <div style={{ border: '2px dashed #e5e7eb', borderRadius: 12, background: '#fafafa', position: 'relative' }}>
                  <canvas
                    ref={canvasRef}
                    width={700}
                    height={250}
                    style={{ width: '100%', height: 250, cursor: 'crosshair', display: 'block', touchAction: 'none' }}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                  <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#d1d5db', fontSize: 14, pointerEvents: 'none', userSelect: 'none' }}>
                    Draw your signature here
                  </p>
                </div>
              </div>
            )}

            {/* TYPE TAB */}
            {activeTab === 'type' && (
              <div>
                <input
                  type="text"
                  placeholder="Type your name here..."
                  value={typedName}
                  onChange={e => setTypedName(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 16, marginBottom: 20, boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
                <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 12 }}>Choose a style:</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {FONT_FAMILIES.map(font => (
                    <button
                      key={font.name}
                      className="sig-font-btn"
                      onClick={() => setSelectedFont(font.name)}
                      style={{
                        padding: '16px 20px',
                        border: selectedFont === font.name ? '2px solid #f97316' : '1px solid #e5e7eb',
                        borderRadius: 10,
                        background: selectedFont === font.name ? '#fff7ed' : '#fff',
                        cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s',
                      }}
                    >
                      <span style={{ fontFamily: `'${font.name}', cursive`, fontSize: 28, color: penColor, display: 'block' }}>
                        {typedName || 'Your Name'}
                      </span>
                      <span style={{ fontSize: 11, color: '#9ca3af', marginTop: 4, display: 'block' }}>{font.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* UPLOAD TAB */}
            {activeTab === 'upload' && (
              <div>
                <div
                  className="sig-upload-zone"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: '2px dashed #e5e7eb', borderRadius: 12, padding: '48px 20px',
                    textAlign: 'center', cursor: 'pointer', background: '#fafafa',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <p style={{ fontSize: 48, marginBottom: 12 }}>📁</p>
                  <p style={{ fontSize: 16, fontWeight: 600, color: '#374151' }}>Click to upload your signature</p>
                  <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 6 }}>PNG, JPG supported — white background will be removed automatically</p>
                  <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} />
                </div>
                {uploadedImage && (
                  <div style={{ marginTop: 20, textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>Preview (background will be removed on download):</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={uploadedImage} alt="Uploaded signature" style={{ maxHeight: 150, maxWidth: '100%', border: '1px solid #e5e7eb', borderRadius: 8, padding: 8, display: 'inline-block' }} />
                  </div>
                )}
              </div>
            )}

            {/* Download Button */}
            <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                className="sig-download"
                onClick={downloadSignature}
                style={{
                  flex: 1, padding: '14px 24px', background: '#f97316', color: '#fff',
                  border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontFamily: 'inherit', transition: 'background 0.2s',
                }}
              >
                ⬇️ Download Signature (Free PNG)
              </button>
              <a
                href="https://app.udyogbook.in/sign-up"
                className="sig-cta-outline"
                style={{
                  padding: '14px 24px', background: '#fff', color: '#f97316',
                  border: '2px solid #f97316', borderRadius: 10, fontWeight: 700, fontSize: 15,
                  cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'background 0.2s',
                }}
              >
                Use in Udyog Invoice →
              </a>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 32, flexWrap: 'wrap' }}>
          {[
            { icon: '🔒', text: 'Your signature stays on your device' },
            { icon: '🆓', text: 'Always free, no hidden charges' },
            { icon: '📱', text: 'Works on mobile & desktop' },
          ].map(badge => (
            <div key={badge.text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6b7280', fontSize: 14 }}>
              <span style={{ fontSize: 20 }}>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
