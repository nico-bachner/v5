import { fetchTreeRecursively } from './fetchTreeRecursively'
import { fetchJSON } from './fetchJSON'
import { config } from 'config'

import type { Fetch } from 'lib/types'
import type { FilePath } from 'lib/fs/types'
import type { CommitHistory } from 'lib/github/types/commits'
import type { Tree } from './types/tree'

export const fetchPaths: Fetch<FilePath, string[][]> = async ({
  basePath,
  path,
  extension,
}) => {
  const { user, repo } = config.repo

  const [latestCommit]: CommitHistory = await fetchJSON(
    ['https://api.github.com/repos', user, repo, 'commits'].join('/')
  )
  const parentTreeUrl = latestCommit.commit.tree.url

  const parentTree: Tree = await fetchJSON(parentTreeUrl)

  const { tree } = await fetchTreeRecursively({ basePath, parentTree })

  const files = tree.map(({ path }) => path)

  if (extension) {
    return files
      .filter((file) => file.includes(extension))
      .map((file) => {
        const [slug] = file.split('.')

        return [...path, slug as string]
      })
  }

  return files.map((file) => {
    const [slug] = file.split('.')

    return [...path, slug as string]
  })
}
