import { Head } from 'components/Head'
import { MDX } from 'components/MDX'
import { ProjectCard } from 'components/ProjectCard'
import { CollectionIcon } from '@heroicons/react/outline'

import { fetchFile } from 'lib/fs'
import { fetchMDXContent } from 'lib/mdx'
import { fetchProjectsData } from 'lib/data/projects'

import type { NextPage, GetStaticProps } from 'next'
import type { MDXContent } from 'lib/mdx'
import type { ProjectData } from 'lib/data/types'

type PageProps = {
  projects: ProjectData[]
  content: MDXContent
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const projects = await fetchProjectsData()

  const content = await fetchMDXContent(
    await fetchFile({
      basePath: ['content', 'sections'],
      path: ['projects'],
      extension: 'mdx',
    })
  )

  return {
    props: {
      projects,
      content,
    },
  }
}

const Page: NextPage<PageProps> = ({ projects, content }) => (
  <>
    <Head
      title="Nico Bachner – Projects"
      description="Nico Bachner's projects"
    />

    <main className="px-6 pb-36 pt-20 md:pt-24 lg:pt-28">
      <div className="mx-auto mb-20 max-w-2xl">
        <div className="mb-12 flex items-center justify-between gap-4">
          <h1 className="text-5xl font-black tracking-tight md:text-6xl lg:text-7xl">
            Projects
          </h1>
          <CollectionIcon className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" />
        </div>

        <MDX content={content} />
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-y-8 md:grid-cols-3 lg:gap-x-40">
        {projects.map((project) => (
          <div
            key={project.path[project.path.length - 1]}
            className="md:col-span-2 md:odd:col-start-1 md:even:col-start-2"
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </main>
  </>
)

export default Page
