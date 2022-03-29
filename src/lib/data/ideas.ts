import { fetchFile, fetchPaths } from 'lib/fs'
import { getMDXData } from 'lib/mdx'
import { ideaTypes } from './ideaTypes'

import type { IdeaData } from './types'

const fetchIdeaData: Fetch<string[], IdeaData> = async (path) => {
  const file = await fetchFile({
    basePath: ['content', 'pages'],
    path,
    extension: 'mdx',
  })

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
    type: path[0],
    published: published ? published.getTime() : null,
    reading_time: [
      Math.round(file.split(' ').length / 350),
      Math.round(file.split(' ').length / 200),
    ],
  }
}

export const fetchIdeasData = async () => {
  const ideasData = await Promise.all(
    ideaTypes.map(
      async (type) =>
        await Promise.all(
          (
            await fetchPaths({
              basePath: ['content', 'pages'],
              path: [type],
              extension: 'mdx',
            })
          ).map(async (path) => await fetchIdeaData(path))
        )
    )
  )

  return ideasData
    .flat()
    .filter(({ visible }) => visible)
    .sort((a, b) => b.published - a.published)
}
