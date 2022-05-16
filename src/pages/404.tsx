import { Head } from 'components/Head'
import { MDX } from 'components/MDX'

import { fetchFile } from 'lib/fs/fetchFile'
import { fetchMDXContent } from 'lib/mdx'
import { getNewUrl } from 'lib/github/getNewUrl'
import { config } from 'config'

import type { NextPage, GetStaticProps } from 'next'
import type { MDXContent } from 'lib/mdx'

type PageProps = {
  content: MDXContent
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const content = await fetchMDXContent(
    await fetchFile({
      basePath: ['content', 'sections'],
      path: ['404'],
      extension: 'mdx',
    })
  )

  return {
    props: {
      content,
    },
  }
}

const Page: NextPage<PageProps> = ({ content }) => {
  const newUrl = getNewUrl({
    ...config.repo,
    basePath: ['content', 'pages'],
  })

  return (
    <main>
      <Head title="404" description="Page Not Found" />

      <main className="px-6 pb-36 pt-20 md:pt-24 lg:pt-28">
        <div className="mx-auto mb-20 max-w-2xl">
          <h1 className="text-center text-6xl font-black tracking-tight md:text-7xl lg:text-8xl">
            404
          </h1>

          <p className="mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-center text-5xl font-extrabold leading-tight tracking-tight text-transparent md:text-6xl md:leading-tight lg:text-7xl lg:leading-tight">
            Page Not Found
          </p>

          <MDX content={content} />

          <a
            href={newUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex flex-col"
          >
            <button className="rounded-md border border-black bg-black px-4 py-2.5 text-white transition duration-300 hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white md:text-lg">
              Create on GitHub
            </button>
          </a>
        </div>
      </main>
    </main>
  )
}

export default Page
