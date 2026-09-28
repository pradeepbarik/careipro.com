import 'server-only';
import axios from 'axios';
import { API_BASE_URL } from '@/constants/server-apis';
const axiosInstance = axios.create({
  baseURL: API_BASE_URL
})
export type IResponse<T> = {
  code: number,
  message: string,
  data: T
}
export const getCityCachePath=(state:string,city:string,extraParams?:{market_name?:string,dir?:string})=>{
    if(extraParams && extraParams.market_name && extraParams.dir){
        return `/cache/${state.toLowerCase().replace(" ","-")}/${city.toLowerCase().replace(" ","-")}/${extraParams.dir}/${extraParams.market_name.toLowerCase().replace(" ","-")}/`;
    }else if(extraParams?.dir){
        return `/cache/${state.toLowerCase().replace(" ","-")}/${city.toLowerCase().replace(" ","-")}/${extraParams.dir}/`;
    }
    return `/cache/${state.toLowerCase().replace(" ","-")}/${city.toLowerCase().replace(" ","-")}/`;
}
/* These urls are almost all reads of the json files the api writes, which are themselves the
   cache, invalidated deliberately whenever the data behind them changes.

   Next 14 defaults fetch() to cache:'force-cache', which stored every one of those reads in its
   own data cache with a one year revalidate. That second layer cannot be invalidated from the
   api side, so clearing a cache file and writing a fresh one had no effect at all in production:
   next kept serving the body it captured the first time, for a year.

   So every call carries a revalidate window instead. Callers pass the one that suits their
   data, and anything that does not gets DEFAULT_REVALIDATE rather than next's own default.
   That fallback is the point: a call site someone forgets to update goes stale for a minute,
   which is a nuisance, instead of for a year, which is the bug above.

   Pass revalidate:0 for a response that must never be held, such as anything user specific. */
/* seconds, the unit next uses. 60 is one minute. for reference: 300 is five minutes,
   3600 an hour, 86400 a day, and 0 means do not cache at all. */
export const DEFAULT_REVALIDATE = 60;// 1 minute
export const fetchJson = async <R>(url: string, log_api: boolean = false, options?: {method?:string,secreate_key?:string,revalidate?:number}): Promise<R> => {
  try {
    let configs:RequestInit = {headers:{}};
    /* a /cache/*.json url is itself the cache. the api deletes or rewrites those files the moment
       the data behind them changes, so a second copy inside next can only ever be wrong.

       worse, deleting one can never clear next's copy: next only writes a response into its data
       cache when the status is 200, so the 404 from a deleted file is discarded and the old body
       keeps being served, with the background revalidation failing the same way every time. the
       fallback to the live api in the callers never runs either, because next hands back its
       cached 200 and nothing throws.

       so these reads always go to the origin. everything else keeps DEFAULT_REVALIDATE, which is
       what shields the live endpoints, /init-cache most of all since those rebuild a file.
       a revalidate passed by the caller still wins over both. */
    const isCacheFileRead = url.startsWith("/cache/");
    let revalidate = typeof options?.revalidate === "number"
      ? options.revalidate
      : (isCacheFileRead ? 0 : DEFAULT_REVALIDATE);
    if(revalidate > 0){
      (<any>configs).next = { revalidate: revalidate };
    }else{
      configs.cache = "no-store";
    }
    if(options?.method){
      configs.method=options.method
    }
    if(options?.secreate_key){
      configs.headers={
        "x-api-key":options.secreate_key
      }
    }
    if (log_api || process.env.NODE_ENV === "development") {
      console.log("api:=====>", API_BASE_URL + url,"configs-->",configs);
    }
    let response = await fetch(API_BASE_URL + url, configs);
    if (!response.ok) {
      throw new Error("something went wrong");
    }
    return response.json();
  } catch (err: any) {
    console.error("fetchJson error:", API_BASE_URL + url, err);
    throw new Error(err.message)
  }
}