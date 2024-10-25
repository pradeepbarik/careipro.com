import { cache } from 'react';
import { fetchJson, IResponse } from '@/lib/services/http-server';
import { TDoctor, TDoctorDetail } from '../types/doctor';
import { TSeodt } from '../types';
import {get_current_datetime} from '@/lib/helper/date-time';
export type TDoctorsPageData = {
    specialists: Array<{
        id: number,
        name: string,
        icon: string,
        short_description: string,
        seo_url: string,
        seo_id: string
    }>,
    sections: Array<{
        heading: string,
        viewType: string,
        section_type: string,
        doctors_count: number,
        view_all_url: string,
        doctors: Array<TDoctor>
    }>
}
export const fetchDoctorsPageData = async (state: string, city: string) => {
    const res = await fetchJson<TDoctorsPageData>(`/cache/${state}/${city}/doctors-page.json`);
    return res;
}
export type TfetchDoctorsResponse={
    specialist_name: string, seo_dt: TSeodt, doctors: TDoctor[]
}
export const fetchDoctors = cache(async (params: { state: string, city: string, cat_id: number, group_category: string, seo_url: string }) => {
    let date=get_current_datetime(true);
    try{
        const res = await fetchJson<TfetchDoctorsResponse>(`/cache/${params.state.toLowerCase()}/${params.city.toLowerCase()}/doctors/catid-${params.cat_id}/${date}.json`,true);
        return {data:res};
    }catch(err:any){
        const res = await fetchJson<IResponse<TfetchDoctorsResponse>>(`/get-doctors-list?state=${params.state}&city=${params.city}&cat_id=${params.cat_id}&group_category=${params.group_category}&page=1&seo_url=${params.seo_url}`,true);
        return {data:res.data};
    }
})
export const fetchDoctorDetail = cache(async (params: {
    doctor_id: number,
    clinic_id: number,
    service_loc_id: number,
    state: string,
    city: string,
    market_name: string,
    seo_url: string
}) => {
    try {
        const res = await fetchJson<TDoctorDetail>(`/cache/${params.state.toLowerCase()}/${params.city.toLowerCase()}/doctor-details/DR${params.doctor_id}-SL${params.service_loc_id}-C${params.clinic_id}/details.json`);
        return { data: res };
    } catch (ex) {
        const res = await fetchJson<IResponse<TDoctorDetail>>(`/get-doctor-detail?state=${params.state}&city=${params.city}&doctor_id=${params.doctor_id}&clinic_id=${params.clinic_id}&service_loc_id=${params.service_loc_id}&seo_url=${params.seo_url}&market_name=${params.market_name}`);
        return {data:res.data};
    }
});