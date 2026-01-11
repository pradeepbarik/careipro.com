import { cache } from 'react';
import { fetchJson, IResponse } from '@/lib/services/http-server';
import { TDoctor, TDoctorDetail, TDoctorvailableData } from '../types/doctor';
import { TSeodt } from '../types';
import { get_current_datetime } from '@/lib/helper/date-time';
import { TSectionBanner } from '../types/home-page';
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
        doctors: Array<TDoctor>,
        banners?: Array<TSectionBanner>
    }>
}
export const fetchDoctorsPageData = async (state: string, city: string) => {
    try {
        const res = await fetchJson<TDoctorsPageData>(`/cache/${state}/${city}/doctors-page.json`);
        return res;
    } catch (err: any) {
        const { data } = await fetchJson<IResponse<TDoctorsPageData>>(`/init-cache/doctors-page-data?state=${state.replace(' ', '-')}&city=${city.replace(' ', '-')}`);
        return data;
    }
}
export type TfetchDoctorsResponse = {
    specialist_name: string,
    seo_dt: TSeodt,
    doctors: TDoctor[],
    neabyCities: Array<{
        city: string,
        state: string,
        thumbIcon: string,
        market_name: string
    }>,
    cityMarkets: Array<{
        city: string,
        state: string,
        thumbIcon: string,
        market_name: string
    }>
}
export const fetchDoctors = cache(async (params: { state: string, city: string, town?: string, cat_id: number, group_category: string, seo_url: string }) => {
    let date = get_current_datetime(true);
    try {
        const res = await fetchJson<TfetchDoctorsResponse>(`/cache/${params.state.toLowerCase()}/${params.city.toLowerCase()}${params.town ? `/${params.town.toLowerCase().replace(" ", "-")}` : ""}/doctors/catid-${params.cat_id}/${date}.json`);
        return { data: res };
    } catch (err: any) {
        const res = await fetchJson<IResponse<TfetchDoctorsResponse>>(`/get-doctors-list?state=${params.state}&city=${params.city}&cat_id=${params.cat_id}&group_category=${params.group_category}&page=1&seo_url=${params.seo_url}&town=${params.town || ""}`);
        return { data: res.data };
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
        const res = await fetchJson<TDoctorDetail>(`/cache/${params.state.toLowerCase()}/${params.city.toLowerCase()}/doctor-details/DR${params.doctor_id}-SL${params.service_loc_id}-C${params.clinic_id}/details.json`,true);
        return { data: res };
    } catch (ex) {
        const res = await fetchJson<IResponse<TDoctorDetail>>(`/get-doctor-detail?state=${params.state}&city=${params.city}&doctor_id=${params.doctor_id}&clinic_id=${params.clinic_id}&service_loc_id=${params.service_loc_id}&seo_url=${params.seo_url}&market_name=${params.market_name}`, true);
        return { data: res.data };
    }
});
export const fetchDoctorAvailableTime = async (service_loc_id: number) => {
    try {
        const res = await fetchJson<IResponse<TDoctorvailableData>>(`/get-doctor-available-time?service_loc_id=${service_loc_id}`);
        return res.data;
    } catch (err: any) {
        return { available_date: "", available_on: "", first_session_start_time: "", first_session_end_time: "", second_session_start_time: "", second_session_end_time: "" }
    }
}