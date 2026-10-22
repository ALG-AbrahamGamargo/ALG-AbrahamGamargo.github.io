import { motion, useReducedMotion } from 'framer-motion'
import { SectionHead, viewport } from './Section.jsx'

const STEPS = [
  {
    n: '01',
    title: 'Entender el problema',
    desc: 'Antes de escribir la primera línea trabajo el flujo completo: qué recibe la persona, qué decide y qué resultado necesita. El marketing enseña a pensar en resultados, no en funciones.',
    tag: 'Producto',
  },
  {
    n: '02',
    title: 'Web con React y Vite',
    desc: 'Interfaces rápidas y accesibles, con animaciones cuidadas y un bundle ligero. La web es la primera puerta de entrada y tiene que cargar bien incluso con mala conexión.',
    tag: 'Frontend',
  },
  {
    n: '03',
    title: 'Java y PostgreSQL en el servidor',
    desc: 'Lógica de negocio clara, APIs estables y una base de datos relacional bien modelada. Datos que no se pierden y consultas que responden con el tráfico real.',
    tag: 'Backend',
  },
  {
    n: '04',
    title: 'Privacidad y confianza',
    desc: 'Cada dato tiene una razón para existir. Lo mínimo necesario, cifrado cuando corresponde y políticas escritas sin letra pequeña.',
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
                Web, Java y datos.<br />
                <span className="serif accent-text">Bien hechos.</span>
              </>
            }
            lead="Construyo aplicaciones que hacen que tu equipo se vea profesional: la misma base con la que trabaja un especialista en marketing —claridad, consistencia y cada detalle pensado para generar confianza— aplicada a un producto que corre en web con Java y PostgreSQL."
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
              Una buena función no se nota: simplemente hace que la persona
              llegue a su resultado sin preguntarse cómo.
            </p>
            <span className="stack__quote-author">Filosofía de construcción</span>
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
