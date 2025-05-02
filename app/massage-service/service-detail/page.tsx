import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import {fetchServiceProvidersList} from '@/lib/hooks/massage-service/useMassageService';
const ServiceDetailMobile = dynamic(() => import('./mobile'));
export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
    const {data} = await fetchServiceProvidersList({ state: searchParams.state, city: searchParams.city, cat_id: searchParams.cat_id, market_name: searchParams.market_name })
    return {
        title: data.seo_dt.title,
        description: data.seo_dt.description
    }
}
const ServiceDetail = async ({searchParams}:{searchParams:any}) => {
    const { device } = useDeviceInfo();
    const {data} = await fetchServiceProvidersList({ state: searchParams.state, city: searchParams.city, cat_id: searchParams.cat_id, market_name: searchParams.market_name })
    if (device.type === "mobile") {
        return (
            <>
                <ServiceDetailMobile data={data} />
            </>
        )
    }
    return (
        <>
            service detail
        </>
    )
}
export default ServiceDetail;