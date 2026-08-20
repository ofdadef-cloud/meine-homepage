import type { Metadata } from 'next'

import { PageRenderer } from '@/components/PageRenderer'
import { fetchSettings } from '@/lib/fetch-settings'
import { fetchNavItems } from '@/lib/navigation'
import type { PageData } from '@/lib/types'
import { projectId } from '@/sanity/lib/env'
import { sanityFetch } from '@/sanity/lib/live'
import { PAGE_BY_SLUG_QUERY } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Über mich',
}

export default async function UeberMichPage() {
  const [settings, navItems] = await Promise.all([fetchSettings(), fetchNavItems()])
  let page: PageData | null = null

  if (projectId) {
    const { data } = await sanityFetch<typeof PAGE_BY_SLUG_QUERY>({
      query: PAGE_BY_SLUG_QUERY,
      params: { slug: 'ueber-mich' },
    })
    page = data as PageData | null
  }

  return (
    <PageRenderer
      page={page}
      settings={settings}
      navItems={navItems}
      currentPath="/ueber-mich"
    />
  )
}
