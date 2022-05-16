import { readdir } from 'fs/promises'

import type { Fetch } from 'lib/types'
import type { DirPath } from 'lib/fs/types'

export const fetchDirs: Fetch<DirPath, string[][]> = async ({
  basePath,
  path,
}) => {
  const files = await readdir(
    [process.cwd(), ...basePath, ...path].join('/'),
    'utf-8'
  )

  return files
    .filter((file) => file.split('.').length == 1)
    .map((file) => [...path, file])
}
