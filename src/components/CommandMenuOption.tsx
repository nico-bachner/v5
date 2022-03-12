import { Combobox } from '@headlessui/react'

type CommandMenuOptionProps = {
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  title: string
  type: string
  shortcut?: string
  action: () => void
}

export const CommandMenuOption: React.VFC<CommandMenuOptionProps> = (
  option
) => {
  const { icon: Icon, title, shortcut } = option

  return (
    <Combobox.Option key={title} value={option} className="focus:outline-none">
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
}
