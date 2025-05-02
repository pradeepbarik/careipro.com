import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const MyApppointmentMobile = dynamic(() => import('./mobile'));
const MyAppointments = () => {
    const { device } = useDeviceInfo();
    if (device.type === "mobile") {
        return <MyApppointmentMobile />
    }
    return (
        <>

        </>
    )
}
export default MyAppointments;