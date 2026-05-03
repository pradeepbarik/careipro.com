import Header from "../../components/mobile/header";
import { TDoctorDetail } from "@/lib/types/doctor";
import Image from "next/image";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { BiSupport, BiCalendar, BiQuestionMark, BiChevronRight } from "react-icons/bi";
import { MdHeadsetMic } from "react-icons/md";
import { doctorProfilePic } from "@/lib/image";
import { formatDoctorName } from "@/lib/helper/format-text";
import { support_no } from "@/constants/site-config";
import Link from "next/link";
import BreadCrumbs from "../../components/mobile/breadcrumb";
import RatingCard from "./rating-card";
import SendEnquiry from "./send-enquiry";
const DoctorHelpCenterMobile = ({ data, searchParams }: { data: TDoctorDetail, searchParams: any }) => {
    return (
        <>
            <Header heading={`${data.doctor_name} - Help Center`} template="SUBPAGE" />
            <div className="bg-gray-50 min-h-screen pb-32">
                <div className="px-2 py-4 max-w-md mx-auto">
                    {/* Banner */}
                    <div className="mb-5 rounded-2xl relative overflow-hidden shadow-lg bg-gradient-to-br from-teal-50 via-teal-100 to-cyan-50 border border-teal-200">
                        <div className="flex items-center w-full px-5 py-4">
                            <div className="flex-1 pr-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                                        <BiSupport className="text-white text-xl" />
                                    </div>
                                    <h1 className="text-xl font-bold text-gray-800">Need Help?</h1>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    Reach out for assistance with appointments, reports, or clinic services.
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <Image
                                        src={doctorProfilePic(data.profile_pic)}
                                        alt={data.doctor_name}
                                        width={80}
                                        height={80}
                                        className="rounded-2xl border-4 border-white shadow-lg object-cover w-20 h-20"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                            </div>
                        </div>
                        <div className="px-5 pb-3 flex">
                            <Link href={data.seo_dt.seo_url} className="group inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-teal-300 hover:bg-white transition-all">
                                <span className="text-xs font-semibold text-teal-700">{formatDoctorName(data.doctor_name)}</span>
                                <BiChevronRight className="text-teal-800 bg-gray-200 rounded-full text-sm" />
                            </Link>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-3 mb-6">
                        <a
                            href={`tel:${data.clinic_mobile}`}
                            className="grow shrink-0 bg-white border border-teal-400 hover:border-teal-500 text-teal-600 rounded-xl py-2 px-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-3"
                        >
                            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <FiPhone className="text-xl text-teal-600" />
                            </div>
                            <span className="">Call Clinic</span>
                        </a>
                        <a
                            href={`https://wa.me/${data.clinic_mobile}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="grow shrink-0 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl py-2 px-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-3"
                        >
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <FaWhatsapp className="text-xl" />
                            </div>
                            <span className="">WhatsApp</span>
                        </a>
                    </div>

                    {/* Enquiry Box */}
                    <div className="mb-5">
                        <SendEnquiry state={searchParams.state} city={searchParams.city} businessType={data.business_type} clinic_id={data.clinic_id} doctor_id={data.doctor_id} />
                    </div>

                    {/* Share your feedback */}
                    <div className="mb-5">
                        <RatingCard clinic_id={data.clinic_id} doctor_id={data.doctor_id} service_loc_id={data.id} />
                    </div>
                    {/* Common FAQs */}
                    <div className="overflow-hidden">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-teal-800">Common FAQs</h2>
                        </div>
                        <div className="">
                            {data.faqs?.mainEntity.map((faq, idx) => (
                                <details key={idx} className="group bg-gray-50 border border-gray-200 rounded-lg p-2 hover:shadow-md transition-all duration-300 mb-2">
                                    <summary className="font-semibold cursor-pointer text-gray-800 flex items-center gap-2" style={{ listStyle: 'none', display: 'flex' }}>
                                        <span className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-sm flex-shrink-0">
                                            {idx + 1}
                                        </span>
                                        <span className="flex-1">{faq.name}</span>
                                    </summary>
                                    <p className="mt-3 text-gray-600 text-sm leading-relaxed pl-8">{faq.acceptedAnswer?.text}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <BreadCrumbs data={[
                { label: "Careipro", href: "https://careipro.com" },
                { label: searchParams.city, href: `https://careipro.com/${searchParams.state}/${searchParams.city}` },
                { label: `Doctors in ${searchParams.city}`, href: `https://careipro.com/${searchParams.state}/${searchParams.city}/best-doctors` },
                { label: formatDoctorName(data.doctor_name), href: data.seo_dt.seo_url },
                { label: "Help Center" }
            ]} />

            {/* Bottom Support Bar */}
            <div className="fixed bottom-0 left-0 right-0 px-3 pb-3 pt-2 bg-gradient-to-t from-white via-white to-transparent">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl shadow-2xl overflow-hidden border-2 border-red-300">
                    <div className="flex items-center px-4 py-3 gap-3">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                            <MdHeadsetMic className="text-white text-3xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-bold text-sm mb-0.5">Not getting help?</h3>
                            <p className="text-white/90 text-xs leading-tight">Careipro support is here for you</p>
                        </div>
                        <a
                            href={`tel:${support_no}`}
                            className="bg-white hover:bg-gray-100 text-red-500 rounded-xl py-2.5 px-4 font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 flex-shrink-0"
                        >
                            <FiPhone className="text-lg" />
                            <span className="text-sm">Call</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorHelpCenterMobile;