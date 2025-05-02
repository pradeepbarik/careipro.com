'use client'
import { useDispatch } from 'react-redux';
import { BiUser, BiPhone, BiChevronRight, BiCommentDetail, BiChevronsRight, BiLocationPlus, BiMap, BiCheck, BiTimeFive, BiCheckCircle } from "react-icons/bi";
import { Slides, SlideUpModal, Input, Button, RadioButton, PriceFormat, SelectSlot, TextArea, SectionHeading } from '@/app/components/mobile/ui';
import Login from '@/app/components/mobile/login';
import { TServiceListPageData } from '@/lib/hooks/massage-service/useMassageService';
import useMassageServiceBooking from '@/lib/hooks/massage-service/useMassageServiceBooking';
import { showBookingModal } from '@/lib/slices/massageServiceSlice';
import SelectAddress from '../user-address-selection';
import moment from '@/lib/helper/date-time';
export const BookBtn = ({ category }: { category: TServiceListPageData['categories'][0] }) => {
    const dispatch = useDispatch();
    const onBookBtnClick = () => {
        dispatch(showBookingModal(category))
    }
    return (
        <>
            <button onClick={onBookBtnClick} className='w-full inline-block border border-color-primary py-2 rounded-md grow text-center font-semibold bg-white px-2'>Book Now</button>
        </>
    )
}
const Bookservice = () => {
    const { step, setStep,onCompletePatientInfo, is_loggedin, openBookingModal, showAddressModal, setShowAddressModal, closeBookingModal, patientInfo, serviceDateTime, setServiceDateTime, setPatientInfo, Slots, onAddAddress, savedAddress, selectedAddress, setSelectedAddress, bookService, bookingDetail, bookingCompleted } = useMassageServiceBooking();
    return (
        <>
            <SlideUpModal heading='Book Apoointment' open={(openBookingModal && is_loggedin)} onClose={closeBookingModal}>
                {openBookingModal === true &&
                    <div>
                        <Slides currentSlide={step}>
                            <div>
                                <SectionHeading heading='Select Slot' />
                                <SelectSlot data={Slots}
                                    selectedDate={serviceDateTime.date}
                                    selectedTime={serviceDateTime.time}
                                    onSelectDate={(date) => { setServiceDateTime({ ...serviceDateTime, date: date }) }}
                                    onSelectTime={(time) => { setServiceDateTime({ ...serviceDateTime, time: time }) }}
                                />
                                <Button disabled={serviceDateTime.time === ""} onClick={() => { setStep(2) }} className='w-full mt-2'>Next &nbsp;<BiChevronsRight className='text-xl' /></Button>
                            </div>
                            <div className='relative'>
                                <div className='mt-2'>
                                    <Input lable='Name' lableIcon={<BiUser className='fs-17' />} value={patientInfo.patient_name} onChange={(e) => { setPatientInfo({ ...patientInfo, patient_name: e.target.value }) }} />
                                </div>
                                <div className='mt-2'>
                                    <Input type='mobile' lable='Mobile Number' lableIcon={<BiPhone className='fs-17' />} value={patientInfo.patient_mobile} onChange={(e) => { setPatientInfo({ ...patientInfo, patient_mobile: e.target.value }) }} />
                                </div>
                                <div className='mt-2 flex gap-4'>
                                    <Input lable='Age' type='number' value={patientInfo.patient_age} onChange={(e) => { setPatientInfo({ ...patientInfo, patient_age: e.target.value }) }} />
                                    <div className=''>
                                        <RadioButton label='Gender' name='gender' value={patientInfo.patient_gender} data={[
                                            { label: "Male", value: "male" },
                                            { label: "Female", value: "female" },
                                        ]} onChange={(v) => { setPatientInfo({ ...patientInfo, patient_gender: v.toString() }) }} />
                                    </div>
                                </div>
                                <div className='mt-2'>
                                    <Input lable='Enter a message about your interest' lableIcon={<BiCommentDetail className='fs-17' />} value={patientInfo.comment} onChange={(e) => { setPatientInfo({ ...patientInfo, comment: e.target.value }) }} />
                                </div>
                                <Button onClick={onCompletePatientInfo} className='w-full mt-2'>Next Select Address &nbsp;<BiChevronsRight className='text-xl' /></Button>
                            </div>
                            <div>
                                {bookingDetail !== null ?
                                    <>
                                        <div className='flex justify-center'>
                                            <div className='h-40 w-44 bg-no-repeat bg-contain flex items-center justify-center relative'>
                                                <BiCheck className='bg-primary w-16 h-16 rounded-full color-white' />
                                                <img src="/icon/booking-success.png" className='absolute top-0 left-0 w-full h-full zoomOut delay-2' />
                                            </div>
                                        </div>
                                        <div className='text-center font-bold fs-18 mt-2 py-2'>
                                            Thank you for choosing our services! we’ll assign the best therapist to ensure you have a wonderful experience. See you soon!
                                        </div>
                                        <div>
                                            <Button className='w-full mt-4' onClick={bookingCompleted}>Ok</Button>
                                        </div>
                                    </> :
                                    <>
                                        <SectionHeading heading='User Info'>
                                            <span className='border border-color-primary color-primary px-2 rounded-md fs-14 ml-auto' onClick={() => { setStep(2) }}>Edit</span>
                                        </SectionHeading>
                                        <div className='border rounded-md px-2 py-1 bg-gray-100'>
                                            <div className='font-semibold flex gap-2'>
                                                <span className='dot'>{patientInfo.patient_name}</span>
                                                <span className='dot'>{patientInfo.patient_mobile}</span>
                                            </div>
                                            {patientInfo.comment &&
                                                <div>
                                                    {patientInfo.comment}
                                                </div>
                                            }
                                        </div>
                                        <SectionHeading heading='Service Time'>
                                            <span className='border border-color-primary color-primary px-2 rounded-md fs-14 ml-auto' onClick={() => { setStep(1) }}>Edit</span>
                                        </SectionHeading>
                                        <div className='border rounded-md px-2 py-1 bg-gray-50 flex items-center gap-2'>
                                            <BiTimeFive className='color-secondary' /> {moment(serviceDateTime.date + " " + serviceDateTime.time).format('D MMM hh:mm A')}
                                        </div>
                                        <div className='mt-2 px-2 py-2 font-semibold flex items-center border rounded-md shadow-sm' onClick={() => { setShowAddressModal(true) }}>
                                            <BiLocationPlus className='text-2xl color-secondary' />
                                            <span className='fs-17 ml-2 color-secondary'>Enter New Address</span>
                                            <BiChevronRight className='text-2xl ml-auto' />
                                        </div>
                                        <SectionHeading heading='Saved Address' />
                                        <div>
                                            {savedAddress.map((address, i) =>
                                                <div key={`address-${i}`} className='border px-2 py-2 rounded-md bg-gray-100 mb-2 relative flex' onClick={() => { setSelectedAddress(address) }}>
                                                    <div>
                                                        <div className='flex items-center gap-1'>
                                                            <BiMap />
                                                            <span className='font-semibold capitalize'>
                                                                {address.bookmark_name}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            {address.full_address}
                                                        </div>
                                                    </div>
                                                    <div className='ml-auto inline-flex items-center'>
                                                        {(selectedAddress && address._id === selectedAddress._id) &&
                                                            <BiCheckCircle className='color-primary text-xl' />
                                                        }
                                                    </div>

                                                </div>
                                            )}
                                        </div>
                                        <Button className='w-full' onClick={bookService}>Book Now</Button>
                                    </>}

                            </div>
                        </Slides>
                    </div>
                }
            </SlideUpModal>
            {is_loggedin === false &&
                <SlideUpModal heading='Login/Signup' open={(openBookingModal && !is_loggedin)} onClose={() => { }}>
                    <Login onLoginSuccess={() => { }} />
                </SlideUpModal>
            }
            {step === 3 &&
                <SlideUpModal heading='Selet your address' className='px-0' zIndex={2} open={showAddressModal} onClose={() => { setShowAddressModal(false) }}>
                    <SelectAddress onSelect={onAddAddress} page_source='RELAXATION' />
                </SlideUpModal>
            }
        </>
    )
}
export default Bookservice