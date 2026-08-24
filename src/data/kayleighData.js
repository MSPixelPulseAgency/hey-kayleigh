export const profileCards = [
  {
    icon: 'care',
    title: 'Future PSW',
    copy: 'Sweet career choice… kinda matches the girl.',
    tone: 'peach',
    note: 'good heart energy',
  },
  {
    icon: 'softball',
    title: 'Softball girl',
    copy: 'Cute AND competitive? Yeah, that could be trouble.',
    tone: 'lavender',
    note: 'dangerously good combo',
  },
  {
    icon: 'music',
    title: 'Music person',
    copy: 'Your playlist still has to pass my vibe check.',
    tone: 'blush',
    note: 'aux privileges: pending',
  },
  {
    icon: 'location',
    title: 'Brampton',
    copy: 'Way too conveniently close 😂',
    tone: 'cream',
    note: 'local trouble confirmed',
  },
  {
    icon: 'height',
    title: `5'7\"`,
    copy: 'So I still get to look down at you a little… noted 😌',
    tone: 'rose',
    note: 'tiny height flex detected',
  },
  {
    icon: 'school',
    title: 'New Humber adventure',
    copy: 'New chapter. I may have appeared suspiciously early in it.',
    tone: 'butter',
    note: 'good timing? maybe',
  },
]

export const assessmentItems = [
  { label: 'Genuine', note: 'dangerously refreshing' },
  { label: 'Easy to talk to', note: 'probably why I’m still here' },
  { label: 'Funny', note: 'you’re making flirting suspiciously easy' },
  { label: 'Those piercings', note: 'yeah… I noticed. Obviously.' },
  {
    label: 'Overall conclusion',
    note: 'I definitely need to investigate you in person',
  },
]

export const classifiedItems = [
  'favourite food',
  'music taste',
  'what makes you blush',
  'late-night personality',
  'what makes you laugh most',
  'our first hangout',
  'the rest of you I’d rather discover naturally',
]

export const storySections = [
  { id: 'intro', label: 'Intro' },
  { id: 'the-file', label: 'The file' },
  { id: 'assessment', label: 'Assessment' },
  { id: 'classified', label: 'Classified' },
  { id: 'touch-game', label: 'The game' },
  { id: 'genuine', label: 'Genuine moment' },
  { id: 'invitation', label: 'The question' },
  { id: 'final-card', label: 'Final note' },
]

export const stockPhotos = [
  {
    id: 'care',
    label: 'future care',
    note: 'kindness looks good',
    src: '/images/care-700.webp',
    srcSet: '/images/care-700.webp 700w, /images/care-1400.webp 1400w',
    alt: 'Generic stock photo of a caregiver offering reassuring support to an older adult',
    source: 'https://www.pexels.com/photo/elderly-care-at-home-compassionate-support-29372724/',
    credit: 'Jsme MILA / Pexels',
    className: 'photo-card--care',
    rotate: -4,
  },
  {
    id: 'softball',
    label: 'game-day energy',
    note: 'softball: confirmed',
    src: '/images/softball-700.webp',
    srcSet: '/images/softball-700.webp 700w, /images/softball-1400.webp 1400w',
    alt: 'Generic stock photo of a softball player holding a ball on an outdoor field',
    source: 'https://www.pexels.com/photo/woman-holding-a-ball-on-a-sports-field-12819299/',
    credit: 'Arturo Añez / Pexels',
    className: 'photo-card--softball',
    rotate: 4,
  },
  {
    id: 'music',
    label: 'soundtrack pending',
    note: 'playlist lore needed',
    src: '/images/music-700.webp',
    srcSet: '/images/music-700.webp 700w, /images/music-1400.webp 1400w',
    alt: 'Generic stock photo of pink headphones resting on a pastel desk',
    source: 'https://www.pexels.com/photo/close-up-photo-of-a-pink-headphones-11743786/',
    credit: 'Towfiqu barbhuiya / Pexels',
    className: 'photo-card--music',
    rotate: 3,
  },
  {
    id: 'campus',
    label: 'new chapter',
    note: 'campus era loading',
    src: '/images/campus-700.webp',
    srcSet: '/images/campus-700.webp 700w, /images/campus-1400.webp 1400w',
    alt: 'Generic stock photo of college students walking outside a brick campus building',
    source: 'https://www.pexels.com/photo/college-students-walking-together-7972535/',
    credit: 'George Pak / Pexels',
    className: 'photo-card--campus',
    rotate: -3,
  },
]

export const styleReferencePhoto = {
  id: 'piercing-style',
  src: '/images/piercing-style-700.webp',
  srcSet: '/images/piercing-style-700.webp 700w, /images/piercing-style-1400.webp 1400w',
  alt: 'Generic adult stock model with a nose ring and lower-lip piercing, smiling with eyes closed',
  source: 'https://www.pexels.com/photo/a-young-woman-with-a-nose-ring-and-lip-piercing-6690224/',
  credit: 'Joshua Abner / Pexels',
}

export const visualCredits = [...stockPhotos, styleReferencePhoto]

export const inviteChoices = [
  {
    id: 'bbq',
    icon: 'bbq',
    label: 'BBQ & chill 👀',
    heading: 'Ohhh… brave choice.',
    copy: 'Now I actually have to impress you in person? That wasn’t part of my plan 😂',
    status: 'Come cute. Come hungry. I’ll figure out the rest.',
  },
  {
    id: 'public',
    icon: 'public',
    label: 'Behave. Public first 😂',
    heading: 'Probably the responsible choice.',
    copy: 'Coffee, food or a walk. Although I make absolutely no promises about behaving 😌',
    status: 'Easy, comfortable, and still a little dangerous.',
  },
  {
    id: 'later',
    icon: 'later',
    label: 'Make me wait 😌',
    heading: 'Playing hard to get already?',
    copy: 'Fineeee 😂 Take your time. Good things deserve a little anticipation anyway.',
    status: 'No pressure. Curiosity stays alive.',
  },
]
