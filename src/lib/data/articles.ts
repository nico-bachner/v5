import { fetchFile, fetchPaths } from 'lib/fs'
import { getMDXData } from 'lib/mdx'

import type { ArticleData } from './types'

const basePath = ['content', 'pages']
const path = ['articles']
const extension = 'mdx'

const fetchArticleData: Fetch<string[], ArticleData> = async (path) => {
  const file = await fetchFile({ basePath, path, extension })

  const {
    title,
    description,
    featured = false,
    visible = true,
    published = false,
  } = getMDXData(file)

  if (typeof title != 'string') {
    throw new Error(`'title' should be a string (${path})`)
  }
  if (typeof description != 'string') {
    throw new Error(`'description' should be a string (${path})`)
  }
  if (typeof featured != 'boolean') {
    throw new Error(`'featured', if used, should be a boolean (${path})`)
  }
  if (typeof visible != 'boolean') {
    throw new Error(`'visible', if used, should be a boolean (${path})`)
  }
  if (published != false && !(published instanceof Date)) {
    throw new Error(`'published', if used, should be a Date (${path})`)
  }

  return {
    path,
    title,
    description,
    featured,
    visible: published ? visible : false,
    published: published ? published.getTime() : null,
    reading_time: Math.round(file.split(' ').length / 220),
  }
}

const fetchArticlesData = async () => {
  const paths = await fetchPaths({ basePath, path, extension })

  const articles = await Promise.all(
    paths.map(async (path) => await fetchArticleData(path))
  )

  return articles
    .filter(({ visible }) => visible)
    .sort((a, b) => b.published - a.published)
}

export { fetchArticlesData }
