import dynamic from "next/dynamic";
import {fetchSearchPageData} from '@/lib/hooks/useSearch';
import PageVisitLogger from "../components/client-components/page-visit-logger";
const SearchBox = dynamic(() => import("./mobile"));
export const metadata = {
    title: "Find Doctor, Clinic, Medicine store, caretakers, physiotherapy center, spa & massage center  - Careipro",
    description: "Careipro is your one-stop solution to find the best healthcare services near you. Whether you're looking for a doctor, clinic, medicine store, caretaker, physiotherapy center, spa, or massage center, Careipro has got you covered. Our comprehensive search platform allows you to easily discover and connect with trusted healthcare providers in your area. With Careipro, you can access a wide range of healthcare services at your fingertips, ensuring that you receive the care you need when you need it. Start your search today and experience the convenience of finding the best healthcare services with Careipro.",
    keywords: ["Find Doctor", "Find Clinic", "Find Medicine Store", "Find Caretaker", "Find Physiotherapy Center", "Find Spa", "Find Massage Center", "Healthcare Services Near Me", "Trusted Healthcare Providers", "Comprehensive Search Platform", "Convenient Healthcare Search"],
    openGraph: {
        title: "Find Doctor, Clinic, Medicine store, caretakers, physiotherapy center, spa & massage center  - Careipro",
        description: "Careipro is your one-stop solution to find the best healthcare services near you. Whether you're looking for a doctor, clinic, medicine store, caretaker, physiotherapy center, spa, or massage center, Careipro has got you covered. Our comprehensive search platform allows you to easily discover and connect with trusted healthcare providers in your area. With Careipro, you can access a wide range of healthcare services at your fingertips, ensuring that you receive the care you need when you need it. Start your search today and experience the convenience of finding the best healthcare services with Careipro.",
        url: "https://careipro.com/search",
        siteName: "Careipro",
        images: [
            {
                url: "https://careipro.com/og-image.png",
                width: 1200,
                height: 630,
                alt: "Careipro - Find Doctor, Clinic, Medicine store, caretakers, physiotherapy center, spa & massage center"
            }
        ],
        locale: "en_US",
        type: "website"
    }
};
const SearchPage = async ({ searchParams }: { searchParams: { city: string, state: string, q?: string } }) => {
   const data = await fetchSearchPageData(searchParams.state, searchParams.city);
    return <>
        <SearchBox state={searchParams.state} city={searchParams.city} q={searchParams.q} data={data} />
        <PageVisitLogger data={{
            page_type: "other",
            page_name: "search_page",
            section_name: "initial_load",
            state: searchParams.state || "",
            city: searchParams.city || "",
            business_name: '',
        }} />
    </>
}
export default SearchPage;