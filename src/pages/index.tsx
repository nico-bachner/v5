import { Head } from 'components/Head'
import { MDX } from 'components/MDX'
import { ProjectCard } from 'components/ProjectCard'
import { PageCard } from 'components/PageCard'
import { ViewMore } from 'components/ViewMore'

import { fetchFile } from 'lib/fs/fetchFile'
import { fetchMDXContent } from 'lib/mdx'
import { fetchProjectsData } from 'lib/data/projects'
import { fetchPagesData } from 'lib/data/pages'

import type { NextPage, GetStaticProps } from 'next'
import type { MDXContent } from 'lib/mdx'
import type { JSONPageData, JSONProjectData } from 'lib/data/types'

type PageProps = {
  content: {
    [key: string]: MDXContent
  }
  projects: JSONProjectData[]
  pages: JSONPageData[]
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
        <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-center">
          Student.
        </span>
        <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-center sm:text-left">
          Developer.
        </span>
        <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-center sm:text-right">
          Entrepreneur.
        </span>
      </p>
    </section>

    <section className="mx-auto my-24 flex max-w-2xl flex-col gap-8 sm:my-40 lg:my-56">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
        About
      </h2>

      <MDX
        content={content.about}
        components={{
          Student: () => (
            <strong className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-center text-transparent">
              Student
            </strong>
          ),
          Developer: () => (
            <strong className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-center text-transparent">
              Developer
            </strong>
          ),
          Entrepreneur: () => (
            <strong className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-center text-transparent">
              Entrepreneur
            </strong>
          ),
        }}
      />
    </section>

    <section className="mx-auto my-24 flex max-w-2xl flex-col gap-4 sm:my-40 sm:gap-6 lg:my-56 lg:gap-8">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
        Projects
      </h2>

      <MDX content={content.projects} />

      <div className="flex flex-col gap-4 pt-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.path[project.path.length - 1]}
            {...project}
          />
        ))}
      </div>

      <ViewMore href="/projects" />
    </section>

    <section className="mx-auto my-24 flex max-w-2xl flex-col gap-4 sm:my-40 sm:gap-6 lg:my-56 lg:gap-8">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
        Pages
      </h2>

      <MDX content={content.pages} />

      <div className="flex flex-col gap-4 pt-2">
        {pages
          .filter(({ category }) => category != 'Projects')
          .map((page) => (
            <PageCard key={page.path[page.path.length - 1]} {...page} />
          ))}
      </div>

      <ViewMore href="/pages" />
    </section>

    <section className="mx-auto my-24 flex max-w-2xl flex-col gap-8 sm:my-40 lg:my-56">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
        Contact
      </h2>

      <MDX content={content.contact} />
    </section>
  </main>
)

export default Page
