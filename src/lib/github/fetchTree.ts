import { fetchJSON } from './fetchJSON'

import type { Fetch } from 'lib/types'
import type { Tree } from 'lib/github/types/tree'

type FetchTreeInput = {
  parentTree: Tree
  name: string
}

export const fetchTree: Fetch<FetchTreeInput, Tree> = async ({
  parentTree,
  name,
}) => {
  const treeUrl = parentTree.tree.find(({ path }) => path == name)?.url

  if (!treeUrl) {
    throw new Error(`${name} tree not found`)
  }

  const tree: Tree = await fetchJSON(treeUrl)

  return tree
}
