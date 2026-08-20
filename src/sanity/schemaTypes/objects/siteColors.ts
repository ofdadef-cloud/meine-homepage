import { defineField, defineType } from 'sanity'

export const siteColors = defineType({
  name: 'siteColors',
  title: 'Site Colors',
  type: 'object',
  fields: [
    defineField({ name: 'charcoal', title: 'Charcoal', type: 'string' }),
    defineField({ name: 'cream', title: 'Cream', type: 'string' }),
    defineField({ name: 'footer', title: 'Footer', type: 'string' }),
    defineField({ name: 'forest', title: 'Forest', type: 'string' }),
    defineField({ name: 'sage', title: 'Sage', type: 'string' }),
    defineField({ name: 'snow', title: 'Snow', type: 'string' }),
    defineField({ name: 'taupe', title: 'Taupe', type: 'string' }),
  ],
})
