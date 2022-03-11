import { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'
import { Dialog, Combobox, Transition } from '@headlessui/react'
import {
  AtSymbolIcon,
  CodeIcon,
  CollectionIcon,
  HomeIcon,
  IdentificationIcon,
  PencilIcon,
  SearchIcon,
  TerminalIcon,
} from '@heroicons/react/outline'

const options = [
  {
    Icon: HomeIcon,
    title: 'Home',
    href: '/',
    shortcut: '^1',
  },
  {
    Icon: CollectionIcon,
    title: 'Projects',
    href: '/projects',
    shortcut: '^2',
  },
  {
    Icon: PencilIcon,
    title: 'Writing',
    href: '/writing',
    shortcut: '^3',
  },
  {
    Icon: TerminalIcon,
    title: 'Uses',
    href: '/uses',
    shortcut: '^4',
  },
  {
    Icon: IdentificationIcon,
    title: 'Curriculum Vitae',
    href: 'https://read.cv/nico_bachner',
  },
  {
    Icon: AtSymbolIcon,
    title: 'Email',
    href: 'mailto:mail@nbac.me',
  },
  {
    Icon: CodeIcon,
    title: 'Source Code',
    href: 'https://github.com/nico-bachner/v5',
    shortcut: '⌥⌘U',
  },
]

export const CommandMenu: React.VFC = () => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
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
  }, [isOpen, router])

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      afterLeave={() => {
        setQuery(undefined)
      }}
    >
      <Dialog
        onClose={() => {
          setIsOpen(false)
        }}
        className="fixed inset-0 z-50 flex h-screen w-screen flex-col justify-center p-6"
      >
        <Transition.Child
          enter="duration-200 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-white/50 backdrop-blur-sm" />
        </Transition.Child>
        <Transition.Child
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            value={selectedOption}
            onChange={(option) => {
              setSelectedOption(option)
              setIsOpen(false)

              const href = option.href
              if (href.startsWith('/')) {
                router.push(href)
              } else {
                window.open(href)
              }
            }}
            className="relative mx-auto w-full max-w-xl rounded-xl border border-white/20 bg-white/90 shadow-xl backdrop-blur-sm"
          >
            <div className="flex w-full px-2 text-slate-600">
              <div className="box-content h-6 w-6 p-4">
                <SearchIcon className="h-full" />
              </div>

              <Combobox.Input
                type="search"
                spellCheck="false"
                placeholder="Search"
                value={query}
                onChange={({ target }) => {
                  setQuery(target.value)
                }}
                className="w-full rounded-lg bg-transparent pr-2 text-base outline-none placeholder:text-slate-400"
              />
            </div>

            <hr />

            <Combobox.Options
              static
              className="flex max-h-80 flex-col gap-2.5 overflow-auto py-2.5"
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
                          'mx-2 flex cursor-pointer gap-4 rounded-lg px-4 align-middle transition duration-300',
                          active
                            ? 'text-slate-800 shadow-lg'
                            : 'text-slate-600 shadow-sm',
                        ].join(' ')}
                      >
                        <Icon className="box-content h-6 w-6 py-4" />
                        <span className="flex-grow py-4 text-lg">{title}</span>
                        <kbd className="py-4 font-sans text-slate-400">
                          {shortcut}
                        </kbd>
                      </div>
                    )}
                  </Combobox.Option>
                )
              })}
            </Combobox.Options>
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
