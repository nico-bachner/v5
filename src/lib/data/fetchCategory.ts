import { getMDXData } from 'lib/mdx'
import { fetchPage } from './fetchPage'

import type { Fetch } from 'lib/types'
import type { JSONPageData } from './types'

export const fetchPageCategory: Fetch<
  string[],
  JSONPageData['category']
> = async (path) => {
  const file = await fetchPage(path)

  const { category = 'Other' } = getMDXData(file)

  if (typeof category != 'string') {
    throw new Error(`'category' should be a string (${path})`)
  }

  return category
}
