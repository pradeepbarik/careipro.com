import { ChangeEvent, useEffect, useState } from 'react';
import { fetchAppointmentHistory, Tappointment, fetchAppointmentDetail, TappointmentDetail, fetchCaseDetails, uploadPrescriptionPostCurl, deletePrescriptionCurl, TcaseInfo } from '@/lib/services/apicalls';
const useAppointment = ({ init, case_id, appointmentId, page }: { init: boolean, case_id?: number, appointmentId?: number, page: "history" | "detail" }) => {
    const [appointments, setAppointments] = useState<Tappointment[]>([]);
    const [appointment, setAppointment] = useState<Tappointment | null>(null);
    const [appointmentDetail, setAppointmentDetail] = useState<TappointmentDetail | null>(null);
    const [caseAppointmentIds, setCaseAppointmentIds] = useState<number[]>([]);
    const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
    const [activeAppointmentId, setActiveAppointmentId] = useState<number>(appointmentId || 0);
    const [appointmentInfo, setAppointmentInfo] = useState<Record<number, TcaseInfo>>({})
    const [caseAppointmentDetails, setCaseAppointmentDetails] = useState<{ [id: number]: TappointmentDetail }>({});
    const appointmentsHistory = () => {
        fetchAppointmentHistory(0, 100).then(({ data }) => {
            setAppointments(data)
        })
    }
    const getAppointmentDetail = (id: number) => {
        fetchAppointmentDetail(case_id || 0, id || 0, appointmentInfo[id]?._id || "").then(({ data }) => {
            setAppointmentDetail(data)
            setCaseAppointmentDetails((prevState) => ({
                ...prevState,
                [id]: data
            }))
        })
    }
    const caseDetails = () => {
        fetchCaseDetails(case_id || 0).then(({ data }) => {
            let booking_ids = [];
            let bookingIdDetail: Record<number, TcaseInfo> = {};
            for (let bd of data.booking_ids) {
                booking_ids.push(bd.appointment_id)
                bookingIdDetail[bd.appointment_id] = bd;
            }
            setAppointmentInfo(bookingIdDetail);
            setCaseAppointmentIds(booking_ids)
        })
    }
    const onSwipeEnd = (index: number) => {
        let bid = caseAppointmentIds[index];
        setActiveAppointmentId(bid);
    }
    const onSelectPrescriptionImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const formData = new FormData();
            formData.append("booking_id", activeAppointmentId?.toString() || "");
            formData.append('precription_photo', e.target.files[0]);
            uploadPrescriptionPostCurl(formData).then(({ data, code }) => {
                if (code === 200) {
                    getAppointmentDetail(activeAppointmentId);
                }
            })
        }
    }
    const deletePrescription = (prescription: string) => {
        var filename = prescription.substring(prescription.lastIndexOf('/') + 1);
        deletePrescriptionCurl({ prescription: filename, booking_id: activeAppointmentId || 0 }).then(({ data, code }) => {
            if (code === 200) {
                getAppointmentDetail(activeAppointmentId);
            }
        })
    }
    useEffect(() => {
        if (init === true && appointmentId && page === "detail") {
            caseDetails();
        }
        if (init === true && page === "history") {
            appointmentsHistory();
        }
    }, [])
    useEffect(() => {
        if (page === "detail") {
            if (caseAppointmentDetails[activeAppointmentId]) {
                setAppointmentDetail(caseAppointmentDetails[activeAppointmentId]);
            } else {
                getAppointmentDetail(activeAppointmentId);
            }
        }
    }, [activeAppointmentId])
    return {
        appointments,
        appointment,
        setAppointment,
        appointmentsHistory,
        appointmentDetail,
        setAppointmentDetail,
        caseAppointmentIds,
        caseAppointmentDetails,
        getAppointmentDetail,
        activeAppointmentId,
        onSwipeEnd,
        showReviewModal,
        setShowReviewModal,
        onSelectPrescriptionImage,
        deletePrescription
    }
}
export default useAppointment;