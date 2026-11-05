import { useEffect, useState } from 'react'
import './App.css'
import { SparkleLayer } from './components/Bits'
import { Flower, Heart } from './components/Stickers'
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
      <div className="awning" aria-hidden="true" />
      <header className="topbar">
        <a href="#/home" className="logo">
          <Flower size={30} />
          <span>
            Rebecca <em>Jielian</em>
          </span>
        </a>
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
