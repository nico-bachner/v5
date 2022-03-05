import Head from "next/head";
import { MDX } from "components/MDX";

import { fetchFile } from "lib/fs";
import { fetchMDXContent } from "lib/mdx";

import type { NextPage, GetStaticProps } from "next";
import type { MDXContent } from "lib/mdx";

type PageProps = {
  content: {
    [key: string]: MDXContent;
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const content = {
    about: await fetchMDXContent(
      await fetchFile({
        basePath: ["content", "sections"],
        path: ["home", "about"],
        extension: "mdx",
      })
    ),
    projects: await fetchMDXContent(
      await fetchFile({
        basePath: ["content", "sections"],
        path: ["home", "projects"],
        extension: "mdx",
      })
    ),
    writing: await fetchMDXContent(
      await fetchFile({
        basePath: ["content", "sections"],
        path: ["home", "writing"],
        extension: "mdx",
      })
    ),
    contact: await fetchMDXContent(
      await fetchFile({
        basePath: ["content", "sections"],
        path: ["home", "contact"],
        extension: "mdx",
      })
    ),
  };

  return {
    props: {
      content,
    },
  };
};

const Page: NextPage<PageProps> = ({ content }) => (
  <>
    <Head>
      <title>Nico Bachner</title>
    </Head>

    <main className="h-screen snap-y snap-mandatory overflow-auto px-6">
      <section className="flex min-h-screen snap-start flex-col justify-start py-20 md:justify-center md:text-center">
        <h1 className="text-6xl font-black tracking-tighter md:text-7xl lg:text-8xl xl:text-9xl">
          Nico Bachner
        </h1>
        <p className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-5xl font-extrabold leading-tight tracking-tight text-transparent md:text-6xl md:leading-tight lg:text-7xl lg:leading-tight xl:text-8xl xl:leading-tight">
          Aspiring Open Sourcerer
        </p>
      </section>

      <section className="mx-auto flex min-h-screen max-w-2xl snap-start flex-col py-20 md:justify-center">
        <h2 className="mb-6 text-5xl font-extrabold tracking-tight md:text-6xl">
          About
        </h2>
        <MDX content={content.about} />
      </section>

      <section className="mx-auto flex min-h-screen max-w-2xl snap-start flex-col py-20 md:justify-center">
        <h2 className="mb-6 text-5xl font-extrabold tracking-tight md:text-6xl">
          Projects
        </h2>
        <MDX content={content.projects} />
      </section>

      <section className="mx-auto flex min-h-screen max-w-2xl snap-start flex-col py-20 md:justify-center">
        <h2 className="mb-6 text-5xl font-extrabold tracking-tight md:text-6xl">
          Writing
        </h2>
        <MDX content={content.writing} />
      </section>

      <section className="mx-auto flex min-h-screen max-w-2xl snap-start flex-col py-20 md:justify-center">
        <h2 className="mb-6 text-5xl font-extrabold tracking-tight md:text-6xl">
          Contact
        </h2>
        <MDX content={content.contact} />
      </section>
    </main>
  </>
);

export default Page;
