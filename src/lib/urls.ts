export function resolveInternalUrl(url?: string) {
  if (!url) {
    return '#'
  }

  if (url === '/contact') {
    return '/kontakt'
  }

  return url
}

export function isExternalUrl(url: string) {
  return url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:')
}
