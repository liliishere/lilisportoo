import { useCallback, useState } from 'react'
import { Button, Modal, SectionTitle, Tape } from '../components/Bits'
import { Heart, Sparkle } from '../components/Stickers'
import { projects } from '../data'
import { useTilt, useReveal } from '../hooks'

const FILTERS = [
  { id: 'all', label: 'everything' },
  { id: 'web', label: 'web' },
  { id: 'mobile', label: 'mobile' },
  { id: 'ai', label: 'AI' },
]
const ROTS = [-2.5, 2, -1.5, 3]
const TAPES = ['moss', 'pink', 'azure', 'citron']

function ProjectCard({ p, i, onOpen }) {
  const ref = useTilt(10)
  return (
    <button
      ref={ref}
      className={`project tilt reveal project--${p.color}`}
      style={{ '--rot': `${ROTS[i % 4]}deg` }}
      onClick={() => onOpen(p)}
      aria-label={`Open ${p.title}`}
    >
      <Tape color={TAPES[i % 4]} className="tape--top" />
      <span className="project-img">
        <img src={p.cover} alt="" loading="lazy" />
        <span className="glare" aria-hidden="true" />
        <span className="project-peek hand">click to open ✿</span>
      </span>
      <span className="project-meta">
        <span className="project-year hand">{p.year}</span>
        <span className="project-title">{p.title}</span>
        <span className="project-tag">{p.tagline}</span>
        <span className="pill">{p.role}</span>
      </span>
    </button>
  )
}

export default function Projects() {
  useReveal()
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])
  const list = projects.filter((p) => filter === 'all' || p.category === filter)

  return (
    <section className="wrap">
      <SectionTitle kicker="chapter three" script="things I've">
        made
      </SectionTitle>

      <div className="filters reveal" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button key={f.id} className={`filter ${filter === f.id ? 'is-on' : ''}`} onClick={() => setFilter(f.id)} aria-pressed={filter === f.id}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="project-grid" key={filter}>
        {list.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={projects.indexOf(p)} onOpen={setOpen} />
        ))}
      </div>

      <Modal open={!!open} onClose={close} label={open?.title}>
        {open && (
          <div className="case">
            <p className="kicker">
              {open.kind} · {open.year}
            </p>
            <h2>
              {open.title} <Sparkle size={28} fill="#E0A3BB" />
            </h2>
            <p className="hand case-tagline">{open.tagline}</p>
            <span className="pill">my role: {open.role}</span>

            <div className={`case-gallery ${open.images.length > 2 ? 'is-tall' : ''}`}>
              {open.images.map((src, k) => (
                <a key={src} href={src} target="_blank" rel="noreferrer" className="case-shot" style={{ '--rot': `${k % 2 ? 1.5 : -1.5}deg` }}>
                  <img src={src} alt={`${open.title} screen ${k + 1}`} />
                </a>
              ))}
            </div>

            <div className="case-cols">
              <div className="sticky-note sticky--blush">
                <h3>the problem</h3>
                <p>{open.problem}</p>
              </div>
              <div className="sticky-note sticky--azure">
                <h3>the solution</h3>
                <p>{open.solution}</p>
              </div>
            </div>

            <div className="case-cols">
              <div>
                <h3>what I did</h3>
                <ul className="hearts">
                  {open.contributions.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>design considerations</h3>
                <ul className="leaves">
                  {open.considerations.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="case-foot">
              {open.link ? (
                <Button href={open.link.href} target="_blank" rel="noreferrer">
                  {open.link.label} ↗
                </Button>
              ) : (
                <p className="hand">
                  <Heart size={20} /> live link coming soon!
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>

      <div className="center reveal" style={{ marginTop: '3rem' }}>
        <Button href="#/contact">like what you see? say hi ➝</Button>
      </div>
    </section>
  )
}
