import { NextRequest } from "next/server";
import { fetchJson } from "@/lib/services/http-server";
import { getCityCacheDir } from "@/lib/helper/link";
import { capitalizeEachWordFirstLetter } from '@/lib/helper/format-text';
type TSiteMatUrl = {
    url: string,
    priority: number
};
type TcitySitemapData = {
    verticals: Array<TSiteMatUrl>,
    doctors: Array<TSiteMatUrl>,
    clinics: Array<TSiteMatUrl>,
    doctorListPages: Array<TSiteMatUrl>
};
export async function GET(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const params = pathname.replace(".xml", "").split('/').slice(1, 3);
    const state = params[0];
    const city = params[1];
    let date = new Date();
    const baseUrl = 'https://careipro.com';
    let citySitemapData: TcitySitemapData = { verticals: [], doctors: [], clinics: [], doctorListPages: [] };
    let cityCachepath = getCityCacheDir(state, city);
    try {
        //throw new Error("Force to generate sitemap data");
        const response = await fetchJson<TcitySitemapData>(`${cityCachepath}sitemap-data.json`);
        citySitemapData = response;
    } catch (err) {
        const res = await fetchJson<{ data: TcitySitemapData }>(`/init-cache/generate-sitemap-data?state=${state.toLowerCase()}&city=${city.toLowerCase()}`);
        citySitemapData = res.data;
    }
    return new Response(`
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>${baseUrl}/${state.toLowerCase()}/${city.toLowerCase().replace(/\s+/g, '-')}</loc>
                <lastmod>${date.toISOString()}</lastmod>
                <changefreq>daily</changefreq>
                <priority>1</priority>
            </url>
            ${citySitemapData.verticals.map(item => `
                <url>
                    <loc>${baseUrl}/${item.url}</loc>
                    <lastmod>${date.toISOString()}</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>${item.priority}</priority>
                </url>
            `).join('')}
            ${citySitemapData.doctors.map(item => `
                <url>
                    <loc>${baseUrl}/${item.url}</loc>
                    <lastmod>${date.toISOString()}</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>${item.priority}</priority>
                </url>
            `).join('')}
            ${citySitemapData.clinics.map(item => `
                <url>
                    <loc>${baseUrl}/${item.url}</loc>
                    <lastmod>${date.toISOString()}</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>${item.priority}</priority>
                </url>
            `).join('')}
            ${citySitemapData.doctorListPages.map(item => `
                <url>
                    <loc>${baseUrl}${item.url}</loc>
                    <lastmod>${date.toISOString()}</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>${item.priority}</priority>
                </url>
            `).join('')}
       </urlset>`, {
        headers: {
            'Content-Type': 'application/xml'
        }
    });
}