import type { Metadata } from "next";
import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import {fetchAllCategories} from '@/lib/hooks/useCategories';
const AllSpecialistMobile = dynamic(() => import("./mobile"));
type TProps={
    params: { [key: string]: string },
    searchParams: { [key: string]: string}
}
export async function generateMetadata({ searchParams }: { searchParams: { city: string, state: string } }): Promise<Metadata> {
    return {
        title: `Doctor specialities,disease categories,medicine store,caretaker,physiotherapy in ${searchParams.city} - careipro.com`,
        description: `Doctor specialities,disease categories,medicine store,caretaker,physiotherapy in ${searchParams.city}.  Visit careipro.com`
    }
}
const AllSpecialists = ({ searchParams }: TProps) => {
    const { device } = useDeviceInfo()
    if (device.type === 'mobile') {
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