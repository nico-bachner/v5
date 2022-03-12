import Link from 'next/link'
import {
  HomeIcon,
  CollectionIcon,
  PencilIcon,
  AdjustmentsIcon,
} from '@heroicons/react/outline'

import { useAtom } from 'jotai'
import { isCommandMenuOpen } from 'store'

export const Nav: React.VFC = () => {
  const [isOpen, setIsOpen] = useAtom(isCommandMenuOpen)

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-20 mx-auto flex w-fit gap-3 rounded-xl border border-white/20 bg-white/25 p-2 shadow-lg backdrop-blur-sm dark:border-zinc-600/20 dark:bg-zinc-600/25 md:bottom-8">
      <Link href="/">
        <a className="transform rounded-lg border border-white/20 bg-white/25 p-3 shadow-lg backdrop-blur-sm transition hover:scale-105 dark:border-zinc-600/20 dark:bg-zinc-600/25">
          <HomeIcon className="h-8 w-8" />
        </a>
      </Link>
      <Link href="/projects">
        <a className="transform rounded-lg border border-white/20 bg-white/25 p-3 shadow-lg backdrop-blur-sm transition hover:scale-105 dark:border-zinc-600/20 dark:bg-zinc-600/25">
          <CollectionIcon className="h-8 w-8" />
        </a>
      </Link>
      <Link href="/writing">
        <a className="transform rounded-lg border border-white/20 bg-white/25 p-3 shadow-lg backdrop-blur-sm transition hover:scale-105 dark:border-zinc-600/20 dark:bg-zinc-600/25">
          <PencilIcon className="h-8 w-8" />
        </a>
      </Link>
      <div
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        className="transform cursor-pointer rounded-lg border border-white/20 bg-white/25 p-3 shadow-lg backdrop-blur-sm transition hover:scale-105 dark:border-zinc-600/20 dark:bg-zinc-600/25"
      >
        <AdjustmentsIcon className="h-8 w-8" />
      </div>
    </nav>
  )
}
