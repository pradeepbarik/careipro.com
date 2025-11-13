import type { Metadata } from "next";
import { permanentRedirect, RedirectType } from 'next/navigation'
import dynamic from 'next/dynamic';
import PageVisitLogger from '@/app/components/client-components/page-visit-logger';
import { fetchDoctors } from '@/lib/hooks/useDoctors';
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const DoctorListMobile = dynamic(() => import("@/app/doctors/doctors-list/mobile"));
export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
    const data = await fetchDoctors({ state: searchParams.state, city: searchParams.city, cat_id: searchParams.cat_id, group_category: searchParams.group_cat, seo_url: searchParams.seo_url })
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
            canonical:`/${searchParams.seo_url}-In-${searchParams.city}-Of-${searchParams.state}/CATG${searchParams.cat_id}-${searchParams.group_cat}` // Relative path will be combined with metadataBase
        }
    }
}
const DoctorsList = async ({ searchParams }: { searchParams: any }) => {
    const { device } = useDeviceInfo();
    const data = await fetchDoctors({ state: searchParams.state, city: searchParams.city, cat_id: searchParams.cat_id, group_category: searchParams.group_cat, seo_url: searchParams.seo_url })
    // if (data.data.seo_dt.short_seo_url !== searchParams.seo_url) {
    //     permanentRedirect("/" + data.data.seo_dt.seo_url, RedirectType.push);
    //     return <></>
    // }
    if (device.type === "mobile") {
        return (<>
            <DoctorListMobile params={searchParams} data={data.data} />
            <PageVisitLogger data={{
                page_type: "listing",
                page_name: "doctors_list",
                state: searchParams.state,
                city: searchParams.city,
                cat_id: searchParams.cat_id,
                group_category: searchParams.group_cat
            }} />
        </>)
    } else {
        return (<>
            doctors list desktop
        </>)
    }

}
export default DoctorsList;