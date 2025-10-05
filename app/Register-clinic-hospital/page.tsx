import dynamic from "next/dynamic";
import { Metadata } from "next";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import PageVisitLogger from '@/app/components/client-components/page-visit-logger';
const RegisterClinicHospitalMobile = dynamic(() => import("./mobile"));
export async function generateMetadata({searchParams}:{searchParams:{city: string, state: string}}): Promise<Metadata> {
    return {
        title: `Register Your Clinic or Hospital | Advanced Management Software & Free Demo`,
        description: `Effortlessly manage appointments, patient records, billing, and more. Register your clinic or hospital and book a free demo of our comprehensive healthcare management software.`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
    }
}
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