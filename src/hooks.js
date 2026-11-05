import { useEffect, useRef } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const canHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

/* 3D tilt that follows the mouse. Sets --rx / --ry / --mx / --my on the element. */
export function useTilt(max = 10) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !canHover()) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--ry', `${x * max}deg`)
      el.style.setProperty('--rx', `${-y * max}deg`)
      el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
      el.style.setProperty('--my', `${(y + 0.5) * 100}%`)
    }
    const leave = () => {
      el.style.setProperty('--ry', '0deg')
      el.style.setProperty('--rx', '0deg')
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [max])
  return ref
}

/* Buttons / links that lean toward the cursor. */
export function useMagnet(strength = 0.3) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !canHover()) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      el.style.translate = `${x * strength}px ${y * strength}px`
    }
    const leave = () => (el.style.translate = '0 0')
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [strength])
  return ref
}

/* Reveal elements as they scroll into view.
   Marks them with a data-in attribute (not a class) so React re-renders,
   which rewrite className, can never un-reveal something. */
/* Measure every doodle line so its pen animation covers exactly its real length.
   (+1 so the very end of closed shapes like stars always meets up.) */
export function measureDoodles() {
  document.querySelectorAll('svg.doodle-svg path, svg.doodle path, svg.hl-line path').forEach((p) => {
    if (p.style.getPropertyValue('--len')) return
    try {
      p.style.setProperty('--len', (p.getTotalLength() + 1).toFixed(2))
    } catch {
      /* not rendered yet: keeps the safe default and gets measured next time */
    }
  })
}

export function useReveal() {
  useEffect(() => {
    measureDoodles()
    const els = document.querySelectorAll('.reveal:not([data-in])')
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach((e) => e.setAttribute('data-in', ''))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.setAttribute('data-in', '')
            io.unobserve(en.target)
          }
        }),
      { threshold: 0.12 },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  })
}

/* Fire a little heart/sparkle burst at a screen point. */
export function burst(x, y) {
  window.dispatchEvent(new CustomEvent('rj-burst', { detail: { x, y } }))
}
