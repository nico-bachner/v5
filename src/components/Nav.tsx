import {
  HomeIcon,
  CollectionIcon,
  AdjustmentsIcon,
  PencilIcon,
  TerminalIcon,
} from '@heroicons/react/outline'
import { NavItem } from './NavItem'

import { useAtom } from 'jotai'
import { commandMenuOpen } from './CommandMenu/store'

export const Nav: React.VFC = () => {
  const [open, setOpen] = useAtom(commandMenuOpen)

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-20 mx-auto flex w-fit items-center gap-2 rounded-xl bg-white/50 px-2 py-1 shadow-xl backdrop-blur-sm dark:border-zinc-600/20 dark:bg-zinc-600/30 md:bottom-8 md:gap-3 md:px-3 md:py-2">
      <NavItem title="Home" href="/" icon={HomeIcon} />
      <NavItem title="Projects" href="/projects" icon={CollectionIcon} />
      <button
        title="Command Menu"
        onClick={() => {
          setOpen(!open)
        }}
        className="transform cursor-pointer rounded-full bg-white/80 p-2 shadow-lg backdrop-blur transition hover:scale-105 dark:border-zinc-600/20 dark:bg-zinc-600/30 md:p-3"
      >
        <AdjustmentsIcon strokeWidth={1.6} className="h-10 w-10" />
      </button>
      <NavItem title="Writing" href="/writing" icon={PencilIcon} />
      <NavItem title="Uses" href="/uses" icon={TerminalIcon} />
    </nav>
  )
}
