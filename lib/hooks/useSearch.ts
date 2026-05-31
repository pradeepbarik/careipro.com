import { fetchJson, IResponse } from '@/lib/services/http-server';
export type TSearchPageData = {
    tranding_searches: string[];
}
export const fetchSearchPageData = async (state: string, city: string) => {
    try {
        throw new Error("Testing error handling");
        //const res = await fetchJson<TSearchPageData>(`/cache/${state}/${city}/search-page.json`);
        //return res;
    } catch (err: any) {
        const { data } = await fetchJson<IResponse<TSearchPageData>>(`/init-cache/search-page-data?state=${state.replace(' ', '-')}&city=${city.replace(' ', '-')}`);
        return data;
    }
}