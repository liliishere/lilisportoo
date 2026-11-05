/* Little hand-drawn-ish SVG stickers, all in the palette. */
const W = { stroke: '#fff', strokeWidth: 3, strokeLinejoin: 'round' }

export function Flower({ size = 64, petal = '#E0A3BB', center = '#C5CC82' }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="50" cy="27" rx="17" ry="24" fill={petal} {...W} transform={`rotate(${a} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="13" fill={center} {...W} />
    </svg>
  )
}

export function Daisy({ size = 64 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => i * 30).map((a) => (
        <ellipse key={a} cx="50" cy="24" rx="8" ry="20" fill="#fff" stroke="#E0A3BB" strokeWidth="2" transform={`rotate(${a} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="12" fill="#C5CC82" stroke="#97A13B" strokeWidth="2" />
    </svg>
  )
}

export function Heart({ size = 48, fill = '#E0A3BB' }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <path d="M50 88C20 66 8 48 8 31 8 18 18 8 31 8c9 0 15 5 19 13 4-8 10-13 19-13 13 0 23 10 23 23 0 17-12 35-42 57z" fill={fill} {...W} />
      <path d="M26 24c-5 2-8 7-7 13" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" opacity=".7" />
    </svg>
  )
}

export function Sparkle({ size = 40, fill = '#C5CC82' }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <path d="M50 4c4 31 15 42 46 46-31 4-42 15-46 46-4-31-15-42-46-46 31-4 42-15 46-46z" fill={fill} {...W} />
    </svg>
  )
}

export function Bow({ size = 70, fill = '#E0A3BB' }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <path d="M46 54 32 90l9-4 6 8 5-38z" fill={fill} {...W} />
      <path d="M54 54l14 36-9-4-6 8-5-38z" fill={fill} {...W} />
      <path d="M50 48C34 26 8 24 10 42c2 16 24 16 40 6z" fill={fill} {...W} />
      <path d="M50 48c16-22 42-24 40-6-2 16-24 16-40 6z" fill={fill} {...W} />
      <ellipse cx="50" cy="48" rx="8" ry="9" fill="#F4DFE6" {...W} />
    </svg>
  )
}

export function Cherry({ size = 60 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <path d="M36 66C40 40 52 22 66 12M66 12c-2 20 2 38 10 52" stroke="#97A13B" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M66 12c10-6 22-4 26 4-10 6-20 4-26-4z" fill="#C5CC82" {...W} />
      <circle cx="34" cy="74" r="16" fill="#E0A3BB" {...W} />
      <circle cx="74" cy="72" r="16" fill="#E0A3BB" {...W} />
      <circle cx="28" cy="68" r="4" fill="#fff" opacity=".8" />
      <circle cx="68" cy="66" r="4" fill="#fff" opacity=".8" />
    </svg>
  )
}

export function Butterfly({ size = 70 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <g className="wing-l">
        <path d="M48 46C36 18 8 16 10 36c2 14 20 18 38 10z" fill="#D6E6E7" {...W} />
        <path d="M48 52C30 54 18 72 30 80c10 6 18-10 18-28z" fill="#F4DFE6" {...W} />
      </g>
      <g className="wing-r">
        <path d="M52 46c12-28 40-30 38-10-2 14-20 18-38 10z" fill="#D6E6E7" {...W} />
        <path d="M52 52c18 2 30 20 18 28-10 6-18-10-18-28z" fill="#F4DFE6" {...W} />
      </g>
      <rect x="47" y="34" width="6" height="34" rx="3" fill="#97A13B" />
      <path d="M48 36c-4-8-8-10-12-12M52 36c4-8 8-10 12-12" stroke="#97A13B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function Leaf({ size = 56 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <path d="M14 86C10 46 40 14 88 12c2 46-30 78-74 74z" fill="#C5CC82" {...W} />
      <path d="M18 82C40 60 58 42 80 20" stroke="#97A13B" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function Squiggle({ width = 120, color = '#E0A3BB' }) {
  return (
    <svg viewBox="0 0 120 20" width={width} height={width / 6} aria-hidden="true">
      <path d="M2 10c10-10 20 10 30 0s20 10 30 0 20 10 30 0 20 10 26 0" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function Arrow({ width = 90, color = '#97A13B', flip = false }) {
  return (
    <svg viewBox="0 0 100 60" width={width} height={width * 0.6} aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M6 8c20 40 50 46 80 38" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="1 7" />
      <path d="M74 36l14 10-16 6" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* simple generic contact icons */
export function Icon({ name, size = 30 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  if (name === 'email')
    return (<svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>)
  if (name === 'linkedin')
    return (<svg {...p}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></svg>)
  if (name === 'github')
    return (<svg {...p}><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" /></svg>)
  if (name === 'instagram')
    return (<svg {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5v.01" /></svg>)
  return null
}
