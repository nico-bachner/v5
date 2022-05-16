import { readdir } from 'fs/promises'

import type { Fetch } from 'lib/types'
import type { FilePath } from 'lib/fs/types'

export const fetchPaths: Fetch<FilePath, string[][]> = async ({
  basePath,
  path,
  extension,
}) => {
  const files = await readdir(
    [process.cwd(), ...basePath, ...path].join('/'),
    'utf-8'
  )

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
