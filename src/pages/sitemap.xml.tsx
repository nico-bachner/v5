import { fetchPagesData } from 'lib/data/pages'

import type { GetServerSideProps, NextPage } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pages = await fetchPagesData()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
    <url>
      <loc>https://nicobachner.com</loc>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
    </url>
  
    <url>
      <loc>https://nicobachner.com/projects</loc>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
  
    <url>
      <loc>https://nicobachner.com/pages</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    ${pages
      .map(
        ({ path, lastUpdated }) => `
        <url>
            <loc>https://nicobachner.com/${path.join('/')}</loc>
            <lastmod>${
              lastUpdated
                ? new Date(lastUpdated).toISOString().slice(0, 10)
                : 'N/A'
            }</lastmod>
            <priority>0.5</priority>
        </url>
        `
      )
      .join('')}
  </urlset>
  `

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

const Page: NextPage = () => <></>

export default Page
