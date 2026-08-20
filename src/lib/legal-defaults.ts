import type { SettingsData } from '@/lib/types'

export const siteOperator = {
  name: 'Aldo Haumann',
  address: 'Engerthstr. 126, 1200 Wien',
  email: 'aldohaumann@gmail.com',
  phone: '+43 670 6066905',
  profession:
    'Lebens- und Sozialberatung eingeschränkt auf psychosoziale Beratung (Supervision)',
}

export function getOperatorFromSettings(settings: SettingsData | null) {
  const emailItem = settings?.contactInfo?.find((item) => item.link?.startsWith('mailto:'))
  const phoneItem = settings?.contactInfo?.find((item) => item.text?.includes('+'))
  const title = settings?.title

  return {
    ...siteOperator,
    name: title && title !== 'Aldo' ? title : siteOperator.name,
    email: emailItem?.link?.replace('mailto:', '') ?? siteOperator.email,
    phone: phoneItem?.text ?? siteOperator.phone,
  }
}

export function hasPortableTextContent(value?: Array<Record<string, unknown>> | null) {
  return Boolean(value?.some((block) => block._type === 'block'))
}
