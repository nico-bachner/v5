import Link from 'next/link'
import { Head } from 'components/Head'
import { MDX } from 'components/MDX'

import { useEffect, useState } from 'react'
import { fetchFile, fetchPaths } from 'lib/fs'
import { fetchMDXContent } from 'lib/mdx'
import { fetchPageData } from 'lib/data/pages'

import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import type { MDXContent } from 'lib/mdx'
import type { PageData } from 'lib/data/types'

type PageProps = PageData & {
  content: MDXContent
}

const basePath = ['content', 'pages']
const extension = 'mdx'

const getStaticPaths: GetStaticPaths = async () => ({
  paths: (
    await fetchPaths({
      basePath,
      path: [],
      extension,
    })
  ).map((path) => ({
    params: {
      slug: path.pop(),
    },
  })),
  fallback: false,
})

const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    }
  }

  const { slug } = params

  if (!slug || Array.isArray(slug)) {
    return {
      notFound: true,
    }
  }

  const path = [slug]

  const file = await fetchFile({
    basePath,
    path,
    extension,
  })

  const pageData = await fetchPageData(path)

  const props = {
    ...pageData,
    content: await fetchMDXContent(file),
  }

  return { props }
}

const Page: NextPage<PageProps> = ({
  content,

  category,
  title,
  description,
  image,
  published,
  featured,

  path,
  updated,
  edit_url,
  reading_time,
}) => {
  const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined)

  useEffect(() => {
    setLastUpdated(updated ? new Date(updated).toLocaleDateString() : 'N/A')
  }, [updated])

  return (
    <>
      <Head
        title={title}
        description={description}
        image={image ?? undefined}
        published={published ?? undefined}
        updated={updated ?? undefined}
      />

      <main className="px-6 pb-40">
        <article>
          <div className="mx-auto my-16 flex max-w-2xl flex-col gap-4 text-center sm:my-20 sm:max-w-3xl lg:my-24 lg:max-w-4xl">
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
              {description}
            </p>
          </div>

          <div className="mx-auto flex max-w-2xl flex-col gap-8 sm:gap-10 lg:gap-12">
            <div className="flex items-center justify-between gap-4 text-sm sm:text-base lg:text-lg">
              <p className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text font-bold tracking-tight text-transparent">
                <Link href={`/pages?filter=${category.toLowerCase()}`}>
                  <a>
                    {category} <span className="font-sans">{'->'}</span>
                  </a>
                </Link>
              </p>
              <p className="text-zinc-400 dark:text-zinc-500">
                {reading_time[0] == reading_time[1]
                  ? reading_time[0]
                  : reading_time.join('-')}{' '}
                minute read
              </p>
            </div>

            <hr className="rounded border border-zinc-300 dark:border-zinc-600" />

            <MDX content={content} />

            <hr className="rounded border border-zinc-300 dark:border-zinc-600" />

            <div className="flex items-center justify-between gap-4 text-sm sm:text-base lg:text-lg">
              <p className="text-zinc-400 dark:text-zinc-500">
                Last Updated: {lastUpdated}
              </p>
              <p className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text font-bold tracking-tight text-transparent">
                <a href={edit_url} target="_blank" rel="noopener noreferrer">
                  Edit on GitHub <span className="font-sans">{'->'}</span>
                </a>
              </p>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}

export { getStaticPaths, getStaticProps }

export default Page
