// number and null are used instead of Date and undefined because JSON compatibility is needed
export type PageData = {
  // MDX Frontmatter
  category: string
  title: string
  description: string
  image: string | null
  published: number | null
  featured: boolean

  // Extra computed data
  path: string[]
  updated: number | null
  edit_url: string
  reading_time: [number, number]
}

export type ProjectData = PageData & {
  from: number
  to: number | null
}
