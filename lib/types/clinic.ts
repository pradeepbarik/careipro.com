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