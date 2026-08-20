import type { Metadata } from 'next'

import { PageRenderer } from '@/components/PageRenderer'
import { fetchSettings } from '@/lib/fetch-settings'
import { fetchNavItems } from '@/lib/navigation'
import type { PageData } from '@/lib/types'
import { projectId } from '@/sanity/lib/env'
import { sanityFetch } from '@/sanity/lib/live'
import { SUPERVISION_PAGE_QUERY } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Supervision',
}

export default async function SupervisionPage() {
  const [settings, navItems] = await Promise.all([fetchSettings(), fetchNavItems()])
  let page: PageData | null = null

  if (projectId) {
    const { data } = await sanityFetch<typeof SUPERVISION_PAGE_QUERY>({
      query: SUPERVISION_PAGE_QUERY,
    })
    page = data as PageData | null
  }

  return (
    <PageRenderer
      page={page}
      settings={settings}
      navItems={navItems}
      currentPath="/supervision"
    />
  )
}
