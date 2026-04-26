import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import type { Metadata } from "next";
import { fetchClinicDetail } from "@/lib/hooks/useClinics";
import { clinicDetailpageUrl } from "@/lib/helper/link";
const StoreDetailMobile = dynamic(() => import('./mobile'));
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
    return {
        title: data.clinic_info.page_title || data.clinic_info.name,
        description: data.clinic_info.meta_description || `Get details of ${data.clinic_info.name} including address, contact, working hours and more on Careipro. Find the best medicine store in ${data.clinic_info.city} for your healthcare needs.`,
        openGraph: {
            title: data.clinic_info.page_title || data.clinic_info.name,
            description: data.clinic_info.meta_description || `Get details of ${data.clinic_info.name} including address, contact, working hours and more on Careipro. Find the best medicine store in ${data.clinic_info.city} for your healthcare needs.`,
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/medicine-store/${searchParams.seo_url}`,
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
        alternates: {
            canonical: clinicDetailpageUrl({
                seo_url: data.clinic_info.seo_url,
                state: data.clinic_info.state||"",
                city: data.clinic_info.city||"",
                market_name: data.clinic_info.market_name||"",
                bid: data.clinic_info.bid||"",
                business_type:data.clinic_info.business_type||"",
            }),
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
    if(device.type==='mobile'){
        return (
            <>
                <StoreDetailMobile data={data}/>
            </>
        )
    }
    return <>StoreDetail desktop</>
}
export default StoreDetail;