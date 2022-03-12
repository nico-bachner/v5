import { Combobox } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/outline'

import { useState } from 'react'
import { useAtom } from 'jotai'
import { commandMenuQuery, isCommandMenuOpen } from 'store'

type CommandMenuSearchProps = {
  options: {
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
    title: string
    type: string
    shortcut?: string
    action: () => void
  }[]
}

export const CommandMenuSearch: React.FC<CommandMenuSearchProps> = ({
  children,
  options,
}) => {
  const [_, setIsOpen] = useAtom(isCommandMenuOpen)
  const [query, setQuery] = useAtom(commandMenuQuery)
  const [selectedOption, setSelectedOption] = useState(options[0])

  return (
    <Combobox
      as="div"
      value={selectedOption}
      onChange={(option) => {
        setSelectedOption(option)
        setIsOpen(false)
        option.action()
      }}
      className="relative mx-auto w-full max-w-xl rounded-xl border border-white/20 bg-white/75 shadow-xl backdrop-blur-lg dark:border-zinc-700 dark:bg-black/75"
    >
      <div className="mx-2 flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
        <SearchIcon className="box-content h-6 w-6 p-4" />
        <Combobox.Input
          type="search"
          spellCheck="false"
          placeholder="Search"
          value={query}
          onChange={({ target }) => {
            setQuery(target.value)
          }}
          className="w-full rounded-lg bg-transparent text-base outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
        />
      </div>

      <hr className="border-zinc-200 dark:border-zinc-700" />

      <Combobox.Options
        static
        className="flex max-h-80 flex-col overflow-auto py-2"
      >
        {children}
      </Combobox.Options>
    </Combobox>
  )
}
