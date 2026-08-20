import { CogIcon } from '@sanity/icons/Cog'
import { defineField, defineType } from 'sanity'

import { localizedPortableText } from '../shared/localizedPortableText'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({ name: 'title', title: 'Site Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'siteColors', title: 'Site Colors', type: 'siteColors' }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'array',
      of: [{ type: 'contactItem' }],
    }),
    defineField({ name: 'cookieBannerEnabled', title: 'Cookie Banner Enabled', type: 'boolean' }),
    defineField({ name: 'cookieBannerHeading', title: 'Cookie Banner Heading', type: 'string' }),
    defineField({
      name: 'cookieBannerHeading_de',
      title: 'Cookie Banner Heading (DE)',
      type: 'string',
    }),
    defineField({ name: 'cookieBannerText', title: 'Cookie Banner Text', type: 'text', rows: 4 }),
    defineField({
      name: 'cookieBannerText_de',
      title: 'Cookie Banner Text (DE)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'cookieBannerAcceptAll',
      title: 'Cookie Accept All',
      type: 'string',
    }),
    defineField({
      name: 'cookieBannerAcceptAll_de',
      title: 'Cookie Accept All (DE)',
      type: 'string',
    }),
    defineField({
      name: 'cookieBannerRejectAll',
      title: 'Cookie Reject All',
      type: 'string',
    }),
    defineField({
      name: 'cookieBannerRejectAll_de',
      title: 'Cookie Reject All (DE)',
      type: 'string',
    }),
    defineField({
      name: 'cookieBannerPrivacyLinkText',
      title: 'Cookie Privacy Link Text',
      type: 'string',
    }),
    defineField({
      name: 'cookieBannerPrivacyLinkText_de',
      title: 'Cookie Privacy Link Text (DE)',
      type: 'string',
    }),
    defineField({ name: 'imprintContent', title: 'Imprint Content', ...localizedPortableText }),
    defineField({
      name: 'imprintContent_de',
      title: 'Imprint Content (DE)',
      ...localizedPortableText,
    }),
    defineField({ name: 'privacyContent', title: 'Privacy Content', ...localizedPortableText }),
    defineField({
      name: 'privacyContent_de',
      title: 'Privacy Content (DE)',
      ...localizedPortableText,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Settings' }),
  },
})
