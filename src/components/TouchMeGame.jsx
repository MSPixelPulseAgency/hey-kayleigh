import { Hand, Heart, MousePointer2, RotateCcw, Sparkles } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'
import { SectionHeading } from './SectionHeading.jsx'

const MAX_ESCAPES = 4
const SAFE_PADDING = 16

export function TouchMeGame() {
  const fieldRef = useRef(null)
  const buttonRef = useRef(null)
  const escapesRef = useRef(0)
  const lastPositionRef = useRef({ left: null, top: null })
  const [escapes, setEscapes] = useState(0)
  const [caught, setCaught] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const reduceMotion = useReducedMotion()

  const findSafePosition = () => {
    const field = fieldRef.current
    const button = buttonRef.current
    if (!field || !button) return null

    const fieldRect = field.getBoundingClientRect()
    const buttonRect = button.getBoundingClientRect()
    const minLeft = SAFE_PADDING + buttonRect.width / 2
    const maxLeft = Math.max(minLeft, fieldRect.width - SAFE_PADDING - buttonRect.width / 2)
    const minTop = SAFE_PADDING + buttonRect.height / 2
    const maxTop = Math.max(minTop, fieldRect.height - SAFE_PADDING - buttonRect.height / 2)

    let next = { left: minLeft, top: minTop }
    for (let attempt = 0; attempt < 8; attempt += 1) {
      next = {
        left: minLeft + Math.random() * (maxLeft - minLeft),
        top: minTop + Math.random() * (maxTop - minTop),
      }

      const previous = lastPositionRef.current
      if (
        previous.left === null ||
        Math.hypot(next.left - previous.left, next.top - previous.top) > 72
      ) {
        break
      }
    }

    const offsetPosition = {
      x: next.left - fieldRect.width / 2,
      y: next.top - fieldRect.height / 2,
    }
    lastPositionRef.current = next
    return offsetPosition
  }

  const escapeButton = () => {
    if (caught || escapesRef.current >= MAX_ESCAPES) return
    const nextPosition = findSafePosition()
    if (nextPosition) setPosition(nextPosition)
    const nextEscapes = escapesRef.current + 1
    escapesRef.current = nextEscapes
    setEscapes(nextEscapes)
  }

  const catchButton = () => {
    setCaught(true)
  }

  const handlePointerEnter = (event) => {
    if (event.pointerType === 'mouse' && escapesRef.current < MAX_ESCAPES) {
      escapeButton()
    }
  }

  const handleClick = (event) => {
    if (event.detail === 0) {
      catchButton()
      return
    }

    if (escapesRef.current < MAX_ESCAPES) {
      escapeButton()
      return
    }

    catchButton()
  }

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    catchButton()
  }

  const resetGame = () => {
    escapesRef.current = 0
    lastPositionRef.current = { left: null, top: null }
    setEscapes(0)
    setCaught(false)
    setPosition({ x: 0, y: 0 })
  }

  return (
    <section className="story-section game-section" id="touch-game" aria-labelledby="game-title">
      <div className="page-shell game-layout">
        <div className="game-copy">
          <SectionHeading
            id="game-title"
            eyebrow="tiny intermission"
            title="Catch me if you can."
            copy="Four escapes. Then I behave."
          />
          <div className="game-instructions">
            <span>
              <MousePointer2 size={17} aria-hidden="true" />
              desktop: hover
            </span>
            <span>
              <Hand size={17} aria-hidden="true" />
              mobile: tap
            </span>
          </div>
          <p className="game-status" aria-live="polite">
            {caught
              ? 'Caught. Stubbornness confirmed.'
              : escapes === MAX_ESCAPES
                ? 'No more escaping — it’s catchable now.'
                : `${escapes} of ${MAX_ESCAPES} dramatic escapes`}
          </p>
        </div>

        <div className={`touch-game ${caught ? 'touch-game--caught' : ''}`}>
          <div className="touch-game__topbar" aria-hidden="true">
            <span />
            <span />
            <span />
            <small>very serious game.exe</small>
          </div>
          <div className="touch-game__field" ref={fieldRef}>
            <div className="touch-game__safe-zone" aria-hidden="true" />
            {!caught && (
              <motion.div
                className="touch-game__button-anchor"
                animate={position}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 340, damping: 24, mass: 0.7 }
                }
              >
                <button
                  ref={buttonRef}
                  className="touch-game__button"
                  type="button"
                  aria-label={`Touch me. ${MAX_ESCAPES - escapes} playful escapes remaining.`}
                  onPointerEnter={handlePointerEnter}
                  onClick={handleClick}
                  onKeyDown={handleKeyDown}
                >
                  Touch me
                  <Heart size={17} fill="currentColor" aria-hidden="true" />
                </button>
              </motion.div>
            )}

            <AnimatePresence>
              {caught && (
                <motion.div
                  className="touch-game__reveal"
                  role="status"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.86, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="touch-game__reveal-icon">
                    <Sparkles size={24} aria-hidden="true" />
                  </span>
                  <h3>Okay okay, you caught me.</h3>
                  <p>Stubborn and cute. Dangerous combo.</p>
                  <button className="button button--quiet" type="button" onClick={resetGame}>
                    <RotateCcw size={16} aria-hidden="true" />
                    play again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
