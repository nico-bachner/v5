import { MDXRemote } from 'next-mdx-remote'

import Image from 'next/image'

import type { MDXContent } from 'lib/mdx'

export type MDXProps = {
  content: MDXContent
  components?: Record<string, React.ReactNode>
}

export const MDX: React.VFC<MDXProps> = ({ content, components }) => (
  // @ts-ignore
  <MDXRemote
    {...content}
    components={{
      wrapper: ({ children }) => (
        <div className="prose prose-zinc prose-headings:scroll-mt-[1.5em] dark:prose-invert md:prose-lg lg:prose-xl">
          {children}
        </div>
      ),
      Image,

      ...components,
    }}
  />
)
