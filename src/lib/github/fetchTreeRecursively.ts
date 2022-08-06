import { fetchTree } from './fetchTree'

import type { Fetch } from 'lib/types'
import type { Tree } from 'lib/github/types/tree'

type FetchTreeRecursivelyInput = {
  basePath: string[]
  parentTree: Tree
}

export const fetchTreeRecursively: Fetch<
  FetchTreeRecursivelyInput,
  Tree
> = async ({ basePath, parentTree }) => {
  let i = 0
  let tree = parentTree

  while (i <= basePath.length) {
    console.log(tree)
    tree = await fetchTree({ parentTree: tree, name: basePath[i] })
    console.log(tree)
  }

  return tree
}
