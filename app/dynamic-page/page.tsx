import dynamic from "next/dynamic";
import type { Metadata } from "next";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetchDPageData } from "@/lib/hooks/useDpage";
const DynamicPage = dynamic(() => import('./mobile'));
export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
    const data = await fetchDPageData(searchParams.state, searchParams.city, searchParams.page_type, searchParams.page_id)
    return {
        title: data.seoDt.pageTitle,
        description: data.seoDt.pageDescription,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        }
    }
}
const FormPage = async ({ searchParams }: { searchParams: { city: string, state: string, page_type: string, page_id: number } }) => {
    const { device } = useDeviceInfo();
    const pageData = await fetchDPageData(searchParams.state, searchParams.city, searchParams.page_type, searchParams.page_id);
    if (device.type === "mobile") {
        return (
            <>
                <DynamicPage data={pageData} state={searchParams.state} city={searchParams.city} page_id={searchParams.page_id} page_type={searchParams.page_type} />
            </>
        )
    }
    return (
        <></>
    )
}
export default FormPage;