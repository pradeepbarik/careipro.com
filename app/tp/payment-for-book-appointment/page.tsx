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
            {device.type === "mobile" ?
                <PaymentforBookAppointmentPageMobile {...searchParams} /> :
                <div className="min-h-screen flex items-center justify-center"><h1 className="text-xl font-bold">Payment for Book Appointment - Desktop View Coming Soon</h1></div>}
        </>
    )
}
export default PaymentforBookAppointmentPage;