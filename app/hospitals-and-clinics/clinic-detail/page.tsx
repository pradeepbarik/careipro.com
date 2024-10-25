import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import {fetchClinicDetail } from '@/lib/hooks/useClinics';
const ClinicDetailMobile = dynamic(() => import('./mobile'));
const ClinicDetail = async ({searchParams}:{searchParams:{state:string,city:string,clinic_id:number,state_city:string,market_name:string}}) => {
    const { device } = useDeviceInfo();
    let {data} = await fetchClinicDetail({state:searchParams.state,city:searchParams.city,clinic_bid:`C${searchParams.clinic_id}-${searchParams.state_city}`,clinic_id:searchParams.clinic_id,market_name:searchParams.market_name});
    if (device.type === "mobile") {
        return (
            <>
                <ClinicDetailMobile data={data} />
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