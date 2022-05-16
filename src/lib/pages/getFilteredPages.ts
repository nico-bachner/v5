export const getFilteredPages = (pages: any[], filter?: string) => {
  if (!filter) {
    return pages
  }

  return pages.filter(({ category }) => category.toLowerCase() == filter)
}
