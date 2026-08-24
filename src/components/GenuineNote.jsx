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
          one soft moment, just for you
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
          <p className="eyebrow">okay, no teasing for ten seconds…</p>
          <h2 id="genuine-title">I really like the way talking to you feels.</h2>
          <p className="genuine-card__body">
            You’re easy to talk to, fun to tease, and very hard not to like. I’d love a little more of your time.
          </p>
          <p className="genuine-card__signature">Ten seconds over. Let me flirt with you again. — Mahak, the tech guy who made this for you</p>
        </motion.article>
      </div>
    </section>
  )
}
