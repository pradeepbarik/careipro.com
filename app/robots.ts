import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
    //   {
    //     userAgent: 'Googlebot',
    //     allow: ['/'],
    //     disallow: '/private/',
    //   },
      {
        userAgent: ['PetalBot'],
        disallow: ['/'],
      },
    ],
    sitemap: 'https://careipro.com/sitemap.xml',
  }
}