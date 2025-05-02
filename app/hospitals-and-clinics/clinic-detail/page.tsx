import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import { permanentRedirect, RedirectType } from 'next/navigation'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetchClinicDetail } from '@/lib/hooks/useClinics';
const ClinicDetailMobile = dynamic(() => import('./mobile'));
const ClinicDetail = async ({ searchParams }: { searchParams: { seo_url: string, state: string, city: string, clinic_id: number, state_city: string, market_name: string, sub_page: string } }) => {
    const { device } = useDeviceInfo();
    let { data } = await fetchClinicDetail({ state: searchParams.state, city: searchParams.city, clinic_bid: `C${searchParams.clinic_id}-${searchParams.state_city}`, clinic_id: searchParams.clinic_id, market_name: searchParams.market_name });
    if (searchParams.seo_url !== data.clinic_info.seo_url) {
        permanentRedirect(data.pageUrl, RedirectType.push);
        return <></>
    }
    if (device.type === "mobile") {
        return (
            <>
                <ClinicDetailMobile data={data} searchParams={searchParams} />
            </>
        )
    }
    return (
        <>
            clinic detail
        </>
    )
}
export default ClinicDetail;