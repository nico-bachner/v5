import { fetchJSON } from './fetchJSON'
import { config } from 'config'

import type { Fetch } from 'lib/types'
import type { FilePath } from 'lib/fs/types'
import type { CommitHistory } from 'lib/github/types/commits'

export const fetchDateUpdated: Fetch<FilePath, Date | undefined> = async ({
  basePath,
  path,
  extension,
}) => {
  const { user, repo } = config.repo

  const fullPath = [...basePath, ...path].join('/')
  const fullFilePath = [fullPath, extension].join('.')

  const commitHistory: CommitHistory = await fetchJSON(
    [
      'https://api.github.com/repos',
      user,
      repo,
      `commits?path=${fullFilePath}`,
    ].join('/')
  )
  const latestCommit = commitHistory[0]

  if (latestCommit) {
    return new Date(latestCommit.commit.author.date)
  }
}
