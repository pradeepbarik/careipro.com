import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const AppointmentDetailMobile = dynamic(() => import('./mobile'));
const AppointmentDetailDesktop = dynamic(() => import('./desktop'));
const AppointmentDetail = ({searchParams}:{searchParams:{case_id:string,appointment_id:string}}) => {
    const { device, cookies } = useDeviceInfo();
    const case_id = parseInt(searchParams.case_id);
    const appointmentId = parseInt(searchParams.appointment_id);
    if (device.type === 'mobile') {
        return <AppointmentDetailMobile case_id={case_id} appointmentId={appointmentId} />
    }
    /* the account layout draws the frame and the menu, this only fills the panel beside them */
    return <AppointmentDetailDesktop case_id={case_id} appointmentId={appointmentId} cookies={cookies} />
};
export default AppointmentDetail;
