import { fetchJson, authenicatedFetchJson, httpPost } from '@/lib/services/http-client';
import { IResponse, buildResponse } from '@/lib/services/http-client';
import { cache } from 'react';
import {TAllcities} from '@/lib/types';
export const getAllCities = async () => {
    try {
        const res = await fetchJson<TAllcities>("/cache/india/all-cities.json",true);
        return res;
    } catch (err: any) {
        const { data } = await fetchJson<IResponse<TAllcities>>("/init-cache/all-cities",true);
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
export type TAreaSearchResult = {
    state: string,
    district: string,
    sub_district: string,
    area_name: string
}
export const searchArea = async (searchText: string, district?: string) => {
    try {
        const res = await fetchJson<IResponse<TAreaSearchResult[]>>(`/search-area?searchtext=${encodeURIComponent(searchText)}${district ? `&district=${encodeURIComponent(district)}` : ''}`);
        return res;
    } catch (err: any) {
        return buildResponse<TAreaSearchResult[]>([]);
    }
}
export type TMembershipPlan = {
    id: number,
    plan_name: string,
    service_includs: string,
    service_excludes: string,
    amount: number,
    duration: number,
    plan_for: string,
    city: string | null
}
export const fetchMembershipPlans = async (plan_for: string, city: string) => {
    try {
        const res = await fetchJson<IResponse<TMembershipPlan[]>>(`/membership-plans?plan_for=${encodeURIComponent(plan_for)}&city=${encodeURIComponent(city)}`);
        return res;
    } catch (err: any) {
        return buildResponse<TMembershipPlan[]>([]);
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
export const submitPatientEnquiry = (data: {
    doctor_id: number,
    clinic_id: number,
    servicelocation_id: number,
    doctor_name: string,
    clinic_name: string,
    city: string,
    query: string
}) => {
    return httpPost<{ id: string }>("/user/patient-enquiry", data, { passSecreateKey: true })
}
export type TPatientEnquiry = {
    id: string,
    doctor_id: number,
    clinic_id: number,
    servicelocation_id: number,
    doctor_name: string,
    clinic_name: string,
    query: string,
    status: "open" | "resolved" | "cancelled",
    resolution_note: string,
    resolved_at: string | null,
    rating: number,
    create_time: string
}
export const fetchPatientEnquiries = async (doctor_id?: number) => {
    try {
        const res = await authenicatedFetchJson<IResponse<TPatientEnquiry[]>>(`/user/patient-enquiries${doctor_id ? `?doctor_id=${doctor_id}` : ''}`);
        return res;
    } catch (err: any) {
        return buildResponse<TPatientEnquiry[]>([]);
    }
}
export const closePatientEnquiry = (data: { id: string, rating: number, rating_feedback: string }) => {
    return httpPost<{ id: string }>("/user/close-patient-enquiry", data, { passSecreateKey: true })
}
export const cancelPatientEnquiry = (data: { id: string }) => {
    return httpPost<{ id: string }>("/user/cancel-patient-enquiry", data, { passSecreateKey: true })
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
export type TMembershipStatus = {
    is_prime_member: boolean,
    plan_name: string | null,
    plan_expired_time: string | null
}
export const fetchMembershipStatus = async () => {
    try {
        const res = await authenicatedFetchJson<IResponse<TMembershipStatus>>('/user/membership-status');
        return res;
    } catch (err: any) {
        return buildResponse<TMembershipStatus>({ is_prime_member: false, plan_name: null, plan_expired_time: null });
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
/* The clinic detail shape is defined once, in useClinics, and re-exported here.
   This file used to carry its own copy of it. Both fetch the very same endpoint, so the
   copy could only ever drift, and it had: it was missing ratings, lab fields and timings,
   which made check-status fail to typecheck when passing its result to a component that
   expected the real shape.

   It is an `import type`, which typescript erases completely. A value import would pull in
   useClinics' server-only fetch helper and break any client component importing this file. */
import type { TclinicDetail } from '@/lib/hooks/useClinics';
export type { TclinicDetail };
export const fetchClinicDetail = cache(async (params: { state: string, city: string, market_name: string, clinic_id: number, clinic_bid: string }) => {
    try {
        let data = await fetchJson<TclinicDetail>(`/cache/${params.state.replace(" ", "-").toLowerCase()}/${params.city.replace(" ", "-").toLowerCase()}/clinic-details/${params.clinic_bid}/details.json`);
        return { data: data }
    } catch (err: any) {
        const res = await fetchJson<IResponse<TclinicDetail>>(`/get-clinic-detail?state=${params.state}&city=${params.city}&clinic_id=${params.clinic_id}`);
        return { data: res.data }
    }
})