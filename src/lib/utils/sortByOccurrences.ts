export const sortByOccurrences = (items: string[]) => {
  const all: Record<string, number> = {}

  items.forEach((item) => {
    all[item] = all[item] ? all[item] + 1 : 1
  })

  const sorted = Object.fromEntries(
    Object.entries(all).sort(([, a], [, b]) => b - a)
  )

  return Object.keys(sorted)
}
