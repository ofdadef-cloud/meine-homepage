import { defineField, defineType } from 'sanity'

import { localizedPortableText } from '../../shared/localizedPortableText'
import { sectionStatusField } from '../../shared/sectionStatusField'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    sectionStatusField(),
    defineField({ name: 'layout', title: 'Layout', type: 'string', initialValue: 'splitText' }),
    defineField({ name: 'theme', title: 'Theme', type: 'string', initialValue: 'dark' }),
    defineField({ name: 'parallax', title: 'Parallax', type: 'boolean' }),
    defineField({ name: 'paddingBottom', title: 'Padding Bottom', type: 'string' }),
    defineField({ name: 'textLeft', title: 'Text Left', type: 'string' }),
    defineField({ name: 'textLeft_de', title: 'Text Left (DE)', type: 'string' }),
    defineField({ name: 'textRight', title: 'Text Right', type: 'string' }),
    defineField({ name: 'textRight_de', title: 'Text Right (DE)', type: 'string' }),
    defineField({ name: 'ctaText', title: 'CTA Text', type: 'string' }),
    defineField({ name: 'ctaText_de', title: 'CTA Text (DE)', type: 'string' }),
    defineField({ name: 'ctaUrl', title: 'CTA URL', type: 'string' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
})

export const textImage = defineType({
  name: 'textImage',
  title: 'Text + Image',
  type: 'object',
  fields: [
    sectionStatusField(),
    defineField({ name: 'layout', title: 'Layout', type: 'string' }),
    defineField({
      name: 'theme',
      title: 'Farbstil',
      type: 'string',
      options: {
        list: [
          { title: 'Hell', value: 'light' },
          { title: 'Dunkel', value: 'dark' },
        ],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
    defineField({ name: 'headline', title: 'Überschrift (EN)', type: 'string' }),
    defineField({ name: 'headline_de', title: 'Headline (DE)', type: 'string' }),
    defineField({ name: 'text', title: 'Text', ...localizedPortableText }),
    defineField({ name: 'text_de', title: 'Text (DE)', ...localizedPortableText }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'imageDisplay',
      title: 'Bildformat',
      type: 'string',
      options: {
        list: [
          { title: 'Standard', value: 'standard' },
          { title: 'Hochformat', value: 'portrait' },
        ],
        layout: 'radio',
      },
      initialValue: 'standard',
    }),
    defineField({
      name: 'imageFit',
      title: 'Bildanpassung',
      type: 'string',
      options: {
        list: [
          { title: 'Fläche füllen', value: 'cover' },
          { title: 'Vollständig anzeigen', value: 'contain' },
        ],
        layout: 'radio',
      },
      initialValue: 'cover',
    }),
    defineField({ name: 'imageColumns', title: 'Image Columns', type: 'number' }),
    defineField({ name: 'imageHeight', title: 'Image Height', type: 'string' }),
    defineField({ name: 'textPosition', title: 'Text Position', type: 'string' }),
    defineField({ name: 'imageBleed', title: 'Image Bleed', type: 'boolean' }),
    defineField({ name: 'mobileImageFirst', title: 'Mobile Image First', type: 'boolean' }),
    defineField({ name: 'mobileImageSquare', title: 'Mobile Image Square', type: 'boolean' }),
    defineField({ name: 'paddingBottom', title: 'Padding Bottom', type: 'string' }),
    defineField({ name: 'ctaText', title: 'Link-Text (EN)', type: 'string' }),
    defineField({ name: 'ctaText_de', title: 'Link-Text (DE)', type: 'string' }),
    defineField({ name: 'ctaUrl', title: 'Link-URL', type: 'string' }),
  ],
})

export const fullWidthText = defineType({
  name: 'fullWidthText',
  title: 'Full Width Text',
  type: 'object',
  fields: [
    sectionStatusField(),
    defineField({ name: 'text', title: 'Text', ...localizedPortableText }),
    defineField({ name: 'text_de', title: 'Text (DE)', ...localizedPortableText }),
  ],
})

export const fullWidthImage = defineType({
  name: 'fullWidthImage',
  title: 'Full Width Image',
  type: 'object',
  fields: [
    sectionStatusField(),
    defineField({ name: 'image', title: 'Bild', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'alt', title: 'Alternativtext', type: 'string' }),
    defineField({ name: 'alt_de', title: 'Alternativtext (DE)', type: 'string' }),
    defineField({
      name: 'imageSize',
      title: 'Bildgröße',
      type: 'string',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Schmaler', value: 'narrow' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    }),
  ],
})

export const rotatingQuotes = defineType({
  name: 'rotatingQuotes',
  title: 'Wechselnde Zitate',
  type: 'object',
  fields: [
    sectionStatusField(),
    defineField({ name: 'heading_de', title: 'Überschrift (DE)', type: 'string' }),
    defineField({
      name: 'quotes',
      title: 'Zitate',
      type: 'array',
      of: [{ type: 'quoteItem' }],
      validation: (rule) => rule.required().min(2).max(12),
    }),
    defineField({
      name: 'interval',
      title: 'Wechselintervall (Sekunden)',
      type: 'number',
      initialValue: 8,
      validation: (rule) => rule.integer().min(3).max(30),
    }),
  ],
  preview: {
    select: { title: 'heading_de', quotes: 'quotes' },
    prepare: ({ title, quotes }) => ({
      title: title ?? 'Wechselnde Zitate',
      subtitle: `${quotes?.length ?? 0} Zitate`,
    }),
  },
})

export const fullWidthTextWithLink = defineType({
  name: 'fullWidthTextWithLink',
  title: 'Full Width Text With Link',
  type: 'object',
  fields: [
    sectionStatusField(),
    defineField({ name: 'text', title: 'Text', type: 'text', rows: 4 }),
    defineField({ name: 'text_de', title: 'Text (DE)', type: 'text', rows: 4 }),
    defineField({ name: 'linkText', title: 'Link Text', type: 'string' }),
    defineField({ name: 'linkText_de', title: 'Link Text (DE)', type: 'string' }),
    defineField({ name: 'linkUrl', title: 'Link URL', type: 'string' }),
  ],
})

export const twoColumnText = defineType({
  name: 'twoColumnText',
  title: 'Two Column Text',
  type: 'object',
  fields: [
    sectionStatusField(),
    defineField({ name: 'leftStyle', title: 'Left Style', type: 'string' }),
    defineField({ name: 'rightStyle', title: 'Right Style', type: 'string' }),
    defineField({ name: 'leftText', title: 'Left Text', ...localizedPortableText }),
    defineField({ name: 'leftText_de', title: 'Left Text (DE)', ...localizedPortableText }),
    defineField({ name: 'rightText', title: 'Right Text', ...localizedPortableText }),
    defineField({ name: 'rightText_de', title: 'Right Text (DE)', ...localizedPortableText }),
  ],
})

export const threeColumnCard = defineType({
  name: 'threeColumnCard',
  title: 'Card',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'title_de', title: 'Title (DE)', type: 'string' }),
    defineField({ name: 'description', title: 'Description', ...localizedPortableText }),
    defineField({ name: 'description_de', title: 'Description (DE)', ...localizedPortableText }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'linkUrl', title: 'Link URL', type: 'string' }),
  ],
})

export const threeColumnCards = defineType({
  name: 'threeColumnCards',
  title: 'Three Column Cards',
  type: 'object',
  fields: [
    sectionStatusField(),
    defineField({ name: 'squareImagesMobile', title: 'Square Images Mobile', type: 'boolean' }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{ type: 'threeColumnCard' }],
    }),
  ],
})

export const contactBlock = defineType({
  name: 'contactBlock',
  title: 'Contact Block',
  type: 'object',
  fields: [
    sectionStatusField(),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'tagline_de', title: 'Tagline (DE)', type: 'string' }),
    defineField({ name: 'bodyText', title: 'Body Text', ...localizedPortableText }),
    defineField({ name: 'bodyText_de', title: 'Body Text (DE)', ...localizedPortableText }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'string' }),
    defineField({ name: 'ctaText', title: 'CTA Text', type: 'string' }),
    defineField({ name: 'ctaText_de', title: 'CTA Text (DE)', type: 'string' }),
    defineField({ name: 'ctaUrl', title: 'CTA URL', type: 'string' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
})

export const listicle = defineType({
  name: 'listicle',
  title: 'Listicle',
  type: 'object',
  fields: [
    sectionStatusField(),
    defineField({ name: 'heading', title: 'Überschrift (EN)', type: 'string' }),
    defineField({ name: 'heading_de', title: 'Überschrift (DE)', type: 'string' }),
    defineField({ name: 'intro', title: 'Einleitung (EN)', type: 'text', rows: 3 }),
    defineField({ name: 'intro_de', title: 'Einleitung (DE)', type: 'text', rows: 3 }),
    defineField({
      name: 'style',
      title: 'Darstellung',
      type: 'string',
      options: {
        list: [
          { title: 'Nummeriert', value: 'numbered' },
          { title: 'Einfache Liste', value: 'simple' },
        ],
        layout: 'radio',
      },
      initialValue: 'numbered',
    }),
    defineField({
      name: 'items',
      title: 'Einträge',
      type: 'array',
      of: [{ type: 'listicleItem' }],
      validation: (rule) => rule.min(1).max(12),
    }),
  ],
  preview: {
    select: { title: 'heading_de', subtitle: 'intro_de' },
    prepare: ({ title, subtitle }) => ({
      title: title ?? 'Listicle',
      subtitle: subtitle ?? 'Nummerierte Liste',
    }),
  },
})

export const lightbulbValues = defineType({
  name: 'lightbulbValues',
  title: 'Glühbirnen-Werte',
  type: 'object',
  fields: [
    sectionStatusField(),
    defineField({ name: 'heading', title: 'Überschrift (EN)', type: 'string' }),
    defineField({ name: 'heading_de', title: 'Überschrift (DE)', type: 'string' }),
    defineField({ name: 'intro', title: 'Einleitung (EN)', ...localizedPortableText }),
    defineField({ name: 'intro_de', title: 'Einleitung (DE)', ...localizedPortableText }),
    defineField({
      name: 'outro',
      title: 'Text unter den Werten (EN)',
      ...localizedPortableText,
    }),
    defineField({
      name: 'outro_de',
      title: 'Text unter den Werten (DE)',
      ...localizedPortableText,
    }),
    defineField({
      name: 'items',
      title: 'Begriffe',
      type: 'array',
      of: [{ type: 'lightbulbTerm' }],
      validation: (rule) => rule.min(1).max(8),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Glühbirnen-Werte' }),
  },
})
