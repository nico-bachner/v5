import { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { useAtom } from 'jotai'
import { isCommandMenuOpen } from 'store'
import { Combobox } from '@headlessui/react'
import {
  AtSymbolIcon,
  CodeIcon,
  CollectionIcon,
  DesktopComputerIcon,
  HomeIcon,
  IdentificationIcon,
  MoonIcon,
  PencilIcon,
  SearchIcon,
  SunIcon,
  TerminalIcon,
} from '@heroicons/react/outline'
import { Dialog } from 'components/Dialog'

export const CommandMenu: React.VFC = () => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const options = [
    {
      Icon: HomeIcon,
      title: 'Home',
      type: 'page',
      shortcut: '^1',
      action: () => {
        router.push('/')
      },
    },
    {
      Icon: CollectionIcon,
      title: 'Projects',
      type: 'page',
      shortcut: '^2',
      action: () => {
        router.push('/projects')
      },
    },
    {
      Icon: PencilIcon,
      title: 'Writing',
      type: 'page',
      shortcut: '^3',
      action: () => {
        router.push('/writing')
      },
    },
    {
      Icon: TerminalIcon,
      title: 'Uses',
      type: 'page',
      shortcut: '^4',
      action: () => {
        router.push('/uses')
      },
    },
    {
      Icon: SunIcon,
      title: 'Change Theme to Light',
      type: 'general',
      action: () => {
        setTheme('light')
      },
    },
    {
      Icon: MoonIcon,
      title: 'Change Theme to Dark',
      type: 'general',
      action: () => {
        setTheme('dark')
      },
    },
    {
      Icon: DesktopComputerIcon,
      title: 'Change Theme to System',
      type: 'general',
      action: () => {
        setTheme('system')
      },
    },
    {
      Icon: IdentificationIcon,
      title: 'Curriculum Vitae',
      type: 'link',
      action: () => {
        window.open('https://read.cv/nico_bachner')
      },
    },
    {
      Icon: AtSymbolIcon,
      title: 'Email',
      type: 'link',
      action: () => {
        window.open('mailto:mail@nbac.me')
      },
    },
    {
      Icon: CodeIcon,
      title: 'Source Code',
      type: 'link',
      shortcut: '⌥⌘U',
      action: () => {
        window.open('https://github.com/nico-bachner/v5')
      },
    },
  ]

  const [isOpen, setIsOpen] = useAtom(isCommandMenuOpen)
  const [query, setQuery] = useState<string | undefined>(undefined)
  const [selectedOption, setSelectedOption] = useState(options[0])

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const { key, ctrlKey, altKey, metaKey } = event

      if ((metaKey || ctrlKey) && key == 'k') {
        event.preventDefault()
        setIsOpen(!isOpen)
      }

      // internal navigation
      if (ctrlKey && key == '1') {
        event.preventDefault()
        router.push('/')
      }
      if (ctrlKey && key == '2') {
        event.preventDefault()
        router.push('/projects')
      }
      if (ctrlKey && key == '3') {
        event.preventDefault()
        router.push('/writing')
      }
      if (ctrlKey && key == '4') {
        event.preventDefault()
        router.push('/uses')
      }

      // external navigation
      if (((altKey && metaKey) || ctrlKey) && key == 'u') {
        event.preventDefault()
        window.open('https://github.com/nico-bachner/v5')
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [isOpen, setIsOpen, router])

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
          {(query
            ? options.filter(({ title }) =>
                title.toLowerCase().includes(query.toLowerCase())
              )
            : options
          ).map((option) => {
            const { Icon, title, shortcut } = option

            return (
              <Combobox.Option
                key={title}
                value={option}
                className="focus:outline-none"
              >
                {({ active }) => (
                  <div
                    className={[
                      'mx-2 flex cursor-pointer items-center gap-2 rounded-lg transition',
                      active
                        ? 'bg-black/5 text-black dark:bg-white/10 dark:text-white'
                        : 'text-zinc-700 dark:text-zinc-300',
                    ].join(' ')}
                  >
                    <Icon className="box-content h-6 w-6 p-4" />
                    <span className="flex-grow text-lg">{title}</span>
                    <kbd
                      className={[
                        'p-4 font-sans transition',
                        active
                          ? 'text-zinc-500 dark:text-zinc-400'
                          : 'text-zinc-400 dark:text-zinc-500',
                      ].join(' ')}
                    >
                      {shortcut}
                    </kbd>
                  </div>
                )}
              </Combobox.Option>
            )
          })}
        </Combobox.Options>
      </Combobox>
    </Dialog>
  )
}
