import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchJson } from "@/lib/services/http-client";
import { IResponse } from "@/lib/services/http-server";
import { fetchClinicDetail, TclinicDetail } from '@/lib/hooks/useClientSideApiCall';
type TDoctorAvailability = {
    date: string;
    first_session_start_time: string;
    first_session_end_time: string;
    second_session_start_time: string;
    second_session_end_time: string;
    service_loc_id: number;
};

type TAppointmentDetail = {
    id: number,
    clinic_name: string
    consulting_timing_messages: string
    doctor_name: string,
    patient_address: string,
    patient_mobile: string
    patient_name: string
    today_booking_id: string,
    clinic_mobile: string,
    booking_time: string,
    consult_date: string,
    firstname: string,
    lastname: string,
    booked_through: string,
    booking_charge: string,
    service_charge: string,
    total_amount: string,
    clinic_state: string,
    clinic_city: string,
    clinic_contact_no: string,
    doctor_id: number,
    clinic_id: number,
    show_rebook_btn: number,
    doctor_seo_url: string,
    doctor_business_type: string,
    servicelocation_id: number,
    clinic_market_name: string,
    collect_payment_upi_id: string,
    collect_payment_upi_mobile: string,
    payment_status: string,
    status: string,
    bid: string,
    doctor_availability?: TDoctorAvailability,
    rating?: number,
    rev_id?: number,
    visited_for?: string,
    experience?: string,
    review_tags?: Array<{
      tag: string, score: number, topic: string, sub_topic: string
   }> | null

}
const useAppointmentStatusCheck = () => {
    const searchParams = useSearchParams();
    const [appointmentDetail, setAppointmentDetail] = useState<TAppointmentDetail | null>(null)
    const [clinicDetail, setClinicDetail] = useState<TclinicDetail | null>(null);
    const [showRatingModal, setShowRatingModal] = useState<boolean>(false);
    const getClinicDetails = async (data: any) => {
        try {
            let clinicdetail = await fetchClinicDetail({ state: data?.clinic_state, city: data?.clinic_city, market_name: data?.clinic_market_name, clinic_id: data?.clinic_id, clinic_bid: data.bid })
            setClinicDetail(clinicdetail.data);
        } catch (err) {

        }
    }
    const getAppointmentDetail = async (appointmentId: number | undefined) => {
        if (!appointmentId) return;
        fetchJson<IResponse<TAppointmentDetail>>(`/appointment-status?booking_id=${appointmentId}`, false, {}, { passGuserSecreateKey: true, passSecreateKey: true }).then(({ data }) => {
            setAppointmentDetail(data);
            getClinicDetails(data)
        })
    }
    useEffect(() => {
        fetchJson<IResponse<TAppointmentDetail>>(`/appointment-status?booking_id=${searchParams.get("id")}&req_action=${searchParams.get("req_action") || ""}`, false, {}, { passGuserSecreateKey: true, passSecreateKey: true }).then(({ data }) => {
            setAppointmentDetail(data);
            getClinicDetails(data)
            let alreadyshown = sessionStorage.getItem("show_rating_modal_" + data.id);
            if (!alreadyshown) {
                if (searchParams.get("action") === "share_review" || searchParams.get("req_action") === "share_review") {
                    setShowRatingModal(true);
                    sessionStorage.setItem("show_rating_modal_" + data.id, "1");
                }
            }
        })
    }, [])
    return {
        appointmentDetail, clinicDetail, getAppointmentDetail, showRatingModal, setShowRatingModal
    }
}
export default useAppointmentStatusCheck;