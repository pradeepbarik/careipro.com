'use client'
import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {RootState} from '@/lib/store';
import {setAppointmentReminders,TAppointment} from '@/lib/slices/reminderSlice';
import {getUpcomingBookingList, Tappointment} from '@/lib/services/apicalls';
const filterAppointments=(data:TAppointment[],params:{doctor_id?:number,clinic_id?:number})=>{
    if(!params.doctor_id && !params.clinic_id){
        return data;
    }
    return data.filter((appointment)=>{
        if(params.doctor_id && params.clinic_id && appointment.clinic_id==params.clinic_id && appointment.doctor_id==params.doctor_id){
            return true;
        }else if(params.doctor_id && !params.clinic_id && appointment.doctor_id==params.doctor_id){
            return true;
        }else if(!params.doctor_id && params.clinic_id && appointment.clinic_id==params.clinic_id){
            return true;
        }
        return false
    })
}
const useReminder=({doctor_id,clinic_id}:{doctor_id?:number,clinic_id?:number})=>{
    const dispatch=useDispatch();
    const [isBrowser, setIsBrowser] = useState(false);
    const {is_loggedin,user_info,appoinments,appointmentsFetched}=useSelector((state:RootState)=>{
        return {
            is_loggedin:state.authSlice.is_loggedin,
            user_info:state.authSlice.user_info,
            appointmentsFetched:state.reminderSlice.appointmentsFetched,
            appoinments:state.reminderSlice.appoinments
        }
    })
    const refreshAppointmentReminders=()=>{
        getUpcomingBookingList<TAppointment[]>().then(({data})=>{
            dispatch(setAppointmentReminders(data))
        });
    }
    useEffect(() => {
        setIsBrowser(true);
    }, []);
    useEffect(()=>{
        if(is_loggedin && (user_info && user_info.user_type==="user" || 1==1) && appointmentsFetched===false){
            refreshAppointmentReminders();
        }
    },[is_loggedin])

    return {
        isBrowser,is_loggedin,user_type:user_info?.user_type,
        appoinments:filterAppointments(appoinments,{doctor_id:doctor_id,clinic_id:clinic_id}),
        refreshAppointmentReminders
    }
}
export default useReminder;