import type { Metadata } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'

import { AppProviders } from '@/components/AppProviders'
import { fetchSettings } from '@/lib/fetch-settings'
import { SanityLive } from '@/sanity/lib/live'
import './globals.css'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings()

  return {
    title: settings?.title ?? 'ALDO HAUMANN',
    description: settings?.description ?? 'Supervision für Führungskräfte und Berater:innen',
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isEnabled } = await draftMode()
  const settings = await fetchSettings()

  return (
    <html
      lang="de"
      className={`${montserrat.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AppProviders settings={settings}>
          {children}
          <SanityLive />
          {isEnabled ? <VisualEditing /> : null}
        </AppProviders>
      </body>
    </html>
  )
}
