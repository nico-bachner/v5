type Key = {
  name: string
  weight: number
}

export type SearchInput = {
  items: any[]
  query?: string
  keys: Key[]
}
