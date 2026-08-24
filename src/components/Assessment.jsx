import { Check, Heart, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { assessmentItems, styleReferencePhoto } from '../data/kayleighData.js'
import { SectionHeading } from './SectionHeading.jsx'
import { Reveal } from './Reveal.jsx'

export function Assessment() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="story-section assessment-section" id="assessment" aria-labelledby="assessment-title">
      <div className="page-shell assessment-layout">
        <div className="assessment-intro">
          <SectionHeading
            id="assessment-title"
            eyebrow="my completely unbiased verdict"
            title="Kayleigh, you’re unfairly cute."
            copy="And somehow even easier to like."
          />
          <Reveal className="assessment-sticker" delay={0.12}>
            <Sparkles size={17} aria-hidden="true" />
            <span>respectfully distracted</span>
          </Reveal>

          <Reveal className="style-reference" delay={0.18} as="figure">
            <div className="style-reference__image-wrap">
              <img
                src={styleReferencePhoto.src}
                srcSet={styleReferencePhoto.srcSet}
                sizes="(max-width: 900px) 82vw, 340px"
                width="700"
                height="1050"
                loading="lazy"
                fetchPriority="low"
                decoding="async"
                alt={styleReferencePhoto.alt}
              />
              <span className="style-reference__badge">stock model · not Kayleigh</span>
            </div>
            <figcaption>
              <span>piercing-style reference—because yes, I noticed yours</span>
              <a href={styleReferencePhoto.source} target="_blank" rel="noreferrer">
                {styleReferencePhoto.credit}
              </a>
            </figcaption>
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
