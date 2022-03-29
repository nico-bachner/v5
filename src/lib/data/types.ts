type PageData = {
  path: string[]
  title: string
  description: string
  featured: boolean
  visible: boolean
}

export type ProjectData = PageData & {
  from: number
  to: number | null
}

export type IdeaData = PageData & {
  type: string
  published: number
  reading_time: [number, number]
}
