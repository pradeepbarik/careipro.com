import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type initialState = {
    show_login_modal:boolean,
    is_loggedin: boolean,
    guest_user_secreate_key: string,
    secreate_key: string,
    login_success_redirection_url:string
    user_info: {},

}
const initialState: initialState = {
    show_login_modal: false,
    is_loggedin: false,
    guest_user_secreate_key: "",
    secreate_key: "",
    login_success_redirection_url: "",
    user_info: {}
}
const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        initUserDetail: (state, action: PayloadAction<{is_loggedin:boolean,user_info:any}>) => {
            if(action.payload.is_loggedin===true){
                state.is_loggedin=true;
                state.user_info=action.payload.user_info;
            }else{
                state.is_loggedin=false;
                state.user_info={};
            }
        },
        setGuestUserSecreateKey:(state,action:PayloadAction<{secreate_key:string}>)=>{
            state.guest_user_secreate_key=action.payload.secreate_key
        }
    }
})
export const { initUserDetail,setGuestUserSecreateKey } = authSlice.actions;
export default authSlice.reducer;
