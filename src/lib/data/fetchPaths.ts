import { fetchPaths as fetchLocalPaths } from 'lib/fs/fetchPaths'
import { config } from 'config'

import type { Fetch } from 'lib/types'

const { basePath, extension } = config.content.pages

export const fetchPaths: Fetch<string[], string[][]> = async (path) =>
  await fetchLocalPaths({
    basePath,
    path,
    extension,
  })
