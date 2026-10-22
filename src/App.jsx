import { useEffect } from 'react'
import { Nav } from './components/Nav.jsx'
import { Hero } from './components/Hero.jsx'
import { Stats } from './components/Section.jsx'
import { Apps } from './components/Apps.jsx'
import { Stack } from './components/Stack.jsx'
import { Principles } from './components/Principles.jsx'
import { Footer } from './components/Footer.jsx'

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('is-ready')
  }, [])

  return (
    <>
      <a className="skip-link" href="#apps">
        Ir a las aplicaciones
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
        <Apps />
        <Stack />
        <Principles />
      </main>
      <Footer />
    </>
  )
}

