import { Heart } from './Stickers'

/* Paper bits tucked around the edges of the page, like a real scrapbook spread.
   Positions are % of the page height, so they spread out on long and short pages alike. */
const SCRAPS = [
  { kind: 'lined', side: 'left', top: '7%', w: 150, h: 180, r: -12, tape: 'pink' },
  { kind: 'grid', side: 'right', top: '12%', w: 140, h: 140, r: 9, tape: 'moss' },
  { kind: 'doily', side: 'left', top: '27%', w: 150, h: 150, r: 0 },
  { kind: 'dots', side: 'right', top: '33%', w: 130, h: 165, r: -7, tape: 'azure' },
  { kind: 'ticket', side: 'left', top: '48%', w: 170, h: 74, r: 14, out: 12 },
  { kind: 'stripe', side: 'right', top: '55%', w: 135, h: 120, r: 6, tape: 'pink' },
  { kind: 'note', side: 'left', top: '68%', w: 130, h: 130, r: -5, tape: 'moss', out: 22 },
  { kind: 'lined', side: 'right', top: '77%', w: 150, h: 170, r: -10, tape: 'citron' },
  { kind: 'grid', side: 'left', top: '88%', w: 125, h: 125, r: 11 },
]

export default function Scraps() {
  return (
    <div className="scraps" aria-hidden="true">
      {SCRAPS.map((s, i) => (
        <div
          key={i}
          className={`scrap scrap--${s.kind} scrap--${s.side}`}
          style={{ top: s.top, width: s.w, height: s.h, '--r': `${s.r}deg`, '--d': `${-i * 1.7}s`, ...(s.out != null && { '--out': `${s.out}px` }) }}
        >
          {s.tape && <span className={`tape tape--${s.tape} scrap-tape`} />}
          {s.kind === 'ticket' && (
            <span className="scrap-ticket-text">
              admit one <i>✿</i>
            </span>
          )}
          {s.kind === 'note' && (
            <span className="scrap-note-text">
              xoxo
              <Heart size={22} />
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
