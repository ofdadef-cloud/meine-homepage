import type { Metadata } from 'next'

import { PrivacyFallbackContent } from '@/components/legal/LegalFallbackContent'
import { PortableTextContent } from '@/components/PortableTextContent'
import { SiteLayout } from '@/components/SiteLayout'
import { fetchSettings } from '@/lib/fetch-settings'
import { fetchNavItems } from '@/lib/navigation'
import { hasPortableTextContent } from '@/lib/legal-defaults'
import { localizedBlocks } from '@/lib/locale'
import { siteColorsToCssVars } from '@/lib/site-colors'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
}

export default async function DatenschutzPage() {
  const [settings, navItems] = await Promise.all([fetchSettings(), fetchNavItems()])
  const content = localizedBlocks(settings ?? {}, 'privacyContent', 'de')
  const hasCmsContent = hasPortableTextContent(content)

  return (
    <SiteLayout
      siteTitle={settings?.title}
      currentPath="/datenschutz"
      navItems={navItems}
      contactInfo={settings?.contactInfo}
      style={siteColorsToCssVars(settings?.siteColors)}
    >
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-[2rem] border border-black/5 bg-white p-8 md:p-12">
          <h1 className="heading-display text-4xl text-[var(--color-charcoal)] md:text-5xl">
            Datenschutzerklärung
          </h1>
          <div className="mt-10">
            {hasCmsContent ? (
              <PortableTextContent value={content} />
            ) : (
              <PrivacyFallbackContent settings={settings} />
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
