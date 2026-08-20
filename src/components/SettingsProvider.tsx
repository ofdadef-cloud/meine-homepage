'use client'

import { createContext, useContext } from 'react'

import type { SettingsData } from '@/lib/types'

const SettingsContext = createContext<SettingsData | null>(null)

export function SettingsProvider({
  settings,
  children,
}: {
  settings: SettingsData | null
  children: React.ReactNode
}) {
  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  return useContext(SettingsContext)
}
