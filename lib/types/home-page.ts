import { TPopularClinic } from "./clinic"

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
}
export type TSuggestedCity = {
    state: string
    city: string,
    thumbIcon: string
}
export type TSpecility = {
    id: number, name: string, icon: string, short_description: string, seo_url: string
}
export type TSectionBanner = {
    img_url: string,
    alt_text: string,
    redirection_url: string,
    send_enquiry: number,
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
    nearbyCities?: TSuggestedCity[],
    specializations: Record<number, TSpecility>,
    verticals: Array<{ label: string, icons: string, url: string }>,
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