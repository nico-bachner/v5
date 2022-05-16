import matter from 'gray-matter'

import type { Get } from 'lib/types'
import type { MDXData } from './types'

export const getMDXData: Get<string, MDXData> = (file) => {
  const { data } = matter(file)

  return data
}
