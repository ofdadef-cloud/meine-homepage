import { HomeIcon } from '@sanity/icons/Home'
import { defineField, defineType } from 'sanity'

import { sectionsField } from '../shared/sectionsField'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    sectionsField,
  ],
  preview: {
    prepare: () => ({ title: 'Home Page' }),
  },
})
