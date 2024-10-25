import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetchClinicsList } from '@/lib/hooks/useClinics';
const ClinicListMobile = dynamic(() => import('./mobile'));
const ClinicListDesktop = dynamic(() => import('./desktop'));
export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
    const data = await fetchClinicsList({ state: searchParams.state, city: searchParams.city, cat_id: searchParams.cat_id, group_category: searchParams.group_cat, market_name: searchParams.market_name })
    return {
        title: data.data.seo_dt.title,
        description: data.data.seo_dt.meta_description
    }
}
const Clinics = async ({ searchParams }: { searchParams: any }) => {
    const { device } = useDeviceInfo();
    const data = await fetchClinicsList({ state: searchParams.state, city: searchParams.city, market_name: searchParams.market_name, cat_id: searchParams.cat_id, group_category: searchParams.group_cat });
    if (device.type === "mobile") {
        return (<>
            <ClinicListMobile params={searchParams} data={data.data} />
        </>)
    } else {
        return (<>
            <ClinicListDesktop />
        </>)
    }
}
export default Clinics;