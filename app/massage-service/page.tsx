import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import {fetchHomepageData} from '@/lib/hooks/massage-service/useMassageService';
const MassageServiceMobile = dynamic(()=>import('./mobile'));
type TProps = {
    params: { [key: string]: string },
    searchParams: { [key: string]: string }
}
export async function generateMetadata({ searchParams }: { searchParams: { city: string, state: string } }): Promise<Metadata> {
    return {
        title: `Find Best body massage service at home in ${searchParams.city} - careipro.com`,
        description: `Best body massage centers and therapist are availble in ${searchParams.city}.Visit careipro.com`
    }
}
const MassageService = async ({ searchParams }: TProps) => {
    const { device } = useDeviceInfo();
    const data = await fetchHomepageData(searchParams.state,searchParams.city);
    if (device.type === "mobile") {
        return (
            <MassageServiceMobile state={searchParams.state} city={searchParams.city} market_name={searchParams.market_name} data={data}/>
        )
    }
    return (
        <>
            massage service
        </>
    )
}
export default MassageService;