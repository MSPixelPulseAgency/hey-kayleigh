# Hey Kayleigh

A playful, privacy-conscious React microsite designed as a short interactive story for Kayleigh. The experience uses generic stock photography only; no real photo of Kayleigh is included or implied.

## Stack

- React + Vite
- Framer Motion
- Lucide React
- Mobile-first CSS with reduced-motion support
- Local responsive WebP stock images
- Vercel Function + Resend email notification
- Provider-backed idempotency and browser-safe retry state

## Local development

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm test
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
- Do not add alcohol or smoking copy without explicit approval.

## Stock visual credits

- [Caregiver support — Jsme MILA / Pexels](https://www.pexels.com/photo/elderly-care-at-home-compassionate-support-29372724/)
- [Softball player — Arturo Añez / Pexels](https://www.pexels.com/photo/woman-holding-a-ball-on-a-sports-field-12819299/)
- [Pink headphones — Towfiqu barbhuiya / Pexels](https://www.pexels.com/photo/close-up-photo-of-a-pink-headphones-11743786/)
- [College students — George Pak / Pexels](https://www.pexels.com/photo/college-students-walking-together-7972535/)
- [Piercing-style stock model — Joshua Abner / Pexels](https://www.pexels.com/photo/a-young-woman-with-a-nose-ring-and-lip-piercing-6690224/)

## Email configuration

The invitation posts only a server-validated choice ID, immutable submission ID, and timestamp to `/api/response`. Configure these as Vercel server environment variables; never use a `VITE_` prefix:

- `RESEND_API_KEY`
- `RESPONSE_EMAIL_TO`
- `RESPONSE_EMAIL_FROM`
- `SITE_ORIGIN=https://hey-kayleigh.vercel.app`

The Resend sender must use a verified sending domain for normal production delivery. Identical retries use the same provider idempotency key for 24-hour duplicate protection.

The Vercel project also uses the `Protect Kayleigh responses` WAF rule: only six `POST /api/response` requests per IP are allowed in each 10-minute window. Preserve this rule when changing the endpoint.

## Deployment

The production Vercel project is `hey-kayleigh`, built from repository root with `npm run build` and output directory `dist`.
