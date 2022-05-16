import { config } from 'config'

import type { Get } from 'lib/types'
import type { FilePath } from 'lib/fs/types'

export const getEditUrl: Get<FilePath, string> = ({
  basePath,
  path,
  extension,
}) => {
  const { user, repo, baseBranch } = config.repo

  const fullPath = [...basePath, ...path].join('/')
  const fullFilePath = [fullPath, extension].join('.')

  const editUrl = [
    'https://github.com',
    user,
    repo,
    'edit',
    baseBranch,
    fullFilePath,
  ].join('/')

  return editUrl
}
