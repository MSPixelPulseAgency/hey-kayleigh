import { Heart, Sparkles, Star } from 'lucide-react'
import { AmbientDecorations } from './components/AmbientDecorations.jsx'
import { Hero } from './components/Hero.jsx'
import { KayleighFile } from './components/KayleighFile.jsx'
import { Assessment } from './components/Assessment.jsx'
import { Classified } from './components/Classified.jsx'
import { TouchMeGame } from './components/TouchMeGame.jsx'
import { GenuineNote } from './components/GenuineNote.jsx'
import { HangoutInvite } from './components/HangoutInvite.jsx'
import { FinalCard } from './components/FinalCard.jsx'
import { storySections } from './data/kayleighData.js'
import { useScrollProgress } from './hooks/useScrollProgress.js'

function StoryRail() {
  return (
    <nav className="story-rail" aria-label="Story sections">
      <span className="story-rail__label">our tiny story</span>
      <ol>
        {storySections.map((section, index) => (
          <li key={section.id}>
            <a href={`#${section.id}`} aria-label={`Go to ${section.label}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <i aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function FloatingAccents() {
  return (
    <div className="floating-accents" aria-hidden="true">
      <Heart className="floating-accents__heart" />
      <Sparkles className="floating-accents__sparkle" />
      <Star className="floating-accents__star" />
    </div>
  )
}

function App() {
  const progress = useScrollProgress()

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <AmbientDecorations />
      <FloatingAccents />
      <StoryRail />
      <main id="main-content">
        <Hero />
        <KayleighFile />
        <Assessment />
        <Classified />
        <TouchMeGame />
        <GenuineNote />
        <HangoutInvite />
        <FinalCard />
      </main>
    </>
  )
}

export default App
