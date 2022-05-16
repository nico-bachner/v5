import { config } from 'config'

import type { Fetch } from 'lib/types'
import type { FilePath } from 'lib/fs/types'

export const fetchFile: Fetch<FilePath, string> = async ({
  basePath,
  path,
  extension,
}) => {
  const { user, repo, baseBranch } = config.repo

  const fullPath = [...basePath, ...path].join('/')
  const fullFilePath = [fullPath, extension].join('.')

  const res = await fetch(
    [
      'https://raw.githubusercontent.com',
      user,
      repo,
      baseBranch,
      fullFilePath,
    ].join('/')
  )

  const file = await res.text()

  return file
}
