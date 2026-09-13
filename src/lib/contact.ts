export type ContactPayload = {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  turnstileToken: string
  privacyConsent: boolean
}

export function validateContactPayload(payload: Partial<ContactPayload>) {
  const name = payload.name?.trim()
  const email = payload.email?.trim()
  const message = payload.message?.trim()
  const turnstileToken = payload.turnstileToken?.trim()

  if (!name || name.length < 2) {
    return { ok: false as const, error: 'Bitte gib deinen Namen an.' }
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false as const, error: 'Bitte gib eine gültige E-Mail-Adresse an.' }
  }

  if (!message || message.length < 10) {
    return { ok: false as const, error: 'Bitte schreibe eine etwas ausführlichere Nachricht.' }
  }

  if (!turnstileToken) {
    return { ok: false as const, error: 'Captcha-Bestätigung fehlt.' }
  }

  if (!payload.privacyConsent) {
    return {
      ok: false as const,
      error: 'Bitte bestätigen Sie die Datenschutzerklärung.',
    }
  }

  return {
    ok: true as const,
    data: {
      name,
      email,
      phone: payload.phone?.trim() || undefined,
      subject: payload.subject?.trim() || 'Kontaktanfrage',
      message,
      turnstileToken,
      privacyConsent: true,
    },
  }
}

export async function verifyTurnstileToken(token: string, remoteIp?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    return { ok: false as const, error: 'Captcha ist serverseitig nicht konfiguriert.' }
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  })

  if (remoteIp) {
    body.set('remoteip', remoteIp)
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })

  const result = (await response.json()) as { success?: boolean }

  if (!result.success) {
    return { ok: false as const, error: 'Captcha-Prüfung fehlgeschlagen.' }
  }

  return { ok: true as const }
}

export async function sendContactEmail(payload: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  const to = process.env.CONTACT_TO_EMAIL
  const resendKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL ?? 'Kontaktformular <onboarding@resend.dev>'

  if (!to || !resendKey) {
    return { ok: false as const, error: 'E-Mail-Versand ist noch nicht konfiguriert.' }
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `[Website] ${payload.subject}`,
      text: [
        `Name: ${payload.name}`,
        `E-Mail: ${payload.email}`,
        payload.phone ? `Telefon: ${payload.phone}` : null,
        `Betreff: ${payload.subject}`,
        '',
        payload.message,
      ]
        .filter(Boolean)
        .join('\n'),
    }),
  })

  if (!response.ok) {
    return { ok: false as const, error: 'E-Mail konnte nicht gesendet werden.' }
  }

  const confirmationResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [payload.email],
      reply_to: to,
      subject: 'Ihre Nachricht ist bei Aldo Haumann eingegangen',
      text: [
        `Hallo ${payload.name},`,
        '',
        'vielen Dank für Ihre Nachricht. Sie ist gut bei mir angekommen.',
        'Ich melde mich so bald wie möglich bei Ihnen zurück.',
        '',
        'Herzliche Grüße',
        'Aldo Haumann',
      ].join('\n'),
    }),
  })

  return { ok: true as const, confirmationSent: confirmationResponse.ok }
}
