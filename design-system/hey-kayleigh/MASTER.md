# Hey Kayleigh — Design System

This file is the visual source of truth for the `hey-kayleigh` microsite. The project brief overrides generic style-database suggestions.

## Experience

- Product: a short, playful, interactive one-page story
- Audience context: mobile-first, casual, roughly 1–2 minutes
- Personality: sweet, funny, confident, genuine, never pressuring
- Visual language: premium editorial scrapbook with polished romantic details
- Density: airy but proportionate; never oversized on desktop
- Variance: asymmetric collage moments within stable readable layouts

## Palette

| Role | Token | Value |
| --- | --- | --- |
| Canvas | `--cream` | `#fffaf2` |
| Paper | `--paper` | `#fffdf9` |
| Blush | `--blush` | `#f5bfd7` |
| Peach | `--peach` | `#f3c8ca` |
| Lavender | `--lavender` | `#c9b8e9` |
| Pastel blue | `--pastel-blue` | `#bcc9f2` |
| Soft blue | `--blue-soft` | `#eef2ff` |
| Muted rose | `--rose` | `#c8799f` |
| Deep rose | `--rose-deep` | `#8d587b` |
| Plum action | `--cherry` | `#69426f` |
| Deep plum section | `--burgundy` | `#4d315f` |
| Primary text | `--charcoal` | `#342b3a` |
| Secondary text | `--muted` | `#706476` |

Use deep cherry/charcoal text on cream or white surfaces. Use cream primary text on burgundy surfaces. Never rely on color alone for state.

## Typography

- Display: Fraunces, 500–700
- Body/UI: DM Sans, 400–700
- Handwritten annotation: Caveat, 500–600
- Hero: fluid `clamp()` scale with 0.92–1.0 line-height
- Body: minimum 16px in primary reading copy with 1.5–1.75 line-height
- Keep long-form measure near 65 characters

## Spacing and shape

- Mobile gutter: 16px
- Tablet gutter: 24–40px
- Desktop shell: 1160px maximum
- Section spacing: roughly 74–115px fluid
- Touch spacing: 8px minimum
- Primary controls: 48px minimum height
- All controls: 44×44px minimum interactive area
- Card radii: 18–26px; featured editorial cards may use up to 48px

## Components

### Buttons

- Primary: burgundy pill, cream text, compact shadow
- Important decision choices never move
- Selected choices use border, background, icon, and `aria-pressed`; all choices lock after the one final submission
- Press feedback may use a tiny scale or elevation change without shifting adjacent content
- Focus ring: 3px cherry, 4px offset

### Cards

- Paper-like surface with subtle rose border
- Use the defined three-level shadow scale
- Hover lift: 3–7px only where pointer hover exists
- Text and controls remain readable without hover

### Stock moodboard

- Every stock image must explicitly use generic alt text
- Never imply a stock subject is Kayleigh
- Keep local 700px and 1400px WebP variants with `srcset` and declared dimensions
- Only the first hero image is eager/high-priority; other images are lazy
- The adult piercing-style reference keeps a persistent `stock model · not Kayleigh` badge at every breakpoint

### Final response delivery

- Show the themed response immediately, separate from email delivery status
- Persist one immutable submission ID, choice ID, and timestamp before sending
- Retry only the exact saved payload and provider idempotency key
- Keep recipients, senders, credentials, and provider errors out of browser code and responses
- BBQ uses warm rising sparks, public-first uses lavender coffee steam, and another-day uses settling blue-violet stars

## Motion

- Section reveal: opacity + translate, 450–650ms
- Micro-interactions: 150–300ms
- Card stagger: 40–70ms per item
- The game uses transform-based spring motion and stays inside its dedicated field
- Decorative drift is subtle, slow, and non-interactive
- Dreamy smoke motion uses transform/opacity only and becomes static under reduced motion
- No scroll hijacking, autoplay, intrusive popups, or blocking animations
- All motion must resolve immediately under `prefers-reduced-motion: reduce`

## Responsive rules

Test at 320, 375, 390, 430, 768, 1024, and 1440px.

- No horizontal overflow
- Collage stays two-column on phones but fits inside the content gutter
- Content cards become one column on small phones
- Assessment and game layouts stack below 900px
- Invitation choices remain three compact columns on tablet and stack below 720px
- Use `100svh`/fluid content rather than fixed mobile viewport heights
- Avoid awkward image crops; use declared aspect ratios and `object-fit: cover`

## Accessibility

- Semantic sectioning, one H1, sequential headings
- Descriptive image alt text and labels for icon-only meaning
- Keyboard-visible focus rings and a skip link
- Lucide icons for UI; emoji may appear only when explicitly part of supplied copy
- Live regions announce game and invitation results
- The Touch Me game is keyboard-catchable without forced escapes
- The three invitation choices must remain normal, still, equally reachable buttons

## Safety and privacy

- No surname, phone, workplace, address, family/living information, medical details, private screenshots, or private chat transcripts
- No real photo without explicit approval for that exact public asset
- No manipulative countdowns, guilt copy, fake notifications, or hidden decline option
- Never reuse the escaping-button mechanic for consent, invitations, or important actions
- Public-first and another-day responses must remain positive and pressure-free

## Pre-delivery checklist

- [ ] Lint, API tests, and production build pass
- [ ] No horizontal overflow at all required breakpoints
- [ ] All controls are at least 44px
- [ ] Focus states and semantic order are intact
- [ ] Reduced motion is implemented in React and CSS
- [ ] Images are optimized, attributed, and clearly generic
- [ ] Four game escapes remain in bounds; the next attempt is catchable
- [ ] All three invitation responses render uniquely, lock after one choice, and expose a safe retry state
- [ ] Server rejects arbitrary choices/origins and missing email configuration fails gracefully
- [ ] No prohibited personal information appears in source or UI
- [ ] Canonical production assets and metadata load successfully
