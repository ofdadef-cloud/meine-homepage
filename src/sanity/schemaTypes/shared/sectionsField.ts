import { defineArrayMember, defineField } from 'sanity'

export const sectionsField = defineField({
  name: 'sections',
  title: 'Sections',
  type: 'array',
  of: [
    defineArrayMember({ type: 'hero' }),
    defineArrayMember({ type: 'textImage' }),
    defineArrayMember({ type: 'fullWidthText' }),
    defineArrayMember({ type: 'fullWidthImage' }),
    defineArrayMember({ type: 'fullWidthTextWithLink' }),
    defineArrayMember({ type: 'threeColumnCards' }),
    defineArrayMember({ type: 'twoColumnText' }),
    defineArrayMember({ type: 'contactBlock' }),
    defineArrayMember({ type: 'lightbulbValues' }),
    defineArrayMember({ type: 'listicle' }),
    defineArrayMember({ type: 'rotatingQuotes' }),
  ],
})
