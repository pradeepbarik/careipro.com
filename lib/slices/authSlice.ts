import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '@/lib/store'
import { init } from "next/dist/compiled/webpack/webpack";
type TclinicInfo = {
    active: number,
    alt_mob_no: string | null,
    approved: number,
    bid: string,
    business_type: string,
    category: string | null,
    city: string,
    email: string,
    id: number,
    is_prime: number,
    locality: string,
    location: string,
    location_lat: string,
    location_lng: string,
    logo: string | null,
    market_name: string,
    meta_description: string,
    mobile: string,
    name: string,
    page_title: string,
    partner_type: string,
    seo_url: string,
    state: string,
    status: string,
    tag_line: string | null,
    verified: number,
    whatsapp_channel_link: string | null,
    whatsapp_number: string | null
};
type initialState = {
    show_login_modal: boolean,
    is_loggedin: boolean,
    guest_user_secreate_key: string,
    secreate_key: string,
    login_success_redirection_url: string
    user_info: {
        business_type: string,
        email: string,
        firstname: string,
        id: number,
        image: string,
        lastname: string,
        loggedin: boolean
        mobile: string,
        mobile_exist: boolean,
        referal_code: string,
        secreate_key: string,
        user_type: string,
        clinic_staff_type?: 'registered' | 'unregisted_clinic_staff' | ''
        is_clinic_owner: number,
        emp_id:number|null,
        emp_info?: {
            branch_id: number,
            department_id: number,
            status:string
            user_app_access:string[]
        }
    } | null,
    cookies: Record<string, string>,
    clinic_info?: TclinicInfo | null
}
const initialState: initialState = {
    show_login_modal: false,
    is_loggedin: false,
    guest_user_secreate_key: "",
    secreate_key: "",
    login_success_redirection_url: "",
    user_info: null,
    cookies: {},
    clinic_info: null,
}
const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        initCookies: (state, action: PayloadAction<Record<string, string>>) => {
            state.cookies = action.payload;
        },
        initUserDetail: (state, action: PayloadAction<{ is_loggedin: boolean, user_info: any }>) => {
            if (action.payload.is_loggedin === true) {
                state.is_loggedin = true;
                state.user_info = action.payload.user_info;
            } else {
                state.is_loggedin = false;
                state.user_info = null;
            }
        },
        setGuestUserSecreateKey: (state, action: PayloadAction<{ secreate_key: string }>) => {
            state.guest_user_secreate_key = action.payload.secreate_key
        },
        initProfileDetail: (state, action: PayloadAction<{ clinic_info: any,clinic_staff_type: 'registered' | 'unregisted_clinic_staff' | '' }>) => {
            state.clinic_info = action.payload.clinic_info;
            state.user_info = state.user_info ? {...state.user_info, clinic_staff_type: action.payload.clinic_staff_type} : null;
        }
    }
})
export const selectAuthSlice = (state: RootState) => state.authSlice;
export const { initCookies, initUserDetail, setGuestUserSecreateKey, initProfileDetail } = authSlice.actions;
export default authSlice.reducer;
