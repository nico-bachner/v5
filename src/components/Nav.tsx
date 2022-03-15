import Link from 'next/link'
import {
  HomeIcon,
  CollectionIcon,
  PencilIcon,
  AdjustmentsIcon,
} from '@heroicons/react/outline'

import { useAtom } from 'jotai'
import { commandMenuOpen } from './CommandMenu/store'

export const Nav: React.VFC = () => {
  const [open, setOpen] = useAtom(commandMenuOpen)

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-20 mx-auto flex w-fit gap-3 rounded-xl border border-white/20 bg-white/30 p-2 shadow-lg backdrop-blur-sm dark:border-zinc-600/20 dark:bg-zinc-600/30 md:bottom-8">
      <Link href="/">
        <a
          title="Home"
          className="transform rounded-lg border border-white/20 bg-white/30 p-3 shadow-lg backdrop-blur-sm transition hover:scale-105 dark:border-zinc-600/20 dark:bg-zinc-600/30"
        >
          <HomeIcon className="h-8 w-8" />
        </a>
      </Link>
      <Link href="/projects">
        <a
          title="Projects"
          className="transform rounded-lg border border-white/20 bg-white/30 p-3 shadow-lg backdrop-blur-sm transition hover:scale-105 dark:border-zinc-600/20 dark:bg-zinc-600/30"
        >
          <CollectionIcon className="h-8 w-8" />
        </a>
      </Link>
      <Link href="/writing">
        <a
          title="Writing"
          className="transform rounded-lg border border-white/20 bg-white/30 p-3 shadow-lg backdrop-blur-sm transition hover:scale-105 dark:border-zinc-600/20 dark:bg-zinc-600/30"
        >
          <PencilIcon className="h-8 w-8" />
        </a>
      </Link>
      <button
        title="Command Menu"
        onClick={() => {
          setOpen(!open)
        }}
        className="transform cursor-pointer rounded-lg border border-white/20 bg-white/30 p-3 shadow-lg backdrop-blur-sm transition hover:scale-105 dark:border-zinc-600/20 dark:bg-zinc-600/30"
      >
        <AdjustmentsIcon className="h-8 w-8" />
      </button>
    </nav>
  )
}
