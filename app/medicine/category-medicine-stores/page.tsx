import dynamic from "next/dynamic";
import type { Metadata } from "next";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetchStoreList } from "@/lib/hooks/useMedicineStore";
import PageVisitLogger from "@/app/components/client-components/page-visit-logger";
import { medicineStoreCategoryLink } from "@/lib/helper/link";
import { capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";
import { site_url } from "@/constants/site-config";
import { categoryHeading } from "../store-list/store-categories";
const CategoryWiseStoreListMobile = dynamic(() => import('./mobile'));
//the store list's desktop layout, it takes the category and marks it
const StoreListDesktop = dynamic(() => import('../store-list/desktop'));

/* from the rewrite /:state/:city/:seo_url-medicine-stores-in-:town/CATG:cat_id */
type Tparams = {
    state: string,
    city: string,
    seo_url: string,
    town: string,
    cat_id: string
}

/* the url carries the market as a slug (bhadrak-town), the api matches it by name (bhadrak town) */
const marketName = (params: Tparams) => (params.town || "").replace(/-/g, " ");

const loadStores = (params: Tparams) =>
    fetchStoreList({ state: params.state, city: params.city, town: marketName(params), cat_id: String(Number(params.cat_id) || 0) });

export async function generateMetadata({ searchParams }: { searchParams: Tparams }): Promise<Metadata> {
    const { data } = await loadStores(searchParams);
    const town = marketName(searchParams);
    const category = data.categories?.find((c) => c.id === Number(searchParams.cat_id));
    const heading = categoryHeading(category ? category.name : searchParams.seo_url.replace(/-/g, " "));
    const place = `${capitalizeEachWordFirstLetter(town)}, ${capitalizeEachWordFirstLetter(searchParams.city)}`;
    const title = `Best ${heading} in ${place} - Careipro`;
    const description = `Find ${heading.toLowerCase()} in ${place} on Careipro. See timings, home delivery and contact details, and call or WhatsApp the pharmacy directly.`;
    /* the address is rebuilt from the category itself, so any spelling of the slug points to one page */
    const pageUrl = site_url + medicineStoreCategoryLink({
        state: searchParams.state, city: searchParams.city, market_name: town,
        seo_url: category?.seo_url || searchParams.seo_url, cat_id: Number(searchParams.cat_id),
    });
    return {
        title,
        description,
        alternates: { canonical: pageUrl },
        openGraph: { title, description, url: pageUrl, siteName: 'Careipro' },
    }
}

const CategoryStoreListPage = async ({ searchParams }: { searchParams: Tparams }) => {
    const { device } = useDeviceInfo();
    const { data } = await loadStores(searchParams);
    return (
            <>
                {device.type === 'mobile'
                    ? <CategoryWiseStoreListMobile data={data} state={searchParams.state} city={searchParams.city}
                        town={marketName(searchParams)} catId={Number(searchParams.cat_id)} />
                    : <StoreListDesktop data={data} state={searchParams.state} city={searchParams.city}
                        town={marketName(searchParams)} catId={Number(searchParams.cat_id)} />}
                <PageVisitLogger data={{
                    page_type: "listing",
                    page_name: "medicine_store_category_list",
                    state: searchParams.state,
                    city: searchParams.city,
                    market_name: searchParams.town || "",
                    cat_id: searchParams.cat_id || "0",
                    group_category: "MEDICINESTORE",
                    vertical: "MEDICINE"
                }} />
            </>
    )
}
export default CategoryStoreListPage;
