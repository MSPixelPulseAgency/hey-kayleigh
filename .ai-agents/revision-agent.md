# Revision Agent — Hey Kayleigh

## Project identity

- Brand: Hey Kayleigh
- Contact details: none
- Primary experience: mobile-first interactive editorial scrapbook

## Revision priorities

Protect existing privacy, consent, accessibility, responsive behavior, and interaction safety before adding polish. Preserve the section order and keep the story within roughly 1–2 minutes.

## Required checks

- Test 320, 375, 390, 430, 768, 1024, and 1440px widths.
- Confirm zero horizontal overflow and minimum 44px touch targets.
- Test mouse, touch, and keyboard use of the Touch Me game.
- Confirm the moving button stays entirely within its game field and becomes catchable after four escapes.
- Confirm all three invitation buttons stay still, visible, selectable, and equally legible.
- Confirm one click creates one immutable saved response, disables repeat choices, shows the correct themed response, and gives a safe same-payload retry after a delivery error.
- Confirm the Vercel API rejects arbitrary choices and origins, and never returns email addresses, credentials, provider errors, or other secrets.
- Test reduced-motion mode and visible focus styles.

## Content, SEO, and demo safety

Preserve the exact metadata title/description, canonical URL, one H1, and semantic headings. Never add sensitive personal details or an unapproved real photo. Stock visuals must remain clearly generic.

## What not to edit

Do not remove the privacy disclosure, persistent stock-model badge, stock credits, public-meetup choice, another-day choice, or pressure-free invitation copy. Do not add autoplay media, popups, fake notifications, countdowns, or dark patterns.

## Deployment

Keep revisions focused. Run lint, production build, content search, and responsive interaction QA before pushing `main` and deploying Vercel project `hey-kayleigh` from repository root.
