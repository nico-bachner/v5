import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'

import { useAtom } from 'jotai'
import { storedReaderMode } from 'store'

import type { MDXContent } from 'lib/mdx'

export type MDXProps = {
  content: MDXContent
  components?: Record<string, React.ReactNode>
}

export const MDX: React.VFC<MDXProps> = ({ content, components }) => {
  const [readerMode] = useAtom(storedReaderMode)

  return (
    <MDXRemote
      {...content}
      components={{
        wrapper: ({ children }) => (
          <div
            className={[
              'prose prose-zinc prose-headings:scroll-mt-[1.5em] dark:prose-invert md:prose-lg lg:prose-xl',
              readerMode ? 'font-serif' : 'font-sans',
            ].join(' ')}
          >
            {children}
          </div>
        ),
        Image,

        ...components,
      }}
    />
  )
}
