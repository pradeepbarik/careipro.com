import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { getServiceAvailableCities } from "@/lib/hooks/index";
const ServiceAvailbeCitiesMobile = dynamic(() => import('./mobile'));
export async function generateMetadata({ searchParams }: { searchParams: { city: string, state: string } }): Promise<Metadata> {
    return {
        title: `Services available cities - careipro.com`,
        description: `Find best Clinics and Hospitals by specialist,disease symptoms and book appoinment and Get Hospitals and clinics phone number,clinic address,consultaion fees and consultaion timing.`
    }
}
const ServiceAvailbeCities = async () => {
    const { device } = useDeviceInfo();
    const {states,data}=await getServiceAvailableCities()
    if (device.type === "mobile") {
        return (
            <ServiceAvailbeCitiesMobile states={states} data={data} />
        )
    }
    return (
        <>
            sdsdds
        </>
    )
}
export default ServiceAvailbeCities;