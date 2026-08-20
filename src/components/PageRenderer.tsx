import { PageSections } from '@/components/PageSections'
import { SiteLayout } from '@/components/SiteLayout'
import { siteColorsToCssVars } from '@/lib/site-colors'
import type { PageRendererProps } from '@/lib/types'

export function PageRenderer({
  page,
  settings,
  locale = 'de',
  currentPath,
  navItems,
  children,
}: PageRendererProps & { children?: React.ReactNode }) {
  const headerVariant = page?.sections?.[0]?._type === 'hero' ? 'overlay' : 'solid'

  return (
    <SiteLayout
      siteTitle={settings?.title}
      currentPath={currentPath}
      navItems={navItems}
      headerVariant={headerVariant}
      style={siteColorsToCssVars(settings?.siteColors)}
      contactInfo={settings?.contactInfo}
    >
      <PageSections sections={page?.sections} locale={locale} />
      {children}
    </SiteLayout>
  )
}
