import { NextSeo } from 'next-seo'

import { useRouter } from 'next/router'

type HeadProps = {
  title?: string
  description?: string
  image?: string
  published?: number
  updated?: number
}

export const Head: React.FC<HeadProps> = ({
  title,
  description,
  image,
  published,
  updated,
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
        type: published && updated ? 'article' : 'website',
        article:
          published && updated
            ? {
                publishedTime: new Date(published).toISOString(),
                modifiedTime: new Date(updated).toISOString(),
                expirationTime: new Date(updated + 157788000000).toISOString(),
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
