import { serialize } from "next-mdx-remote/serialize";

// @ts-ignore

// remark plugins
// @ts-ignore
import remarkBreaks from "remark-breaks";
// @ts-ignore
import remarkGfm from "remark-gfm";
// @ts-ignore
import remarkToc from "remark-toc";

// rehype plugins
// @ts-ignore
import rehypeHighlight from "rehype-highlight";
// @ts-ignore
import rehypeSlug from "rehype-slug";

export type MDXContent = {
  compiledSource: string;
  frontmatter?: Record<string, string>;
};

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
  });

export type MDXData = Record<string, string> | undefined;

export const getMDXData: Fetch<string, MDXData> = async (file) => {
  const { frontmatter } = await serialize(file);

  return frontmatter;
};
