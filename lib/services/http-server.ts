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
export const fetchJson = async <R>(url: string, log_api: boolean = false, options?: {method?:string,secreate_key?:string}): Promise<R> => {
  try {
    let configs:RequestInit = {headers:{}};
    if(options?.method){
      configs.method=options.method
    }
    if(options?.secreate_key){
      configs.headers={
        "x-api-key":options.secreate_key
      }
    }
    if (log_api) {
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