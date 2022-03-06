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

export type MDXContent = {
  compiledSource: string
  frontmatter?: Record<string, string>
}

export const fetchMDXContent: Fetch<string, MDXContent> = async (file) =>
  await serialize(file, {
    mdxOptions: {
      remarkPlugins: [
        [remarkBreaks],
        [remarkGfm],
        [remarkToc, { tight: true }],
      ],
      rehypePlugins: [[rehypeHighlight], [rehypeSlug]],
    },
  })

type MDXData = {
  [key: string]: any
}

export const getMDXData: Get<string, MDXData> = (file) => {
  const { data } = matter(file)

  return data
}
