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
          <WprexCard />
        </div>
      </div>
    </section>
  )
}

function Card({ id, accent, index, children, name, tag, kind, logo }) {
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
          <div className="app-card__logo">
            <img src={logo} alt={`Logo de ${name}`} width="72" height="72" loading="lazy" />
          </div>
          <div className="app-card__title">
            <div className="app-card__top">
              <h3>{name}</h3>
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
      tag="Gratis"
      kind="Aplicación para Android"
      logo="/vprex/logo.png"
    >
      <p className="app-card__headline">El tipo de cambio, claro y al día.</p>
      <p className="app-card__desc">
        Tasas oficiales y de referencia en una sola pantalla, con conversor,
        histórico con gráficas, alertas y modo claro/oscuro.
      </p>

      <Shots shots={APPS.vprex.shots} tone="vprex" />

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
          href="https://play.google.com/store/apps/details?id=com.vprex.app"
          target="_blank"
          rel="noopener"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l.1.1 9.3-9.3v-.2L3.7 2.2l-.1.1ZM16 15.3l-3.1-3.1v-.2L16 8.9l.1.1 3.7 2.1c1 .6 1 1.6 0 2.2L16 15.4l0-.1ZM15 16.4l-3.1-3.1-9.2 9.2c.4.4 1 .4 1.7 0l10.6-6.1ZM15 7.6 4.4 1.5c-.7-.4-1.3-.4-1.7 0l9.2 9.2L15 7.6Z" />
          </svg>
          Google Play
        </a>
        <a className="link-arrow" href="/vprex-privacidad.html">
          Política de privacidad
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </Card>
  )
}

/* ---------------- WPREX ---------------- */
function WprexCard() {
  return (
    <Card
      id="wprex"
      accent="var(--wprex)"
      index={1}
      name="Wprex"
      tag="Extensión"
      kind="Extensión para Chrome"
      logo="/wprex/icono.png"
    >
      <p className="app-card__headline">Tu tienda dentro de WhatsApp.</p>
      <p className="app-card__desc">
        Catálogo con fotos, cotizador con tasas del día, pedidos con envío e
        impuestos, abonos, clientes y mensajes editables. Todo en tu navegador.
      </p>

      <Shots shots={APPS.wprex.shots} tone="wprex" />

      <FeatureList
        items={[
          'Catálogo con fotos',
          'Cotizador con tasas',
          'Pedidos con impuestos',
          'Abonos y clientes',
          'Mensajes editables',
          'Reportes',
        ]}
      />

      <p className="app-card__note">
        Sin cuentas y sin servidores propios. Tus datos se quedan en tu navegador.
      </p>

      <div className="app-card__actions">
        <a className="link-arrow link-arrow--primary" href="/wprex-privacidad.html">
          Ver política de privacidad
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </Card>
  )
}
