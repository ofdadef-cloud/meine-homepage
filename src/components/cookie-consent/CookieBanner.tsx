'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useSettings } from '@/components/SettingsProvider'
import {
  cookieBannerCopy,
  cookieCategories,
  hasConsentChoice,
} from '@/lib/cookie-consent'
import { localizedString } from '@/lib/locale'
import { useCookieConsent } from './CookieConsentProvider'

export function CookieBanner() {
  const settings = useSettings()
  const { consent, showBanner, acceptAll, rejectAll, saveSelection, closeSettings } =
    useCookieConsent()
  const [selection, setSelection] = useState({ functional: false })
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (consent) {
      setSelection({
        functional: consent.functional,
      })
    }
  }, [consent])

  useEffect(() => {
    if (showBanner && hasConsentChoice(consent)) {
      setShowDetails(true)
    }
  }, [consent, showBanner])

  if (!showBanner) {
    return null
  }

  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
  if (settings?.cookieBannerEnabled === false && !turnstileEnabled) {
    return null
  }

  const title =
    localizedString(settings ?? {}, 'cookieBannerHeading', 'de') ?? cookieBannerCopy.title
  const intro =
    localizedString(settings ?? {}, 'cookieBannerText', 'de') ?? cookieBannerCopy.intro
  const privacyLinkLabel =
    localizedString(settings ?? {}, 'cookieBannerPrivacyLinkText', 'de') ??
    cookieBannerCopy.privacyLinkLabel
  const rejectAllLabel =
    localizedString(settings ?? {}, 'cookieBannerRejectAll', 'de') ?? cookieBannerCopy.rejectAll
  const acceptAllLabel =
    localizedString(settings ?? {}, 'cookieBannerAcceptAll', 'de') ?? cookieBannerCopy.acceptAll

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
    >
      <div className="mx-auto max-w-3xl rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl shadow-stone-900/10">
        <h2 id="cookie-banner-title" className="text-lg font-semibold text-stone-900">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-stone-600">
          {intro}{' '}
          <Link href="/datenschutz" className="font-medium underline underline-offset-4">
            {privacyLinkLabel}
          </Link>
          .
        </p>

        {showDetails ? (
          <div className="mt-5 space-y-4">
            {cookieCategories
              .filter((category) => !category.required)
              .map((category) => (
              <div
                key={category.id}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-stone-900">{category.title}</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">
                      {category.description}
                    </p>
                  </div>
                  <label className="flex shrink-0 items-center gap-2 text-sm text-stone-700">
                    <input
                      type="checkbox"
                      checked={selection.functional}
                      onChange={(event) =>
                        setSelection({ functional: event.target.checked })
                      }
                      className="size-4 rounded border-stone-300 text-brand focus:ring-brand"
                    />
                    Aktiv
                  </label>
                </div>
              </div>
            ))}
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-stone-900">Notwendig</p>
                  <p className="mt-1 text-sm leading-6 text-stone-600">
                    {
                      cookieCategories.find((category) => category.id === 'necessary')
                        ?.description
                    }
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-stone-200 px-3 py-1 text-xs font-medium text-stone-700">
                  Immer aktiv
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={rejectAll}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-800 transition hover:bg-stone-50"
          >
            {rejectAllLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              if (showDetails) {
                saveSelection(selection)
              } else {
                setShowDetails(true)
              }
            }}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-800 transition hover:bg-stone-50"
          >
            {showDetails ? cookieBannerCopy.saveSelection : cookieBannerCopy.customize}
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-dark"
          >
            {acceptAllLabel}
          </button>
        </div>

        {showDetails ? (
          <button
            type="button"
            onClick={() => {
              if (hasConsentChoice(consent)) {
                closeSettings()
              } else {
                setShowDetails(false)
              }
            }}
            className="mt-4 text-sm text-stone-500 underline underline-offset-4"
          >
            {hasConsentChoice(consent) ? 'Schließen' : 'Zurück'}
          </button>
        ) : null}
      </div>
    </div>
  )
}

export function CookieSettingsButton() {
  const { openSettings } = useCookieConsent()

  return (
    <button
      type="button"
      onClick={openSettings}
      className="text-sm text-[var(--color-cream)] transition hover:text-white"
    >
      {cookieBannerCopy.footerLabel}
    </button>
  )
}
