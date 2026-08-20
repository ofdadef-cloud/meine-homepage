import { defineField, defineType } from 'sanity'

export const contactItem = defineType({
  name: 'contactItem',
  title: 'Contact Item',
  type: 'object',
  fields: [
    defineField({ name: 'text', title: 'Text', type: 'string' }),
    defineField({ name: 'link', title: 'Link', type: 'string' }),
  ],
})
