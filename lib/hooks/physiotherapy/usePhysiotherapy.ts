import { cache } from 'react';
import { fetchJson, IResponse } from "@/lib/services/http-server";
import { TSectionBanner,TSiteBanner } from '@/lib/types/home-page';
export type TSpecialization = {
    id: number,
    name: string,
    icon: string,
    short_description: string,
    seo_url: string,
    seo_id: string
}
export type TClinic = {
    id: number,
    name: string,
    mobile: string,
    location: string,
    city: string,
    locality: string,
    location_lat: string,
    location_lng: string,
    logo: string,
    rating: number,
    seo_url: string,
    alt_mob_no: string,
    state: string,
    market_name: string,
    bid: string,
    partner_type: string,
    business_type: string,
    whatsapp_number: string,
    whatsapp_channel_link: string,
    specialists: string[],
    doctors: Array<{
        id: number,
        name: string,
        mobile: string,
        gender: string,
        experience: number,
        image: string,
        position: string,
        rating: string,
        seo_url: string,
        category: string,
        qualification_disp: string,
        specialization: string,
        business_type: string
    }>,
    doctors_cnt: number,
}
export type TPhysiotherapyHomepageData = {
    sections: Array<{
        heading: string,
        section_type: string,
        viewType: string,
        enable: boolean,
        listing_count: number,
        specialist_ids: number[],
        doctor_ids: number[],
        clinic_ids: number[],
        banners?: Array<TSiteBanner|TSectionBanner>,
        specialists?: Array<TSpecialization>,
        banner?: {
            banner: string,
            banner_redirection_url: string
        },
        clinics?: Array<TClinic>
    }>
}
export const fetchPhysiotherapyHomePageData = async (state: string, city: string) => {
    try {
        const res = await fetchJson<TPhysiotherapyHomepageData>(`/cache/${state.replace(" ", "-").toLowerCase()}/${city.replace(" ", "-").toLowerCase()}/physiotherapy-home-page.json`);
        return res;
    } catch (err: any) {
        const { data } = await fetchJson<IResponse<TPhysiotherapyHomepageData>>(`/init-cache/physiotherapy-home-page-data?state=${state.toLowerCase().replace(" ", "-")}&city=${city.toLowerCase().replace(' ', '-')}`);
        return data;
    }
}