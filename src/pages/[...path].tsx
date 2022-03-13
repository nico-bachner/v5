import { Head } from 'components/Head'
import { MDX } from 'components/MDX'

import { fetchMDXContent, getMDXData } from 'lib/mdx'
import { fetchFile, fetchRecursivePaths } from 'lib/fs'
import { fetchDateUpdated, getEditUrl } from 'lib/github'
import { config } from 'config'

import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import type { MDXContent } from 'lib/mdx'

type PageProps = {
  title: string
  description: string
  image: string | null
  url: string | null
  index: boolean
  content: MDXContent
  updated: number | null
  edit_url: string
}

const basePath = ['content', 'pages']
const extension = 'mdx'

const getStaticPaths: GetStaticPaths = async () => {
  const paths = (
    await fetchRecursivePaths({
      basePath,
      path: [],
      extension,
    })
  ).map((path) => ({
    params: {
      path,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    }
  }

  const { path } = params

  if (!Array.isArray(path)) {
    return {
      notFound: true,
    }
  }

  const file = await fetchFile({
    basePath,
    path,
    extension,
  })

  const {
    title,
    description,
    image = null,
    url = null,
    published,
  } = getMDXData(file)

  if (typeof title != 'string') {
    throw new Error(`'title' should be a string (${path})`)
  }
  if (typeof description != 'string') {
    throw new Error(`'description' should be a string (${path})`)
  }
  if (image && typeof image != 'string') {
    throw new Error(`'image', if used, should be a string (${path})`)
  }
  if (url && typeof url != 'string') {
    throw new Error(`'url', if used, should be a string (${path})`)
  }

  const updated = await fetchDateUpdated({
    ...config.repo,
    basePath,
    path,
    extension,
  })

  const props = {
    title,
    description,
    image,
    url,
    index: published == false ? false : true,
    content: await fetchMDXContent(file),
    updated: updated?.getTime() ?? null,
    edit_url: getEditUrl({ ...config.repo, basePath, path, extension }),
  }

  return { props }
}

const Page: NextPage<PageProps> = ({
  title,
  description,
  image,
  url,
  index,
  content,
  updated,
  edit_url,
}) => (
  <>
    <Head title={['Nico Bachner', title].join(' – ')} description={description}>
      {image ? <meta property="og:image" content={image} /> : null}
    </Head>

    <main className="px-6 pb-36 pt-20 md:pt-24 lg:pt-28">
      <article className="mx-auto max-w-2xl">
        <h1 className="text-5xl font-black tracking-tight md:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-4 mb-16 bg-gradient-to-r from-cyan-400 to-blue-400  bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-5xl">
          {description}
        </p>

        <MDX content={content} />
      </article>

      <div className="mx-auto mt-24 flex max-w-2xl justify-between">
        <p className="text-zinc-500 md:text-lg lg:text-xl">
          Last Updated:{' '}
          {updated ? new Date(updated).toLocaleDateString() : 'N/A'}
        </p>
        <p className="bg-gradient-to-r from-blue-400 to-fuchsia-400 bg-clip-text text-transparent md:text-lg lg:text-xl">
          <a href={edit_url} target="_blank" rel="noopener noreferrer">
            Edit on GitHub {'->'}
          </a>
        </p>
      </div>
    </main>
  </>
)

export { getStaticPaths, getStaticProps }

export default Page
