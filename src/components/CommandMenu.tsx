import { Dialog } from 'components/Dialog'
import { CommandMenuSearch } from './CommandMenuSearch'
import { CommandMenuOption } from './CommandMenuOption'

import { useAtom } from 'jotai'
import { commandMenuQuery, isCommandMenuOpen } from 'store'
import { useKeyboardShortcuts } from 'hooks/useKeyboardShortcut'
import { useCommandMenuOptions } from 'hooks/useCommandMenuOptions'

export const CommandMenu: React.VFC = () => {
  const options = useCommandMenuOptions()

  useKeyboardShortcuts(
    options.map(({ shortcut, action }) => ({
      keys: shortcut,
      action,
    }))
  )

  const [isOpen, setIsOpen] = useAtom(isCommandMenuOpen)
  const [query, setQuery] = useAtom(commandMenuQuery)

  const filteredOptions = query
    ? options.filter(({ title }) =>
        title.toLowerCase().includes(query.toLowerCase())
      )
    : options

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false)
      }}
      afterClose={() => {
        setQuery(undefined)
      }}
    >
      <CommandMenuSearch options={options}>
        {filteredOptions.length > 0 ? (
          <>
            {filteredOptions.filter(({ type }) => type == 'general').length >
            0 ? (
              <>
                <p className="mx-4 mb-2 mt-4 text-sm">General</p>
                {filteredOptions
                  .filter(({ type }) => type == 'general')
                  .map((option) => (
                    <CommandMenuOption key={option.title} {...option} />
                  ))}
              </>
            ) : null}
            {filteredOptions.filter(({ type }) => type == 'page').length > 0 ? (
              <>
                <p className="mx-4 mb-2 mt-4 text-sm">Navigation</p>
                {filteredOptions
                  .filter(({ type }) => type == 'page')
                  .map((option) => (
                    <CommandMenuOption key={option.title} {...option} />
                  ))}
              </>
            ) : null}
            {filteredOptions.filter(({ type }) => type == 'link').length > 0 ? (
              <>
                <p className="mx-4 mb-2 mt-4 text-sm">Links</p>
                {filteredOptions
                  .filter(({ type }) => type == 'link')
                  .map((option) => (
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
