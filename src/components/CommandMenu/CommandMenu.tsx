import { Dialog } from 'components/Dialog'
import { CommandMenuSearch } from './CommandMenuSearch'
import { CommandMenuOption } from './CommandMenuOption'

import { useAtom } from 'jotai'
import { commandMenuQuery, isCommandMenuOpen } from 'store'
import { commandMenuHistory } from './history'
import { useKeyboardShortcuts } from 'hooks/useKeyboardShortcut'
import { useCommandMenuOptions } from './useCommandMenuOptions'

export const CommandMenu: React.VFC = () => {
  const options = useCommandMenuOptions()

  useKeyboardShortcuts(
    options.map(({ shortcut, action }) => ({
      keys: shortcut,
      action,
    }))
  )

  const [history] = useAtom(commandMenuHistory)
  const [query, setQuery] = useAtom(commandMenuQuery)
  const [isOpen, setIsOpen] = useAtom(isCommandMenuOpen)

  const filteredOptions = options.filter(({ title }) =>
    title.toLowerCase().includes(query.toLowerCase())
  )
  const filteredHistory = history.filter(({ title }) =>
    title.toLowerCase().includes(query.toLowerCase())
  )
  const filteredGeneralOptions = filteredOptions.filter(
    ({ type }) => type == 'general'
  )
  const filteredNavigationOptions = filteredOptions.filter(
    ({ type }) => type == 'navigation'
  )
  const filteredLinkOptions = filteredOptions.filter(
    ({ type }) => type == 'link'
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
            {filteredHistory.length > 0 ? (
              <>
                <p className="mx-4 mb-2 mt-4 text-sm">Recents</p>
                {filteredHistory.map((option) => (
                  <CommandMenuOption key={option.title} {...option} />
                ))}
              </>
            ) : null}
            {filteredGeneralOptions.length > 0 ? (
              <>
                <p className="mx-4 mb-2 mt-4 text-sm">General</p>
                {filteredGeneralOptions.map((option) => (
                  <CommandMenuOption key={option.title} {...option} />
                ))}
              </>
            ) : null}
            {filteredNavigationOptions.length > 0 ? (
              <>
                <p className="mx-4 mb-2 mt-4 text-sm">Navigation</p>
                {filteredNavigationOptions.map((option) => (
                  <CommandMenuOption key={option.title} {...option} />
                ))}
              </>
            ) : null}
            {filteredLinkOptions.length > 0 ? (
              <>
                <p className="mx-4 mb-2 mt-4 text-sm">Links</p>
                {filteredLinkOptions.map((option) => (
                  <CommandMenuOption key={option.title} {...option} />
                ))}
              </>
            ) : null}
          </>
        ) : (
          <p className="mx-4 p-2 text-zinc-500">No results found</p>
        )}
      </CommandMenuSearch>
    </Dialog>
  )
}
