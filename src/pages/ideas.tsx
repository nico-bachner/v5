import { Head } from 'components/Head'
import { MDX } from 'components/MDX'
import { Search } from 'components/Search'
import { IdeaCard } from 'components/IdeaCard'

import { useState } from 'react'
import { fetchFile } from 'lib/fs'
import { fetchMDXContent } from 'lib/mdx'
import { fetchIdeasData } from 'lib/data/ideas'

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

  const filteredIdeas = ideas.filter((idea) =>
    idea.title.toLowerCase().includes(query.toLowerCase())
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

          <Search
            query={query}
            onQueryChange={(query) => {
              setQuery(query)
            }}
          />

          {query.length > 0 ? (
            <p className="mt-6 text-center text-zinc-600 dark:text-zinc-400">
              {filteredIdeas.length}{' '}
              {filteredIdeas.length == 1 ? 'result' : 'results'} found
            </p>
          ) : null}
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
