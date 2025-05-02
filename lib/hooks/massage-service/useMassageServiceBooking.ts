'use client'
import { toast } from 'react-toastify';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TCategory } from '@/lib/hooks/massage-service/useMassageService';
import { showBookingModal } from '@/lib/slices/massageServiceSlice';
import { RootState } from '@/lib/store';
import { get_current_datetime } from '@/lib/helper/date-time';
import { TSelectedAddress } from '@/lib/types';
import { bookmarkedAddressList, TBookmarkedAddress } from '@/lib/hooks/useClientSideApiCall';
import { httpPost } from '@/lib/services/http-client';
type PatientInfo = {
    patient_name: string;
    patient_mobile: string;
    patient_age: string;
    patient_gender: string;
    patient_address: string;
    state: string,
    city: string,
    sub_dist: string,
    landmark: string,
    comment: string
};

type ServiceDateTime = {
    date: string;
    time: string;
};
const patientInfoInitState: PatientInfo = { patient_name: "", patient_mobile: "", patient_age: "", patient_gender: "", patient_address: "", state: "", city: "", sub_dist: "", landmark: "", comment: "" };
const working_hours = [
    { label: "08:00 AM", value: "08:00 AM" },
    { label: "08:30 AM", value: "08:30 AM" },
    { label: "09:00 AM", value: "09:00 AM" },
    { label: "09:30 AM", value: "09:30 AM" },
    { label: "10:00 AM", value: "10:00 AM" },
    { label: "10:30 AM", value: "10:30 AM" },
    { label: "11:00 AM", value: "11:00 AM" },
    { label: "11:30 AM", value: "11:30 AM" },
    { label: "12:00 PM", value: "12:00 PM" },
    { label: "12:30 PM", value: "12:30 PM" },
    { label: "01:00 PM", value: "01:00 PM" },
    { label: "01:30 PM", value: "01:30 PM" },
    { label: "05:00 PM", value: "05:00 PM" },
    { label: "05:30 PM", value: "05:30 PM" },
    { label: "06:00 PM", value: "06:00 PM" },
    { label: "06:30 PM", value: "06:30 PM" },
    { label: "07:00 PM", value: "07:00 PM" },
    { label: "07:30 PM", value: "07:30 PM" },
    { label: "08:00 PM", value: "08:00 PM" },
    { label: "08:30 PM", value: "08:30 PM" },
];
const generateSlots = (startDate: string, days: number) => {
    const slots: Record<string, Array<{ label: string, value: string }>> = {};
    const now = new Date(); // Current date and time
    now.setHours(now.getHours() + 1)
    const today = new Date(now); // Clone `now` to create a clean object
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00.000 for today

    const start = new Date(startDate);

    for (let i = 0; i < days; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);

        const formattedDate = date.toISOString().split("T")[0];
        if (date < today) {
            // Skip past dates
            continue;
        }

        // If the current date is being processed, filter out past times
        if (formattedDate === now.toISOString().split("T")[0]) {
            const futureHours = working_hours.filter((slot) => {
                const [hour, minute, period] = slot.value.split(/[: ]/);
                const slotDate = new Date(date);
                slotDate.setHours(
                    period === "PM" && hour !== "12" ? +hour + 12 : +hour,
                    +minute,
                    0,
                    0
                );
                return slotDate >= now;
            });

            if (futureHours.length > 0) {
                slots[formattedDate] = futureHours;
            }
        } else {
            slots[formattedDate] = working_hours;
        }
    }

    return slots;
};
const today = get_current_datetime(true);
const useMassageServiceBooking = () => {
    const dispatch = useDispatch();
    const { openBookingModal, is_loggedin,bookCategory } = useSelector((state: RootState) => {
        return {
            is_loggedin: state.authSlice.is_loggedin,
            openBookingModal: state.massageServiceSlice.openBookingModal,
            bookCategory:state.massageServiceSlice.bookCategory
        }
    })
    const [step, setStep] = useState(1);
    const [showAddressModal, setShowAddressModal] = useState(false)
    const Slots = useMemo(() => generateSlots(today, 4), []);
    const [patientInfo, setPatientInfo] = useState<PatientInfo>(patientInfoInitState);
    const [serviceDateTime, setServiceDateTime] = useState<ServiceDateTime>({ date: today, time: "" });
    const [savedAddress, setSavedAddress] = useState<Array<TBookmarkedAddress>>([]);
    const [selectedAddress, setSelectedAddress] = useState<TBookmarkedAddress | null>(null);
    const [bookingDetail,setBookingDetail] = useState<{reqId:number}|null>(null);
    const onAddAddress = (address: TSelectedAddress) => {
        setShowAddressModal(false)
    }
    const onCompletePatientInfo=()=>{
        if(!patientInfo.patient_name){
            toast.error("Please enter name");
            return;
        }
        if(!patientInfo.patient_mobile){
            toast.error("Please enter Contact number");
            return;
        }
        if(patientInfo.patient_mobile.length!==10){
            toast.error("Please enter 10 digit mobile number");
            return;
        }
        if(!patientInfo.patient_gender){
            toast.error("Please select gender");
            return;
        }
        if(!patientInfo.patient_age){
            toast.error("Please enter age");
            return;
        }
        setStep(3)
        if (savedAddress.length === 0) {
            setShowAddressModal(true)
        }
    }
    const closeBookingModal = useCallback(() => {
        dispatch(showBookingModal(null));
    }, [])
    const bookService = () => {
        httpPost<{reqId:number}>("/book-appointment-request", {
            patient_name: patientInfo.patient_name,
            patient_contactno:patientInfo.patient_mobile,
            cat_id:bookCategory?.id,
            vertical:"RELAXATION",
            patient_address:selectedAddress?.full_address,
            state: selectedAddress?.state,
            city: selectedAddress?.city,
            sub_dist: selectedAddress?.sub_dist,
            area: selectedAddress?.area,
            landmark: selectedAddress?.landmark,
            appointment_time:serviceDateTime.date+" "+serviceDateTime.time,
            comment:patientInfo.comment,
            patient_age:patientInfo.patient_age,
            patient_gender:patientInfo.patient_gender
        }, { passSecreateKey: true }).then((data) => {
            toast.success(data.message);
            setBookingDetail(data.data);
        }).catch((err: any) => {
            toast.error(err.message)
        });
    }
    const bookingCompleted=()=>{
        closeBookingModal();
        setStep(1);
        setPatientInfo(patientInfoInitState);
        setSelectedAddress(null);
        setBookingDetail(null);
        setServiceDateTime({ date: today, time: "" });
    }
    useEffect(() => {
        if (showAddressModal === false && step > 1) {
            bookmarkedAddressList().then(({ data }) => {
                let addreses = data.filter((addr) => {
                    if (addr.address_selection_mode === "manual" || addr.address_selection_mode === "pincode" || addr.address_selection_mode === "map") {
                        return true;
                    }
                })
                setSavedAddress(addreses)
            });
        }
    }, [showAddressModal, step])
    return {
        step, setStep,onCompletePatientInfo,
        is_loggedin,
        openBookingModal,
        closeBookingModal,
        showAddressModal,
        setShowAddressModal,
        patientInfo,
        serviceDateTime,
        setServiceDateTime,
        setPatientInfo,
        Slots,
        onAddAddress,
        savedAddress,
        selectedAddress,
        setSelectedAddress,
        bookService,
        bookingDetail,
        bookingCompleted
    }
}
export default useMassageServiceBooking;