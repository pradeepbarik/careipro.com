import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchJson } from "@/lib/services/http-client";
import { IResponse } from "@/lib/services/http-server";
import useSiteVisiterLogger from "@/lib/hooks/useSiteVisiterLogger";
type TAppointmentDetail = {
    clinic_name: string
    consulting_timing_messages: string
    doctor_name: string,
    patient_address: string,
    patient_mobile: string
    patient_name: string
    today_booking_id: string,
    clinic_mobile: string,
    booking_time:string,
    consult_date:string,
    firstname:string,
    lastname:string,
    booked_through:string,
    booking_charge:string,
    service_charge:string,
    total_amount:string,
    state:string,
    city:string,
    doctor_id:number,
    clinic_id:number
}
const useAppointmentStatusCheck = () => {
    const searchParams = useSearchParams();
    const [appointmentDetail, setAppointmentDetail] = useState<TAppointmentDetail | null>(null)
    useEffect(() => {
        fetchJson<IResponse<TAppointmentDetail>>(`/appointment-status?booking_id=${searchParams.get("id")}`, false, {}, { passGuserSecreateKey: true, passSecreateKey: true }).then(({data})=>{
            setAppointmentDetail(data);
        })
    }, [])
    return {
        appointmentDetail
    }
}
export default useAppointmentStatusCheck;