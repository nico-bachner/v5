import { fetchPaths } from 'lib/data/fetchPaths'
import { fetchPageType } from '../fetchPageType'
import { fetchProjectData } from './fetchProjectData'

import type { JSONProjectData } from 'lib/data/types'

export const fetchProjectsData = async () => {
  const paths = await fetchPaths([])

  const pathsCategories = await Promise.all(
    paths.map(async (path) => ({
      path,
      type: await fetchPageType(path),
    }))
  )

  const projectPaths = pathsCategories.filter(({ type }) => type == 'Project')

  const data: JSONProjectData[] = await Promise.all(
    projectPaths.map(async ({ path }) => await fetchProjectData(path))
  )

  return data
    .filter(({ type }) => type == 'Project')
    .sort((a, b) => {
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
