'use client'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { BiCheck } from "react-icons/bi";
import { handelBookBtnClick, selectCaretakeSlice } from '@/lib/slices/caretakerSlice';
import { selectAuthSlice } from '@/lib/slices/authSlice';
import { RootState } from '@/lib/store';
import { SlideUpModal, Input, TextArea } from '@/app/components/mobile/ui';
import useEnquiry from '@/lib/hooks/useEnquiry';
const selectFromCaretaker = createSelector([selectCaretakeSlice], (state) => {
    return {
        show: state.show,
        clinic_id: state.clinic_id,
        doctor_id: state.doctor_id,
        specialist_id: state.specialist_id,
        page:state.page,
        section:state.section,
        businessInfo: state.businessInfo
    }
})
const selectFromAuth = createSelector([selectAuthSlice], (state) => {
    return {
        logedin_mobile: state.user_info?.mobile,
        loggedin_name: state.user_info?.firstname + ' ' + state.user_info?.lastname
    }
})
export const SendEnquiryForm = ({ state, city, vertical, message }: { state: string, city: string, message?: string, vertical: string }) => {
    const dispatch = useDispatch();
    const { show, clinic_id, doctor_id, specialist_id,page,section, businessInfo } = useSelector((state: RootState) => selectFromCaretaker(state))
    const { logedin_mobile, loggedin_name } = useSelector((state: RootState) => selectFromAuth(state));
    const { sendEnquiry } = useEnquiry({ state: state, city: city, market_name: "", vaertical: vertical });
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const [booingData, setBookingData] = useState({
        name: '',
        mobile: '',
        message: message
    })
    const onSubmit = () => {
        if (!booingData.name) {
            toast.error("Please enter your name")
            return;
        }
        if (!booingData.mobile) {
            toast.error("please enter contact number")
            return;
        }
        if (booingData.mobile.length !== 10) {
            toast.error("please enter a 10 digit mobile number")
        }
        if (!booingData.message) {
            toast.error("please enter smething about your requirement")
            return
        }
        sendEnquiry({
            name: booingData.name,
            mobile: booingData.mobile || "",
            message: booingData.message,
            clinic_id: clinic_id,
            doctor_id: doctor_id,
            specialist_id: specialist_id,
            page: page,
            section: section
        }, () => {
            setBookingData({ ...booingData, message: "" })
            setShowSuccessScreen(true)
        })
    }
    useEffect(() => {
        if (logedin_mobile) {
            setBookingData((prev) => ({
                ...prev,
                mobile: logedin_mobile,
                name: loggedin_name
            }))
        }
    }, [logedin_mobile])
    return (
        <>
            <SlideUpModal open={show} heading='Book Caretaker' onClose={() => { dispatch(handelBookBtnClick({ show: false, page: "", section: "" })) }}>
                <>
                    {showSuccessScreen ?
                        <div>
                            <div className='flex justify-center'>
                                <div className='h-40 w-40 relative flex justify-center items-center'>
                                    <BiCheck className='text-7xl bg-primary color-white rounded-full' />
                                    <img src="/icon/booking-success.png" className='absolute left-0 top-0 h-full w-full zoomOut delay-2' />
                                </div>
                            </div>
                            <div className='font-bold text-xl text-center'>Thank you</div>
                            <div className='font-semibold text-center fs-15 color-text-light'>Your request has been submitted successfully. Our customer support team will contact you shortly.</div>
                            <div className='flex justify-center'>
                                <button className='button py-2 px-6 one-line ripple' onClick={() => {
                                    dispatch(handelBookBtnClick({ show: false, page: "", section: "" }))
                                }}>Ok</button>
                            </div>
                        </div> :
                        <div className='bg-white p-2'>
                            {businessInfo?.name &&
                                <div className='flex items-center border px-2 py-1 rounded-md gap-2'>
                                    <img src={businessInfo.logo} className='h-12 w-12 rounded-md' />
                                    <span className='fs-15 font-semibold'>{businessInfo.name}</span>
                                </div>
                            }
                            <div className='flex flex-col gap-2'>
                                <Input type="text" lable='Your name' className='border p-2 rounded-md' value={booingData.name} onChange={(e) => { setBookingData({ ...booingData, name: e.target.value }) }} />
                                <Input type="text" lable='Contact no' className='border p-2 rounded-md' value={booingData.mobile} onChange={(e) => { setBookingData({ ...booingData, mobile: e.target.value }) }} />
                                <TextArea lable='Write about your requirement' className='border p-2 rounded-md' value={booingData.message || ""} onChange={(e) => { setBookingData({ ...booingData, message: e.target.value }) }} />
                                <button className='button py-2 one-line ripple' onClick={onSubmit}>Submit</button>
                            </div>
                        </div>
                    }

                </>
            </SlideUpModal>
        </>
    )
}
export default SendEnquiryForm;