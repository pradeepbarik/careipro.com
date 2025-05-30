import type { MetadataRoute } from 'next'
import { fetchDoctors } from '@/lib/hooks/useDoctors';

export default function sitemap(props:any): MetadataRoute.Sitemap {
    console.log("sitemap props",props)
    return [
        {
            url: 'https://acme.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
          }
    ]
}