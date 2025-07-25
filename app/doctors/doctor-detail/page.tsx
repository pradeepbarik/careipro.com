import dynamic from 'next/dynamic';
import type { Metadata } from "next";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetchDoctorDetail,fetchDoctorAvailableTime } from '@/lib/hooks/useDoctors';
import {TsearchParams} from './types';
import PageVisitLogger from '@/app/components/client-components/page-visit-logger';
const DoctorDetailMobile = dynamic(() => import('./mobile'));
export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
    const data = await fetchDoctorDetail({ doctor_id: searchParams.doctor_id, clinic_id: searchParams.clinic_id, service_loc_id: searchParams.service_loc_id, seo_url: searchParams.seo_url, market_name: searchParams.market_name, state: searchParams.state, city: searchParams.city })
    return {
        title: data.data.seo_dt.title,
        description: data.data.seo_dt.description,
        robots:{
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        }
    }
}
const DoctorDetail = async ({ searchParams }: {
    searchParams: TsearchParams
}) => {
    const { device } = useDeviceInfo();
    const [data,availableData] = await Promise.all([
        fetchDoctorDetail({ doctor_id: searchParams.doctor_id, clinic_id: searchParams.clinic_id, service_loc_id: searchParams.service_loc_id, seo_url: searchParams.seo_url, market_name: searchParams.market_name, state: searchParams.state, city: searchParams.city }),
        fetchDoctorAvailableTime(searchParams.service_loc_id)
    ])
    if (device.type === "mobile") {
        return (<>
            <DoctorDetailMobile data={data.data} searchParams={searchParams} availableData={availableData} />
            <PageVisitLogger data={{
                    page_name:"doctor_detail",
                    state:searchParams.state,
                    city:searchParams.city,
                    doctor_id:searchParams.doctor_id,
                    clinic_id:searchParams.clinic_id
                }} />
        </>)
    } else {
        return (<>
            doctor detail
        </>)
    }

}
export default DoctorDetail;