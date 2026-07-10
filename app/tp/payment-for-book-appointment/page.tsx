import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import dynamic from "next/dynamic";
const PaymentforBookAppointmentPageMobile = dynamic(() => import("./mobile"));
const PaymentforBookAppointmentPage = ({searchParams }: {
    searchParams: {
        bpkey: string,
        rurl: string,
        user_key: string,
        txn_id:string
    }
}) => {
    const { device } = useDeviceInfo();
    return (
        <>
            
                <PaymentforBookAppointmentPageMobile {...searchParams} /> 
        </>
    )
}
export default PaymentforBookAppointmentPage;