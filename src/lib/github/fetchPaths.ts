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
  const treeUrl = latestCommit.commit.tree.url

  const { tree }: Tree = await fetchJSON(treeUrl)

  const contentTreeUrl = tree.find(({ path }) => path == 'content')?.url

  if (!contentTreeUrl) {
    throw new Error('content tree not found')
  }

  const { tree: contentTree }: Tree = await fetchJSON(contentTreeUrl)

  const pagesTreeUrl = contentTree.find(({ path }) => path == 'pages')?.url

  if (!pagesTreeUrl) {
    throw new Error('pages tree not found')
  }

  const { tree: pagesTree }: Tree = await fetchJSON(pagesTreeUrl)

  const files = pagesTree.map(({ path }) => path)

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
