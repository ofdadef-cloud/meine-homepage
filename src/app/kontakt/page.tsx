import type { Metadata } from 'next'

import { ContactForm } from '@/components/ContactForm'
import { PageRenderer } from '@/components/PageRenderer'
import { fetchSettings } from '@/lib/fetch-settings'
import { fetchNavItems } from '@/lib/navigation'
import type { PageData } from '@/lib/types'
import { projectId } from '@/sanity/lib/env'
import { sanityFetch } from '@/sanity/lib/live'
import { CONTACT_PAGE_QUERY } from '@/sanity/lib/queries'

type KontaktPageProps = {
  searchParams: Promise<{ anliegen?: string }>
}

export const metadata: Metadata = {
  title: 'Kontakt',
}

export default async function KontaktPage({ searchParams }: KontaktPageProps) {
  const { anliegen } = await searchParams
  const defaultSubject =
    anliegen === 'erstgespraech' ? 'Erstgespräch vereinbaren' : undefined
  const contactFormEnabled = process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED !== 'false'
  const [settings, navItems] = await Promise.all([fetchSettings(), fetchNavItems()])
  let page: PageData | null = null

  if (projectId) {
    const { data } = await sanityFetch<typeof CONTACT_PAGE_QUERY>({
      query: CONTACT_PAGE_QUERY,
    })
    page = data as PageData | null
  }

  return (
    <PageRenderer page={page} settings={settings} navItems={navItems} currentPath="/kontakt">
      <section
        id="kontaktformular"
        className="scroll-mt-28 border-t border-black/5 bg-[var(--color-cream)] px-6 py-20"
      >
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
          {contactFormEnabled ? (
            <>
              <h2 className="font-display text-2xl text-[var(--color-charcoal)]">
                Nachricht senden
              </h2>
              <p className="mt-3 text-[var(--color-taupe)]">
                Alternativ zum E-Mail-Link können Sie uns hier direkt schreiben.
              </p>
              <div className="mt-8">
                <ContactForm defaultSubject={defaultSubject} />
              </div>
            </>
          ) : (
            <>
              <h2 className="font-display text-2xl text-[var(--color-charcoal)]">
                Kontakt per E-Mail
              </h2>
              <p className="mt-3 leading-7 text-[var(--color-taupe)]">
                Das Kontaktformular ist vorübergehend nicht verfügbar. Schreiben Sie mir gerne
                direkt eine E-Mail.
              </p>
              <a
                href="mailto:aldohaumann@gmail.com"
                className="btn-pill mt-8 bg-[#111111] text-white hover:bg-[#333333]"
              >
                E-Mail schreiben
              </a>
            </>
          )}
        </div>
      </section>
    </PageRenderer>
  )
}
