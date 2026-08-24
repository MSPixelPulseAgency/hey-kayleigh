export const profileCards = [
  {
    icon: 'care',
    title: 'Future PSW',
    copy: 'Of course you chose a caring career. Pretty face, even prettier heart.',
    tone: 'peach',
    note: 'that softness looks good on you',
  },
  {
    icon: 'softball',
    title: 'Softball girl',
    copy: 'You being cute and competitive feels wildly unfair to me.',
    tone: 'lavender',
    note: 'I’d still cheer the loudest',
  },
  {
    icon: 'music',
    title: 'Music person',
    copy: 'Send me the song that feels most like you. I’ll listen like it’s a clue.',
    tone: 'blush',
    note: 'your aux seat is reserved',
  },
  {
    icon: 'location',
    title: 'Brampton',
    copy: 'Close enough for this flirting to become an actual plan.',
    tone: 'cream',
    note: 'distance is not my excuse',
  },
  {
    icon: 'height',
    title: `5'7"`,
    copy: 'And somehow you still take up way too much space in my head.',
    tone: 'rose',
    note: 'rent is very overdue',
  },
  {
    icon: 'school',
    title: 'New Humber adventure',
    copy: 'New chapter, pretty girl. I’m hoping I get a few pages.',
    tone: 'butter',
    note: 'I really like my timing',
  },
]

export const assessmentItems = [
  { label: 'That genuine energy', note: 'you feel refreshingly real' },
  { label: 'Talking to you', note: 'one message becomes ten way too easily' },
  { label: 'Your sense of humour', note: 'you make flirting with you ridiculously easy' },
  { label: 'Those piercings', note: 'you knew exactly what they were doing, didn’t you?' },
  {
    label: 'Final verdict',
    note: 'I definitely want more of your time—preferably in person',
  },
]

export const classifiedItems = [
  'your forever food order',
  'the song that instantly gets you',
  'what makes that pretty face blush',
  'your after-midnight personality',
  'the laugh I’m trying to earn',
  'what our first hangout turns into',
  'everything I’d rather learn sitting next to you',
]

export const storySections = [
  { id: 'intro', label: 'For you' },
  { id: 'the-file', label: 'Things I noticed' },
  { id: 'assessment', label: 'My verdict' },
  { id: 'classified', label: 'Still curious' },
  { id: 'touch-game', label: 'Catch me' },
  { id: 'genuine', label: 'Real talk' },
  { id: 'invitation', label: 'Your move' },
  { id: 'final-card', label: 'One last thing' },
]

export const stockPhotos = [
  {
    id: 'care',
    label: 'your soft side',
    note: 'pretty heart energy',
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
    label: 'your game-day side',
    note: 'cute looks competitive on you',
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
    label: 'your soundtrack',
    note: 'send me your favourite',
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
    label: 'your next chapter',
    note: 'I like this timing',
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
    label: 'BBQ with me 👀',
    heading: 'Okayyy… my favourite plot twist.',
    copy: 'Good food, good music, and you looking cute across from me. I can work with that.',
    status: 'Cozy plan selected. I’m already smiling.',
  },
  {
    id: 'public',
    icon: 'public',
    label: 'A cute public date ☕',
    heading: 'A proper first date? I like your style.',
    copy: 'Coffee, food, or a walk—somewhere I can make you laugh and try not to stare.',
    status: 'Comfort first. Chemistry can handle the rest.',
  },
  {
    id: 'later',
    icon: 'later',
    label: 'A little later 🤍',
    heading: 'Worth waiting for.',
    copy: 'Take your time, beautiful. The invite stays open whenever it feels right.',
    status: 'No pressure. I’ll keep the charm ready.',
  },
]
