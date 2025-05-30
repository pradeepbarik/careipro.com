import Link from "next/link";
import dynamic from "next/dynamic";
import { BsTelephone, BsWhatsapp, BsGeoAlt } from "react-icons/bs";
import { BiGridAlt } from "react-icons/bi";
import Header from '@/app/components/mobile/header';
import BookAppointment from "@/app/components/mobile/doctors/doctor-detail/book-appointment";
import { SectionHeading } from '@/app/components/mobile/ui';
import AppointmentReminder from '@/app/components/mobile/appointment-reminder';
import Nearme from '@/assets/icon/nearme';
import { TDoctorDetail, TDoctorvailableData } from '@/lib/types/doctor';
import { doctorProfilePic, clinicProfilePic } from '@/lib/image';
import { formatCurrency } from '@/lib/helper/format-text';
import { TsearchParams } from '../types';
import { doctorDetailPageUrl } from '@/lib/helper/link';
const OverView = dynamic(() => import('./overview'))
const AppointmentBookingTiming = dynamic(() => import('./booking-timing'));
const Photos = dynamic(() => import('./photos'))
export const getSendEnquiryWhatsappMessage = (doctor_name = "") => {
    return `Hi,\nI found your clinic on careipro.com. I want more information about *${doctor_name}*`;
}
const DoctorDetailMobile = async ({ data, availableData, searchParams }: {
    data: TDoctorDetail,
    availableData: TDoctorvailableData,
    searchParams: TsearchParams,
}) => {
    const pageUrl = doctorDetailPageUrl({ doctor_id: data.doctor_id, service_loc_id: data.id, clinic_id: data.clinic_id, seo_url: data.seo_url, state: data.clinic_state, city: data.clinic_city, market_name: data.clinic_market })
    let ctaBtnCount = 2;
    if (data.whatsapp_number) {
        ctaBtnCount += 1;
    }
    return (<>
        <Header heading='Doctor Information' template="SUBPAGE" />
        <div className='flex px-2 py-2 mt-2 gap-3 bg-white shadow-sm'>
            <img src={doctorProfilePic(data.profile_pic)} alt={`${data.doctor_name} profile pic`} className='h-20 w-20 rounded-md shrink-0' />
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

        <div id="reminder-section"></div>
        <SectionHeading heading='Clinic Information' />
        <div className='bg-white px-2 py-2 shadow-sm'>
            <div className='flex gap-2 items-center'>
                <img src={clinicProfilePic(data.clinic_logo || "")} className="rounded-full h-20 w-20 shrink-0" />
                <div className='flex flex-col grow'>
                    <h2 className='font-semibold fs-17'>{data.clinic_name}</h2>
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
                </div> :
                <div className="flex gap-4">
                    <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${data.location_lat},${data.location_lng}`} className="button grow py-1" data-variant="outlined">
                        <Nearme pathStyle={{ stroke: "var(--primary-color)" }} className="mr-2" />
                        Map Location
                    </a>
                    <Link href={`tel:${data.clinic_mobile}`} className="grow button py-1">
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
        <div className="flex overflow-auto px-2 py-2 gap-2 hide-scroll-bar mt-2 sticky bg-page-background-50" style={{ top: "4rem" }}>
            <Link href={`${pageUrl}`} className={`text-nowrap border bg-white rounded-lg px-2 py-1 font-semibold flex items-center ${(searchParams.sub_page == undefined || searchParams.sub_page === "") ? 'bg-primary color-white' : ''}`}>
                <BiGridAlt />
                <span className="ml-1 fs-15">Overview</span>
            </Link>
            {(data.settings.book_by === "app" && !data.settings.advance_booking_enable) &&
                <>
                    <Link href={`${pageUrl}/appointment-booking-timings`} className={`bg-white border rounded-lg font-semibold px-2 py-1 flex items-center shrink-0 gap-1 ${(searchParams.sub_page === "appointment-booking-timings") ? 'bg-primary color-white' : ''}`}>
                        <BiGridAlt />
                        <span className="text-nowrap fs-15">Booking Time</span>
                    </Link>
                </>}
            <Link href={`${pageUrl}/photos`} className={`bg-white border rounded-lg font-semibold px-2 py-1 flex items-center shrink-0 gap-1 ${(searchParams.sub_page === "photos") ? 'bg-primary color-white' : ''}`}>
                <BiGridAlt />
                <span className="text-nowrap fs-15">Photos</span>
            </Link>
            <Link href={`${pageUrl}/feedback`} className={`bg-white border rounded-lg font-semibold px-2 py-1 flex items-center shrink-0 gap-1 ${(searchParams.sub_page === "feedback") ? 'bg-primary color-white' : ''}`}>
                <BiGridAlt />
                <span className="text-nowrap fs-15">Feedback</span>
            </Link>
        </div>
        {!searchParams.sub_page ?
            <OverView data={data} availableData={availableData} />
            : searchParams.sub_page === "photos" ? <Photos />
                : searchParams.sub_page === "appointment-booking-timings" ? <AppointmentBookingTiming data={data} />
                    : <OverView data={data} availableData={availableData} />}
        {data.settings.book_by === "app" && <div className="bg-white sticky bottom-0 w-full px-2 py-1" style={{ bottom: 0 }}>
            <BookAppointment open={searchParams.book_appointment === '1' ? true : false} clinic_id={data.clinic_id} service_loc_id={data.id} doctor_id={data.doctor_id} service_charge={parseInt(data.service_charge)} site_service_charge={parseInt(data.site_service_charge)} settings={data.settings} availability={availableData} />
        </div>}
        {data.settings.book_by === "call" &&
            <div className="bg-white sticky bottom-0 w-full px-2 py-1" style={{ bottom: 0 }}
            >
                <button className="button w-full h-14 fs-16 flex flex-col">
                    <span className="flex items-center">
                        <BsTelephone className="" style={{ fontSize: '1rem' }} />
                        Call Now
                    </span>
                    <span className="text-sm">For Appointment</span>
                </button>
            </div>
        }
        <AppointmentReminder position="reminder-section" doctor_id={data.doctor_id} />
    </>)
}
export default DoctorDetailMobile;