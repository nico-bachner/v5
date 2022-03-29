import { Head } from 'components/Head'
import { MDX } from 'components/MDX'
import { Search } from 'components/Search'
import { IdeaCard } from 'components/IdeaCard'

import { useState } from 'react'
import { fetchFile } from 'lib/fs'
import { fetchMDXContent } from 'lib/mdx'
import { fetchIdeasData } from 'lib/data/ideas'
import { ideaTypes } from 'lib/data/ideaTypes'

import type { NextPage, GetStaticProps } from 'next'
import type { MDXContent } from 'lib/mdx'
import type { IdeaData } from 'lib/data/types'

type PageProps = {
  ideas: IdeaData[]
  content: MDXContent
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const ideas = await fetchIdeasData()

  const content = await fetchMDXContent(
    await fetchFile({
      basePath: ['content', 'sections'],
      path: ['ideas'],
      extension: 'mdx',
    })
  )

  return {
    props: {
      ideas,
      content,
    },
  }
}

const Page: NextPage<PageProps> = ({ ideas, content }) => {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<string[]>([])

  const filteredIdeas =
    filters.length > 0
      ? ideas
          .filter(({ title }) =>
            title.toLowerCase().includes(query.toLowerCase())
          )
          .filter(({ type }) => filters.includes(type))
      : ideas.filter(({ title }) =>
          title.toLowerCase().includes(query.toLowerCase())
        )

  return (
    <>
      <Head
        title="Ideas"
        description="My thoughts – mostly about web development"
      />

      <main className="px-6 pb-36 pt-20 md:pt-24 lg:pt-28">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col gap-8">
          <h1 className="text-5xl font-black tracking-tight md:text-6xl lg:text-7xl">
            Ideas
          </h1>

          <MDX content={content} />

          <div className="flex flex-col gap-6">
            <Search
              query={query}
              onQueryChange={(query) => {
                setQuery(query)
              }}
            />

            <div className="mx-4 flex flex-col flex-wrap items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <p>Filter:</p>
                <div className="flex flex-wrap gap-2">
                  {ideaTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFilters(
                          filters.includes(type)
                            ? filters.filter((filter) => filter != type)
                            : [...filters, type]
                        )
                      }}
                      className={[
                        'rounded border border-zinc-400 px-3 py-1 hover:border-zinc-500 dark:border-zinc-600 dark:hover:border-zinc-500',
                        filters.includes(type)
                          ? 'bg-zinc-200 dark:bg-zinc-600'
                          : 'bg-transparent',
                      ].join(' ')}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              {query.length > 0 ? (
                <p className="self-center text-zinc-600 dark:text-zinc-400">
                  {filteredIdeas.length}{' '}
                  {filteredIdeas.length == 1 ? 'result' : 'results'} found
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 lg:gap-x-40">
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea.path[idea.path.length - 1]} {...idea} />
          ))}
        </div>
      </main>
    </>
  )
}

export default Page
