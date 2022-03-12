import { Head } from 'components/Head'
import { MDX } from 'components/MDX'
import { ProjectCard } from 'components/ProjectCard'
import { ArticleCard } from 'components/ArticleCard'

import { fetchFile } from 'lib/fs'
import { fetchMDXContent } from 'lib/mdx'
import { fetchProjectsData } from 'lib/data/projects'
import { fetchArticlesData } from 'lib/data/articles'

import type { NextPage, GetStaticProps } from 'next'
import type { MDXContent } from 'lib/mdx'
import type { ProjectData, ArticleData } from 'lib/data/types'
import {
  AtSymbolIcon,
  CollectionIcon,
  PencilIcon,
  UserIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'

type PageProps = {
  content: {
    [key: string]: MDXContent
  }
  projects: ProjectData[]
  articles: ArticleData[]
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const content = {
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
    writing: await fetchMDXContent(
      await fetchFile({
        basePath: ['content', 'sections'],
        path: ['home', 'writing'],
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
  }

  const projects = await fetchProjectsData()
  const articles = await fetchArticlesData()

  return {
    props: {
      content,
      projects: projects.filter(({ featured }) => featured),
      articles: articles.filter(({ featured }) => featured),
    },
  }
}

const Page: NextPage<PageProps> = ({ content, projects, articles }) => (
  <>
    <Head
      title="Nico Bachner"
      description="A University Student, self-taught Web Developer, and Aspiring Open Sourcerer"
    />

    <main className="px-6 pb-36">
      <section className="flex flex-col justify-center py-20 md:min-h-screen md:text-center">
        <h1 className="text-6xl font-black tracking-tighter md:text-7xl lg:text-8xl xl:text-9xl">
          Nico Bachner
        </h1>
        <p className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-6xl md:leading-tight lg:text-7xl lg:leading-tight xl:text-8xl xl:leading-tight">
          Aspiring Open Sourcerer
        </p>
      </section>

      <section className="mx-auto flex max-w-2xl flex-col py-20 md:snap-start md:justify-center">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            About
          </h2>
          <UserIcon className="h-12 w-12 md:h-16 md:w-16" />
        </div>
        <MDX content={content.about} />
      </section>

      <section className="mx-auto flex max-w-2xl flex-col py-20 md:snap-start md:justify-center">
        <Link href="/projects">
          <a className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-5xl font-extrabold tracking-tight md:text-6xl">
              Projects
            </h2>
            <CollectionIcon className="h-12 w-12 md:h-16 md:w-16" />
          </a>
        </Link>
        <MDX content={content.projects} />

        <div className="mt-6 flex flex-col gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.path[project.path.length - 1]}
              {...project}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-2xl flex-col py-20 md:snap-start md:justify-center">
        <Link href="/writing">
          <a className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-5xl font-extrabold tracking-tight md:text-6xl">
              Writing
            </h2>
            <PencilIcon className="h-12 w-12 md:h-16 md:w-16" />
          </a>
        </Link>
        <MDX content={content.writing} />
        <div className="mt-6 flex flex-col gap-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.path[article.path.length - 1]}
              {...article}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-2xl flex-col py-20 md:snap-start md:justify-center">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            Contact
          </h2>
          <AtSymbolIcon className="h-12 w-12 md:h-16 md:w-16" />
        </div>
        <MDX content={content.contact} />
      </section>
    </main>
  </>
)

export default Page
