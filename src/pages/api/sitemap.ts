import { fetchPagesData } from 'lib/data/pages'

import type { NextApiHandler } from 'next'

const apiHandler: NextApiHandler = async (req, res) => {
  const pages = await fetchPagesData()

  res.status(200).setHeader('Content-Type', 'text/xml')
    .end(`<?xml version="1.0" encoding="UTF-8"?>
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
      lastUpdated ? new Date(lastUpdated).toISOString().slice(0, 10) : 'N/A'
    }</lastmod>
  </url>
  `
    )
    .join('')}
</urlset>
`)
}

export default apiHandler
