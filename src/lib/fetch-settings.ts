import type { SettingsData } from '@/lib/types'
import { projectId } from '@/sanity/lib/env'
import { sanityFetch } from '@/sanity/lib/live'
import { SETTINGS_QUERY } from '@/sanity/lib/queries'

export async function fetchSettings() {
  if (!projectId) {
    return null
  }

  const { data } = await sanityFetch<typeof SETTINGS_QUERY>({
    query: SETTINGS_QUERY,
    stega: false,
  })

  return data as SettingsData | null
}
