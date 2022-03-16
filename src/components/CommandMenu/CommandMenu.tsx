import { Dialog } from 'components/Dialog'
import { CommandMenuSearch } from './CommandMenuSearch'
import { CommandMenuOption } from './CommandMenuOption'

import { useEffect } from 'react'
import { useAtom } from 'jotai'
import {
  commandMenuOpen,
  commandMenuTab,
  commandMenuQuery,
  pageLoaded,
} from './store'
import { commandMenuOptions } from './store'
import { useKeyboardShortcuts } from 'hooks/useKeyboardShortcuts'
import { useCommandMenuOptions } from './useCommandMenuOptions'

export const CommandMenu: React.VFC = () => {
  const [loaded, setLoaded] = useAtom(pageLoaded)
  const [open, setOpen] = useAtom(commandMenuOpen)
  const [tab, setTab] = useAtom(commandMenuTab)
  const [query, setQuery] = useAtom(commandMenuQuery)
  const [options, setOptions] = useAtom(commandMenuOptions)

  console.log(options.toString())

  const allOptions = useCommandMenuOptions()

  useEffect(() => {
    if (!loaded) {
      setOptions(allOptions)
      setLoaded(true)
    }
  }, [loaded, setLoaded, allOptions, setOptions])

  useKeyboardShortcuts(options)

  const filteredOptions =
    tab[tab.length - 1] == 'Home'
      ? options.filter(({ title }) =>
          title.toLowerCase().includes(query.toLowerCase())
        )
      : options
          .find(({ id }) => tab[tab.length - 1] == id)
          ?.children?.filter(({ title }) =>
            title.toLowerCase().includes(query.toLowerCase())
          )

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false)
      }}
      afterClose={() => {
        setTab(['Home'])
        setQuery('')
      }}
    >
      <CommandMenuSearch options={options}>
        {filteredOptions && filteredOptions.length > 0 ? (
          <>
            {['recents', 'general', 'navigation', 'links'].map((group) => {
              const filteredTypeOptions = filteredOptions.filter(
                ({ group: optionGroup }) => optionGroup == group
              )

              return (
                <div key={group}>
                  {filteredTypeOptions.length > 0 ? (
                    <>
                      <p className="mx-4 mb-2 mt-4 text-sm capitalize text-zinc-600 dark:text-zinc-400">
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
