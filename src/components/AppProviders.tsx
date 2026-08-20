'use client'

import { CookieBanner } from '@/components/cookie-consent/CookieBanner'
import { CookieConsentProvider } from '@/components/cookie-consent/CookieConsentProvider'
import { SettingsProvider } from '@/components/SettingsProvider'
import type { SettingsData } from '@/lib/types'

export function AppProviders({
  children,
  settings,
}: {
  children: React.ReactNode
  settings: SettingsData | null
}) {
  return (
    <SettingsProvider settings={settings}>
      <CookieConsentProvider>
        {children}
        <CookieBanner />
      </CookieConsentProvider>
    </SettingsProvider>
  )
}
