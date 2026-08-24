import { Sparkles } from 'lucide-react'
import { Reveal } from './Reveal.jsx'

export function SectionHeading({ eyebrow, title, copy, align = 'left', id }) {
  return (
    <Reveal className={`section-heading section-heading--${align}`}>
      {eyebrow && (
        <p className="eyebrow">
          <Sparkles aria-hidden="true" size={15} strokeWidth={2.2} />
          {eyebrow}
        </p>
      )}
      <h2 id={id}>{title}</h2>
      {copy && <p className="section-heading__copy">{copy}</p>}
    </Reveal>
  )
}
