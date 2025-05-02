'use client'
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { BiBell } from "react-icons/bi";
import 'swiper/css';
import 'swiper/css/pagination';
import useReminder from '@/lib/hooks/useReminder';
import { formatDoctorName } from '@/lib/helper/format-text';
const AppointmentReminder = ({ position, doctor_id, clinic_id }: { position: string, doctor_id?: number, clinic_id?: number }) => {
    const { isBrowser, is_loggedin, user_type, appoinments } = useReminder({ doctor_id: doctor_id, clinic_id: clinic_id })
    if (isBrowser && position && is_loggedin && (user_type === "user" || 1 == 1) && appoinments.length > 0) {
        return (
            <>
                {createPortal(<div>
                    {appoinments.length === 1 ?
                        <div className='p-2 m-2 relative shadow-md rounded-md' style={{backgroundColor:"#d7e7e6"}} >
                            {/* <BiBell className='absolute top-2' /> */}
                            <div className='fs-16'>
                                <span className='font-semibold'>{appoinments[0].patient_name}</span> has an appointment with <span className='font-semibold'>{formatDoctorName(appoinments[0].doctor_name)}</span>
                            </div>
                            <div className='fs-15'>
                                Visit clinic <span className='font-semibold'>{appoinments[0].clinic}</span>
                            </div>
                            {appoinments[0].consulting_timing_messages &&
                                <div className='font-semibold fs-15'>
                                    <BiBell className='inline mr-1' />{appoinments[0].consulting_timing_messages}
                                </div>
                            }
                            <div className='font-semibold flex justify-between'>
                                <span>
                                    Sl No.&nbsp;
                                    <span className='badge bg-primary color-white'>{appoinments[0].today_booking_id}</span>
                                </span>
                                <span>
                                    Date&nbsp;
                                    <span className='badge color-white bg-pink'>{appoinments[0].consult_date}</span>
                                </span>
                            </div>
                        </div> :
                        <div className='m-2'>
                            <Swiper
                                slidesPerView={'auto'}
                                spaceBetween={10}
                            >
                                {appoinments.map((appoinment) =>
                                    <SwiperSlide style={{width:`80%`}}>
                                        <div className='p-2 shadow-md rounded-md' style={{background:"#d7e7e6"}} >
                                            {/* <BiBell className='absolute top-2' /> */}
                                            <div className='fs-16'>
                                                <span className='font-semibold'>{appoinment.patient_name}</span> has an appointment with <span className='font-semibold'>{formatDoctorName(appoinment.doctor_name)}</span>
                                            </div>
                                            <div className='fs-15'>
                                                Visit clinic <span className='font-semibold'>{appoinment.clinic}</span>
                                            </div>
                                            {appoinments[0].consulting_timing_messages &&
                                                <div className='font-semibold fs-15'>
                                                    <BiBell className='inline mr-1' />{appoinment.consulting_timing_messages}
                                                </div>
                                            }
                                            <div className='font-semibold flex justify-between'>
                                                <span>
                                                    Sl No.&nbsp;
                                                    <span className='badge bg-primary color-white'>{appoinment.today_booking_id}</span>
                                                </span>
                                                <span>
                                                    Date&nbsp;
                                                    <span className='badge color-white bg-pink'>{appoinment.consult_date}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </SwiperSlide>)}
                            </Swiper>
                        </div>}
                </div>, document.getElementById(position) || document.body)}
            </>
        )
    } else {
        return <></>
    }
}
export default AppointmentReminder;