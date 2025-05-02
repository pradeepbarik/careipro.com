import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const AppointmentDetailMobile = dynamic(() => import('./mobile'));
const AppointmentDetail = ({searchParams}:{searchParams:{case_id:string,appointment_id:string}}) => {
    const { device } = useDeviceInfo();
    if (device.type === 'mobile') {
        return (
            <>
                <AppointmentDetailMobile case_id={parseInt(searchParams.case_id)} appointmentId={parseInt(searchParams.appointment_id)} />
            </>
        );
    }
    return (
        <div>
            <h1>Appointment Detail</h1>
        </div>
    );
};
export default AppointmentDetail;