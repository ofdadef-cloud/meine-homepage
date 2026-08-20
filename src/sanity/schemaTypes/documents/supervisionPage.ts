import { UsersIcon } from '@sanity/icons/Users'
import { defineField, defineType } from 'sanity'

import { sectionsField } from '../shared/sectionsField'

export const supervisionPage = defineType({
  name: 'supervisionPage',
  title: 'Supervision Page',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    sectionsField,
  ],
  preview: {
    prepare: () => ({ title: 'Supervision Page' }),
  },
})
