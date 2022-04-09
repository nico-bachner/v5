import { Head } from 'components/Head'
import { MDX } from 'components/MDX'

import { useEffect, useState } from 'react'
import { fetchMDXContent } from 'lib/mdx'
import { fetchFile, fetchPaths } from 'lib/fs'

import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import type { MDXContent } from 'lib/mdx'
import { PageData } from 'lib/data/types'
import { fetchPageData } from 'lib/data/pages'
import Link from 'next/link'

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

      <main className="px-6 pb-36 pt-20 md:pt-24 lg:pt-28">
        <article className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-black tracking-tight md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-5xl">
              {description}
            </p>
          </div>

          <div className="my-12 flex items-center justify-between gap-8 text-sm md:text-base lg:text-lg">
            <p className="bg-gradient-to-r from-blue-400 to-fuchsia-400 bg-clip-text font-bold text-transparent">
              <Link href={`/pages/${category.toLowerCase()}`}>
                <a>
                  {category} <span className="font-sans">{'->'}</span>
                </a>
              </Link>
            </p>
            <p className="text-zinc-400 dark:text-zinc-500">{`${
              reading_time[0] == reading_time[1]
                ? reading_time[0]
                : reading_time.join('-')
            } minute read`}</p>
          </div>

          <MDX content={content} />
        </article>

        <div className="mx-auto mt-24 flex max-w-2xl justify-between">
          <p className="text-zinc-500 md:text-lg lg:text-xl">
            Last Updated: {lastUpdated}
          </p>
          <p className="bg-gradient-to-r from-blue-400 to-fuchsia-400 bg-clip-text text-transparent md:text-lg lg:text-xl">
            <a href={edit_url} target="_blank" rel="noopener noreferrer">
              Edit on GitHub <span className="font-sans">{'->'}</span>
            </a>
          </p>
        </div>
      </main>
    </>
  )
}

export { getStaticPaths, getStaticProps }

export default Page
