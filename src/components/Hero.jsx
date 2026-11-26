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
            Creador de contenido · LATAM
            <span className="hero__badge-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </motion.a>

          {/* Título e introducción: ahora es una página de CONTENIDO. */}
          <h1 className="hero__title display">
            <span>
              <motion.span
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay: 0.14, ease }}
              >
                Ciencia,
              </motion.span>
            </span>
            <span>
              <motion.span
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay: 0.24, ease }}
              >
                tecnología y
              </motion.span>
            </span>
            <span>
              <motion.span
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay: 0.34, ease }}
              >
                <span className="serif accent-text">otras curiosidades</span>
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
            Explico ciencia y tecnología de forma sencilla, y comparto lo que
            aprendo mientras creo contenido.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
          >
            <a className="btn" href="#creador">
              Ver mi contenido
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </a>
            <a className="btn btn--ghost" href="#contacto">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2.5" y="5" width="19" height="14" rx="4.5" />
                <path d="M10.2 9.3v5.4l4.6-2.7-4.6-2.7Z" />
              </svg>
              Seguirme
            </a>
          </motion.div>
        </div>

        {/*
          LA PORTADA YA NO MUESTRA UNA APP (decisión de Abraham: *"saca el tema
          de las aplicaciones, dejamos página de mi creador de contenido"*).
          En su lugar va una tarjeta sobria con sus redes.
        */}
        <motion.div
          className="hero__showcase"
          initial={reduce ? false : { opacity: 0, y: 60, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.3, delay: 0.7, ease }}
          style={{ perspective: 1400 }}
        >
          <SpotlightCard className="hero__creador">
            <span className="hero__creador-etiqueta">Sígueme</span>
            <p className="hero__creador-texto">
              Contenido nuevo cada semana sobre ciencia, tecnología y lo que
              nadie te explica.
            </p>
            <a className="btn" href="#creador">
              Ver dónde encontrarme
            </a>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  )
}
