import Header from "@/app/components/mobile/header";
import { WideAd } from "@/app/components/mobile/ads-container";
import { TStoreListResponse } from "@/lib/hooks/useMedicineStore";
import { capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";
import StoreResults from "./store-results";
import StoreCategories from "./store-categories";

const StoreListMobilePage = ({data, state, city, town}: {data: TStoreListResponse, state: string, city: string, town: string}) => {
    /* market_name and city came into the response later, a cache file written before that has
       neither, so the page's own values stand in rather than crashing the render */
    const marketName = capitalizeEachWordFirstLetter(data.market_name || town || data.stores[0]?.market_name || "");
    const cityName = capitalizeEachWordFirstLetter(data.city || city || "");
    const place = marketName && marketName.toLowerCase() !== cityName.toLowerCase() ? `${marketName}, ${cityName}` : cityName;
    return (
        <div className="min-h-screen bg-gray-50">
            <Header template='SUBPAGE' heading={`Medicine Stores in ${place}`} />
            {/* the ad slot the doctor result page has, in place of the old hardcoded banner.
                nothing shows when no ad targets this page */}
            <div className="px-2">
                <WideAd page_type="medicine_store_list" city={city} limit={1} showPlaceholder={false} ad_selection="random" />
            </div>
            {/* the city page lists its main market, so the categories open that market's lists */}
            <StoreCategories categories={data.categories} state={state} city={city}
                market={town || data.market_name || data.stores[0]?.market_name || ""} />
            <h2 className="text-lg font-semibold text-gray-800 px-4 py-3">Medicine Stores in {place}</h2>
            {/* the filter bar and the list it narrows, client side */}
            <StoreResults data={data} state={state} city={city} town={town} />
        </div>
    )
}
export default StoreListMobilePage;
