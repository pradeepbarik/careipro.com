import { fetchJson, IResponse } from '@/lib/services/http-server';
export type TSearchPageData = {
    tranding_searches: string[];
}
/* The search page is reachable without a city, from the header of any page the city cookie has not
   been written on yet. state and city were read straight off searchParams and are undefined there,
   so .replace threw and the whole page rendered blank. They are coerced here, and a failed lookup
   returns an empty list rather than taking the page down: the search box itself needs no trending
   list to work. */
export const fetchSearchPageData = async (state: string, city: string) => {
    const stateParam = (state || "").replace(' ', '-');
    const cityParam = (city || "").replace(' ', '-');
    try {
        throw new Error("Testing error handling");
        //const res = await fetchJson<TSearchPageData>(`/cache/${state}/${city}/search-page.json`);
        //return res;
    } catch (err: any) {
        try {
            const { data } = await fetchJson<IResponse<TSearchPageData>>(`/init-cache/search-page-data?state=${stateParam}&city=${cityParam}`);
            return data;
        } catch (apiErr: any) {
            return { tranding_searches: [] } as TSearchPageData;
        }
    }
}