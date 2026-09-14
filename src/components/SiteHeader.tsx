'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { defaultNavItems, type NavItem } from '@/lib/navigation-defaults'

const contactFormHref = '/kontakt?anliegen=erstgespraech#kontaktformular'

export function SiteHeader({
  siteTitle = 'ALDO HAUMANN',
  currentPath,
  navItems = defaultNavItems,
  variant = 'solid',
}: {
  siteTitle?: string
  currentPath?: string
  navItems?: NavItem[]
  variant?: 'solid' | 'overlay'
}) {
  const [scrolled, setScrolled] = useState(false)
  const isOverlay = variant === 'overlay' && !scrolled

  useEffect(() => {
    if (variant !== 'overlay') {
      return
    }

    function onScroll() {
      setScrolled(window.scrollY > window.innerHeight * 0.72)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [variant])

  const linkClass = (isActive: boolean) => {
    if (isOverlay) {
      return isActive
        ? 'text-white underline underline-offset-[6px]'
        : 'text-white/90 hover:text-white'
    }

    return isActive
      ? `text-[var(--color-charcoal)] underline underline-offset-[6px] ${
          variant === 'overlay' ? 'max-lg:text-white' : ''
        }`
      : `text-[var(--color-taupe)] hover:text-[var(--color-charcoal)] ${
          variant === 'overlay' ? 'max-lg:text-white/90 max-lg:hover:text-white' : ''
        }`
  }

  return (
    <header
      className={`z-50 transition-colors duration-300 ${
        isOverlay
          ? 'absolute inset-x-0 top-0 bg-transparent'
          : variant === 'overlay'
            ? 'absolute inset-x-0 top-0 bg-transparent lg:sticky lg:top-0 lg:border-b lg:border-black/5 lg:bg-[var(--color-snow)]/95 lg:backdrop-blur-md'
            : 'relative border-b border-black/5 bg-[var(--color-snow)]'
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-8 py-8 lg:flex-row lg:items-start lg:justify-between lg:px-12 lg:py-10">
        <div>
          <nav className="nav-link flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = currentPath === item.href

              return (
                <Link key={item.href} href={item.href} className={`w-fit transition ${linkClass(isActive)}`}>
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex flex-col items-start gap-6 lg:items-end">
          <Link
            href="/"
            className={`nav-brand hidden transition lg:inline ${
              isOverlay ? 'text-white' : 'text-[var(--color-charcoal)]'
            }`}
          >
            {siteTitle}
          </Link>
          <Link
            href={contactFormHref}
            className={`text-link w-fit transition ${
              isOverlay
                ? 'text-white hover:text-white/80'
                : `text-[var(--color-charcoal)] hover:opacity-70 ${
                    variant === 'overlay' ? 'max-lg:text-white max-lg:hover:text-white/80' : ''
                  }`
            }`}
          >
            Erstgespräch vereinbaren
          </Link>
        </div>
      </div>
    </header>
  )
}
