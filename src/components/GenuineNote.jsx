import { Heart, Quote, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from './Reveal.jsx'

export function GenuineNote() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="story-section genuine-section" id="genuine" aria-labelledby="genuine-title">
      <div className="genuine-haze genuine-haze--one" aria-hidden="true" />
      <div className="genuine-haze genuine-haze--two" aria-hidden="true" />
      <div className="page-shell genuine-wrap">
        <Reveal className="genuine-kicker">
          <Heart size={16} fill="currentColor" aria-hidden="true" />
          sincerity break
        </Reveal>

        <motion.article
          className="genuine-card"
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Quote className="genuine-card__quote" size={48} strokeWidth={1.2} aria-hidden="true" />
          <Sparkles className="genuine-card__sparkle" size={24} aria-hidden="true" />
          <p className="eyebrow">okay… jokes aside.</p>
          <h2 id="genuine-title">This part is just genuine.</h2>
          <p className="genuine-card__body">
            We literally just started talking, but talking to you has felt surprisingly easy. You seem
            genuine, kind and fun to be around — and apparently building websites is how a tech guy
            shows effort.
          </p>
          <p className="genuine-card__signature">— your favourite tech guy (application pending)</p>
        </motion.article>
      </div>
    </section>
  )
}
