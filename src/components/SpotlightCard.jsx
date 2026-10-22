import { useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'

/**
 * Card glass con "spotlight" que sigue al cursor.
 * Expone --mx / --my para usarlos desde CSS.
 */
export function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const mx = useSpring(useMotionValue(50), { stiffness: 200, damping: 28 })
  const my = useSpring(useMotionValue(50), { stiffness: 200, damping: 28 })

  return (
    <div
      ref={ref}
      className={`spotlight ${className}`}
      onPointerMove={(e) => {
        if (reduce || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width) * 100)
        my.set(((e.clientY - r.top) / r.height) * 100)
      }}
      style={{ '--mx': mx, '--my': my }}
    >
      {children}
    </div>
  )
}
