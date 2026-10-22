import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { SpotlightCard } from './SpotlightCard.jsx'
import { LogoMark } from './LogoMark.jsx'

export function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  const ease = [0.22, 1, 0.36, 1]

  return (
    <section id="top" className="hero" ref={ref}>
      <motion.div
        className="hero__bg"
        style={reduce ? undefined : { y, scale, opacity }}
        aria-hidden="true"
      >
        <div className="orb orb--a" />
        <div className="orb orb--b" />
        <div className="orb orb--c" />
        <div className="hero__grid" />
      </motion.div>

      <div className="container hero__inner">
        <div className="hero__body">
          <motion.a
            className="hero__brand"
            href="#top"
            aria-label="Aionel"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <LogoMark size={48} />
            <span>Aionel</span>
          </motion.a>

          <motion.a
            className="hero__badge"
            href="#creador"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
          >
            <span className="hero__dot" />
            Desarrollo de software · Creador de contenido · LATAM
            <span className="hero__badge-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </motion.a>

          <h1 className="hero__title display">
            <span>
              <motion.span
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay: 0.14, ease }}
              >
                Software que
              </motion.span>
            </span>
            <span>
              <motion.span
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay: 0.24, ease }}
              >
                ayuda a ser 
              </motion.span>
            </span>
            <span>
              <motion.span
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay: 0.34, ease }}
              >
                <span className="serif accent-text">mas productivo</span>
                <span className="hero__dot-end" />
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="hero__lead"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
          >
            Construyo aplicaciones web y móviles para Latinoamérica y creo
            contenido de ciencia y tecnología.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
          >
            <a className="btn" href="#apps">
              Explorar aplicaciones
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </a>
            <a className="btn btn--ghost" href="#creador">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2.5" y="5" width="19" height="14" rx="4.5" />
                <path d="M10.2 9.3v5.4l4.6-2.7-4.6-2.7Z" />
              </svg>
              Ver mi contenido
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero__showcase"
          initial={reduce ? false : { opacity: 0, y: 60, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.3, delay: 0.7, ease }}
          style={{ perspective: 1400 }}
        >
          <div className="phone">
            <div className="phone__notch" aria-hidden="true" />
            <SpotlightCard className="phone__screen">
              <img
                className="phone__img"
                src="/shots/vprex/vprex-1.webp"
                alt="Pantalla real de VPREX con la tasa del día y su tendencia"
                width="1080"
                height="2400"
                fetchPriority="high"
              />
            </SpotlightCard>
          </div>

          <div className="float-chip float-chip--1">
            <span className="float-chip__ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            Captura real de la app
          </div>
          <div className="float-chip float-chip--2">
            <span className="float-chip__ico float-chip__ico--pulse" />
            Datos en vivo
          </div>
        </motion.div>
      </div>
    </section>
  )
}
