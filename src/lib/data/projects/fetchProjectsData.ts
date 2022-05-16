import { fetchPageCategory } from 'lib/data/fetchCategory'
import { fetchPaths } from 'lib/data/fetchPaths'
import { fetchProjectData } from './fetchProjectData'

import type { JSONProjectData } from 'lib/data/types'

export const fetchProjectsData = async () => {
  const paths = await fetchPaths([])

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
