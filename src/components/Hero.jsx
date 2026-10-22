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
      {/* Aurora de fondo con parallax */}
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
        {/* Columna de texto */}
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
            href="#stack"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
          >
            <span className="hero__dot" />
            Desarrollador independiente · Venezuela
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
                simplifica lo
              </motion.span>
            </span>
            <span>
              <motion.span
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay: 0.34, ease }}
              >
                <span className="serif accent-text">cotidiano</span>
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
            Construyo aplicaciones claras y rápidas para Venezuela: VPREX para
            leer las tasas del día y Wprex para vender por WhatsApp sin fricción.
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
            <a
              className="btn btn--ghost"
              href="https://play.google.com/store/apps/details?id=com.vprex.app"
              target="_blank"
              rel="noopener"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l.1.1 9.3-9.3v-.2L3.7 2.2l-.1.1ZM16 15.3l-3.1-3.1v-.2L16 8.9l.1.1 3.7 2.1c1 .6 1 1.6 0 2.2L16 15.4l0-.1ZM15 16.4l-3.1-3.1-9.2 9.2c.4.4 1 .4 1.7 0l10.6-6.1ZM15 7.6 4.4 1.5c-.7-.4-1.3-.4-1.7 0l9.2 9.2L15 7.6Z" />
              </svg>
              Google Play
            </a>
          </motion.div>
        </div>

        {/* Mockup flotante */}
        <motion.div
          className="hero__showcase"
          initial={reduce ? false : { opacity: 0, y: 60, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.3, delay: 0.75, ease }}
          style={{ perspective: 1400 }}
        >
          <SpotlightCard className="showcase">
            <div className="showcase__bar">
              <span className="showcase__dots">
                <i /> <i /> <i />
              </span>
              <span className="showcase__url">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="10" width="16" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
                VPREX en tu teléfono
              </span>
            </div>

            <div className="showcase__body">
              <div className="rate-card">
                <div className="rate-card__head">
                  <span className="rate-card__label">BCV Oficial</span>
                  <span className="rate-card__live">
                    <i /> en vivo
                  </span>
                </div>
                <div className="rate-card__value">
                  <span className="rate-card__cur">Bs.</span>
                  <AnimatedNumber value={182.44} decimals={2} />
                </div>
                <div className="rate-card__delta">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17l10-10M9 7h8v8" />
                  </svg>
                  0,42 % hoy
                </div>
                <Sparkline />
              </div>

              <div className="showcase__side">
                <div className="mini-rate">
                  <span>Paralelo</span>
                  <strong>Bs. 191,20</strong>
                </div>
                <div className="mini-rate">
                  <span>Euro BCV</span>
                  <strong>Bs. 211,06</strong>
                </div>
                <div className="mini-rate mini-rate--dim">
                  <span>Euro paralelo</span>
                  <strong>Bs. 219,74</strong>
                </div>
              </div>
            </div>
          </SpotlightCard>

          <div className="float-chip float-chip--1">
            <span className="float-chip__ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            Pedido listo para WhatsApp
          </div>
          <div className="float-chip float-chip--2">
            <span className="float-chip__ico float-chip__ico--pulse" />
            Alertas activas
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function AnimatedNumber({ value, decimals = 2 }) {
  const reduce = useReducedMotion()
  const formatted = value.toFixed(decimals).replace('.', ',')

  return (
    <span className="rate-card__num">
      {reduce
        ? formatted
        : formatted.split('').map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 + i * 0.055, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch}
            </motion.span>
          ))}
    </span>
  )
}

function Sparkline() {
  const path =
    'M0 46 L18 44 L36 47 L54 38 L72 40 L90 31 L108 33 L126 24 L144 27 L162 18 L180 20 L198 11'
  return (
    <svg className="sparkline" viewBox="0 0 198 52" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00e087" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00e087" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="spark-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00a862" />
          <stop offset="100%" stopColor="#5cf7b4" />
        </linearGradient>
      </defs>
      <path d={`${path} L198 52 L0 52 Z`} fill="url(#spark-fill)" />
      <motion.path
        d={path}
        fill="none"
        stroke="url(#spark-line)"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 1.1, ease: 'easeInOut' }}
      />
    </svg>
  )
}
