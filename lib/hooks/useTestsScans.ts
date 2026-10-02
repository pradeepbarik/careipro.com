import { fetchJson, IResponse } from '@/lib/services/http-server';
import { TSectionBanner } from '../types/home-page';
import { TClinic } from '../types/clinic';
/* site_banners rows as init-cache selects them. device_type is "mobile", "desktop" or "all"; the
   doctors and caretakers pages filter their banners on it, this page does not yet. */
export type TTestsScansBanner = {
    id: number,
    image: string,
    alt_text: string,
    device_type: string,
    link: string
}
export type TTestsScansSpecialist = {
    id: number,
    name: string,
    icon: string,
    short_description: string,
    seo_url: string,
    seo_id: string
}
export type TTestsScansPageData = {
    banners: Array<TTestsScansBanner>,
    specialists: Array<TTestsScansSpecialist>,
    sections: Array<{
        heading: string,
        viewType: string,
        section_type: string,
        centers_count?: number,
        view_all_url?: string,
        centers?: Array<TClinic>,
        banners?: Array<TSectionBanner>
    }>,
    primary_market: string
}
export const fetchTestsScansPageData = async (state: string, city: string) => {
    try {
        const res = await fetchJson<TTestsScansPageData>(`/cache/${state.replace(" ", "-").toLowerCase()}/${city.replace(" ", "-").toLowerCase()}/tests-scans-page.json`);
        return res;
    } catch (err: any) {
        const { data } = await fetchJson<IResponse<TTestsScansPageData>>(`/init-cache/tests-scans-page-data?state=${state.toLowerCase().replace(" ", "-")}&city=${city.toLowerCase().replace(" ", "-")}`, true);
        return data;
    }
}
