import { Head } from 'components/Head'
import { MDX } from 'components/MDX'
import { Search } from 'components/Search'
import { ArticleCard } from 'components/ArticleCard'

import { useState } from 'react'
import { fetchFile } from 'lib/fs'
import { fetchMDXContent } from 'lib/mdx'
import { fetchArticlesData } from 'lib/data/articles'

import type { NextPage, GetStaticProps } from 'next'
import type { MDXContent } from 'lib/mdx'
import type { ArticleData } from 'lib/data/types'

type PageProps = {
  articles: ArticleData[]
  content: MDXContent
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const articles = await fetchArticlesData()

  const content = await fetchMDXContent(
    await fetchFile({
      basePath: ['content', 'sections'],
      path: ['writing'],
      extension: 'mdx',
    })
  )

  return {
    props: {
      articles,
      content,
    },
  }
}

const Page: NextPage<PageProps> = ({ articles, content }) => {
  const [query, setQuery] = useState('')

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <Head
        title="Writing"
        description="Written pieces about Web Development and Design"
      />

      <main className="px-6 pb-36 pt-20 md:pt-24 lg:pt-28">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col gap-8">
          <h1 className="text-5xl font-black tracking-tight md:text-6xl lg:text-7xl">
            Writing
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
              {filteredArticles.length}{' '}
              {filteredArticles.length == 1 ? 'result' : 'results'} found
            </p>
          ) : null}
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 lg:gap-x-40">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.path[article.path.length - 1]}
              {...article}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default Page
