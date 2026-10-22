import { motion, useReducedMotion } from 'framer-motion'
import { SectionHead, viewport } from './Section.jsx'

const STEPS = [
  {
    n: '01',
    title: 'Entender el problema',
    desc: 'Antes de la primera línea defino el flujo completo: qué recibe la persona, qué decide y qué resultado necesita. Primero el objetivo, después la técnica.',
    tag: 'Producto',
  },
  {
    n: '02',
    title: 'Frontend: React, Next.js y Angular',
    desc: 'Interfaces rápidas, accesibles y responsivas. Next.js para web con SEO y Angular para aplicaciones empresariales de mayor escala.',
    tag: 'Frontend',
  },
  {
    n: '03',
    title: 'Backend: Java, PHP y PostgreSQL',
    desc: 'APIs estables y lógica de negocio clara sobre Java y PHP, con PostgreSQL como base de datos relacional bien modelada.',
    tag: 'Backend',
  },
  {
    n: '04',
    title: 'Móvil y escritorio',
    desc: 'React Native para llevar el mismo producto al teléfono y aplicaciones de escritorio preparadas para trabajar sin fricción.',
    tag: 'Plataformas',
  },
  {
    n: '05',
    title: 'Privacidad y confianza',
    desc: 'Solo los datos necesarios, protegidos y explicados con claridad. Una base sólida para cualquier producto.',
    tag: 'Confianza',
  },
]

export function Stack() {
  return (
    <section id="stack" className="section stack">
      <div className="container stack__grid">
        <div className="stack__left">
          <SectionHead
            eyebrow="Cómo trabajo"
            title={
              <>
                Tecnología web<br />
                <span className="serif accent-text">de punta a punta.</span>
              </>
            }
            lead="Construyo productos digitales sobre una base técnica probada: React y Next.js en la web, Angular para proyectos empresariales, Java y PHP en el servidor y PostgreSQL como fuente de verdad."
          />

          <motion.div
            className="stack__quote"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="stack__quote-mark">“</span>
            <p>
              Un buen producto resuelve el problema de la persona sin que tenga
              que pensar en cómo está construido.
            </p>
          
            <span className="stack__quote-author">Decisión de diseño</span>
          </motion.div>
        </div>

        <ol className="stack__list">
          {STEPS.map((s, i) => (
            <Step key={s.n} step={s} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}

function Step({ step, index }) {
  const reduce = useReducedMotion()

  return (
    <motion.li
      className="step"
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="step__line" aria-hidden="true">
        <span className="step__dot" />
      </div>
      <div className="step__body">
        <div className="step__meta">
          <span className="step__num">{step.n}</span>
          <span className="step__tag">{step.tag}</span>
        </div>
        <h3 className="step__title">{step.title}</h3>
        <p className="step__desc">{step.desc}</p>
      </div>
    </motion.li>
  )
}
