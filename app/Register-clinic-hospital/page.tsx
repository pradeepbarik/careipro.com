import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import PageVisitLogger from '@/app/components/client-components/page-visit-logger';
const RegisterClinicHospitalMobile = dynamic(() => import("./mobile"));
const RegisterClinicHospital = () => {
    const { device } = useDeviceInfo();
    if (device.type === "mobile") {
        return (
            <>
                <RegisterClinicHospitalMobile />
                <PageVisitLogger data={{
                    page_name: "register_clinic",
                    state: "",
                    city: "",
                }} />
            </>
        );
    }
    return (
        <div>
            <h1>Register Clinic/Hospital</h1>
            <p>This page is not available on mobile devices.</p>
        </div>
    );
}
export default RegisterClinicHospital;