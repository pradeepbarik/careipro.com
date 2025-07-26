'use client'
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';
import { BiUser, BiPhone, BiCheck, BiCalendar, BiSolidChevronRight, BiHome } from "react-icons/bi";
import { SlideUpModal, Input, Button, RadioButton, PriceFormat, TextArea } from '@/app/components/mobile/ui';
import DropDown from '@/app/components/mobile/ui/drop-down';
import useBooking from '@/lib/hooks/useBooking';
import { TDoctorvailableData, TDoctorDetail } from '@/lib/types/doctor';
import { RootState } from '@/lib/store';
import Login from '@/app/components/mobile/login';
const BookAppointment = ({ open, service_charge, site_service_charge, service_loc_id, doctor_id, clinic_id, availability, settings, emergencyBookingClose, bookingCloseMessage }: { open: boolean, emergencyBookingClose?: number, bookingCloseMessage?: string, service_loc_id: number, clinic_id: number, doctor_id: number, service_charge: number, site_service_charge: number, settings: TDoctorDetail['settings'], availability?: TDoctorvailableData }) => {
    const autoSuggestRef = useRef<HTMLInputElement>(null);
    const { user_info } = useSelector((state: RootState) => {
        return {
            user_info: state.authSlice.user_info
        }
    })
    const { showModal, setShowModal, showSuggestions, setShowSuggestion, onSelectSuggestedPatient, patients, onOk, patientInfo, setPatientInfo, booingDetail, bookAppointment } = useBooking({ service_loc_id, doctor_id, clinic_id: clinic_id, open: open, settings: settings, availability: availability });
    const [showLoginModal, setShowLoginModal] = useState(false);
    const onBookbtnClick = () => {
        if (user_info === null) {
            setShowLoginModal(true);
            return;
        }
        setShowModal(true)
    }
    const onloginSuccess = () => {
        setShowLoginModal(false);
        setShowModal(true);
    }
    if (emergencyBookingClose == 1) {
        return (
            <button className="button w-full h-10 fs-16" onClick={() => { toast.warning(bookingCloseMessage) }}>Book Appointment</button>
        )
    }
    return (
        <>
            {user_info === null ?
                <button className="button w-full h-10 fs-16" onClick={onBookbtnClick}>Login & Book Appointment</button> :
                <button className="button w-full h-10 fs-16" onClick={onBookbtnClick}>Book Appointment</button>
            }
            <SlideUpModal heading='Book Apoointment' open={showModal} onClose={() => { setShowModal(false) }}>
                {booingDetail !== null ?
                    <>
                        <div className='flex justify-center'>
                            <div className='h-40 w-44 bg-no-repeat bg-contain flex items-center justify-center relative'>
                                <BiCheck className='bg-primary w-16 h-16 rounded-full color-white' />
                                <img src="/icon/booking-success.png" className='absolute top-0 left-0 w-full h-full zoomOut delay-2' />
                            </div>
                        </div>
                        <div className='text-center font-bold fs-18 mt-2 py-2'>
                            Appointment Booked Successfully
                        </div>
                        <div>
                            Your Slno <span className='badge primary fs-17'>{booingDetail.today_booking_id}</span>
                        </div>
                        <div>
                            <Button className='w-full mt-4' onClick={onOk}>Ok</Button>
                        </div>
                    </>
                    : <>
                        <div className='p-2'>
                            <div className='border px-2 py-2 flex gap-1 items-center rounded-md bg-primary-20 font-semibold fs-16 mb-2'>
                                <BiCalendar />
                                Your Consulting date : {moment(availability?.available_date).format("DD(ddd) MMM")}
                            </div>
                            <div className='relative'>
                                {(user_info?.user_type === "clinic_staff" || user_info?.user_type === "NSCM" || user_info?.user_type === "agency") ?
                                    <Input type='mobile' ref={autoSuggestRef} lable='Mobile Number' lableIcon={<BiPhone className='fs-17' />} value={patientInfo.patient_mobile} onChange={(e) => { setPatientInfo({ ...patientInfo, patient_mobile: e.target.value }) }} onBlur={() => { setShowSuggestion(false) }} onFocus={() => { patients.length && setShowSuggestion(true) }} />
                                    :
                                    <Input lable='Patient Name' lableIcon={<BiUser className='fs-17' />} value={patientInfo.patient_name} onChange={(e) => { setPatientInfo({ ...patientInfo, patient_name: e.target.value }) }} onBlur={() => { setShowSuggestion(false) }} onFocus={() => { patients.length && setShowSuggestion(true) }} />
                                }
                                <DropDown targetRef={autoSuggestRef} show={showSuggestions} maxHeight={150}>
                                    {patients.map((patient) =>
                                        <div key={patient.id} className='px-2 py-1 border-b flex items-center'>
                                            <div onClick={() => { onSelectSuggestedPatient(patient) }}>
                                                <div className='flex gap-2 fs-15'>
                                                    <span className='dot font-semibold'>{patient.patient_name}</span>
                                                    <span className='dot font-semibold'>{patient.patient_mobile}</span>
                                                    <span className='dot font-semibold'>Age: {patient.patient_age} Yrs</span>
                                                </div>
                                                <div className='font-semibold color-text-light flex items-center gap-1'>
                                                    <BiHome />
                                                    {patient.patient_address}
                                                </div>
                                            </div>
                                            <BiSolidChevronRight className='ml-auto text-xl' />
                                        </div>
                                    )}
                                </DropDown>
                            </div>
                            <div className='mt-3'>
                                {(user_info?.user_type === "clinic_staff" || user_info?.user_type === "NSCM" || user_info?.user_type === "agency") ?
                                    <Input lable='Patient Name' lableIcon={<BiUser className='fs-17' />} value={patientInfo.patient_name} onChange={(e) => { setPatientInfo({ ...patientInfo, patient_name: e.target.value }) }} />
                                    :
                                    <Input type='mobile' lable='Mobile Number' lableIcon={<BiPhone className='fs-17' />} value={patientInfo.patient_mobile} onChange={(e) => { setPatientInfo({ ...patientInfo, patient_mobile: e.target.value }) }} />
                                }
                            </div>
                            <div className='mt-3 flex gap-3'>
                                <Input lable='Patient Age' value={patientInfo.patient_age} onChange={(e) => { setPatientInfo({ ...patientInfo, patient_age: e.target.value }) }} />
                                <div>
                                    <RadioButton label='Gender' name='gender' value={patientInfo.patient_gender} data={[
                                        { label: "Male", value: "male" },
                                        { label: "Female", value: "female" },
                                    ]} onChange={(v) => { setPatientInfo({ ...patientInfo, patient_gender: v.toString() }) }} />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <TextArea className='font-semibold fs-16' value={patientInfo.patient_address} onChange={(e) => { setPatientInfo({ ...patientInfo, patient_address: e.target.value }) }} lable='Patient Address' />
                            </div>
                        </div>
                        <div className='font-semibold py-2 px-2 fs-16 bg-slate-100'>
                            Consultation Fee (Payble at clinic by cash)
                        </div>
                        <div className='font-semibold'>
                            <div className='flex py-1 fs-15'>
                                <span>Doctor Fee</span>
                                <span className='ml-auto'>
                                    <PriceFormat amount={service_charge} />
                                </span>
                            </div>
                            <div className='flex py-1 fs-15'>
                                <span>Online Service charge</span>
                                <span className='ml-auto'><PriceFormat amount={site_service_charge} /></span>
                            </div>
                            <div className='flex fs-18 color-primary'>
                                <span>Total Amount</span>
                                <span className='ml-auto'><PriceFormat amount={(service_charge + site_service_charge)} /></span>
                            </div>
                        </div>
                        <Button className='w-full mt-4' onClick={bookAppointment}>Book Appointment</Button>
                    </>
                }
            </SlideUpModal>
            {user_info === null &&
                <SlideUpModal open={showLoginModal} heading='Login / Signup' onClose={() => { setShowLoginModal(false) }}>
                    <Login allowLoggedInUser={true} onLoginSuccess={onloginSuccess} />
                </SlideUpModal>
            }
        </>
    )
}
export default BookAppointment;