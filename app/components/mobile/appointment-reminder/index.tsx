'use client'
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { BiBell } from "react-icons/bi";
import 'swiper/css';
import 'swiper/css/pagination';
import useReminder from '@/lib/hooks/useReminder';
import { formatDoctorName } from '@/lib/helper/format-text';
import { TAppointment } from '@/lib/slices/reminderSlice';
import PlushingLoader from '@/app/components/common/plushing-loader';
import moment from '@/lib/helper/date-time';
const ConfirmedAppointment = ({ appointment }: { appointment: TAppointment }) => {
    return (
        <div className='p-3 shadow-lg rounded-xl border-l-4 border-cyan-500 bg-gradient-to-br from-white to-green-50'>
            <div className='flex items-start justify-between mb-2'>
                <div className='flex-1'>
                    <div className='text-sm'>
                        <span className='font-bold text-gray-800'>{appointment.patient_name}</span>
                        <span className='text-gray-600'> has an appointment with </span>
                        <span className='font-semibold text-cyan-700'>{formatDoctorName(appointment.doctor_name)}</span>
                    </div>
                </div>
                <div className='ml-2 bg-cyan-500 text-white rounded-full p-1.5'>
                    <BiBell size={14} />
                </div>
            </div>
            
            <div className='bg-white rounded-lg px-2 py-1.5 shadow-sm flex items-center justify-between'>
                <div>
                    <span className='text-xs text-gray-500'>Serial No. </span>
                    <span className='font-bold text-cyan-600'>{appointment.today_booking_id}</span>
                </div>
                <div>
                    <span className='text-xs text-gray-500'>Date </span>
                    <span className='font-semibold text-gray-700 text-xs'>{appointment.consult_date}</span>
                </div>
            </div>

            {appointment.consulting_timing_messages.trim() &&
                <div className='bg-cyan-100 border border-cyan-300 rounded-lg p-1.5 mt-2'>
                    <div className='flex items-start gap-1.5 text-xs text-cyan-800'>
                        <BiBell className='mt-0.5 flex-shrink-0' size={12} />
                        <span className='font-medium'>{appointment.consulting_timing_messages}</span>
                    </div>
                </div>
            }
        </div>
    );
}

const PendingAppointment = ({ appointment }: { appointment: TAppointment }) => {
    return (
        <div className='p-3 shadow-lg rounded-xl border-l-4 border-orange-500 bg-gradient-to-br from-white to-yellow-50 relative overflow-hidden'>
            <div className='flex items-start justify-between mb-2'>
                <div className='flex-1 pr-8'>
                    <div className='inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded-full mb-1'>
                        <div className='scale-75'>
                            <PlushingLoader className='!bg-orange-500 !shadow-orange-400' />
                        </div>
                        Waiting For Confirmation
                    </div>
                    <div className='text-sm'>
                        <span className='font-bold text-gray-800'>{appointment.patient_name}</span>
                        <span className='text-gray-600'> booking request with </span>
                        <span className='font-semibold text-orange-700'>{formatDoctorName(appointment.doctor_name)}</span>
                    </div>
                </div>
            </div>
            
            <div className='flex items-center justify-between gap-2'>
                <div className='bg-white rounded-lg px-2 py-1.5 shadow-sm flex-1'>
                    <div className='text-xs text-gray-500'>Request Time</div>
                    <div className='font-semibold text-gray-700 text-xs'>{moment(appointment.booking_time).format('LL hh:mm A')}</div>
                </div>
                <a href={`tel:${appointment.patient_support_contact_no}`} className='bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-colors'>
                    Need Help?
                </a>
            </div>
            {appointment.consulting_timing_messages.trim() &&
                <div className='bg-yellow-100 border border-yellow-300 rounded-lg p-1.5 mt-2'>
                    <div className='flex items-start gap-1.5 text-xs text-yellow-800'>
                        <BiBell className='mt-0.5 flex-shrink-0' size={12} />
                        <span className='font-medium'>{appointment.consulting_timing_messages}</span>
                    </div>
                </div>
            }
            
            <div className='absolute bottom-0 right-0 w-16 h-16 bg-orange-200 rounded-tl-full opacity-20'></div>
        </div>
    );
}

const AppointmentReminder = ({ position, doctor_id, clinic_id }: { position: string, doctor_id?: number, clinic_id?: number }) => {
    const { isBrowser, is_loggedin, user_type, appoinments } = useReminder({ doctor_id: doctor_id, clinic_id: clinic_id })
    
    
    if (isBrowser && position && is_loggedin && (user_type === "user" || user_type === "agency") && appoinments.length > 0) {
        return (
            <>
                {createPortal(<div>
                    {(appoinments.length === 1) ?
                        <div className='m-2'>
                            {appoinments[0].status === 'confirmed' ? 
                                <ConfirmedAppointment appointment={appoinments[0]} /> :
                                <PendingAppointment appointment={appoinments[0]} />
                            }
                        </div> :
                        <div className='m-2'>
                            <Swiper
                                slidesPerView={'auto'}
                                spaceBetween={10}
                            >
                                {appoinments.map((appointment) =>
                                    <SwiperSlide style={{ width: `80%` }} key={appointment.id}>
                                        {appointment.status === 'confirmed' ? 
                                            <ConfirmedAppointment appointment={appointment} /> :
                                            <PendingAppointment appointment={appointment} />
                                        }
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        </div>
                    }
                </div>, document.getElementById(position) || document.body)}
            </>
        )
    } else {
        return <></>
    }
}
export default AppointmentReminder;