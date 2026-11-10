'use client'
import axios from 'axios';
import { API_BASE_URL } from '@/constants/client-apis';
import { userinfo, g_user_secreate_key } from '@/constants/storage_keys';
import { reportApiFailure } from '@/lib/helper/error-reporter';
type TResponse<T> = {
   code: number,
   state: boolean,
   message: string,
   data: T
}
const axiosInstance = axios.create({
   baseURL: API_BASE_URL,
})
export type IResponse<T> = {
   code: number,
   message: string,
   data: T
}
export const buildResponse = <T>(data: T): Promise<IResponse<T>> => {
   return new Promise((resolve, reject) => {
      resolve({ code: 200, message: "", data: data });
   })
}
export const fetchJson = async <R>(url: string, log_api: boolean = false, headers: any = {},extraParams:{passSecreateKey?: boolean, passGuserSecreateKey?: boolean} = {passSecreateKey:false,passGuserSecreateKey:false}): Promise<R> => {
   if (log_api) {
      console.log("api:", API_BASE_URL + url);
   }
   try {
      if (extraParams && extraParams.passSecreateKey) {
         let user = JSON.parse(window.localStorage.getItem(userinfo) || JSON.stringify({}));
         headers['x-api-key'] = user.secreate_key || "";
      }
      if (extraParams && extraParams.passGuserSecreateKey) {
         let secreatekey = window.localStorage.getItem(g_user_secreate_key)
         headers['g-api-key'] = secreatekey || "";
      }
      let response = await fetchWithReport(API_BASE_URL + url, {
         method: 'GET',
         headers: headers
      });
      if (!response.ok) {
         throw new Error("something went wrong");
      }
      return response.json();
   } catch (err: any) {
      throw new Error(err.message)
   }
}
/* fetch that tells the error tracker when the api did not answer or answered with a 5xx.
   the caller's handling is unchanged, this only observes. an AbortError is the page navigating
   away mid request, not a failure */
const fetchWithReport = async (fullUrl: string, init: RequestInit): Promise<Response> => {
   let response: Response;
   try {
      response = await fetch(fullUrl, init);
   } catch (err: any) {
      if (err?.name !== 'AbortError') {
         reportApiFailure({ url: fullUrl, method: init.method || 'GET', status: 0, message: err?.message });
      }
      throw err;
   }
   if (response.status >= 500) {
      reportApiFailure({ url: fullUrl, method: init.method || 'GET', status: response.status });
   }
   return response;
}
export const authenicatedFetchJson = async <R>(url: string, log_api: boolean = false): Promise<R> => {
   if (log_api) {
      console.log("api:", API_BASE_URL + url);
   }
   try {
      let user = JSON.parse(window.localStorage.getItem(userinfo) || "");
      let response = await fetchWithReport(API_BASE_URL + url, {
         method: 'GET',
         headers: {
            "x-api-key": user.secreate_key
         }
      });
      if (!response.ok) {
         throw new Error("something went wrong");
      }
      return response.json();
   } catch (err: any) {
      throw new Error("")
   }
}
export const httpPost = <R>(url: string, body: any, extraParams?: { passSecreateKey: boolean, passGuserSecreateKey?: boolean, fileUpload?: boolean }): Promise<TResponse<R>> => {
   return new Promise((resolve, reject) => {
      let config: any = {
         headers: {}
      };
      if (extraParams && extraParams.passSecreateKey) {
         let user = JSON.parse(window.localStorage.getItem(userinfo) || JSON.stringify({}));
         config.headers['x-api-key'] = user.secreate_key || "";
      }
      if (extraParams && extraParams.passGuserSecreateKey) {
         let secreatekey =window. localStorage.getItem(g_user_secreate_key)
         config.headers['g-api-key'] = secreatekey || "";
      }
      if (extraParams && extraParams.fileUpload) {
         config.headers['Content-Type'] = "multipart/form-data";
      }
      axiosInstance.post(url, body, config).then(({ data }) => {
         resolve(data)
      }).catch((err) => {
         const status: number = err?.response?.status || 0;
         if (err?.code !== 'ERR_CANCELED') {
            reportApiFailure({ url: API_BASE_URL + url, method: 'POST', status, message: err?.message });
         }
         /* a network error has no response at all - reading err.response.data used to throw
            here, so the promise never settled and the caller's loader spun forever */
         if (err?.response?.data) {
            reject(err.response.data);
            return;
         }
         reject({ code: status, message: status ? (err?.message || "Something went wrong") : "Could not reach the server, please check your internet connection", data: null });
      });
   })

}