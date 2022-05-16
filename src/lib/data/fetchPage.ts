import { fetchFile as fetchLocalFile } from 'lib/fs/fetchFile'
import { fetchFile as fetchRemoteFile } from 'lib/github/fetchFile'
import { config } from 'config'

import type { Fetch } from 'lib/types'

const { basePath, extension } = config.content.pages

export const fetchPage: Fetch<string[], string> = async (path) =>
  process.env.NODE_ENV == 'development'
    ? await fetchLocalFile({
        basePath,
        path,
        extension,
      })
    : await fetchRemoteFile({
        basePath,
        path,
        extension,
      })
