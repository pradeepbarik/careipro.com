'use client'
import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux";
import { toast } from 'react-toastify'
import { httpPost, authenicatedFetchJson, fetchJson } from "@/lib/services/http-client";
import { RootState } from '@/lib/store';
import useReminder from '@/lib/hooks/useReminder';
import { IResponse } from "../services/http-server";
import { TDoctorDetail, TDoctorvailableData } from '@/lib/types/doctor';
// @ts-ignore
import { load, CFEnvironment } from '@cashfreepayments/cashfree-js';
type TBookingSuccessResponse = {
    booking_date: string,
    booking_id: number,
    consult_date: string,
    today_booking_id: string
}
type TdoctorConsultDate = {
    date: string,
    first_session_start_time: string,
    first_session_end_time: string,
    second_session_start_time: string,
    second_session_end_time: string,
    third_session_start_time: string,
    third_session_end_time: string
}
type TSuggestedPatientInfo = { id: number, patient_name: string, patient_mobile: string, patient_gender: string, patient_age: string, patient_address: string };
const patientInfoInitState = { case_id: 0, patient_name: "", patient_mobile: "", patient_address: "", patient_age: "", patient_gender: "", dataFillMode: "form" };
const useBooking = ({ service_loc_id, doctor_id, clinic_id, open, settings, availability, pageUrl }: { service_loc_id: number, doctor_id: number, clinic_id: number, open: boolean, settings: TDoctorDetail['settings'], availability?: TDoctorvailableData, pageUrl: string }) => {
    const router = useRouter();
    const { is_loggedin, user_info } = useSelector((state: RootState) => state.authSlice);
    const { refreshAppointmentReminders } = useReminder({});
    const processedTxnRef = useRef<string | null>(null);
    const [showModal, setShowModal] = useState(open);
    const [patientInfo, setPatientInfo] = useState(patientInfoInitState);
    const [booingDetail, setBookingDetail] = useState<null | TBookingSuccessResponse>(null);
    const [showSuggestions, setShowSuggestion] = useState(false);
    const [allPatients, setAllPatients] = useState<Array<TSuggestedPatientInfo>>([])
    const [patients, setPatients] = useState<Array<TSuggestedPatientInfo>>([])
    const [consultDates, setConsultDates] = useState<Array<TdoctorConsultDate>>([])
    const [consultDate, setConsultDate] = useState<TdoctorConsultDate | null>(null)
    const [group_name, setGroupName] = useState<string>("");
    const [patientExtraInfo, setPatientExtraInfo] = useState<TDoctorDetail["settings"]["patient_info_required"]>(settings.patient_info_required || []);
    const [txnid, setTxnId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [refundAlert, setRefundAlert] = useState(false);
    const [paymentFailed, setPaymentFailed] = useState(false);
    const [txnDetail, setTxnDetail] = useState<{ txnid: string, payment_status: string, order_amount: number, refund_status?: string, refund_order_id?: string } | null>(null);
    const onSelectSuggestedPatient = (patientinfo: TSuggestedPatientInfo) => {
        setShowSuggestion(false);
        setPatientInfo({ ...patientInfo, case_id: patientinfo.id, patient_name: patientinfo.patient_name, patient_mobile: patientinfo.patient_mobile, patient_gender: patientinfo.patient_gender, patient_age: patientinfo.patient_age, patient_address: patientinfo.patient_address, dataFillMode: "autosuggest" })
    }
    const createPaymentOrder = async (payload: any) => {
        const cashfreeInstance = load({
            mode: 'production', // use 'sandbox' or 'production'
        });
        setLoading(true);
        try {
            const { data: paymentrderData } = await httpPost<{
                txnid: string, payment_session_id: string
            }>("/pg/generate-book-appointment-payment-link", {
                ...payload,
                amount: settings.token_amount,
            }, { passSecreateKey: true, passGuserSecreateKey: true })
            cashfreeInstance.then((cf: any) => {
                cf.checkout({
                    paymentSessionId: paymentrderData.payment_session_id,
                    redirectTarget: "_self",
                    returnUrl: "https://careipro.com/" + pageUrl + "?txnid=" + paymentrderData.txnid,
                }).then((res: any) => {
                    console.log("payment success response", res);
                    setLoading(false);
                }).catch((err: any) => {
                    console.log("payment error response", err);
                    setLoading(false);
                })
            })
        } catch (err: any) {
            setLoading(false);
        }
    }
    const bookAppointment = () => {
        if (loading) {
            return; // Prevent multiple submissions
        }
        if (user_info === null) {
            toast.info("Please login to your account")
            return;
        }
        if (settings.show_group_name_while_booking && group_name === "") {
            toast.error("Please select session")
            return;
        }
        if (!patientInfo.patient_name) {
            toast.error("Please enter patient name")
            return;
        }
        if (!patientInfo.patient_mobile) {
            toast.error("Please enter patient contact number")
            return;
        }
        if (patientInfo.patient_mobile && patientInfo.patient_mobile.length != 10) {
            toast.error("Please enter a valid 10-digit mobile number")
            return;
        }
        if (!patientInfo.patient_address) {
            toast.error("Please enter patient address")
            return;
        }
        if (settings.advance_booking_enable && !consultDate) {
            toast.error("Please select consultation date");
            return;
        }
        let extraParams = {};
        if (settings.advance_booking_enable && consultDate) {
            extraParams = { ...extraParams, consult_date: consultDate.date }
        } else if (settings.advance_booking_enable && availability) {
            extraParams = { ...extraParams, consult_date: availability.available_date }
        }
        if (settings.show_group_name_while_booking && group_name) {
            extraParams = { ...extraParams, group_name }
        }
        const bookingPayload = {
            book_by: settings.book_by || "",
            userid: user_info.id,
            servicelocation_id: service_loc_id,
            doctor_id: doctor_id,
            clinic_id: clinic_id,
            patient_name: patientInfo.patient_name,
            patient_mobile: patientInfo.patient_mobile,
            patient_email: "",
            patient_address: patientInfo.patient_address,
            patient_age: patientInfo.patient_age,
            patient_gender: patientInfo.patient_gender,
            case_id: patientInfo.case_id || "",
            patient_extra_info: patientExtraInfo,
            merchant: "careipro",
            device:"mobile_web",
            ...extraParams
        };
        if (settings.payment_type === "partial_payment_while_booking" && settings.token_amount && settings.token_amount > 0) {
            createPaymentOrder(bookingPayload);
            return;
        }
        setLoading(true);
        httpPost<TBookingSuccessResponse>("/book-appointment", bookingPayload, { passSecreateKey: true }).then((data) => {
            toast.success(data.message);
            setBookingDetail(data.data);
            setLoading(false);
            //router.refresh();
        }).catch((err: any) => {
            toast.error(err.message)
            setLoading(false);
        });
    }
    const rebokeAppointment = () => {
        setBookingDetail(null);
        setPatientInfo(patientInfoInitState);
        setTxnId("");
    }
    const onOk = () => {
        setPatientInfo(patientInfoInitState);
        setBookingDetail(null);
        setShowModal(false);
        refreshAppointmentReminders();
    }
    const retryPayment = () => {
        setRefundAlert(false);
        setPaymentFailed(false);
    }
    useEffect(() => {
        if (is_loggedin) {
            if ((user_info?.user_type === "clinic_staff" || user_info?.user_type === "NSCM" || user_info?.user_type === "agency") && patientInfo.patient_mobile.length == 10 && patientInfo.dataFillMode == "form") {
                authenicatedFetchJson<IResponse<Array<TSuggestedPatientInfo>>>(`/user/patientinfo-auto-suggest?clinic_id=${clinic_id}&doctor_id=${doctor_id}&mobile=${patientInfo.patient_mobile}`).then(({ data }) => {
                    setPatients(data)
                    if (data.length) {
                        setShowSuggestion(true);
                    }
                })
            } else if (showSuggestions === true) {
                setShowSuggestion(false)
            }
        }
    }, [patientInfo.patient_mobile])
    useEffect(() => {
        if (is_loggedin && user_info?.user_type === "user" && patientInfo.patient_name.length >= 2 && patientInfo.dataFillMode == "form") {
            let data = allPatients.filter((patient) => {
                if (patient.patient_name.includes(patientInfo.patient_name)) {
                    return true
                } else {
                    return false
                }
            })
            setPatients(data)
            if (data.length) {
                setShowSuggestion(true);
            }
        } else if (showSuggestions === true) {
            setShowSuggestion(false)
        }
    }, [patientInfo.patient_name])
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const txnid = queryParams.get("txnid");
        if (txnid && processedTxnRef.current !== txnid) {
            processedTxnRef.current = txnid; // Mark as processing to prevent duplicates
            setLoading(true);
            // Remove txnid from URL immediately to prevent re-processing on re-render
            router.replace(pageUrl);
            
            httpPost<{
                payment_status: string, order_amount: number, cp_order_id: number,
                refund_status?: string, refund_order_id?: string
            }>("/pg/validate-payment", {
                txnid
            }, {
                passSecreateKey: true,
                passGuserSecreateKey: true
            }).then(({ data }) => {
                if (data.cp_order_id) {
                    setLoading(false);
                    router.replace(pageUrl + "?payment_success=1&booking_id=" + data.cp_order_id);
                    return;
                }
                if (data.refund_status && data.refund_order_id) {
                    toast.error(`Refund process is initiated for this transaction`);
                    setLoading(false);
                    return;
                }
                if (data.payment_status === "PAID") {
                    httpPost<TBookingSuccessResponse>("/book-appointment-by-txnid", {
                        txnid,
                        clinic_id,
                        doctor_id,
                        service_loc_id
                    }, { passSecreateKey: true, passGuserSecreateKey: true }).then((data) => {
                        toast.success(data.message);
                        setBookingDetail(data.data);
                        router.replace(pageUrl + "?payment_success=1&booking_id=" + data.data.booking_id);
                    }).catch((err: any) => {
                        toast.error(err.message)
                        setRefundAlert(true);
                        authenicatedFetchJson<IResponse<{ txnid: string, payment_status: string, order_amount: number, refund_status?: string, refund_order_id?: string }>>("/pg/transaction-detail?txnid=" + encodeURIComponent(txnid) + "&mobile=" + user_info?.mobile + "&order_for=BOOK_APPOINTMENT",).then(({ data }) => {
                            setTxnDetail(data);
                         }).catch(() => { 

                         }).finally(() => { });
                    }).finally(() => {
                        setLoading(false);
                    });
                } else {
                    setLoading(false);
                    setPaymentFailed(true);
                }
            }).catch(() => {
                setLoading(false);
            });
        }
        if (user_info?.user_type === "user") {
            authenicatedFetchJson<IResponse<Array<TSuggestedPatientInfo>>>(`/user/patientinfo-auto-suggest?clinic_id=${clinic_id}&doctor_id=${doctor_id}&patient_name=`).then(({ data }) => {
                setPatients(data)
                setAllPatients(data)
            })
        }
        if (settings.advance_booking_enable) {
            fetchJson<IResponse<Array<TdoctorConsultDate>>>(`/get-consult-dates?clinic_id=${clinic_id}&doctor_id=${doctor_id}&service_loc_id=${service_loc_id}`).then(({ data }) => {
                setConsultDates(data)
                if (data.length > 0) {
                    setConsultDate(data[0])
                }
            })
        }
    }, [])
    return {
        showModal, setShowModal, showSuggestions, setShowSuggestion, onSelectSuggestedPatient, patients,
        patientInfo, setPatientInfo, booingDetail,
        bookAppointment, onOk, rebokeAppointment, consultDates, consultDate, setConsultDate, group_name, setGroupName, patientExtraInfo, setPatientExtraInfo, loading, refundAlert, paymentFailed, retryPayment,txnDetail
    }
}
export default useBooking