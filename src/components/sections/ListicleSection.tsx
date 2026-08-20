import Link from 'next/link'

import { localizedString, type Locale } from '@/lib/locale'
import { isExternalUrl, resolveInternalUrl } from '@/lib/urls'
import type { SectionBlock } from '@/lib/types'

type ListicleItem = SectionBlock & {
  title?: string
  title_de?: string
  description?: string
  description_de?: string
  linkText?: string
  linkText_de?: string
  linkUrl?: string
}

function ListicleLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const resolved = resolveInternalUrl(href)

  if (isExternalUrl(resolved)) {
    return (
      <a href={resolved} className="font-medium underline underline-offset-4">
        {children}
      </a>
    )
  }

  return (
    <Link href={resolved} className="font-medium underline underline-offset-4">
      {children}
    </Link>
  )
}

export function ListicleSection({
  block,
  locale = 'de',
}: {
  block: SectionBlock
  locale?: Locale
}) {
  const heading = localizedString(block, 'heading', locale)
  const intro = localizedString(block, 'intro', locale)
  const style = localizedString(block, 'style', locale) ?? 'numbered'
  const items = (block.items as ListicleItem[] | undefined) ?? []
  const introBullets =
    items.length === 0 && intro
      ? intro
          .split(/\n+/)
          .map((line) => line.trim().replace(/^[-–•]\s*/, ''))
          .filter(Boolean)
      : []
  const showIntroAsBullets = introBullets.length > 1

  return (
    <section className="bg-[var(--color-snow)] px-6 py-20">
      <div className="mx-auto max-w-4xl">
        {heading ? (
          <h2 className="font-display text-center text-3xl text-[var(--color-charcoal)] md:text-4xl">
            {heading}
          </h2>
        ) : null}
        {intro && !showIntroAsBullets ? (
          <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-center text-lg leading-8 text-[var(--color-taupe)]">
            {intro}
          </p>
        ) : null}

        {showIntroAsBullets ? (
          <ul className="mx-auto mt-12 max-w-4xl space-y-4">
            {introBullets.map((bullet, index) => (
              <li
                key={`${index}-${bullet.slice(0, 24)}`}
                className="group grid grid-cols-[2.75rem_1fr] gap-4 rounded-2xl border border-black/6 bg-white/70 px-5 py-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-white md:grid-cols-[3.5rem_1fr] md:gap-6 md:px-7 md:py-6"
              >
                <span
                  aria-hidden="true"
                  className="font-display flex size-10 items-center justify-center rounded-full border border-[var(--color-sage)]/55 text-lg text-[var(--color-forest)] md:size-12 md:text-xl"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="self-center text-base leading-8 text-[var(--color-taupe)] md:text-lg">
                  {bullet}
                </p>
              </li>
            ))}
          </ul>
        ) : null}

        {items.length ? (
          <ol className={`mt-12 ${style === 'numbered' ? 'space-y-0' : 'space-y-8'}`}>
          {items.map((item, index) => {
            const title = localizedString(item, 'title', locale)
            const description = localizedString(item, 'description', locale)
            const linkText = localizedString(item, 'linkText', locale)
            const linkUrl = localizedString(item, 'linkUrl', locale)
            const number = String(index + 1).padStart(2, '0')

            return (
              <li
                key={item._key}
                className={
                  style === 'numbered'
                    ? 'grid gap-5 border-t border-black/8 py-10 first:border-t-0 first:pt-0 md:grid-cols-[5rem_1fr] md:gap-8'
                    : 'border-t border-black/8 pt-8 first:border-t-0 first:pt-0'
                }
              >
                {style === 'numbered' ? (
                  <span
                    aria-hidden="true"
                    className="font-display text-4xl leading-none text-[var(--color-sage)] md:text-5xl"
                  >
                    {number}
                  </span>
                ) : (
                  <span className="mb-3 block h-1.5 w-10 rounded-full bg-[var(--color-forest)]" />
                )}

                <div>
                  <h3 className="font-display text-2xl text-[var(--color-charcoal)] md:text-[1.65rem]">
                    {title}
                  </h3>
                  {description ? (
                    <p className="mt-3 text-base leading-8 text-[var(--color-taupe)] md:text-lg">
                      {description}
                    </p>
                  ) : null}
                  {linkText && linkUrl ? (
                    <p className="mt-4">
                      <ListicleLink href={linkUrl}>{linkText}</ListicleLink>
                    </p>
                  ) : null}
                </div>
              </li>
            )
          })}
          </ol>
        ) : null}
      </div>
    </section>
  )
}
