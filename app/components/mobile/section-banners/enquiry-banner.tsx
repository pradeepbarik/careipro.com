'use client'

import { useEffect, useState } from "react";
import { BiPhoneOutgoing } from "react-icons/bi";
import { SlideUpModal } from "../ui";
import { TSectionBanner } from "@/lib/types/home-page";
import Input from "../ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { createSelector } from "@reduxjs/toolkit";
import { selectAuthSlice } from "@/lib/slices/authSlice";
import useEnquiry from "@/lib/hooks/useEnquiry";
const selectUserInfo = createSelector([selectAuthSlice], (state) => {
    return {
        isloggedIn: state.is_loggedin,
        name: (state.user_info?.firstname + " " + state.user_info?.lastname).trim(),
        mobile: state.user_info?.mobile
    }
})
const EnquiryBanner = ({ banner }: { banner: TSectionBanner }) => {
    const { isloggedIn, name, mobile } = useSelector((state: RootState) => selectUserInfo(state))
    const { sendEnquiry } = useEnquiry({ state: banner.enquiry_data?.state || "", city: banner.enquiry_data?.city || "", vaertical: banner.enquiry_data?.vertical || "" });
    const [show, setShow] = useState(false)
    const [userInfo, setUserInfo] = useState({ name: "", mobile: "" })
    const [message, setMessage] = useState("");
    const onSendEnquiry = () => {
        sendEnquiry({
            name: userInfo.name,
            mobile: userInfo.mobile,
            message: message,
            clinic_id: banner.enquiry_data?.clinic_id || 0,
            doctor_id: banner.enquiry_data?.doctor_id || 0,
            specialist_id: banner?.enquiry_data?.specialist_id || 0,
            page: banner.enquiry_data?.page || "",
            section: banner.enquiry_data?.section || ""
        }, () => {
            setMessage("");
            setShow(false);
        });
    }
    useEffect(() => {
        if (isloggedIn && mobile) {
            setUserInfo({ name: name, mobile: mobile })
        }
    }, [isloggedIn, mobile])
    return (
        <>
            <img src={banner.img_url} alt={banner.alt_text} className="flex rounded-md shrink-0 basis-0" style={{ height: "100%", width: "100%" }} onClick={() => { setShow(true) }} />
            <SlideUpModal open={show} onClose={() => { setShow(false) }} heading="Send Enquiry">
                <>
                    <div>
                        <Input type="text" lable='Your name' className='border p-2 rounded-md' value={userInfo.name} onChange={(e) => { setUserInfo({ ...userInfo, name: e.target.value }) }} />
                        <Input type="mobile" lable='Contact no' className='border p-2 rounded-md' value={userInfo.mobile} onChange={(e) => { setUserInfo({ ...userInfo, mobile: e.target.value }) }} />
                    </div>
                    <div className="mt-3">
                        <textarea className="w-full outline-none border border-color-grey h-12 rounded-md px-2 py-2 fs-14 font-semibold" placeholder="Write your message here..." value={message} onChange={(e) => { setMessage(e.target.value) }} >
                        </textarea>
                    </div>
                    <div className="flex gap-4 py-3">
                        {banner.enquiry_data?.contact_no && <a href={`tel:${banner.enquiry_data.contact_no}`} className="button grow" data-color="secondary" data-variant="outlined">Call Now <BiPhoneOutgoing /></a>}
                        <button className="button grow" onClick={onSendEnquiry}>Send Enquiry</button>
                    </div>
                </>
            </SlideUpModal>
        </>
    )
}
export default EnquiryBanner;