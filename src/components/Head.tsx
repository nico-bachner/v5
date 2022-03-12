import NextHead from 'next/head'

type HeadProps = {
  title: string
  description: string
}

export const Head: React.FC<HeadProps> = ({ title, description }) => (
  <NextHead>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
  </NextHead>
)
