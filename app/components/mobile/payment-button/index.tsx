'use client';
import { useEffect, useState } from 'react';
// @ts-ignore
import { load, CFEnvironment } from '@cashfreepayments/cashfree-js';
import { httpPost } from '@/lib/services/http-client';
const PaymentButton = ({ button_text, orderdata }: { button_text: string, orderdata: any }) => {
    const [paymentSessionId, setPaymentSessionId] = useState<string>("");
    const creatPaymentOrder = () => {
        httpPost("/pg/generate-book-appointment-payment-link", orderdata,{passSecreateKey:true,passGuserSecreateKey:true}).then((res: any) => {
            console.log("payment link response", res);
            setPaymentSessionId(res.data.payment_session_id);
            const cashfreeInstance = load({
                mode: CFEnvironment.SANDBOX,
            });
            cashfreeInstance.then((cf: any) => {
                cf.checkout({
                    paymentSessionId: res.data.payment_session_id,
                    redirectTarget: "_self",
                    returnUrl: "https://careipro.com/payment-response",
                }).then((res: any) => {
                    console.log("payment success response", res);
                }).catch((err: any) => {
                    console.log("payment error response", err);
                })
            })
        })
    }
    return (
        <>
            <button className="button w-full h-10 fs-16" onClick={creatPaymentOrder}>
                {button_text}
            </button>
        </>
    )
}
export default PaymentButton;