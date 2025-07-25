import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetCaretakersHomePageData } from '@/lib/hooks/caretaker/useCaretaker';
import { fetchCategories } from "@/lib/hooks/useCategories";
import PageVisitLogger from "../components/client-components/page-visit-logger";
const CaretakersMobile = dynamic(() => import('@/app/care-taker/mobile'));
type TProps = {
    params: { [key: string]: string },
    searchParams: { [key: string]: string }
}
export async function generateMetadata({ searchParams }: { searchParams: { city: string, state: string } }): Promise<Metadata> {
    return {
        title: `Hire Best Caretakers for parents,patients,child care,physically handicapped in ${searchParams.city} - careipro.com`,
        description: `Hire best caretaker for elderly parents,patients,baby care,child care,physically handicapped in affordable price in ${searchParams.city}.  Visit careipro.com`,
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
const CareTaker = async ({ searchParams }: TProps) => {
    const { device } = useDeviceInfo();
    const [pageData, categories] = await Promise.all([
        fetCaretakersHomePageData(searchParams.state.toLocaleLowerCase(), searchParams.city.toLocaleLowerCase()),
        fetchCategories("CARETAKER")
    ])
    if (device.type === "mobile") {
        return (
            <>
                <CaretakersMobile state={searchParams.state} city={searchParams.city} market_name={searchParams.market_name} pageData={pageData} categories={categories} />
                <PageVisitLogger data={{
                    page_name: "caretaker_home",
                    state: searchParams.state,
                    city: searchParams.city,
                }} />
            </>
        )
    }
    return <>
        CareTaker
    </>
}
export default CareTaker;