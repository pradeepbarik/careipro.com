import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const MyApppointmentMobile = dynamic(() => import('./mobile'));
const MyAppointmentsDesktop = dynamic(() => import('./desktop'));
const MyAppointments = () => {
    const { device, cookies } = useDeviceInfo();
    if (device.type === "mobile") {
        return <MyApppointmentMobile cookies={cookies} />
    }
    /* the account layout draws the frame and the menu, this only fills the panel beside them */
    return <MyAppointmentsDesktop cookies={cookies} />
}
export default MyAppointments;
