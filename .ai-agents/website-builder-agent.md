# Website Builder Agent — Hey Kayleigh

## Project identity

- Brand: Hey Kayleigh
- Format: one-page romantic editorial scrapbook microsite
- Contact details: none; do not add contact information without explicit approval
- Stack: React, Vite, Framer Motion, Lucide React, responsive CSS

## Page structure

Preserve this order: Hero, Kayleigh File, Assessment, Classified, Touch Me Game, Genuine Note, Hangout Invite, Final Card. The full experience should remain short enough for roughly 1–2 minutes.

## Build rules

- Keep components focused and reusable.
- Keep all important buttons at least 44px tall, keyboard reachable, and visibly focused.
- Preserve 320px through 1440px responsive behavior with no horizontal overflow.
- Use `clamp()` for fluid type and spacing, local optimized images, and `prefers-reduced-motion` fallbacks.
- Use Lucide icons for controls; do not substitute emoji for interface icons.

## Content, SEO, and demo safety

- Metadata title: `A little something for Kayleigh`.
- Metadata description: `One tiny website. One spontaneous question.`
- Keep one clear H1 and logical section headings.
- Never add a surname, phone number, exact workplace, address, private chat, private screenshot, health information, family details, or unapproved real photo.
- Stock subjects must never be described or implied as Kayleigh.

## What not to edit

Do not turn the invitation into a form, remove any choice, move important response buttons, autoplay audio, add countdowns, or reuse the game mechanic for consent. Preserve image credits and privacy copy.

## Deployment

Run `npm run lint` and `npm run build`, inspect every supported breakpoint and interaction, then deploy the repository root to Vercel project `hey-kayleigh` with output directory `dist`.
