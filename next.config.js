/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
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
        source: '/articles/css-modules',
        destination: '/guides/css-modules',
        permanent: true,
      },
      {
        source: '/articles/sveltekit-theme-switch',
        destination: '/guides/sveltekit-theme-switch',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
