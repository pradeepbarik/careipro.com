'use client'
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { TStoreListResponse } from "@/lib/hooks/useMedicineStore";
import useEventLogger from "@/lib/hooks/useEventLogger";
import { capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";
import StoreCard from "./store-card";
import MarketSuggestion from "./market-suggestion";
import StoreFilters, { EMPTY_STORE_FILTERS, TStoreFilters } from "./store-filters";

/* the market suggestion goes after this many stores, or after the last one on a shorter list */
const MARKET_CARD_AFTER = 3;

type TProps = {
    data: TStoreListResponse, state: string, city: string, town: string,
    //the category page is already one category, only the area filter is left
    hideCategoryFilter?: boolean,
    /* desktop lays the cards out two to a row under a boxed filter bar, and lists the other
       markets in its side column instead of between the cards */
    desktop?: boolean
};

/**
 * The filter bar and the store list it narrows. The page is server rendered, this part is the
 * client island that holds the picked filters.
 */
const StoreResults = ({ data, state, city, town, hideCategoryFilter = false, desktop = false }: TProps) => {
    const { trackClick } = useEventLogger();
    const [filters, setFilters] = useState<TStoreFilters>({ ...EMPTY_STORE_FILTERS });
    const previousFilters = useRef<TStoreFilters>({ ...EMPTY_STORE_FILTERS });

    /* fire once per newly applied filter, the way the doctors list does, so the dashboard shows
       which filters people use */
    useEffect(() => {
        if (filters.category !== null && filters.category !== previousFilters.current.category) {
            trackClick('filter_apply', 'category', String(filters.category));
        }
        if (filters.area && filters.area !== previousFilters.current.area) {
            trackClick('filter_apply', 'area', filters.area);
        }
        previousFilters.current = filters;
    }, [filters]);

    /* the list is always one market's stores (the city page shows its main market), and the
       api sends that market's localities. one area leaves nothing to choose between */
    const areas = useMemo(() => {
        const list = data.store_available_areas || [];
        return list.length > 1 ? list : [];
    }, [data.store_available_areas]);

    /* every medicine store category, each with how many listed stores are under it, so a
       category with no store here yet reads as (0) rather than looking broken */
    const categories = useMemo(() => (hideCategoryFilter ? [] : data.categories || []).map((c) => ({
        id: c.id,
        name: c.name,
        count: data.stores.filter((s) => (s.category_ids || []).includes(c.id)).length,
    })), [hideCategoryFilter, data.categories, data.stores]);

    const showFilters = categories.length > 0 || areas.length > 0;

    const stores = useMemo(
        () => data.stores.filter((s) =>
            (filters.category === null || (s.category_ids || []).includes(filters.category)) &&
            (!filters.area || s.locality === filters.area)
        ),
        [data.stores, filters]
    );
    const activeCategory = categories.find((c) => c.id === filters.category);

    /* the city page lists only the main market's stores, so it suggests the city's other markets.
       a market page is already narrowed down and shows no suggestion */
    const listedMarket = data.market_name;
    const otherMarkets = town || desktop ? [] : (data.store_available_markets || []).filter((m) => m.toLowerCase() !== listedMarket);
    const marketCardIndex = Math.min(MARKET_CARD_AFTER, stores.length) - 1;

    return (
        <>
            {showFilters && (
                desktop
                    ? <div className="bg-white rounded-xl border border-gray-200 mb-4 sticky top-[104px] z-30">
                        <StoreFilters categories={categories} areas={areas} filters={filters} onChange={setFilters} />
                    </div>
                    : <StoreFilters categories={categories} areas={areas} filters={filters} onChange={setFilters} />
            )}

            <div className={desktop ? "" : "px-2 py-4"}>

                <div className={desktop ? "grid grid-cols-2 gap-4 items-stretch" : "space-y-3"}>
                    {stores.map((store, index) => (
                        <Fragment key={store.id}>
                            <StoreCard store={store} desktop={desktop} />
                            {index === marketCardIndex && <MarketSuggestion state={state} city={city} markets={otherMarkets} />}
                        </Fragment>
                    ))}

                    {stores.length === 0 && data.stores.length > 0 && (
                        <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6 text-center">
                            <p className="text-sm font-semibold text-deep">No pharmacy matches these filters</p>
                            <button onClick={() => setFilters({ ...EMPTY_STORE_FILTERS })} className="mt-3 text-xs font-semibold text-primary">
                                Clear filters
                            </button>
                        </div>
                    )}
                    {/* no stores in the main market, the other markets are still worth offering */}
                    {data.stores.length === 0 && <MarketSuggestion state={state} city={city} markets={otherMarkets} />}
                </div>
            </div>
        </>
    );
};
export default StoreResults;
