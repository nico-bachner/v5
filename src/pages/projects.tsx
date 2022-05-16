import { Head } from 'components/Head'
import { MDX } from 'components/MDX'
import { ProjectCard } from 'components/ProjectCard'

import { fetchFile } from 'lib/fs/fetchFile'
import { fetchMDXContent } from 'lib/mdx'
import { fetchProjectsData } from 'lib/data/projects'

import type { NextPage, GetStaticProps } from 'next'
import type { MDXContent } from 'lib/mdx'
import type { JSONProjectData } from 'lib/data/types'

type PageProps = {
  projects: JSONProjectData[]
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
    <Head title="Projects" />

    <main className="flex flex-col gap-12 px-6 pb-36 pt-20 md:pt-24 lg:pt-28">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <h1 className="text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
          Projects
        </h1>

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
