import { TPopularClinic } from "./clinic"
import { TShortVideo } from "@/lib/helper/short-video";

export type TPopularDoctor = {
    id: number
    name: string,
    email: string
    mobile: string,
    gender: string,
    image: string,
    position: string,
    rating: string,
    experience: number,
    specialization: string | null,
    seo_url: string,
    clinic_id: number,
    market_name: string,
    clinic: string,
    place: string,
    city: string,
    state: string,
    clinic_seo_url: string,
    service_location_id: number,
    availability: string,
    available_date:string,
    available_dates?: Record<string, boolean>,
}
export type TSuggestedCity = {
    state: string
    city: string,
    market_name?: string,
    thumbIcon: string
}
export type TSpecility = {
    id: number, name: string, icon: string, short_description: string, seo_url: string
}
export type TSectionBanner = {
    image?: string,
    img_url: string,
    alt_text: string,
    redirection_url: string,
    send_enquiry: number,
    enquiry_data?:{
        clinic_id:number,
        vertical:string,
        state:string,
        city:string,
        doctor_id:number,
        page:string,
        section:string,
        contact_no:string,
        specialist_id?:number
    },
    display_style: Record<string, any>,
}
export type TSiteBanner = {
    id: number,
    image: string,
    link: string,
    alt_text: string,
    device_type: "desktop" | "mobile" | "all"
}
export type THomePageData = {
    sections: Array<{
        heading: string,
        name: string,
        viewType?: string,
        itemViewType?: string,
        itemWidth?: string,
        specialist_ids?: number[],
        doctor_ids?: number[],
        specialist_id?: number,
        banners?: Array<TSectionBanner>,
    }>,
    /* the city's promo banners, uploaded against the home page in the admin. optional because a city
       with none gets an empty list and older cache files predate the field */
    site_banners?: TSiteBanner[],
    /* the moving counterpart of the banners, configured per page in the admin */
    short_videos?: TShortVideo[],
    nearbyCities?: TSuggestedCity[],
    cityMarkets?: TSuggestedCity[],
    specializations: Record<number, TSpecility>,
    //description is optional, the api does not send one today and the card falls back to its own line
    verticals: Array<{ label: string, icons: string, url: string, description?: string }>,
    popularDoctors: TPopularDoctor[],
    popularClinics: TPopularClinic[],
    doctorCategory?: Array<{
        name: string,
        bgColor: string,
        image: string,
        url: string,
        btnText: string
    }>,
    petCareInfo: Array<{
        banner: string,
        url: string
    }>,
    doctors?: Record<string, TPopularDoctor>,
    clinics?: Record<string, any>,
    specialistDoctors?: Record<string, TPopularDoctor[]>,
}