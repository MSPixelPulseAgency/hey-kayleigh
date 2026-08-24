import assert from 'node:assert/strict'
import { afterEach, beforeEach, describe, it } from 'node:test'
import { createResponseHandler, RESPONSE_CHOICES } from '../api/response.js'

const fixedNow = Date.parse('2026-08-24T18:30:00.000Z')
const validBody = {
  submissionId: '0d40a57c-0bc1-4a55-bf4d-d9a02f0b8666',
  choiceId: 'bbq',
  submittedAt: '2026-08-24T18:29:00.000Z',
  website: '',
}

const savedEnv = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESPONSE_EMAIL_TO: process.env.RESPONSE_EMAIL_TO,
  RESPONSE_EMAIL_FROM: process.env.RESPONSE_EMAIL_FROM,
  SITE_ORIGIN: process.env.SITE_ORIGIN,
}

function makeRequest(body = validBody, overrides = {}) {
  const serialized = typeof body === 'string' ? body : JSON.stringify(body)
  return {
    method: 'POST',
    body,
    ...overrides,
    headers: {
      host: 'hey-kayleigh.vercel.app',
      origin: 'https://hey-kayleigh.vercel.app',
      'content-type': 'application/json',
      'content-length': String(Buffer.byteLength(serialized)),
      'sec-fetch-site': 'same-origin',
      'x-forwarded-proto': 'https',
      ...overrides.headers,
    },
  }
}

function makeResponse() {
  return {
    headers: {},
    statusCode: 200,
    payload: null,
    setHeader(name, value) {
      this.headers[name] = value
    },
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.payload = payload
      return this
    },
  }
}

async function run(handler, req) {
  const res = makeResponse()
  await handler(req, res)
  return res
}

beforeEach(() => {
  process.env.RESEND_API_KEY = 'test-api-key'
  process.env.RESPONSE_EMAIL_TO = 'owner@example.com'
  process.env.RESPONSE_EMAIL_FROM = 'Hey Kayleigh <notify@example.com>'
  process.env.SITE_ORIGIN = 'https://hey-kayleigh.vercel.app'
})

afterEach(() => {
  for (const [key, value] of Object.entries(savedEnv)) {
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
})

describe('POST /api/response', () => {
  it('sends a server-owned choice and timestamp with a stable idempotency key', async () => {
    const calls = []
    const handler = createResponseHandler({
      now: () => fixedNow,
      sendEmail: async (payload) => {
        calls.push(payload)
        return { data: { id: 'email_123' } }
      },
    })

    const first = await run(handler, makeRequest())
    const retry = await run(handler, makeRequest())

    assert.equal(first.statusCode, 200)
    assert.equal(retry.statusCode, 200)
    assert.equal(calls.length, 2)
    assert.equal(calls[0].idempotencyKey, `kayleigh-choice/${validBody.submissionId}`)
    assert.deepEqual(calls[0], calls[1])
    assert.match(calls[0].message.subject, /BBQ & chill/)
    assert.match(calls[0].message.text, /2026-08-24T18:29:00.000Z/)
    assert.deepEqual(calls[0].message.to, ['owner@example.com'])
  })

  it('maps every accepted choice on the server', async () => {
    const subjects = []
    const handler = createResponseHandler({
      now: () => fixedNow,
      sendEmail: async ({ message }) => {
        subjects.push(message.subject)
        return { data: { id: `email_${subjects.length}` } }
      },
    })

    for (const [index, choiceId] of Object.keys(RESPONSE_CHOICES).entries()) {
      const body = {
        ...validBody,
        submissionId: `0d40a57c-0bc1-4a55-8f4d-d9a02f0b866${index}`,
        choiceId,
      }
      const res = await run(handler, makeRequest(body))
      assert.equal(res.statusCode, 200)
    }

    assert.deepEqual(subjects, [
      'Kayleigh chose: BBQ & chill',
      'Kayleigh chose: Public first meetup',
      'Kayleigh chose: Another day',
    ])
  })

  it('rejects cross-origin, malformed and arbitrary submissions before sending', async () => {
    let calls = 0
    const handler = createResponseHandler({
      now: () => fixedNow,
      sendEmail: async () => {
        calls += 1
        return { data: { id: 'unexpected' } }
      },
    })

    const crossOrigin = await run(
      handler,
      makeRequest(validBody, {
        headers: {
          origin: 'https://example.com',
          'sec-fetch-site': 'cross-site',
        },
      }),
    )
    const badChoice = await run(handler, makeRequest({ ...validBody, choiceId: 'surprise' }))
    const badId = await run(handler, makeRequest({ ...validBody, submissionId: 'not-a-uuid' }))
    const extraField = await run(handler, makeRequest({ ...validBody, recipient: 'other@example.com' }))

    assert.equal(crossOrigin.statusCode, 403)
    assert.equal(badChoice.statusCode, 400)
    assert.equal(badId.statusCode, 400)
    assert.equal(extraField.statusCode, 400)
    assert.equal(calls, 0)
  })

  it('treats the honeypot as a generic success without sending', async () => {
    let calls = 0
    const handler = createResponseHandler({
      now: () => fixedNow,
      sendEmail: async () => {
        calls += 1
      },
    })

    const res = await run(handler, makeRequest({ ...validBody, website: 'spam.example' }))

    assert.equal(res.statusCode, 200)
    assert.equal(res.payload.ok, true)
    assert.equal(calls, 0)
  })

  it('returns a graceful retryable error when email configuration is missing', async () => {
    delete process.env.RESEND_API_KEY
    const handler = createResponseHandler({ now: () => fixedNow })
    const res = await run(handler, makeRequest())

    assert.equal(res.statusCode, 503)
    assert.equal(res.payload.retryable, true)
    assert.doesNotMatch(JSON.stringify(res.payload), /owner@example|notify@example|test-api-key/)
  })

  it('returns retryable provider failures without leaking provider details', async () => {
    const handler = createResponseHandler({
      now: () => fixedNow,
      sendEmail: async () => ({
        error: { name: 'concurrent_idempotent_requests', message: 'private provider detail' },
      }),
    })
    const res = await run(handler, makeRequest())

    assert.equal(res.statusCode, 503)
    assert.equal(res.payload.retryable, true)
    assert.doesNotMatch(JSON.stringify(res.payload), /private provider detail/)
  })

  it('marks permanent provider failures as non-retryable without leaking details', async () => {
    const handler = createResponseHandler({
      now: () => fixedNow,
      sendEmail: async () => ({
        error: { name: 'validation_error', statusCode: 422, message: 'private provider detail' },
      }),
    })
    const res = await run(handler, makeRequest())

    assert.equal(res.statusCode, 502)
    assert.equal(res.payload.retryable, false)
    assert.doesNotMatch(JSON.stringify(res.payload), /private provider detail/)
  })

  it('enforces method, content type, time window and body size', async () => {
    const handler = createResponseHandler({ now: () => fixedNow })
    const wrongMethod = await run(handler, makeRequest(validBody, { method: 'GET' }))
    const wrongType = await run(
      handler,
      makeRequest(validBody, { headers: { 'content-type': 'text/plain' } }),
    )
    const stale = await run(
      handler,
      makeRequest({ ...validBody, submittedAt: '2026-08-22T18:29:00.000Z' }),
    )
    const oversized = await run(
      handler,
      makeRequest(validBody, { headers: { 'content-length': '5000' } }),
    )

    assert.equal(wrongMethod.statusCode, 405)
    assert.equal(wrongType.statusCode, 415)
    assert.equal(stale.statusCode, 400)
    assert.equal(oversized.statusCode, 413)
  })
})
