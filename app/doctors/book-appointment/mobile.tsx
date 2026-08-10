import dynamic from 'next/dynamic';
import Link from 'next/link';
import { BsPersonRaisedHand, BsTelephone } from 'react-icons/bs';
import { TDoctorDetail, TDoctorvailableData } from '@/lib/types/doctor';
import { TsearchParams } from "../doctor-detail/types";
import { doctorDetailPageUrl, hirePersonalAssistantPageUrl } from '@/lib/helper/link';
import { userinfo } from '@/constants/storage_keys';
import LikeShare from '@/app/components/mobile/doctors/doctor-detail/like-share';
import Header from '@/app/components/mobile/header';
import BookAppointment from '@/app/components/mobile/doctors/doctor-detail/book-appointment-form';
import { doctorProfilePic } from '@/lib/image';
const BookAppointmentMobile = ({ data, availableData, searchParams, cookies }: {
    data: TDoctorDetail,
    availableData: TDoctorvailableData,
    searchParams: TsearchParams,
    cookies: Record<string, any>
}) => {
    const pageUrl = doctorDetailPageUrl({ doctor_id: data.doctor_id, service_loc_id: data.id, clinic_id: data.clinic_id, seo_url: data.seo_url, state: data.clinic_state, city: data.clinic_city, market_name: data.clinic_market, type: data.business_type })+"/book-appointment";
    const userdetail = cookies[userinfo] ? JSON.parse(cookies[userinfo]) : null;
    if (data.settings.book_by === "call") {
        return <>
            <Header heading={data.doctor_name + ' in ' + data.clinic_city + ' - Book Appointment'} template="SUBPAGE" />
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
                    <div className="text-center mb-4">
                        <div className="w-20 h-20 mx-auto mb-4 bg-cyan-100 rounded-full flex items-center justify-center">
                            <BsTelephone className="text-4xl text-cyan-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Online Booking Not Available</h2>
                        <p className="text-gray-600 text-sm">This clinic doesn&apos;t accept online appointments. Please directly visit the clinic or call to book your appointment.</p>
                    </div>
                    <div className="space-y-2">
                        <a href={`tel:${data.clinic_mobile}`} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2">
                            <BsTelephone className="text-lg" />
                            CALL NOW
                        </a>
                        <Link href={pageUrl.replace("/book-appointment", "")} className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
                            Go Back
                        </Link>
                    </div>
                </div>
            </div>
        </>
    }
    if(data.settings.book_by === "manually" && data.settings.prime_member_only_booking == 1){
        return <>
            <Header heading={data.doctor_name + ' in ' + data.clinic_city + ' - Book Appointment'} template="SUBPAGE" />
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
                    <div className="text-center mb-4">
                        <div className="w-20 h-20 mx-auto mb-4 bg-cyan-100 rounded-full flex items-center justify-center">
                            <BsPersonRaisedHand className="text-4xl text-cyan-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Online Booking Not Available</h2>
                        <p className="text-gray-600 text-sm">You can hire a <b className='text-orange-400'>Personal Assistant</b> to book an appointment or resolve your any queries for you at the clinic directly.</p>
                    </div>
                    <div className="space-y-2">
                        <a href={`${hirePersonalAssistantPageUrl(data.clinic_state,data.clinic_city)}`} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2">
                            Hire Personal Assistant & Book Appointment
                        </a>
                        <Link href={pageUrl.replace("/book-appointment", "")} className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
                            Go Back
                        </Link>
                    </div>
                </div>
            </div>
        </>
    }
    return <>
        <Header heading={data.doctor_name + ' in ' + data.clinic_city + ' - Book Appointment'} template="SUBPAGE" rightContainer={
            <LikeShare total_liked={data.total_liked || 0} url={pageUrl} doctor_name={data.doctor_name} position={data.position || data.qualification_disp} clinic_name={data.clinic_name} service_charge={data.service_charge} doctor_id={data.doctor_id} clinic_id={data.clinic_id} />
        } />
        <BookAppointment state={data.clinic_state} city={data.clinic_city} emergencyBookingClose={data.settings.emergency_booking_close} bookingCloseMessage={data.settings.booking_close_message} open={searchParams.book_appointment === '1' ? true : false} clinic_id={data.clinic_id} service_loc_id={data.id} doctor_id={data.doctor_id} service_charge={parseInt(data.service_charge)} site_service_charge={parseInt(data.site_service_charge)} settings={data.settings} availability={availableData} slno_groups={data.slno_groups || []} pageUrl={pageUrl} 
        doctorInfo={{
            name:data.doctor_name,
            image:doctorProfilePic(data.profile_pic),
            specialization:data.specialization||"",
            verified:true,
            rating:data.rating,
            experience:data.experience.toString()
        }}
        userdetail={userdetail}
        />
    </>
}
export default BookAppointmentMobile;