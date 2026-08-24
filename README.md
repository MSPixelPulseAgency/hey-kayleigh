# Hey Kayleigh

A playful, privacy-conscious React microsite designed as a short interactive story for Kayleigh. The experience uses generic stock photography only; no real photo of Kayleigh is included or implied.

## Stack

- React + Vite
- Framer Motion
- Lucide React
- Mobile-first CSS with reduced-motion support
- Local responsive WebP stock images

## Local development

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
```

## Experience flow

1. Intro moodboard
2. The Kayleigh File
3. Current assessment
4. Still classified
5. Harmless Touch Me game
6. Genuine moment
7. Three-choice hangout invitation
8. Final card

## Privacy and consent guardrails

- Do not add Kayleigh's surname, phone number, exact workplace, address, family details, medical details, private screenshots, or private chat transcripts.
- Do not add a real photo without explicit approval for that exact asset.
- Never move, hide, reorder deceptively, or visually punish any invitation response.
- The escaping-button behavior belongs only to the harmless game.
- Keep alcohol or smoking references optional, neutral, and pressure-free.

## Stock visual credits

- [Caregiver support — Jsme MILA / Pexels](https://www.pexels.com/photo/elderly-care-at-home-compassionate-support-29372724/)
- [Softball player — Arturo Añez / Pexels](https://www.pexels.com/photo/woman-holding-a-ball-on-a-sports-field-12819299/)
- [Pink headphones — Towfiqu barbhuiya / Pexels](https://www.pexels.com/photo/close-up-photo-of-a-pink-headphones-11743786/)
- [College students — George Pak / Pexels](https://www.pexels.com/photo/college-students-walking-together-7972535/)

## Deployment

The production Vercel project is `hey-kayleigh`, built from repository root with `npm run build` and output directory `dist`.
