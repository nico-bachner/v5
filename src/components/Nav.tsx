import { CommandIcon } from 'icons'

import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { storedCommandMenuOpen } from 'store'

export const Nav: React.VFC = () => {
  const [open, setOpen] = useAtom(storedCommandMenuOpen)

  return (
    <motion.nav
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="fixed bottom-0 left-0 right-0 z-20 flex justify-center p-4 sm:p-6 md:justify-end lg:p-8"
    >
      <button
        title="Command Menu"
        onClick={() => {
          setOpen(!open)
        }}
        className="transform cursor-pointer rounded-full bg-white/80 p-4 shadow-xl backdrop-blur transition hover:scale-110 dark:bg-zinc-800/80"
        data-splitbee-event="Open Command Menu"
      >
        <CommandIcon strokeWidth={1.8} className="h-8 w-8" />
      </button>
    </motion.nav>
  )
}
