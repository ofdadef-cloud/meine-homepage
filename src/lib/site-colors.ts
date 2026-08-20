import type { SiteColors } from '@/lib/types'

const defaultColors: Required<SiteColors> = {
  charcoal: '#1A1A1A',
  cream: '#F4F4F4',
  footer: '#262626',
  forest: '#141414',
  sage: '#9A9A9A',
  snow: '#FAFAFA',
  taupe: '#5C5C5C',
}

export function getSiteColors(colors?: SiteColors | null) {
  return { ...defaultColors, ...colors }
}

export function siteColorsToCssVars(colors?: SiteColors | null) {
  const resolved = getSiteColors(colors)

  return {
    '--color-white': '#FFFFFF',
    '--color-charcoal': resolved.charcoal,
    '--color-cream': resolved.cream,
    '--color-footer': resolved.footer,
    '--color-forest': resolved.forest,
    '--color-sage': resolved.sage,
    '--color-snow': resolved.snow,
    '--color-taupe': resolved.taupe,
  } as React.CSSProperties
}
