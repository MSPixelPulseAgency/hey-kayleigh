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
          <p className="eyebrow">one tiny website later…</p>
          <h2 id="final-title">I still don’t know enough about you.</h2>
          <div className="final-card__rule" aria-hidden="true">
            <span />
            <Heart size={17} fill="currentColor" />
            <span />
          </div>
          <p className="final-card__made-with">
            Which, unfortunately for you, means I’ll have to see you again 😌
          </p>
          <p className="final-card__for">If you smiled, laughed or blushed anywhere on this page… I win.</p>
          <p className="final-card__made-with">
            <Code2 size={17} aria-hidden="true" />
            Made with code,
            <Coffee size={17} aria-hidden="true" />
            curiosity & absolutely unnecessary effort.
          </p>
          <p className="final-card__for">for Kayleigh 🤍</p>
        </Reveal>

        <div className="site-footnote">
          <p>One legal flex. No real photo of Kayleigh appears anywhere.</p>
          <details>
            <summary>Stock visual credits</summary>
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
