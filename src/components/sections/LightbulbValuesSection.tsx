'use client'

import { Geist } from 'next/font/google'
import { useId, useState } from 'react'

import { PortableTextContent } from '@/components/PortableTextContent'
import { SanityImage } from '@/components/SanityImage'
import { localizedBlocks, localizedString, type Locale } from '@/lib/locale'
import type { SectionBlock } from '@/lib/types'

const geist = Geist({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})

type LightbulbItem = SectionBlock & {
  label?: string
  label_de?: string
  description?: Array<Record<string, unknown>>
  description_de?: Array<Record<string, unknown>>
  size?: 'sm' | 'md' | 'lg'
  image?: { asset?: { _ref?: string } }
}

const sizeScale = {
  sm: 0.78,
  md: 1,
  lg: 1.18,
} as const

const waveOffsets = [18, 6, 0, 10, 14, 4, 8]

function sanitizeSvgId(id: string) {
  return id.replace(/[^a-zA-Z0-9_-]/g, '')
}

function LightbulbIcon({
  label,
  isHovered,
  isActive,
  scale,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ariaExpanded,
  buttonId,
  image,
}: {
  label: string
  isHovered: boolean
  isActive: boolean
  scale: number
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  ariaExpanded: boolean
  buttonId: string
  image?: { asset?: { _ref?: string } }
}) {
  const glow = isHovered || isActive
  const uid = sanitizeSvgId(buttonId)

  const bulbGlassPath =
    'M80 16 C116 16 146 46 146 92 C146 126 126 150 110 168 L104 178 L56 178 L50 168 C34 150 14 126 14 92 C14 46 44 16 80 16 Z'

  if (image?.asset?._ref) {
    return (
      <button
        type="button"
        id={buttonId}
        aria-label={label}
        aria-expanded={ariaExpanded}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="relative h-[180px] w-[180px] shrink-0 overflow-hidden rounded-[1.5rem] transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:h-[230px] md:w-[230px]"
        style={{
          transform: `scale(${scale}) translateY(${glow ? -12 : 0}px)`,
          filter: glow
            ? 'drop-shadow(0 18px 22px rgba(255,145,40,0.3))'
            : 'drop-shadow(0 12px 16px rgba(0,0,0,0.4))',
        }}
      >
        <SanityImage
          image={image}
          alt=""
          fill
          sizes="(max-width: 768px) 180px, 230px"
          className={`object-cover transition-transform duration-500 ${
            glow ? 'scale-[1.035]' : ''
          }`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-[inherit] ring-1 transition ${
            glow ? 'ring-amber-200/70' : 'ring-white/10'
          }`}
        />
      </button>
    )
  }

  return (
    <button
      type="button"
      id={buttonId}
      aria-expanded={ariaExpanded}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative flex shrink-0 flex-col items-center transition-transform duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      style={{
        transform: `scale(${scale}) translateY(${glow ? -10 : 0}px)`,
      }}
    >
      <svg
        viewBox="0 0 160 320"
        className="h-[230px] w-[120px] transition-all duration-500 md:h-[290px] md:w-[150px]"
        aria-hidden="true"
      >
        <defs>
          <filter id={`glassShadow-${uid}`} x="-40%" y="-30%" width="180%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="blur" />
            <feOffset dy="5" result="offsetBlur" />
            <feColorMatrix
              in="offsetBlur"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .85 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={`lightBloom-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation={glow ? 7 : 3.5} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id={`ambient-${uid}`} cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#ffe4bc" stopOpacity={glow ? 0.92 : 0.4} />
            <stop offset="40%" stopColor="#ff9d3c" stopOpacity={glow ? 0.5 : 0.2} />
            <stop offset="100%" stopColor="#ff7a00" stopOpacity="0" />
          </radialGradient>

          <radialGradient id={`glassFill-${uid}`} cx="34%" cy="20%" r="82%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={glow ? 0.25 : 0.12} />
            <stop offset="34%" stopColor="#f5d9bc" stopOpacity={glow ? 0.1 : 0.04} />
            <stop offset="68%" stopColor="#6e4b35" stopOpacity={glow ? 0.12 : 0.08} />
            <stop offset="100%" stopColor="#000000" stopOpacity={glow ? 0.32 : 0.25} />
          </radialGradient>

          <radialGradient id={`innerLight-${uid}`} cx="50%" cy="46%" r="42%">
            <stop offset="0%" stopColor="#fff9eb" stopOpacity={glow ? 1 : 0.76} />
            <stop offset="38%" stopColor="#ffc06a" stopOpacity={glow ? 0.9 : 0.48} />
            <stop offset="100%" stopColor="#ff8c1a" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`baseMetal-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5a3a1c" />
            <stop offset="20%" stopColor="#a9702f" />
            <stop offset="45%" stopColor="#e6b168" />
            <stop offset="58%" stopColor="#f7d79c" />
            <stop offset="80%" stopColor="#a9702f" />
            <stop offset="100%" stopColor="#4d3016" />
          </linearGradient>

          <linearGradient id={`neckGlass-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#ffe6c2" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ffd9a0" stopOpacity="0.08" />
          </linearGradient>

          <clipPath id={`bulbClip-${uid}`}>
            <path d={bulbGlassPath} />
          </clipPath>
        </defs>

        <ellipse
          cx="80"
          cy="300"
          rx={glow ? 50 : 38}
          ry={glow ? 10 : 6}
          fill="#ff9d3c"
          opacity={glow ? 0.28 : 0.1}
        />

        <ellipse
          cx="80"
          cy="104"
          rx={glow ? 82 : 64}
          ry={glow ? 92 : 74}
          fill={`url(#ambient-${uid})`}
          className="transition-all duration-500"
        />

        <path
          d="M56 178 L56 196 C56 202 60 206 66 206 L94 206 C100 206 104 202 104 196 L104 178"
          fill={`url(#neckGlass-${uid})`}
          stroke="rgba(255,220,170,0.2)"
          strokeWidth="1"
        />

        <rect x="56" y="204" width="48" height="20" rx="3" fill={`url(#baseMetal-${uid})`} />
        <path
          d="M58 224 L102 224 L96 262 C95 268 90 272 84 272 L76 272 C70 272 65 268 64 262 Z"
          fill={`url(#baseMetal-${uid})`}
        />
        {[210, 218, 230, 240, 250].map((y) => (
          <ellipse
            key={y}
            cx="80"
            cy={y}
            rx={y < 226 ? 24 : 24 - (y - 226) * 0.4}
            ry="2.8"
            fill="none"
            stroke="rgba(60,32,10,0.5)"
            strokeWidth="1.3"
          />
        ))}
        <ellipse cx="72" cy="214" rx="4" ry="20" fill="rgba(255,240,210,0.35)" />
        <ellipse cx="80" cy="272" rx="15" ry="3.5" fill="#2a1a0c" />
        <circle cx="80" cy="278" r="5" fill="#1a0f06" stroke="#6b4522" strokeWidth="0.8" />

        <g filter={`url(#glassShadow-${uid})`}>
          <path
            d={bulbGlassPath}
            fill={`url(#glassFill-${uid})`}
            stroke={glow ? 'rgba(255,222,176,0.8)' : 'rgba(255,232,206,0.35)'}
            strokeWidth="1.6"
          />
        </g>

        <g clipPath={`url(#bulbClip-${uid})`}>
          <ellipse
            cx="80"
            cy="100"
            rx={glow ? 44 : 32}
            ry={glow ? 52 : 40}
            fill={`url(#innerLight-${uid})`}
            filter={`url(#lightBloom-${uid})`}
            className="transition-all duration-500"
          />

          <path
            d="M70 176 C72 148 76 124 80 104 C84 124 88 148 90 176"
            stroke={glow ? 'rgba(255,214,150,0.6)' : 'rgba(255,214,150,0.26)'}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M64 176 C68 134 74 112 80 100"
            stroke={glow ? 'rgba(255,196,120,0.45)' : 'rgba(255,196,120,0.18)'}
            strokeWidth="0.9"
            fill="none"
          />
          <path
            d="M96 176 C92 134 86 112 80 100"
            stroke={glow ? 'rgba(255,196,120,0.45)' : 'rgba(255,196,120,0.18)'}
            strokeWidth="0.9"
            fill="none"
          />
          <ellipse cx="47" cy="78" rx="10" ry="29" fill="rgba(255,255,255,0.07)" transform="rotate(25 47 78)" />
          <ellipse cx="113" cy="132" rx="7" ry="23" fill="rgba(255,210,160,0.05)" transform="rotate(-18 113 132)" />
        </g>

        <path
          d="M43 52 C52 28 66 18 83 17 C65 28 52 45 48 67 Z"
          fill="rgba(255,255,255,0.18)"
        />
        <path
          d="M42 53 C51 27 66 17 84 17"
          stroke="rgba(255,255,255,0.62)"
          strokeWidth="2.7"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M124 67 C134 88 134 116 125 141"
          stroke="rgba(255,235,210,0.18)"
          strokeWidth="1.4"
          fill="none"
        />
      </svg>

      <span
        className={`${geist.className} pointer-events-none absolute top-[31%] max-w-[102px] text-center text-[1.12rem] font-semibold leading-[1.08] tracking-[-0.05em] transition-all duration-500 md:max-w-[124px] md:text-[1.35rem] ${
          glow ? 'scale-110 text-[#fff2d6]' : 'text-[#ffd9a0]'
        }`}
        style={{
          filter: glow
            ? 'drop-shadow(0 0 6px rgba(255,220,150,1)) drop-shadow(0 0 16px rgba(255,160,50,0.95)) drop-shadow(0 0 30px rgba(255,120,20,0.7))'
            : 'drop-shadow(0 0 4px rgba(255,210,140,0.85)) drop-shadow(0 0 12px rgba(255,150,50,0.55))',
        }}
      >
        {label}
      </span>
    </button>
  )
}

export function LightbulbValuesSection({
  block,
  locale = 'de',
}: {
  block: SectionBlock
  locale?: Locale
}) {
  const sectionId = useId()
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const [openKey, setOpenKey] = useState<string | null>(null)

  const heading = localizedString(block, 'heading', locale)
  const intro = localizedBlocks(block, 'intro', locale)
  const outro = localizedBlocks(block, 'outro', locale)
  const items = (block.items as LightbulbItem[] | undefined) ?? []

  const activeItem = items.find((item) => item._key === openKey)
  const activeLabel = activeItem ? localizedString(activeItem, 'label', locale) : null
  const activeDescription = activeItem ? localizedBlocks(activeItem, 'description', locale) : null

  return (
    <section className="relative overflow-hidden bg-[#050301] px-6 py-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,150,50,0.1),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 to-transparent" />
      <div className="pointer-events-none absolute inset-x-[6%] bottom-[4.5rem] h-px bg-gradient-to-r from-transparent via-amber-200/15 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        {heading ? (
          <h2 className="font-display text-center text-4xl text-[var(--color-cream)] md:text-5xl">
            {heading}
          </h2>
        ) : null}
        {intro ? (
          <div className="mt-8 max-w-2xl pl-10 md:mt-10 md:pl-16">
            <PortableTextContent value={intro} variant="light" />
          </div>
        ) : null}

        <div className="mt-14 flex flex-wrap items-end justify-center gap-x-6 gap-y-8 md:gap-x-10 md:gap-y-10">
          {items.map((item, index) => {
            const label = localizedString(item, 'label', locale) ?? ''
            const size = (item.size as keyof typeof sizeScale) ?? 'md'
            const scale = sizeScale[size] ?? 1
            const image = item.image as LightbulbItem['image']
            const offset = waveOffsets[index % waveOffsets.length]
            const isActive = openKey === item._key
            const isHovered = hoveredKey === item._key
            const buttonId = `${sectionId}-bulb-${item._key}`
            const description = localizedBlocks(item, 'description', locale)

            return (
              <div
                key={item._key}
                className="flex w-full flex-col items-center md:w-auto"
                style={{
                  marginBottom: `${offset}px`,
                  zIndex: isHovered || isActive ? 20 : 10 - (index % 5),
                }}
              >
                <LightbulbIcon
                  label={label}
                  isHovered={isHovered}
                  isActive={isActive}
                  scale={scale}
                  buttonId={buttonId}
                  image={image}
                  ariaExpanded={isActive}
                  onClick={() => setOpenKey(isActive ? null : item._key)}
                  onMouseEnter={() => setHoveredKey(item._key)}
                  onMouseLeave={() => setHoveredKey(null)}
                />
                {isActive ? (
                  <div className="mt-5 w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-amber-100/15 bg-white/5 px-6 py-6 text-left backdrop-blur-sm md:hidden">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-200/80">
                      {label}
                    </p>
                    <div className="mt-4 text-base">
                      <PortableTextContent value={description} variant="light" />
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        <div
          className={`mx-auto mt-10 hidden max-w-3xl overflow-hidden rounded-[1.75rem] border border-amber-100/15 bg-white/5 backdrop-blur-sm transition-all duration-500 md:block ${
            activeItem ? 'max-h-[min(24rem,70vh)] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {activeItem ? (
            <div
              id={`${sectionId}-panel-${activeItem._key}`}
              role="region"
              aria-labelledby={`${sectionId}-bulb-${activeItem._key}`}
              className="max-h-[min(24rem,70vh)] overflow-y-auto overscroll-y-contain px-6 py-6 [scrollbar-color:rgba(255,200,100,0.35)_transparent] [scrollbar-width:thin] md:px-8 md:py-8 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-amber-200/30 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-2"
            >
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-200/80">
                {activeLabel}
              </p>
              <div className="mt-4 text-base md:text-lg">
                <PortableTextContent value={activeDescription} variant="light" />
              </div>
            </div>
          ) : null}
        </div>

        {outro ? (
          <div className="mx-auto mt-10 max-w-3xl text-center text-base text-amber-50/80 md:text-lg">
            <PortableTextContent value={outro} variant="light" />
          </div>
        ) : null}
      </div>
    </section>
  )
}
