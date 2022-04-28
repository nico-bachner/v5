import { SearchIcon } from 'icons'

import { useEffect, useRef, useState } from 'react'

type SearchProps = {
  query: string | undefined
  onQueryChange: (query: string) => void
}

export const Search: React.VFC<SearchProps> = ({ query, onQueryChange }) => {
  const [focused, setFocused] = useState(false)

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key == '/') {
        ref.current?.focus()
      }
    }

    window.addEventListener('keyup', handleKeydown)

    return () => {
      window.removeEventListener('keyup', handleKeydown)
    }
  })

  return (
    <div
      className={[
        'flex w-full rounded-lg border-2',
        focused
          ? 'border-zinc-400 dark:border-zinc-500'
          : 'border-zinc-300 dark:border-zinc-600',
      ].join(' ')}
    >
      <SearchIcon className="box-content h-6 w-6 p-3 text-zinc-400 dark:text-zinc-500" />

      <input
        type="search"
        spellCheck="false"
        placeholder="Press / to search"
        value={query}
        onChange={({ target }) => {
          onQueryChange(target.value)
        }}
        ref={ref}
        onFocus={() => {
          setFocused(true)
        }}
        onBlur={() => {
          setFocused(false)
        }}
        className="w-full rounded-lg bg-transparent pr-2 text-base text-inherit outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
      />
    </div>
  )
}
