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
export const fetchJson = async <R>(url: string, log_api: boolean = false): Promise<R> => {
  if (log_api) {
    console.log("api:", API_BASE_URL + url);
  }
  try {
    let response = await fetch(API_BASE_URL + url);
    if (!response.ok) {
      throw new Error("something went wrong");
    }
    return response.json();
  } catch (err: any) {
    throw new Error(err.message)
  }
}