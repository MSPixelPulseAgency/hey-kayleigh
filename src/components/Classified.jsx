import { KeyRound, LockKeyhole, Search, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { classifiedItems } from '../data/kayleighData.js'
import { SectionHeading } from './SectionHeading.jsx'

export function Classified() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="story-section classified-section" id="classified" aria-labelledby="classified-title">
      <div className="classified-glow" aria-hidden="true" />
      <div className="page-shell">
        <SectionHeading
          eyebrow="file 02 / still classified"
          title="Good news: we still have plenty left to be curious about."
          copy="Some answers are better collected through actual conversation. Wild concept, I know."
          align="center"
        />

        <div className="classified-board">
          <span className="classified-board__pin classified-board__pin--left" aria-hidden="true" />
          <span className="classified-board__pin classified-board__pin--right" aria-hidden="true" />
          <div className="classified-grid">
            {classifiedItems.map((item, index) => (
              <motion.article
                className={`mystery-card ${index === classifiedItems.length - 1 ? 'mystery-card--wide' : ''}`}
                key={item}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 12 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -5, rotate: index % 2 ? 0.5 : -0.5 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.42, delay: index * 0.055 }}
              >
                <div className="mystery-card__topline">
                  <span>question {String(index + 1).padStart(2, '0')}</span>
                  <LockKeyhole size={17} aria-hidden="true" />
                </div>
                <h3>{item}</h3>
                <div className="mystery-card__redaction" aria-hidden="true">
                  <span />
                  <span />
                </div>
                <p>
                  <Search size={14} aria-hidden="true" />
                  awaiting good conversation
                </p>
              </motion.article>
            ))}
          </div>
          <div className="classified-board__footer">
            <KeyRound size={18} aria-hidden="true" />
            <span>unlock method: getting to know each other normally</span>
            <Sparkles size={17} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
