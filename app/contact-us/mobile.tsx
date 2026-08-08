'use client'
import { useEffect, useState } from "react";
import { BiPhone, BiEnvelope, BiLogoWhatsapp, BiCheckCircle, BiSupport } from "react-icons/bi";
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

const support_email = "admin@careipro.com";

const topics = [
    "Appointment issue",
    "Payment / Refund",
    "Report a problem",
    "List my business",
    "Something else",
];

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
    const [topic, setTopic] = useState(topics[0]);
    const [submitted, setSubmitted] = useState(false);
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
            message: `<b>${topic}</b> - ${queryData.message.trim()}`,
            clinic_id: 0,
            doctor_id: 0,
            specialist_id: 0,
            page: "contact_us",
            section: "contactus_form"
        }, () => {
            toast.success("We have received your query! our support team will contact with you soon");
            setQueryData({ ...queryData, message: "" })
            setSubmitted(true);
        }, { showSuccessAlert: false })
    }

    useEffect(() => {
        if (user_mobile) {
            setQueryData((prev) => ({ ...prev, contact_no: user_mobile, name: user_name }))
        }
    }, [user_mobile, user_name])

    return (
        <>
            <Header heading="Contact us" template="SUBPAGE" />

            {/* Hero */}
            <div className="px-4 pt-6 pb-10 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0e7490 0%, #0891b2 55%, #22d3ee 100%)" }}>
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[11px] font-medium mb-3">
                        <BiSupport className="text-sm" /> Careipro Support
                    </div>
                    <h1 className="font-bold text-2xl mb-1.5">How can we help?</h1>
                    <p className="text-white/90 text-sm">
                        Have a question about an appointment, a booking or your account? Send us a message and our support team will get back to you.
                    </p>
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-16 -left-8 w-32 h-32 bg-white/10 rounded-full"></div>
            </div>

            {/* Quick contact tiles - overlap the hero */}
            <div className="px-3 -mt-6 relative z-10">
                <div className="grid grid-cols-3 gap-2">
                    <a href={`tel:+91${support_no}`} className="bg-white rounded-xl border border-gray-200 shadow-sm py-3 flex flex-col items-center gap-1">
                        <span className="w-9 h-9 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center">
                            <BiPhone className="text-xl" />
                        </span>
                        <span className="font-semibold fs-13">Call</span>
                        <span className="text-[10px] color-text-light">Talk to us</span>
                    </a>
                    <a href={`https://wa.me/91${support_no}`} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-gray-200 shadow-sm py-3 flex flex-col items-center gap-1">
                        <span className="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                            <BiLogoWhatsapp className="text-xl" />
                        </span>
                        <span className="font-semibold fs-13">WhatsApp</span>
                        <span className="text-[10px] color-text-light">Chat with us</span>
                    </a>
                    <a href={`mailto:${support_email}`} className="bg-white rounded-xl border border-gray-200 shadow-sm py-3 flex flex-col items-center gap-1">
                        <span className="w-9 h-9 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                            <BiEnvelope className="text-xl" />
                        </span>
                        <span className="font-semibold fs-13">Email</span>
                        <span className="text-[10px] color-text-light">Write to us</span>
                    </a>
                </div>
            </div>

            {/* Enquiry form */}
            <div className="px-3 mt-4">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3">
                    {submitted ? (
                        <div className="flex flex-col items-center text-center py-6 gap-2">
                            <BiCheckCircle className="text-5xl text-green-500" />
                            <div className="font-semibold fs-16">Thanks for reaching out!</div>
                            <p className="fs-13 color-text-light px-4">
                                We have received your query. Our support team will contact you on <span className="font-semibold">+91 {queryData.contact_no}</span>.
                            </p>
                            <button className="button mt-2" data-variant="outlined" onClick={() => { setSubmitted(false) }}>
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="font-semibold fs-16 mb-1">Send us a message</h2>
                            <p className="fs-13 color-text-light mb-3">Tell us what you need help with and we&apos;ll take it from there.</p>

                            {/* Topic chips */}
                            <span className="flex font-semibold fs-15 items-center mb-2">What is this about?</span>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {topics.map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => { setTopic(item) }}
                                        className={`px-3 py-1.5 rounded-full fs-13 border transition-colors ${topic === item ? 'bg-primary color-white border-transparent font-semibold' : 'bg-white color-text-light border-gray-300'}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            <div className="mb-3">
                                <TextArea
                                    className="fs-16 min-h-24"
                                    value={queryData.message}
                                    onChange={(e) => { setQueryData({ ...queryData, message: e.target.value }) }}
                                    lable="Write your concern"
                                    placeholder="Describe your issue in a few lines..."
                                />
                            </div>
                            <div className="mb-3">
                                <Input lable="Your Name" required={true} placeholder="Enter your name" value={queryData.name} onChange={(e) => { setQueryData({ ...queryData, name: e.target.value }) }} />
                            </div>
                            <div className="mb-1">
                                <Input lable="Your Contact No" required={true} type="mobile" value={queryData.contact_no} onChange={(e) => { setQueryData({ ...queryData, contact_no: e.target.value }) }} />
                            </div>
                            <p className="fs-12 color-text-light mb-3">We will only use this number to respond to your query.</p>
                            <Button className="w-full" onClick={onSubmit}>Submit</Button>
                        </>
                    )}
                </div>
            </div>

            {/* Helpful links */}
            <div className="px-3 mt-4 mb-6">
                <div className="font-semibold fs-15 mb-2">Looking for something else?</div>
                <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                    <Link href="/business-listing/hospital-clinic" className="flex items-center justify-between px-3 py-3">
                        <span className="fs-14">List your hospital / clinic</span>
                        <span className="color-text-light">›</span>
                    </Link>
                    <Link href="/about-us" className="flex items-center justify-between px-3 py-3">
                        <span className="fs-14">About Careipro</span>
                        <span className="color-text-light">›</span>
                    </Link>
                    <Link href="/privacy-policy" className="flex items-center justify-between px-3 py-3">
                        <span className="fs-14">Privacy policy</span>
                        <span className="color-text-light">›</span>
                    </Link>
                    <Link href="/terms-and-conditions" className="flex items-center justify-between px-3 py-3">
                        <span className="fs-14">Terms &amp; conditions</span>
                        <span className="color-text-light">›</span>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default ContactUsMobile;
