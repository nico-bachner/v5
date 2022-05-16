import { config } from 'config'

import type { FilePath } from 'lib/fs/types'

export const getNewUrl: Get<Pick<FilePath, 'basePath'>, string> = ({
  basePath,
}) => {
  const { user, repo, baseBranch } = config.repo

  return [
    'https://github.com',
    user,
    repo,
    'new',
    baseBranch,
    ...basePath,
  ].join('/')
}
