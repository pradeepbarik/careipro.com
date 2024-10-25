import { fetchJson } from '@/lib/services/http-server';
import { THomePageData } from '@/lib/types/home-page';
export const getHomePageData = async () => {
   const res = await fetchJson<THomePageData>("/cache/india/home-page.json");
   return res;
}
export const getCityHomePageData = async (state: string, city: string) => {
   const res = await fetchJson<THomePageData>(`/cache/${state.toLowerCase()}/${city.toLowerCase()}/home-page.json`);
   return res;
}