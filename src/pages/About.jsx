import { useState } from 'react'
import photo from '../assets/rebecca.jpg'
import { useReveal } from '../hooks'
import { Button, Polaroid, SectionTitle, Sticker, Tape } from '../components/Bits'
import { DoodleHeading } from '../components/Doodles'
import { Arrow, Bow, Daisy, Flower, Leaf, Sparkle } from '../components/Stickers'
import { profile, projects } from '../data'

const FACTS = [
  { front: 'studying', back: `${profile.study} at ${profile.school}, ${profile.semester.toLowerCase()}`, color: 'pink', rot: -3 },
  { front: 'into', back: 'UI/UX design, front-end development & digital product innovation', color: 'azure', rot: 2 },
  { front: 'designed for', back: 'healthcare · education · travel · AI-powered apps', color: 'citron', rot: -1.5 },
  { front: 'how I work', back: 'user-centered, accessibility-minded & happiest in a multidisciplinary team', color: 'blush', rot: 2.5 },
]

function FlipNote({ front, back, color, rot }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button
      className={`flip reveal ${flipped ? 'is-flipped' : ''}`}
      style={{ '--rot': `${rot}deg` }}
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${front}: ${back}`}
    >
      <span className="flip-inner">
        <span className={`flip-face flip-face--front sticky-note sticky--${color}`}>
          <Tape color={color === 'pink' ? 'moss' : 'pink'} className="tape--top" />
          <span className="hand flip-front">{front}…</span>
          <small>hover or tap to peek</small>
        </span>
        <span className={`flip-face flip-back sticky-note sticky--${color}`}>
          <span>{back}</span>
        </span>
      </span>
    </button>
  )
}

export default function About() {
  useReveal()
  const timeline = [...projects].sort((a, b) => a.year - b.year)
  return (
    <section className="wrap">
      <SectionTitle kicker="chapter one" script="a little" left="heart" right="sparkles">
        about me
      </SectionTitle>

      <div className="about-spread">
        <div className="about-photo">
          <Polaroid src={photo} alt="Rebecca Jielian" caption="Rebecca ✿ 2026" rot={-4} tape="pink" />
          <div className="about-arrow hand" aria-hidden="true">
            <Arrow width={70} flip /> that&apos;s me!
          </div>
          <Sticker className="a1"><Bow size={70} /></Sticker>
          <Sticker className="a2"><Daisy size={56} /></Sticker>
        </div>

        <article className="notebook reveal">
          <Tape color="citron" className="tape--corner" />
          <p className="hand notebook-hi">Dear reader,</p>
          <p>{profile.about}</p>
          <p>{profile.about2}</p>
          <p>
            I love the moment a messy idea turns into something people can actually <em>use</em>. Sketching the flow,
            polishing the pixels in Figma, then building it for real with HTML, CSS, JavaScript & React.js.
          </p>
          <p className="hand notebook-sign">
            xoxo, Rebecca <Flower size={26} />
          </p>
        </article>
      </div>

      <DoodleHeading script="some" left="burst" right="spiral" className="reveal">
        fun facts
      </DoodleHeading>
      <div className="flip-grid">
        {FACTS.map((f) => (
          <FlipNote key={f.front} {...f} />
        ))}
      </div>

      <DoodleHeading script="my little" left="star" right="loop" className="reveal">
        journey
      </DoodleHeading>
      <ol className="journey">
        {timeline.map((p, i) => (
          <li key={p.id} className={`reveal journey-item ${i % 2 ? 'right' : 'left'}`}>
            <span className={`journey-dot dot--${p.color}`}>{i % 2 ? <Leaf size={22} /> : <Sparkle size={20} fill="#E0A3BB" />}</span>
            <a href="#/projects" className={`journey-card sticky--${p.color}`}>
              <span className="journey-year hand">{p.year}</span>
              <b>{p.title}</b>
              <small>
                {p.role} · {p.kind.toLowerCase()}
              </small>
            </a>
          </li>
        ))}
        <li className="reveal journey-item left">
          <span className="journey-dot dot--pink"><Flower size={22} /></span>
          <div className="journey-card sticky--pink">
            <span className="journey-year hand">now</span>
            <b>Learning React.js</b>
            <small>…and building this very website with it!</small>
          </div>
        </li>
      </ol>

      <div className="center reveal" style={{ marginTop: '3rem' }}>
        <Button href="#/skills">next: my skills ➝</Button>
      </div>
    </section>
  )
}
