'use client'
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { useState } from "react";
import { toast } from "react-toastify";
import { BiCheck } from "react-icons/bi";
import { selectAuthSlice } from '@/lib/slices/authSlice';
import { RootState } from "@/lib/store";
import useEnquiry from "@/lib/hooks/useEnquiry";
import { SlideUpModal, Input } from '@/app/components/mobile/ui';
const selectUserInfo = createSelector([selectAuthSlice], (state) => {
    return {
        isloggedIn: state.is_loggedin,
        name: (state.user_info?.firstname + " " + state.user_info?.lastname).trim(),
        mobile: state.user_info?.mobile
    }
})
/* variant "inline" is the message box that sits in the page, "button" is a single cta
   that opens the same box in a sheet, for use in a sticky action bar */
const SendEnquiry = ({ businessType, state, city, clini_id, doctor_id = 0, variant = "inline", className = "", label = "Send Enquiry", children, modalZIndex = 0, section = "top_enquiry_form", placeholder = "Write your message here..." }: {
    businessType: string, state: string, city: string, clini_id: number, doctor_id?: number,
    variant?: "inline" | "button", className?: string, label?: string, children?: React.ReactNode,
    /* SlideUpModal renders at 10 + 2 + zIndex, so raise this above any sticky bar the
       trigger sits in, otherwise the sheet opens behind it */
    modalZIndex?: number,
    /* tags the row in the enquiry queue, so a complaint can be told apart from an enquiry */
    section?: string,
    placeholder?: string
}) => {
    const { isloggedIn, name, mobile } = useSelector((state: RootState) => selectUserInfo(state))
    const { sendEnquiry } = useEnquiry({ state: state, city: city, market_name: "", vaertical: businessType })
    const [askMobile, setAskMobile] = useState(false)
    const [showForm, setShowForm] = useState(false)
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
            clinic_id: clini_id,
            doctor_id: doctor_id,
            specialist_id: 0,
            page: "detail_page",
            section: section
        }, () => {
            setAskMobile(false);
            setShowSuccessModal(true);
            setMessage("")
        })
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
                clinic_id: clini_id,
                doctor_id: doctor_id,
                specialist_id: 0,
                page: "detail_page",
                section: section
            }, () => {
                setShowSuccessModal(true);
                setMessage("")
            })
        } else {
            setAskMobile(true);
        }
    }
    const messageBox = (
        <textarea className="w-full outline-none border border-color-grey h-12 rounded-md px-2 py-2 fs-14 font-semibold" placeholder={placeholder} value={message} onChange={(e) => { setMessage(e.target.value) }} >
        </textarea>
    );
    return (
        <>
            {variant === "button" ?
                <>
                    <button className={className} onClick={() => { setShowForm(true) }}>
                        {children}{label}
                    </button>
                    <SlideUpModal heading={label} zIndex={modalZIndex} open={showForm} onClose={() => { setShowForm(false) }}>
                        <div className="bg-white p-2 flex flex-col gap-2">
                            {messageBox}
                            <button className="button ripple py-2" type="button" onClick={() => {
                                /* keep the sheet open when handelClick rejects an empty
                                   message, otherwise let the contact or success sheet replace it */
                                if (message) {
                                    setShowForm(false);
                                }
                                handelClick();
                            }}>{label}</button>
                        </div>
                    </SlideUpModal>
                </>
                :
                <div className="px-2 mt-2 flex gap-2">
                    {messageBox}
                    <button className="button ripple w-40" onClick={handelClick}>Send Enquiry</button>
                </div>
            }
            <SlideUpModal heading="Your contact information" zIndex={modalZIndex} open={askMobile} onClose={() => { setAskMobile(false) }}>
                <div className='bg-white p-2'>
                    <div className='flex flex-col gap-2'>
                        <Input type="text" lable='Your name' className='border p-2 rounded-md' value={userInfo.name} onChange={(e) => { setUserInfo({ ...userInfo, name: e.target.value }) }} />
                        <Input type="mobile" lable='Contact no' className='border p-2 rounded-md' value={userInfo.mobile} onChange={(e) => { setUserInfo({ ...userInfo, mobile: e.target.value }) }} />
                        <button className='button py-2 one-line ripple' onClick={onSubmit}>Submit</button>
                    </div>
                </div>
            </SlideUpModal>
            <SlideUpModal open={showSuccessModal} zIndex={modalZIndex} onClose={() => { setShowSuccessModal(false) }}>
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