import { useEffect, useState } from "react";
import { authenicatedFetchJson, IResponse } from "@/lib/services/http-client";
export type TUserProfile = {
    booking_limit: number
    city: string
    clinic_id: number,
    clinic_info?: {
        active: 0 | 1
        alt_mob_no: string | null
        approved: 0 | 1
        bid: string
        business_type: 'CLINIC' | 'PETCARE' | 'MEDICINESTORE' | 'CARETAKER' | 'RELAXATION' | 'PHYSIOTHERAPY'
        category: string
        city: string
        email: string | null
        id: number
        is_prime: 0 | 1
        locality: string
        location: string
        location_lat: string
        location_lng: string
        logo: string | null
        market_name: string | null
        meta_description: string | null
        mobile: string
        name: string
        page_title: string | null
        partner_type: "public_listing" | "partnered"
        seo_url: string
        state: string
        status: "close" | "open"
        tag_line: string | null
        verified: 0 | 1
        whatsapp_channel_link: string | null
        whatsapp_number: string | null
    }
    date_of_birth: string | null,
    doctor_id: number | null,
    email: string | null,
    firstname: string,
    gender: 'male' | 'female' | null
    id: number,
    image: string | null,
    is_clinic_owner: 0 | 1
    lastname: string
    location: string | null,
    mobile: string,
    referal_code: string
    state: string | null,
    sub_district: string
    user_type: "user" | "clinic_staff" | "NSCM",
    clinic_staff_type:'registered' | 'unregisted_clinic_staff' | ''
    village: string | null
}
const useUserProfile = () => {
    const [userProfile, setUserProfile] = useState<TUserProfile | null>(null);
    useEffect(() => {
        authenicatedFetchJson<IResponse<TUserProfile>>("/user/my-profile-info").then(({ data, code }) => {
            if (code === 200) {
                setUserProfile(data);
            }
        }
        ).catch((err) => {
            console.log("error in user profile", err);
        })
    }, [])
    return {
        userProfile
    }
}
export default useUserProfile;