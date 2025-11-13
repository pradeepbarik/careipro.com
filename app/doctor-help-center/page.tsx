import { capitalizeFirstLetter } from "@/lib/helper/format-text";
import { fetchDoctorDetail } from "@/lib/hooks/useDoctors";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
const ContactusMobile = dynamic(() => import("../contact-us/mobile"));
export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
    const data = await fetchDoctorDetail({ doctor_id: searchParams.doctor_id, clinic_id: searchParams.clinic_id, service_loc_id: searchParams.service_loc_id, seo_url: searchParams.seo_url, market_name: searchParams.market_name, state: searchParams.state, city: searchParams.city })
    return {
        title: `${data.data.doctor_name} - Help Center | ${capitalizeFirstLetter(data.data.clinic_city)}`,
        description: `Get help and support for ${data.data.doctor_name}. Find answers to common questions and contact our support team for assistance.`,
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
const HelpCenterPage = () => {
    return (
        <>
          <ContactusMobile/>  
        </>
    );
};
export default HelpCenterPage;
