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
          flirting paused for 10 seconds
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
          <p className="eyebrow">okay, flirting aside for 10 seconds…</p>
          <h2 id="genuine-title">You’re genuinely really easy to talk to.</h2>
          <p className="genuine-card__body">
            No forced conversation. No weird energy. Just a girl I barely know somehow making me want to know a lot more.
          </p>
          <p className="genuine-card__signature">Okay, 10 seconds are over. Back to flirting. — your favourite tech guy, hopefully</p>
        </motion.article>
      </div>
    </section>
  )
}
