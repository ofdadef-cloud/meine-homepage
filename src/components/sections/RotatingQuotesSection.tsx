'use client'

import { useEffect, useRef, useState } from 'react'

type Quote = {
  _key?: string
  quote_de?: string
  author_de?: string
}

export function RotatingQuotesSection({
  heading,
  quotes,
  interval,
}: {
  heading?: string
  quotes: Quote[]
  interval?: number
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const safeInterval = Math.min(Math.max(interval ?? 8, 3), 30) * 1000
  const activeQuote = quotes[activeIndex % quotes.length]

  const showPreviousQuote = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + quotes.length) % quotes.length)
  }

  const showNextQuote = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % quotes.length)
  }

  useEffect(() => {
    if (quotes.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % quotes.length)
    }, safeInterval)

    return () => window.clearInterval(timer)
  }, [quotes.length, safeInterval])

  if (!activeQuote?.quote_de) {
    return null
  }

  return (
    <section className="bg-[var(--color-cream)] px-6 py-20 text-[var(--color-charcoal)] md:py-28">
      <div className="mx-auto max-w-5xl text-center">
        {heading ? <h2 className="font-display text-4xl md:text-5xl">{heading}</h2> : null}
        <figure
          className="mt-10 min-h-60 touch-pan-y cursor-grab content-center active:cursor-grabbing md:mt-14"
          onPointerDown={(event) => {
            touchStart.current = { x: event.clientX, y: event.clientY }
          }}
          onPointerUp={(event) => {
            const start = touchStart.current

            touchStart.current = null

            if (!start || quotes.length < 2) {
              return
            }

            const horizontalDistance = event.clientX - start.x
            const verticalDistance = event.clientY - start.y

            if (Math.abs(horizontalDistance) < 50 || Math.abs(horizontalDistance) < Math.abs(verticalDistance)) {
              return
            }

            if (horizontalDistance > 0) {
              showPreviousQuote()
            } else {
              showNextQuote()
            }
          }}
        >
          <blockquote
            aria-live="off"
            className="mx-auto max-w-3xl text-[clamp(1.35rem,2.5vw,2.25rem)] leading-[1.45] font-medium"
          >
            <span aria-hidden="true">„</span>
            {activeQuote.quote_de}
            <span aria-hidden="true">“</span>
          </blockquote>
          {activeQuote.author_de ? (
            <figcaption className="mt-7 text-sm font-medium tracking-[0.16em] text-[var(--color-taupe)] uppercase">
              {activeQuote.author_de}
            </figcaption>
          ) : null}
        </figure>
        {quotes.length > 1 ? (
          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={showPreviousQuote}
              className="grid size-10 place-items-center rounded-full border border-[var(--color-taupe)] text-xl transition hover:bg-[var(--color-charcoal)] hover:text-white"
              aria-label="Vorheriges Zitat anzeigen"
            >
              ←
            </button>
            <div className="flex gap-3" aria-label="Zitat auswählen">
              {quotes.map((quote, index) => (
                <button
                  key={quote._key ?? index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex % quotes.length
                      ? 'w-8 bg-[var(--color-charcoal)]'
                      : 'w-2.5 bg-[var(--color-sage)] hover:bg-[var(--color-taupe)]'
                  }`}
                  aria-label={`Zitat ${index + 1} anzeigen`}
                  aria-pressed={index === activeIndex % quotes.length}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={showNextQuote}
              className="grid size-10 place-items-center rounded-full border border-[var(--color-taupe)] text-xl transition hover:bg-[var(--color-charcoal)] hover:text-white"
              aria-label="Nächstes Zitat anzeigen"
            >
              →
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
