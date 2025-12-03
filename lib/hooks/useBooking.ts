'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux";
import { toast } from 'react-toastify'
import { httpPost, authenicatedFetchJson, fetchJson } from "@/lib/services/http-client";
import { RootState } from '@/lib/store';
import useReminder from '@/lib/hooks/useReminder';
import { IResponse } from "../services/http-server";
import {TDoctorDetail,TDoctorvailableData} from '@/lib/types/doctor';
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
const useBooking = ({ service_loc_id, doctor_id, clinic_id, open,settings,availability }: { service_loc_id: number, doctor_id: number, clinic_id: number, open: boolean, settings: TDoctorDetail['settings'],availability?:TDoctorvailableData }) => {
    const router=useRouter();
    const { is_loggedin, user_info } = useSelector((state: RootState) => state.authSlice);
    const { refreshAppointmentReminders } = useReminder({});
    const [showModal, setShowModal] = useState(open);
    const [patientInfo, setPatientInfo] = useState(patientInfoInitState);
    const [booingDetail, setBookingDetail] = useState<null | TBookingSuccessResponse>(null)
    const [showSuggestions, setShowSuggestion] = useState(false);
    const [allPatients, setAllPatients] = useState<Array<TSuggestedPatientInfo>>([])
    const [patients, setPatients] = useState<Array<TSuggestedPatientInfo>>([])
    const [consultDates,setConsultDates]=useState<Array<TdoctorConsultDate>>([])
    const [consultDate,setConsultDate]=useState<TdoctorConsultDate | null>(null)
    const [group_name,setGroupName]=useState<string>("");
    const [patientExtraInfo, setPatientExtraInfo] = useState<TDoctorDetail["settings"]["patient_info_required"]>(settings.patient_info_required || []);

    const onSelectSuggestedPatient = (patientinfo: TSuggestedPatientInfo) => {
        setShowSuggestion(false);
        setPatientInfo({ ...patientInfo, case_id: patientinfo.id, patient_name: patientinfo.patient_name, patient_mobile:patientinfo.patient_mobile,patient_gender: patientinfo.patient_gender, patient_age: patientinfo.patient_age, patient_address: patientinfo.patient_address,dataFillMode:"autosuggest" })
    }
    const bookAppointment = () => {
        if (user_info === null) {
            toast.info("Please login to your account")
            return;
        }
        if(settings.show_group_name_while_booking && group_name===""){
            toast.error("Please select session")
            return;
        }
        let extraParams={};
        if(settings.advance_booking_enable && consultDate){
            extraParams={...extraParams, consult_date:consultDate.date}
        }else if(settings.advance_booking_enable && availability){
            extraParams={...extraParams, consult_date:availability.available_date}
        }
        if(settings.show_group_name_while_booking && group_name){
            extraParams={...extraParams, group_name}
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
            case_id: patientInfo.case_id || "",
            patient_extra_info:patientExtraInfo,
            ...extraParams
        }, { passSecreateKey: true }).then((data) => {
            toast.success(data.message);
            setBookingDetail(data.data);
            //router.refresh();
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
        if(settings.advance_booking_enable){
            fetchJson<IResponse<Array<TdoctorConsultDate>>>(`/get-consult-dates?clinic_id=${clinic_id}&doctor_id=${doctor_id}&service_loc_id=${service_loc_id}`).then(({data})=>{
                setConsultDates(data)
                if(data.length>0){
                    setConsultDate(data[0])
                }
            })
        }
    },[])
    return {
        showModal, setShowModal, showSuggestions, setShowSuggestion, onSelectSuggestedPatient, patients,
        patientInfo, setPatientInfo, booingDetail,
        bookAppointment, onOk,consultDates,consultDate,setConsultDate,group_name,setGroupName,patientExtraInfo, setPatientExtraInfo
    }
}
export default useBooking