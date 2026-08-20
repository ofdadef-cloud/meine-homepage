'use client'

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { useCookieConsent } from '@/components/cookie-consent/CookieConsentProvider'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm({ defaultSubject }: { defaultSubject?: string }) {
  const turnstileRef = useRef<TurnstileInstance>(null)
  const { hasFunctionalConsent, openSettings } = useCookieConsent()
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage(null)

    if (!turnstileToken) {
      setErrorMessage('Bitte bestätigen Sie das Captcha.')
      setFormState('error')
      return
    }

    const formData = new FormData(event.currentTarget)
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      subject: String(formData.get('subject') ?? ''),
      message: String(formData.get('message') ?? ''),
      turnstileToken,
      privacyConsent: formData.get('privacyConsent') === 'on',
    }

    setFormState('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(result.error ?? 'Nachricht konnte nicht gesendet werden.')
      }

      setFormState('success')
      event.currentTarget.reset()
      setTurnstileToken(null)
      turnstileRef.current?.reset()
    } catch (error) {
      setFormState('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Nachricht konnte nicht gesendet werden.',
      )
      turnstileRef.current?.reset()
      setTurnstileToken(null)
    }
  }

  if (formState === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8">
        <h2 className="text-xl font-semibold text-emerald-900">Vielen Dank!</h2>
        <p className="mt-3 leading-7 text-emerald-800">
          Ihre Nachricht wurde gesendet. Ich melde mich so schnell wie möglich bei Ihnen.
        </p>
        <button
          type="button"
          onClick={() => setFormState('idle')}
          className="mt-6 rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
        >
          Weitere Nachricht senden
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Name *</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[var(--color-forest)]"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">E-Mail *</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[var(--color-forest)]"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Telefon</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[var(--color-forest)]"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Betreff</span>
          <input
            name="subject"
            type="text"
            defaultValue={defaultSubject ?? 'Erstgespräch vereinbaren'}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[var(--color-forest)]"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">Nachricht *</span>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[var(--color-forest)]"
          placeholder="Worum geht es? Wann sind Sie am besten erreichbar?"
        />
      </label>

      {siteKey && hasFunctionalConsent ? (
        <Turnstile
          ref={turnstileRef}
          siteKey={siteKey}
          onSuccess={setTurnstileToken}
          onExpire={() => setTurnstileToken(null)}
          onError={() => {
            setTurnstileToken(null)
            setErrorMessage('Captcha konnte nicht geladen werden.')
            setFormState('error')
          }}
          options={{ theme: 'light', size: 'normal' }}
        />
      ) : siteKey ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-7 text-amber-950">
          Für den Spam-Schutz benötigen wir Ihre Einwilligung zu funktionalen Cookies.{' '}
          <button
            type="button"
            onClick={openSettings}
            className="font-medium underline underline-offset-4"
          >
            Cookie-Einstellungen öffnen
          </button>
        </div>
      ) : null}

      {errorMessage ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMessage}
        </p>
      ) : null}

      <label className="flex items-start gap-3 rounded-xl border border-black/10 bg-white px-4 py-4">
        <input
          name="privacyConsent"
          type="checkbox"
          required
          value="on"
          className="mt-1 size-4 shrink-0 rounded border-stone-300"
        />
        <span className="text-sm leading-6 text-[var(--color-taupe)]">
          Ich habe die{' '}
          <Link href="/datenschutz" className="underline underline-offset-4">
            Datenschutzerklärung
          </Link>{' '}
          gelesen und willige in die Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage ein. *
        </span>
      </label>

      <button
        type="submit"
        disabled={formState === 'submitting' || !siteKey || !hasFunctionalConsent}
        className="inline-flex rounded-full bg-[var(--color-forest)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {formState === 'submitting' ? 'Wird gesendet…' : 'Nachricht senden'}
      </button>
    </form>
  )
}
