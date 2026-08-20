import { NextResponse } from 'next/server'

import {
  sendContactEmail,
  validateContactPayload,
  verifyTurnstileToken,
} from '@/lib/contact'

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, string>
    const validation = validateContactPayload(payload)

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const remoteIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      undefined

    const captcha = await verifyTurnstileToken(
      validation.data.turnstileToken,
      remoteIp,
    )

    if (!captcha.ok) {
      return NextResponse.json({ error: captcha.error }, { status: 400 })
    }

    const email = await sendContactEmail(validation.data)

    if (!email.ok) {
      console.info('[contact]', validation.data)
      return NextResponse.json(
        {
          error:
            'Nachricht wurde validiert, aber der E-Mail-Versand ist noch nicht eingerichtet. Bitte RESEND_API_KEY und CONTACT_TO_EMAIL setzen.',
        },
        { status: 503 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: 'Beim Senden ist ein Fehler aufgetreten.' },
      { status: 500 },
    )
  }
}
