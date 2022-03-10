import { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'
import { Dialog, Combobox, Transition } from '@headlessui/react'
import {
  CollectionIcon,
  HomeIcon,
  PencilIcon,
  SearchIcon,
} from '@heroicons/react/outline'

const options = [
  { Icon: HomeIcon, title: 'Home', href: '/' },
  { Icon: CollectionIcon, title: 'Projects', href: '/projects' },
  { Icon: PencilIcon, title: 'Writing', href: '/writing' },
]

export const CommandMenu: React.VFC = ({}) => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeydown = ({ key, metaKey, ctrlKey }: KeyboardEvent) => {
      if (key == 'k' && (metaKey || ctrlKey)) {
        setIsOpen(!isOpen)
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [isOpen])

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      afterLeave={() => {
        setQuery('')
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
            value=""
            onChange={(value: string) => {
              setIsOpen(false)
              router.push(value)
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
              {options
                .filter(({ title }) =>
                  title.toLowerCase().includes(query.toLowerCase())
                )
                .map(({ Icon, title, href }) => (
                  <Combobox.Option
                    key={title}
                    value={href}
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
                      </div>
                    )}
                  </Combobox.Option>
                ))}
            </Combobox.Options>
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
