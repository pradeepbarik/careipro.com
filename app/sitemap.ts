import type { MetadataRoute } from 'next'
// export async function generateSitemaps() {
//   // Fetch the total number of products and calculate the number of sitemaps needed
//   return [{ id: "bhadrak" }, { id: "balasore" }]
// }
// export async function generateSitemaps() {
//     // Fetch the total number of products and calculate the number of sitemaps needed
//     return [{ id: "bhadrak" }, { id: "balasore" }]
// }
const Sitemap = async (props:any): Promise<MetadataRoute.Sitemap> => {
    console.log("Sitemap props",props);
    const baseUrl = 'https://careipro.com';
    let date = new Date();
    return [
        {
            url: baseUrl,
            lastModified: date,
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/odisha/bhadrak.xml`, // Link to your generated product sitemap
            lastModified: date,
            changeFrequency: 'daily',
            priority: 1,
        }
    ]
}
export default Sitemap