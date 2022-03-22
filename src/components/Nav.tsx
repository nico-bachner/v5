import {
  HomeIcon,
  CollectionIcon,
  AdjustmentsIcon,
  PencilIcon,
  TerminalIcon,
} from '@heroicons/react/outline'
import { NavItem } from './NavItem'

import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { commandMenuOpen } from './CommandMenu/store'

export const Nav: React.VFC = () => {
  const [open, setOpen] = useAtom(commandMenuOpen)
  const { pathname } = useRouter()

  return (
    <motion.nav
      initial={{ y: 200, filter: 'opacity(0%)' }}
      animate={{ y: 0, filter: 'opacity(100%)' }}
      transition={{ delay: pathname == '/' ? 1 : 0.5 }}
      className="fixed bottom-4 left-0 right-0 z-20 mx-auto flex w-fit items-center gap-2 rounded-xl bg-white/80 px-3 py-1 shadow-xl backdrop-blur dark:bg-zinc-900/80 md:bottom-8"
    >
      <NavItem title="Home" href="/" icon={HomeIcon} />
      <NavItem title="Projects" href="/projects" icon={CollectionIcon} />
      <button
        title="Command Menu"
        onClick={() => {
          setOpen(!open)
        }}
        className="transform cursor-pointer rounded-full bg-white/80 p-3 shadow-lg backdrop-blur transition hover:scale-105 dark:bg-zinc-800/80"
      >
        <AdjustmentsIcon strokeWidth={1.5} className="h-10 w-10" />
      </button>
      <NavItem title="Writing" href="/writing" icon={PencilIcon} />
      <NavItem title="Uses" href="/uses" icon={TerminalIcon} />
    </motion.nav>
  )
}
