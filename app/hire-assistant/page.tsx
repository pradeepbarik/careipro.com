import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
const HirePersonalAssistantPageMobile = dynamic(() => import('./mobile'));
export async function generateMetadata({ searchParams }: { searchParams: { city: string, state: string } }): Promise<Metadata> {
    return {
        title: `Hire a Personal Assistant in ${searchParams.city} - careipro.com`,
        description: `Hire a dedicated personal assistant in ${searchParams.city} to book appointments on your behalf, visit the clinic for you, and resolve your queries with doctors and hospitals.`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
        alternates: {
            //canonical:`/Doctors-In-${searchParams.city}-Of-${searchParams.state}`
            canonical:`https://careipro.com/${searchParams.state.replace(" ", "-")}/${searchParams.city.replace(" ", "-")}/hire-personal-assistant`
        }
    }
}
const HirePersonalAssistantPage = async ({ searchParams }: { searchParams: { city: string, state: string } }) => {
    const { device } = useDeviceInfo();
    if (device.type == "mobile") {
        return <HirePersonalAssistantPageMobile state={searchParams.state} city={searchParams.city} />
    }
    return (
        <>
        </>
    )
}
export default HirePersonalAssistantPage;