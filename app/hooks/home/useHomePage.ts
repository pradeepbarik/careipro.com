import {httpGet} from '../../services/http';
import { THomePageData } from '@/app/types/home-page';
export const getHomePageData=async ()=>{
   const res = await httpGet<THomePageData>("http://localhost:9002/cache/india/home-page.json");
   return res;
}
export const getCityHomePAgeData=()=>{

}