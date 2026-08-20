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
      ? 'text-[var(--color-charcoal)] underline underline-offset-[6px]'
      : 'text-[var(--color-taupe)] hover:text-[var(--color-charcoal)]'
  }

  return (
    <header
      className={`z-50 transition-colors duration-300 ${
        isOverlay
          ? 'absolute inset-x-0 top-0 bg-transparent'
          : 'sticky top-0 border-b border-black/5 bg-[var(--color-snow)]/95 backdrop-blur-md'
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
            className={`nav-brand transition ${
              isOverlay ? 'text-white' : 'text-[var(--color-charcoal)]'
            }`}
          >
            {siteTitle}
          </Link>
          <Link
            href={contactFormHref}
            className={`text-link w-fit transition ${
              isOverlay ? 'text-white hover:text-white/80' : 'text-[var(--color-charcoal)] hover:opacity-70'
            }`}
          >
            Erstgespräch vereinbaren
          </Link>
        </div>
      </div>
    </header>
  )
}
