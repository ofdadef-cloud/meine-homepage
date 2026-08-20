import { defineField, defineType } from 'sanity'

export const quoteItem = defineType({
  name: 'quoteItem',
  title: 'Zitat',
  type: 'object',
  fields: [
    defineField({
      name: 'quote_de',
      title: 'Zitat (DE)',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'author_de', title: 'Autor:in / Quelle (DE)', type: 'string' }),
  ],
  preview: {
    select: { title: 'quote_de', subtitle: 'author_de' },
    prepare: ({ title, subtitle }) => ({
      title: title ?? 'Zitat',
      subtitle,
    }),
  },
})
