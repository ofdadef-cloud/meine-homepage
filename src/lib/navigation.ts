import type { NavItem } from '@/lib/navigation-defaults'
import { projectId } from '@/sanity/lib/env'
import { sanityFetch } from '@/sanity/lib/live'
import { ALL_PAGES_NAV_QUERY } from '@/sanity/lib/queries'

const coreNavItems: NavItem[] = [
  { href: '/', label: 'Startseite' },
  { href: '/supervision', label: 'Supervision' },
  { href: '/ueber-mich', label: 'Über mich' },
  { href: '/kontakt', label: 'Kontakt' },
]

export type { NavItem } from '@/lib/navigation-defaults'
export { defaultNavItems } from '@/lib/navigation-defaults'

export async function fetchNavItems(): Promise<NavItem[]> {
  const knownHrefs = new Set(coreNavItems.map((item) => item.href))
  const items: NavItem[] = [
    { href: '/', label: 'Startseite' },
    { href: '/supervision', label: 'Supervision' },
  ]

  if (projectId) {
    const { data } = await sanityFetch<typeof ALL_PAGES_NAV_QUERY>({
      query: ALL_PAGES_NAV_QUERY,
      stega: false,
    })

    const pages = (data ?? []) as Array<{ title?: string; slug?: string }>

    for (const page of pages) {
      if (!page.slug) {
        continue
      }

      const href = `/${page.slug}`

      if (knownHrefs.has(href)) {
        continue
      }

      items.push({ href, label: page.title ?? page.slug })
      knownHrefs.add(href)
    }
  }

  items.push({ href: '/ueber-mich', label: 'Über mich' })
  items.push({ href: '/kontakt', label: 'Kontakt' })

  return items
}
