import Link from 'next/link'

type NavItemProps = {
  title: string
  href: string
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element
}

export const NavItem: React.VFC<NavItemProps> = ({
  title,
  href,
  icon: Icon,
}) => (
  <Link href={href}>
    <a
      title={title}
      className="h-min w-min transform rounded-lg bg-white/80 p-2 shadow backdrop-blur transition hover:scale-105 dark:border-zinc-600/20 dark:bg-zinc-600/30 md:p-3"
    >
      <Icon className="h-8 w-8" />
    </a>
  </Link>
)
