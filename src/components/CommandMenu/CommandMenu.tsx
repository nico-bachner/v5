import { Dialog } from 'components/Dialog'
import { CommandMenuSearch } from './CommandMenuSearch'
import { CommandMenuOption } from './CommandMenuOption'

import { useAtom } from 'jotai'
import { commandMenuQuery, isCommandMenuOpen } from 'store'
import {
  commandMenuOptions,
  commandMenuHistory,
  showCommandMenuHistory,
} from './store'
import { useKeyboardShortcuts } from 'hooks/useKeyboardShortcuts'
import { useCommandMenuOptions } from './useCommandMenuOptions'
import { useEffect } from 'react'

export const CommandMenu: React.VFC = () => {
  const [isOpen, setIsOpen] = useAtom(isCommandMenuOpen)
  const [query, setQuery] = useAtom(commandMenuQuery)
  const [history] = useAtom(commandMenuHistory)
  const [showHistory, setShowHistory] = useAtom(showCommandMenuHistory)
  const [options, setOptions] = useAtom(commandMenuOptions)

  const allOptions = useCommandMenuOptions()

  useEffect(() => {
    setOptions(allOptions)
    setShowHistory(true)
  }, [allOptions, setOptions, setShowHistory])

  useKeyboardShortcuts(options)

  const filteredOptions = options.filter(({ title }) =>
    title.toLowerCase().includes(query.toLowerCase())
  )
  const filteredHistory = history.filter(({ title }) =>
    title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false)
      }}
      afterClose={() => {
        setQuery('')
      }}
    >
      <CommandMenuSearch options={options}>
        {filteredOptions.length > 0 ? (
          <>
            {showHistory && filteredHistory.length > 0 ? (
              <>
                <p className="mx-4 mb-2 mt-4 text-sm">Recents</p>
                {filteredHistory.map((option) => (
                  <CommandMenuOption key={option.title} {...option} />
                ))}
              </>
            ) : null}
            {['general', 'navigation', 'links'].map((group) => {
              const filteredTypeOptions = filteredOptions.filter(
                ({ group: optionGroup }) => optionGroup == group
              )

              return (
                <div key={group}>
                  {filteredTypeOptions.length > 0 ? (
                    <>
                      <p className="mx-4 mb-2 mt-4 text-sm capitalize">
                        {group}
                      </p>
                      {filteredTypeOptions.map((option) => (
                        <CommandMenuOption key={option.title} {...option} />
                      ))}
                    </>
                  ) : null}
                </div>
              )
            })}
          </>
        ) : (
          <p className="mx-4 p-2 text-zinc-500">No results found</p>
        )}
      </CommandMenuSearch>
    </Dialog>
  )
}
