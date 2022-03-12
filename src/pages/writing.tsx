import Head from 'next/head'
import { MDX } from 'components/MDX'
import { ArticleCard } from 'components/ArticleCard'
import { SearchIcon } from '@heroicons/react/outline'

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
  const [query, setQuery] = useState<string | undefined>(undefined)
  const [focused, setFocused] = useState(false)

  const filteredArticles = query
    ? articles.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      )
    : articles

  return (
    <>
      <Head>
        <title>Writing | Nico Bachner</title>
      </Head>

      <main className="px-6 pb-36 pt-20 md:pt-24 lg:pt-28">
        <div className="mx-auto mb-12 max-w-2xl">
          <h1 className="mb-12 text-5xl font-black tracking-tight md:text-6xl lg:text-7xl">
            Writing
          </h1>

          <MDX content={content} />

          <div
            className={[
              'mt-8 flex w-full rounded-lg border transition duration-100',
              focused ? 'border-slate-600' : 'border-slate-300',
            ].join(' ')}
          >
            <SearchIcon
              className={[
                focused ? 'text-slate-500' : 'text-slate-400',
                'box-content h-6 w-6 p-3 transition duration-100',
              ].join(' ')}
            />

            <input
              type="search"
              spellCheck="false"
              placeholder="Search"
              value={query}
              onChange={({ target }) => {
                setQuery(target.value)
              }}
              onFocus={() => {
                setFocused(true)
              }}
              onBlur={() => {
                setFocused(false)
              }}
              className="w-full rounded-lg pr-2 text-base text-slate-600 outline-none placeholder:text-slate-400"
            />
          </div>

          {query && query.length > 0 ? (
            <p className="mt-6 text-center text-slate-600">
              {filteredArticles.length} result(s) found
            </p>
          ) : null}
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 lg:gap-x-40">
          {(query
            ? articles.filter((article) =>
                article.title.toLowerCase().includes(query.toLowerCase())
              )
            : articles
          ).map((article) => (
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
