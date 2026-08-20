import Link from 'next/link'

import { CookieSettingsButton } from '@/components/cookie-consent/CookieBanner'

export function SiteFooter({
  siteTitle,
  contactInfo,
}: {
  siteTitle?: string
  contactInfo?: Array<{ text?: string; link?: string }>
}) {
  return (
    <footer className="mt-auto border-t border-black/5 bg-[var(--color-footer)] text-[var(--color-snow)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] uppercase">
            {siteTitle ?? 'ALDO HAUMANN'}
          </p>
          {contactInfo?.length ? (
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-cream)]">
              {contactInfo.map((item) => (
                <li key={item.link ?? item.text}>
                  {item.link ? (
                    <a href={item.link} className="underline underline-offset-4">
                      {item.text}
                    </a>
                  ) : (
                    item.text
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/impressum" className="text-[var(--color-cream)] hover:text-white">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-[var(--color-cream)] hover:text-white">
              Datenschutz
            </Link>
            <CookieSettingsButton />
          </div>
          <p className="text-[var(--color-sage)]">
            © {new Date().getFullYear()} {siteTitle ?? 'ALDO HAUMANN'}
          </p>
        </div>
      </div>
    </footer>
  )
}
