import Link from "next/link";
import dynamic from "next/dynamic";
import { BsTelephone, BsWhatsapp, BsGeoAlt } from "react-icons/bs";
import { BiGridAlt, BiMessageRoundedDots, BiTimeFive, BiCommentDots } from "react-icons/bi";
import Header from '@/app/components/mobile/header';
import BookAppointment from "@/app/components/mobile/doctors/doctor-detail/book-appointment";
import DoctorFeedback from "@/app/components/mobile/doctors/doctor-detail/doctor-feedback";
import { SectionHeading } from '@/app/components/mobile/ui';
import AppointmentReminder from '@/app/components/mobile/appointment-reminder';
import Nearme from '@/assets/icon/nearme';
import { TDoctorDetail, TDoctorvailableData } from '@/lib/types/doctor';
import { doctorProfilePic, clinicProfilePic } from '@/lib/image';
import { formatCurrency } from '@/lib/helper/format-text';
import { TsearchParams } from '../types';
import { doctorDetailPageUrl } from '@/lib/helper/link';
import SendEnquiry from "@/app/hospitals-and-clinics/clinic-detail/mobile/send-enquiry";
import EmergencyBookingCloseAlert from '@/app/components/mobile/doctors/doctor-detail/emergency-booking-close-alert';
import NeedHelpBtn from "@/app/components/mobile/need-help-btn";
import LikeShare from "@/app/components/mobile/doctors/doctor-detail/like-share";
import { userSecreateKey } from '@/constants/storage_keys';
const LoginToast = dynamic(() => import("@/app/components/mobile/login-toast"));
const OverView = dynamic(() => import('./overview'))
const AppointmentBookingTiming = dynamic(() => import('./booking-timing'));
const Photos = dynamic(() => import('./photos'))
export const getSendEnquiryWhatsappMessage = (doctor_name = "") => {
    return `Hi,\nI found your clinic on careipro.com. I want more information about *${doctor_name}*`;
}
const DoctorDetailMobile = async ({ data, availableData, searchParams, cookies }: {
    data: TDoctorDetail,
    availableData: TDoctorvailableData,
    searchParams: TsearchParams,
    cookies: Record<string, any>
}) => {
    const pageUrl = doctorDetailPageUrl({ doctor_id: data.doctor_id, service_loc_id: data.id, clinic_id: data.clinic_id, seo_url: data.seo_url, state: data.clinic_state, city: data.clinic_city, market_name: data.clinic_market })
    let ctaBtnCount = data.clinic_id !== 8 ? 3 : 2;
    if (data.whatsapp_number) {
        ctaBtnCount += 1;
    }
    return (<>
        <Header heading={data.doctor_name} template="SUBPAGE" rightContainer={
            <LikeShare total_liked={data.total_liked || 0} url={pageUrl} doctor_name={data.doctor_name} position={data.position || data.qualification_disp} clinic_name={data.clinic_name} service_charge={data.service_charge} doctor_id={data.doctor_id} clinic_id={data.clinic_id} />
        } />
        <div className='flex px-2 py-2 mt-2 gap-3 bg-white shadow-sm'>
            <div>
                <img src={doctorProfilePic(data.profile_pic)} alt={`${data.doctor_name} profile pic`} className='h-20 w-20 rounded-md shrink-0' />
            </div>
            <div className="grow">
                <div className="flex">
                    <div className="flex flex-col">
                        <h1 className='font-semibold fs-17'>{data.doctor_name}</h1>
                        <span>{data.position}</span>
                        {data.qualification_disp && <span>{data.qualification_disp}</span>}
                        <span>{data.experience} Years of Exp</span>
                    </div>
                    {/* <span className="ml-auto flex items-center">
                        <span className='font-bold text-xl'>{formatCurrency(parseInt(data.service_charge))}</span>
                    </span> */}
                </div>
                <div className="w-full flex flex-wrap gap-2 overflow-auto px-2 py-1 hide-scroll-bar">
                    {data.specialization?.split(",").map((spl) =>
                        <span key={spl} className='border px-1 rounded-md shrink-0' style={{ background: "#ededed" }}>
                            {spl}
                        </span>
                    )}
                </div>
            </div>
        </div>
        <div className="relative">
            {data.settings.emergency_booking_close == 1 && <EmergencyBookingCloseAlert message={data.settings.booking_close_message} />}
        </div>
        <div id="reminder-section"></div>
        <SectionHeading heading='Clinic Information' />
        <div className='bg-white px-2 py-2 shadow-sm'>
            <div className='flex gap-2 items-center'>
                <img src={clinicProfilePic(data.clinic_logo || "")} className="rounded-full h-20 w-20 shrink-0" />
                <div className='flex flex-col grow'>
                    {data.clinic_dtlpg_url ?
                        <Link href={data.clinic_dtlpg_url} className='font-semibold fs-17'>{data.clinic_name}</Link>
                        :
                        <h2 className='font-semibold fs-17'>{data.clinic_name}</h2>
                    }
                    <span className="flex items-center gap-1">
                        <BsGeoAlt />
                        {data.clinic_locality} in {data.clinic_market}, {data.clinic_city}
                    </span>
                    <span className="font-bold">Consultaion Fee : <span className="color-primary">{formatCurrency(parseInt(data.service_charge))}</span></span>
                    {/* <div className="flex items-center mt-1">
                        <a href={`tel:${data.clinic_mobile}`} className="flex items-center gap-1 fs-15 color-primary"><BsTelephone /> +91 {data.clinic_mobile}</a>
                    </div> */}
                </div>
            </div>
            {ctaBtnCount > 2 ?
                <div className="flex mt-3 justify-between overflow-auto hide-scroll-bar">
                    {data.whatsapp_channel_link && false &&
                        <span className="flex flex-col items-center w-24 shrink-0">
                            <BsWhatsapp className="border rounded-md p-2 w-12 h-10 color-white" style={{ fontSize: '2.2rem', background: "#61AA84" }} />
                            <span>Join Channel</span>
                        </span>
                    }
                    {data.whatsapp_number &&
                        <a className="flex flex-col items-center w-24 shrink-0" target="_blank" href={`https://wa.me/${data.whatsapp_number}?text=${encodeURI(getSendEnquiryWhatsappMessage(data.doctor_name))}`}>
                            <BsWhatsapp className="border rounded-md p-2 w-12 h-10 color-white" style={{ fontSize: '2.2rem', background: "#61AA84" }} />
                            <span>Whatsapp</span>
                        </a>
                    }
                    <Link href={`tel:${data.clinic_mobile}`} className="flex flex-col items-center w-24 shrink-0">
                        <BsTelephone className="border rounded-md p-2 w-12 h-10 bg-primary color-white" style={{ fontSize: '2.2rem' }} />
                        <span>Call Now</span>
                    </Link>
                    <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${data.location_lat},${data.location_lng}`} className="flex flex-col items-center w-24 shrink-0">
                        <Nearme className="border rounded-md p-2 w-12 h-10" style={{ fontSize: '2.2rem', background: "#f7f7f7" }} pathStyle={{ stroke: "black" }} />
                        <span>Direction</span>
                    </a>
                    <DoctorFeedback doctor_id={data.doctor_id} clinic_id={data.clinic_id} service_loc_id={data.id}/>
                    {(data.other_doc_cnt && data.other_doc_cnt > 0) ?
                    <Link href={data?.clinic_dtlpg_url || ""} className="flex flex-col items-center w-24 shrink-0">
                        <img src="/icon/male-doctor.svg" className="border rounded-md p-2 w-12 h-10" style={{ fontSize: '2.2rem' }} />
                        <span>Our Doctors</span>
                    </Link>:<></>}
                </div> :
                <div className="flex gap-4 mt-2">
                    <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${data.location_lat},${data.location_lng}`} className="button flex-1 py-1" data-variant="outlined">
                        <Nearme pathStyle={{ stroke: "var(--primary-color)" }} className="mr-2" />
                        Direction
                    </a>
                    <Link href={`tel:${data.clinic_mobile}`} className="flex-1 button py-1">
                        <BsTelephone className="mr-2" style={{ fontSize: '1rem' }} />
                        Call Now
                    </Link>

                </div>
            }
            {/* <div className="mt-2 flex">
                <a href={`tel:${data.clinic_mobile}`} className="ml-auto button flex items-center gap-2" data-variant="outlined" data-color="secondary">
                    <BsTelephone />
                    Call Now
                </a>
            </div> */}
            {/* <ClinicInfo data={data} /> */}
        </div>
        {data.settings.enable_enquiry ? <>
            <SendEnquiry businessType={data.business_type} state={data.clinic_state || ""} city={data.clinic_city} clini_id={data.clinic_id} doctor_id={data.doctor_id} />

        </> : <></>}
        <div className="flex overflow-auto px-2 py-2 gap-2 hide-scroll-bar mt-2 sticky bg-page-background-50" style={{ top: "4rem" }}>
            <Link href={`${pageUrl}`} className={`text-nowrap border bg-white rounded-lg px-2 py-1 font-semibold flex items-center ${(searchParams.sub_page == undefined || searchParams.sub_page === "") ? 'bg-primary color-white' : ''}`}>
                <BiGridAlt />
                <span className="ml-1 fs-15">Overview</span>
            </Link>
            {(data.settings.book_by === "app" && !data.settings.advance_booking_enable) &&
                <>
                    <Link href={`${pageUrl}/appointment-booking-timings`} className={`bg-white border rounded-lg font-semibold px-2 py-1 flex items-center shrink-0 gap-1 ${(searchParams.sub_page === "appointment-booking-timings") ? 'bg-primary color-white' : ''}`}>
                        <BiTimeFive />
                        <span className="text-nowrap fs-15">Booking Time</span>
                    </Link>
                </>}
            {(data.allSpecializations["DISEASE"] || []).length > 0 &&
                <Link href={`${pageUrl}/Expert-In-Disease-Treatment`} className={`bg-white border rounded-lg font-semibold px-2 py-1 flex items-center shrink-0 gap-1 ${(searchParams.sub_page === "Expert-In-Disease-Treatment") ? 'bg-primary color-white' : ''}`}>
                    <img src="/icon/disease-treatment2.png" className="h-6 w-6 rounded-full bg-white" />
                    <span className="text-nowrap fs-15">Good Experience In</span>
                </Link>
            }
            {/* <Link href={`${pageUrl}/photos`} className={`bg-white border rounded-lg font-semibold px-2 py-1 flex items-center shrink-0 gap-1 ${(searchParams.sub_page === "photos") ? 'bg-primary color-white' : ''}`}>
                <BiGridAlt />
                <span className="text-nowrap fs-15">Photos</span>
            </Link> */}
            {data.settings.show_patients_feedback ?
                <Link href={`${pageUrl}/Patient-Reviews`} className={`bg-white border rounded-lg font-semibold px-2 py-1 flex items-center shrink-0 gap-1 ${(searchParams.sub_page === "feedback") ? 'bg-primary color-white' : ''}`}>
                    <BiMessageRoundedDots />
                    <span className="text-nowrap fs-15">Reviews</span>
                </Link> : <></>
            }
        </div>
        {!searchParams.sub_page ?
            <OverView data={data} availableData={availableData} />
            : searchParams.sub_page === "photos" ? <Photos />
                : searchParams.sub_page === "appointment-booking-timings" ? <AppointmentBookingTiming data={data} /> : searchParams.sub_page === "Expert-In-Disease-Treatment" ? <>
                    <div className="px-2 py-2 grid grid-cols-2 gap-2">
                        {(data.allSpecializations["DISEASE"] || []).map((cat) =>
                            <div key={cat.seo_id} className="flex items-center gap-2 px-2 py-1 border border-color-grey rounded-md bg-white">
                                <img src={cat.icon || "/icon/disease-defult-icon.png"} className="w-10 h-10" />
                                <span>{cat.name}</span>
                            </div>
                        )}
                    </div>
                </> : searchParams.sub_page === "Patient-Reviews" ? <>
                    reviews
                </> : <>
                    <OverView data={data} availableData={availableData} />
                </>}
        {(data.settings.book_by === "app") && <div className="bg-white sticky bottom-0 w-full px-2 py-1" style={{ bottom: 0 }}>
            <BookAppointment emergencyBookingClose={data.settings.emergency_booking_close} bookingCloseMessage={data.settings.booking_close_message} open={searchParams.book_appointment === '1' ? true : false} clinic_id={data.clinic_id} service_loc_id={data.id} doctor_id={data.doctor_id} service_charge={parseInt(data.service_charge)} site_service_charge={parseInt(data.site_service_charge)} settings={data.settings} availability={availableData} slno_groups={data.slno_groups || []} pageUrl={pageUrl} />
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
                {/* <NeedHelpBtn style={{ bottom: "5rem" }} /> */}
            </>}

    </>)
}
export default DoctorDetailMobile;