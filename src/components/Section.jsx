import { motion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]
export const viewport = { once: true, margin: '-90px' }

export function Stats() {
  const items = [
    { value: '2', label: 'aplicaciones publicadas' },
    { value: '3', label: 'plataformas de contenido' },
    { value: 'Venezuela', label: 'hecho por un creador local' },
    { value: 'LATAM', label: 'pensado para la región' },
  ]

  return (
    <section className="stats">
      <div className="container stats__grid">
        {items.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, delay: i * 0.08, ease }}
          >
            <span className="stat__value">{s.value}</span>
            <span className="stat__label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, lead, align = 'left' }) {
  const shared = {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport,
  }

  return (
    <div className={`section-head section-head--${align}`}>
      <motion.span className="eyebrow" {...shared} transition={{ duration: 0.7, ease }}>
        {eyebrow}
      </motion.span>
      <motion.h2
        className="section-head__title display"
        {...shared}
        transition={{ duration: 0.85, delay: 0.06, ease }}
      >
        {title}
      </motion.h2>
      {lead && (
        <motion.p
          className="section-head__lead"
          {...shared}
          transition={{ duration: 0.85, delay: 0.14, ease }}
        >
          {lead}
        </motion.p>
      )}
    </div>
  )
}
