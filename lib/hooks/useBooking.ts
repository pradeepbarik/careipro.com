'use client'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify'
import { httpPost, authenicatedFetchJson } from "@/lib/services/http-client";
import { RootState } from '@/lib/store';
import useReminder from '@/lib/hooks/useReminder';
import { IResponse } from "../services/http-server";
type TBookingSuccessResponse = {
    booking_date: string,
    booking_id: number,
    consult_date: string,
    today_booking_id: string
}
type TSuggestedPatientInfo = { id: number, patient_name: string, patient_mobile: string, patient_gender: string, patient_age: string, patient_address: string };
const patientInfoInitState = { case_id: 0, patient_name: "", patient_mobile: "", patient_address: "", patient_age: "", patient_gender: "", dataFillMode: "form" };
const useBooking = ({ service_loc_id, doctor_id, clinic_id, open }: { service_loc_id: number, doctor_id: number, clinic_id: number, open: boolean }) => {
    const { is_loggedin, user_info } = useSelector((state: RootState) => state.authSlice);
    const { refreshAppointmentReminders } = useReminder({});
    const [showModal, setShowModal] = useState(open);
    const [patientInfo, setPatientInfo] = useState(patientInfoInitState);
    const [booingDetail, setBookingDetail] = useState<null | TBookingSuccessResponse>(null)
    const [showSuggestions, setShowSuggestion] = useState(false);
    const [allPatients, setAllPatients] = useState<Array<TSuggestedPatientInfo>>([])
    const [patients, setPatients] = useState<Array<TSuggestedPatientInfo>>([])
    const onSelectSuggestedPatient = (patientinfo: TSuggestedPatientInfo) => {
        setShowSuggestion(false);
        setPatientInfo({ ...patientInfo, case_id: patientinfo.id, patient_name: patientinfo.patient_name, patient_mobile:patientinfo.patient_mobile,patient_gender: patientinfo.patient_gender, patient_age: patientinfo.patient_age, patient_address: patientinfo.patient_address,dataFillMode:"autosuggest" })
    }
    const bookAppointment = () => {
        if (user_info === null) {
            toast.info("Please login to your account")
            return;
        }
        httpPost<TBookingSuccessResponse>("/book-appointment", {
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
            case_id: patientInfo.case_id || ""
        }, { passSecreateKey: true }).then((data) => {
            toast.success(data.message);
            setBookingDetail(data.data);
        }).catch((err: any) => {
            toast.error(err.message)
        });
    }
    const onOk = () => {
        setPatientInfo(patientInfoInitState);
        setBookingDetail(null);
        setShowModal(false);
        refreshAppointmentReminders();
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
        if (is_loggedin && user_info?.user_type === "user" && patientInfo.patient_name.length >=2 && patientInfo.dataFillMode == "form") {
            let data=allPatients.filter((patient)=>{
                if(patient.patient_name.includes(patientInfo.patient_name)){
                    return true
                }else{
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
    useEffect(()=>{
        if(user_info?.user_type==="user"){
            authenicatedFetchJson<IResponse<Array<TSuggestedPatientInfo>>>(`/user/patientinfo-auto-suggest?clinic_id=${clinic_id}&doctor_id=${doctor_id}&patient_name=`).then(({ data }) => {
                setPatients(data)
                setAllPatients(data)
            })
        }
    },[])
    return {
        showModal, setShowModal, showSuggestions, setShowSuggestion, onSelectSuggestedPatient, patients,
        patientInfo, setPatientInfo, booingDetail,
        bookAppointment, onOk
    }
}
export default useBooking