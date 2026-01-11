import { capitalizeEachWordFirstLetter } from './format-text';
export const getCityCacheDir = (state: string, city: string, extraParams?: { market_name?: string, dir?: string }) => {
    if (extraParams && extraParams.market_name && extraParams.dir) {
        return `/cache/${state.toLowerCase().replace(" ", "-")}/${city.toLowerCase().replace(" ", "-")}/${extraParams.dir}/${extraParams.market_name.toLowerCase().replace(" ", "-")}/`;
    } else if (extraParams?.dir) {
        return `/cache/${state.toLowerCase().replace(" ", "-")}/${city.toLowerCase().replace(" ", "-")}/${extraParams.dir}/`;
    }
    return `/cache/${state.toLowerCase().replace(" ", "-")}/${city.toLowerCase().replace(" ", "-")}/`;
}
export const alllCategoriesPageLink = (state: string, city: string,town: string="") => {
    if (state == "" && city == "") {
        return `doctor-specialists-and-services`;
    }
    return `/${state.toLowerCase()}/${city.toLowerCase()}/doctor-specialists-and-services${town ? "-in-" + town.toLowerCase().replace(" ", "-") : ""}`;
}
export const cityPageLink = (state: string, city: string,market_name?:string) => {
    //return capitalizeEachWordFirstLetter(`${city}-In-${state}`).replace(" ", "-")
    if(market_name){
        return `/${state.toLowerCase()}/${market_name.toLowerCase().replace(" ", "-")}-in-${city.toLowerCase().replace(' ', '-')}`;
    }
    return `/${state.toLowerCase()}/${city.toLowerCase()}`;
}
export const doctorsBySpecialistPageUrl = (seo_url: string, seo_id: string, state: string, city: string,extraParams?: { market_name?: string }) => {
    //return `/${seo_url}-In-${capitalizeEachWordFirstLetter(city)}-Of-${capitalizeEachWordFirstLetter(state)}/${seo_id}`
    return `/${state.toLowerCase()}/${city.toLowerCase().replace(' ', '-')}/${seo_url}${extraParams?.market_name ? `-in-${extraParams.market_name.toLowerCase().replace(" ", "-")}` : ""}/${seo_id}`;
}
export const doctorDetailPageUrl = (params: { doctor_id: number, service_loc_id: number, clinic_id: number, seo_url: string, state: string, city: string, market_name: string, type?: string }) => {
    // let url= `/${params.seo_url}-At-${params.market_name.replace(" ", "-")}-In-${params.city}-Of-${params.state}/`;  
    let url = `/${params.state.toLowerCase()}/${params.city.toLowerCase()}/${params.seo_url}-In-${params.market_name.toLowerCase().replace(" ", "-")}/`;
    if (params.type === 'CARETAKER') {
        url += `CT${params.doctor_id}`;
    } else {
        url += `DR${params.doctor_id}`;
    }
    if (params.service_loc_id) {
        url += `-SL${params.service_loc_id}`;
    }
    if (params.clinic_id) {
        url += `-C${params.clinic_id}`;
    }else{
        url += `-C0`;
    }
    return url;
}
export const clinicDetailpageUrl = (params: { seo_url: string, state: string, city: string, market_name: string, bid: string }) => {
    //return `/${params.seo_url}-At-${capitalizeEachWordFirstLetter(params.market_name).replace(" ", "-")}-In-${capitalizeEachWordFirstLetter(params.city).replace(" ", "-")}-of-${capitalizeEachWordFirstLetter(params.state).replace(" ", "-")}/${params.bid}`;
    return `/${params.state.toLowerCase()}/${params.city.toLowerCase().replace(' ', '-')}/${params.seo_url}-In-${params.market_name.toLowerCase().replace(" ", "-")}/${params.bid}`;
}
export const clinicsBySpecialistPageUrl = (seo_url: string, seo_id: string, state: string, city: string, market_name: string) => {
    //  return `/${seo_url}${market_name ? "-At-" + capitalizeEachWordFirstLetter(market_name).replace(" ", "-") : ""}-In-${capitalizeEachWordFirstLetter(city)}-Of-${capitalizeEachWordFirstLetter(state)}/CLINICS-${seo_id}`;
    if (market_name) {
        return `/${state.toLowerCase()}/${city.toLowerCase().replace(' ', '-')}/${seo_url}-In-${market_name.toLowerCase().replace(" ", "-")}/CLINICS-${seo_id}`;
    } else {
        return `/${state.toLowerCase()}/${city.toLowerCase().replace(' ', '-')}/${seo_url}/CLINICS-${seo_id}`;
    }
}
export const categoryResultPageLink = (params: { state: string, city: string,town?: string, seo_url: string, seo_id: string, group_category: string }) => {
    if (params.group_category === "CLINIC") {
        //return `/${params.seo_url}-In-${capitalizeEachWordFirstLetter(params.city)}-Of-${capitalizeEachWordFirstLetter(params.state)}/CLINICS-${params.seo_id}`;
        return `/${params.state.toLowerCase()}/${params.city.toLowerCase().replace(' ', '-')}/${params.seo_url}${params.town? "-in-" + params.town.toLowerCase().replace(" ", "-") : ""}/CLINICS-${params.seo_id}`;
    }
    //return `/${params.seo_url}-In-${capitalizeEachWordFirstLetter(params.city)}-Of-${capitalizeEachWordFirstLetter(params.state)}/${params.seo_id}`;
    return `/${params.state.toLowerCase()}/${params.city.toLowerCase()}/${params.seo_url}${params.town? "-in-" + params.town.toLowerCase().replace(" ", "-") : ""}/${params.seo_id}`;
    
}
export const upiPaymentLink = (upiid: string, total_amount: number, message: string) => {
    return `upi://pay?pa=${upiid}&pn=&am=${total_amount}&cu=INR`;
}