import Head from "next/head";
import { MDX } from "components/MDX";
import { ProjectCard } from "components/ProjectCard";

import { fetchFile } from "lib/fs";
import { fetchMDXContent } from "lib/mdx";
import { fetchProjectsData } from "lib/data/projects";

import type { NextPage, GetStaticProps } from "next";
import type { MDXContent } from "lib/mdx";
import type { ProjectData } from "lib/data/types";

type PageProps = {
  projects: ProjectData[];
  content: MDXContent;
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const projects = await fetchProjectsData();

  const content = await fetchMDXContent(
    await fetchFile({
      basePath: ["content", "sections"],
      path: ["projects"],
      extension: "mdx",
    })
  );

  return {
    props: {
      projects,
      content,
    },
  };
};

const Page: NextPage<PageProps> = ({ projects, content }) => (
  <>
    <Head>
      <title>Projects | Nico Bachner</title>
    </Head>

    <main className="h-screen overflow-auto py-40 px-6">
      <div className="mx-auto mb-20 max-w-2xl">
        <h1 className="mb-12 text-5xl font-black tracking-tight md:text-7xl">
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
);

export default Page;
