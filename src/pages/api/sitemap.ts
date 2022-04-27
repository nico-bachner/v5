import { fetchPagesData } from 'lib/data/pages'

import type { NextApiHandler } from 'next'

export const apiHandler: NextApiHandler = async (req, res) => {
  const pages = await fetchPagesData()

  res.status(200)
  res.setHeader('Content-Type', 'text/xml')
  res.end(`<?xml version="1.0" encoding="UTF-8"?>
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
          ({ path, updated }) => `
          <url>
              <loc>https://nicobachner.com/${path.join('/')}</loc>
              ${
                updated
                  ? `<lastmod>${new Date(updated)
                      .toISOString()
                      .slice(0, 10)}</lastmod>`
                  : ''
              }
              <priority>0.5</priority>
          </url>
          `
        )
        .join('')}
    </urlset>
  `)
}

export default apiHandler
