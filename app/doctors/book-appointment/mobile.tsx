import { TDoctorDetail, TDoctorvailableData } from '@/lib/types/doctor';
import { TsearchParams } from "../doctor-detail/types";
import { doctorDetailPageUrl } from '@/lib/helper/link';
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
    return <>
        <Header heading={data.doctor_name + ' in ' + data.clinic_city + ' - Book Appointment'} template="SUBPAGE" rightContainer={
            <LikeShare total_liked={data.total_liked || 0} url={pageUrl} doctor_name={data.doctor_name} position={data.position || data.qualification_disp} clinic_name={data.clinic_name} service_charge={data.service_charge} doctor_id={data.doctor_id} clinic_id={data.clinic_id} />
        } />
        <BookAppointment emergencyBookingClose={data.settings.emergency_booking_close} bookingCloseMessage={data.settings.booking_close_message} open={searchParams.book_appointment === '1' ? true : false} clinic_id={data.clinic_id} service_loc_id={data.id} doctor_id={data.doctor_id} service_charge={parseInt(data.service_charge)} site_service_charge={parseInt(data.site_service_charge)} settings={data.settings} availability={availableData} slno_groups={data.slno_groups || []} pageUrl={pageUrl} 
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