export type Locale = 'de' | 'en'

export const defaultLocale: Locale = 'de'

export function localizedString(
  source: Record<string, unknown> | null | undefined,
  field: string,
  locale: Locale = defaultLocale,
) {
  if (!source) {
    return undefined
  }

  if (locale === 'de') {
    const german = source[`${field}_de`]
    if (typeof german === 'string' && german.length > 0) {
      return german
    }
  }

  const value = source[field]
  return typeof value === 'string' ? value : undefined
}

export function localizedBlocks(
  source: Record<string, unknown> | null | undefined,
  field: string,
  locale: Locale = defaultLocale,
) {
  if (!source) {
    return undefined
  }

  if (locale === 'de') {
    const german = source[`${field}_de`]
    if (Array.isArray(german) && german.length > 0) {
      return german as Array<Record<string, unknown>>
    }
  }

  const value = source[field]
  return Array.isArray(value) ? (value as Array<Record<string, unknown>>) : undefined
}
