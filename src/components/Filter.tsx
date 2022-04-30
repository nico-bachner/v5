import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { sortByOccurrences } from 'lib/sortByOccurrences'

type FilterProps = {
  pages: any[]
  onFilterChange: (filter?: string) => void
}

export const Filter: React.VFC<FilterProps> = ({ pages, onFilterChange }) => {
  const [filter, setFilter] = useState<string | undefined>(undefined)

  const { query } = useRouter()

  useEffect(() => {
    const filter = query.filter

    if (filter) {
      setFilter(Array.isArray(filter) ? filter[0] : filter)
    }
  }, [query])

  const categories = sortByOccurrences(pages.map(({ category }) => category))

  return (
    <div className="flex items-center gap-4">
      <p>Filter:</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              const newFilter =
                category.toLowerCase() == filter
                  ? undefined
                  : category.toLowerCase()

              setFilter(newFilter)
              onFilterChange(newFilter)
            }}
            className={[
              'rounded px-3 py-1',
              category.toLowerCase() == filter
                ? 'bg-zinc-300 dark:bg-zinc-700'
                : 'bg-zinc-100 dark:bg-zinc-800',
            ].join(' ')}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
