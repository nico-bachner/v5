import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'

// remark plugins
// @ts-ignore
import remarkBreaks from 'remark-breaks'
// @ts-ignore
import remarkGfm from 'remark-gfm'
// @ts-ignore
import remarkToc from 'remark-toc'

// rehype plugins
// @ts-ignore
import rehypeHighlight from 'rehype-highlight'
// @ts-ignore
import rehypeSlug from 'rehype-slug'

import type { Fetch } from 'lib/types'
import type { MDXContent } from './types'

export const fetchMDXContent: Fetch<string, MDXContent> = async (file) =>
  await serialize(matter(file).content, {
    mdxOptions: {
      remarkPlugins: [
        [remarkBreaks],
        [remarkGfm],
        [remarkToc, { tight: true }],
      ],
      rehypePlugins: [[rehypeHighlight], [rehypeSlug]],
    },
  })
