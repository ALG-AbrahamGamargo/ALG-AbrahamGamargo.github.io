import { motion, useReducedMotion } from 'framer-motion'
import { SectionHead, viewport } from './Section.jsx'

const PRINCIPLES = [
  {
    icon: 'bolt',
    title: 'Rápido por defecto',
    desc: 'Carga ligera, sin dependencias innecesarias y con interacciones que responden al instante.',
  },
  {
    icon: 'eye',
    title: 'Claro a la primera',
    desc: 'Interfaces legibles, números alineados y jerarquía visual que evita dudas.',
  },
  {
    icon: 'lock',
    title: 'Privado por diseño',
    desc: 'Tus datos se quedan en tu dispositivo. Sin cuentas que no necesitas, sin rastreadores.',
  },
  {
    icon: 'heart',
    title: 'Hecho para Venezuela',
    desc: 'Bolívares, BCV, WhatsApp y negocios reales: las apps nacen del contexto local.',
  },
]

const ICONS = {
  bolt: (
    <path d="M13 2L4.5 13.5H11l-1 8.5L18.5 10H12l1-8Z" />
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3.2" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  heart: (
    <path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 3.3c0 5.4-7.5 10-7.5 10Z" />
  ),
}

export function Principles() {
  return (
    <section id="principios" className="section principles">
      <div className="container">
        <SectionHead
          eyebrow="Principios"
          align="center"
          title={
            <>
              Lo que no <span className="serif accent-text">negocio</span>.
            </>
          }
          lead="Cuatro reglas simples que aplico en las apps y también en cada video, sin importar lo pequeño que sea el tema."
        />

        <div className="principles__grid">
          {PRINCIPLES.map((p, i) => (
            <Principle key={p.title} item={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Principle({ item, index }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className="principle"
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -6 }}
    >
      <div className="principle__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          {ICONS[item.icon]}
        </svg>
      </div>
      <h3 className="principle__title">{item.title}</h3>
      <p className="principle__desc">{item.desc}</p>
      <span className="principle__index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
    </motion.div>
  )
}

