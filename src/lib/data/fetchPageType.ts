import { getMDXData } from 'lib/mdx'
import { fetchPage } from './fetchPage'

import type { Fetch } from 'lib/types'
import type { JSONPageData } from './types'

export const fetchPageType: Fetch<string[], JSONPageData['type']> = async (
  path
) => {
  const file = await fetchPage(path)

  const { type } = getMDXData(file)

  if (type && typeof type != 'string') {
    throw new Error(`'type' should be a string (${path})`)
  }

  return type
}
