import { get_current_datetime } from "../helper/date-time";
import { fetchJson, IResponse } from "../services/http-server";
export type TStoreListResponse={
    store_available_markets: string[],
    store_available_areas: string[],
    stores: Array<{
        id: number,
        name: string,
        mobile: string,
        email: string,
        location: string,
        city: string,
        locality: string,
        location_lat: number,
        location_lng: number,
        status: string,
        approved: number,
        verified: number,
        active: number,
        logo: string,
        seo_url: string,
        branch_id: number,
        is_prime: number,
        prime_rank: number,
        alt_mob_no: string,
        state: string,
        market_name: string,
        rating: number,
        rating_cnt: number,
        review_cnt: number,
        category: string,
        bid: string,
        partner_type: string,
        home_delivery: number,
        delivery_time_tag: string,
        business_type: string,
        whatsapp_number: string,
        tag_line: string,
        enable_enquiry: number,
        show_patients_feedback: number,
        last_update_time: string,
        medicine_home_delivery: number,
        medicine_delivery_time_tag: string,
         medicine_min_order_tag: string,
        open_time: string,
        recommended_doctors: string,
        discount_msg:string|null,
        dtlpg_url:string
    }>,

}
export const fetchStoreList = async (params: { state: string, city: string, town?: string, cat_id: string }) => {
    try {
        let date = get_current_datetime(true);
        const res = await fetchJson<TStoreListResponse>(`/cache/${params.state.toLowerCase().replace(/ /g, '-')}/${params.city.toLowerCase().replace(/ /g, '-')}/medicine-store${params.town ? `/${params.town.toLowerCase().replace(/ /g, '-')}` : ""}/catid-${params.cat_id || 0}/${date}.json`);
        return { data: res };
    } catch (err: any) {
        const res = await fetchJson<IResponse<TStoreListResponse>>(`/get-medicine-store-list?state=${params.state}&city=${params.city}&market_name=${params.town || ""}&cat_id=${params.cat_id || 0}`);
        return { data: res.data };
    }
}
export type TMedicineStoreDetail = {
    id: number,
    name: string,
    contact_no: string,
    email: string,
    logo: string,
    live_status: number,
    state: string,
    city: string,
    locality: string,
    location: string,
    location_lat: number,
    location_lng: number,
    partner_type: string,
    home_delivery: number,
    delivery_time_tag: string,
    min_order_tag: string,
    open_time: string,
    business_type: string,
    status: 'verified' | 'not_verified',
    avg_rating: number,
    total_reviews: number,
    rating_count: number,
}
export const fetchMedicineStoreDetail = async (params: { store_id: string, state: string, city: string }) => {
    try {
        const res = await fetchJson<TMedicineStoreDetail>(`/cache/${params.state.toLowerCase().replace(/ /g, '-')}/${params.city.toLowerCase().replace(/ /g, '-')}/store-details/MSID${params.store_id}/details.json`);
        return { data: res };
    } catch (err: any) {
        const res = await fetchJson<IResponse<TMedicineStoreDetail>>(`/get-store-detail?store_id=${params.store_id}&state=${params.state}&city=${params.city}`);
        return { data: res.data };
    }
}