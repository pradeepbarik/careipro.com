import { fetchJson, IResponse } from '@/lib/services/http-server';
import { get_current_datetime } from '@/lib/helper/date-time';
export type THomePageData = {
    banners: Array<{
        "banner_url": string,
        "banner_type": "image" | "video",
        "redirection_url": string
    }>,
    categories: Array<{
        "name": string,
        "icon": string,
        "short_description": string,
        "seo_url": string,
        "seo_id": string
    }>
}
export const fetchHomepageData = async (state: string, city: string) => {
    try {
        const res = await fetchJson<THomePageData>(`/cache/${state.toLowerCase()}/${city.toLowerCase()}/massage-service-home-page.json`, true);
        return res;
    } catch (err: any) {
        const { data } = await fetchJson<IResponse<THomePageData>>(`/init-cache/massage-service-home-page-data?state=${state.toLowerCase().replace(" ", "-")}&city=${city.toLowerCase().replace(' ', '-')}`);
        return data;
    }
}
export type TCategory={
    id:number,
    name: string,
    icon: string,
    short_description: string,
    seo_url: string,
    seo_id: string,
    price:number,
    lead_charge:number,
    display_price:string,
    service_duration_display:string
}
export type TServiceListPageData={
    categories:Array<TCategory>,
    seo_dt:{
        title:string,
        description:string
    },
    page_url:string
}
export const fetchServiceProvidersList = async (params: {
    state: string,
    city: string,
    market_name?: string,
    cat_id: number
}) => {
    try {
        let date = get_current_datetime(true);
        if (params.market_name) {
            const res = await fetchJson<TServiceListPageData>(`/cache/${params.state.replace(" ", "-").toLowerCase()}/${params.city.replace(" ", "-").toLowerCase()}/massage-service/${params.market_name.toLowerCase().replace(" ", "-")}/catid-${params.cat_id}/${date}.json`);
            return { data: res };
        } else {
            const res = await fetchJson<TServiceListPageData>(`/cache/${params.state.replace(" ", "-").toLowerCase()}/${params.city.replace(" ", "-").toLowerCase()}/massage-service/catid-${params.cat_id}/${date}.json`);
            return { data: res };
        }
    } catch (err: any) {
        const res = await fetchJson<IResponse<TServiceListPageData>>(`/init-cache/massage-service-list?state=${params.state}&city=${params.city}&market_name=${params.market_name || ""}&cat_id=${params.cat_id}`,true);
        return { data: res.data };
    }
}