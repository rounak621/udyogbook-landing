'use client'
import { useState, useRef, useEffect } from 'react'
import { Pencil, Type, Upload, Trash2, Download, FolderOpen, Shield, BadgeCheck, Smartphone, Check, CheckCircle } from 'lucide-react'

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
        // Brightness-based removal — keeps dark pixels (ink), removes light pixels (background)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i+1], b = data[i+2]
          // Calculate perceived brightness
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114)
          if (brightness > 160) {
            // Light pixel = background = make transparent
            data[i+3] = 0
          } else {
            // Dark pixel = ink = keep with alpha based on darkness
            data[i+3] = Math.round(255 * (1 - brightness / 255))
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

      {/* Hero */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '48px 20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#fff7ed', color: '#f97316', padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
          Free Tool
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: '#111827', marginBottom: 16, lineHeight: 1.2 }}>
          Free Digital Signature Maker
        </h1>
        <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 560, margin: '0 auto 24px', lineHeight: 1.6 }}>
          Create your professional digital signature online. Draw, type or upload — download as transparent PNG instantly.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          {[
            { icon: <Check size={14} />, text: '100% Free' },
            { icon: <Check size={14} />, text: 'No Signup Required' },
            { icon: <Check size={14} />, text: 'Transparent PNG' },
            { icon: <Check size={14} />, text: 'Works on Mobile' },
          ].map(badge => (
            <div key={badge.text} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#374151', fontSize: 14, fontWeight: 500 }}>
              <span style={{ color: '#f97316' }}>{badge.icon}</span>
              {badge.text}
            </div>
          ))}
        </div>
      </div>

      {/* Tool Section */}
      {/* Tool Card */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', overflow: 'hidden' }}>

          {/* Tab Bar */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
            {(['draw', 'type', 'upload'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1, padding: '14px 8px', border: 'none', cursor: 'pointer',
                  background: activeTab === tab ? '#fff' : 'transparent',
                  color: activeTab === tab ? '#f97316' : '#6b7280',
                  fontWeight: activeTab === tab ? 700 : 500,
                  fontSize: 14,
                  borderBottom: activeTab === tab ? '2px solid #f97316' : '2px solid transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'all 0.15s',
                }}
              >
                {tab === 'draw' ? <><Pencil size={15} /> Draw</> : tab === 'type' ? <><Type size={15} /> Type</> : <><Upload size={15} /> Upload</>}
              </button>
            ))}
          </div>

          <div style={{ padding: 24 }}>
            {/* DRAW TAB */}
            {activeTab === 'draw' && (
              <div>
                {/* Controls */}
                <div style={{
                  display: 'flex', gap: 16, marginBottom: 16,
                  padding: '12px 16px', background: '#f9fafb',
                  borderRadius: 10, alignItems: 'center', flexWrap: 'wrap'
                }}>
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
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Trash2 size={14} /> Clear</span>
                  </button>
                </div>

                {/* Canvas */}
                <div style={{
                  border: '1.5px solid #e5e7eb', borderRadius: 12,
                  background: '#fafafa', overflow: 'hidden',
                  cursor: 'crosshair',
                }}>
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
                  <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}><FolderOpen size={48} color="#9ca3af" /></div>
                  <p style={{ fontSize: 16, fontWeight: 600, color: '#374151' }}>Click to upload your signature</p>
                  <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 6 }}>PNG, JPG supported — white background will be removed automatically</p>
                  <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} />
                </div>
                {uploadedImage && (
                  <div style={{
                    marginTop: 16, padding: '16px 20px',
                    background: '#f0fdf4', border: '1px solid #bbf7d0',
                    borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12
                  }}>
                    <CheckCircle size={20} style={{ color: '#16a34a', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#15803d', textAlign: 'left' }}>Image uploaded successfully</p>
                      <p style={{ fontSize: 12, color: '#16a34a', marginTop: 2, textAlign: 'left' }}>Background will be removed automatically when you download</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Download Button */}
            <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={downloadSignature}
                style={{
                  width: '100%', padding: '14px 24px',
                  background: '#f97316', color: '#fff', border: 'none',
                  borderRadius: 10, fontWeight: 700, fontSize: 16,
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 8, marginTop: 24,
                  boxShadow: '0 4px 14px rgba(249,115,22,0.3)',
                  transition: 'background 0.15s',
                }}
              >
                <Download size={18} />
                Download Signature — Free PNG
              </button>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 24, flexWrap: 'wrap' }}>
          {[
            { icon: <Shield size={18} />, text: 'Stays on your device — never uploaded' },
            { icon: <BadgeCheck size={18} />, text: 'Always free, no hidden charges' },
            { icon: <Smartphone size={18} />, text: 'Works on mobile & desktop' },
          ].map(badge => (
            <div key={badge.text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6b7280', fontSize: 13 }}>
              <span style={{ color: '#f97316' }}>{badge.icon}</span>
              {badge.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
