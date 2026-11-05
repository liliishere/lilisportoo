import { useState } from 'react'
import { SectionTitle, Sticker } from '../components/Bits'
import { Bow, Cherry, Flower, Heart, Icon } from '../components/Stickers'
import { contacts } from '../data'
import { burst, useReveal } from '../hooks'

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
      <SectionTitle kicker="the last page" script="let's be">
        pen pals
      </SectionTitle>

      <div className="envelope-zone">
        <button
          className={`envelope reveal ${open ? 'is-open' : ''}`}
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
            <span>
              Thank you for flipping through my little scrapbook. Whether it&apos;s a project, an internship, a
              collaboration or just a hello — my inbox is always open.
            </span>
            <span className="hand letter-sign">
              — Rebecca <Heart size={18} />
            </span>
          </span>
          <span className="env-front" />
          <span className="env-flap" />
          <span className="env-seal">
            <Flower size={44} petal="#fff" center="#E0A3BB" />
          </span>
        </button>
        <p className="hand center env-hint">{open ? 'tap again to tuck it back in' : 'psst… tap the envelope ✉'}</p>
        <Sticker className="c1"><Bow size={70} /></Sticker>
        <Sticker className="c2"><Cherry size={60} /></Sticker>
      </div>

      <h2 className="center reveal">
        <span className="script">find me</span> here
      </h2>
      <div className="stamps">
        {contacts.map((c, i) => (
          <Stamp key={c.id} c={c} i={i} />
        ))}
      </div>
    </section>
  )
}
