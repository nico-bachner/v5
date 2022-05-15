import assert from 'assert'
import { config } from 'config'
import { fetchFile, fetchPaths } from 'lib/fs'
import { fetchDateUpdated, getEditUrl } from 'lib/github'
import { getMDXData } from 'lib/mdx'

import type { MDXPageData, JSONPageData } from './types'

export const fetchPageData: Fetch<string[], JSONPageData> = async (path) => {
  const file = await fetchFile({
    basePath: ['content', 'pages'],
    path,
    extension: 'mdx',
  })

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
    ...config.repo,
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
      ...config.repo,
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

export const fetchPagesData = async () => {
  const paths = await fetchPaths({
    basePath: ['content', 'pages'],
    path: [],
    extension: 'mdx',
  })
  const data = await Promise.all(
    paths.map(async (path) => await fetchPageData(path))
  )

  return data.flat().sort((a, b) => {
    if (a.firstUpdated && b.firstUpdated) {
      return b.firstUpdated - a.firstUpdated
    }

    if (a.firstUpdated) {
      return 0 - a.firstUpdated
    }

    if (b.firstUpdated) {
      return b.firstUpdated - 0
    }

    if (a.lastUpdated && b.lastUpdated) {
      return b.lastUpdated - a.lastUpdated
    }

    if (a.lastUpdated) {
      return 0 - a.lastUpdated
    }

    if (b.lastUpdated) {
      return b.lastUpdated - 0
    }

    return 0
  })
}
