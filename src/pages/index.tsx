import Link from 'next/link'
import { Head } from 'components/Head'
import { MDX } from 'components/MDX'
import { ProjectCard } from 'components/ProjectCard'
import { ArticleCard } from 'components/ArticleCard'

import { motion } from 'framer-motion'
import { fetchFile } from 'lib/fs'
import { fetchMDXContent } from 'lib/mdx'
import { fetchProjectsData } from 'lib/data/projects'
import { fetchArticlesData } from 'lib/data/articles'

import type { NextPage, GetStaticProps } from 'next'
import type { MDXContent } from 'lib/mdx'
import type { ProjectData, ArticleData } from 'lib/data/types'
import { useAtomValue } from 'jotai'
import { storedLoaded } from 'store'

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

const Page: NextPage<PageProps> = ({ content, projects, articles }) => {
  const loaded = useAtomValue(storedLoaded)

  return (
    <>
      <Head />

      <main className="px-6 pb-40">
        <motion.section
          initial={
            !loaded
              ? { scale: 0.5, filter: 'opacity(0%)' }
              : { scale: 1, filter: 'opacity(100%)' }
          }
          animate={{ scale: 1, filter: 'opacity(100%)' }}
          transition={{ duration: 0.5 }}
          className="flex min-h-screen flex-col justify-center py-24 md:text-center"
        >
          <h1 className="text-6xl font-black tracking-tighter md:text-7xl lg:text-8xl xl:text-9xl">
            Nico Bachner
          </h1>
          <motion.p
            initial={
              !loaded
                ? { scale: 0.5, filter: 'opacity(0%)' }
                : { scale: 1, filter: 'opacity(100%)' }
            }
            animate={{ scale: 1, filter: 'opacity(100%)' }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-6xl md:leading-tight lg:text-7xl lg:leading-tight xl:text-8xl xl:leading-tight"
          >
            Aspiring Open Sourcerer
          </motion.p>
        </motion.section>

        <section className="mx-auto flex max-w-2xl flex-col gap-8 py-24">
          <h2 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            About
          </h2>

          <MDX content={content.about} />
        </section>

        <section className="mx-auto flex max-w-2xl flex-col gap-8 py-24">
          <h2 className="text-5xl font-extrabold tracking-tight md:text-6xl">
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

          <Link href="/projects">
            <a className="self-center rounded-lg bg-blue-500/10 py-3 px-5 text-sm text-blue-500 transition duration-200 hover:bg-blue-500/20 md:text-base lg:text-lg">
              View More
            </a>
          </Link>
        </section>

        <section className="mx-auto flex max-w-2xl flex-col gap-8 py-24">
          <h2 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            Writing
          </h2>

          <MDX content={content.writing} />

          <div className="flex flex-col gap-6">
            {articles.map((article) => (
              <ArticleCard
                key={article.path[article.path.length - 1]}
                {...article}
              />
            ))}
          </div>

          <Link href="/writing">
            <a className="self-center rounded-lg bg-blue-500/10 py-3 px-5 text-sm text-blue-500 transition duration-200 hover:bg-blue-500/20 md:text-base lg:text-lg">
              View More
            </a>
          </Link>
        </section>

        <section className="mx-auto flex max-w-2xl flex-col gap-8 py-24">
          <h2 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            Contact
          </h2>

          <MDX content={content.contact} />
        </section>
      </main>
    </>
  )
}

export default Page
