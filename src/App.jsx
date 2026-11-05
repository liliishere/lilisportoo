import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import './App.css'
import { SparkleLayer } from './components/Bits'
import Scraps from './components/Scraps'
import { Flower, Heart, Moon, Sun } from './components/Stickers'
import { burst, prefersReducedMotion } from './hooks'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

const PAGES = [
  { id: 'home', label: 'home', el: Home },
  { id: 'about', label: 'about me', el: About },
  { id: 'skills', label: 'skills', el: Skills },
  { id: 'projects', label: 'projects', el: Projects },
  { id: 'contact', label: 'say hi', el: Contact },
]

const fromHash = () => {
  const id = window.location.hash.replace(/^#\/?/, '')
  return PAGES.some((p) => p.id === id) ? id : 'home'
}

/* split a word into letters that can hop one after another */
const Letters = ({ text, start = 0 }) =>
  [...text].map((ch, i) => (
    <span key={i} className="logo-letter" style={{ '--i': start + i }}>
      {ch}
    </span>
  ))

function Logo() {
  return (
    <a href="#/home" className="logo" aria-label="Rebecca Jielian, home" onClick={(e) => burst(e.clientX, e.clientY)}>
      <span className="logo-tape" aria-hidden="true" />
      <span className="logo-flowers" aria-hidden="true">
        <span className="logo-flower logo-flower--big">
          <Flower size={42} />
        </span>
        <span className="logo-flower logo-flower--small">
          <Flower size={21} petal="#C5CC82" center="#E0A3BB" />
        </span>
        <span className="logo-spark">✦</span>
      </span>
      <span className="logo-text" aria-hidden="true">
        <span className="logo-name">
          <Letters text="Rebecca" />
          <em>
            <Letters text="Jielian" start={8} />
          </em>
        </span>
      </span>
    </a>
  )
}

const getTheme = () => document.documentElement.dataset.theme || 'light'

function ThemeToggle() {
  const [theme, setTheme] = useState(getTheme)
  const dark = theme === 'dark'

  const apply = (next) => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('rj-theme', next)
    } catch {
      /* storage unavailable: theme still works for this visit */
    }
    setTheme(next)
  }

  const toggle = (e) => {
    const next = dark ? 'light' : 'dark'
    const x = e.clientX || window.innerWidth - 40
    const y = e.clientY || 40
    if (!document.startViewTransition || prefersReducedMotion()) {
      apply(next)
      burst(x, y)
      return
    }
    // paint the new theme in with a growing circle from the button
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const t = document.startViewTransition(() => flushSync(() => apply(next)))
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
      )
      burst(x, y)
    })
  }

  return (
    <button className="theme-toggle" onClick={toggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} title={dark ? 'lights on!' : 'lights off!'}>
      <Sun size={30} />
      <Moon size={28} />
    </button>
  )
}

export default function App() {
  const [page, setPage] = useState(fromHash)

  useEffect(() => {
    const onHash = () => {
      setPage(fromHash())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const p = PAGES.find((x) => x.id === page)
    document.title = page === 'home' ? 'Rebecca Jielian · Portfolio' : `${p.label} · Rebecca Jielian`
  }, [page])

  const Current = PAGES.find((p) => p.id === page).el

  return (
    <>
      <SparkleLayer />
      <Scraps />
      <div className="awning" aria-hidden="true" />
      <div className="header-fade" aria-hidden="true" />
      <header className="topbar">
        <Logo />
        <div className="nav-wrap">
        <nav className="tabs" aria-label="Main">
          {PAGES.map((p, i) => (
            <a
              key={p.id}
              href={`#/${p.id}`}
              className={`tab tab--${i % 4} ${page === p.id ? 'is-active' : ''}`}
              aria-current={page === p.id ? 'page' : undefined}
            >
              {p.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
        </div>
      </header>

      <main key={page} className="page">
        <Current />
      </main>

      <footer className="footer">
        <div className="lace" aria-hidden="true" />
        <p className="hand">
          made with React.js, pastel pink & a lot of <Heart size={18} /> by Rebecca Jielian · 2026
        </p>
      </footer>
    </>
  )
}
