import { defineField } from 'sanity'

export function sectionStatusField() {
  return defineField({
    name: 'status',
    title: 'Sichtbarkeit',
    type: 'string',
    options: {
      list: [
        { title: 'Anzeigen', value: 'visible' },
        { title: 'Temporär ausblenden', value: 'hidden' },
      ],
      layout: 'radio',
    },
    initialValue: 'visible',
  })
}
