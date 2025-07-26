import type { MetadataRoute } from 'next'
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Careipro',
    short_name: 'Careipro',
    description: 'Careipro lite',
    start_url: 'http://dev.careipro.com?pwa=1',
    display: 'standalone',
    background_color: '#4898b2',
    theme_color: '#4898b2',
    icons: [
      {
        src: '/appicon192X192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/appicon144X144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/appicon96X96.png',
        sizes: '96x96',
        type: 'image/png',
      },
    ],
  }
}