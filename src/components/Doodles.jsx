/* Hand-drawn doodles that "write themselves" in when they scroll into view.
   Every path uses so the pen animation works for any shape. */

const SHAPES = {
  underline: { vb: '0 0 200 24', d: ['M4 15 C40 6 80 21 120 12 S178 7 196 13'] },
  underline2: { vb: '0 0 200 30', d: ['M4 12 C50 4 120 18 196 9', 'M24 24 C80 17 140 27 180 21'] },
  circle: { vb: '0 0 120 50', d: ['M14 30 C6 16 40 4 70 6 C104 8 120 20 110 34 C98 48 40 48 18 38 C8 33 10 22 26 14'] },
  star: { vb: '0 0 40 40', d: ['M20 4 L24 15 L36 16 L26 23 L30 35 L20 28 L10 35 L14 23 L4 16 L16 15 Z'] },
  heart: { vb: '0 0 40 40', d: ['M20 34 C6 24 3 15 8 9 C13 4 19 7 20 13 C21 7 28 4 32 9 C37 15 33 24 20 34 Z'] },
  burst: { vb: '0 0 40 40', d: ['M30 8 L22 2', 'M26 18 L8 14', 'M30 28 L16 36'] },
  burstR: { vb: '0 0 40 40', d: ['M10 8 L18 2', 'M14 18 L32 14', 'M10 28 L24 36'] },
  sparkles: { vb: '0 0 44 44', d: ['M14 4 L14 20 M6 12 L22 12', 'M33 20 L33 32 M27 26 L39 26', 'M10 32 L10 40 M6 36 L14 36'] },
  spiral: { vb: '0 0 40 40', d: ['M21 20 C23 18 26 21 24 24 C21 28 15 26 15 21 C15 14 24 12 28 16 C34 22 30 32 21 33 C11 34 5 25 8 16'] },
  loop: { vb: '0 0 80 40', d: ['M2 30 C14 30 22 26 26 18 C30 8 20 4 17 12 C14 22 30 30 44 26 C54 23 58 16 64 16 C70 16 70 24 78 22'] },
  arrowDown: { vb: '0 0 60 80', d: ['M12 6 C40 14 46 40 30 70', 'M17 57 L30 72 L43 57'] },
  arrowRight: { vb: '0 0 100 60', d: ['M6 12 C30 50 60 52 88 34', 'M76 28 L89 34 L80 46'] },
  arrowLeft: { vb: '0 0 100 60', d: ['M94 12 C70 50 40 52 12 34', 'M24 28 L11 34 L20 46'] },
  flower: { vb: '0 0 40 40', d: ['M18.0 16.5 C10.8 8.2 30.5 6.6 22.0 16.5 M22.7 17.0 C28.4 7.6 36.0 25.8 23.9 20.8 M23.7 21.6 C34.4 24.1 19.4 37.0 20.4 24.0 M19.6 24.0 C20.5 35.0 3.7 24.7 16.3 21.6 M16.1 20.8 C5.9 25.1 10.5 5.9 17.3 17.0', 'M23 20 A3 3 0 1 1 17 20 A3 3 0 1 1 23 20'] },
  dots: { vb: '0 0 60 12', d: ['M6 6 L6.5 6', 'M30 6 L30.5 6', 'M54 6 L54.5 6'] },
  wave: { vb: '0 0 120 20', d: ['M2 10 C12 0 22 20 32 10 S52 0 62 10 S82 20 92 10 S112 0 118 10'] },
}

export function Doodle({ name, color = 'pink', delay = 0.3, className = '', style, wiggle = false, strokeWidth }) {
  const s = SHAPES[name]
  if (!s) return null
  return (
    <svg
      className={`doodle-svg doodle-svg--${color} reveal ${wiggle ? 'doodle-wiggle' : ''} ${className}`}
      viewBox={s.vb}
      preserveAspectRatio={name.startsWith('underline') || name === 'circle' ? 'none' : undefined}
      style={{ ...style, ...(strokeWidth && { '--sw': strokeWidth }) }}
      aria-hidden="true"
    >
      {s.d.map((d, i) => (
        <path key={i} d={d} style={{ '--delay': `${delay + i * 0.18}s` }} />
      ))}
    </svg>
  )
}

/* A script word with a hand-drawn underline beneath it */
export function ScriptWord({ children, line = 'underline', color = 'pink', delay = 0.4 }) {
  return (
    <span className="script script-doodled">
      {children}
      <Doodle name={line} color={color} delay={delay} className="dd-under" />
    </span>
  )
}

/* Heading with an underlined script word and a doodle on each side */
export function DoodleHeading({ script, children, left, right, leftColor = 'green', rightColor = 'pink', as: Tag = 'h2', className = '' }) {
  return (
    <Tag className={`center doodle-heading ${className}`}>
      <span className="title-inner">
        {left && <Doodle name={left} color={leftColor} delay={0.2} className={`dd-left dd-${left}`} wiggle />}
        <ScriptWord>{script}</ScriptWord> {children}
        {right && <Doodle name={right} color={rightColor} delay={1.1} className={`dd-right dd-${right}`} wiggle />}
      </span>
    </Tag>
  )
}
