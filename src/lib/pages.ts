import { search } from './search'

export const getQueriedPages = (pages: any[], query?: string) => {
  if (!query) {
    return pages
  }

  return search({
    items: pages,
    query,
    keys: [
      {
        name: 'title',
        weight: 0.8,
      },
      {
        name: 'description',
        weight: 0.2,
      },
    ],
  })
}

export const getFilteredPages = (pages: any[], filter?: string) => {
  if (!filter) {
    return pages
  }

  return pages.filter(({ category }) => category.toLowerCase() == filter)
}
