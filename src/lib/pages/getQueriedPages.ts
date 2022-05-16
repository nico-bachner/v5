import { getQueriedItems } from 'lib/search'

export const getQueriedPages = (pages: any[], query?: string) =>
  getQueriedItems({
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
