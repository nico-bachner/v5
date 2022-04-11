import { config } from 'config'
import { fetchFile, fetchPaths } from 'lib/fs'
import { fetchDateUpdated, getEditUrl } from 'lib/github'
import { getMDXData } from 'lib/mdx'

import type { PageData } from './types'

export const fetchPageCategory: Fetch<string[], PageData['category']> = async (
  path
) => {
  const file = await fetchFile({
    basePath: ['content', 'pages'],
    path,
    extension: 'mdx',
  })

  const { category = 'Other' } = getMDXData(file)

  if (typeof category != 'string') {
    throw new Error(`'category' should be a string (${path})`)
  }

  return category
}

export const fetchPageData: Fetch<string[], PageData> = async (path) => {
  const file = await fetchFile({
    basePath: ['content', 'pages'],
    path,
    extension: 'mdx',
  })

  const {
    title,
    description,
    image = null,
    published = null,
    featured = false,
  } = getMDXData(file)

  if (typeof title != 'string') {
    throw new Error(`'title' should be a string (${path})`)
  }
  if (typeof description != 'string') {
    throw new Error(`'description' should be a string (${path})`)
  }
  if (image && typeof image != 'string') {
    throw new Error(`'image', if used, should be a string (${path})`)
  }
  if (published && !(published instanceof Date)) {
    throw new Error(`'published', if used, should be a Date (${path})`)
  }
  if (typeof featured != 'boolean') {
    throw new Error(`'featured', if used, should be a boolean (${path})`)
  }

  const dateUpdated = await fetchDateUpdated({
    ...config.repo,
    basePath: ['content', 'pages'],
    path,
    extension: 'mdx',
  })

  return {
    category: await fetchPageCategory(path),
    title,
    description,
    image,
    published: (published as Date | null)
      ? (published as Date).getTime()
      : null,
    featured,

    path,
    updated: dateUpdated ? dateUpdated.getTime() : null,
    edit_url: getEditUrl({
      ...config.repo,
      basePath: ['content', 'pages'],
      path,
      extension: 'mdx',
    }),
    reading_time: [
      Math.ceil(file.split(' ').length / 350),
      Math.ceil(file.split(' ').length / 200),
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
    if (a.updated && b.updated) {
      return b.updated - a.updated
    }

    if (a.updated) {
      return 1
    }

    if (b.updated) {
      return -1
    }

    return 0
  })
}
