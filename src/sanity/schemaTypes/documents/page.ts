import { DocumentIcon } from '@sanity/icons/Document'
import { defineField, defineType } from 'sanity'

import { sectionsField } from '../shared/sectionsField'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    sectionsField,
  ],
})
