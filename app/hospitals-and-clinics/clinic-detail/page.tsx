import type { Metadata } from "next";
import dynamic from 'next/dynamic';
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
        robots: {
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
    let { data } = await fetchClinicDetail({ state: searchParams.state, city: searchParams.city, clinic_bid: `C${searchParams.clinic_id}-${searchParams.state_city}`, clinic_id: searchParams.clinic_id, market_name: searchParams.market_name });
    return (
        <>
            <ClinicDetailMobile data={data} searchParams={searchParams} />
            <PageVisitLogger data={{
                page_type: "detail",
                page_name: "clinic_detail",
                section_name: "initial_load",
                state: searchParams.state,
                city: searchParams.city,
                clinic_id: searchParams.clinic_id,
                vertical: "CLINIC"
            }} />
        </>
    )
}
export default ClinicDetail;