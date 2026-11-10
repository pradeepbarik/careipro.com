import Link from 'next/link';
import { BiChevronRight, BiCalendar, BiPhone, BiLogoWhatsapp, BiBriefcase, BiMoney, BiLocationPlus } from 'react-icons/bi';
import { BsPersonRaisedHand, BsTelephone } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { TDoctorDetail, TDoctorvailableData } from '@/lib/types/doctor';
import { TsearchParams } from '../doctor-detail/types';
import { doctorDetailPageUrl, cityPageLink, hirePersonalAssistantPageUrl } from '@/lib/helper/link';
import { userinfo } from '@/constants/storage_keys';
import { support_no } from '@/constants/site-config';
import { doctorProfilePic } from '@/lib/image';
import { capitalizeFirstLetter, formatCurrency, showMaskedMobile } from '@/lib/helper/format-text';
import TrackedLink from '@/app/components/client-components/tracked-link';
import BookAppointment from '@/app/components/mobile/doctors/doctor-detail/book-appointment-form';
import SupportCard from '../doctor-detail/desktop/support-card';
import { patientSupportContact } from '@/lib/helper/patient-support';

/**
 * Desktop version of the mobile book-appointment page. Mobile links out to this same route from
 * the profile's bottom bar; desktop's booking rail on the profile (doctor-detail/desktop/booking-panel)
 * links here the same way, rather than carrying the form itself, so there is one booking page and
 * one implementation of its call/assistant/login states instead of two.
 */
const BookAppointmentDesktop = ({ data, availableData, searchParams, cookies }: {
    data: TDoctorDetail,
    availableData: TDoctorvailableData,
    searchParams: TsearchParams,
    cookies: Record<string, any>
}) => {
    const pageUrl = doctorDetailPageUrl({ doctor_id: data.doctor_id, service_loc_id: data.id, clinic_id: data.clinic_id, seo_url: data.seo_url, state: data.clinic_state, city: data.clinic_city, market_name: data.clinic_market, type: data.business_type }) + '/book-appointment';
    const profileUrl = pageUrl.replace('/book-appointment', '');
    const userdetail = cookies[userinfo] ? JSON.parse(cookies[userinfo]) : null;

    const Breadcrumb = () => (
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 fs-13 text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary">Careipro</Link>
            <BiChevronRight className="shrink-0" />
            <Link href={cityPageLink(data.clinic_state, data.clinic_city)} className="hover:text-primary">{capitalizeFirstLetter(data.clinic_city)}</Link>
            <BiChevronRight className="shrink-0" />
            <Link href={profileUrl} className="hover:text-primary truncate max-w-[200px]">{data.doctor_name}</Link>
            <BiChevronRight className="shrink-0" />
            <span className="text-gray-700 font-medium">Book Appointment</span>
        </nav>
    );

    const DoctorSummaryCard = () => (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex gap-3">
                <img src={doctorProfilePic(data.profile_pic)} alt={data.doctor_name} className="h-16 w-16 rounded-lg object-cover shrink-0" />
                <div className="min-w-0">
                    <Link href={profileUrl} className="font-bold text-gray-900 leading-tight hover:text-primary">
                        {data.doctor_name}{data.specialty ? ` - ${data.specialty}` : ''}
                    </Link>
                    {data.position && <p className="fs-13 text-gray-600 mt-0.5">{data.position}</p>}
                    {data.rating ? (
                        <span className="inline-flex items-center gap-1 bg-primary text-white fs-12 px-1.5 py-0.5 rounded mt-1">
                            {data.rating}<AiFillStar />
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-line-light rounded-lg bg-gray-50 mt-3 py-2 text-center">
                <div className="flex flex-col leading-tight">
                    <span className="fs-14 font-semibold text-gray-900 flex items-center justify-center gap-1">
                        <BiBriefcase className="text-primary" />{data.experience}+ yrs
                    </span>
                    <span className="fs-12 text-muted">Experience</span>
                </div>
                <div className="flex flex-col leading-tight">
                    <span className="fs-14 font-semibold text-gray-900 flex items-center justify-center gap-1">
                        <BiMoney className="text-primary" />{formatCurrency(parseInt(data.service_charge))}
                    </span>
                    <span className="fs-12 text-muted">Consulting fee</span>
                </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="fs-12 font-medium text-muted uppercase tracking-wide">Clinic</p>
                <p className="fs-14 font-semibold text-gray-900 mt-0.5">{data.clinic_name}</p>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${data.location_lat},${data.location_lng}`}
                    className="flex items-start gap-1.5 fs-13 text-gray-600 hover:text-primary mt-1"
                >
                    <BiLocationPlus className="shrink-0 mt-0.5" />
                    {[data.clinic_location, data.clinic_locality, data.clinic_market].filter(Boolean).join(', ')}
                </a>
            </div>
            {(data.clinic_mobile || data.whatsapp_number) && (
                <div className="flex items-center gap-2 mt-3">
                    {data.clinic_mobile && (
                        <TrackedLink href={`tel:${data.clinic_mobile}`} ev_nm="call_click" section_name="book_appointment_page" className="flex-1 flex items-center justify-center gap-1.5 border border-teal-600 text-teal-600 font-semibold fs-13 rounded-lg px-3 py-1.5 hover:bg-teal-50 transition-colors">
                            <BiPhone />{showMaskedMobile(data.clinic_mobile)}
                        </TrackedLink>
                    )}
                    {data.whatsapp_number && (
                        <TrackedLink href={`https://wa.me/${data.whatsapp_number}`} ev_nm="whatsapp_click" section_name="book_appointment_page" className="flex-1 flex items-center justify-center gap-1.5 border border-green-500 text-green-700 font-semibold fs-13 rounded-lg px-3 py-1.5 hover:bg-green-50 transition-colors">
                            <BiLogoWhatsapp />WhatsApp
                        </TrackedLink>
                    )}
                </div>
            )}
        </div>
    );

    if (data.settings.book_by === 'call') {
        return (
            <div className="min-h-screen bg-gray-100">
                <main className="max-w-2xl mx-auto px-4 py-6">
                    <Breadcrumb />
                    <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                        <span className="w-16 h-16 mx-auto mb-4 bg-cyan-100 rounded-full flex items-center justify-center">
                            <BsTelephone className="text-3xl text-cyan-600" />
                        </span>
                        <h1 className="text-xl font-bold text-gray-800 mb-2">Online Booking Not Available</h1>
                        <p className="text-gray-600 fs-14">This clinic doesn&apos;t accept online appointments. Please call to book your appointment.</p>
                        <TrackedLink href={`tel:${data.clinic_mobile}`} ev_nm="call_click" section_name="book_appointment_page" className="mt-5 flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold rounded-lg py-2.5 hover:opacity-90 transition-opacity">
                            <BsTelephone />CALL NOW
                        </TrackedLink>
                        <Link href={profileUrl} className="mt-2 block w-full bg-gray-100 text-gray-700 font-semibold rounded-lg py-2.5 hover:bg-gray-200 transition-colors">
                            Go Back
                        </Link>
                    </div>
                    <div className="mt-4"><SupportCard data={data} /></div>
                </main>
            </div>
        );
    }

    if (data.settings.book_by === 'manually' && data.settings.prime_member_only_booking == 1) {
        return (
            <div className="min-h-screen bg-gray-100">
                <main className="max-w-2xl mx-auto px-4 py-6">
                    <Breadcrumb />
                    <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                        <span className="w-16 h-16 mx-auto mb-4 bg-cyan-100 rounded-full flex items-center justify-center">
                            <BsPersonRaisedHand className="text-3xl text-cyan-600" />
                        </span>
                        <h1 className="text-xl font-bold text-gray-800 mb-2">Online Booking Not Available</h1>
                        <p className="text-gray-600 fs-14">You can hire a <b className="text-orange-500">Personal Assistant</b> to book an appointment or resolve any queries at the clinic directly.</p>
                        <Link href={hirePersonalAssistantPageUrl(data.clinic_state, data.clinic_city)} className="mt-5 flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold rounded-lg py-2.5 hover:opacity-90 transition-opacity">
                            Hire Personal Assistant &amp; Book
                        </Link>
                        <a href={`tel:${support_no}`} className="mt-2 flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 font-semibold rounded-lg py-2.5 hover:bg-gray-200 transition-colors">
                            <BsTelephone />Need Help?
                        </a>
                    </div>
                    <div className="mt-4"><SupportCard data={data} /></div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-5xl mx-auto px-4 py-6">
                <Breadcrumb />
                <div className="grid grid-cols-[1fr_320px] gap-5 items-start">
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <h1 className="font-bold text-gray-800 px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
                            <BiCalendar className="text-primary" />
                            {data.settings.book_by === 'manually' ? 'Request an Appointment' : 'Book an Appointment'}
                        </h1>
                        <BookAppointment
                            state={data.clinic_state}
                            city={data.clinic_city}
                            emergencyBookingClose={data.settings.emergency_booking_close}
                            bookingCloseMessage={data.settings.booking_close_message}
                            open={searchParams.book_appointment === '1'}
                            clinic_id={data.clinic_id}
                            service_loc_id={data.id}
                            doctor_id={data.doctor_id}
                            service_charge={parseInt(data.service_charge)}
                            site_service_charge={parseInt(data.site_service_charge)}
                            settings={data.settings}
                            availability={availableData}
                            slno_groups={data.slno_groups || []}
                            pageUrl={pageUrl}
                            doctorInfo={{
                                name: data.doctor_name,
                                image: doctorProfilePic(data.profile_pic),
                                specialization: data.specialization || '',
                                verified: true,
                                rating: data.rating,
                                experience: data.experience.toString()
                            }}
                            userdetail={userdetail}
                            supportContact={patientSupportContact(data)}
                        />
                    </div>
                    <div className="flex flex-col gap-4 sticky top-[104px]">
                        <DoctorSummaryCard />
                        <SupportCard data={data} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookAppointmentDesktop;
