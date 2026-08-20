export const localizedPortableText = {
  type: 'array' as const,
  of: [
    {
      type: 'block' as const,
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Headline', value: 'headline' },
        { title: 'H3', value: 'h3' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Fett', value: 'strong' },
          { title: 'Kursiv', value: 'em' },
          { title: 'Unterstrichen', value: 'underline' },
        ],
      },
    },
  ],
}
