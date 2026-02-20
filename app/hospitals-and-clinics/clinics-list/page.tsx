import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetchClinicsList, fetchClinicTopDoctors } from '@/lib/hooks/useClinics';
import PageVisitLogger from "@/app/components/client-components/page-visit-logger";
const ClinicListMobile = dynamic(() => import('./mobile'));
const ClinicListDesktop = dynamic(() => import('./desktop'));
export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
    const data = await fetchClinicsList({ state: searchParams.state, city: searchParams.city, cat_id: searchParams.cat_id, group_category: searchParams.group_cat, market_name: searchParams.market_name })
    return {
        title: data.data.seo_dt.title,
        description: data.data.seo_dt.meta_description,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
        alternates:{
        canonical: `https://careipro.com/${searchParams.state.toLowerCase().replace(" ", "-")}/${searchParams.city.toLowerCase().replace(" ", "-")}/${searchParams.seo_url}-In-${searchParams.market_name}/CLINICS-CATG${searchParams.cat_id}-${searchParams.group_cat}` // Relative path will be combined with metadataBase
        }
    }
}
const Clinics = async ({ searchParams }: { searchParams: any }) => {
    const { device } = useDeviceInfo();
    let [clinicListData, clinicSTopDoctorsData] = await Promise.all([
        fetchClinicsList({ state: searchParams.state, city: searchParams.city, market_name: searchParams.market_name, cat_id: searchParams.cat_id, group_category: searchParams.group_cat }),
        fetchClinicTopDoctors({ state: searchParams.state, city: searchParams.city, market_name: searchParams.market_name })
    ])
    if (device.type === "mobile" || 1==1) {
        return (<>
            <ClinicListMobile params={searchParams} data={clinicListData.data} topDoctorsData={clinicSTopDoctorsData.data} />
            <PageVisitLogger data={{
                page_type: "listing",
                page_name: "clinics_list",
                state: searchParams.state,
                city: searchParams.city,
                cat_id: searchParams.cat_id,
                group_category: searchParams.group_cat,
                vertical:"CLINIC"
            }} />
        </>)
    } else {
        return (<>
            <ClinicListDesktop />
        </>)
    }
}
export default Clinics;