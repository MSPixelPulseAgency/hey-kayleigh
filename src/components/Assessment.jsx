import { Check, Heart, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { assessmentItems } from '../data/kayleighData.js'
import { SectionHeading } from './SectionHeading.jsx'
import { Reveal } from './Reveal.jsx'

export function Assessment() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="story-section assessment-section" id="assessment" aria-labelledby="assessment-title">
      <div className="page-shell assessment-layout">
        <div className="assessment-intro">
          <SectionHeading
            eyebrow="live analysis"
            title="Current assessment 👀"
            copy="A highly scientific review based on a suspiciously easy conversation."
          />
          <Reveal className="assessment-sticker" delay={0.12}>
            <Sparkles size={17} aria-hidden="true" />
            <span>peer review: pending</span>
          </Reveal>
        </div>

        <div className="assessment-list">
          {assessmentItems.map((item, index) => (
            <motion.article
              className="assessment-card"
              key={item.label}
              initial={reduceMotion ? false : { opacity: 0, x: 26 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              whileHover={reduceMotion ? undefined : { x: -5 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="assessment-card__check">
                <Check size={19} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <div>
                <h3>{item.label}</h3>
                <p>{item.note}</p>
              </div>
              {index === assessmentItems.length - 1 && (
                <Heart className="assessment-card__heart" size={18} fill="currentColor" aria-hidden="true" />
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
