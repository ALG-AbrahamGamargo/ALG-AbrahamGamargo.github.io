import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { LogoMark } from './LogoMark.jsx'
import { SocialIcon } from './Creator.jsx'
import { viewport } from './Section.jsx'
import { EMAIL, SOCIALS } from '../data/site.js'

export function Footer() {
  const [copied, setCopied] = useState(false)
  const reduce = useReducedMotion()

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <>
      <section id="contacto" className="cta">
        <div className="container">
          <motion.div
            className="cta__card"
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cta__aurora" aria-hidden="true" />
            <div className="cta__grain" aria-hidden="true" />

            <span className="eyebrow cta__eyebrow">Sígueme</span>
            <h2 className="cta__title display">
              Ciencia y tecnología, <br />
              <span className="serif accent-text">todos los días.</span>
            </h2>
            <p className="cta__lead">
              En mis redes comparto contenido de ciencia y tecnología, y novedades
              de mis aplicaciones. Sígueme por ahí. Para soporte de VPREX o
              Whatprex, escríbeme al correo. Respondo en español.
            </p>

            <div className="cta__socials" aria-label="Redes sociales">
              {SOCIALS.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`cta__social cta__social--${s.id}`}
                  aria-label={`${s.name}: ${s.handle}`}
                >
                  <SocialIcon id={s.id} size={17} />
                  <span>{s.handle}</span>
                </a>
              ))}
            </div>

            <div className="cta__actions">
              <a className="btn btn--ghost" href={`mailto:${EMAIL}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  <path d="M3.5 7l8.5 6 8.5-6" />
                </svg>
                Soporte de las apps
              </a>
              <button className="btn btn--ghost" onClick={copy} type="button">
                {copied ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Copiado
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="12" height="12" rx="2.5" />
                      <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3H5.5A2.5 2.5 0 0 0 3 5.5v7A2.5 2.5 0 0 0 5.5 15" />
                    </svg>
                    Copiar correo
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <LogoMark size={26} breathe={false} />
            <span>Aionel</span>
          </div>

          <nav className="footer__links" aria-label="Enlaces del pie">
            <a href="#apps">Aplicaciones</a>
            <a href="#creador">Contenido</a>
            <a href="https://chromewebstore.google.com/detail/omnjhpioicbgfhejkkppajjoifcaceaf?utm_source=item-share-cb" target="_blank" rel="noopener noreferrer">Whatprex en Chrome</a>
            <a href="/vprex-privacidad.html">Privacidad VPREX</a>
            <a href="/wprex-privacidad.html">Privacidad Whatprex</a>
          </nav>

          <div className="footer__socials" aria-label="Redes sociales">
            {SOCIALS.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social"
                aria-label={`${s.name} de Aionel`}
                title={`${s.name} · ${s.handle}`}
              >
                <SocialIcon id={s.id} size={16} />
                <span>{s.name}</span>
              </a>
            ))}
          </div>

          <p className="footer__legal">
            © {new Date().getFullYear()} Aionel · Desarrollo web y contenido de
            ciencia y tecnología
          </p>
        </div>
      </footer>
    </>
  )
}
