# Deployment Agent — Hey Kayleigh

## Project identity

- GitHub repository: `MSPixelPulseAgency/hey-kayleigh`
- Branch: `main`
- Vercel project: `hey-kayleigh`
- Target URL: `https://hey-kayleigh.vercel.app`
- Root directory: `./`
- Build command: `npm run build`
- Output directory: `dist`
- Contact details: none

## Pre-deployment checks

Run `npm install`, `npm run lint`, `npm test`, `npm run build`, and `git diff --check`. Search for prohibited personal details and unrelated demo references. Verify the full section structure, local responsive WebP images, metadata, and all interactions.

Before a production response test, confirm the project has server-only `RESEND_API_KEY`, `RESPONSE_EMAIL_TO`, `RESPONSE_EMAIL_FROM`, and `SITE_ORIGIN` variables. Never print their values. Missing email configuration must remain a graceful `503`, never a fake success.

Keep the Vercel WAF rule `Protect Kayleigh responses` enabled and published. It rate-limits `POST /api/response` to six requests per IP per 10-minute window; inspect it before changing the API path or submission flow.

## Production verification

Check the exact canonical alias, home page, JavaScript and CSS assets, `robots.txt`, `sitemap.xml`, favicon, and Open Graph image. Inspect 320, 375, 390, 430, 768, 1024, and 1440px layouts with no horizontal overflow. Test the game and all invitation visuals. Use a controlled production submission only when inbox access is available, then confirm exactly one provider event and one received email.

## Demo safety and what not to edit

Never deploy sensitive personal details, private screenshots, private chats, an unapproved real photo, or changes that make any response harder to choose. Never reuse the escaping-button behavior for consent or invitation choices.

## Release rules

Commit only scoped project files, push cleanly to `main`, deploy only the confirmed `hey-kayleigh` Vercel project, and report the GitHub URL, canonical production URL, build result, and exact commit SHA.
