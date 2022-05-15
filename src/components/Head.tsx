import { NextSeo } from 'next-seo'

import { useRouter } from 'next/router'

type HeadProps = {
  title?: string
  description?: string
  image?: string
  published?: number
  modified?: number
}

export const Head: React.FC<HeadProps> = ({
  title,
  description,
  image,
  published,
  modified,
}) => {
  const { asPath } = useRouter()

  return (
    <NextSeo
      title={title ? [title, 'Nico Bachner'].join(' – ') : 'Nico Bachner'}
      description={description ?? 'Student. Developer. Entrepreneur.'}
      canonical="https://nicobachner.com"
      openGraph={{
        url: 'https://nicobachner.com' + asPath,
        images: [
          {
            url: image
              ? image.startsWith('/')
                ? 'https://nicobachner.com' + image
                : image
              : 'https://nicobachner.com/images/og-image.png',
          },
        ],
        type: published && modified ? 'article' : 'website',
        article:
          published && modified
            ? {
                publishedTime: new Date(published).toISOString(),
                modifiedTime: new Date(modified).toISOString(),
                expirationTime: new Date(modified + 157788000000).toISOString(),
              }
            : undefined,
      }}
      twitter={{
        handle: '@nico_bachner',
        site: '@nico_bachner',
        cardType: 'summary_large_image',
      }}
    />
  )
}
