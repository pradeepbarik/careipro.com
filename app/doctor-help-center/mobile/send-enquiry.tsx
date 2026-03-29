'use client';
import { SlideUpModal, TextArea } from "@/app/components/mobile/ui";
import { selectAuthSlice } from "@/lib/slices/authSlice";
import { createSelector } from "@reduxjs/toolkit/react";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import useEnquiry from "@/lib/hooks/useEnquiry";
import { useState } from "react";
import { BiCheck } from "react-icons/bi";
import Input from "@/app/components/mobile/ui/input";
import { toast } from "react-toastify";
const selectUserInfo = createSelector([selectAuthSlice], (state) => {
    return {
        isloggedIn: state.is_loggedin,
        name: (state.user_info?.firstname + " " + state.user_info?.lastname).trim(),
        mobile: state.user_info?.mobile
    }
})
const SendEnquiry = ({ state, city, businessType, clinic_id, doctor_id = 0 }: { state: any, city: string, businessType: string, clinic_id: number, doctor_id?: number }) => {
    const { isloggedIn, name, mobile } = useSelector((state: RootState) => selectUserInfo(state))
    const { sendEnquiry } = useEnquiry({ state: state, city: city, market_name: "", vaertical: businessType })
    const [askMobile, setAskMobile] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [message, setMessage] = useState("");
    const [userInfo, setUserInfo] = useState({ name: "", mobile: "" })
     const onSubmit = () => {
            if (!userInfo.name) {
                toast.error("Please enter your name")
                return;
            }
            if (!userInfo.mobile) {
                toast.error("please enter contact number")
                return;
            }
            if (userInfo.mobile.length !== 10) {
                toast.error("please enter a 10 digit mobile number")
            }
            if (!message) {
                toast.error("please enter smething about your requirement")
                return
            }
            sendEnquiry({
                message: message,
                name: userInfo.name,
                mobile: userInfo.mobile,
                clinic_id: clinic_id,
                doctor_id: doctor_id,
                specialist_id: 0,
                page: "doctor_help_center_page",
                section: "enquiry_form"
            }, () => {
                setAskMobile(false);
                setShowSuccessModal(true);
                setMessage("")
                toast.success("Your query has been submitted successfully")
            },{showSuccessAlert:false})
        }
        const handelClick = () => {
            if (!message) {
                toast.error("please enter smething about your requirement")
                return
            }
            if (isloggedIn) {
                sendEnquiry({
                    message: message,
                    name: name,
                    mobile: mobile || "",
                    clinic_id: clinic_id,
                    doctor_id: doctor_id,
                    specialist_id: 0,
                    page: "doctor_help_center_page",
                    section: "enquiry_form"
                }, () => {
                    setShowSuccessModal(true);
                    setMessage("")
                    toast.success("Your query has been submitted successfully")
                },{showSuccessAlert:false})
            } else {
                setAskMobile(true);
            }
        }
    return (
        <>
            <div className="mb-8 rounded-md border p-2 shadow-md bg-red-50">
                <h2 className="text-lg font-semibold mb-3">Send your query or concern </h2>
                <TextArea value={message} onChange={(e) => setMessage(e.target.value)} lable="" placeholder="Write your query..." />
                <button className="button w-full bg-teal-500" onClick={handelClick}>
                    Submit Enquiry
                </button>
            </div>
            <SlideUpModal heading="Your contact information" open={askMobile} onClose={() => { setAskMobile(false) }}>
                <div className='bg-white p-2'>
                    <div className='flex flex-col gap-2'>
                        <Input type="text" lable='Your name' className='border p-2 rounded-md' value={userInfo.name} onChange={(e) => { setUserInfo({ ...userInfo, name: e.target.value }) }} />
                        <Input type="mobile" lable='Contact no' className='border p-2 rounded-md' value={userInfo.mobile} onChange={(e) => { setUserInfo({ ...userInfo, mobile: e.target.value }) }} />
                        <button className='button py-2 one-line ripple' onClick={onSubmit}>Submit</button>
                    </div>
                </div>
            </SlideUpModal>
            <SlideUpModal open={showSuccessModal} onClose={() => { setShowSuccessModal(false) }}>
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
                            setShowSuccessModal(false)
                        }}>Ok</button>
                    </div>
                </div>
            </SlideUpModal>
        </>
    )
}
export default SendEnquiry;