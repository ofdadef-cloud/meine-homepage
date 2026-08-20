import type { Locale } from '@/lib/locale'

export type SiteColors = {
  charcoal?: string
  cream?: string
  footer?: string
  forest?: string
  sage?: string
  snow?: string
  taupe?: string
}

export type SettingsData = {
  title?: string
  description?: string
  logo?: { asset?: { _ref?: string } }
  siteColors?: SiteColors
  contactInfo?: Array<{ _key?: string; text?: string; link?: string }>
  cookieBannerEnabled?: boolean
  cookieBannerHeading?: string
  cookieBannerHeading_de?: string
  cookieBannerText?: string
  cookieBannerText_de?: string
  cookieBannerAcceptAll?: string
  cookieBannerAcceptAll_de?: string
  cookieBannerRejectAll?: string
  cookieBannerRejectAll_de?: string
  cookieBannerPrivacyLinkText?: string
  cookieBannerPrivacyLinkText_de?: string
  imprintContent?: Array<Record<string, unknown>>
  imprintContent_de?: Array<Record<string, unknown>>
  privacyContent?: Array<Record<string, unknown>>
  privacyContent_de?: Array<Record<string, unknown>>
}

export type SectionBlock = Record<string, unknown> & {
  _key: string
  _type: string
}

export type PageData = {
  title?: string
  sections?: SectionBlock[]
}

export type PageRendererProps = {
  page: PageData | null
  settings: SettingsData | null
  locale?: Locale
  currentPath?: string
  navItems?: Array<{ href: string; label: string }>
}
