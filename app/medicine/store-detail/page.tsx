import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import type { Metadata } from "next";
import { fetchClinicDetail } from "@/lib/hooks/useClinics";
import { medicineStoreDtlpgLink } from "@/lib/helper/link";
import { site_url } from "@/constants/site-config";
const StoreDetailMobile = dynamic(() => import('./mobile'));
const StoreDetailDesktop = dynamic(() => import('./desktop'));
type Tparams={
    store_id:number,
    state:string,
    city:string,
    market_name:string,
    seo_url:string,
    state_city:string,
}
export async function generateMetadata({ searchParams }: { searchParams: Tparams }): Promise<Metadata> {
    const {data}=await fetchClinicDetail({
        clinic_id:searchParams.store_id,
        state:searchParams.state,
        city:searchParams.city,
        market_name:searchParams.market_name,
        clinic_bid:`MS${searchParams.store_id}-${searchParams.state_city}`
    });
    const pageUrl = site_url + medicineStoreDtlpgLink({
        seo_url: data.clinic_info.seo_url,
        state: data.clinic_info.state || searchParams.state,
        city: data.clinic_info.city || searchParams.city,
        market_name: data.clinic_info.market_name || "",
        bid: data.clinic_info.bid || "",
    });
    return {
        title: data.clinic_info.page_title || data.clinic_info.name,
        description: data.clinic_info.meta_description || `Get details of ${data.clinic_info.name} including address, contact, working hours and more on Careipro. Find the best medicine store in ${data.clinic_info.city} for your healthcare needs.`,
        openGraph: {
            title: data.clinic_info.page_title || data.clinic_info.name,
            description: data.clinic_info.meta_description || `Get details of ${data.clinic_info.name} including address, contact, working hours and more on Careipro. Find the best medicine store in ${data.clinic_info.city} for your healthcare needs.`,
            url: pageUrl,
            siteName: 'Careipro',
            images: [
                {
                    url: data.clinic_info.logo || `${process.env.NEXT_PUBLIC_BASE_URL}/default-store-logo.png`,
                    width: 800,
                    height: 600,
                    alt: data.clinic_info.name,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: data.clinic_info.page_title || data.clinic_info.name+` - Best ${data.clinic_info.category} Medicine Store in ${data.clinic_info.city}`,
            description: data.clinic_info.meta_description || `Get details of ${data.clinic_info.name} including address, contact, working hours and more on Careipro. Find the best medicine store in ${data.clinic_info.city} for your healthcare needs.`,
            images: [
                `${process.env.NEXT_PUBLIC_BASE_URL}/default-store-logo.png`,
            ],
        },
        /* clinicDetailpageUrl was used here before, it builds a clinic url
           (/medical-store-in-{market}/...) that does not open this store */
        alternates: {
            canonical: pageUrl,
        },    
    };
}
const StoreDetail=async ({searchParams}:{searchParams:Tparams})=>{
    const {device}=useDeviceInfo();
    const {data} = await fetchClinicDetail({
        clinic_id:searchParams.store_id,
        state:searchParams.state,
        city:searchParams.city,
        market_name:searchParams.market_name,
        clinic_bid:`MS${searchParams.store_id}-${searchParams.state_city}`,
    })
    return device.type==='mobile'
        ? <StoreDetailMobile data={data}/>
        : <StoreDetailDesktop data={data}/>
}
export default StoreDetail;