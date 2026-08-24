import { motion, useReducedMotion } from 'framer-motion'

export function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const reduceMotion = useReducedMotion()
  const MotionElement = motion[as]

  return (
    <MotionElement
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionElement>
  )
}
