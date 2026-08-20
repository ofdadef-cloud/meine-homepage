export type CookieCategory = 'necessary' | 'functional'

export type CookieConsent = {
  necessary: true
  functional: boolean
  policyVersion: string
  updatedAt: string
}

export const COOKIE_CONSENT_NAME = 'cookie_consent_v1'
export const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 365
export const COOKIE_CONSENT_POLICY_VERSION = '2026-07-18'

export const defaultConsent: CookieConsent = {
  necessary: true,
  functional: false,
  policyVersion: COOKIE_CONSENT_POLICY_VERSION,
  updatedAt: '',
}

export const cookieCategories: Array<{
  id: CookieCategory
  title: string
  description: string
  required?: boolean
}> = [
  {
    id: 'necessary',
    title: 'Notwendig',
    description:
      'Diese Cookies sind für den Betrieb der Website erforderlich, z. B. zur Speicherung Ihrer Cookie-Einstellungen (Cookie-Name: cookie_consent_v1, Speicherdauer: 12 Monate).',
    required: true,
  },
  {
    id: 'functional',
    title: 'Funktional',
    description:
      'Diese Cookies ermöglichen den Spam-Schutz (Cloudflare Turnstile) im Kontaktformular. Ohne diese Einwilligung kann das Kontaktformular nicht genutzt werden.',
  },
]

export const cookieBannerCopy = {
  title: 'Cookie-Einstellungen',
  intro:
    'Wir verwenden Cookies und ähnliche Technologien. Notwendige Cookies sind für den Betrieb der Website erforderlich. Funktionale Cookies (Cloudflare Turnstile) setzen wir nur mit Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TDDDG ein. Sie können Ihre Einwilligung jederzeit widerrufen.',
  privacyLinkLabel: 'Datenschutzerklärung',
  acceptAll: 'Alle akzeptieren',
  rejectAll: 'Alle ablehnen',
  saveSelection: 'Auswahl speichern',
  customize: 'Einstellungen',
  footerLabel: 'Cookie-Einstellungen',
}

export function parseConsent(value: string | null | undefined): CookieConsent | null {
  if (!value) {
    return null
  }

  try {
    const parsed = JSON.parse(value) as Partial<CookieConsent>

    return {
      necessary: true,
      functional: Boolean(parsed.functional),
      policyVersion: parsed.policyVersion ?? '',
      updatedAt: parsed.updatedAt ?? '',
    }
  } catch {
    return null
  }
}

export function serializeConsent(
  consent: Omit<CookieConsent, 'updatedAt' | 'policyVersion'>,
): CookieConsent {
  return {
    ...consent,
    necessary: true,
    policyVersion: COOKIE_CONSENT_POLICY_VERSION,
    updatedAt: new Date().toISOString(),
  }
}

export function hasConsentChoice(consent: CookieConsent | null): consent is CookieConsent {
  return (
    Boolean(consent?.updatedAt) &&
    consent?.policyVersion === COOKIE_CONSENT_POLICY_VERSION
  )
}
