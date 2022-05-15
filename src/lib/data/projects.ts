import { fetchFile, fetchPaths } from 'lib/fs'
import { getMDXData } from 'lib/mdx'
import { fetchPageData } from './pages'

import type { JSONPageData, JSONProjectData } from './types'
const basePath = ['content', 'pages']
const extension = 'mdx'

const fetchProjectData: Fetch<string[], JSONProjectData> = async (path) => {
  const file = await fetchFile({ basePath, path, extension })

  const {
    category,
    title,
    description,
    image,
    featured,

    firstUpdated,
    lastUpdated,
    edit_url,
    reading_time,
  } = await fetchPageData(path)

  const { from, to = null } = getMDXData(file)

  if (!(from instanceof Date)) {
    throw new TypeError(`'from' should be a Date (${path})`)
  }
  if (to != null && !(to instanceof Date)) {
    throw new TypeError(`'to', if used, should be a Date (${path})`)
  }

  return {
    category,
    title,
    description,
    image,
    featured,

    path,
    firstUpdated,
    lastUpdated,
    edit_url,
    reading_time,

    from: from.getTime(),
    to: to ? to.getTime() : null,
  }
}

export const fetchProjectsData = async () => {
  const paths = await fetchPaths({
    basePath,
    path: [],
    extension,
  })

  const fetchPageCategory: Fetch<string[], JSONPageData['category']> = async (
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

  const pathsCategories = await Promise.all(
    paths.map(async (path) => ({
      path,
      category: await fetchPageCategory(path),
    }))
  )

  const projectPaths = pathsCategories.filter(
    ({ category }) => category == 'Projects'
  )

  const projects: JSONProjectData[] = await Promise.all(
    projectPaths.map(async ({ path }) => await fetchProjectData(path))
  )

  return projects.sort((a, b) => {
    if (a.to && b.to) {
      return b.to - a.to
    }

    if (a.to) {
      return 1
    }

    if (b.to) {
      return -1
    }

    return b.from - a.from
  })
}
