import photo from '../assets/rebecca.jpg'
import { Button, Marquee, Polaroid, Sticker, Tape } from '../components/Bits'
import { DoodleHeading } from '../components/Doodles'
import { Arrow, Bow, Butterfly, Cherry, Daisy, Flower, Heart, Leaf, Sparkle, Squiggle } from '../components/Stickers'
import { useTilt, burst, useReveal, prefersReducedMotion } from '../hooks'
import { profile, projects } from '../data'

function PeekCard({ href, color, title, text, sticker, rot }) {
  const ref = useTilt(10)
  return (
    <a ref={ref} href={href} className={`peek tilt reveal peek--${color}`} style={{ '--rot': `${rot}deg` }}>
      <Tape color={color === 'pink' ? 'moss' : 'pink'} className="tape--top" />
      <span className="peek-sticker">{sticker}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="peek-go hand">open ➝</span>
    </a>
  )
}

export default function Home() {
  useReveal()
  const wave = (e) => burst(e.clientX, e.clientY)

  // hovering the name redraws the underline (once per hover, never on mouse-out)
  const redraw = (e) => {
    if (prefersReducedMotion()) return
    const paths = e.currentTarget.querySelectorAll('.hl-line path')
    paths.forEach((path, i) => {
      if (path.getAnimations().some((a) => a.id === 'redraw' && a.playState === 'running')) return
      const len = parseFloat(path.style.getPropertyValue('--len')) || path.getTotalLength()
      const anim = path.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
        duration: 850,
        delay: i * 300,
        easing: 'cubic-bezier(0.6, 0, 0.3, 1)',
        fill: 'backwards',
      })
      anim.id = 'redraw'
    })
  }

  return (
    <>
      <section className="hero dots">
        <div className="hero-copy">
          <p className="kicker reveal">portfolio · 2026</p>
          <h1 className="hero-title reveal" onMouseEnter={redraw}>
            <span className="script hero-hello" onClick={wave}>
              <svg className="doodle doodle--green d-burst" viewBox="0 0 40 40" aria-hidden="true">
                <path d="M30 8 L22 2" />
                <path d="M24 16 L8 12" />
                <path d="M28 25 L16 32" />
              </svg>
              hello there,
              <svg className="doodle d-heart doodle-wiggle" viewBox="0 0 40 40" aria-hidden="true">
                <path d="M20 34 C6 24 3 15 8 9 C13 4 19 7 20 13 C21 7 28 4 32 9 C37 15 33 24 20 34 Z" />
              </svg>
            </span>
            I&apos;m{' '}
            <span className="hl">
              Rebecca
              <svg className="hl-line" viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true">
                <path className="line-main" d="M4 20 C50 10 110 26 160 18 S250 8 296 16" />
                <path className="line-echo" d="M30 33 C90 26 170 38 236 30 C252 28 262 27 270 29" />
              </svg>
              <svg className="doodle d-star doodle-wiggle" viewBox="0 0 40 40" aria-hidden="true">
                <path d="M20 4 L24 15 L36 16 L26 23 L30 35 L20 28 L10 35 L14 23 L4 16 L16 15 Z" />
              </svg>
            </span>
            <br />
            <span className="hl-wrap">
              <em>Jielian</em>
              <svg className="doodle doodle--green d-loop" viewBox="0 0 80 40" aria-hidden="true">
                <path d="M2 30 C14 30 22 26 26 18 C30 8 20 4 17 12 C14 22 30 30 44 26 C54 23 58 16 64 16 C70 16 70 24 78 22" />
              </svg>
            </span>
          </h1>
          <p className="hand hero-role reveal">
            {profile.role} ✿ in the making
          </p>
          <Squiggle />
          <p className="lede reveal">
            {profile.study} student at {profile.school}, designing friendly, accessible interfaces for healthcare,
            education, travel & AI, and then bringing them to life with code.
          </p>
          <div className="btn-row reveal">
            <Button href="#/projects">see my work</Button>
            <Button href="#/about" variant="ghost">
              a little about me
            </Button>
          </div>
        </div>

        <div className="hero-collage">
          <Polaroid src={photo} alt="Portrait of Rebecca Jielian" caption="hi, that's me! ♡" rot={4} tape="moss" className="hero-photo" />
          <div className="sticky-note sticky--azure hero-note reveal">
            <Tape color="pink" className="tape--top" />
            <p className="hand">currently:</p>
            <p>
              Computer Science, {profile.semester.toLowerCase()}
              <br />
              @ BINUS Alam Sutera
            </p>
          </div>
          <div className="ticket hero-ticket reveal">
            <span className="ticket-stub">No. {String(projects.length).padStart(3, '0')}</span>
            <span>
              <b>{projects.length} projects</b>
              <small>web · mobile · AI</small>
            </span>
          </div>
          <div className="hero-arrow" aria-hidden="true">
            <span className="hand">drag the stickers!</span>
            <Arrow width={80} color="#B8638A" />
          </div>
          <Sticker className="s1"><Flower size={78} /></Sticker>
          <Sticker className="s2"><Bow size={84} /></Sticker>
          <Sticker className="s3"><Cherry size={64} /></Sticker>
          <Sticker className="s4"><Daisy size={66} /></Sticker>
          <Sticker className="s5"><Butterfly size={74} /></Sticker>
          <Sticker className="s6"><Heart size={44} fill="#97A13B" /></Sticker>
        </div>
      </section>

      <Marquee items={['UI design', 'UX design', 'React.js', 'Figma', 'front-end dev', 'prototyping', 'user flows', 'design systems']} />

      <section className="peeks">
        <p className="kicker center reveal">flip through the scrapbook</p>
        <DoodleHeading script="pick a" left="burst" right="flower" className="reveal">
          page
        </DoodleHeading>
        <div className="peek-grid">
          <PeekCard href="#/about" color="pink" rot={-3} title="About me" text="who I am, what I love & where I'm headed" sticker={<Flower size={52} />} />
          <PeekCard href="#/skills" color="azure" rot={2} title="Skills" text="design, code & people things, React.js included" sticker={<Sparkle size={46} fill="#97A13B" />} />
          <PeekCard href="#/projects" color="citron" rot={-1.5} title="Projects" text="four little worlds I helped design & build" sticker={<Leaf size={50} />} />
          <PeekCard href="#/contact" color="blush" rot={3} title="Say hi" text="email, LinkedIn, GitHub & Instagram" sticker={<Heart size={46} />} />
        </div>
      </section>
    </>
  )
}
