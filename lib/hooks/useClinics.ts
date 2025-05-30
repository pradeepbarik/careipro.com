import { cache } from 'react';
import { fetchJson,getCityCachePath, IResponse } from '@/lib/services/http-server';
import { TClinic,TClinicTopDoctor } from '../types/clinic';
import { TSeodt } from '../types';
import { get_current_datetime } from '@/lib/helper/date-time';
export type TClinicsPageData = {
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
        clinics_count: number,
        view_all_url: string,
        clinics: Array<TClinic>
    }>,
    primary_market: string
}
export const fetchClinicsPageData = async (state: string, city: string) => {
    try {
        const res = await fetchJson<TClinicsPageData>(`/cache/${state.replace(" ", "-").toLowerCase()}/${city.replace(" ", "-").toLowerCase()}/clinics-page.json`);
        return res;
    } catch (err: any) {
        const res = await fetchJson<IResponse<TClinicsPageData>>(`/init-cache/clinics-page-data?state=${state}&city=${city}`);
        return res.data;
    }
}
export type TfetchClinicsListResponse = {
    specialist_name: string, seo_dt: TSeodt, clinics: TClinic[]
}
export const fetchClinicsList = cache(async (params: { state: string, city: string, market_name: string, cat_id: number, group_category: string }) => {
    try {
        let date = get_current_datetime(true);
        const res = await fetchJson<TfetchClinicsListResponse>(`/cache/${params.state.replace(" ", "-").toLowerCase()}/${params.city.replace(" ", "-").toLowerCase()}/clinics/${params.market_name.toLowerCase().replace(" ", "-")}/catid-${params.cat_id}/${date}.json`);
        return { data: res };
    } catch (err: any) {
        const res = await fetchJson<IResponse<TfetchClinicsListResponse>>(`/get-clinics-list?state=${params.state}&city=${params.city}&market_name=${params.market_name}&cat_id=${params.cat_id}&group_category=${params.group_category}`);
        return { data: res.data };
    }
})
export const fetchClinicTopDoctors = cache(async (params: { state: string, city: string, market_name: string }) => {
    try {
        const res = await fetchJson<{[clinic_id:string]:{
            total_doctor:number,
            topDoctors:TClinicTopDoctor[]
        }}>(`${getCityCachePath(params.state,params.city,{market_name:params.market_name,dir:"clinics"})}/clinics-top-doctors.json`,true);
        return {data:res}
    }catch(err:any){
        const res = await fetchJson<IResponse<{
            [clinic_id:string]:{
                total_doctor:number,
                topDoctors:TClinicTopDoctor[]
            }
        }>>(`/init-cache/clinics-top-doctors?state=${params.state}&city=${params.city}&market_name=${params.market_name}`);
        return {data:res.data}
    }
})
export type TclinicDetail = {
    clinic_info: {
        id: number;
        name: string;
        email: string;
        mobile: string;
        location: string;
        city: string;
        locality: string;
        location_lat: number;
        location_lng: number;
        status: string;
        approved: number;
        verified: number;
        active: number;
        logo: string | null;
        seo_url: string;
        page_title: string;
        meta_description: string;
        branch_id: 1;
        is_prime: 1;
        alt_mob_no: string | null;
        state: string | null;
        market_name: string;
        category: string;
        bid: string;
        partner_type: string;
        business_type: string;
        whatsapp_number: string | null,
        whatsapp_channel_link: string | null
    },
    hasBanner: boolean,
    banners: Array<{ image: string }>,
    timing: {
        clinic_id: number;
        sunday: number;
        sunday_1st_session_start: string;
        sunday_1st_session_end: string;
        sunday_2nd_session_start: string;
        sunday_2nd_session_end: string;
        monday: number;
        monday_1st_session_start: string;
        monday_1st_session_end: string;
        monday_2nd_session_start: string;
        monday_2nd_session_end: string;
        tuesday: number;
        tuesday_1st_session_start: string;
        tuesday_1st_session_end: string;
        tuesday_2nd_session_start: string;
        tuesday_2nd_session_end: string;
        wednesday: number;
        wednesday_1st_session_start: string;
        wednesday_1st_session_end: string;
        wednesday_2nd_session_start: string;
        wednesday_2nd_session_end: string;
        thursday: number;
        thursday_1st_session_start: string;
        thursday_1st_session_end: string;
        thursday_2nd_session_start: string;
        thursday_2nd_session_end: string;
        friday: number;
        friday_1st_session_start: string;
        friday_1st_session_end: string;
        friday_2nd_session_start: string;
        friday_2nd_session_end: string;
        saturday: number;
        saturday_1st_session_start: string;
        saturday_1st_session_end: string;
        saturday_2nd_session_start: string;
        saturday_2nd_session_end: string
    },
    specializations: Record<string, Array<{
        id: number;
        name: string;
        parent_id: number;
        icon: string;
        seo_url: string;
        page_title: string;
        meta_description: string;
        group_category: string;
        seo_id: string;
        score: number | null;
        doctor_ids: string;
    }>>,
    doctors: Record<string, {
        id: number;
        doctor_id: number;
        clinic_id: number;
        service_charge: number;
        site_service_charge: number;
        availability: string;
        slno_type: string;
        consulting_time: string;
        sunday: number;
        sunday_1st_session_start: string;
        sunday_1st_session_end: string;
        sunday_2nd_session_start: string;
        sunday_2nd_session_end: string;
        monday: 0;
        monday_1st_session_start: string;
        monday_1st_session_end: string;
        monday_2nd_session_start: string;
        monday_2nd_session_end: string;
        tuesday: number;
        tuesday_1st_session_start: string;
        tuesday_1st_session_end: string;
        tuesday_2nd_session_start: string;
        tuesday_2nd_session_end: string;
        wednesday: number;
        wednesday_1st_session_start: string;
        wednesday_1st_session_end: string;
        wednesday_2nd_session_start: string;
        wednesday_2nd_session_end: string;
        thursday: number;
        thursday_1st_session_start: string;
        thursday_1st_session_end: string;
        thursday_2nd_session_start: string;
        thursday_2nd_session_end: string;
        friday: number;
        friday_1st_session_start: string;
        friday_1st_session_end: string;
        friday_2nd_session_start: string;
        friday_2nd_session_end: string;
        saturday: number;
        saturday_1st_session_start: string;
        saturday_1st_session_end: string;
        saturday_2nd_session_start: string;
        saturday_2nd_session_end: string;
        doctor_name: string;
        profile_pic: string;
        short_name: string | null;
        gender: string;
        experience: number;
        position: string;
        description: string | null;
        seo_url: string;
        registration_no: string | null;
        category: string;
        qualification_disp: string;
        specialists: string;
    }>,
    totalDoctors: number,
    pageUrl:string,
}
export const fetchClinicDetail = cache(async (params: { state: string, city: string, market_name: string, clinic_id: number, clinic_bid: string }) => {
    try {
        let data = await fetchJson<TclinicDetail>(`/cache/${params.state.replace(" ", "-").toLowerCase()}/${params.city.replace(" ", "-").toLowerCase()}/clinic-details/${params.clinic_bid}/details.json`);
        return { data: data }
    } catch (err: any) {
        const res = await fetchJson<IResponse<TclinicDetail>>(`/get-clinic-detail?state=${params.state}&city=${params.city}&clinic_id=${params.clinic_id}`,true);
        return { data: res.data }
    }
})