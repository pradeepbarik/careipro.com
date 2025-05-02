'use client'
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { TSelectedAddress } from "@/lib/types";
import { addStaffSubmit, fetchStaffsList, TStaff } from '@/lib/hooks/useClientSideApiCall';
type TStaffInfo = {
    first_name: string,
    last_name: string,
    mobile_no: string,
    position: string,
    age: number | "",
    year_of_exp: number | "",
    gender: string,
    state: string,
    city: string,
    sub_dist: string,
    area: string,
    landmark: string
}
const initialStaffInfo: TStaffInfo = {
    first_name: "",
    last_name: "",
    mobile_no: "",
    position: "",
    age: "",
    year_of_exp: "",
    gender: "",
    state: "",
    city: "",
    sub_dist: "",
    area: "",
    landmark: ""
}
const useMystaffs = ({ loadStaffList, loadStaffListObj }: { loadStaffList?: boolean, loadStaffListObj?: boolean }) => {
    const [staffs, setStaffs] = useState<TStaff[]>([]);
    const [staffsObj, setStaffsObj] = useState<{ [key: number]: TStaff }>({})
    const [openAddNewStaffModal, setOpenAddNewStaffModal] = useState(false);
    const [addStaffStep, setAddStaffStep] = useState(1);
    const [staffInfo, setStaffInfo] = useState<TStaffInfo>(initialStaffInfo);
    const isValid = (step: number): boolean => {
        if (step === 1) {
            if (!staffInfo.first_name) {
                toast.error("Please enter staff name")
                return false;
            }
            if (!staffInfo.mobile_no) {
                toast.error("Please enter staff mobile no")
                return false;
            }
            if(!staffInfo.position){
                toast.error("Please enter job title for staff")
                return false;
            }
            if (!staffInfo.age) {
                toast.error("Please enter age")
                return false;
            }
            if (!staffInfo.gender) {
                toast.error("Please select gender")
                return false;
            }
        }
        return true;
    }
    const addNewStaff = (address:TSelectedAddress,cb:()=>void) => {
        if (!staffInfo.first_name) {
            toast.error("Please enter staff name")
            return;
        }
        if (!staffInfo.mobile_no) {
            toast.error("Please enter staff mobile no")
            return;
        }
        if (!staffInfo.age) {
            toast.error("Please enter age")
            return;
        }
        if (!staffInfo.gender) {
            toast.error("Please choose gender")
            return;
        }
        if (!address) {
            toast.error("Please Provide staff address")
            return;
        }
        addStaffSubmit({
            ...staffInfo,
            state: address.state,
            city: address.city,
            sub_dist: address.sub_dist,
            area: address.area,
            landmark: address.landmark
        }).then(({ data }) => {
            toast.success("Staff added successfully");
            setOpenAddNewStaffModal(false);
            cb();
            setStaffInfo(initialStaffInfo);
            setAddStaffStep(1);
        }).catch((err) => {
            toast.error(err.message)
        })
    }
    const refreshStaffsList = () => {
        fetchStaffsList().then(({ data }) => {
            setStaffs(data)
        })
    }
    useEffect(() => {
        if (loadStaffList) {
            refreshStaffsList();
        }
        if (loadStaffListObj) {
            fetchStaffsList().then(({ data }) => {
                let staffsobj: { [id: number]: TStaff } = {}
                for (let staff of data) {
                    staffsobj[staff.id] = staff
                }
                setStaffsObj(staffsobj);
            })
        }
    }, [])
    return {
        openAddNewStaffModal, setOpenAddNewStaffModal, isValid, addStaffStep, setAddStaffStep, staffInfo, setStaffInfo, addNewStaff, staffs, refreshStaffsList, staffsObj
    }
}
export default useMystaffs;