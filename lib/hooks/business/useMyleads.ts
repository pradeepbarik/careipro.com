'use client'
import { useEffect, useState } from "react";
import {toast} from 'react-toastify';
import {fetchLeads,TLead} from '@/lib/hooks/useClientSideApiCall';
import {httpPost} from '@/lib/services/http-client';
import useMystaffs from '@/lib/hooks/business/useMystaff';
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
const useMyLeads=()=>{
    const {user_info}=useSelector((state:RootState)=>state.authSlice);
    const { staffsObj } = useMystaffs({ loadStaffListObj: true });
    const [leads,setLeads]=useState<TLead[]>([]);
    const [filter,setFilter]=useState({status:"requested"});
    const [showAcceptmodal,setShowAcceptModal]=useState(false);
    const [showAssignDoctorModal,setShowAssignDoctorModal]=useState(false);
    const [acceptingLeadData,setAcceptingLeadData]=useState<TLead|null>(null);
    const [acceptingLeadPos,setAcceptingLeadPos]=useState<number>(0);
    const getLeadList=()=>{
        fetchLeads({vertical:user_info?.business_type||"",status:filter.status}).then(({data})=>{
            setLeads(data);
        });
    }
    const onAcceptLeadBtnClick=(leadData:TLead,index:number)=>{
        setAcceptingLeadData(leadData);
        setAcceptingLeadPos(index)
        setShowAcceptModal(true);
    }
    const assignDoctorBtnClick=(leadData:TLead|null,index:number)=>{
        if(leadData){
            setAcceptingLeadData(leadData);
        }
        setAcceptingLeadPos(index)
        setShowAssignDoctorModal(true)
    }
    const acceptLead=(doctor_id:number=0)=>{
        httpPost("/user/business/accept-lead",{
            lead_id:acceptingLeadData?.id,
            vertical:acceptingLeadData?.vertical,
            doctor_id:doctor_id
        },{passSecreateKey:true}).then(({data,message})=>{
            toast.success(message)
            setLeads(leads.filter((lead)=>{
                if(lead.id!==acceptingLeadData?.id){
                    return true;
                }
            }))
            setShowAcceptModal(false);
            setAcceptingLeadData(null);
            setShowAssignDoctorModal(false)
        })
    }
    const assignStaff=(staff_id:number)=>{
        if(acceptingLeadData?.status==="requested"){
            acceptLead(staff_id)
            return;
        }
        httpPost("/user/business/assign-staff",{
            lead_id:acceptingLeadData?.id,
            doctor_id:staff_id,
            vertical:acceptingLeadData?.vertical,
            booking_id:acceptingLeadData?.appointment_booking_id
        },{passSecreateKey:true}).then(({data,message})=>{
            setShowAssignDoctorModal(false);
            toast.success(message)
            let newLeads=[...leads];
            newLeads[acceptingLeadPos].doctor_id=staff_id;
            setLeads(newLeads)
        })
    }
    useEffect(()=>{
        getLeadList();
    },[filter.status])
    return {
        filter,setFilter,
        leads,acceptingLeadData,showAcceptmodal,setShowAcceptModal,onAcceptLeadBtnClick,acceptLead,
        showAssignDoctorModal,setShowAssignDoctorModal,assignDoctorBtnClick,staffsObj,assignStaff
    }
}
export default useMyLeads;