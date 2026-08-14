'use client'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { BiCheckCircle, BiSend, BiSupport } from "react-icons/bi";
import { RootState } from "@/lib/store";
import { selectAuthSlice } from "@/lib/slices/authSlice";
import useEnquiry from "@/lib/hooks/useEnquiry";
import { SlideUpModal, Input } from "@/app/components/mobile/ui";
const selectUserInfo = createSelector([selectAuthSlice], (state) => {
    return {
        isloggedIn: state.is_loggedin,
        name: (state.user_info?.firstname + " " + state.user_info?.lastname).trim(),
        mobile: state.user_info?.mobile
    }
})
type THelpMeChooseProps = {
    state: string,
    city: string,
    vertical: string,
    page: string,
    section?: string,
    //sticky pins the card to the bottom of the screen, use inline where the bottom is already occupied
    position?: "sticky" | "inline",
    heading?: string,
    subText?: string,
    buttonLabel?: string,
    modalHeading?: string,
    modalSubText?: string,
    inputLabel?: string,
    placeholder?: string,
    successMessage?: string,
    specialist_id?: number,
    clinic_id?: number,
    doctor_id?: number
}
const HelpMeChoose = ({
    state,
    city,
    vertical,
    page,
    section = "help_me_choose",
    position = "sticky",
    heading = "Confused whom to consult?",
    subText = "",
    buttonLabel = "Get Help",
    modalHeading = "Help me find the right doctor",
    modalSubText = "Share your problem and contact details, our team will call you and suggest the right doctor as per your requirement.",
    inputLabel = "Your problem or requirement",
    placeholder = "E.g. Knee pain since 2 months, need home visit",
    successMessage = "Our team will call you shortly to suggest the right doctor.",
    specialist_id = 0,
    clinic_id = 0,
    doctor_id = 0
}: THelpMeChooseProps) => {
    const { isloggedIn, name, mobile } = useSelector((state: RootState) => selectUserInfo(state));
    const { sendEnquiry } = useEnquiry({ state: state, city: city, vaertical: vertical });
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);
    const [message, setMessage] = useState("");
    const [userInfo, setUserInfo] = useState({ name: "", mobile: "" });
    const [submitted, setSubmitted] = useState(false);
    const onSendEnquiry = () => {
        if (!message.trim()) {
            toast.error("Please write about your problem or requirement");
            return;
        }
        sendEnquiry({
            name: userInfo.name,
            mobile: userInfo.mobile,
            message: message,
            clinic_id: clinic_id,
            doctor_id: doctor_id,
            specialist_id: specialist_id,
            page: page,
            section: section
        }, () => {
            setMessage("");
            setShowEnquiryForm(false);
            setSubmitted(true);
        })
    }
    useEffect(() => {
        if (isloggedIn && mobile) {
            setUserInfo({ name: name, mobile: mobile })
        }
    }, [isloggedIn, name, mobile])
    const card = (
        <>
            {submitted ?
                <div className="flex items-center gap-2 py-1">
                    <BiCheckCircle className="color-primary text-3xl shrink-0" />
                    <span className="flex flex-col leading-5">
                        <b>Thank you, we have received your request</b>
                        <span className="text-sm text-gray-600">{successMessage}</span>
                    </span>
                </div> :
                <div className="flex items-center gap-2">
                    <span className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shrink-0">
                        <BiSupport className="text-white text-lg" />
                    </span>
                    <span className="flex flex-col leading-5 min-w-0">
                        <b className="fs-16">{heading}</b>
                        {subText && <span className="text-sm text-gray-600 leading-4">{subText}</span>}
                    </span>
                    <button className="button ripple shrink-0 ml-auto" onClick={() => { setShowEnquiryForm(true) }}>{buttonLabel}</button>
                </div>
            }
        </>
    )
    return (
        <>
            {position === "sticky" ?
                <>
                    {/* keeps the last section reachable above the sticky card */}
                    <div className="h-24" />
                    {/* stays under the slide up modal overlay, which starts at z-index 10 */}
                    <div className="fixed bottom-0 left-0 right-0 border-t shadow-lg px-2 py-2 bg-cyan-50" style={{ zIndex: 9 }}>
                        {card}
                    </div>
                </> :
                <div className="border rounded-md mx-2 my-2 px-2 py-2 bg-cyan-50">
                    {card}
                </div>
            }
            <SlideUpModal open={showEnquiryForm} heading={modalHeading} onClose={() => { setShowEnquiryForm(false) }}>
                <div className="flex flex-col gap-2 pb-3">
                    <span className="text-sm text-gray-600 leading-4">{modalSubText}</span>
                    <div>
                        <span className="flex font-semibold fs-15">{inputLabel}</span>
                        <textarea
                            className="w-full outline-none border border-color-grey rounded-md h-20 px-2 py-1 mt-1 fs-14 font-semibold"
                            placeholder={placeholder}
                            value={message}
                            onChange={(e) => { setMessage(e.target.value) }}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Input type="text" lable="Your name" className="border p-2 rounded-md" value={userInfo.name} onChange={(e) => { setUserInfo({ ...userInfo, name: e.target.value }) }} />
                        <Input type="mobile" lable="Your Contact No" className="border p-2 rounded-md" value={userInfo.mobile} onChange={(e) => { setUserInfo({ ...userInfo, mobile: e.target.value }) }} />
                    </div>
                    <button className="button ripple mt-2 gap-2" onClick={onSendEnquiry}>
                        <BiSend />Send Enquiry
                    </button>
                </div>
            </SlideUpModal>
        </>
    )
}
export default HelpMeChoose;
