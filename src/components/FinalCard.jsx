import { Code2, Coffee, Heart, Sparkles } from 'lucide-react'
import { visualCredits } from '../data/kayleighData.js'
import { Reveal } from './Reveal.jsx'

export function FinalCard() {
  return (
    <footer className="story-section final-section" id="final-card" aria-labelledby="final-title">
      <div className="page-shell">
        <Reveal className="final-card">
          <span className="final-card__spark final-card__spark--one" aria-hidden="true">
            <Sparkles />
          </span>
          <span className="final-card__spark final-card__spark--two" aria-hidden="true">
            <Heart fill="currentColor" />
          </span>
          <p className="eyebrow">one last thing, pretty girl…</p>
          <h2 id="final-title">I made all of this because you caught my attention.</h2>
          <div className="final-card__rule" aria-hidden="true">
            <span />
            <Heart size={17} fill="currentColor" />
            <span />
          </div>
          <p className="final-card__made-with">
            And I’d really like the chance to keep yours.
          </p>
          <p className="final-card__for">If you smiled, laughed, or blushed even once… I’m counting that as a win.</p>
          <p className="final-card__made-with">
            <Code2 size={17} aria-hidden="true" />
            Made by Mahak with code,
            <Coffee size={17} aria-hidden="true" />
            caffeine & a very obvious soft spot for you.
          </p>
          <p className="final-card__for">only for Kayleigh 🤍</p>
        </Reveal>

        <div className="site-footnote">
          <p>Tiny disclaimer: every photo is stock. Every flirty word is meant for you.</p>
          <details>
            <summary>See the stock-photo credits</summary>
            <ul>
              {visualCredits.map((photo) => (
                <li key={photo.id}>
                  <a href={photo.source} target="_blank" rel="noreferrer">
                    {photo.credit}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </footer>
  )
}
