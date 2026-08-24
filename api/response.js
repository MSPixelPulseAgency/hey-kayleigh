import { Resend } from 'resend'

const MAX_BODY_BYTES = 2048
const MAX_SUBMISSION_AGE_MS = 24 * 60 * 60 * 1000
const MAX_FUTURE_SKEW_MS = 5 * 60 * 1000

export const RESPONSE_CHOICES = Object.freeze({
  bbq: {
    label: 'BBQ & chill',
    note: 'She picked the cozy BBQ, music and talking option.',
  },
  public: {
    label: 'Public first meetup',
    note: 'She picked coffee, food or a little walk in public first.',
  },
  later: {
    label: 'Another day',
    note: 'She would rather save the hangout for another day.',
  },
})

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function sendJson(res, status, body) {
  res.setHeader('Cache-Control', 'no-store')
  return res.status(status).json(body)
}

function getHeader(req, name) {
  const value = req.headers?.[name.toLowerCase()]
  return Array.isArray(value) ? value[0] : value
}

function getRequestOrigin(req) {
  const host = getHeader(req, 'x-forwarded-host') || getHeader(req, 'host')
  const protocol = getHeader(req, 'x-forwarded-proto') || (host?.startsWith('localhost') ? 'http' : 'https')
  return host ? `${protocol}://${host}` : null
}

function getAllowedOrigins(req) {
  const origins = new Set()
  const requestOrigin = getRequestOrigin(req)
  if (requestOrigin) origins.add(requestOrigin)

  for (const candidate of [
    process.env.SITE_ORIGIN,
    process.env.VERCEL_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ]) {
    if (!candidate) continue
    origins.add(candidate.startsWith('http') ? candidate : `https://${candidate}`)
  }

  return origins
}

function hasValidOrigin(req) {
  if (getHeader(req, 'sec-fetch-site') === 'cross-site') return false
  const origin = getHeader(req, 'origin')
  return Boolean(origin && getAllowedOrigins(req).has(origin))
}

function parseBody(req) {
  const contentLength = Number(getHeader(req, 'content-length') || 0)
  if (contentLength > MAX_BODY_BYTES) return { error: 'too_large' }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const serialized = JSON.stringify(body ?? {})
    if (Buffer.byteLength(serialized, 'utf8') > MAX_BODY_BYTES) return { error: 'too_large' }
    return { body }
  } catch {
    return { error: 'invalid_json' }
  }
}

function validateSubmission(body, now) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null

  const allowedKeys = new Set(['submissionId', 'choiceId', 'submittedAt', 'website'])
  if (Object.keys(body).some((key) => !allowedKeys.has(key))) return null

  const { submissionId, choiceId, submittedAt, website = '' } = body
  if (typeof website !== 'string') return null
  if (website.trim()) return { honeypot: true }
  if (typeof submissionId !== 'string' || !uuidPattern.test(submissionId)) return null
  if (typeof choiceId !== 'string' || !RESPONSE_CHOICES[choiceId]) return null
  if (typeof submittedAt !== 'string') return null

  const timestamp = Date.parse(submittedAt)
  if (!Number.isFinite(timestamp)) return null
  if (timestamp < now - MAX_SUBMISSION_AGE_MS || timestamp > now + MAX_FUTURE_SKEW_MS) return null

  return {
    submissionId,
    choiceId,
    submittedAt: new Date(timestamp).toISOString(),
  }
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function buildEmail(submission, config) {
  const choice = RESPONSE_CHOICES[submission.choiceId]
  const torontoTime = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto',
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(new Date(submission.submittedAt))

  const label = escapeHtml(choice.label)
  const note = escapeHtml(choice.note)
  const isoTime = escapeHtml(submission.submittedAt)
  const localTime = escapeHtml(torontoTime)

  return {
    message: {
      from: config.from,
      to: [config.to],
      subject: `Kayleigh chose: ${choice.label}`,
      text: [
        'A response was submitted on Hey Kayleigh.',
        '',
        `Choice: ${choice.label}`,
        `Details: ${choice.note}`,
        `Submitted: ${torontoTime}`,
        `ISO time: ${submission.submittedAt}`,
        `Submission ID: ${submission.submissionId}`,
      ].join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;padding:28px;color:#3f294d;background:#fffaf2;border:1px solid #eadcf0;border-radius:20px">
          <p style="margin:0 0 8px;color:#8a65a8;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">Hey Kayleigh response</p>
          <h1 style="margin:0 0 18px;font-size:28px;line-height:1.15;color:#4d315f">${label}</h1>
          <p style="margin:0 0 20px;font-size:16px;line-height:1.6">${note}</p>
          <div style="padding:16px;background:#f7eefb;border-radius:14px">
            <p style="margin:0 0 6px"><strong>Toronto time:</strong> ${localTime}</p>
            <p style="margin:0 0 6px"><strong>ISO time:</strong> ${isoTime}</p>
            <p style="margin:0;font-size:12px;color:#76637e"><strong>Submission ID:</strong> ${escapeHtml(submission.submissionId)}</p>
          </div>
        </div>
      `,
    },
    idempotencyKey: `kayleigh-choice/${submission.submissionId}`,
  }
}

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const to = process.env.RESPONSE_EMAIL_TO?.trim()
  const from = process.env.RESPONSE_EMAIL_FROM?.trim()
  return apiKey && to && from ? { apiKey, to, from } : null
}

async function sendWithResend({ apiKey, message, idempotencyKey }) {
  const resend = new Resend(apiKey)
  return resend.emails.send(message, { idempotencyKey })
}

export function createResponseHandler({ sendEmail = sendWithResend, now = () => Date.now() } = {}) {
  return async function responseHandler(req, res) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return sendJson(res, 405, { ok: false, message: 'Method not allowed.' })
    }

    if (!String(getHeader(req, 'content-type') || '').toLowerCase().startsWith('application/json')) {
      return sendJson(res, 415, { ok: false, message: 'JSON is required.' })
    }

    if (!hasValidOrigin(req)) {
      return sendJson(res, 403, { ok: false, message: 'Request origin was not accepted.' })
    }

    const parsed = parseBody(req)
    if (parsed.error === 'too_large') {
      return sendJson(res, 413, { ok: false, message: 'Request is too large.' })
    }
    if (parsed.error) {
      return sendJson(res, 400, { ok: false, message: 'Invalid request.' })
    }

    const submission = validateSubmission(parsed.body, now())
    if (!submission) {
      return sendJson(res, 400, { ok: false, message: 'That response could not be validated.' })
    }
    if (submission.honeypot) {
      return sendJson(res, 200, { ok: true, submittedAt: parsed.body.submittedAt })
    }

    const config = getEmailConfig()
    if (!config) {
      return sendJson(res, 503, {
        ok: false,
        retryable: true,
        message: 'Notification delivery is not configured yet.',
      })
    }

    const email = buildEmail(submission, config)

    try {
      const result = await sendEmail({
        apiKey: config.apiKey,
        message: email.message,
        idempotencyKey: email.idempotencyKey,
      })

      if (result?.error) {
        const providerName = String(result.error.name || '')
        const providerStatus = Number(result.error.statusCode || 0)
        const retryable =
          providerName === 'concurrent_idempotent_requests' ||
          providerStatus === 429 ||
          providerStatus >= 500

        return sendJson(res, retryable ? 503 : 502, {
          ok: false,
          retryable,
          message: retryable
            ? 'Delivery is taking a moment. Your saved response can be retried safely.'
            : 'The response was saved in this browser, but email delivery failed.',
        })
      }

      return sendJson(res, 200, {
        ok: true,
        choiceId: submission.choiceId,
        submittedAt: submission.submittedAt,
      })
    } catch {
      return sendJson(res, 503, {
        ok: false,
        retryable: true,
        message: 'Delivery is taking a moment. Your saved response can be retried safely.',
      })
    }
  }
}

export default createResponseHandler()
