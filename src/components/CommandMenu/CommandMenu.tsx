import { Combobox } from '@headlessui/react'
import { Dialog } from 'components/Dialog'
import { Search } from './Search'
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
  SunIcon,
  TwitterIcon,
  TypeIcon,
} from 'icons'

import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { useTheme } from 'next-themes'
import { useKeyboardShortcuts } from 'hooks/useKeyboardShortcuts'
import { storedCommandMenuOpen, storedReaderMode } from 'store'
import {
  storedEventsAfterClose,
  storedQuery,
  storedRecents,
  storedTab,
} from './store'

import type { Option } from './types'

export const CommandMenu: React.VFC = () => {
  const [readerMode, setReaderMode] = useAtom(storedReaderMode)
  const [open, setOpen] = useAtom(storedCommandMenuOpen)
  const [events] = useAtom(storedEventsAfterClose)
  const [query, setQuery] = useAtom(storedQuery)
  const [recents] = useAtom(storedRecents)
  const [tab, setTab] = useAtom(storedTab)
  const { setTheme } = useTheme()
  const { push } = useRouter()

  const options: Option[] = [
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

  const filteredOptions =
    tab[tab.length - 1] == 'Home'
      ? [...recentOptions, ...options].filter(({ title }) =>
          title.toLowerCase().includes(query.toLowerCase())
        )
      : [...recentOptions, ...options]
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

        events.forEach((event) => {
          event()
        })
      }}
    >
      <Search options={options}>
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
      </Search>
    </Dialog>
  )
}
