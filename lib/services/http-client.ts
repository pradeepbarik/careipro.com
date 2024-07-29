'use client'
import axios from 'axios';
import {API_BASE_URL} from '@/constants/client-apis';
type TResponse<T>={
   code:number,
   state:boolean,
   message:string,
   data:T
}
const axiosInstance=axios.create({
   baseURL:API_BASE_URL,
})
export const fetchJson=async <R>(url:string):Promise<R>=>{
   return (await fetch(url)).json()
}
export const httpPost=<R>(url:string,body:any):Promise<TResponse<R>>=>{
   return axiosInstance.post(url,body);
}