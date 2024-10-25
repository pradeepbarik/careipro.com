import { BsTelephone } from "react-icons/bs";
import Header from '@/app/components/mobile/header';
import { SectionHeading } from '@/app/components/mobile/ui';
import WeeklyConsultingTiming from "@/app/components/mobile/doctors/doctor-detail/weekly-consulting-timing";
import Nearme from '@/assets/icon/nearme';
import { TDoctorDetail } from '@/lib/types/doctor';
import { doctorProfilePic } from '@/lib/image';
import { formatCurrency } from '@/lib/helper/format-text';
const DoctorDetailMobile = async ({ data }: {
    data: TDoctorDetail
}) => {
    return (<>
        <Header heading='Doctor Information' template="SUBPAGE" />
        <div className='flex px-2 py-2 mt-2 gap-3 bg-white'>
            <img src={doctorProfilePic(data.profile_pic)} alt={`${data.doctor_name} profile pic`} className='h-20 w-20 rounded-md' />
            <div className='flex flex-col'>
                <h1 className='font-semibold text-lg'>{data.doctor_name}</h1>
                <span>{data.position}</span>
                {data.qualification_disp && <span>{data.qualification_disp}</span>}
                {/* <span className='font-semibold'>{data.specialization}</span> */}
                <span>{data.experience} Years of Exp in<br /> <span className='font-semibold'>{data.specialization}</span></span>
            </div>
            <span className="ml-auto flex items-center">
                <span className='font-bold text-xl'>{formatCurrency(data.service_charge)}</span>
            </span>
        </div>
        <SectionHeading heading='Clinic Information' />
        <div className='bg-white px-2 py-2'>
            <div className='flex gap-2 items-center'>
                <img src='/icon/clinic-icon.png' className='w-10 h-10' />
                <div className='flex flex-col'>
                    <h2 className='font-semibold fs-17 color-primary'>{data.clinic_name}</h2>
                    <span>{data.clinic_locality} in {data.clinic_market}, {data.clinic_city}</span>
                </div>
                {/* <span className="ml-auto flex flex-col items-center"> */}
                {/* <Nearme className="border rounded-md p-1 w-12 h-10" style={{ fontSize: '2.2rem', background: "#f7f7f7" }} /> */}
                {/* <span className="font-semibold color-primary">Direction</span> */}
                {/* </span> */}
            </div>
            <div className="flex justify-between mt-3">
                <span className="flex flex-col items-center">
                    <Nearme className="border rounded-md p-1 w-12 h-10" style={{ fontSize: '2.2rem', background: "#f7f7f7" }} pathStyle={{ stroke: "black" }} />
                    <span className="font-semibold">Direction</span>
                </span>
                <span className="flex flex-col items-center">
                    <BsTelephone className="border rounded-md p-1 w-12 h-10" style={{ fontSize: '2.2rem', background: "#f7f7f7" }} />
                    <span className="font-semibold">Call Now</span>
                </span>

                <span className="flex flex-col items-center">
                    <Nearme className="border rounded-md p-1 w-12 h-10" style={{ fontSize: '2.2rem', background: "#f7f7f7" }} pathStyle={{ stroke: "black" }} />
                    <span className="font-semibold">All Doctors</span>
                </span>
            </div>
            {/* <div className="mt-2 flex">
                <a href={`tel:${data.clinic_mobile}`} className="ml-auto button flex items-center gap-2" data-variant="outlined" data-color="secondary">
                    <BsTelephone />
                    Call Now
                </a>
            </div> */}
            {/* <ClinicInfo data={data} /> */}
        </div>
        <SectionHeading heading='Consulting Timing' />
        <div className='bg-white px-2 py-2'>
            {data.availability === "per_week" && <WeeklyConsultingTiming data={{
                sunday: data.sunday,
                sunday_1st_session_start: data.sunday_1st_session_start,
                sunday_1st_session_end: data.saturday_1st_session_end,
                sunday_2nd_session_start: data.sunday_2nd_session_start,
                sunday_2nd_session_end: data.sunday_2nd_session_end,
                monday: data.monday,
                monday_1st_session_start: data.monday_1st_session_start,
                monday_1st_session_end: data.saturday_1st_session_end,
                monday_2nd_session_start: data.monday_2nd_session_start,
                monday_2nd_session_end: data.monday_2nd_session_end,
                tuesday: data.tuesday,
                tuesday_1st_session_start: data.tuesday_1st_session_start,
                tuesday_1st_session_end: data.saturday_1st_session_end,
                tuesday_2nd_session_start: data.tuesday_2nd_session_start,
                tuesday_2nd_session_end: data.tuesday_2nd_session_end,
                wednesday: data.wednesday,
                wednesday_1st_session_start: data.wednesday_1st_session_start,
                wednesday_1st_session_end: data.saturday_1st_session_end,
                wednesday_2nd_session_start: data.wednesday_2nd_session_start,
                wednesday_2nd_session_end: data.wednesday_2nd_session_end,
                thursday: data.thursday,
                thursday_1st_session_start: data.thursday_1st_session_start,
                thursday_1st_session_end: data.saturday_1st_session_end,
                thursday_2nd_session_start: data.thursday_2nd_session_start,
                thursday_2nd_session_end: data.thursday_2nd_session_end,
                friday: data.friday,
                friday_1st_session_start: data.friday_1st_session_start,
                friday_1st_session_end: data.saturday_1st_session_end,
                friday_2nd_session_start: data.friday_2nd_session_start,
                friday_2nd_session_end: data.friday_2nd_session_end,
                saturday: data.saturday,
                saturday_1st_session_start: data.saturday_1st_session_start,
                saturday_1st_session_end: data.saturday_1st_session_end,
                saturday_2nd_session_start: data.saturday_2nd_session_start,
                saturday_2nd_session_end: data.saturday_2nd_session_end,
            }} />}
        </div>
        {data.settings.book_by === "app" && <div className="bg-white fixed w-full px-2 py-1" style={{ bottom: 0 }}>
            <button className="button w-full h-10 fs-16">Book Appointment</button>
        </div>}
        {data.settings.book_by === "call" &&
            <div className="bg-white fixed w-full px-2 py-1" style={{ bottom: 0 }}
            >
                <button className="button w-full h-14 fs-16 flex flex-col">
                    <span className="flex items-center">
                        <BsTelephone className="" style={{ fontSize: '1rem' }} />
                        Call Now
                    </span>
                    <span className="text-sm">For Appointment</span>
                </button>
            </div>}
    </>)
}
export default DoctorDetailMobile;