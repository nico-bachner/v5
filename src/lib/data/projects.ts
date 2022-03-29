import { fetchFile, fetchPaths } from 'lib/fs'
import { getMDXData } from 'lib/mdx'

import type { ProjectData } from './types'
const basePath = ['content', 'pages']
const path = ['projects']
const extension = 'mdx'

const fetchProjectData: Fetch<string[], ProjectData> = async (path) => {
  const file = await fetchFile({ basePath, path, extension })

  const {
    title,
    description,
    featured = false,
    visible = true,
    from,
    to = null,
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
  if (!(from instanceof Date)) {
    throw new Error(`'from' should be a Date (${path})`)
  }
  if (to != null && !(to instanceof Date)) {
    throw new Error(`'to', if used, should be a Date (${path})`)
  }

  return {
    path,
    title,
    description,
    featured,
    visible,
    from: from.getTime(),
    to: to ? to.getTime() : null,
  }
}

export const fetchProjectsData = async () => {
  const paths = await fetchPaths({ basePath, path, extension })

  const projects = await Promise.all(
    paths.map(async (path) => await fetchProjectData(path))
  )

  return projects
    .filter(({ visible }) => visible)
    .sort((a, b) => {
      if (a.to && b.to) {
        return b.to - a.to
      }

      if (a.to && !b.to) {
        return 1
      }

      if (!a.to && b.to) {
        return -1
      }

      return b.from - a.from
    })
}
