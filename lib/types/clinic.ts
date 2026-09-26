import { TClinicTiming } from "@/lib/helper/clinic-timing";
export type TClinic = {
    id: number,
    bid: string,
    name: string,
    mobile: number,
    location: string,
    city: string,
    locality: string,
    location_lat: number,
    location_lng: number,
    logo: string,
    seo_url: string,
    is_prime: number,
    alt_mob_no: string,
    state: string,
    market_name: string,
    category: string,
    partner_type: string,
    doctors_count: number,
    total_specialist: number,
    doctor_specializations: string[],
    services?: string[],
    rating_cnt: number| null,
    review_cnt: number| null,
    open_time: string,
    business_type?: string,
    verified?: number,
    tag_line?: string | null,
    whatsapp_number?: string | null,
    established_year?: number | null,
    /* averaged over public reviews. clinics.rating is a flag, not a score, so it is not used */
    avg_rating?: number | null,
    /* the week's sessions, so the card can say open or closed in the visitor's own time */
    timing?: TClinicTiming | null,

    /* TESTSCAN centers only. Needs a sample_home_collection column on clinics before it is ever set. */
    sample_home_collection: number,
    sample_home_collection_charge: number,
    discount_msg: string,
    recommended_doctors:string,
    /* Brand the lab collects samples for, eg Apollo or Dr Lal PathLabs. Empty when independent. */
    partner_with: string,
}
export type TPopularClinic = TClinic & {
    banner: string
}
export type TClinicTopDoctor = {
    id: number,
    name: string,
    short_name: string | null,
    image: string | null,
    specialization: string | null,
    position: string,
    seo_url: string,
    display_order_for_clinic: number,
    seo_rank: number,
    clinic_id: number,
    clinic_name: string
}