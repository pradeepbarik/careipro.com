import type { Metadata } from "next";
import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const AllSpecialistMobile = dynamic(() => import("./mobile"));
type TProps = {
    params: { [key: string]: string },
    searchParams: { [key: string]: string }
}
export async function generateMetadata({ searchParams }: { searchParams: { city: string, state: string } }): Promise<Metadata> {
    return {
        title: `Doctor specialities,disease categories,medicine store,caretaker,physiotherapy in ${searchParams.city} - careipro.com`,
        description: `Doctor specialities,disease categories,medicine store,caretaker,physiotherapy in ${searchParams.city}.  Visit careipro.com`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        }, 
        alternates: {
            canonical: `/${searchParams.state.toLowerCase()}/${searchParams.city.toLowerCase().replace(" ", "-")}/doctor-specialists-and-services` // Relative path will be combined with metadataBase
        }
    }
}
const AllSpecialists = ({ searchParams }: TProps) => {
    const { device } = useDeviceInfo()
    if (device.type === 'mobile' || 1==1) {
        return (
            <>
                <AllSpecialistMobile state={searchParams.state} city={searchParams.city} />
            </>
        );
    }
    return (
        <>


        </>
    )
}
export default AllSpecialists;