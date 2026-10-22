import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { LogoMark, ScrollProgress } from './LogoMark.jsx'

const LINKS = [
  { href: '#apps', label: 'Aplicaciones' },
  { href: '#stack', label: 'Cómo construyo' },
  { href: '#principios', label: 'Principios' },
  { href: '#contacto', label: 'Contacto' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <ScrollProgress />

      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        initial={reduce ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <div className="container nav__inner">
          <a className="nav__brand" href="#top" aria-label="Aionel, ir al inicio">
            <LogoMark size={30} />
            <span>Aionel</span>
          </a>

          <nav className="nav__links" aria-label="Navegación principal">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                <span>{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a className="btn btn--ghost nav__cta" href="#apps">
              Ver apps
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <button
              className={`burger ${open ? 'is-open' : ''}`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav>
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="mobile-menu__num">0{i + 1}</span>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <a className="btn mobile-menu__cta" href="mailto:aionelmindalg@gmail.com" onClick={() => setOpen(false)}>
              Escribirme
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
