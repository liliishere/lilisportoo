import { useState } from 'react'
import { SectionTitle, Sticker } from '../components/Bits'
import { Doodle, DoodleHeading } from '../components/Doodles'
import { Bow, Cherry, Flower, Heart, Icon, Sparkle } from '../components/Stickers'
import { contacts } from '../data'
import { burst, useReveal } from '../hooks'

const TWINKLES = [
  ['-9%', '8%', 28, '#E0A3BB'],
  ['108%', '14%', 22, '#C5CC82'],
  ['-6%', '86%', 20, '#C5CC82'],
  ['106%', '84%', 30, '#E0A3BB'],
  ['30%', '-42%', 18, '#EAADC1'],
  ['74%', '-36%', 24, '#B7BB88'],
]

function Stamp({ c, i }) {
  const [copied, setCopied] = useState(false)
  const copy = async (e) => {
    burst(e.clientX, e.clientY)
    try {
      await navigator.clipboard.writeText(c.handle)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      window.location.href = c.href
    }
  }
  return (
    <div className={`stamp reveal stamp--${c.color}`} style={{ '--rot': `${[-4, 3, -2, 4][i]}deg` }}>
      <a
        href={c.href}
        target={c.id === 'email' ? undefined : '_blank'}
        rel="noreferrer"
        className="stamp-inner"
        onClick={(e) => burst(e.clientX, e.clientY)}
      >
        <span className="stamp-value">{['10¢', '25¢', '50¢', '♡'][i]}</span>
        <span className="stamp-icon">
          <Icon name={c.id} size={34} />
        </span>
        <b>{c.label}</b>
        <span className="stamp-handle">{c.handle}</span>
        <small className="hand">{c.note}</small>
      </a>
      {c.id === 'email' && (
        <button className="copy" onClick={copy} aria-live="polite">
          {copied ? 'copied! ♡' : 'copy'}
        </button>
      )}
      <span className="postmark" aria-hidden="true">
        RJ · 2026
      </span>
    </div>
  )
}

export default function Contact() {
  const [open, setOpen] = useState(false)
  useReveal()
  return (
    <section className="wrap">
      <SectionTitle kicker="the last page" script="let's be" left="heart" right="burstR">
        pen pals
      </SectionTitle>

      <div className="envelope-zone">
        <div className={`env-stage reveal ${open ? 'is-open' : ''}`}>
          {/* the magic behind the envelope */}
          <span className="env-rays" aria-hidden="true" />
          <span className="env-glow" aria-hidden="true" />
          <span className="env-ring" aria-hidden="true" />
          {TWINKLES.map(([left, top, size, fill], i) => (
            <span key={i} className="twinkle" style={{ left, top, '--d': `${i * 0.45}s` }} aria-hidden="true">
              <Sparkle size={size} fill={fill} />
            </span>
          ))}
          <span className="floaties" aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <i
                key={i}
                style={{
                  '--x': `${8 + ((i * 41) % 84)}%`,
                  '--d': `${(i * 0.29).toFixed(2)}s`,
                  '--s': `${14 + ((i * 7) % 14)}px`,
                  '--drift': `${i % 2 ? '' : '-'}${10 + ((i * 13) % 30)}px`,
                }}
              >
                {['♡', '✿', '✦'][i % 3]}
              </i>
            ))}
          </span>

          <button
            className={`envelope ${open ? 'is-open' : ''}`}
            onClick={(e) => {
              setOpen((o) => !o)
              burst(e.clientX, e.clientY)
            }}
            aria-expanded={open}
            aria-label={open ? 'Close the letter' : 'Open the letter'}
          >
            <span className="env-back" />
            <span className="letter">
              <span className="hand letter-hi">Hi friend!</span>
              <span className="letter-body">
                Thank you for flipping through my little scrapbook. Whether it&apos;s a project, an internship or
                just a hello, my inbox is always open.
              </span>
              <span className="hand letter-sign">
                xoxo, Rebecca <Heart size={16} />
              </span>
            </span>
            <svg className="env-pocket" viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden="true">
              <path className="pocket-body" d="M0 8 L80 57 L160 8 V92 Q160 100 152 100 H8 Q0 100 0 92 Z" />
              <path className="pocket-fold" d="M7 95 L67 52 M153 95 L93 52" />
            </svg>
            <svg className="env-flap" viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden="true">
              <path className="flap-body" d="M0 8 Q0 0 8 0 H152 Q160 0 160 8 L85 58.5 Q80 62 75 58.5 Z" />
              <path className="flap-edge" d="M0.5 8.4 L75 58.5 M159.5 8.4 L85 58.5" />
            </svg>
            <span className="env-seal">
              <Flower size={44} petal="#fff" center="#E0A3BB" />
            </span>
          </button>
        </div>
        <p className="hand center env-hint">{open ? 'tap again to tuck it back in' : 'psst… tap the envelope ✉'}</p>
        <Sticker className="c1"><Bow size={70} /></Sticker>
        <Sticker className="c2"><Cherry size={60} /></Sticker>
      </div>

      <DoodleHeading script="find me" left="sparkles" right="arrowDown" className="reveal">
        here
      </DoodleHeading>
      <div className="stamps stamps-doodled">
        <Doodle name="wave" color="pink" delay={0.4} className="dd-stamps-wave" />
        <Doodle name="heart" color="green" delay={0.7} className="dd-stamps-heart" wiggle />
        {contacts.map((c, i) => (
          <Stamp key={c.id} c={c} i={i} />
        ))}
      </div>
    </section>
  )
}
