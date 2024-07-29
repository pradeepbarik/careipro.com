import 'server-only';
import axios from 'axios';
import {API_BASE_URL} from '@/constants/server-apis';
const axiosInstance=axios.create({
    baseURL:API_BASE_URL
 })
 export const fetchJson=async <R>(url:string):Promise<R>=>{
   return (await fetch(API_BASE_URL+url)).json()
 }