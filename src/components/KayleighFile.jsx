import {
  GraduationCap,
  HeartHandshake,
  MapPin,
  Music2,
  Ruler,
  Trophy,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { profileCards } from '../data/kayleighData.js'
import { SectionHeading } from './SectionHeading.jsx'

const cardIcons = {
  care: HeartHandshake,
  softball: Trophy,
  music: Music2,
  location: MapPin,
  height: Ruler,
  school: GraduationCap,
}

export function KayleighFile() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="story-section file-section" id="the-file" aria-labelledby="file-title">
      <div className="page-shell">
        <div className="section-heading-wrap">
          <SectionHeading eyebrow="file 01 / officially unofficial" title="The Kayleigh File" />
          <p className="handwritten-note">Things I’ve learned so far…</p>
        </div>

        <div className="quick-facts" aria-label="Kayleigh quick facts">
          <span>20</span>
          <i aria-hidden="true" />
          <span>she / her</span>
          <i aria-hidden="true" />
          <span>Canadian</span>
          <i aria-hidden="true" />
          <span>Brampton, ON</span>
        </div>

        <div className="file-grid">
          {profileCards.map((card, index) => {
            const Icon = cardIcons[card.icon]
            return (
              <motion.article
                className={`file-card file-card--${card.tone}`}
                key={card.title}
                initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: index % 2 ? 1 : -1 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
                whileHover={reduceMotion ? undefined : { y: -7, rotate: index % 2 ? -0.7 : 0.7 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.48, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="file-card__icon">
                  <Icon size={23} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <span className="file-card__number">0{index + 1}</span>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <span className="file-card__note">{card.note}</span>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
