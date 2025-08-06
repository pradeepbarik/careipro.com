import { fetchJson, authenicatedFetchJson, httpPost } from '@/lib/services/http-client';
import { IResponse, buildResponse } from '@/lib/services/http-client';
import { cache } from 'react';
export type TAllcities = {
    states: Array<{ id: number, name: string, icon: null | string, is_serviceable: 0 | 1 }>,
    data: Record<string, Array<{ id: number, name: string, city_icon: string | null, is_serviceable: 0 | 1, name_ln: string, state: string }>>
}
export const getAllCities = async () => {
    try {
        const res = await fetchJson<TAllcities>("/cache/india/all-cities.json");
        return res;
    } catch (err: any) {
        const { data } = await fetchJson<IResponse<TAllcities>>("/init-cache/all-cities");
        return data
    }
}
export type TSubDistrict = {
    district: string,
    state: string,
    sub_district: string
}
export const getSubDistricts = async (state: string, city: string) => {
    try {
        const res = await fetchJson<IResponse<TSubDistrict[]>>(`/get-sub-districts?state=${state}&district=${city}`);
        return res;
    } catch (err: any) {
        return buildResponse<TSubDistrict[]>([])
    }
}
export type TVillage = {
    name: string
}
export const getVillageList = async (state: string, city: string, sub_district: string) => {
    try {
        const res = await fetchJson<IResponse<{ villages: Array<TVillage> }>>(`/get-area-list?state=${state}&district=${city}&sub_district=${sub_district}`);
        return res;
    } catch (err: any) {
        return buildResponse<{ villages: Array<TVillage> }>({ villages: [] })
    }
}
export type TPincodeData = {
    block: string,
    branch_type: string,
    circle: string,
    city: string,
    description: string | null,
    district: string,
    division: string,
    lastUpdateTime: string,
    name: string,
    pincode: number,
    region: string,
    state: string
}
export const searchLoaction = async (searchText: string | number) => {
    try {
        const res = await fetchJson<IResponse<TPincodeData[]>>(`/search-location?searchtext=${searchText}`);
        return res;
    } catch (err: any) {
        return buildResponse<TPincodeData[]>([]);
    }
}
export const saveAddressPostCurl = (data: {
    state: string,
    city: string,
    sub_dist: string, area: string,
    landmark: string,
    pincode: number | "",
    full_address: string,
    bookmark_name: string,
    page_source: string,
    hasdata: "yes" | "no" | "unknown",
    address_selection_mode: string
}) => {
    return httpPost("/user/bookmark-address", data, { passSecreateKey: true })
}
export type TBookmarkedAddress = {
    _id: string,
    address_selection_mode: string,
    area: string
    bookmark_name: string
    city: string
    entry_time: string
    full_address: string
    page_source: string
    pincode: number | null
    state: string
    sub_dist: string
    landmark: string
}
export const bookmarkedAddressList = async () => {
    try {
        const res = await authenicatedFetchJson<IResponse<TBookmarkedAddress[]>>('/user/bookmarked-addresses');
        return res;
    } catch (err: any) {
        return buildResponse<TBookmarkedAddress[]>([]);
    }
}
export const submitReviewsPostCurl= (data:any)=>{
    return httpPost("/user/submit-appoitment-rating-review",data,{passSecreateKey:true})
}
export const sendEnquiryPostCurl=(data:{
    name:string,
    mobile:string,
    message:string,
    clinic_id?:number,
    doctor_id?:number,
    vertical:string,
    specialist_id?:number,
    state:string,
    city:string,
    market_name?:string,
    page:string,
    section:string
})=>{
    return httpPost("/create-enquiry",data,{passSecreateKey:true,passGuserSecreateKey:true})
}
//user business page
export type TLead = {
    id: number,
    user_id: number,
    patient_name: string,
    patient_mobile: string,
    patient_email: string,
    patient_address: string,
    clinic_id: number,
    doctor_id: number,
    status: string,
    request_time: string,
    reject_reason: string,
    accepted_time: string | null,
    rejected_time: string | null,
    state: string,
    city: string,
    sub_dist: string,
    area: string,
    landmark: string,
    vertical: string
    service_cat_id: number,
    service_name: string,
    service_price: string | null,
    lead_charge: string | null,
    comment: string | null,
    service_time:string,
    appointment_booking_id:number
}
export const fetchLeads = async (params: { status: string, vertical: string }) => {
    try {
        const res = await authenicatedFetchJson<IResponse<TLead[]>>(`/user/business/get-leads?vertical=${params.vertical}&status=${params.status}`);
        return res
    } catch (err) {
        return buildResponse<TLead[]>([])
    }
}
export const addStaffSubmit = async (data: any) => {
    return await httpPost("/user/business/add-new-staff", data, { passSecreateKey: true })
}
export type TStaff = {
    active: number,
    branch_id: number,
    business_type: string,
    category: string,
    city: string,
    clinic_id: number,
    description: string | null,
    display_order_for_clinic: number,
    email: string | null
    entry_time: string,
    experience: number,
    gender: string,
    id: number,
    image: string | null,
    mobile: string,
    name: string,
    online: number,
    position: string,
    qualification_disp: string,
    rating: number,
    registration_no: string,
    seo_url: string,
    short_name: string
    specialization: string | null
}
export const fetchStaffsList = async () => {
    try {
        return await authenicatedFetchJson<IResponse<Array<TStaff>>>("/user/business/my-staffs-list");
    } catch (err) {
        return buildResponse<Array<TStaff>>([]);
    }
}
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
        whatsapp_channel_link: string | null,
        tag_line: string | null,
        enable_enquiry: number,
        show_patients_feedback: number,
        rating: number | null,
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
    pageUrl: string,
}
export const fetchClinicDetail = cache(async (params: { state: string, city: string, market_name: string, clinic_id: number, clinic_bid: string }) => {
    try {
        let data = await fetchJson<TclinicDetail>(`/cache/${params.state.replace(" ", "-").toLowerCase()}/${params.city.replace(" ", "-").toLowerCase()}/clinic-details/${params.clinic_bid}/details.json`);
        return { data: data }
    } catch (err: any) {
        const res = await fetchJson<IResponse<TclinicDetail>>(`/get-clinic-detail?state=${params.state}&city=${params.city}&clinic_id=${params.clinic_id}`);
        return { data: res.data }
    }
})