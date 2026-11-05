import { useEffect, useRef, useState } from 'react'
import { useMagnet, useTilt, burst, prefersReducedMotion } from '../hooks'
import { DoodleHeading } from './Doodles'

/* Draggable sticker: pick it up and move it anywhere around the page. */
export function Sticker({ children, className = '', style }) {
  const ref = useRef(null)
  const s = useRef({ x: 0, y: 0, ox: 0, oy: 0, down: false })
  const [grab, setGrab] = useState(false)

  const onDown = (e) => {
    const st = s.current
    st.down = true
    st.ox = e.clientX - st.x
    st.oy = e.clientY - st.y
    ref.current.setPointerCapture(e.pointerId)
    setGrab(true)
  }
  const onMove = (e) => {
    const st = s.current
    if (!st.down) return
    st.x = e.clientX - st.ox
    st.y = e.clientY - st.oy
    ref.current.style.translate = `${st.x}px ${st.y}px`
  }
  const onUp = () => {
    s.current.down = false
    setGrab(false)
  }

  return (
    <div
      ref={ref}
      className={`sticker ${grab ? 'is-grabbed' : ''} ${className}`}
      style={style}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      title="psst, you can drag me!"
      aria-hidden="true"
    >
      <div className="sticker-inner">{children}</div>
    </div>
  )
}

export function Tape({ color = 'pink', className = '', style }) {
  return <span className={`tape tape--${color} ${className}`} style={style} aria-hidden="true" />
}

export function Polaroid({ src, alt, caption, rot = -3, tape = 'pink', className = '', children }) {
  const ref = useTilt(12)
  return (
    <figure ref={ref} className={`polaroid tilt ${className}`} style={{ '--rot': `${rot}deg` }}>
      <Tape color={tape} className="tape--top" />
      <div className="polaroid-img">
        <img src={src} alt={alt} loading="lazy" />
        <span className="glare" aria-hidden="true" />
      </div>
      {caption && <figcaption className="hand">{caption}</figcaption>}
      {children}
    </figure>
  )
}

export function Button({ href, children, variant = 'solid', onClick, ...rest }) {
  const ref = useMagnet(0.25)
  const handle = (e) => {
    burst(e.clientX, e.clientY)
    onClick?.(e)
  }
  return (
    <a ref={ref} href={href} className={`btn btn--${variant}`} onClick={handle} {...rest}>
      <span>{children}</span>
    </a>
  )
}

export function Marquee({ items, tone = 'moss' }) {
  const row = [...items, ...items]
  return (
    <div className={`marquee marquee--${tone}`} aria-label={items.join(', ')}>
      <div className="marquee-track" aria-hidden="true">
        {row.map((t, i) => (
          <span key={i}>
            {t} <i>✿</i>
          </span>
        ))}
      </div>
    </div>
  )
}

export function SectionTitle({ kicker, children, script, left = 'burst', right = 'sparkles' }) {
  return (
    <header className="section-title reveal">
      {kicker && <p className="kicker">{kicker}</p>}
      <DoodleHeading as="h1" script={script} left={left} right={right}>
        {children}
      </DoodleHeading>
    </header>
  )
}

/* Pastel sparkle trail behind the cursor + click bursts. Pure DOM for speed. */
const TRAIL = ['#E0A3BB', '#C5CC82', '#D6E6E7', '#F4DFE6', '#97A13B']
const SHAPES = ['✦', '✿', '♡', '·', '✧']

export function SparkleLayer() {
  const layer = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const root = layer.current
    const fine = window.matchMedia('(pointer: fine)').matches
    let last = 0
    const spawn = (x, y, cls, extra = {}) => {
      const s = document.createElement('span')
      s.className = cls
      s.textContent = SHAPES[(Math.random() * SHAPES.length) | 0]
      s.style.left = `${x}px`
      s.style.top = `${y}px`
      s.style.color = TRAIL[(Math.random() * TRAIL.length) | 0]
      Object.entries(extra).forEach(([k, v]) => s.style.setProperty(k, v))
      root.appendChild(s)
      s.addEventListener('animationend', () => s.remove())
    }
    const move = (e) => {
      const now = performance.now()
      if (now - last < 45) return
      last = now
      spawn(e.clientX, e.clientY, 'trail', {
        '--dx': `${(Math.random() - 0.5) * 30}px`,
        '--sz': `${10 + Math.random() * 10}px`,
      })
    }
    const pop = (e) => {
      const { x, y } = e.detail
      for (let i = 0; i < 10; i++) {
        const a = (Math.PI * 2 * i) / 10 + Math.random() * 0.4
        const d = 40 + Math.random() * 40
        spawn(x, y, 'pop', {
          '--dx': `${Math.cos(a) * d}px`,
          '--dy': `${Math.sin(a) * d}px`,
          '--sz': `${14 + Math.random() * 10}px`,
        })
      }
    }
    if (fine) window.addEventListener('pointermove', move)
    window.addEventListener('rj-burst', pop)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('rj-burst', pop)
    }
  }, [])
  return <div ref={layer} className="sparkle-layer" aria-hidden="true" />
}

/* Paper-sheet modal */
export function Modal({ open, onClose, children, label }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const key = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', key)
    document.body.style.overflow = 'hidden'
    ref.current?.focus()
    return () => {
      document.removeEventListener('keydown', key)
      document.body.style.overflow = ''
    }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        ref={ref}
        className="modal paper"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
