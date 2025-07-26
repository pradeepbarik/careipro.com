'use client'
import { BiChevronsRight, BiTimeFive } from "react-icons/bi";
import Header from "@/app/components/mobile/header";
import { Button, Input, SectionHeading } from "@/app/components/mobile/ui";
import useAppointmentStatusCheck from '../useAppointmentStatusCheck';
import moment from "moment";
import { formatCurrency, formatDoctorName } from "@/lib/helper/format-text";
import PageVisitLogger from "@/app/components/client-components/page-visit-logger";
const CheckStatusMobile = () => {
    const { appointmentDetail } = useAppointmentStatusCheck();
    return (
        <>
            <Header heading="Appointment Status Check" template='SUBPAGE' />
            {/* <div className="px-2 mx-2 py-2 border shadow-sm rounded-md mt-2">
                <Input lable="Enter your mobile no." type="mobile" />
                <div className="flex justify-center mt-4">
                    <button className="button" data-variant="outlined" onClick={() => { }}>CHECK STATUS <BiChevronsRight className="text-2xl" /></button>
                </div>
            </div> */}
            {/* <SectionHeading heading="Appointment Details" /> */}
            {appointmentDetail !== null ?
                <>
                    <div className="px-2 mx-2 py-2 border shadow-sm rounded-md mt-2 relative">
                        <div className="flex gap-3 py-1">
                            <span className="border border-cyan-500 rounded-md shadow-sm px-1 fs-16 font-semibold">
                                Sl.no: <b className="color-primary">{appointmentDetail.today_booking_id}</b>
                            </span>
                            <span className="ml-auto fs-15 font-semibold">
                                Consult Date :&nbsp;
                                <span className="color-secondary">{moment(appointmentDetail.consult_date).format("DD MMM YYYY")}</span>
                            </span>
                        </div>
                        <div className="py-1 flex">
                            Patient Name :
                            <b className="ml-auto">{appointmentDetail.patient_name}</b>
                        </div>
                        <div className="flex">Address: <b className="ml-auto">{appointmentDetail.patient_address}</b></div>
                        <div className="py-1 flex">Appointment Booked by <b className="ml-auto">{appointmentDetail.firstname + " " + appointmentDetail.lastname}</b></div>
                        <div className="flex">Booking Time : <b className="ml-auto">{moment(appointmentDetail.booking_time).format("DD MMM hh:mm a")}</b></div>
                        <hr className="my-1" />
                        <div>
                            Doctor Name : <b>{formatDoctorName(appointmentDetail.doctor_name)}</b>
                        </div>
                        <div className="py-1">
                            Clinic Name : <b>{appointmentDetail.clinic_name}</b>
                        </div>
                        <div className="bg-orange-200 py-1 px-2 rounded-md border border-orange-400 font-semibold">
                            <BiTimeFive className="inline mr-1" /> {appointmentDetail.consulting_timing_messages} on {moment(appointmentDetail.booking_time).format("DD MMM YYYY")}
                        </div>
                        <hr className="my-2" />
                        <div className="py-1 flex">
                            Consultation Fee
                            <b className="ml-auto color-primary">{formatCurrency(parseInt(appointmentDetail.booking_charge))}</b>
                        </div>
                        <div className="py-1 flex">
                            Platform Fee
                            <b className="ml-auto color-primary">{formatCurrency(parseInt(appointmentDetail.service_charge))}</b>
                        </div>
                        <hr className="my-1" />
                        <div className="py-1 flex fs-16 font-semibold">
                            Total Amount
                            <b className="ml-auto color-primary">{formatCurrency(parseInt(appointmentDetail.total_amount))}</b>
                        </div>
                    </div>
                    <PageVisitLogger data={{
                        page_name: "appointment_status_check",
                        state: appointmentDetail.state,
                        city: appointmentDetail.city,
                        clinic_id: appointmentDetail.clinic_id,
                        doctor_id: appointmentDetail.doctor_id,
                    }} />
                </>
                : <div></div>}

        </>
    )
}
export default CheckStatusMobile;