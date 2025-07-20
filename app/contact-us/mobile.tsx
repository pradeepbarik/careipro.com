'use client'
import { useEffect, useState } from "react";
import { BiPhone } from "react-icons/bi";
import Header from "../components/mobile/header";
import { Button, Input, TextArea } from "../components/mobile/ui";
import Link from "next/link";
import { support_no } from '@/constants/site-config';
import useEnquiry from "@/lib/hooks/useEnquiry";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { createSelector } from "@reduxjs/toolkit";
import { selectAuthSlice } from "@/lib/slices/authSlice";
const selectUserInfo = createSelector([selectAuthSlice], (state) => {
    return {
        is_loggedin: state.is_loggedin,
        user_mobile: state.user_info?.mobile || "",
        user_name: state.user_info?.firstname || "",
        cookies: state.cookies
    }
})
const ContactUsMobile = () => {
    const { user_mobile, user_name, cookies } = useSelector((state: RootState) => selectUserInfo(state));
    const [queryData, setQueryData] = useState({ name: "", contact_no: "", message: "" })
    const { sendEnquiry } = useEnquiry({ state: cookies["state"] || "odisha", city: cookies["city"] || "bhadrak", market_name: "", vaertical: "CONTACT_US" })
    const onSubmit = () => {
        if (queryData.contact_no.length !== 10) {
            toast.error("Please enter 10 digit contact no");
            return;
        }
        if (queryData.message.length < 10) {
            toast.error("Please enter your query in more detail");
            return;
        }
        sendEnquiry({
            name: queryData.name.trim(),
            mobile: queryData.contact_no.trim(),
            message: queryData.message.trim(),
            clinic_id: 0,
            doctor_id: 0,
            specialist_id: 0,
            page: "contact_us",
            section: "contactus_form"
        }, () => {
            toast.success("We have received your query! our support team will contact with you soon");
            setQueryData({ ...queryData, message: "" })
        }, { showSuccessAlert: false })
    }
    useEffect(() => {
        if (user_mobile) {
            setQueryData({ ...queryData, contact_no: user_mobile, name: user_name })
        }
    }, [user_mobile])
    return (
        <>
            <Header heading="Contact us" template="SUBPAGE" />
            {/* <div className="px-2 bg-cover h-24 relative" style={{ backgroundImage: "url(https://easygoengineering.com/images/Contact-Us-Banner.png)" }}>
                
            </div> */}
            <div className="px-2 bg-cover relative py-4" style={{ background: "linear-gradient(45deg, #518599, #efd4d4)" }}>
                <h2 className="font-bold text-2xl text-center">Get in Touch</h2>
                <div className="px-12 color-white font-semibold mt-2">
                    <p>If you have any queries get in touch with us.</p>
                    <p>{`We'll be happy to help you.`}</p>
                </div>
            </div>
            <div className="px-2">
                <div className='mt-2'>
                    <TextArea className='font-semibold fs-16' value={queryData.message} onChange={(e) => { setQueryData({ ...queryData, message: e.target.value }) }} lable='Write your concern ' />
                </div>
                <Input lable="Your Name" value={queryData.name} onChange={(e) => { setQueryData({ ...queryData, name: e.target.value }) }} />
                <div className="mt-2">
                    <Input lable="Your Contact No" value={queryData.contact_no} onChange={(e) => { setQueryData({ ...queryData, contact_no: e.target.value }) }} />
                </div>
                <Button className="w-full mt-4" onClick={onSubmit}>Submit</Button>
            </div>
            <div className="mt-4 px-4 flex justify-center items-center">
                <span className="grow"><hr className="border-2" /></span>
                <span className="px-4 flex">OR</span>
                <span className="grow"><hr className="border-2" /></span>
            </div>
            <div className="px-6 mt-4">
                <Link href={`tel:${support_no}`} className="button gap-3 rounded-full" data-variant={"outlined"}>
                    <BiPhone className="text-2xl" />
                    <span className="text-md"> Call Now</span>
                </Link>
            </div>

        </>
    )
}
export default ContactUsMobile;