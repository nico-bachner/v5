import Fuse from 'fuse.js'

import type { Get } from 'lib/types'
import type { SearchInput } from './types'

export const getQueriedItems: Get<SearchInput, any[]> = ({
  items,
  query,
  keys,
}) => {
  if (!query) {
    return items
  }

  const options = {
    keys,
  }

  const fuse = new Fuse(items, options)

  return fuse.search(query).map(({ item }) => item)
}
