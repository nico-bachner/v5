import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'

import type { MDXContent } from 'lib/mdx'

export type MDXProps = {
  content: MDXContent
  components?: Record<string, React.ReactNode>
}

export const MDX: React.VFC<MDXProps> = ({ content, components }) => (
  <MDXRemote
    {...content}
    components={{
      wrapper: ({ children }) => (
        <div className="prose prose-zinc prose-headings:scroll-mt-[1.5em] prose-a:text-blue-500 dark:prose-invert md:prose-lg lg:prose-xl">
          {children}
        </div>
      ),
      Image,

      ...components,
    }}
  />
)
