'use client';

import { httpPost } from "@/lib/services/http-client";
import { useEffect, useState } from "react";
// @ts-ignore
import { load } from '@cashfreepayments/cashfree-js';
export type Tparams = {
    bpkey: string
    user_key:string,
    txn_id:string,
    rurl:string
}
export const useAppointmentBookingPayment = ({
    bpkey,
    user_key,
    txn_id,
    rurl
}:Tparams) => {
    const [loader, setLoading] = useState(false);
    useEffect(()=>{
        const cashfreeInstance = load({
            mode: process.env.NODE_ENV === "development" ? 'sandbox' : 'production', // use 'sandbox' or 'production'
        });
        httpPost<{payment_session_id: string}>("/pg/payment-session-detail",{
            bpkey,
            user_key: user_key,
            txn_id
        }).then(({data})=>{
            const {payment_session_id} = data;
             cashfreeInstance.then((cf: any) => {
                 cf.checkout({
                    paymentSessionId: payment_session_id,
                    redirectTarget: "_self",
                    returnUrl: "https://careipro.com/tp/booking-confirmation?txnid=" + encodeURIComponent(txn_id),
                })
             })
        }).catch(err=>{
            console.log("error in fetching payment session id", err);
        })
    },[])
    return {
        loader,
    }
}
export default useAppointmentBookingPayment;