import Image from 'next/image'
import Link from 'next/link'
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
        <div className="prose prose-zinc prose-headings:scroll-mt-6 prose-a:text-blue-500 dark:prose-invert sm:prose-lg lg:prose-xl">
          {children}
        </div>
      ),
      Image,
      a: ({ children, href }) =>
        href?.startsWith('/') ? (
          <Link href={href}>
            <a>{children}</a>
          </Link>
        ) : href?.startsWith('#') ? (
          <a href={href}>{children}</a>
        ) : (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),

      ...components,
    }}
  />
)
