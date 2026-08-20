import Image from 'next/image'

import { urlFor } from '@/sanity/lib/image'

export function SanityImage({
  image,
  alt,
  className,
  priority,
  fill,
  sizes,
  width,
  height,
}: {
  image?: { asset?: { _ref?: string } } | null
  alt: string
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  width?: number
  height?: number
}) {
  if (!image?.asset?._ref) {
    return null
  }

  const src = urlFor(image).width(1600).quality(85).url()

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? '100vw'}
        className={className}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 800}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  )
}
