'use client'

import { useEffect } from "react";
import { profile_detail_version } from "@/constants/site-config";
import { TUserProfile } from ".";
import { authenicatedFetchJson, IResponse } from "@/lib/services/http-client";
import { initProfileDetail } from "@/lib/slices/authSlice";
import { useDispatch } from "react-redux";
const useUserProfileDetail = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        let updateProfileDetail = false;
        let cachedVersion = localStorage.getItem("profile_detail_version");
        if (cachedVersion === null || parseInt(cachedVersion) < profile_detail_version) {
            updateProfileDetail = true;
        }
        if (updateProfileDetail) {
            //fetch profile detail from server and update localStorage
            authenicatedFetchJson<IResponse<TUserProfile>>("/user/my-profile-info").then(({ data, code }) => {
                if (code === 200) {
                    localStorage.setItem("profile_detail", JSON.stringify(data));
                    localStorage.setItem("profile_detail_version", profile_detail_version.toString());
                    dispatch(initProfileDetail({ clinic_info: data.clinic_info,clinic_staff_type:data['clinic_staff_type'] }) );
                }
            }
            ).catch((err) => {
                console.log("error in user profile", err);
            })
        }else{
            let profileDetailStr = localStorage.getItem("profile_detail");
            if(profileDetailStr){
                let profileDetail = JSON.parse(profileDetailStr);
                dispatch(initProfileDetail({ clinic_info: profileDetail.clinic_info,clinic_staff_type:profileDetail['clinic_staff_type'] }) );
            }
        }
    }, [])
}
export default useUserProfileDetail;