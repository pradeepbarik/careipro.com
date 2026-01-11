import { fetchJson,IResponse } from '@/lib/services/http-server';
import { THomePageData } from '@/lib/types/home-page';
export const getHomePageData = async () => {
   const res = await fetchJson<THomePageData>("/cache/india/home-page.json");
   return res;
}
export const getCityHomePageData = async (state: string, city: string,town:string="") => {
   try{
      const res = await fetchJson<THomePageData>(`/cache/${state.toLowerCase()}/${city.toLowerCase()}${town ? `/${town.toLowerCase()}` : ""}/home-page.json`);
      return res;
   }catch(err:any){
      const {data}=await fetchJson<IResponse<THomePageData>>(`/init-cache/city-home-page-data?state=${state.toLowerCase().replace(" ","-")}&city=${city.toLowerCase().replace(' ','-')}&town=${town.toLowerCase().replace(' ','-')}`,true);
      return data;
   }
}