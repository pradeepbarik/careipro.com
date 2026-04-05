import Link from "next/link";
import dynamic from "next/dynamic";
import { BsTelephone } from "react-icons/bs";
import { BiGridAlt, BiMessageRoundedDots, BiTimeFive, BiLocationPlus, BiPhone, BiChevronRight, BiTagAlt, BiLogoWhatsapp, BiMoney, BiUser } from "react-icons/bi";
import Header from '@/app/components/mobile/header';
import BookAppointment from "@/app/components/mobile/doctors/doctor-detail/book-appointment";
//import DoctorFeedback from "@/app/components/mobile/doctors/doctor-detail/doctor-feedback";
//import { SectionHeading } from '@/app/components/mobile/ui';
import AppointmentReminder from '@/app/components/mobile/appointment-reminder';
import { TDoctorDetail, TDoctorvailableData } from '@/lib/types/doctor';
import { doctorProfilePic, clinicProfilePic } from '@/lib/image';
import { capitalizeFirstLetter, formatCurrency, showMaskedMobile } from '@/lib/helper/format-text';
import { TsearchParams } from '../types';
import { doctorDetailPageUrl } from '@/lib/helper/link';
import SendEnquiry from "@/app/hospitals-and-clinics/clinic-detail/mobile/send-enquiry";
import EmergencyBookingCloseAlert from '@/app/components/mobile/doctors/doctor-detail/emergency-booking-close-alert';
//import NeedHelpBtn from "@/app/components/mobile/need-help-btn";
import LikeShare from "@/app/components/mobile/doctors/doctor-detail/like-share";
import { userinfo, userSecreateKey } from '@/constants/storage_keys';
import SectionHeading from "@/app/components/mobile/ui/section-heading";
import { doctorSpecialityIcon } from "@/lib/image";
import BreadCrumbs from "@/app/components/mobile/breadcrumb";
const RatingReminder = dynamic(() => import('@/app/components/mobile/rating-reminder'));
const LoginToast = dynamic(() => import("@/app/components/mobile/login-toast"));
const OverView = dynamic(() => import('./overview'))
const AppointmentBookingTiming = dynamic(() => import('./booking-timing'));
const Photos = dynamic(() => import('./photos'))
const SimilarBusieness = dynamic(() => import("./similar-doctors"));
const Reviews = dynamic(() => import('./reviews'));
export const getSendEnquiryWhatsappMessage = (doctor_name = "") => {
    return `Hi,\nI found your clinic on careipro.com. I want more information about *${doctor_name}*`;
}
// const CtaButtons = ({ clinic_mobile, whatsapp_number, whatsapp_channel_link, other_doc_cnt, doctor_name, location_lat, location_lng }: { clinic_mobile: string, whatsapp_number: string, whatsapp_channel_link: string, other_doc_cnt: number, location_lat: number, location_lng: number, doctor_name: string }) => {
//     return <>
//         <div className="flex mt-3 justify-between overflow-auto hide-scroll-bar">
//             {whatsapp_channel_link && false &&
//                 <span className="flex flex-col items-center w-24 shrink-0">
//                     <BsWhatsapp className="border rounded-md p-2 w-12 h-10 color-white" style={{ fontSize: '2.2rem', background: "#61AA84" }} />
//                     <span>Join Channel</span>
//                 </span>
//             }
//             {whatsapp_number &&
//                 <a className="flex flex-col items-center w-24 shrink-0" target="_blank" href={`https://wa.me/${whatsapp_number}?text=${encodeURI(getSendEnquiryWhatsappMessage(doctor_name))}`}>
//                     <BsWhatsapp className="border rounded-md p-2 w-12 h-10 color-white" style={{ fontSize: '2.2rem', background: "#61AA84" }} />
//                     <span>Whatsapp</span>
//                 </a>
//             }
//             {clinic_mobile &&
//                 <Link href={`tel:${clinic_mobile}`} className="flex flex-col items-center w-24 shrink-0">
//                     <BsTelephone className="border rounded-md p-2 w-12 h-10 bg-primary color-white" style={{ fontSize: '2.2rem' }} />
//                     <span>Call Now</span>
//                 </Link>
//             }
//             {location_lat && location_lng &&
//                 <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${location_lat},${location_lng}`} className="flex flex-col items-center w-24 shrink-0">
//                     <Nearme className="border rounded-md p-2 w-12 h-10" style={{ fontSize: '2.2rem', background: "#f7f7f7" }} pathStyle={{ stroke: "black" }} />
//                     <span>Direction</span>
//                 </a>
//             }
//         </div>
//     </>
// }
const DoctorDetailMobile = async ({ data, availableData, searchParams, cookies }: {
    data: TDoctorDetail,
    availableData: TDoctorvailableData,
    searchParams: TsearchParams,
    cookies: Record<string, any>
}) => {
    const pageUrl = doctorDetailPageUrl({ doctor_id: data.doctor_id, service_loc_id: data.id, clinic_id: data.clinic_id, seo_url: data.seo_url, state: data.clinic_state, city: data.clinic_city, market_name: data.clinic_market, type: data.business_type });
    const userdetail = cookies[userinfo] ? JSON.parse(cookies[userinfo]) : null;
    return (<>
        <Header heading={data.doctor_name + `${data.specialty ? ` - ${data.specialty}` : ''}`} template="SUBPAGE" rightContainer={
            <LikeShare total_liked={data.total_liked || 0} url={pageUrl} doctor_name={data.doctor_name} position={data.position || data.qualification_disp} clinic_name={data.clinic_name} service_charge={data.service_charge} doctor_id={data.doctor_id} clinic_id={data.clinic_id} />
        } />
        <div className='flex px-2 py-2 mt-2 gap-3 bg-white shadow-sm'>
            <div className="w-20 shrink-0">
                <img src={doctorProfilePic(data.profile_pic)} alt={`${data.doctor_name} ${data.specialty ? ` - ${data.specialty}` : ''} in ${data.clinic_city}`} className='h-20 w-full rounded-md shrink-0' />
            </div>
            <div className="grow">
                <div className="flex">
                    <div className="flex flex-col">
                        <div className='font-semibold fs-17'>{data.doctor_name}{data.specialty ? ` - ${data.specialty}` : ''}</div>
                        <span>{data.position}</span>
                        {data.qualification_disp && <span>{data.qualification_disp}</span>}
                        <span>{data.experience} Years of Exp</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="relative">
            {data.settings.emergency_booking_close == 1 && <EmergencyBookingCloseAlert message={data.settings.booking_close_message} />}
        </div>
        <div className="px-2 mt-1">
            <div className="bg-gray-100 rounded-md px-2 border flex gap-1 items-center py-2">
                <BiTagAlt className="rotate-90 color-primary shrink-0" style={{ fontSize: '1rem' }} />
                <h2 className="font-semibold fs-15">Specialization</h2>
                <div className="ml-auto text-right">
                    {data.specialization?.replaceAll(",", ", ")}
                </div>
            </div>
            {data.clinic_id > 0 &&
                <div className="bg-gray-100 rounded-md px-2 border flex gap-1 items-center py-2 mt-2">
                    <img src={clinicProfilePic(data.clinic_logo || "")} alt={`${data.clinic_name} Logo`} className="h-6 w-6 rounded-md shrink-0" />
                    <h2 className="ml-2 font-semibold fs-16">{data.clinic_name}</h2>
                    {data.other_doc_cnt && data.other_doc_cnt > 0 ? <>
                        <Link href={data.clinic_dtlpg_url || ''} className="ml-auto flex items-center gap-1 text-xs color-primary font-semibold text-nowrap">
                            <span>+{data.other_doc_cnt} {data.other_doc_cnt > 1 ? 'Doctors' : 'Doctor'}</span>
                            <BiChevronRight className="text-xl" />
                        </Link>
                    </> : <></>}
                </div>}
            <div className="bg-gray-100 rounded-md px-2 border flex gap-2 items-center py-2 mt-1">
                <BiLocationPlus style={{ fontSize: '1rem' }} />
                <h2 className="font-semibold">Location</h2>
                <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${data.location_lat},${data.location_lng}`} className="ml-auto text-right flex">
                    {data.clinic_locality} in {data.clinic_market}, {data.clinic_city}
                    <BiChevronRight className="text-xl" />
                </a>
            </div>
            {data.clinic_mobile ?
                <div className="bg-gray-100 rounded-md px-2 border flex items-center gap-2 py-2 mt-1">
                    <BiPhone style={{ fontSize: '1rem' }} />
                    <h2 className="font-semibold">Contact</h2>
                    <a href={`tel:${data.clinic_mobile}`} className="ml-auto flex">
                        {showMaskedMobile(data.clinic_mobile)}
                        <span className="mx-1 border-color-primary border rounded-md px-2 color-primary font-semibold">Call Now</span>
                        {/* <BiChevronRight className="text-xl" /> */}
                    </a>
                </div> : <></>}
            {data.whatsapp_number ? <>
                <div className="bg-gray-100 rounded-md px-2 border flex items-center gap-2 py-2 mt-1">
                    <BiLogoWhatsapp style={{ fontSize: '1rem' }} />
                    <h2 className="font-semibold">Whatsapp</h2>
                    <a href={`https://wa.me/${data.whatsapp_number}?text=${encodeURI(getSendEnquiryWhatsappMessage(data.doctor_name))}`} className="ml-auto flex">
                        {showMaskedMobile(data.whatsapp_number)}
                        <span className="mx-1 border-color-primary border rounded-md px-2 color-primary font-semibold">Message</span>
                    </a>
                </div>
            </> : <></>}
            <div className="bg-gray-100 rounded-md px-2 border flex items-center py-2 mt-1">
                <BiMoney style={{ fontSize: '1rem' }} />
                <h2 className="ml-2 font-semibold">Consulting Fee</h2>
                <span className="ml-auto font-bold">{formatCurrency(parseInt(data.service_charge))}</span>
            </div>
        </div>
        {data.settings.enable_enquiry && false ? <>
            <SendEnquiry businessType={data.business_type} state={data.clinic_state || ""} city={data.clinic_city} clini_id={data.clinic_id} doctor_id={data.doctor_id} />
        </> : <></>}
        {cookies[userSecreateKey] && userdetail ? <>
            {userdetail.ut == "user" || userdetail.ut == "agency" &&
                <div className="mx-2 mt-2 px-3 py-3 bg-cyan-50 border border-cyan-200 rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-200 flex items-center justify-center shrink-0">
                        <BiUser className="text-cyan-600" style={{ fontSize: '1.2rem' }} />
                    </div>
                    <div className="flex flex-col grow">
                        <span className="font-semibold text-sm text-gray-800">Hi, {`${capitalizeFirstLetter(userdetail.fn)} ${capitalizeFirstLetter(userdetail.ln)}`}</span>
                        <span className="text-xs text-gray-500">your appointment history</span>
                    </div>
                    <Link href={`/my-profile/appointment-history`} className="bg-cyan-600 color-white font-semibold text-sm px-3 py-2 rounded-lg shrink-0">
                        My Bookings
                    </Link>
                </div>
            }
        </> :
            <div className="mx-2 mt-2 px-3 py-3 bg-red-50 border border-orange-200 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center shrink-0">
                    <BiUser className="text-orange-600" style={{ fontSize: '1.2rem' }} />
                </div>
                <div className="flex flex-col grow">
                    <span className="font-semibold text-sm text-gray-800">Verify your mobile number</span>
                    <span className="text-xs text-gray-500">Login or verify to book appointment</span>
                </div>
                <Link href={`/login?redirect_url=${data.seo_dt.seo_url}`} className="bg-orange-400 color-white font-semibold text-sm px-3 py-2 rounded-lg shrink-0">
                    Login
                </Link>
            </div>
        }
        <div id="reminder-section"></div>
        <div className="flex overflow-auto px-2 py-2 gap-2 hide-scroll-bar mt-2 sticky bg-page-background-50" style={{ top: "4rem" }}>
            <Link href={`${pageUrl}`} className={`text-nowrap border bg-white rounded-lg px-2 py-1 font-semibold flex items-center ${(searchParams.sub_page == undefined || searchParams.sub_page === "") ? 'bg-primary color-white' : ''}`}>
                <BiGridAlt />
                <span className="ml-1 fs-15">Overview</span>
            </Link>
            {/* {(data.partner_type === "partnered" && data.settings.book_by === "app" && !data.settings.advance_booking_enable) &&
                <>
                    <Link href={`${pageUrl}/appointment-booking-timings`} className={`bg-white border rounded-lg font-semibold px-2 py-1 flex items-center shrink-0 gap-1 ${(searchParams.sub_page === "appointment-booking-timings") ? 'bg-primary color-white' : ''}`}>
                        <BiTimeFive />
                        <span className="text-nowrap fs-15">Booking Time</span>
                    </Link>
                </>} */}
            {(data.allSpecializations["DISEASE"] || []).length > 0 &&
                <Link href={`${pageUrl}/expert-in-disease-treatment`} className={`bg-white border rounded-lg font-semibold px-2 py-1 flex items-center shrink-0 gap-1 ${(searchParams.sub_page?.toLowerCase() === "expert-in-disease-treatment") ? 'bg-primary color-white' : ''}`}>
                    <img src="/icon/disease-treatment2.png" alt="Expert In Disease Treatment" className="h-6 w-6 rounded-full bg-white" />
                    <span className="text-nowrap fs-15">Expertise In</span>
                </Link>
            }
            {data.settings.show_patients_feedback ?
                <Link href={`${pageUrl}/patient-reviews`} className={`bg-white border rounded-lg font-semibold px-2 py-1 flex items-center shrink-0 gap-1 ${(searchParams.sub_page?.toLowerCase() === "patient-reviews") ? 'bg-primary color-white' : ''}`}>
                    <BiMessageRoundedDots />
                    <span className="text-nowrap fs-15">Reviews</span>
                </Link> : <></>
            }
        </div>
        {!searchParams.sub_page ?
            <OverView data={data} availableData={availableData} />
            : searchParams.sub_page === "photos" ? <Photos />
                : searchParams.sub_page === "appointment-booking-timings" ? <AppointmentBookingTiming data={data} /> : searchParams.sub_page.toLowerCase() === "expert-in-disease-treatment" ? <>
                    <div className="px-2 py-2 grid grid-cols-2 gap-2">
                        {(data.allSpecializations["DISEASE"] || []).map((cat) =>
                            <div key={cat.seo_id} className="flex items-center gap-2 px-2 py-1 border border-color-grey rounded-md bg-white">
                                <img src={doctorSpecialityIcon(cat.icon) || "/icon/disease-defult-icon.png"} className="w-10 h-10" />
                                <span>{cat.name}</span>
                            </div>
                        )}
                    </div>
                    {data.treated_health_conditions && data.treated_health_conditions.length > 0 ? <>
                        <SectionHeading heading='Treated Top Health Conditions' />
                        <div className="px-2 py-2 grid grid-cols-2 gap-2 bg-white">
                            {data.treated_health_conditions.map((condition, idx) =>
                                <div key={idx} className="flex flex-col gap-1">
                                    <span className="dot">{condition.condition}</span>
                                </div>
                            )}
                        </div>
                    </> : <></>}
                    {data.treatments_available && data.treatments_available.length > 0 ? <>
                        <SectionHeading heading='Available Treatments' />
                        <div className="px-2 py-2 grid grid-cols-2 gap-2 bg-white">
                            {data.treatments_available.map((treatment, idx) =>
                                <div key={idx} className="flex flex-col gap-1">
                                    <span className="dot">{treatment}</span>
                                </div>
                            )}
                        </div>
                    </> : <></>}

                </> : searchParams.sub_page.toLowerCase() === "patient-reviews" ? <>
                    <Reviews state={searchParams.state} city={searchParams.city} service_loc_id={data.id} rating={data.rating || 0} rating_count={data.rating_count || 0} review_count={data.review_count || 0} doctor_id={data.doctor_id} clinic_id={data.clinic_id} />
                </> : <>
                    <OverView data={data} availableData={availableData} />
                </>}
        {(data.similar_doctors || []).length > 0 ? <SimilarBusieness heading={`Similar Doctors in ${data.clinic_city}`} similar_doctors={data.similar_doctors || []} /> : null}
        <BreadCrumbs data={[
            { label: "Careipro", href: "https://careipro.com" },
            { label: data.clinic_city, href: `https://careipro.com/${searchParams.state}/${searchParams.city}` },
            { label: `Doctors in ${data.clinic_city}`, href: `https://careipro.com/${searchParams.state}/${searchParams.city}/best-doctors` },
            { label: data.doctor_name }
        ]} />
        {(data.settings.book_by === "app") && <div className="mt-12">
            <div className="bg-white fixed bottom-0 w-full px-2 py-1" style={{ bottom: 0 }}>
                <BookAppointment emergencyBookingClose={data.settings.emergency_booking_close} bookingCloseMessage={data.settings.booking_close_message} open={searchParams.book_appointment === '1' ? true : false} clinic_id={data.clinic_id} service_loc_id={data.id} doctor_id={data.doctor_id} service_charge={parseInt(data.service_charge)} site_service_charge={parseInt(data.site_service_charge)} settings={data.settings} availability={availableData} slno_groups={data.slno_groups || []} pageUrl={pageUrl} />
            </div>
        </div>}
        {data.settings.book_by === "call" &&
            <div className="bg-white sticky bottom-0 w-full px-2 py-1" style={{ bottom: 0 }}
            >
                <a href={`tel:${data.clinic_mobile}`} className="button w-full h-14 fs-16 flex flex-col">
                    <span className="flex items-center">
                        <BsTelephone className="" style={{ fontSize: '1rem' }} />
                        Call Now
                    </span>
                    <span className="text-sm">For Appointment</span>
                </a>
            </div>
        }
        <AppointmentReminder position="reminder-section" doctor_id={data.doctor_id} />
        {!cookies[userSecreateKey] ?
            <>
                <LoginToast message='Please <b>Login/Signup</b> To <b>Book appointment</b>' style={{ bottom: "3.5rem" }} />
                {/* <NeedHelpBtn style={{ bottom: "30vh" }} /> */}
            </> : <>
                <RatingReminder catid={0} doctor_id={data.doctor_id} />
                {/* <NeedHelpBtn style={{ bottom: "5rem" }} /> */}
            </>}

    </>)
}
export default DoctorDetailMobile;