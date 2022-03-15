import { Combobox } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/outline'

import { useState } from 'react'
import { useAtom } from 'jotai'
import { commandMenuOpen, commandMenuTab, commandMenuQuery } from './store'
import { commandMenuOptions, commandMenuHistory } from './store'

import type { CommandMenuOption } from './types'

type CommandMenuSearchProps = {
  options: CommandMenuOption[]
}

export const CommandMenuSearch: React.FC<CommandMenuSearchProps> = ({
  children,
}) => {
  const [options, setOptions] = useAtom(commandMenuOptions)
  const [history, setHistory] = useAtom(commandMenuHistory)
  const [open, setOpen] = useAtom(commandMenuOpen)
  const [tab, setTab] = useAtom(commandMenuTab)
  const [query, setQuery] = useAtom(commandMenuQuery)
  const [selectedOption, setSelectedOption] = useState(options[0])

  return (
    <Combobox
      as="div"
      value={selectedOption}
      onChange={(option) => {
        setSelectedOption(option)

        if (option.children) {
          setTab([...tab, option.id])
        } else {
          setOpen(false)

          setHistory([
            option,
            ...history.filter(({ title }) => title != option.title),
          ])
        }

        if (option.action) {
          option.action()
        }
      }}
      className="relative mx-auto w-full max-w-xl rounded-xl border border-white/20 bg-white/75 shadow-xl backdrop-blur-lg dark:border-zinc-700 dark:bg-black/75"
    >
      <div className="flex flex-col-reverse gap-2">
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

        <div className="mx-4 flex gap-2">
          {tab.map((item, i) => (
            <button
              key={item}
              onClick={() => {
                setTab(tab.slice(0, i + 1))
              }}
              className="rounded bg-black/5 px-2 py-0.5 text-black dark:bg-white/10 dark:text-white"
            >
              {item}
            </button>
          ))}
        </div>
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
