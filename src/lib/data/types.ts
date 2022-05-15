export type MDXPageData = {
  category: string
  title: string
  description: string
  image: string | null
  published: Date | null
  from: Date | null
  to: Date | null
  featured: boolean
}

// number and null are used instead of Date and undefined because JSON compatibility is needed
export type JSONPageData = {
  // MDX Frontmatter
  category: string
  title: string
  description: string
  image: string | null
  featured: boolean

  // Extra computed data
  path: string[]
  firstUpdated: number | null
  lastUpdated: number | null
  edit_url: string
  reading_time: [number, number]
}

export type JSONProjectData = JSONPageData & {
  from: number
  to: number | null
}
