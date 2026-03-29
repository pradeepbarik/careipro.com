import { capitalizeFirstLetter } from "@/lib/helper/format-text";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetchDoctorDetail } from "@/lib/hooks/useDoctors";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
//const ContactusMobile = dynamic(() => import("../contact-us/mobile"));
const HelpCenterMobile = dynamic(() => import("./mobile"));
export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
    const data = await fetchDoctorDetail({ doctor_id: searchParams.doctor_id, clinic_id: searchParams.clinic_id, service_loc_id: searchParams.service_loc_id, seo_url: searchParams.seo_url, market_name: searchParams.market_name, state: searchParams.state, city: searchParams.city })
    return {
        title: `${data.data.doctor_name} - Help Center | ${capitalizeFirstLetter(data.data.clinic_city)}`,
        description: `Get help and support for ${data.data.doctor_name} in ${capitalizeFirstLetter(data.data.clinic_city)}. Find answers to common questions and contact our support team for assistance.`,
        robots:{
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
        alternates:{
            canonical:`/${searchParams.seo_url}-At-${searchParams.market_name}-In-${searchParams.city}-Of-${searchParams.state}/DR${searchParams.doctor_id}-SL${searchParams.service_loc_id}-C${searchParams.clinic_id}/help-center`
        }
    }
}
const HelpCenterPage = async ({ searchParams }: { searchParams: any }) => {
    const { device } = useDeviceInfo();
    const {data} = await fetchDoctorDetail({ doctor_id: searchParams.doctor_id, clinic_id: searchParams.clinic_id, service_loc_id: searchParams.service_loc_id, seo_url: searchParams.seo_url, market_name: searchParams.market_name, state: searchParams.state, city: searchParams.city })
    if (device.type === "mobile") {
        return <HelpCenterMobile data={data} searchParams={searchParams} />
    }
    return (
        <>
          
        </>
    );
};
export default HelpCenterPage;
