import { fetchJson, authenicatedFetchJson, httpPost } from '@/lib/services/http-client';
import { IResponse, buildResponse } from '@/lib/services/http-client';
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