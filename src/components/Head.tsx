import NextHead from 'next/head'

type HeadProps = {
  title?: string
  description?: string
}

export const Head: React.FC<HeadProps> = ({
  title: pageTitle,
  description: pageDescription,
}) => {
  const title = pageTitle
    ? [pageTitle, 'Nico Bachner'].join(' – ')
    : 'Nico Bachner'
  const description =
    pageDescription ??
    'A University Student, self-taught Web Developer, and Aspiring Open Sourcerer'

  return (
    <NextHead>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
    </NextHead>
  )
}
