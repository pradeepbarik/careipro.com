import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetchDoctorDetail } from '@/lib/hooks/useDoctors';
const DoctorDetailMobile = dynamic(() => import('./modile'));

const DoctorDetail = async ({ searchParams }: {
    searchParams: {
        city: string,
        state: string,
        seo_url: string,
        market_name: string,
        doctor_id: number,
        service_loc_id: number,
        clinic_id: number
    }
}) => {
    const { device } = useDeviceInfo();
    const { data } = await fetchDoctorDetail({ doctor_id: searchParams.doctor_id, clinic_id: searchParams.clinic_id, service_loc_id: searchParams.service_loc_id, seo_url: searchParams.seo_url, market_name: searchParams.market_name, state: searchParams.state, city: searchParams.city });
    if (device.type === "mobile") {
        return (<>
            <DoctorDetailMobile data={data} />
        </>)
    } else {
        return (<>
            doctor detail
        </>)
    }

}
export default DoctorDetail;