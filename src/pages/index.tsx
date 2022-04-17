import Link from 'next/link'
import { Head } from 'components/Head'
import { MDX } from 'components/MDX'
import { ProjectCard } from 'components/ProjectCard'
import { PageCard } from 'components/PageCard'

import { fetchFile } from 'lib/fs'
import { fetchMDXContent } from 'lib/mdx'
import { fetchProjectsData } from 'lib/data/projects'
import { fetchPagesData } from 'lib/data/pages'

import type { NextPage, GetStaticProps } from 'next'
import type { MDXContent } from 'lib/mdx'
import type { PageData, ProjectData } from 'lib/data/types'

type PageProps = {
  content: {
    [key: string]: MDXContent
  }
  projects: ProjectData[]
  pages: PageData[]
}

export const getStaticProps: GetStaticProps<PageProps> = async () => ({
  props: {
    content: {
      about: await fetchMDXContent(
        await fetchFile({
          basePath: ['content', 'sections'],
          path: ['home', 'about'],
          extension: 'mdx',
        })
      ),
      projects: await fetchMDXContent(
        await fetchFile({
          basePath: ['content', 'sections'],
          path: ['home', 'projects'],
          extension: 'mdx',
        })
      ),
      pages: await fetchMDXContent(
        await fetchFile({
          basePath: ['content', 'sections'],
          path: ['home', 'pages'],
          extension: 'mdx',
        })
      ),
      contact: await fetchMDXContent(
        await fetchFile({
          basePath: ['content', 'sections'],
          path: ['home', 'contact'],
          extension: 'mdx',
        })
      ),
    },
    projects: (await fetchProjectsData()).filter(({ featured }) => featured),
    pages: (await fetchPagesData()).filter(({ featured }) => featured),
  },
})

const Page: NextPage<PageProps> = ({ content, projects, pages }) => (
  <main className="px-6 pb-24">
    <Head />

    <section className="mx-auto my-16 flex flex-col justify-start gap-8 sm:my-32 sm:max-w-xl md:max-w-3xl md:justify-center lg:my-48 lg:max-w-5xl">
      <p className="flex flex-col text-[13vw] font-extrabold leading-none tracking-tight text-transparent sm:text-7xl md:text-8xl lg:text-9xl">
        <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-center">
          Student.
        </span>
        <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 bg-clip-text text-center sm:text-left">
          Developer.
        </span>
        <span className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 bg-clip-text text-center sm:text-right">
          Entrepreneur.
        </span>
      </p>
    </section>

    <section className="mx-auto my-24 flex max-w-2xl flex-col gap-8 sm:my-40 lg:my-56">
      <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
        About
      </h2>

      <MDX content={content.about} />
    </section>

    <section className="mx-auto my-24 flex max-w-2xl flex-col gap-8 sm:my-40 lg:my-56">
      <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
        Projects
      </h2>

      <MDX content={content.projects} />

      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.path[project.path.length - 1]}
            {...project}
          />
        ))}
      </div>

      <div className="flex flex-col items-center">
        <Link href="/projects">
          <a>
            <button className="mx-auto max-w-max self-center rounded-lg bg-blue-500/10 py-3 px-5 text-sm text-blue-500 transition duration-200 hover:bg-blue-500/20 md:text-base lg:text-lg">
              View More
            </button>
          </a>
        </Link>
      </div>
    </section>

    <section className="mx-auto my-24 flex max-w-2xl flex-col gap-8 sm:my-40 lg:my-56">
      <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
        Pages
      </h2>

      <MDX content={content.pages} />

      <div className="flex flex-col gap-6">
        {pages
          .filter(({ category }) => category != 'Projects')
          .map((page) => (
            <PageCard key={page.path[page.path.length - 1]} {...page} />
          ))}
      </div>

      <div className="flex flex-col items-center">
        <Link href="/pages">
          <a>
            <button className="mx-auto max-w-max self-center rounded-lg bg-blue-500/10 py-3 px-5 text-sm text-blue-500 transition duration-200 hover:bg-blue-500/20 md:text-base lg:text-lg">
              View More
            </button>
          </a>
        </Link>
      </div>
    </section>

    <section className="mx-auto my-24 flex max-w-2xl flex-col gap-8 sm:my-40 lg:my-56">
      <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
        Contact
      </h2>

      <MDX content={content.contact} />
    </section>
  </main>
)

export default Page
