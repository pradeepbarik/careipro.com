import { cache } from 'react';
import { fetchJson } from "@/lib/services/http-server";
import { IResponse } from "@/lib/services/http-server";
export const getSendEnquiryWhatsappMessage=(sentTo:"clinic"|"support",clinic_name="")=>{
    if(sentTo==="clinic"){
        return `Hi,\nI found about your service on careipro.com. I need some more info about your service`;
    }else{
        return `Hi,\nI found about ${clinic_name} caretaker service on careipro.com. I need some more information`;
    }
}
export type TCaretakersHomePageData = {
    specialists: Array<{
        id: number,
        name: string,
        icon: string,
        short_description: string,
        seo_url: string,
        seo_id: string
    }>,
    sections: Array<{
        heading: string,
        viewType: "n:1"|"1:n",
        enable: boolean,
        section_type: "doctors"|"clinics",
        listing_count: number,
        cat_id: Array<number>,
        doctor_ids: Array<number>,
        clinic_ids: Array<number>,
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
        
        clinics: Array<{
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
        }>
    }>
}
export const fetCaretakersHomePageData = async (state: string, city: string) => {
    try {
        const res = await fetchJson<TCaretakersHomePageData>(`/cache/${state.replace(" ", "-").toLowerCase()}/${city.replace(" ", "-").toLowerCase()}/caretaker-home-page.json`);
        return res;
    } catch (err: any) {
        const { data } = await fetchJson<IResponse<TCaretakersHomePageData>>(`/init-cache/caretaker-home-page-data?state=${state.toLowerCase().replace(" ", "-")}&city=${city.toLowerCase().replace(' ', '-')}`);
        return data;
    }
}