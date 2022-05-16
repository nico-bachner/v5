import { fetchDateUpdated } from 'lib/github/fetchDateUpdated'
import { getEditUrl } from 'lib/github/getEditUrl'
import { getMDXData } from 'lib/mdx'
import { fetchPage } from '../fetchPage'

import type { Fetch } from 'lib/types'
import type { MDXPageData, JSONPageData } from 'lib/data/types'

export const fetchPageData: Fetch<string[], JSONPageData> = async (path) => {
  const file = await fetchPage(path)

  const {
    category = 'Other',
    title,
    description,
    image = null,
    published = null,
    from = null,
    featured = false,
  } = getMDXData(file) as MDXPageData

  if (typeof title != 'string') {
    throw new TypeError(`'title' should be a string (${path})`)
  }
  if (typeof description != 'string') {
    throw new TypeError(`'description' should be a string (${path})`)
  }
  if (image && typeof image != 'string') {
    throw new TypeError(`'image', if used, should be a string (${path})`)
  }
  if (published && !(published instanceof Date)) {
    throw new TypeError(`'published', if used, should be a Date (${path})`)
  }
  if (from && !(from instanceof Date)) {
    throw new TypeError(`'from', if used, should be a Date (${path})`)
  }
  if (typeof featured != 'boolean') {
    throw new TypeError(`'featured', if used, should be a boolean (${path})`)
  }

  const dateUpdated = await fetchDateUpdated({
    basePath: ['content', 'pages'],
    path,
    extension: 'mdx',
  })

  return {
    category,
    title,
    description,
    image,
    featured,

    path,
    firstUpdated: (published as Date | null)
      ? (published as Date).getTime()
      : null,
    lastUpdated: dateUpdated ? dateUpdated.getTime() : null,
    edit_url: getEditUrl({
      basePath: ['content', 'pages'],
      path,
      extension: 'mdx',
    }),
    reading_time: [
      Math.ceil(file.split(' ').length / 230),
      Math.ceil(file.split(' ').length / 180),
    ],
  }
}
