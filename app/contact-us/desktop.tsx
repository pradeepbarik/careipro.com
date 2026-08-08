'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { BiPhone, BiEnvelope, BiLogoWhatsapp, BiCheckCircle, BiSupport, BiChevronRight } from "react-icons/bi";
import PageHeader from "../components/desktop/header";
import DesktopFooter from "../components/desktop/footer";
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

const helpfulLinks = [
    { href: "/business-listing/hospital-clinic", label: "List your hospital / clinic" },
    { href: "/about-us", label: "About Careipro" },
    { href: "/privacy-policy", label: "Privacy policy" },
    { href: "/terms-and-conditions", label: "Terms & conditions" },
];

const selectUserInfo = createSelector([selectAuthSlice], (state) => {
    return {
        is_loggedin: state.is_loggedin,
        user_mobile: state.user_info?.mobile || "",
        user_name: state.user_info?.firstname || "",
        cookies: state.cookies
    }
})

const ContactUsDesktop = () => {
    const { user_mobile, user_name, cookies } = useSelector((state: RootState) => selectUserInfo(state));
    const [queryData, setQueryData] = useState({ name: "", contact_no: "", message: "" })
    const [topic, setTopic] = useState(topics[0]);
    const [submitted, setSubmitted] = useState(false);
    const state = cookies["state"] || "odisha";
    const city = cookies["city"] || "bhadrak";
    const { sendEnquiry } = useEnquiry({ state: state, city: city, market_name: "", vaertical: "CONTACT_US" })

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
            <PageHeader state={state} city={city} />

            {/* Hero */}
            <div className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #0e7490 0%, #0891b2 55%, #22d3ee 100%)" }}>
                <div className="max-w-7xl mx-auto px-4 py-14 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                        <BiSupport className="text-lg" /> Careipro Support
                    </div>
                    <h1 className="font-bold text-4xl mb-3">How can we help?</h1>
                    <p className="text-white/90 text-lg max-w-2xl mx-auto">
                        Have a question about an appointment, a booking or your account? Send us a message and our support team will get back to you.
                    </p>
                </div>
                <div className="absolute -top-24 -right-16 w-80 h-80 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-32 -left-16 w-64 h-64 bg-white/10 rounded-full"></div>
            </div>

            <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

                        {/* Left - contact channels */}
                        <div className="lg:col-span-2 space-y-4">
                            <a href={`tel:+91${support_no}`} className="flex items-start gap-4 bg-white rounded-2xl border border-gray-200 p-5 hover:border-cyan-500 hover:shadow-lg transition-all">
                                <span className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0">
                                    <BiPhone className="text-2xl" />
                                </span>
                                <div>
                                    <h3 className="font-bold text-gray-800">Call us</h3>
                                    <p className="text-gray-500 text-sm mb-1">Talk to our support team directly</p>
                                    <span className="text-cyan-600 font-semibold">+91 {support_no}</span>
                                </div>
                            </a>

                            <a href={`https://wa.me/91${support_no}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 bg-white rounded-2xl border border-gray-200 p-5 hover:border-green-500 hover:shadow-lg transition-all">
                                <span className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                                    <BiLogoWhatsapp className="text-2xl" />
                                </span>
                                <div>
                                    <h3 className="font-bold text-gray-800">WhatsApp</h3>
                                    <p className="text-gray-500 text-sm mb-1">Chat with us for a quick response</p>
                                    <span className="text-green-600 font-semibold">+91 {support_no}</span>
                                </div>
                            </a>

                            <a href={`mailto:${support_email}`} className="flex items-start gap-4 bg-white rounded-2xl border border-gray-200 p-5 hover:border-orange-500 hover:shadow-lg transition-all">
                                <span className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                                    <BiEnvelope className="text-2xl" />
                                </span>
                                <div>
                                    <h3 className="font-bold text-gray-800">Email us</h3>
                                    <p className="text-gray-500 text-sm mb-1">Write to us with the details</p>
                                    <span className="text-orange-600 font-semibold break-all">{support_email}</span>
                                </div>
                            </a>

                            {/* Helpful links */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-5">
                                <h3 className="font-bold text-gray-800 mb-2">Looking for something else?</h3>
                                <div className="divide-y divide-gray-100">
                                    {helpfulLinks.map((link) => (
                                        <Link key={link.href} href={link.href} className="flex items-center justify-between py-2.5 text-gray-600 hover:text-cyan-600 transition-colors">
                                            <span className="text-sm">{link.label}</span>
                                            <BiChevronRight className="text-lg" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right - enquiry form */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                                {submitted ? (
                                    <div className="flex flex-col items-center text-center py-12 gap-3">
                                        <BiCheckCircle className="text-6xl text-green-500" />
                                        <h2 className="text-2xl font-bold text-gray-800">Thanks for reaching out!</h2>
                                        <p className="text-gray-600 max-w-md">
                                            We have received your query. Our support team will contact you on <span className="font-semibold">+91 {queryData.contact_no}</span>.
                                        </p>
                                        <button
                                            onClick={() => { setSubmitted(false) }}
                                            className="mt-3 px-6 py-3 border border-cyan-600 text-cyan-600 font-semibold rounded-xl hover:bg-cyan-50 transition-all"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-1">Send us a message</h2>
                                        <p className="text-gray-500 mb-6">Tell us what you need help with and we&apos;ll take it from there.</p>

                                        <form onSubmit={onSubmit} className="space-y-5">
                                            {/* Topic chips */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">What is this about?</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {topics.map((item) => (
                                                        <button
                                                            key={item}
                                                            type="button"
                                                            onClick={() => { setTopic(item) }}
                                                            className={`px-4 py-2 rounded-full text-sm border transition-colors ${topic === item ? 'bg-cyan-600 text-white border-transparent font-semibold' : 'bg-white text-gray-600 border-gray-300 hover:border-cyan-400'}`}
                                                        >
                                                            {item}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Your Name <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={queryData.name}
                                                        onChange={(e) => { setQueryData({ ...queryData, name: e.target.value }) }}
                                                        placeholder="Enter your name"
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Your Contact No <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-0 top-0 h-full px-3 flex items-center text-gray-500 font-medium border-r border-gray-300">+91</span>
                                                        <input
                                                            type="tel"
                                                            value={queryData.contact_no}
                                                            onChange={(e) => { setQueryData({ ...queryData, contact_no: e.target.value.replace(/\D/g, '').slice(0, 10) }) }}
                                                            placeholder="10 digit mobile number"
                                                            required
                                                            className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Write your concern <span className="text-red-500">*</span>
                                                </label>
                                                <textarea
                                                    value={queryData.message}
                                                    onChange={(e) => { setQueryData({ ...queryData, message: e.target.value }) }}
                                                    placeholder="Describe your issue in a few lines..."
                                                    rows={5}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none resize-y"
                                                />
                                            </div>

                                            <p className="text-gray-500 text-sm">We will only use this number to respond to your query.</p>

                                            <button
                                                type="submit"
                                                className="px-8 py-3.5 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 transition-all shadow-lg"
                                            >
                                                Submit
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DesktopFooter state={state} city={city} />
        </>
    )
}
export default ContactUsDesktop;
