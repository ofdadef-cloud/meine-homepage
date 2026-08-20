import {
  contactBlock,
  fullWidthImage,
  fullWidthText,
  fullWidthTextWithLink,
  hero,
  lightbulbValues,
  listicle,
  rotatingQuotes,
  textImage,
  threeColumnCard,
  threeColumnCards,
  twoColumnText,
} from './objects/blocks'
import { contactItem } from './objects/contactItem'
import { lightbulbTerm } from './objects/lightbulbTerm'
import { listicleItem } from './objects/listicleItem'
import { quoteItem } from './objects/quoteItem'
import { siteColors } from './objects/siteColors'
import { contactPage } from './documents/contactPage'
import { homePage } from './documents/homePage'
import { page } from './documents/page'
import { settings } from './documents/settings'
import { supervisionPage } from './documents/supervisionPage'

export const schemaTypes = [
  siteColors,
  contactItem,
  hero,
  textImage,
  fullWidthImage,
  fullWidthText,
  fullWidthTextWithLink,
  twoColumnText,
  threeColumnCard,
  threeColumnCards,
  contactBlock,
  lightbulbTerm,
  listicleItem,
  lightbulbValues,
  listicle,
  quoteItem,
  rotatingQuotes,
  settings,
  homePage,
  supervisionPage,
  contactPage,
  page,
]
