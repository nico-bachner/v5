import { Combobox } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/outline'

import { useState } from 'react'
import { useAtom } from 'jotai'
import { commandMenuQuery, isCommandMenuOpen } from 'store'
import { commandMenuHistory } from './history'

import type { CommandMenuOption } from './types'

type CommandMenuSearchProps = {
  options: CommandMenuOption[]
}

export const CommandMenuSearch: React.FC<CommandMenuSearchProps> = ({
  children,
  options,
}) => {
  const [history, setHistory] = useAtom(commandMenuHistory)
  const [query, setQuery] = useAtom(commandMenuQuery)
  const [isOpen, setIsOpen] = useAtom(isCommandMenuOpen)
  const [selectedOption, setSelectedOption] = useState(options[0])

  return (
    <Combobox
      as="div"
      value={selectedOption}
      onChange={(option) => {
        setSelectedOption(option)
        setIsOpen(false)

        option.action()
        setHistory([
          option,
          ...history.filter(({ title }) => title != option.title),
        ])
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
          className="w-full rounded-lg bg-transparent text-base outline-none placeholder:text-zinc-500"
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
