import { PortableText, type PortableTextComponents } from '@portabletext/react'

const defaultComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-4 leading-8 text-[var(--color-taupe)] first:mt-0">{children}</p>
    ),
    headline: ({ children }) => (
      <p className="heading-display mt-4 text-3xl leading-tight text-[var(--color-charcoal)] first:mt-0 md:text-5xl lg:text-6xl">
        {children}
      </p>
    ),
    h3: ({ children }) => (
      <h3 className="font-display mt-8 text-2xl text-[var(--color-charcoal)] first:mt-0">
        {children}
      </h3>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-4">{children}</span>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="font-medium underline underline-offset-4"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-[var(--color-taupe)]">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-[var(--color-taupe)]">{children}</ol>
    ),
  },
  types: {
    break: () => <br />,
  },
}

const lightComponents: PortableTextComponents = {
  ...defaultComponents,
  block: {
    normal: ({ children }) => (
      <p className="mt-4 leading-8 text-[var(--color-cream)] first:mt-0">{children}</p>
    ),
    headline: ({ children }) => (
      <p className="heading-display mt-4 text-3xl leading-tight text-white first:mt-0 md:text-5xl lg:text-6xl">
        {children}
      </p>
    ),
    h3: ({ children }) => (
      <h3 className="font-display mt-8 text-2xl text-white first:mt-0">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-[var(--color-cream)]">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-[var(--color-cream)]">{children}</ol>
    ),
  },
}

export function PortableTextContent({
  value,
  variant = 'default',
}: {
  value?: Array<Record<string, unknown>> | null
  variant?: 'default' | 'light'
}) {
  if (!value?.length) {
    return null
  }

  return (
    <PortableText
      value={value}
      components={variant === 'light' ? lightComponents : defaultComponents}
    />
  )
}
