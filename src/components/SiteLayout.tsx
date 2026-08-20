import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function SiteLayout({
  siteTitle,
  currentPath,
  contactInfo,
  style,
  headerVariant = 'solid',
  navItems,
  children,
}: {
  siteTitle?: string
  currentPath?: string
  contactInfo?: Array<{ text?: string; link?: string }>
  style?: React.CSSProperties
  headerVariant?: 'solid' | 'overlay'
  navItems?: Array<{ href: string; label: string }>
  children: React.ReactNode
}) {
  return (
    <div
      className={`flex min-h-screen flex-col bg-[var(--color-snow)] text-[var(--color-charcoal)] ${
        headerVariant === 'overlay' ? 'relative' : ''
      }`}
      style={style}
    >
      <SiteHeader
        siteTitle={siteTitle}
        currentPath={currentPath}
        navItems={navItems}
        variant={headerVariant}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter siteTitle={siteTitle} contactInfo={contactInfo} />
    </div>
  )
}
