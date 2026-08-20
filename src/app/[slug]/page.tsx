import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageRenderer } from '@/components/PageRenderer'
import { fetchSettings } from '@/lib/fetch-settings'
import { fetchNavItems } from '@/lib/navigation'
import type { PageData } from '@/lib/types'
import { projectId } from '@/sanity/lib/env'
import { sanityFetch } from '@/sanity/lib/live'
import { ALL_PAGE_SLUGS_QUERY, PAGE_BY_SLUG_QUERY } from '@/sanity/lib/queries'

type DynamicPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  if (!projectId) {
    return []
  }

  const { data } = await sanityFetch<typeof ALL_PAGE_SLUGS_QUERY>({
    query: ALL_PAGE_SLUGS_QUERY,
    stega: false,
  })

  const pages = (data ?? []) as Array<{ slug?: string }>

  return pages
    .filter((page) => page.slug && page.slug !== 'ueber-mich')
    .map((page) => ({ slug: page.slug! }))
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params

  if (!projectId) {
    return { title: slug }
  }

  const { data } = await sanityFetch<typeof PAGE_BY_SLUG_QUERY>({
    query: PAGE_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  })

  const page = data as PageData | null

  return {
    title: page?.title ?? slug,
  }
}

export default async function DynamicSanityPage({ params }: DynamicPageProps) {
  const { slug } = await params
  const [settings, navItems] = await Promise.all([fetchSettings(), fetchNavItems()])
  let page: PageData | null = null

  if (projectId) {
    const { data } = await sanityFetch<typeof PAGE_BY_SLUG_QUERY>({
      query: PAGE_BY_SLUG_QUERY,
      params: { slug },
    })
    page = data as PageData | null
  }

  if (!page) {
    notFound()
  }

  return (
    <PageRenderer
      page={page}
      settings={settings}
      navItems={navItems}
      currentPath={`/${slug}`}
    />
  )
}
