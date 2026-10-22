import { motion, useReducedMotion } from 'framer-motion'
import { SectionHead, viewport } from './Section.jsx'

const STEPS = [
  {
    n: '01',
    title: 'Interfaz primero',
    desc: 'Empiezo por la pantalla que resuelve el problema, no por la arquitectura. Si el flujo no se entiende en cinco segundos, se rediseña.',
    tag: 'Producto',
  },
  {
    n: '02',
    title: 'React, Vite y motion',
    desc: 'Componentes pequeños y predecibles, animaciones con framer-motion y un build estático que carga rápido en cualquier teléfono.',
    tag: 'Frontend',
  },
  {
    n: '03',
    title: 'Extensiones y Android',
    desc: 'Manifest V3 en Chrome, almacenamiento local y apps nativas ligeras. El rendimiento es un requisito, no un extra.',
    tag: 'Plataformas',
  },
  {
    n: '04',
    title: 'Privacidad por defecto',
    desc: 'Sin cuentas innecesarias ni servidores propios: los datos viven en el dispositivo y las políticas lo explican sin letra pequeña.',
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
                Menos capas.<br />
                <span className="serif accent-text">Más producto.</span>
              </>
            }
            lead="Elijo herramientas aburridas y confiables para que lo interesante sea la experiencia de quien usa la app."
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
              Si una función no ayuda a hacer algo más rápido o más claro,
              probablemente no debería existir.
            </p>
            <span className="stack__quote-author">Criterio de producto</span>
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
