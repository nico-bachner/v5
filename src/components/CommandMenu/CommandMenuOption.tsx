import { Combobox } from '@headlessui/react'

import type { CommandMenuOption as CommandMenuOptionProps } from './types'

export const CommandMenuOption: React.VFC<CommandMenuOptionProps> = (
  option
) => {
  const { icon: Icon, title, shortcut } = option

  return (
    <Combobox.Option key={title} value={option} className="focus:outline-none">
      {({ active }) => (
        <div
          className={[
            'mx-2 flex cursor-pointer items-center rounded-lg transition duration-200',
            active
              ? 'bg-black/5 text-black dark:bg-white/10 dark:text-white'
              : 'text-zinc-600 dark:text-zinc-400',
          ].join(' ')}
        >
          <Icon strokeWidth={1.5} className="box-content h-6 w-6 p-4" />
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
}
