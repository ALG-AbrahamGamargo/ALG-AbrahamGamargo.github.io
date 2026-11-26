import { motion } from 'framer-motion'
import { SectionHead } from './Section.jsx'
import { SpotlightCard } from './SpotlightCard.jsx'
import { Shots } from './Creator.jsx'
import { APPS } from '../data/site.js'

export function Apps() {
  return (
    <section id="apps" className="section apps">
      <div className="container">
        <SectionHead
          eyebrow="Aplicaciones"
          title={
            <>
              Dos apps.<br />
              <span className="serif accent-text">Un mismo criterio</span>.
            </>
          }
          lead="Herramientas claras y rápidas, pensadas para Latinoamérica: resuelven problemas concretos sin complicarle la vida a quien las usa."
        />

        <div className="apps__grid">
          <VprexCard />
        </div>
      </div>
    </section>
  )
}

function Card({ id, accent, index, children, name, tag, kind, logo, fuente }) {
  return (
    <motion.article
      className={`app-card app-card--${id}`}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.95, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ '--app-accent': accent }}
    >
      <SpotlightCard className="app-card__inner">
        <div className="app-card__glow" aria-hidden="true" />

        <header className="app-card__head">
          <a className="app-card__logo" href={fuente} aria-label={`Conocer ${name} en detalle`}>
            <img src={logo} alt={`Logo de ${name}`} width="72" height="72" loading="lazy" />
          </a>
          <div className="app-card__title">
            <div className="app-card__top">
              <h3><a href={fuente}>{name}</a></h3>
              <span className="app-card__tag">{tag}</span>
            </div>
            <p className="app-card__kind">{kind}</p>
          </div>
        </header>

        {children}
      </SpotlightCard>
    </motion.article>
  )
}

function FeatureList({ items }) {
  return (
    <ul className="app-card__features">
      {items.map((f) => (
        <li key={f}>
          <span className="app-card__check" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </span>
          {f}
        </li>
      ))}
    </ul>
  )
}

/* ---------------- VPREX ---------------- */
function VprexCard() {
  return (
    <Card
      id="vprex"
      accent="var(--vprex)"
      index={0}
      name="VPREX"
      tag="Android"
      kind="Aplicación para Android"
      logo="/vprex/logo.png"
      fuente="/vprex.html"
    >
      <p className="app-card__headline">El tipo de cambio, claro y al día.</p>
      <p className="app-card__desc">
        Tasas oficiales y de referencia en una sola pantalla, con conversor,
        histórico con gráficas, alertas y modo claro/oscuro.
      </p>

      <Shots shots={APPS.vprex.shots} tone="vprex" appName="VPREX" />

      <FeatureList
        items={[
          'Tasa oficial del dólar',
          'Referencias del mercado',
          'Conversor instantáneo',
          'Histórico con gráficas',
          'Alertas de tasa',
          'Buscar por fecha',
        ]}
      />

      <p className="app-card__note">
        Aplicación informativa. No realiza operaciones de cambio, no gestiona
        cuentas ni ofrece asesoría financiera.
      </p>

      <div className="app-card__actions">
        <a
          className="btn app-card__btn"
          href="https://play.google.com/store/apps/details?id=com.vprex.app&pcampaignid=web_share"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Descargar en Google Play
        </a>
        <a className="link-arrow" href="/vprex.html">
          Conocer VPREX
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
      <p className="app-card__note app-card__note--estado">
        <a href="/vprex-privacidad.html">Política de privacidad</a>
      </p>
    </Card>
  )
}

/*
 * La tarjeta de PorEstock SE QUITÓ de la página principal (decisión de
 * Abraham: *"quiero que en mi página principal desaparezca todo lo que tenga
 * que ver con este producto; sácalo de aquí"*). La página queda con VPREX.
 * El producto sigue en su página propia (`/whatprex.html`).
 */
