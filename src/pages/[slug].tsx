import Link from 'next/link'
import { Head } from 'components/Head'
import { MDX } from 'components/MDX'

import { useEffect, useState } from 'react'
import { fetchFile as fetchLocalFile } from 'lib/fs/fetchFile'
import { fetchFile as fetchRemoteFile } from 'lib/github/fetchFile'
import { fetchPaths as fetchLocalPaths } from 'lib/fs/fetchPaths'
import { fetchPaths as fetchRemotePaths } from 'lib/github/fetchPaths'
import { fetchMDXContent } from 'lib/mdx'
import { fetchPageData } from 'lib/data/pages'

import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import type { MDXContent } from 'lib/mdx'
import type { JSONPageData } from 'lib/data/types'

type PageProps = JSONPageData & {
  content: MDXContent
}

const basePath = ['content', 'pages']
const extension = 'mdx'

const getStaticPaths: GetStaticPaths = async () => ({
  paths: (process.env.NODE_ENV == 'development'
    ? await fetchLocalPaths({
        basePath,
        path: [],
        extension,
      })
    : await fetchRemotePaths({
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

  const file =
    process.env.NODE_ENV == 'development'
      ? await fetchLocalFile({
          basePath,
          path,
          extension,
        })
      : await fetchRemoteFile({
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

  type,
  title,
  description,
  image,
  featured,

  path,
  firstUpdated,
  lastUpdated,
  edit_url,
  reading_time,
}) => {
  const [lastDateUpdated, setLastDateUpdated] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    setLastDateUpdated(
      lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'N/A'
    )
  }, [lastUpdated])

  return (
    <>
      <Head
        title={title}
        description={description ?? undefined}
        image={image ?? undefined}
        published={firstUpdated ?? undefined}
        modified={lastUpdated ?? undefined}
      />

      <main className="px-6 pt-16 pb-40 sm:pt-20 lg:pt-24">
        <article>
          <div className="mx-auto flex max-w-2xl flex-col gap-4 py-4 text-center">
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="text-lg text-zinc-500 sm:text-xl lg:text-2xl">
              {description}
            </p>
          </div>

          <div className="mx-auto flex max-w-2xl flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
            <div className="flex flex-row-reverse items-center justify-between gap-4 py-8 text-sm sm:text-base lg:text-lg">
              <p className="text-zinc-500">
                {reading_time[0] == reading_time[1]
                  ? reading_time[0]
                  : reading_time.join('-')}{' '}
                minute read
              </p>

              {type ? (
                <p className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text font-bold text-transparent">
                  <Link href={`/pages?filter=${type.toLowerCase()}`}>
                    <a>
                      {type} <span className="font-sans">{'->'}</span>
                    </a>
                  </Link>
                </p>
              ) : null}
            </div>

            <div className="py-8">
              <MDX content={content} />
            </div>

            <div className="flex items-center justify-between gap-4 py-8 text-sm sm:text-base lg:text-lg">
              <p className="text-zinc-500">Last Updated: {lastDateUpdated}</p>
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
