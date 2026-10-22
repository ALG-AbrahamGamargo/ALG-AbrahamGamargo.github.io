import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SOCIALS } from '../data/site.js'
import { SectionHead, viewport } from './Section.jsx'

const ICONS = {
  youtube: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="4.5" />
      <path d="M10.2 9.3v5.4l4.6-2.7-4.6-2.7Z" fill="currentColor" stroke="none" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  tiktok: (
    <path
      d="M14.5 3h2.6a5.2 5.2 0 0 0 4.4 4.5v2.6a7.7 7.7 0 0 1-4.3-1.4v6.1a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.7a3 3 0 1 0 2.1 2.9V3Z"
      fill="currentColor"
      stroke="none"
    />
  ),
}

export function SocialIcon({ id, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[id]}
    </svg>
  )
}

export function Creator() {
  const reduce = useReducedMotion()

  return (
    <section id="creador" className="section creator">
      <div className="container creator__grid">
        <div className="creator__left">
          <SectionHead
            eyebrow="También creo contenido"
            title={
              <>
                Ciencia y tecnología, <br />
                <span className="serif accent-text">explicadas en simple</span>.
              </>
            }
            lead="En YouTube, Instagram y TikTok hablo de ciencia y tecnología: inventos, avances, datos curiosos y cómo funciona todo lo que usamos a diario. No enseño a programar: explico el mundo tecnológico y científico que hay detrás."
          />

          <motion.div
            className="creator__avatar"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <div className="creator__avatar-ring" />
            <div className="creator__avatar-core">
              <span className="creator__initials">AM</span>
            </div>
            <div className="creator__live">
              <span className="creator__live-dot" />
              Aionel Mind · Ciencia y tecnología
            </div>
          </motion.div>
        </div>

        <div className="creator__cards">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.id}
              className="social-card"
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ '--social': s.color }}
              initial={reduce ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? undefined : { scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="social-card__icon">
                <SocialIcon id={s.id} size={22} />
              </span>
              <span className="social-card__text">
                <span className="social-card__top">
                  <strong>{s.name}</strong>
                  <span className="social-card__handle">{s.handle}</span>
                </span>
                <span className="social-card__desc">{s.label}</span>
              </span>
              <span className="social-card__arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Carrusel horizontal de capturas reales con scroll-snap y flechas. */
export function Shots({ shots, tone = 'vprex' }) {
  const trackRef = useRef(null)

  const scrollBy = (dir) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <div className={`shots shots--${tone}`}>
      <div className="shots__head">
        <span className="shots__label">
          Así se ve de verdad
          <i />
        </span>
        <div className="shots__nav">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Captura anterior">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Captura siguiente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="shots__track" ref={trackRef}>
        {shots.map((s, i) => (
          <figure key={s.src} className="shot">
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              decoding="async"
              draggable="false"
            />
            <figcaption>{String(i + 1).padStart(2, '0')}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
