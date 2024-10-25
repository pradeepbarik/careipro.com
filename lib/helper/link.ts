import {capitalizeEachWordFirstLetter} from './format-text';
export const cityPageLink=(state:string,city:string)=>{
    return capitalizeEachWordFirstLetter(`${city}-In-${state}`).replace(" ","-")
}
export const doctorsBySpecialistPageUrl=(seo_url:string,seo_id:string,state:string,city:string)=>{
    return `/${seo_url}-In-${capitalizeEachWordFirstLetter(city)}-Of-${capitalizeEachWordFirstLetter(state)}/${seo_id}`
 }
export const doctorDetailPageUrl=(params:{doctor_id:number,service_loc_id:number,clinic_id:number,seo_url:string,state:string,city:string,market_name:string})=>{
    return `/${params.seo_url}-At-${params.market_name.replace(" ","-")}-In-${params.city}-Of-${params.state}/DR${params.doctor_id}-SL${params.service_loc_id}-C${params.clinic_id}`;
}
export const clinicsBySpecialistPageUrl=(seo_url:string,seo_id:string,state:string,city:string,market_name:string)=>{
    return `/${seo_url}${market_name?"-At-"+capitalizeEachWordFirstLetter(market_name).replace(" ","-"):""}-In-${capitalizeEachWordFirstLetter(city)}-Of-${capitalizeEachWordFirstLetter(state)}/CLINICS-${seo_id}`
 }