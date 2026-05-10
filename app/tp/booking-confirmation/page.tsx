'use client';
import Loader from "@/app/components/common/loader";
import { httpPost } from "@/lib/services/http-client";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { BiX } from "react-icons/bi";

type TBookingSuccessResponse = {
    booking_date: string,
    booking_id: number,
    consult_date: string,
    today_booking_id: string
}
const BookingConfirmationPage = ({ searchParams }: { searchParams: { txnid: string } }) => {
    const processedTxnRef = useRef<string | null>(null);
    const queryParams = new URLSearchParams(window.location.search);
    //txnid is in urlencode format, no need to encode it again while sending to backend, but need to encode it while appending to url for redirection
    const txnid = queryParams.get("txnid");
    const [loading, setLoading] = useState(true);
    const [showRetryPopup, setShowRetryPopup] = useState(false);
    const [tpDetail, setTpDetail] = useState<{ clinic_id: number, doctor_id: number, servicelocation_id: number, rurl: string } | null>(null);
    
    useEffect(() => {
        if (txnid && processedTxnRef.current !== txnid) {
            // mark this txnid as processed
            processedTxnRef.current = txnid;
            setLoading(true);
            httpPost<{
                payment_status: string, order_amount: number, cp_order_id: number,
                refund_status?: string, refund_order_id?: string, tp_detail?: {
                    clinic_id: number,
                    doctor_id: number,
                    servicelocation_id: number,
                    rurl: string,
                }
            }>("/pg/tp-validate-payment", {
                txnid: txnid
            }).then(({ data }) => {
                if(data.payment_status === "ACTIVE"){
                    setTpDetail(data.tp_detail || null);
                    setShowRetryPopup(true);
                    setLoading(false);
                    return;
                }
                if (data.cp_order_id) {
                    if (data.tp_detail && data.tp_detail.rurl) {
                        window.location.href = data.tp_detail.rurl+"?booking_id="+data.cp_order_id+"&txnid="+encodeURIComponent(txnid);
                        return;
                    }
                    return;
                }
                if (data.refund_status && data.refund_order_id) {
                    toast.error(`Refund process is initiated for this transaction`);
                    if (data.tp_detail && data.tp_detail.rurl) {
                        window.location.href = data.tp_detail.rurl+"?refund_order_id="+data.refund_order_id+"&txnid="+encodeURIComponent(txnid);
                        return;
                    }
                    return;
                }
                let rurl = data.tp_detail?.rurl;
                if (data.payment_status === "PAID") {
                    httpPost<TBookingSuccessResponse>("/book-appointment-by-tp-txnid",{txnid}).then((data)=>{
                        toast.success(data.message);
                        window.location.href = rurl+"?booking_id="+data.data.booking_id+"&txnid="+encodeURIComponent(txnid) || "/";
                    }).catch(err=>{
                        console.log("error in fetching booking details after payment success", err);
                        toast.error("Payment successful but something went wrong while booking");
                    }).finally(()=>{
                        setLoading(false);
                    })
                }else{
                    toast.error("Payment failed for this transaction");
                    if (rurl) {
                        window.location.href = rurl+"?txnid="+encodeURIComponent(txnid);
                    }
                }
            }).catch(err => {
                console.log("error in validating payment", err);
                toast.error("Error in validating payment");
            }).finally(()=>{
                setLoading(false);
            })
        }
    }, [])
    const handleGoBack = () => {
        if (tpDetail && tpDetail.rurl) {
            window.location.href = tpDetail.rurl;
        } else {
            window.history.back();
        }
    };

    return (
        <>
            {loading && <Loader fullScreen message="Processing ..." />}
            
            {/* Retry Payment Popup */}
            {showRetryPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
                        {/* Close Icon */}
                        <button
                            onClick={handleGoBack}
                            className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                        >
                            <BiX className="text-2xl text-gray-700" />
                        </button>

                        {/* Alert Header */}
                        <div className="text-center mb-4">
                            <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Payment Pending</h2>
                            <p className="text-gray-600 text-sm">Your payment session is still active</p>
                        </div>

                        {/* Information */}
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-orange-900 text-sm mb-1">Complete Your Payment</h3>
                                    <p className="text-orange-800 text-xs leading-relaxed">
                                        Your payment is still pending. Please complete the payment to confirm your appointment.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                            <button
                                onClick={handleGoBack}
                                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all"
                            >
                              Retry Book Appointment
                            </button>
                            <button
                                onClick={handleGoBack}
                                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingConfirmationPage;