type KeyboardInputProps = {
  children: string

  meta?: boolean
  shift?: boolean
  alt?: boolean
  ctrl?: boolean
}

export const KeyboardInput: React.VFC<KeyboardInputProps> = ({
  children,

  shift,
  ctrl,
  alt,
  meta,
}) => (
  <kbd className="flex gap-0.5 font-sans text-zinc-400 dark:text-zinc-500">
    {shift ? <span>⇧</span> : null}
    {ctrl ? <span>⌃</span> : null}
    {alt ? <span>⌥</span> : null}
    {meta ? <span>⌘</span> : null}

    {children ? <span>{children.toString().toUpperCase()}</span> : null}
  </kbd>
)
