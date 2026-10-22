import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * La "A" de Aionel hecha con SVG.
 * Anima el trazo al cargar y respira suavemente después.
 */
export function LogoMark({ size = 34, breathe = true }) {
  const reduce = useReducedMotion()

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      initial={reduce ? false : { scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <linearGradient id="aionel-mark" x1="8" y1="6" x2="58" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5cf7b4" />
          <stop offset="0.55" stopColor="#00e087" />
          <stop offset="1" stopColor="#00a862" />
        </linearGradient>
        <filter id="aionel-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.g
        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        style={
          breathe && !reduce
            ? { animation: 'markBreathe 5s ease-in-out 1.5s infinite', transformOrigin: 'center' }
            : { transformOrigin: 'center' }
        }
      >
        <path
          d="M32 13 L49.5 51 H42.4 L39 43.2 H25 L21.6 51 H14.5 Z M27.6 36.6 H36.4 L32 26.4 Z"
          fill="url(#aionel-mark)"
          filter="url(#aionel-glow)"
        />
      </motion.g>
    </motion.svg>
  )
}

/** Anillo de progreso de scroll, fino y elegante, arriba del todo. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1])

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, opacity }}
      aria-hidden="true"
    />
  )
}
