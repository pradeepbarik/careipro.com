import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import type { Metadata } from "next";
import { fetchStoreList } from "@/lib/hooks/useMedicineStore";
import PageVisitLogger from "@/app/components/client-components/page-visit-logger";
const StoreListMobile = dynamic(() => import('./mobile'));
type Tparams = {
    state: string,
    city: string,
    town?: string,
    cat_id?: string
}
export async function generateMetadata({ searchParams }: { searchParams: Tparams }): Promise<Metadata> {

    return {
        title: `Find Best Pharmacies in ${searchParams.town ? searchParams.town+", "+searchParams.city : searchParams.city} and order medicine - Careipro`,
        description: `Find the best pharmacies in ${searchParams.town ? searchParams.town+", "+searchParams.city : searchParams.city} on Careipro. Browse through our comprehensive list of pharmacies and medicine shops to get the medicines delivered to your doorstep instantly.`,
        openGraph: {
            title: `Find Best Pharmacies in ${searchParams.town ? searchParams.town+", "+searchParams.city : searchParams.city} and order medicine - Careipro`,
            description: `Find the best pharmacies in ${searchParams.town ? searchParams.town+", "+searchParams.city : searchParams.city} on Careipro. Browse through our comprehensive list of pharmacies and medicine shops to get the medicines delivered to your doorstep instantly.`,
            url: `https://careipro.com/${searchParams.state.toLowerCase().replace(" ", "-")}/${searchParams.city.toLowerCase().replace(" ", "-")}/pharmacies${searchParams.town ? `-in-${searchParams.town.toLowerCase().replace(" ", "-")}` : ''}`,
            siteName: 'Careipro',
        }
    }
}
const StoreListPage = async ({ searchParams }: { searchParams: Tparams }) => {
    const { device } = useDeviceInfo();
    const {data} = await fetchStoreList({ state: searchParams.state, city: searchParams.city, town: searchParams.town || "", cat_id: "0" });
    if (device.type === 'mobile') {
        return (
            <>
                <StoreListMobile data={data} />
                <PageVisitLogger data={{
                page_type: "listing",
                page_name: "medicine_store_list",
                state: searchParams.state,
                city: searchParams.city,
                market_name: searchParams.town || "",
                cat_id: searchParams.cat_id || "0",
                group_category: "",
                vertical: "MEDICINE"
            }} />
            </>
        )
    }
    return (
        <>

        </>
    )
}
export default StoreListPage;