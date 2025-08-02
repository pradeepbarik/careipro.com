'use client'
import axios from 'axios';
import { API_BASE_URL } from '@/constants/client-apis';
import { userinfo, g_user_secreate_key } from '@/constants/storage_keys';
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
         let user = JSON.parse(localStorage.getItem(userinfo) || JSON.stringify({}));
         headers['x-api-key'] = user.secreate_key || "";
      }
      if (extraParams && extraParams.passGuserSecreateKey) {
         let secreatekey = localStorage.getItem(g_user_secreate_key)
         headers['g-api-key'] = secreatekey || "";
      }
      let response = await fetch(API_BASE_URL + url, {
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
export const authenicatedFetchJson = async <R>(url: string, log_api: boolean = false): Promise<R> => {
   if (log_api) {
      console.log("api:", API_BASE_URL + url);
   }
   try {
      let user = JSON.parse(localStorage.getItem(userinfo) || "");
      let response = await fetch(API_BASE_URL + url, {
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
         let user = JSON.parse(localStorage.getItem(userinfo) || JSON.stringify({}));
         config.headers['x-api-key'] = user.secreate_key || "";
      }
      if (extraParams && extraParams.passGuserSecreateKey) {
         let secreatekey = localStorage.getItem(g_user_secreate_key)
         config.headers['g-api-key'] = secreatekey || "";
      }
      if (extraParams && extraParams.fileUpload) {
         config.headers['Content-Type'] = "multipart/form-data";
      }
      axiosInstance.post(url, body, config).then(({ data }) => {
         resolve(data)
      }).catch((err) => {
         if (err.response.data) {
            reject(err.response.data);
            return;
         }
         reject(err)
      });
   })

}