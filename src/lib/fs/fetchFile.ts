import { readFile } from 'fs/promises'

import type { Fetch } from 'lib/types'
import type { FilePath } from 'lib/fs/types'

export const fetchFile: Fetch<FilePath, string> = async ({
  basePath,
  path,
  extension,
}) => {
  const fullPath = [process.cwd(), ...basePath, ...path].join('/')

  const fullFilePath = [fullPath, extension].join('.')

  const file = await readFile(fullFilePath, 'utf-8')

  return file
}
