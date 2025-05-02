import dynamic from 'next/dynamic';
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetchDoctorDetail,fetchDoctorAvailableTime } from '@/lib/hooks/useDoctors';
import {TsearchParams} from './types';
const DoctorDetailMobile = dynamic(() => import('./mobile'));
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
        </>)
    } else {
        return (<>
            doctor detail
        </>)
    }

}
export default DoctorDetail;