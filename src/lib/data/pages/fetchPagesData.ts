import { fetchPageData } from 'lib/data/pages/fetchPageData'
import { fetchPaths } from '../fetchPaths'

export const fetchPagesData = async () => {
  const paths = await fetchPaths([])

  const data = await Promise.all(
    paths.map(async (path) => await fetchPageData(path))
  )

  return data.sort((a, b) => {
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
