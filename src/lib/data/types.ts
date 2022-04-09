export type PageData = {
  path: string[]
  title: string
  description: string
  category: string
  featured: boolean
  updated: number | null
  reading_time: [number, number]
}

export type ProjectData = PageData & {
  from: number
  to: number | null
}
