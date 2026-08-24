import {
  CalendarClock,
  Check,
  Coffee,
  Flame,
  Heart,
  Info,
  MapPin,
  Sparkles,
  Star,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { inviteChoices } from '../data/kayleighData.js'
import { SectionHeading } from './SectionHeading.jsx'

const choiceIcons = {
  bbq: Flame,
  public: Coffee,
  later: CalendarClock,
}

const celebrationPieces = [
  { Icon: Heart, x: -92, y: -74, rotate: -18 },
  { Icon: Sparkles, x: -34, y: -104, rotate: 14 },
  { Icon: Star, x: 42, y: -94, rotate: 28 },
  { Icon: Heart, x: 96, y: -58, rotate: 17 },
  { Icon: Star, x: -108, y: 18, rotate: -22 },
  { Icon: Sparkles, x: 112, y: 25, rotate: 12 },
]

function CelebrationBurst() {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return null

  return (
    <div className="celebration-burst" aria-hidden="true">
      {celebrationPieces.map(({ Icon, x, y, rotate }, index) => (
        <motion.span
          key={`${x}-${y}`}
          initial={{ opacity: 0, x: 0, y: 10, scale: 0.4, rotate: 0 }}
          animate={{ opacity: [0, 1, 1, 0], x, y, scale: [0.4, 1, 0.82], rotate }}
          transition={{ duration: 1.25, delay: index * 0.055, ease: 'easeOut' }}
        >
          <Icon size={18} fill={Icon === Heart ? 'currentColor' : 'none'} />
        </motion.span>
      ))}
    </div>
  )
}

export function HangoutInvite() {
  const [selectedId, setSelectedId] = useState(null)
  const reduceMotion = useReducedMotion()
  const selectedChoice = inviteChoices.find((choice) => choice.id === selectedId)

  return (
    <section className="story-section invitation-section" id="invitation" aria-labelledby="invitation-title">
      <div className="invitation-orbit invitation-orbit--one" aria-hidden="true" />
      <div className="invitation-orbit invitation-orbit--two" aria-hidden="true" />
      <div className="page-shell invitation-wrap">
        <SectionHeading
          eyebrow="spontaneous question 👀"
          title="Would you wanna hang out tonight?"
          align="center"
        />

        <div className="invitation-copy">
          <p>
            I was thinking something super chill — BBQ, music, talking, maybe a drink, and just seeing
            if our real-life vibe matches our texting vibe.
          </p>
          <aside className="comfort-note">
            <MapPin size={20} aria-hidden="true" />
            <p>
              <strong>No pressure at all.</strong> We can keep it simple, meet somewhere public first,
              or save it for another day — whatever makes you comfortable.
            </p>
          </aside>
        </div>

        <div className="choice-group" role="group" aria-label="Choose a hangout response">
          {inviteChoices.map((choice) => {
            const Icon = choiceIcons[choice.icon]
            const selected = selectedId === choice.id
            return (
              <motion.button
                key={choice.id}
                className={`choice-button ${selected ? 'choice-button--selected' : ''}`}
                type="button"
                aria-pressed={selected}
                onClick={() => setSelectedId(choice.id)}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                transition={{ duration: 0.2 }}
              >
                <span className="choice-button__icon">
                  <Icon size={23} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <span>{choice.label}</span>
                <span className="choice-button__check" aria-hidden="true">
                  <Check size={14} strokeWidth={3} />
                </span>
              </motion.button>
            )
          })}
        </div>

        <div className="choice-response" aria-live="polite">
          <AnimatePresence mode="wait">
            {selectedChoice ? (
              <motion.article
                key={selectedChoice.id}
                className={`response-card response-card--${selectedChoice.id}`}
                initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                {(selectedChoice.id === 'bbq' || selectedChoice.id === 'public') && <CelebrationBurst />}
                <span className="response-card__icon">
                  {selectedChoice.id === 'later' ? (
                    <CalendarClock size={23} aria-hidden="true" />
                  ) : (
                    <Heart size={23} fill="currentColor" aria-hidden="true" />
                  )}
                </span>
                <h3>{selectedChoice.heading}</h3>
                <p>{selectedChoice.copy}</p>
                {selectedChoice.extra && (
                  <p className="response-card__extra">
                    <Info size={16} aria-hidden="true" />
                    {selectedChoice.extra}
                  </p>
                )}
              </motion.article>
            ) : (
              <motion.p
                className="choice-placeholder"
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Pick the option that actually feels right. Every answer is a good answer.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
