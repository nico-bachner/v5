export interface Item {
  path: string
  mode: string
  type: 'tree' | 'blob'
  sha: string
  size?: number
  url: string
}

export interface Tree {
  sha: string
  url: string
  tree: Item[]
  truncated: boolean
}
