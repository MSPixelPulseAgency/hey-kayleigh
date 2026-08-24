import {
  ArrowDown,
  CameraOff,
  GraduationCap,
  HeartHandshake,
  Music2,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { stockPhotos } from '../data/kayleighData.js'

const photoIcons = {
  care: HeartHandshake,
  softball: Trophy,
  music: Music2,
  campus: GraduationCap,
}

function PhotoCard({ photo, index }) {
  const reduceMotion = useReducedMotion()
  const Icon = photoIcons[photo.id]

  return (
    <motion.figure
      className={`photo-card ${photo.className}`}
      style={{ rotate: photo.rotate }}
      initial={reduceMotion ? false : { opacity: 0, y: 32, rotate: photo.rotate * 1.8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: photo.rotate }}
      whileHover={reduceMotion ? undefined : { y: -8, rotate: photo.rotate * 0.4, scale: 1.015 }}
      transition={{ duration: 0.65, delay: 0.32 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="photo-card__image-wrap">
        <img
          className="photo-card__image"
          src={photo.src}
          srcSet={photo.srcSet}
          sizes="(max-width: 767px) 43vw, (max-width: 1100px) 26vw, 280px"
          alt={photo.alt}
          width="700"
          height="875"
          loading={index === 0 ? 'eager' : 'lazy'}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          decoding="async"
        />
      </div>
      <figcaption>
        <span>
          <Icon size={15} strokeWidth={2} aria-hidden="true" />
          {photo.label}
        </span>
        <small>{photo.note}</small>
      </figcaption>
    </motion.figure>
  )
}

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero story-section" id="intro" aria-labelledby="hero-title">
      <div className="hero__blob hero__blob--one" aria-hidden="true" />
      <div className="hero__blob hero__blob--two" aria-hidden="true" />
      <div className="hero__inner page-shell">
        <motion.div
          className="hero__copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow hero__eyebrow">
            <Sparkles size={15} strokeWidth={2.2} aria-hidden="true" />
            okay Kayleigh… I made you a tiny website.
          </p>
          <h1 id="hero-title">
            Normal texting felt <em>a little underdressed.</em>
          </h1>
          <p className="hero__supporting">So here’s one cute little flex.</p>
          <div className="hero__actions">
            <a className="button button--primary" href="#the-file">
              open the case file
              <ArrowDown size={18} strokeWidth={2.2} aria-hidden="true" />
            </a>
            <a className="text-link" href="#invitation">
              skip to the question
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <aside className="privacy-sticker" aria-label="Photo privacy note">
            <CameraOff size={18} aria-hidden="true" />
            <span>
              <strong>privacy plot twist:</strong> stock models only — never Kayleigh.
            </span>
          </aside>
        </motion.div>

        <div className="hero__visual" aria-label="A generic stock-photo moodboard inspired by care, softball, music and college">
          <div className="collage-doodle collage-doodle--loop" aria-hidden="true" />
          <span className="collage-note collage-note--top">evidence board, but cute</span>
          <div className="photo-collage">
            {stockPhotos.map((photo, index) => (
              <PhotoCard key={photo.id} photo={photo} index={index} />
            ))}
          </div>
          <span className="collage-note collage-note--bottom">subtle? absolutely not.</span>
        </div>
      </div>
      <a className="hero__scroll-cue" href="#the-file" aria-label="Continue to The Kayleigh File">
        <span>keep scrolling</span>
        <ArrowDown size={18} aria-hidden="true" />
      </a>
    </section>
  )
}
