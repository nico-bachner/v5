import { SearchIcon } from '@heroicons/react/outline'

import { useEffect, useRef, useState } from 'react'

type SearchProps = {
  query: string
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
        'flex w-full rounded-lg border',
        focused
          ? 'border-zinc-700 dark:border-zinc-300'
          : 'border-zinc-400 dark:border-zinc-600',
      ].join(' ')}
    >
      <SearchIcon
        className={[
          focused
            ? 'text-zinc-700 dark:text-zinc-300'
            : 'text-zinc-500 dark:text-zinc-500',
          'box-content h-6 w-6 p-3',
        ].join(' ')}
      />

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
        className="placeholder:text-zinc-5000 w-full rounded-lg bg-transparent pr-2 text-base text-inherit outline-none"
      />
    </div>
  )
}
