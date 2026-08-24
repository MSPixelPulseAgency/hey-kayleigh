import {
  CalendarClock,
  Check,
  Coffee,
  Flame,
  Heart,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
  Star,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { inviteChoices } from '../data/kayleighData.js'
import { SectionHeading } from './SectionHeading.jsx'

const STORAGE_KEY = 'hey-kayleigh-choice-v2'
const WHATSAPP_NUMBER = '13658830338'

const choiceIcons = {
  bbq: Flame,
  public: Coffee,
  later: CalendarClock,
}

const whatsappMessages = {
  bbq: 'Okay Mahak 😂 BBQ with you sounds dangerously cute 👀',
  public: 'A cute public date sounds good, Mahak ☕',
  later: 'A little later, Mahak 🤍 Keep the invite open for me.',
}

const effectPieces = {
  bbq: [
    { Icon: Flame, x: -104, y: -84, rotate: -14 },
    { Icon: Heart, x: -44, y: -116, rotate: 12 },
    { Icon: Sparkles, x: 20, y: -108, rotate: 20 },
    { Icon: Flame, x: 92, y: -72, rotate: 14 },
    { Icon: Heart, x: 112, y: 12, rotate: -12 },
    { Icon: Sparkles, x: -110, y: 20, rotate: 18 },
  ],
  public: [
    { Icon: Sparkles, x: -112, y: -48, rotate: -18 },
    { Icon: Heart, x: -66, y: -96, rotate: 12 },
    { Icon: Coffee, x: 0, y: -118, rotate: -4 },
    { Icon: Sparkles, x: 72, y: -92, rotate: 21 },
    { Icon: Heart, x: 112, y: -34, rotate: 14 },
  ],
  later: [
    { Icon: Star, x: -96, y: 56, rotate: -20 },
    { Icon: Sparkles, x: -48, y: 90, rotate: 12 },
    { Icon: Star, x: 10, y: 106, rotate: 28 },
    { Icon: Heart, x: 70, y: 78, rotate: -10 },
    { Icon: Sparkles, x: 108, y: 38, rotate: 18 },
  ],
}

function readSavedChoice() {
  if (typeof window === 'undefined') return null
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return inviteChoices.some((choice) => choice.id === saved) ? saved : null
  } catch {
    return null
  }
}

function ChoiceAnimation({ choiceId }) {
  const reduceMotion = useReducedMotion()
  const pieces = effectPieces[choiceId]
  const StaticIcon = choiceId === 'bbq' ? Flame : choiceId === 'public' ? Coffee : Star

  if (reduceMotion) {
    return (
      <span className={`choice-effect__static choice-effect__static--${choiceId}`} aria-hidden="true">
        <StaticIcon size={22} />
      </span>
    )
  }

  return (
    <div className={`choice-effect choice-effect--${choiceId}`} aria-hidden="true">
      {choiceId === 'public' && (
        <div className="choice-effect__steam">
          <motion.i animate={{ opacity: [0, 0.8, 0], y: [12, -28, -42], x: [0, -5, 4] }} transition={{ duration: 2.2, repeat: 1 }} />
          <motion.i animate={{ opacity: [0, 0.65, 0], y: [16, -24, -40], x: [0, 6, -2] }} transition={{ duration: 2.35, delay: 0.18, repeat: 1 }} />
        </div>
      )}
      {pieces.map(({ Icon, x, y, rotate }, index) => (
        <motion.span
          key={`${choiceId}-${x}-${y}`}
          initial={{ opacity: 0, x: 0, y: choiceId === 'later' ? -18 : 24, scale: 0.35, rotate: 0 }}
          animate={{ opacity: [0, 1, 1, 0], x, y, scale: [0.35, 1, 0.78], rotate }}
          transition={{ duration: choiceId === 'later' ? 1.7 : 1.35, delay: index * 0.075, ease: [0.22, 1, 0.36, 1] }}
        >
          <Icon size={18} fill={Icon === Heart ? 'currentColor' : 'none'} />
        </motion.span>
      ))}
    </div>
  )
}

export function HangoutInvite() {
  const [selectedChoiceId, setSelectedChoiceId] = useState(() => readSavedChoice())
  const reduceMotion = useReducedMotion()
  const selectedChoice = useMemo(
    () => inviteChoices.find((choice) => choice.id === selectedChoiceId) || null,
    [selectedChoiceId],
  )

  const chooseResponse = (choiceId) => {
    setSelectedChoiceId(choiceId)
    try {
      window.localStorage.setItem(STORAGE_KEY, choiceId)
    } catch {
      // The UI still works even if storage is unavailable.
    }
  }

  const whatsappUrl = selectedChoice
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessages[selectedChoice.id])}`
    : '#'

  return (
    <section className="story-section invitation-section" id="invitation" aria-labelledby="invitation-title">
      <div className="invitation-orbit invitation-orbit--one" aria-hidden="true" />
      <div className="invitation-orbit invitation-orbit--two" aria-hidden="true" />
      <div className="page-shell invitation-wrap">
        <SectionHeading
          id="invitation-title"
          eyebrow="okay, gorgeous… here’s my actual question 👀"
          title="Kayleigh, let me take you out."
          copy="You bring that smile. I’ll bring the plan."
          align="center"
        />

        <div className="invitation-copy">
          <aside className="comfort-note">
            <MapPin size={20} aria-hidden="true" />
            <p>
              <strong>You choose the pace.</strong> I’ll make the rest feel easy.
            </p>
          </aside>
          <p className="choice-promise">
            <MessageCircle size={15} aria-hidden="true" />
            Pick what feels right. I’ll be genuinely happy with any answer.
          </p>
        </div>

        <div className="choice-group" role="group" aria-label="Choose what feels right for you">
          {inviteChoices.map((choice) => {
            const Icon = choiceIcons[choice.icon]
            const selected = selectedChoiceId === choice.id
            return (
              <motion.button
                key={choice.id}
                className={`choice-button choice-button--${choice.id} ${selected ? 'choice-button--selected' : ''}`}
                type="button"
                aria-pressed={selected}
                onClick={() => chooseResponse(choice.id)}
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
            {selectedChoice && (
              <motion.article
                key={selectedChoice.id}
                className={`response-card response-card--${selectedChoice.id}`}
                initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                <ChoiceAnimation choiceId={selectedChoice.id} />
                <span className="response-card__icon">
                  {selectedChoice.id === 'later' ? (
                    <CalendarClock size={23} aria-hidden="true" />
                  ) : selectedChoice.id === 'public' ? (
                    <Coffee size={23} aria-hidden="true" />
                  ) : (
                    <Heart size={23} fill="currentColor" aria-hidden="true" />
                  )}
                </span>
                <h3>{selectedChoice.heading}</h3>
                <p>{selectedChoice.copy}</p>
                <p className="delivery-status delivery-status--sent" role="status">
                  <Sparkles size={16} aria-hidden="true" />
                  <span>{selectedChoice.status}</span>
                </p>
                <a
                  className="button button--retry"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Send ${selectedChoice.label} to me on WhatsApp`}
                >
                  <Send size={17} aria-hidden="true" />
                  {selectedChoice.id === 'bbq'
                    ? 'Make our BBQ official'
                    : selectedChoice.id === 'public'
                      ? 'Plan our cute date'
                      : 'Keep my invite open'}
                </a>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
