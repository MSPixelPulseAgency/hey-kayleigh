export const profileCards = [
  {
    icon: 'care',
    title: 'Future PSW',
    copy: 'Care-forward, kind-hearted, campus-ready.',
    tone: 'peach',
    note: 'good human energy',
  },
  {
    icon: 'softball',
    title: 'Softball girl',
    copy: 'Competitive streak: quietly noted.',
    tone: 'lavender',
    note: 'probably keeps score',
  },
  {
    icon: 'music',
    title: 'Music person',
    copy: 'The playlist lore is still pending.',
    tone: 'blush',
    note: 'aux privileges: TBD',
  },
  {
    icon: 'location',
    title: 'Brampton',
    copy: 'Representing the 905, naturally.',
    tone: 'cream',
    note: 'local intel acquired',
  },
  {
    icon: 'height',
    title: `5'7" of trouble apparently`,
    copy: 'A completely unbiased assessment.',
    tone: 'rose',
    note: 'citation needed',
  },
  {
    icon: 'school',
    title: 'New Humber adventure',
    copy: 'North Campus chapter: just beginning.',
    tone: 'butter',
    note: 'main-character semester',
  },
]

export const assessmentItems = [
  { label: 'Genuine energy', note: 'first impression: very solid' },
  { label: 'Easy to talk to', note: 'conversation, minus the awkward loading screen' },
  { label: 'Respectful', note: 'rare, noticed, appreciated' },
  { label: 'Cute piercings', note: 'a respectfully observed detail' },
  {
    label: 'Making me suspiciously excited to meet you',
    note: 'keeping this at a normal level, promise',
  },
]

export const classifiedItems = [
  'favourite food',
  'favourite music',
  'dream place to visit',
  'what makes her laugh',
  'best late-night conversation topic',
  'first hangout',
  'everything else worth discovering in person',
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

export const inviteChoices = [
  {
    id: 'bbq',
    icon: 'bbq',
    label: 'BBQ & chill sounds fun',
    heading: 'Okayyy, now I’m actually excited.',
    copy: 'Let’s figure out timing together — and we’ll keep it completely chill.',
    extra:
      'If we both feel like having a beer/drink or smoking, cool — totally optional, zero pressure.',
  },
  {
    id: 'public',
    icon: 'public',
    label: 'Public first meetup',
    heading: 'Honestly, perfect.',
    copy: 'Coffee, food or a little walk first — you pick the vibe.',
  },
  {
    id: 'later',
    icon: 'later',
    label: 'Another day',
    heading: 'Absolutely.',
    copy: 'No rush at all. I’m still glad you made it to the end of my ridiculous little website.',
  },
]
