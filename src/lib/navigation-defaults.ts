export type NavItem = {
  href: string
  label: string
}

export const defaultNavItems: NavItem[] = [
  { href: '/', label: 'Startseite' },
  { href: '/supervision', label: 'Supervision' },
  { href: '/coaching', label: 'Coaching' },
  { href: '/ueber-mich', label: 'Über mich' },
  { href: '/kontakt', label: 'Kontakt' },
]
