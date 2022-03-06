import Link from 'next/link'

type NavItemProps = {
  href: string
}

export const NavItem: React.FC<NavItemProps> = ({ children, href }) => (
  <Link href={href}>
    <a className="box-content w-8 transform rounded-lg border border-white/20 bg-white/25 p-3 shadow-lg backdrop-blur-sm transition hover:scale-105">
      {children}
    </a>
  </Link>
)
