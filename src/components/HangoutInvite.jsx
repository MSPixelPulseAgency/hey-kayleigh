import {
  CalendarClock,
  Check,
  Coffee,
  Flame,
  Heart,
  MapPin,
  RefreshCcw,
  Send,
  Sparkles,
  Star,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { inviteChoices } from '../data/kayleighData.js'
import { SectionHeading } from './SectionHeading.jsx'

const STORAGE_KEY = 'hey-kayleigh-choice-v1'
const MAX_PENDING_AGE_MS = 24 * 60 * 60 * 1000

const choiceIcons = {
  bbq: Flame,
  public: Coffee,
  later: CalendarClock,
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

function readSavedSubmission() {
  if (typeof window === 'undefined') return null

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    const submittedAt = Date.parse(parsed?.submittedAt)
    if (
      !parsed ||
      !inviteChoices.some((choice) => choice.id === parsed.choiceId) ||
      typeof parsed.submissionId !== 'string' ||
      typeof parsed.submittedAt !== 'string' ||
      !Number.isFinite(submittedAt) ||
      !['pending', 'sent', 'failed'].includes(parsed.status)
    ) {
      return null
    }

    if (parsed.status !== 'sent' && submittedAt < Date.now() - MAX_PENDING_AGE_MS) {
      window.localStorage.removeItem(STORAGE_KEY)
      return null
    }

    return parsed
  } catch {
    return null
  }
}

function saveSubmission(record) {
  if (typeof window === 'undefined') return false

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
    return true
  } catch {
    return false
  }
}

function createSubmissionId() {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()

  const bytes = crypto.getRandomValues(new Uint8Array(16))
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, '0'))
  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10).join('')}`
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
          animate={{
            opacity: [0, 1, 1, 0],
            x,
            y,
            scale: [0.35, 1, 0.78],
            rotate,
          }}
          transition={{
            duration: choiceId === 'later' ? 1.7 : 1.35,
            delay: index * 0.075,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Icon size={18} fill={Icon === Heart ? 'currentColor' : 'none'} />
        </motion.span>
      ))}
    </div>
  )
}

export function HangoutInvite() {
  const restoredSubmission = useMemo(() => readSavedSubmission(), [])
  const [submission, setSubmission] = useState(restoredSubmission)
  const [deliveryState, setDeliveryState] = useState(() => {
    if (!restoredSubmission) return 'idle'
    if (restoredSubmission.status === 'sent') return 'sent'
    return restoredSubmission.status === 'failed' ? 'failed' : 'error'
  })
  const [deliveryMessage, setDeliveryMessage] = useState(() => {
    if (!restoredSubmission) return ''
    if (restoredSubmission.status === 'sent') return 'Sent safely — one answer, one email.'
    if (restoredSubmission.status === 'failed') return 'This answer could not be emailed. Please share it directly.'
    return 'Your answer is saved. Tap retry when you’re ready.'
  })
  const requestLockRef = useRef(false)
  const honeypotRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const selectedChoice = inviteChoices.find((choice) => choice.id === submission?.choiceId)

  useEffect(() => {
    const syncSavedChoice = (event) => {
      if (event.key !== STORAGE_KEY) return
      const saved = readSavedSubmission()
      setSubmission(saved)
      if (!saved) {
        setDeliveryState('idle')
        setDeliveryMessage('')
      } else if (saved.status === 'sent') {
        setDeliveryState('sent')
        setDeliveryMessage('Sent safely — one answer, one email.')
      } else if (saved.status === 'failed') {
        setDeliveryState('failed')
        setDeliveryMessage('This answer could not be emailed. Please share it directly.')
      } else {
        setDeliveryState('error')
        setDeliveryMessage('Your answer is saved. Tap retry when you’re ready.')
      }
    }

    window.addEventListener('storage', syncSavedChoice)
    return () => window.removeEventListener('storage', syncSavedChoice)
  }, [])

  const deliverResponse = async (record) => {
    if (requestLockRef.current) return
    requestLockRef.current = true
    const pendingRecord = { ...record, status: 'pending' }
    setSubmission(pendingRecord)
    setDeliveryState('sending')
    setDeliveryMessage('Sending your answer safely…')
    const pendingWasSaved = saveSubmission(pendingRecord)

    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), 12000)

    try {
      const response = await fetch('/api/response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: record.submissionId,
          choiceId: record.choiceId,
          submittedAt: record.submittedAt,
          website: record.website || '',
        }),
        keepalive: true,
        signal: controller.signal,
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok || payload.ok !== true) {
        const deliveryError = new Error('delivery_failed')
        deliveryError.retryable =
          payload.retryable === true ||
          response.status === 429 ||
          (response.status >= 500 && payload.retryable !== false)
        deliveryError.publicMessage = typeof payload.message === 'string' ? payload.message : ''
        throw deliveryError
      }

      const sentRecord = { ...record, status: 'sent' }
      const sentWasSaved = saveSubmission(sentRecord)
      setSubmission(sentRecord)
      setDeliveryState('sent')
      setDeliveryMessage(
        sentWasSaved
          ? 'Sent safely — one answer, one email.'
          : 'Sent safely. Keep this tab open so your choice stays visible.',
      )
    } catch (error) {
      const retryable = error?.retryable !== false
      const savedRecord = { ...record, status: retryable ? 'pending' : 'failed' }
      const failureWasSaved = saveSubmission(savedRecord)
      setSubmission(savedRecord)
      setDeliveryState(retryable ? 'error' : 'failed')
      if (!retryable) {
        setDeliveryMessage(error.publicMessage || 'This answer could not be emailed. Please share it directly.')
      } else if (pendingWasSaved || failureWasSaved) {
        setDeliveryMessage('Tiny internet hiccup. Your answer is saved — retry is safe.')
      } else {
        setDeliveryMessage('Tiny internet hiccup. Keep this tab open, then retry safely.')
      }
    } finally {
      window.clearTimeout(timeoutId)
      requestLockRef.current = false
    }
  }

  const chooseResponse = (choiceId) => {
    if (requestLockRef.current || submission) return

    const record = {
      submissionId: createSubmissionId(),
      choiceId,
      submittedAt: new Date().toISOString(),
      website: honeypotRef.current?.value || '',
      status: 'pending',
    }

    deliverResponse(record)
  }

  const retryDelivery = () => {
    if (!submission || deliveryState !== 'error') return
    deliverResponse(submission)
  }

  const choiceLocked = Boolean(submission) || deliveryState === 'sending'

  return (
    <section className="story-section invitation-section" id="invitation" aria-labelledby="invitation-title">
      <div className="invitation-orbit invitation-orbit--one" aria-hidden="true" />
      <div className="invitation-orbit invitation-orbit--two" aria-hidden="true" />
      <div className="page-shell invitation-wrap">
        <SectionHeading
          id="invitation-title"
          eyebrow="the actual question 👀"
          title="Want to hang out?"
          copy="BBQ, music, talking — see if the vibe survives real life."
          align="center"
        />

        <div className="invitation-copy">
          <aside className="comfort-note">
            <MapPin size={20} aria-hidden="true" />
            <p>
              <strong>No pressure.</strong> Public first or another day is equally cute. Pick what feels right.
            </p>
          </aside>
          <p className="choice-promise">
            <Send size={15} aria-hidden="true" />
            One tap sends your answer privately.
          </p>
        </div>

        <input
          className="form-honeypot"
          ref={honeypotRef}
          name="website"
          type="text"
          tabIndex="-1"
          autoComplete="off"
          aria-hidden="true"
        />

        <div
          className="choice-group"
          role="group"
          aria-label="Choose and securely send a hangout response"
          aria-busy={deliveryState === 'sending'}
        >
          {inviteChoices.map((choice) => {
            const Icon = choiceIcons[choice.icon]
            const selected = submission?.choiceId === choice.id
            return (
              <motion.button
                key={choice.id}
                className={`choice-button choice-button--${choice.id} ${selected ? 'choice-button--selected' : ''}`}
                type="button"
                aria-pressed={selected}
                disabled={choiceLocked}
                onClick={() => chooseResponse(choice.id)}
                whileHover={reduceMotion || choiceLocked ? undefined : { y: -5 }}
                whileTap={reduceMotion || choiceLocked ? undefined : { scale: 0.985 }}
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
                aria-busy={deliveryState === 'sending'}
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
                <p
                  className={`delivery-status delivery-status--${deliveryState}`}
                  role={deliveryState === 'error' || deliveryState === 'failed' ? 'alert' : 'status'}
                >
                  {deliveryState === 'sending' && <span className="delivery-status__spinner" aria-hidden="true" />}
                  {deliveryState === 'sent' && <Check size={16} strokeWidth={3} aria-hidden="true" />}
                  {deliveryState === 'error' && <Sparkles size={16} aria-hidden="true" />}
                  {deliveryState === 'failed' && <Sparkles size={16} aria-hidden="true" />}
                  <span>{deliveryMessage}</span>
                </p>
                {deliveryState === 'error' && (
                  <button className="button button--retry" type="button" onClick={retryDelivery}>
                    <RefreshCcw size={16} aria-hidden="true" />
                    retry safely
                  </button>
                )}
              </motion.article>
            ) : (
              <motion.p className="choice-placeholder" key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Pick the answer that feels right. Every answer is good.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
