import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetchClinicsPageData } from '@/lib/hooks/useClinics';
import { fetchCategories } from '@/lib/hooks/useCategories';
const HospitalsMobile = dynamic(() => import('./mobile'));
const HospitalsDesktop = dynamic(() => import('./desktop'));
export async function generateMetadata({ searchParams }: { searchParams: { city: string, state: string } }): Promise<Metadata> {
    return {
        title: `Best Clinics and Hospitals in ${searchParams.city} - careipro.com`,
        description: `Find best Clinics and Hospitals by specialist,disease symptoms and book appoinment. Get Hospitals and clinics phone number,clinic address,consultaion fees and consultaion timing. `
    }
}
const Hospitals = async ({ searchParams }: { searchParams: { city: string, state: string } }) => {
    const { device } = useDeviceInfo();
    const [pageData] = await Promise.all([
        fetchClinicsPageData(searchParams.state.toLocaleLowerCase(), searchParams.city.toLocaleLowerCase()),
    ])
    if (device.type === "mobile") {
        return (
            <HospitalsMobile city={searchParams.city} state={searchParams.state} pageData={pageData} />
        )
    } else {
        return (
            <>
                <HospitalsDesktop />
            </>
        )
    }
}
export default Hospitals;