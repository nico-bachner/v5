import { MDXRemote } from "next-mdx-remote";

import type { MDXContent } from "lib/mdx";

export type MDXProps = {
  content: MDXContent;
  components?: Record<string, React.ReactNode>;
};

export const MDX: React.VFC<MDXProps> = ({ content, components }) => (
  // @ts-ignore
  <MDXRemote
    {...content}
    components={{
      wrapper: ({ children }) => (
        <div className="prose prose-slate md:prose-lg lg:prose-xl">
          {children}
        </div>
      ),

      ...components,
    }}
  />
);
