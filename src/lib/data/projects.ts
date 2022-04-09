import { fetchFile, fetchPaths } from 'lib/fs'
import { getMDXData } from 'lib/mdx'
import { fetchPageData, fetchPageCategory } from './pages'

import type { ProjectData } from './types'
const basePath = ['content', 'pages']
const extension = 'mdx'

const fetchProjectData: Fetch<string[], ProjectData> = async (path) => {
  const file = await fetchFile({ basePath, path, extension })

  const {
    category,
    title,
    description,
    image,
    published,
    featured,

    updated,
    edit_url,
    reading_time,
  } = await fetchPageData(path)

  const { from, to = null } = getMDXData(file)

  if (!(from instanceof Date)) {
    throw new Error(`'from' should be a Date (${path})`)
  }
  if (to != null && !(to instanceof Date)) {
    throw new Error(`'to', if used, should be a Date (${path})`)
  }

  return {
    category,
    title,
    description,
    image,
    published,
    featured,

    path,
    updated,
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

  const pathsCategories = await Promise.all(
    paths.map(async (path) => ({
      path,
      category: await fetchPageCategory(path),
    }))
  )

  const projectPaths = pathsCategories.filter(
    ({ category }) => category == 'Projects'
  )

  const projects: ProjectData[] = await Promise.all(
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
