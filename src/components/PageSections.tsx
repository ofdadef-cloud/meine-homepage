import Link from 'next/link'

import { LightbulbValuesSection } from '@/components/sections/LightbulbValuesSection'
import { ListicleSection } from '@/components/sections/ListicleSection'
import { RotatingQuotesSection } from '@/components/sections/RotatingQuotesSection'
import { localizedBlocks, localizedString, type Locale } from '@/lib/locale'
import { isExternalUrl, resolveInternalUrl } from '@/lib/urls'
import type { SectionBlock } from '@/lib/types'
import { PortableTextContent } from '@/components/PortableTextContent'
import { SanityImage } from '@/components/SanityImage'

function CtaLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  const resolved = resolveInternalUrl(href)

  if (isExternalUrl(resolved)) {
    return (
      <a href={resolved} className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link href={resolved} className={className}>
      {children}
    </Link>
  )
}

function HeroSection({
  block,
  locale,
  hideCta = false,
}: {
  block: SectionBlock
  locale: Locale
  hideCta?: boolean
}) {
  const textLeft = localizedString(block, 'textLeft', locale)
  const textRight = localizedString(block, 'textRight', locale)
  const ctaText = localizedString(block, 'ctaText', locale)
  const ctaUrl = localizedString(block, 'ctaUrl', locale)

  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--color-forest)] text-white">
      <div className="absolute inset-0">
        <SanityImage
          image={block.image as { asset?: { _ref?: string } }}
          alt={textLeft ?? 'Hero'}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/45" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col justify-end px-8 pb-16 pt-40 lg:px-12 lg:pb-20 lg:pt-44">
        <div className="max-w-4xl">
          <h1 className="heading-display text-[clamp(3.5rem,11vw,7.5rem)] leading-[0.92] text-white">
            {textLeft}
          </h1>
          {textRight ? <p className="hero-subtitle mt-6 max-w-xl md:mt-8">{textRight}</p> : null}
          {!hideCta && ctaText && ctaUrl ? (
            <CtaLink href={ctaUrl} className="text-link mt-10 inline-flex text-white hover:text-white/80 md:mt-14">
              {ctaText}
            </CtaLink>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function TextImageSection({
  block,
  locale,
  relocatedCta,
}: {
  block: SectionBlock
  locale: Locale
  relocatedCta?: { text: string; url: string }
}) {
  const layout = localizedString(block, 'layout', locale) ?? 'textLeft'
  const text = localizedBlocks(block, 'text', locale)
  const heading = localizedString(block, 'headline', locale)
  const ctaText = localizedString(block, 'ctaText', locale)
  const ctaUrl = localizedString(block, 'ctaUrl', locale)
  const imageDisplay = localizedString(block, 'imageDisplay', locale) ?? 'standard'
  const imageFit = localizedString(block, 'imageFit', locale) ?? 'cover'
  const theme = localizedString(block, 'theme', locale) ?? 'light'
  const textPosition = localizedString(block, 'textPosition', locale)
  const imageLeft = layout === 'textRight'
  const isDark = theme === 'dark'
  const alignTop = textPosition === 'top'
  const headingUrl = relocatedCta?.url ?? ctaUrl

  return (
    <section
      className={`px-6 py-20 ${
        isDark ? 'bg-[var(--color-footer)] text-white' : 'bg-[var(--color-snow)]'
      }`}
    >
      <div
        className={`mx-auto grid max-w-6xl gap-10 md:grid-cols-12 ${
          alignTop ? 'md:items-start' : 'md:items-center'
        }`}
      >
        <div className={`md:col-span-5 ${imageLeft ? 'md:order-2' : ''}`}>
          {heading ? (
            headingUrl ? (
              <CtaLink
                href={headingUrl}
                className={`font-display inline-block text-4xl transition hover:opacity-65 md:text-5xl ${
                  isDark ? 'text-white' : 'text-[var(--color-charcoal)]'
                }`}
              >
                {heading}
              </CtaLink>
            ) : (
              <h2
                className={`font-display text-4xl md:text-5xl ${
                  isDark ? 'text-white' : 'text-[var(--color-charcoal)]'
                }`}
              >
                {heading}
              </h2>
            )
          ) : null}
          <PortableTextContent value={text} variant={isDark ? 'light' : 'default'} />
          {relocatedCta ? (
            <CtaLink
              href={relocatedCta.url}
              className={`text-link mt-10 inline-flex hover:opacity-70 ${
                isDark ? 'text-white' : 'text-[var(--color-charcoal)]'
              }`}
            >
              {relocatedCta.text}
            </CtaLink>
          ) : null}
          {!relocatedCta && ctaText && ctaUrl ? (
            <CtaLink
              href={ctaUrl}
              className={`text-link mt-10 inline-flex hover:opacity-70 ${
                isDark ? 'text-white' : 'text-[var(--color-charcoal)]'
              }`}
            >
              {ctaText}
            </CtaLink>
          ) : null}
        </div>
        <div
          className={`relative min-h-[320px] md:col-span-7 ${
            imageDisplay === 'portrait'
              ? 'aspect-[2/3] min-h-[460px] md:min-h-0'
              : ''
          } ${imageLeft ? 'md:order-1' : ''}`}
        >
          <SanityImage
            image={block.image as { asset?: { _ref?: string } }}
            alt=""
            fill
            className={`rounded-2xl ${imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}

function FullWidthTextSection({ block, locale }: { block: SectionBlock; locale: Locale }) {
  const text = localizedBlocks(block, 'text', locale)

  return (
    <section className="bg-[var(--color-snow)] px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <PortableTextContent value={text} />
      </div>
    </section>
  )
}

function FullWidthImageSection({ block, locale }: { block: SectionBlock; locale: Locale }) {
  const alt = localizedString(block, 'alt', locale) ?? ''
  const imageSize = localizedString(block, 'imageSize', locale) ?? 'normal'

  return (
    <section className="bg-[var(--color-snow)] px-6 pb-20">
      <div
        className={`relative mx-auto aspect-[4/3] overflow-hidden rounded-3xl md:aspect-[16/9] ${
          imageSize === 'narrow' ? 'max-w-4xl' : 'max-w-6xl'
        }`}
      >
        <SanityImage
          image={block.image as { asset?: { _ref?: string } }}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </div>
    </section>
  )
}

function RotatingQuotesBlock({ block, locale }: { block: SectionBlock; locale: Locale }) {
  const quotes = Array.isArray(block.quotes)
    ? block.quotes.filter(
        (quote): quote is { _key?: string; quote_de?: string; author_de?: string } =>
          typeof quote === 'object' && quote !== null,
      )
    : []

  return (
    <RotatingQuotesSection
      heading={localizedString(block, 'heading', locale)}
      quotes={quotes}
      interval={typeof block.interval === 'number' ? block.interval : undefined}
    />
  )
}

function FullWidthTextWithLinkSection({
  block,
  locale,
}: {
  block: SectionBlock
  locale: Locale
}) {
  const text = localizedString(block, 'text', locale)
  const linkText = localizedString(block, 'linkText', locale)
  const linkUrl = localizedString(block, 'linkUrl', locale)

  return (
    <section className="px-6 py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-lg leading-8 text-[var(--color-taupe)]">{text}</p>
        {linkText && linkUrl ? (
          <CtaLink
            href={linkUrl}
            className="btn-pill shrink-0 bg-[var(--color-forest)] text-white hover:opacity-90"
          >
            {linkText}
          </CtaLink>
        ) : null}
      </div>
    </section>
  )
}

function ThreeColumnCardsSection({ block, locale }: { block: SectionBlock; locale: Locale }) {
  const cards = (block.cards as SectionBlock[] | undefined) ?? []

  return (
    <section className="bg-[var(--color-cream)] px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {cards.map((card) => {
          const title = localizedString(card, 'title', locale)
          const description = localizedBlocks(card, 'description', locale)
          const linkUrl = localizedString(card, 'linkUrl', locale)
          const content = (
            <>
              <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl">
                <SanityImage
                  image={card.image as { asset?: { _ref?: string } }}
                  alt={title ?? ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="font-display text-xl text-[var(--color-charcoal)]">{title}</h3>
              <PortableTextContent value={description} />
            </>
          )

          return linkUrl ? (
            <CtaLink
              key={card._key}
              href={linkUrl}
              className="block rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1"
            >
              {content}
            </CtaLink>
          ) : (
            <article key={card._key} className="rounded-3xl bg-white p-6 shadow-sm">
              {content}
            </article>
          )
        })}
      </div>
    </section>
  )
}

function TwoColumnTextSection({ block, locale }: { block: SectionBlock; locale: Locale }) {
  const leftText = localizedBlocks(block, 'leftText', locale)
  const rightText = localizedBlocks(block, 'rightText', locale)

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
      <PortableTextContent value={leftText} />
      <PortableTextContent value={rightText} />
    </section>
  )
}

function ContactBlockSection({ block, locale }: { block: SectionBlock; locale: Locale }) {
  const tagline = localizedString(block, 'tagline', locale)
  const bodyText = localizedBlocks(block, 'bodyText', locale)
  const ctaText = localizedString(block, 'ctaText', locale)
  const ctaUrl = localizedString(block, 'ctaUrl', locale)
  const email = localizedString(block, 'email', locale)
  const phone = localizedString(block, 'phone', locale)
  const address = localizedString(block, 'address', locale)

  return (
    <section className="bg-[var(--color-footer)] px-6 py-20 text-[var(--color-snow)]">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
        <div>
          {tagline ? (
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-sage)]">
              {tagline}
            </p>
          ) : null}
          <div className="mt-6">
            <PortableTextContent value={bodyText} variant="light" />
          </div>
          <dl className="mt-8 space-y-3 text-sm">
            {email ? (
              <div>
                <dt className="text-[var(--color-sage)]">E-Mail</dt>
                <dd>
                  <a href={`mailto:${email}`} className="underline underline-offset-4">
                    {email}
                  </a>
                </dd>
              </div>
            ) : null}
            {phone ? (
              <div>
                <dt className="text-[var(--color-sage)]">Telefon</dt>
                <dd>{phone}</dd>
              </div>
            ) : null}
            {address ? (
              <div>
                <dt className="text-[var(--color-sage)]">Adresse</dt>
                <dd>{address}</dd>
              </div>
            ) : null}
          </dl>
          {ctaText && ctaUrl ? (
            <CtaLink
              href={ctaUrl}
              className="btn-pill mt-8 bg-[var(--color-sage)] text-[var(--color-charcoal)] hover:bg-[var(--color-snow)]"
            >
              {ctaText}
            </CtaLink>
          ) : null}
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-3xl">
          <SanityImage
            image={block.image as { asset?: { _ref?: string } }}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}

export function PageSections({
  sections,
  locale = 'de',
}: {
  sections?: SectionBlock[]
  locale?: Locale
}) {
  if (!sections?.length) {
    return null
  }

  const visibleSections = sections.filter((section) => section.status !== 'hidden')
  const hero = visibleSections.find((section) => section._type === 'hero')
  const firstTextImage = visibleSections.find((section) => section._type === 'textImage')
  const heroCtaText = hero ? localizedString(hero, 'ctaText', locale) : undefined
  const heroCtaUrl = hero ? localizedString(hero, 'ctaUrl', locale) : undefined
  const relocateHeroCta = Boolean(firstTextImage && heroCtaText && heroCtaUrl)

  return (
    <>
      {visibleSections.map((block) => {
        switch (block._type) {
          case 'hero':
            return (
              <HeroSection
                key={block._key}
                block={block}
                locale={locale}
                hideCta={relocateHeroCta}
              />
            )
          case 'textImage':
            return (
              <TextImageSection
                key={block._key}
                block={block}
                locale={locale}
                relocatedCta={
                  relocateHeroCta && block._key === firstTextImage?._key && heroCtaText && heroCtaUrl
                    ? { text: heroCtaText, url: heroCtaUrl }
                    : undefined
                }
              />
            )
          case 'fullWidthText':
            return <FullWidthTextSection key={block._key} block={block} locale={locale} />
          case 'fullWidthImage':
            return <FullWidthImageSection key={block._key} block={block} locale={locale} />
          case 'rotatingQuotes':
            return <RotatingQuotesBlock key={block._key} block={block} locale={locale} />
          case 'fullWidthTextWithLink':
            return (
              <FullWidthTextWithLinkSection key={block._key} block={block} locale={locale} />
            )
          case 'threeColumnCards':
            return <ThreeColumnCardsSection key={block._key} block={block} locale={locale} />
          case 'twoColumnText':
            return <TwoColumnTextSection key={block._key} block={block} locale={locale} />
          case 'contactBlock':
            return <ContactBlockSection key={block._key} block={block} locale={locale} />
          case 'lightbulbValues':
            return <LightbulbValuesSection key={block._key} block={block} locale={locale} />
          case 'listicle':
            return <ListicleSection key={block._key} block={block} locale={locale} />
          default:
            return null
        }
      })}
    </>
  )
}
