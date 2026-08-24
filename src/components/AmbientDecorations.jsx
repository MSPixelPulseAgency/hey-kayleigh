import { Heart, Sparkles, Star } from 'lucide-react'

const decorations = [
  { Icon: Heart, className: 'ambient ambient--one' },
  { Icon: Sparkles, className: 'ambient ambient--two' },
  { Icon: Star, className: 'ambient ambient--three' },
  { Icon: Heart, className: 'ambient ambient--four' },
]

export function AmbientDecorations() {
  return (
    <div className="ambient-layer" aria-hidden="true">
      {decorations.map(({ Icon, className }) => (
        <Icon key={className} className={className} strokeWidth={1.5} />
      ))}
    </div>
  )
}
