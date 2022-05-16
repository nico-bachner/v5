import { fetchPaths as fetchLocalPaths } from 'lib/fs/fetchPaths'
import { fetchPaths as fetchRemotePaths } from 'lib/github/fetchPaths'
import { config } from 'config'

import type { Fetch } from 'lib/types'

const { basePath, extension } = config.content.pages

export const fetchPaths: Fetch<string[], string[][]> = async (path) =>
  process.env.NODE_ENV == 'development'
    ? await fetchLocalPaths({
        basePath,
        path,
        extension,
      })
    : await fetchRemotePaths({
        basePath,
        path,
        extension,
      })
