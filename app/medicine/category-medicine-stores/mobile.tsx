import Link from "next/link";
import { GiMedicines } from "react-icons/gi";
import Header from "@/app/components/mobile/header";
import { TStoreListResponse } from "@/lib/hooks/useMedicineStore";
import { capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";
import { medicineStoreListLink } from "@/lib/helper/link";
import StoreCategories, { categoryHeading } from "../store-list/store-categories";
import StoreResults from "../store-list/store-results";
import MarketSuggestion from "../store-list/market-suggestion";

type TProps = { data: TStoreListResponse, state: string, city: string, town: string, catId: number };

/**
 * One category's stores in one market. The category row on top switches to the other
 * categories, the list below it keeps the store list's cards and its area filter.
 */
const CategoryWiseStoreListMobile = ({ data, state, city, town, catId }: TProps) => {
    const market = data.market_name || town;
    const marketName = capitalizeEachWordFirstLetter(market);
    const cityName = capitalizeEachWordFirstLetter(data.city || city);
    const place = marketName.toLowerCase() !== cityName.toLowerCase() ? `${marketName}, ${cityName}` : cityName;
    const category = data.categories?.find((c) => c.id === catId);
    const heading = categoryHeading(category?.name);
    const allStoresLink = medicineStoreListLink({ state, city, market_name: market });
    const otherMarkets = (data.store_available_markets || []).filter((m) => m.toLowerCase() !== market.toLowerCase());

    return (
        <div className="min-h-screen bg-gray-50">
            <Header template='SUBPAGE' heading={`${heading} in ${marketName}`} />
            <StoreCategories categories={data.categories} state={state} city={city} market={market}
                activeId={catId} title="Browse Categories" />

            <div className="flex items-center justify-between gap-3 px-4 pt-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    {heading} in {place}
                </h2>
                <Link href={allStoresLink} className="shrink-0 text-xs font-semibold text-primary">View all</Link>
            </div>

            {data.stores.length > 0 ? (
                <StoreResults data={data} state={state} city={city} town={market} hideCategoryFilter />
            ) : (
                <div className="px-2 py-4 space-y-3">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                        <span className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                            <GiMedicines className="text-2xl text-primary" />
                        </span>
                        <p className="mt-3 text-sm font-semibold text-deep">No {heading.toLowerCase()} listed in {marketName} yet</p>
                        <p className="mt-1 text-xs text-gray-500">Other pharmacies in {marketName} may still have what you need.</p>
                        <Link href={allStoresLink} className="button mt-4 inline-flex" data-size="small">
                            See all medicine stores in {marketName}
                        </Link>
                    </div>
                    <MarketSuggestion state={state} city={city} markets={otherMarkets} />
                </div>
            )}
        </div>
    )
}
export default CategoryWiseStoreListMobile;
