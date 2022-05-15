import Fuse from 'fuse.js'

type Key = {
  name: string
  weight: number
}

type SearchInput = {
  items: any[]
  query?: string
  keys: Key[]
}

export const search = ({ items, query, keys }: SearchInput) => {
  if (!query) {
    return items
  }

  const options = {
    keys,
  }

  const fuse = new Fuse(items, options)

  return fuse.search(query).map(({ item }) => item)
}
