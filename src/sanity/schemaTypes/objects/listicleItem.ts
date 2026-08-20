import { defineField, defineType } from 'sanity'

export const listicleItem = defineType({
  name: 'listicleItem',
  title: 'Listicle-Eintrag',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel (EN)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title_de',
      title: 'Titel (DE)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Text (EN)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'description_de',
      title: 'Text (DE)',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkText',
      title: 'Link-Text (EN)',
      type: 'string',
    }),
    defineField({
      name: 'linkText_de',
      title: 'Link-Text (DE)',
      type: 'string',
    }),
    defineField({
      name: 'linkUrl',
      title: 'Link-URL',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'title_de', subtitle: 'description_de' },
  },
})
