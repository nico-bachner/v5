import { Head } from 'components/Head'
import { MDX } from 'components/MDX'
import { Search } from 'components/Search'
import { PageCard } from 'components/PageCard'
import { Filter } from 'components/Filter'

import { useState } from 'react'
import { fetchFile } from 'lib/fs'
import { fetchMDXContent } from 'lib/mdx'
import { getFilteredPages, getQueriedPages } from 'lib/pages'
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
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('')

  const queriedPages = getQueriedPages(pages, query)
  const filteredPages = getFilteredPages(queriedPages, filter)

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

            <div className="mx-2 sm:mx-4">
              <Filter
                pages={pages}
                onFilterChange={(filter) => setFilter(filter)}
              />
            </div>

            {query || filter ? (
              <p className="self-center py-1 text-zinc-600 dark:text-zinc-400">
                Matches: {filteredPages.length}
              </p>
            ) : null}
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
