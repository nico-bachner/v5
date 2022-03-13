import { Head } from 'components/Head'
import { MDX } from 'components/MDX'
import { ArticleCard } from 'components/ArticleCard'
import { PencilIcon, SearchIcon } from '@heroicons/react/outline'

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
  const [query, setQuery] = useState<string>('')

  const [focused, setFocused] = useState(false)

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
        <div className="mx-auto mb-12 max-w-2xl">
          <div className="mb-12 flex items-center justify-between gap-4">
            <h1 className="text-5xl font-black tracking-tight md:text-6xl lg:text-7xl">
              Writing
            </h1>
            <PencilIcon className="h-12 w-12 md:h-16 md:w-16" />
          </div>

          <MDX content={content} />

          <div
            className={[
              'mt-8 flex w-full rounded-lg border transition duration-100',
              focused
                ? 'border-zinc-700 dark:border-zinc-300'
                : 'border-zinc-400 dark:border-zinc-600',
            ].join(' ')}
          >
            <SearchIcon
              className={[
                focused
                  ? 'text-zinc-700 dark:text-zinc-300'
                  : 'text-zinc-500 dark:text-zinc-500',
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
              className="placeholder:text-zinc-5000 w-full rounded-lg bg-transparent pr-2 text-base text-inherit outline-none"
            />
          </div>

          {query.length > 0 ? (
            <p className="mt-6 text-center text-zinc-600 dark:text-zinc-400">
              {filteredArticles.length} result(s) found
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
