import { defineField, defineType } from 'sanity'

import { localizedPortableText } from '../shared/localizedPortableText'

export const lightbulbTerm = defineType({
  name: 'lightbulbTerm',
  title: 'Glühbirnen-Begriff',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Begriff (EN)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label_de',
      title: 'Begriff (DE)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Erläuterung (EN)',
      ...localizedPortableText,
    }),
    defineField({
      name: 'description_de',
      title: 'Erläuterung (DE)',
      ...localizedPortableText,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Glühbirnen-Bild',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'size',
      title: 'Größe',
      type: 'string',
      options: {
        list: [
          { title: 'Klein', value: 'sm' },
          { title: 'Mittel', value: 'md' },
          { title: 'Groß', value: 'lg' },
        ],
        layout: 'radio',
      },
      initialValue: 'md',
    }),
  ],
  preview: {
    select: { title: 'label_de', subtitle: 'label' },
  },
})
