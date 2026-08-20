import { defineQuery } from 'next-sanity'

const sectionsProjection = `
  sections[]{
    _key,
    _type,
    status,
    layout,
    theme,
    parallax,
    paddingBottom,
    textLeft,
    textLeft_de,
    textRight,
    textRight_de,
    ctaText,
    ctaText_de,
    ctaUrl,
    image,
    imageSize,
    headline,
    headline_de,
    text,
    text_de,
    imageDisplay,
    imageFit,
    imageColumns,
    imageHeight,
    textPosition,
    imageBleed,
    mobileImageFirst,
    mobileImageSquare,
    linkText,
    linkText_de,
    linkUrl,
    leftStyle,
    rightStyle,
    leftText,
    leftText_de,
    rightText,
    rightText_de,
    squareImagesMobile,
    cards[]{
      _key,
      title,
      title_de,
      description,
      description_de,
      image,
      linkUrl
    },
    tagline,
    tagline_de,
    bodyText,
    bodyText_de,
    email,
    phone,
    address,
    heading,
    heading_de,
    intro,
    intro_de,
    outro,
    outro_de,
    style,
    interval,
    quotes[]{
      _key,
      quote_de,
      author_de
    },
    items[]{
      _key,
      label,
      label_de,
      description,
      description_de,
      size,
      image,
      title,
      title_de,
      linkText,
      linkText_de,
      linkUrl
    }
  }
`

export const SETTINGS_QUERY = defineQuery(`
  *[_id == "settings"][0]{
    title,
    description,
    logo,
    siteColors,
    contactInfo,
    cookieBannerEnabled,
    cookieBannerHeading,
    cookieBannerHeading_de,
    cookieBannerText,
    cookieBannerText_de,
    cookieBannerAcceptAll,
    cookieBannerAcceptAll_de,
    cookieBannerRejectAll,
    cookieBannerRejectAll_de,
    cookieBannerPrivacyLinkText,
    cookieBannerPrivacyLinkText_de,
    imprintContent,
    imprintContent_de,
    privacyContent,
    privacyContent_de
  }
`)

export const HOME_PAGE_QUERY = defineQuery(`
  *[_id == "homePage"][0]{
    title,
    ${sectionsProjection}
  }
`)

export const SUPERVISION_PAGE_QUERY = defineQuery(`
  *[_id == "supervisionPage"][0]{
    title,
    ${sectionsProjection}
  }
`)

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_id == "contactPage"][0]{
    title,
    ${sectionsProjection}
  }
`)

export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    slug,
    ${sectionsProjection}
  }
`)

export const ALL_PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }
`)

export const ALL_PAGES_NAV_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)] | order(title asc){
    title,
    "slug": slug.current
  }
`)
