'use client'
import Loader from "@/app/components/common/loader";
import {useAppointmentBookingPayment, Tparams} from "@/lib/hooks/tp/useAppointmentBookingPayment";

const PaymentforBookAppointmentPage = (params:Tparams) => {
    const {loader} = useAppointmentBookingPayment(params);
    return (
        <>
        <Loader fullScreen message="Processing ..." />
        </>
    )
}
export default PaymentforBookAppointmentPage;