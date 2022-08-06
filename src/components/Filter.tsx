import { FilterIcon } from 'icons'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

type FilterProps = {
  filters: string[]
  filter: string
  onFilterChange: (filter: string) => void
}

export const Filter: React.VFC<FilterProps> = ({
  filters,
  filter,
  onFilterChange,
}) => {
  const router = useRouter()
  const { query } = router

  useEffect(() => {
    if (query.filter) {
      onFilterChange(
        Array.isArray(query.filter) ? query.filter[0] : query.filter
      )
    }
  }, [])

  useEffect(() => {
    onFilterChange(filter)

    router.push(
      { query: filter == '' ? {} : { filter } },
      { query: filter == '' ? {} : { filter } },
      { shallow: true }
    )
  }, [filter])

  return (
    <div className="flex w-full items-center gap-4">
      <div className="flex items-center gap-1 text-zinc-500">
        <FilterIcon strokeWidth={1.5} className="h-4 w-4 sm:h-6 sm:w-6" />
        <p className="text-sm sm:text-base">Filter</p>
      </div>

      <div className="flex w-max gap-1 overflow-scroll sm:gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              onFilterChange(
                filter.toLowerCase() == filter ? '' : filter.toLowerCase()
              )
            }}
            className={[
              'w-max rounded px-2 py-1 text-sm font-medium sm:px-3 sm:py-1.5 sm:text-base',
              filter.toLowerCase() == filter
                ? 'bg-zinc-300 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400'
                : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800',
            ].join(' ')}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  )
}
