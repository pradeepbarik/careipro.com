import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetchTestsScansPageData } from "@/lib/hooks/useTestsScans";
const LabsTestsScansMobile = dynamic(() => import('./mobile'));

export async function generateMetadata({ searchParams }: { searchParams: { city: string, state: string } }): Promise<Metadata> {
    return {
        title: `Best Pathology Labs, Ultrasound & Scan Centers in ${searchParams.city} - careipro.com`,
        description: `Find best pathology labs, ultrasound and scanning centers in ${searchParams.city}. Book lab tests and get lab phone number, address, test prices and opening hours.`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
        alternates: {
            canonical: `https://careipro.com/${searchParams.state.toLowerCase()}/${searchParams .city.toLowerCase().replace(" ", "-")}/labs-tests-scans` // Relative path will be combined with metadataBase
        },
    }
}
const LabsTestsScans = async ({ searchParams }: { searchParams: { city: string, state: string } }) => {
    const { device } = useDeviceInfo();
    if (device.type === "mobile") {
        const pageData = await fetchTestsScansPageData(searchParams.state, searchParams.city);
        return <LabsTestsScansMobile state={searchParams.state} city={searchParams.city} pageData={pageData} />
    }
    return (
        <>
            <h1>Labs Tests Scans Page</h1>
            <p>State: {searchParams.state}</p>
            <p>City: {searchParams.city}</p>
        </>
    )
}

export default LabsTestsScans;