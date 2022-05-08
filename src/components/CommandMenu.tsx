import { Combobox } from '@headlessui/react'
import { Dialog } from 'components/Dialog'
import {
  ClipboardCopyIcon,
  CodeIcon,
  ContactIcon,
  FileSearchIcon,
  GitHubIcon,
  HomeIcon,
  LayoutGridIcon,
  MailIcon,
  MonitorIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  TwitterIcon,
  TypeIcon,
} from 'icons'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { useTheme } from 'next-themes'
import { useKeyboardShortcuts } from 'hooks/useKeyboardShortcuts'
import { storedCommandMenuOpen, storedReaderMode } from 'store'

export type Option = {
  id: string
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  title: string
  group?: string
  shortcut?: string
  action?: () => void
  children?: Option[]
}

export const CommandMenu: React.VFC = () => {
  const [open, setOpen] = useAtom(storedCommandMenuOpen)
  const [readerMode, setReaderMode] = useAtom(storedReaderMode)

  const [events, setEvents] = useState<(() => void)[]>([])
  const [query, setQuery] = useState('')
  const [recents, setRecents] = useState<Option[]>([])
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const [tab, setTab] = useState(['Home'])

  const { setTheme } = useTheme()
  const { push } = useRouter()

  const options: Option[] = [
    {
      id: 'Copy URL',
      icon: ClipboardCopyIcon,
      title: 'Copy Current URL',
      group: 'general',
      shortcut: 'ctrl+c',
      action: () => {
        navigator.clipboard.writeText(window.location.href)
      },
    },
    {
      id: 'Theme',
      icon: MonitorIcon,
      title: 'Change Theme...',
      group: 'general',
      shortcut: 'ctrl+t',
      action: () => {
        setOpen(true)
        setTab(['Home', 'Theme'])
      },
      children: [
        {
          id: 'Light Theme',
          icon: SunIcon,
          title: 'Change Theme to Light',
          group: 'general',
          action: () => {
            setTheme('light')
          },
        },
        {
          id: 'Dark Theme',
          icon: MoonIcon,
          title: 'Change Theme to Dark',
          group: 'general',
          action: () => {
            setTheme('dark')
          },
        },
        {
          id: 'System Theme',
          icon: MonitorIcon,
          title: 'Change Theme to System',
          group: 'general',
          action: () => {
            setTheme('system')
          },
        },
      ],
    },
    {
      id: 'Reader Mode',
      icon: TypeIcon,
      title: 'Toggle Reader Mode',
      group: 'general',
      shortcut: 'ctrl+r',
      action: () => {
        setReaderMode(readerMode == 'sans' ? 'serif' : 'sans')
      },
    },
    {
      id: 'Home',
      icon: HomeIcon,
      title: 'Go Home',
      group: 'navigation',
      shortcut: 'ctrl+1',
      action: () => {
        push('/')
      },
    },
    {
      id: 'Projects',
      icon: LayoutGridIcon,
      title: 'View Projects',
      group: 'navigation',
      shortcut: 'ctrl+2',
      action: () => {
        push('/projects')
      },
    },
    {
      id: 'Pages',
      icon: FileSearchIcon,
      title: 'Search Pages',
      group: 'navigation',
      shortcut: 'ctrl+3',
      action: () => {
        push('/pages')
      },
    },
    {
      id: 'GitHub',
      icon: GitHubIcon,
      title: 'Follow Me on GitHub',
      group: 'social',
      action: () => {
        window.open('https://github.com/nico-bachner')
      },
    },
    {
      id: 'Twitter',
      icon: TwitterIcon,
      title: 'Follow Me on Twitter',
      group: 'social',
      action: () => {
        window.open('https://twitter.com/nico_bachner')
      },
    },
    {
      id: 'CV',
      icon: ContactIcon,
      title: 'Curriculum Vitae',
      group: 'miscellaneous',
      action: () => {
        window.open('https://read.cv/nico_bachner')
      },
    },
    {
      id: 'Email',
      icon: MailIcon,
      title: 'Send Me an Email',
      group: 'miscellaneous',
      action: () => {
        window.open('mailto:mail@nbac.me')
      },
    },
    {
      id: 'Source',
      icon: CodeIcon,
      title: 'View Source Code',
      group: 'miscellaneous',
      action: () => {
        window.open('https://github.com/nico-bachner/v5')
      },
    },
  ]

  useKeyboardShortcuts(
    [
      {
        shortcut: 'cmd+k',
        action: () => {
          setOpen(!open)
        },
      },
      {
        shortcut: 'ctrl+k',
        action: () => {
          setOpen(!open)
        },
      },
      ...options,
    ].map(({ shortcut, action }) => ({ shortcut, action }))
  )

  const recentOptions = recents
    .map((item) => {
      const option = options.find(({ id }) => id == item.id)

      if (option) {
        return { ...option, group: 'recents' }
      }

      return null
    })
    .filter((option) => option != null)
    .slice(0, 2) as Option[]

  const getFilteredOptions = () => {
    if (tab[tab.length - 1] == 'Home') {
      return [...recentOptions, ...options].filter(({ title }) =>
        title.toLowerCase().includes(query.toLowerCase())
      )
    }

    return [...recentOptions, ...options]
      .find(({ id }) => tab[tab.length - 1] == id)
      ?.children?.filter(({ title }) =>
        title.toLowerCase().includes(query.toLowerCase())
      )
  }

  const filteredOptions = getFilteredOptions()

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false)
      }}
      afterClose={() => {
        setTab(['Home'])
        setQuery('')

        events.forEach((event) => {
          event()
        })
      }}
    >
      <Combobox
        as="div"
        value={selectedOption}
        onChange={(option) => {
          setSelectedOption(option)

          if (option) {
            if (option.children) {
              setTab([...tab, option.id])
            } else {
              setOpen(!open)

              setEvents([
                ...events,
                () => {
                  setRecents([
                    option,
                    ...recents.filter(({ id }) => id != option.id),
                  ])
                },
              ])
            }

            if (option.action) {
              option.action()
            }
          }
        }}
        className="relative rounded-xl border border-white/20 bg-white/75 shadow-xl backdrop-blur-lg dark:border-zinc-700 dark:bg-black/75"
      >
        <div className="flex flex-col-reverse">
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

          <div className="mx-4 flex items-center justify-between gap-4 pt-2">
            <div className="flex gap-2">
              {tab.map((item, i) => (
                <button
                  key={item}
                  onClick={() => {
                    setTab(tab.slice(0, i + 1))
                  }}
                  className="rounded bg-black/5 px-2 py-0.5 text-sm text-zinc-500 dark:bg-white/10 dark:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
            <kbd className="mx-2 font-sans text-zinc-400 transition dark:text-zinc-500">
              ⌘K
            </kbd>
          </div>
        </div>

        <hr className="border-zinc-200 dark:border-zinc-700" />

        <Combobox.Options
          static
          className="flex max-h-72 flex-col overflow-auto pb-2"
        >
          {filteredOptions && filteredOptions.length > 0 ? (
            filteredOptions
              .filter(
                ({ group }, i) =>
                  filteredOptions.map(({ group }) => group).indexOf(group) == i
              )
              .map(({ group }) => {
                const filteredTypeOptions = filteredOptions.filter(
                  (option) => option.group == group
                )

                return (
                  <div key={group}>
                    {filteredTypeOptions.length > 0 ? (
                      <>
                        <p className="mx-4 mb-1 mt-4 text-sm capitalize text-zinc-600 dark:text-zinc-400">
                          {group}
                        </p>
                        {filteredTypeOptions.map((option) => {
                          const { id, icon: Icon, title, shortcut } = option

                          return (
                            <Combobox.Option
                              key={id}
                              value={option}
                              className="focus:outline-none"
                            >
                              {({ active }) => (
                                <div
                                  className={[
                                    'mx-2 flex cursor-pointer items-center rounded-lg transition duration-200',
                                    active
                                      ? 'bg-black/5 text-black dark:bg-white/10 dark:text-white'
                                      : 'text-zinc-600 dark:text-zinc-400',
                                  ].join(' ')}
                                  data-splitbee-event={`Select Command Menu Option: ${id}`}
                                >
                                  <Icon
                                    strokeWidth={1.5}
                                    className="box-content h-6 w-6 p-4"
                                  />
                                  <div className="flex flex-grow items-center justify-between gap-4 p-4 pl-1">
                                    <span>{title}</span>
                                    <kbd
                                      className={[
                                        'font-sans transition',
                                        active
                                          ? 'text-zinc-500 dark:text-zinc-400'
                                          : 'text-zinc-400 dark:text-zinc-500',
                                      ].join(' ')}
                                    >
                                      {shortcut
                                        ?.split('+')
                                        .join('')
                                        .replace('cmd', '⌘')
                                        .replace('alt', '⌥')
                                        .replace('ctrl', '^')
                                        .toUpperCase()}
                                    </kbd>
                                  </div>
                                </div>
                              )}
                            </Combobox.Option>
                          )
                        })}
                      </>
                    ) : null}
                  </div>
                )
              })
          ) : (
            <p className="mx-4 p-2 text-zinc-500">No results found</p>
          )}
        </Combobox.Options>
      </Combobox>
    </Dialog>
  )
}
