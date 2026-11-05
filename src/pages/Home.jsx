import photo from '../assets/rebecca.jpg'
import { Button, Marquee, Polaroid, Sticker, Tape } from '../components/Bits'
import { Arrow, Bow, Butterfly, Cherry, Daisy, Flower, Heart, Leaf, Sparkle, Squiggle } from '../components/Stickers'
import { useTilt, burst, useReveal } from '../hooks'
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

  return (
    <>
      <section className="hero dots">
        <div className="hero-copy">
          <p className="kicker reveal">portfolio · 2026</p>
          <h1 className="hero-title reveal">
            <span className="script hero-hello" onClick={wave}>
              hello there,
            </span>
            I&apos;m <span className="hl">Rebecca</span>
            <br />
            <em>Jielian</em>
            <Sparkle size={34} fill="#E0A3BB" />
          </h1>
          <p className="hand hero-role reveal">
            {profile.role} ✿ in the making
          </p>
          <Squiggle />
          <p className="lede reveal">
            {profile.study} student at {profile.school}, designing friendly, accessible interfaces for healthcare,
            education, travel & AI — and then bringing them to life with code.
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
        <h2 className="center reveal">
          <span className="script">pick a</span> page
        </h2>
        <div className="peek-grid">
          <PeekCard href="#/about" color="pink" rot={-3} title="About me" text="who I am, what I love & where I'm headed" sticker={<Flower size={52} />} />
          <PeekCard href="#/skills" color="azure" rot={2} title="Skills" text="design, code & people things — React.js included" sticker={<Sparkle size={46} fill="#97A13B" />} />
          <PeekCard href="#/projects" color="citron" rot={-1.5} title="Projects" text="four little worlds I helped design & build" sticker={<Leaf size={50} />} />
          <PeekCard href="#/contact" color="blush" rot={3} title="Say hi" text="email, LinkedIn, GitHub & Instagram" sticker={<Heart size={46} />} />
        </div>
      </section>
    </>
  )
}
