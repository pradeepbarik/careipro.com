import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import type { Metadata } from "next";
import { fetchStoreList } from "@/lib/hooks/useMedicineStore";
import PageVisitLogger from "@/app/components/client-components/page-visit-logger";
import { medicineStoreListLink } from "@/lib/helper/link";
import { capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";
import { site_url } from "@/constants/site-config";
const StoreListMobile = dynamic(() => import('./mobile'));
const StoreListDesktop = dynamic(() => import('./desktop'));
type Tparams = {
    state: string,
    city: string,
    town?: string,
    cat_id?: string
}
export async function generateMetadata({ searchParams }: { searchParams: Tparams }): Promise<Metadata> {
    /* the url carries the market as a slug (bhadrak-town), the title reads it as a name */
    const town = (searchParams.town || "").replace(/-/g, " ");
    const place = town
        ? `${capitalizeEachWordFirstLetter(town)}, ${capitalizeEachWordFirstLetter(searchParams.city)}`
        : capitalizeEachWordFirstLetter(searchParams.city);
    const title = `Find Best Pharmacies in ${place} and order medicine - Careipro`;
    const description = `Find the best pharmacies in ${place} on Careipro. Browse through our comprehensive list of pharmacies and medicine shops to get the medicines delivered to your doorstep instantly.`;
    /* one address per list: the city page, or the market page built the same way the page's own
       links to it are, so a market reached by any spelling of its slug points search engines here */
    const pageUrl = site_url + medicineStoreListLink({ state: searchParams.state, city: searchParams.city, market_name: town });
    return {
        title,
        description,
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title,
            description,
            url: pageUrl,
            siteName: 'Careipro',
        }
    }
}
const StoreListPage = async ({ searchParams }: { searchParams: Tparams }) => {
    const { device } = useDeviceInfo();
    /* the url carries the market as a slug (bhadrak-town), the api matches it by name (bhadrak town) */
    const town = (searchParams.town || "").replace(/-/g, " ");
    const {data} = await fetchStoreList({ state: searchParams.state, city: searchParams.city, town, cat_id: "0" });
    return (
            <>
                {device.type === 'mobile'
                    ? <StoreListMobile data={data} state={searchParams.state} city={searchParams.city} town={town} />
                    : <StoreListDesktop data={data} state={searchParams.state} city={searchParams.city} town={town} />}
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
export default StoreListPage;