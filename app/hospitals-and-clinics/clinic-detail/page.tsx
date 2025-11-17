import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import { permanentRedirect, RedirectType } from 'next/navigation'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetchClinicDetail } from '@/lib/hooks/useClinics';
import PageVisitLogger from "@/app/components/client-components/page-visit-logger";
const ClinicDetailMobile = dynamic(() => import('./mobile'));
export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
    const { data } = await fetchClinicDetail({ state: searchParams.state, city: searchParams.city, clinic_bid: `C${searchParams.clinic_id}-${searchParams.state_city}`, clinic_id: searchParams.clinic_id, market_name: searchParams.market_name });
    return {
        title: data.clinic_info.page_title,
        description: data.clinic_info.meta_description,
        alternates: {
            canonical: data.pageUrl,
        },
        robots:{
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
    }
}
const ClinicDetail = async ({ searchParams }: { searchParams: { seo_url: string, state: string, city: string, clinic_id: number, state_city: string, market_name: string, sub_page: string } }) => {
    const { device } = useDeviceInfo();
    let { data } = await fetchClinicDetail({ state: searchParams.state, city: searchParams.city, clinic_bid: `C${searchParams.clinic_id}-${searchParams.state_city}`, clinic_id: searchParams.clinic_id, market_name: searchParams.market_name });
    // if (searchParams.seo_url !== data.clinic_info.seo_url) {
    //     permanentRedirect(data.pageUrl, RedirectType.push);
    //     return <></>
    // }
    if (device.type === "mobile" || 1==1) {
        return (
            <>
                <ClinicDetailMobile data={data} searchParams={searchParams} />
                <PageVisitLogger data={{
                    page_name:"clinic_detail",
                    state:searchParams.state,
                    city:searchParams.city,
                    clinic_id:searchParams.clinic_id,
                }} />
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