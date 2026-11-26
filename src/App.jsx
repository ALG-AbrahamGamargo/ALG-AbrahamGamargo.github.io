import { useEffect } from 'react'
import { Nav } from './components/Nav.jsx'
import { Hero } from './components/Hero.jsx'
import { Creator } from './components/Creator.jsx'
import { Footer } from './components/Footer.jsx'

/**
 * LA PÁGINA ES DE CONTENIDO (decisión de Abraham: *"saca el tema de las
 * aplicaciones, dejamos página de mi creador de contenido"*).
 *
 * Se fueron: la sección de aplicaciones, las cifras de apps y la portada con
 * una app. Queda el creador: quién es, qué contenido hace y dónde seguirlo.
 * La privacidad sigue viviendo en sus páginas propias.
 */
export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('is-ready')
  }, [])

  return (
    <>
      <a className="skip-link" href="#creador">
        Ir al contenido
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Creator />
      </main>
      <Footer />
    </>
  )
}
