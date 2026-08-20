'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  COOKIE_CONSENT_MAX_AGE,
  COOKIE_CONSENT_NAME,
  defaultConsent,
  hasConsentChoice,
  parseConsent,
  serializeConsent,
  type CookieConsent,
} from '@/lib/cookie-consent'

type CookieConsentContextValue = {
  consent: CookieConsent | null
  showBanner: boolean
  openSettings: () => void
  closeSettings: () => void
  acceptAll: () => void
  rejectAll: () => void
  saveSelection: (selection: { functional: boolean }) => void
  hasFunctionalConsent: boolean
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null)

function readConsentCookie(): CookieConsent | null {
  if (typeof document === 'undefined') {
    return null
  }

  const match = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${COOKIE_CONSENT_NAME}=`))

  if (!match) {
    return null
  }

  return parseConsent(decodeURIComponent(match.split('=')[1]))
}

function writeConsentCookie(consent: CookieConsent) {
  const value = encodeURIComponent(JSON.stringify(consent))
  const secure =
    typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : ''

  document.cookie = `${COOKIE_CONSENT_NAME}=${value}; Path=/; Max-Age=${COOKIE_CONSENT_MAX_AGE}; SameSite=Lax${secure}`
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    const stored = readConsentCookie()
    setConsent(stored)
    setShowBanner(!hasConsentChoice(stored))
  }, [])

  const persist = useCallback((next: CookieConsent) => {
    writeConsentCookie(next)
    setConsent(next)
    setShowBanner(false)
    setSettingsOpen(false)
  }, [])

  const acceptAll = useCallback(() => {
    persist(
      serializeConsent({
        necessary: true,
        functional: true,
      }),
    )
  }, [persist])

  const rejectAll = useCallback(() => {
    persist(
      serializeConsent({
        necessary: true,
        functional: false,
      }),
    )
  }, [persist])

  const saveSelection = useCallback(
    (selection: { functional: boolean }) => {
      persist(
        serializeConsent({
          necessary: true,
          functional: selection.functional,
        }),
      )
    },
    [persist],
  )

  const value = useMemo(
    () => ({
      consent,
      showBanner: showBanner || settingsOpen,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
      acceptAll,
      rejectAll,
      saveSelection,
      hasFunctionalConsent: Boolean(consent?.functional),
    }),
    [acceptAll, consent, rejectAll, saveSelection, settingsOpen, showBanner],
  )

  return (
    <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext)

  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider')
  }

  return context
}

export function useOptionalCookieConsent() {
  return useContext(CookieConsentContext)
}
