import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { defineField, defineType } from 'sanity'

import { sectionsField } from '../shared/sectionsField'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    sectionsField,
  ],
  preview: {
    prepare: () => ({ title: 'Contact Page' }),
  },
})
