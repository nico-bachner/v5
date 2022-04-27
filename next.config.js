/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/bee.js',
        destination: 'https://cdn.splitbee.io/sb.js',
      },
      {
        source: '/_hive/:slug',
        destination: 'https://hive.splitbee.io/:slug',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/de/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/fr/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/projects/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/guides/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/articles/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
