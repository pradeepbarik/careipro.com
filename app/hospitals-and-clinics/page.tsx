import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetchClinicsPageData } from '@/lib/hooks/useClinics';
import { fetchCategories } from '@/lib/hooks/useCategories';
import PageVisitLogger from "../components/client-components/page-visit-logger";
const HospitalsMobile = dynamic(() => import('./mobile'));
const HospitalsDesktop = dynamic(() => import('./desktop'));
export async function generateMetadata({ searchParams }: { searchParams: { city: string, state: string } }): Promise<Metadata> {
    return {
        title: `Best Clinics and Hospitals in ${searchParams.city} - careipro.com`,
        description: `Find best Clinics and Hospitals by specialist,disease symptoms and book appoinment. Get Hospitals and clinics phone number,clinic address,consultaion fees and consultaion timing. `,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
        alternates: {
            canonical: `https://careipro.com/${searchParams.state.toLowerCase()}/${searchParams.city.toLowerCase().replace(" ", "-")}/hospitals-and-clinics` // Relative path will be combined with metadataBase
        },
    }
}
const Hospitals = async ({ searchParams }: { searchParams: { city: string, state: string } }) => {
    const { device } = useDeviceInfo();
    const [pageData] = await Promise.all([
        fetchClinicsPageData(searchParams.state.toLocaleLowerCase(), searchParams.city.toLocaleLowerCase()),
    ])
    if (device.type === "mobile" || 1==1) {
        return (
            <>
                <HospitalsMobile city={searchParams.city} state={searchParams.state} pageData={pageData} />
                <PageVisitLogger data={{
                    page_name: "clinics_home",
                    state: searchParams.state,
                    city: searchParams.city,
                }} />
            </>
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