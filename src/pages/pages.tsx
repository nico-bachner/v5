import { Head } from 'components/Head'
import { MDX } from 'components/MDX'
import { Search } from 'components/Search'
import { PageCard } from 'components/PageCard'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { sortByOccurrences } from 'lib/sortByOccurrences'
import { fetchFile } from 'lib/fs'
import { fetchMDXContent } from 'lib/mdx'
import { fetchPagesData } from 'lib/data/pages'

import type { NextPage, GetStaticProps } from 'next'
import type { MDXContent } from 'lib/mdx'
import type { PageData } from 'lib/data/types'

type PageProps = {
  pages: PageData[]
  content: MDXContent
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const pages = await fetchPagesData()

  const content = await fetchMDXContent(
    await fetchFile({
      basePath: ['content', 'sections'],
      path: ['pages'],
      extension: 'mdx',
    })
  )

  return {
    props: {
      pages,
      content,
    },
  }
}

const Page: NextPage<PageProps> = ({ pages, content }) => {
  const [filter, setFilter] = useState<string | undefined>(undefined)
  const [query, setQuery] = useState<string | undefined>(undefined)

  const router = useRouter()

  useEffect(() => {
    const filter = router.query.filter

    if (filter) {
      setFilter(Array.isArray(filter) ? filter[0] : filter)
    }
  }, [router.query])

  const queriedPages = query
    ? pages.filter(({ title }) =>
        title.toLowerCase().includes(query.toLowerCase())
      )
    : pages
  const filteredPages = filter
    ? queriedPages.filter(({ category }) => category.toLowerCase() == filter)
    : queriedPages
  const categories = sortByOccurrences(pages.map(({ category }) => category))

  return (
    <>
      <Head
        title="Pages"
        description="A searchable directory of all the pages on this site"
      />

      <main className="px-6 pb-36 pt-20 md:pt-24 lg:pt-28">
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          <h1 className="text-5xl font-black tracking-tight md:text-6xl lg:text-7xl">
            Pages
          </h1>

          <MDX content={content} />

          <div className="flex flex-col gap-4">
            <Search
              query={query}
              onQueryChange={(query) => {
                setQuery(query)
              }}
            />

            <div className="mx-2 flex flex-col flex-wrap items-start justify-between gap-4 sm:mx-4 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <p>Filter:</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setFilter(
                          category.toLowerCase() == filter
                            ? undefined
                            : category.toLowerCase()
                        )
                      }}
                      className={[
                        'rounded px-3 py-1',
                        category.toLowerCase() == filter
                          ? 'bg-zinc-300 dark:bg-zinc-700'
                          : 'bg-zinc-100 dark:bg-zinc-800',
                      ].join(' ')}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              {query ? (
                <p className="self-center py-1 text-zinc-600 dark:text-zinc-400">
                  {filteredPages.length}{' '}
                  {filteredPages.length == 1 ? 'result' : 'results'} found
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {filteredPages.map((page) => (
              <PageCard key={page.path[page.path.length - 1]} {...page} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default Page
