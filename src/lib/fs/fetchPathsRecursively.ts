import { fetchPaths } from 'lib/fs/fetchPaths'
import { fetchDirs } from 'lib/fs/fetchDirs'

import type { Fetch } from 'lib/types'
import type { FilePath } from 'lib/fs/types'

const fetchPathsRecursively: Fetch<FilePath, string[][]> = async ({
  basePath,
  path,
  extension,
}) => {
  const paths = await fetchPaths({
    basePath,
    path,
    extension,
  })

  const dirs = await fetchDirs({
    basePath,
    path,
  })

  if (!dirs.length) {
    return paths
  }

  const restPaths = await Promise.all(
    dirs.map(
      async (path) =>
        await fetchPathsRecursively({
          basePath,
          path,
          extension,
        })
    )
  )

  return [paths, ...restPaths].flat()
}
