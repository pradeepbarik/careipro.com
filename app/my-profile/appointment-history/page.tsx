import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const MyApppointmentMobile = dynamic(() => import('./mobile'));
const MyAppointments = () => {
    const { device,cookies } = useDeviceInfo();
    if (device.type === "mobile") {
        return <MyApppointmentMobile cookies={cookies}/>
    }
    return (
        <>

        </>
    )
}
export default MyAppointments;