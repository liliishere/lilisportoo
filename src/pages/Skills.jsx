import { useState } from 'react'
import { Button, SectionTitle, Tape } from '../components/Bits'
import { Flower, Leaf, Sparkle } from '../components/Stickers'
import { projects, siteCard, skillGroups } from '../data'
import { useTilt, burst, useReveal } from '../hooks'

const SHELF = [...projects, siteCard]
const nameOf = (id) => SHELF.find((p) => p.id === id)?.title

function SkillCard({ group, selected, onPick, rot }) {
  const ref = useTilt(6)
  const icon = { design: <Flower size={46} />, tech: <Sparkle size={42} fill="#97A13B" />, soft: <Leaf size={44} /> }[group.id]
  return (
    <article ref={ref} className={`skill-card tilt reveal skill-card--${group.color}`} style={{ '--rot': `${rot}deg` }}>
      <span className="clip" aria-hidden="true" />
      <div className="skill-card-head">
        <span className="skill-icon">{icon}</span>
        <div>
          <h2>{group.title}</h2>
          <p className="hand">{group.note}</p>
        </div>
      </div>
      <ul className="chips">
        {group.items.map((s, i) => {
          const tip = s.used.length ? `spotted in: ${s.used.map(nameOf).join(', ')}` : 'from coursework & everyday teamwork'
          return (
            <li key={s.name} style={{ '--i': i }}>
              <button
                className={`chip ${selected === s.name ? 'is-picked' : ''}`}
                onClick={(e) => {
                  burst(e.clientX, e.clientY)
                  onPick(selected === s.name ? null : s.name)
                }}
                aria-pressed={selected === s.name}
                data-tip={tip}
              >
                {s.name}
                {s.isNew && <span className="chip-new">new!</span>}
              </button>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

export default function Skills() {
  useReveal()
  const [picked, setPicked] = useState(null)
  const skill = skillGroups.flatMap((g) => g.items).find((s) => s.name === picked)

  return (
    <section className="wrap">
      <SectionTitle kicker="chapter two" script="things I">
        can do
      </SectionTitle>
      <p className="lede center reveal">
        Tap a skill sticker to see where it shows up in my work <span className="hand">(hover for a hint!)</span>
      </p>

      <div className="skill-grid">
        {skillGroups.map((g, i) => (
          <SkillCard key={g.id} group={g} selected={picked} onPick={setPicked} rot={[-2, 1.5, -1][i]} />
        ))}
      </div>

      <div className="shelf reveal">
        <Tape color="moss" className="tape--top" />
        <p className="shelf-label hand">
          {skill
            ? skill.used.length
              ? `${skill.name} lives in…`
              : `${skill.name} — practised through coursework & teamwork ✿`
            : 'pick a skill above ↑'}
        </p>
        <div className="shelf-row">
          {SHELF.map((p) => {
            const on = skill ? skill.used.includes(p.id) : true
            return (
              <a
                key={p.id}
                href="#/projects"
                className={`shelf-item sticky--${p.color} ${on ? 'is-on' : 'is-off'} ${skill && on ? 'is-glow' : ''}`}
              >
                <b>{p.title}</b>
                <small>{p.year}</small>
              </a>
            )
          })}
        </div>
      </div>

      <div className="center reveal" style={{ marginTop: '3rem' }}>
        <Button href="#/projects">next: my projects ➝</Button>
      </div>
    </section>
  )
}
