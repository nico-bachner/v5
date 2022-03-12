import { HomeIcon, CollectionIcon, PencilIcon } from '@heroicons/react/outline'
import { NavItem } from './NavItem'

export const Nav: React.VFC = () => (
  <nav className="fixed bottom-8 left-0 right-0 z-20 mx-auto flex w-fit gap-3 rounded-xl border border-white/20 bg-white/25 p-2 shadow-lg backdrop-blur-sm dark:border-white/5 dark:bg-white/10">
    <NavItem href="/">
      <HomeIcon />
    </NavItem>
    <NavItem href="/projects">
      <CollectionIcon />
    </NavItem>
    <NavItem href="/writing">
      <PencilIcon />
    </NavItem>
  </nav>
)
