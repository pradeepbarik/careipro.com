'use client'

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from 'next/navigation'
import { Button, PriceFormat } from "../../ui"
import { useSelector } from "react-redux";
import { RootState } from '@/lib/store';
import { BiCalendar, BiUser, BiPhone, BiHome, BiSolidChevronRight, BiX, BiCopy } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { MdVerified, MdCheckCircle } from "react-icons/md";
import { Fragment } from "react";
import Input from "../../ui/input";
import TextArea from "../../ui/textarea";
import RadioButton from "../../ui/radio-button";
import DropDown from '@/app/components/mobile/ui/drop-down';
import useBooking from "@/lib/hooks/useBooking";
import moment from 'moment';
import { TDoctorvailableData, TDoctorDetail } from '@/lib/types/doctor';
import Loader from "@/app/components/common/loader";
import { toast } from "react-toastify";
import Link from "next/link";
import { formatDoctorName } from "@/lib/helper/format-text";
import Login from '@/app/components/mobile/login';

type TDoctorInfo = {
    name: string,
    specialization: string,
    rating?: number,
    experience?: string,
    verified?: boolean,
    image?: string
}
const BookAppointmentForm = ({ open, service_charge, site_service_charge, service_loc_id, doctor_id, clinic_id, availability, settings, emergencyBookingClose, bookingCloseMessage, slno_groups, pageUrl, doctorInfo, userdetail }: { open: boolean, emergencyBookingClose?: number, bookingCloseMessage?: string, service_loc_id: number, clinic_id: number, doctor_id: number, service_charge: number, site_service_charge: number, settings: TDoctorDetail['settings'], availability?: TDoctorvailableData, slno_groups: TDoctorDetail['slno_groups'], pageUrl: string, doctorInfo?: TDoctorInfo, userdetail: any }) => {
    const router = useRouter();
    const autoSuggestRef = useRef<HTMLInputElement>(null);
    const addressFieldRef = useRef<HTMLDivElement>(null);
    const [remainingSeconds, setRemainingSeconds] = useState<number>(0);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            // You can add a toast notification here if needed
            toast.success("Copied to clipboard!");
        });
    };

    const handleAgeBlur = () => {
        setTimeout(() => {
            if (addressFieldRef.current) {
                addressFieldRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };

    const { user_info } = useSelector((state: RootState) => {
        return {
            user_info: state.authSlice.user_info
        }
    })
    const { showSuggestions, setShowSuggestion, onSelectSuggestedPatient, patients, patientInfo, setPatientInfo, booingDetail, bookAppointment, createBookingRequest, consultDates, consultDate, setConsultDate, group_name, setGroupName, patientExtraInfo, setPatientExtraInfo, rebokeAppointment, loading, refundAlert, paymentFailed, retryPayment, txnDetail } = useBooking({ service_loc_id, doctor_id, clinic_id: clinic_id, open: open, settings: settings, availability: availability, pageUrl: pageUrl });
    const expectedWaitingMinutes = useMemo(() => {
        if(!booingDetail || booingDetail.booking_status !== 'waiting') {
            return 0;
        }
        const waitingTime = booingDetail?.expeted_waiting_time;
        if (!waitingTime) return 0;
        const parsed = Number(waitingTime);
        return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 0;
    }, [booingDetail]);

    useEffect(() => {
        if (!booingDetail || booingDetail.booking_status !== 'waiting' || expectedWaitingMinutes <= 0) {
            setRemainingSeconds(0);
            return;
        }

        const parsedBookingTime = booingDetail.booking_date ? new Date(booingDetail.booking_date).getTime() : Date.now();
        const bookingTime = Number.isFinite(parsedBookingTime) ? parsedBookingTime : Date.now();
        const endTime = bookingTime + (expectedWaitingMinutes * 60 * 1000);

        const updateRemaining = () => {
            const rawDiff = Math.floor((endTime - Date.now()) / 1000);
            const diff = Number.isFinite(rawDiff) ? Math.max(0, rawDiff) : 0;
            setRemainingSeconds(diff);
        };

        updateRemaining();
        const timer = setInterval(updateRemaining, 1000);
        return () => clearInterval(timer);
    }, [booingDetail, expectedWaitingMinutes]);

    const waitingTimeLabel = useMemo(() => {
        const safeRemainingSeconds = Number.isFinite(remainingSeconds) ? Math.max(0, remainingSeconds) : 0;
        const minutes = Math.floor(safeRemainingSeconds / 60);
        const seconds = safeRemainingSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, [remainingSeconds]);

    if (booingDetail && booingDetail.booking_status === 'waiting') {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
                    <button
                        onClick={() => { router.push(pageUrl.replace('/book-appointment', '')) }}
                        className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                    >
                        <BiX className="text-2xl text-gray-700" />
                    </button>

                    <div className="text-center mb-4">
                        <div className="w-20 h-20 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Booking Request Sent</h2>
                        <p className="text-gray-600 text-sm">You will be notified once the clinic approves your booking.</p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                        <p className="text-sm text-amber-800 mb-2">Status: <span className="font-semibold">Waiting for clinic approval</span></p>
                        {booingDetail?.expeted_waiting_time && (
                            <p className="text-xs text-amber-700 mb-3">Expected waiting time: <b>{expectedWaitingMinutes} Min.</b></p>
                        )}
                        {expectedWaitingMinutes > 0 && (
                            <div className="flex items-center justify-between bg-white border border-amber-300 rounded-md px-3 py-2">
                                <span className="text-xs text-gray-600">Estimated time left</span>
                                <span className="text-lg font-bold text-amber-700">{waitingTimeLabel}</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={() => { router.refresh() }}
                            className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                            Refresh Status
                        </button>
                        <button
                            onClick={() => { router.push(pageUrl.replace('/book-appointment', '')) }}
                            className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    if (booingDetail) {
        // on booking success show booking details and option to share booking details
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
                    {/* Close Icon */}
                    <button
                        onClick={() => { router.push("/") }}
                        className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                    >
                        <BiX className="text-2xl text-gray-700" />
                    </button>

                    {/* Success Header */}
                    <div className="bg-gradient-to-br from-green-400 to-green-500 p-6 text-center rounded-t-2xl">
                        <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                            <MdCheckCircle className="text-green-500 text-5xl animate-bounce" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
                        <p className="text-white/90 text-sm">Your appointment has been successfully booked</p>
                    </div>

                    {/* Booking Details */}
                    <div className="p-6">
                        {/* Doctor Card */}
                        {doctorInfo && (
                            <div className="mb-4 pb-4 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-teal-100 to-teal-200 flex-shrink-0">
                                        {doctorInfo.image ? (
                                            <img src={doctorInfo.image} alt={doctorInfo.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-teal-600 font-bold">
                                                {doctorInfo.name?.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">{doctorInfo.name}</h3>
                                        <p className="text-xs text-gray-600">{doctorInfo.specialization}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Booking Info */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <BiUser className="text-primary text-xl flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Patient Name</p>
                                    <p className="font-semibold text-gray-800">{patientInfo.patient_name}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <BiCalendar className="text-primary text-xl flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Appointment Consultation Date</p>
                                    <p className="font-semibold text-gray-800">
                                        {moment(booingDetail.consult_date).format("ddd, DD MMM YYYY")}
                                    </p>
                                </div>
                            </div>

                            {booingDetail.today_booking_id && (
                                <div className="flex items-center gap-3 p-3 bg-primary-20 rounded-lg border-2 border-primary">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                        #
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-600">Token No.(Serial no)</p>
                                        <p className="font-bold text-primary text-lg">{booingDetail.today_booking_id}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Action Buttons */}
                        <div className="space-y-2">
                            <button
                                onClick={() => { router.push("/") }}
                                className="w-full py-3 bg-red-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={rebokeAppointment}
                                className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                            >
                                Book For Another Patient
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if (refundAlert) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
                    {/* Close Icon */}
                    <button
                        onClick={() => { router.refresh() }}
                        className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                    >
                        <BiX className="text-2xl text-gray-700" />
                    </button>

                    {/* Alert Header */}
                    <div className="text-center mb-4">
                        <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Booking Failed</h2>
                        <p className="text-gray-600 text-sm">{`We couldn't complete your appointment booking`}</p>
                    </div>

                    {/* Transaction IDs */}
                    {txnDetail && (
                        <div className="space-y-2 mb-4">
                            {/* Transaction ID */}
                            {txnDetail.txnid && (
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
                                            <p className="text-sm font-mono font-semibold text-gray-800 truncate">{txnDetail.txnid}</p>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(txnDetail.txnid)}
                                            className="flex-shrink-0 p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                            title="Copy Transaction ID"
                                        >
                                            <BiCopy className="text-lg text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Refund Transaction ID */}
                            {txnDetail.refund_order_id && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-blue-600 mb-1">Refund Transaction ID</p>
                                            <p className="text-sm font-mono font-semibold text-blue-800 truncate">{txnDetail.refund_order_id}</p>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(txnDetail.refund_order_id!)}
                                            className="flex-shrink-0 p-2 bg-white border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors"
                                            title="Copy Refund Transaction ID"
                                        >
                                            <BiCopy className="text-lg text-blue-600" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Refund Information */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-blue-900 text-sm mb-1">Refund Information</h3>
                                <p className="text-blue-800 text-xs leading-relaxed">
                                    {`Don't worry! The amount deducted from your account will be automatically refunded within 1-2 business days.`}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-2 mb-6">
                        <div className="flex items-start gap-2 text-xs text-gray-600">
                            <span className="text-green-600 mt-0.5">✓</span>
                            <span>Refund process has been initiated automatically</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-gray-600">
                            <span className="text-green-600 mt-0.5">✓</span>
                            <span>No action required from your side</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-gray-600">
                            <span className="text-green-600 mt-0.5">✓</span>
                            <span>You can try booking again</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                        <button
                            onClick={() => { retryPayment(); router.replace(pageUrl) }}
                            className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                            Try Booking Again
                        </button>
                        <button
                            onClick={() => { router.push(pageUrl.replace("/book-appointment", "")) }}
                            className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    if (paymentFailed) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
                    {/* Close Icon */}
                    <button
                        onClick={() => { router.refresh() }}
                        className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                    >
                        <BiX className="text-2xl text-gray-700" />
                    </button>

                    {/* Error Header */}
                    <div className="text-center mb-4">
                        <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h2>
                        <p className="text-gray-600 text-sm">Your payment could not be processed</p>
                    </div>

                    {/* Failure Information */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-red-900 text-sm mb-1">Transaction Failed</h3>
                                <p className="text-red-800 text-xs leading-relaxed">
                                    The payment transaction could not be completed. Please try again or use a different payment method.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Possible Reasons */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 text-sm mb-3">Possible reasons:</h4>
                        <div className="space-y-2">
                            <div className="flex items-start gap-2 text-xs text-gray-600">
                                <span className="text-red-500 mt-0.5">•</span>
                                <span>Insufficient balance in your account</span>
                            </div>
                            <div className="flex items-start gap-2 text-xs text-gray-600">
                                <span className="text-red-500 mt-0.5">•</span>
                                <span>Payment gateway timeout or network issue</span>
                            </div>
                            <div className="flex items-start gap-2 text-xs text-gray-600">
                                <span className="text-red-500 mt-0.5">•</span>
                                <span>Transaction declined by your bank</span>
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="text-xs text-blue-800">
                            <span className="font-semibold">Note:</span> If any amount was deducted, it will be automatically refunded within 5-7 business days.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                        <button
                            onClick={() => { retryPayment() }}
                            className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => { router.push(pageUrl.replace("/book-appointment", "")) }}
                            className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            {!userdetail &&
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full py-6 px-2 relative">
                        <Login heading="Login / Signup" onLoginSuccess={() => {
                            router.refresh()
                        }
                        } />
                    </div>
                </div>
            }
            {/* Doctor Card */}
            {doctorInfo && (
                <div className='mx-2 mt-2 mb-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm'>
                    <div className='flex gap-3'>
                        <div className='w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-teal-100 to-teal-200 flex-shrink-0'>
                            {doctorInfo.image ? (
                                <img src={doctorInfo.image} alt={doctorInfo.name} className='w-full h-full object-cover' />
                            ) : (
                                <div className='w-full h-full flex items-center justify-center text-teal-600 font-bold text-xl'>
                                    {doctorInfo.name?.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div className='flex-1 min-w-0'>
                            <div className='flex items-start gap-1 mb-1'>
                                <Link href={pageUrl.replace("/book-appointment", "")} className='font-semibold text-gray-800 text-sm leading-tight flex-1'>
                                    {formatDoctorName(doctorInfo.name)}
                                </Link>
                            </div>
                            <p className='text-xs text-gray-600 mb-1'>{doctorInfo.specialization}</p>
                            {doctorInfo.rating && (
                                <div className='flex items-center gap-2'>
                                    <span className='flex items-center gap-0.5 bg-primary text-white text-xs px-1.5 py-0.5 rounded'>
                                        {doctorInfo.rating} <AiFillStar />
                                    </span>
                                    {doctorInfo.experience && (
                                        <span className='text-xs text-gray-600'>{doctorInfo.experience}+ yrs. of exp</span>
                                    )}
                                    <Link href={pageUrl.replace("/book-appointment", "")} className="group inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-cyan-300 ml-auto">
                                        <span className="text-xs font-semibold text-cyan-700">View Detail</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {userdetail && false ? (
                <div className='mx-2 mt-2 mb-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border-2 border-green-200 p-4 shadow-sm'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0'>
                            <MdCheckCircle className='text-white text-2xl' />
                        </div>
                        <div className='flex-1 min-w-0'>
                            <p className='text-xs text-green-600 font-medium mb-0.5'>Logged in as <span>{userdetail.fn}</span></p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            // Clear auth and redirect to login
                            window.location.href = `/logout?redirect=${encodeURIComponent(pageUrl)}`;
                        }}
                        className='w-full mt-3 py-2 bg-white border-2 border-green-300 text-green-700 rounded-lg font-semibold text-sm hover:bg-green-50 transition-colors flex items-center justify-center gap-2'
                    >
                        <BiUser className='text-lg' />
                        Login with Different Account
                    </button>
                </div>
            ) : (<></>)}
            <div className='p-2'>
                {settings.advance_booking_enable ? <>
                    <div className="flex justify-around px-2 gap-2 rounded-md py-1 font-semibold mb-2" style={{ background: "#48c9af57" }}>
                        {consultDates.map((cdate) => {
                            let isSelected = cdate.date === consultDate?.date ? true : false
                            return (
                                <div className={`flex flex-col items-center border-1 px-1 ${isSelected ? 'bg-primary color-white' : 'bg-white'}`} key={`${cdate.date}`} onClick={() => { setConsultDate(cdate) }} style={{ borderRadius: "15px" }}>
                                    <span className="px-2 py-1">{moment(cdate.date).format('ddd')}</span>
                                    <span className="h-6 w-full rounded-full flex items-center justify-center bg-gray-300" style={{ background: isSelected ? "#99ffab" : '' }}>{moment(cdate.date).format('DD')}</span>
                                    <span className="px-2 py-1">{moment(cdate.date).format('MMM')}</span>
                                </div>
                            )
                        })}
                    </div>
                </> : <></>}
                <div className='border px-2 py-2 flex gap-1 items-center rounded-md bg-primary-20 font-semibold fs-16 mb-2'>
                    <BiCalendar />
                    Appointment Date : {consultDate ? moment(consultDate.date).format("ddd, DD MMM") : moment(availability?.available_date).format("ddd, DD MMM")}
                    {settings?.show_group_name_while_booking ? <>
                        <select className="ml-auto outline-none border-2 rounded-md py-1" value={group_name} onChange={(e) => setGroupName(e.target.value)}>
                            <option value="" className='font-normal'>-- Session --</option>
                            {(slno_groups || []).map((group) =>
                                <option key={group.group_name} value={group.group_name}>{group.group_name_for_user}</option>
                            )}
                        </select>
                    </> : <></>}
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
                    <Input lable='Patient Age' value={patientInfo.patient_age} onChange={(e) => { setPatientInfo({ ...patientInfo, patient_age: e.target.value }) }} onBlur={handleAgeBlur} />
                    <div>
                        <RadioButton label='Gender' name='gender' value={patientInfo.patient_gender} data={[
                            { label: "Male", value: "male" },
                            { label: "Female", value: "female" },
                        ]} onChange={(v) => { setPatientInfo({ ...patientInfo, patient_gender: v.toString() }) }} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 px-2">
                    {patientExtraInfo && (patientExtraInfo || []).map((elm, i) =>
                        <Fragment key={elm.key}>
                            {(elm.display_to === "all" || (elm.display_to === "user" && user_info?.user_type === "user") || (elm.display_to === "clinic_staff" && (user_info?.user_type === "clinic_staff" || user_info?.user_type === "NSCM" || user_info?.user_type === "agency"))) ? <>
                                <Input
                                    lable={elm.label}
                                    onChange={(e) => {
                                        let fields = [...patientExtraInfo];
                                        fields[i].value = e.target.value;
                                        setPatientExtraInfo(fields);
                                    }}
                                    value={elm.value}
                                    type={elm.type}
                                    required
                                />
                            </> : <></>}
                        </Fragment>
                    )}
                </div>
                <div className='mt-2' ref={addressFieldRef}>
                    <TextArea className='font-semibold fs-16' value={patientInfo.patient_address} onChange={(e) => { setPatientInfo({ ...patientInfo, patient_address: e.target.value }) }} lable='Patient Address' />
                </div>
            </div>
            <div className="sticky bottom-0 bg-white">
                <div className='font-semibold py-2 px-2 fs-16 bg-slate-100'>
                    Consultation Fee
                </div>
                <div className='font-semibold px-4'>
                    <div className='flex py-1 fs-15'>
                        <span>Doctor Fee :</span>
                        <span className='ml-auto'>
                            <PriceFormat amount={service_charge} />
                        </span>
                    </div>
                    <div className='flex py-1 fs-15'>
                        <span>Platform Fee :</span>
                        <span className='ml-auto'><PriceFormat amount={site_service_charge} /></span>
                    </div>
                    {/* <div className='flex fs-18 color-primary'>
                        <span>Total Amount :</span>
                        <span className='ml-auto'><PriceFormat amount={(service_charge + site_service_charge)} /></span>
                    </div> */}
                    {/*  show a message if any amount need to pay */}
                    {settings.payment_type === "partial_payment_while_booking" && settings.token_amount && settings.token_amount > 0 && (
                        <div className='mt-3 mb-2 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-300 rounded-lg px-3 py-1'>
                            <div className='flex items-center gap-2 mb-2'>
                                <div className='w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0'>
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className='text-xs font-semibold text-orange-800'>Pay Now:</span>
                                <span className='text-xl font-bold text-orange-600 ml-auto'>
                                    <PriceFormat amount={settings.token_amount} />
                                </span>
                            </div>
                            <p className='text-xs text-orange-700 mt-2'>
                                Remaining amount can be paid at the clinic
                            </p>
                        </div>
                    )}
                    {settings.book_by === "app" ?
                        <Button className='flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center w-full my-2' onClick={bookAppointment}>Book Appointment</Button>
                        :
                        <Button className='flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center w-full my-2' onClick={createBookingRequest}>Request For Appointment</Button>
                    }
                </div>
            </div>
            {emergencyBookingClose ?
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
                        {/* Close Icon */}
                        <button
                            onClick={() => { router.back() }}
                            className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                        >
                            <BiX className="text-2xl text-gray-700" />
                        </button>

                        {/* Alert Header */}
                        <div className="text-center mb-4">
                            <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Booking Temporarily Closed</h2>
                        </div>

                        {/* Message */}
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1 items-center">
                                    <p className="text-red-800 text-sm leading-relaxed">
                                        {bookingCloseMessage || "Online booking is temporarily closed due to emergency. Please contact the clinic directly for appointments."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                            <p className="text-xs text-blue-800">
                                <span className="font-semibold">Need immediate assistance?</span> Please call the clinic directly or visit the help center for support.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                            <Link
                                href={pageUrl.replace("/book-appointment", "/help-center")}
                                className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center"
                            >
                                Contact Help Center
                            </Link>
                            <button
                                onClick={() => { router.back() }}
                                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div> : null
            }
            {loading && <Loader fullScreen={true} />}
        </>
    )
}
export default BookAppointmentForm;