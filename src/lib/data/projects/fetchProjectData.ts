import { getMDXData } from 'lib/mdx'
import { fetchPage } from 'lib/data/fetchPage'
import { fetchPageData } from 'lib/data/pages'

import type { Fetch } from 'lib/types'
import type { JSONProjectData } from 'lib/data/types'

export const fetchProjectData: Fetch<string[], JSONProjectData> = async (
  path
) => {
  const file = await fetchPage(path)

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
