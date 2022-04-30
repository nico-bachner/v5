import { FilterIcon } from 'icons'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { sortByOccurrences } from 'lib/sortByOccurrences'

type FilterProps = {
  pages: any[]
  onFilterChange: (filter: string) => void
}

export const Filter: React.VFC<FilterProps> = ({ pages, onFilterChange }) => {
  const [filter, setFilter] = useState('')

  const { query } = useRouter()

  useEffect(() => {
    const filter = query.filter

    if (filter) {
      setFilter(Array.isArray(filter) ? filter[0] : filter)
    }
  }, [query])

  const categories = sortByOccurrences(pages.map(({ category }) => category))

  return (
    <div className="flex w-full items-center gap-4">
      <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
        <FilterIcon strokeWidth={1.5} className="h-4 w-4 sm:h-6 sm:w-6" />
        <p className="text-sm sm:text-base">Filter</p>
      </div>

      <div className="flex w-full gap-1 overflow-scroll sm:gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              const newFilter =
                category.toLowerCase() == filter ? '' : category.toLowerCase()

              setFilter(newFilter)
              onFilterChange(newFilter)
            }}
            className={[
              'rounded px-2 py-1 text-sm font-medium sm:px-3 sm:py-1.5 sm:text-base',
              category.toLowerCase() == filter
                ? 'bg-zinc-300 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200'
                : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
            ].join(' ')}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
