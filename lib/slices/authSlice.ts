import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RootState} from '@/lib/store'
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
    } | null,
    cookies: Record<string, string>
}
const initialState: initialState = {
    show_login_modal: false,
    is_loggedin: false,
    guest_user_secreate_key: "",
    secreate_key: "",
    login_success_redirection_url: "",
    user_info: null,
    cookies: {}
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
        }
    }
})
export const selectAuthSlice=(state:RootState)=>state.authSlice;
export const { initCookies, initUserDetail, setGuestUserSecreateKey } = authSlice.actions;
export default authSlice.reducer;
