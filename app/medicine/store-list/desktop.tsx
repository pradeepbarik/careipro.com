import Link from "next/link";
import { BiChevronRight, BiCurrentLocation } from "react-icons/bi";
import { GiMedicines } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";
import { TStoreListResponse } from "@/lib/hooks/useMedicineStore";
import { capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";
import { cityPageLink, medicineStoreListLink } from "@/lib/helper/link";
import StoreCategories, { categoryHeading } from "./store-categories";
import StoreResults from "./store-results";
import { UltraWideAd } from "@/app/components/mobile/ads-container";

type TProps = {
    data: TStoreListResponse, state: string, city: string,
    //the market from the url, empty on the city page
    town: string,
    //set on the category page
    catId?: number,
};

/**
 * The desktop store list, for the city page, a market page and a category page. The stores take
 * the wide column two to a row; the side column moves the visitor to another market of the city.
 */
const StoreListDesktop = ({ data, state, city, town, catId }: TProps) => {
    /* the city page lists the city's main market, so its categories and areas belong to that market */
    const market = town || data.market_name || data.stores[0]?.market_name || "";
    const marketName = capitalizeEachWordFirstLetter(market);
    const cityName = capitalizeEachWordFirstLetter(data.city || city);
    const place = marketName && marketName.toLowerCase() !== cityName.toLowerCase() ? `${marketName}, ${cityName}` : cityName;
    const category = catId ? data.categories?.find((c) => c.id === catId) : undefined;
    const heading = catId ? categoryHeading(category?.name) : "Medicine Stores";
    const otherMarkets = (data.store_available_markets || []).filter((m) => m.toLowerCase() !== market.toLowerCase());
    const deliveringCount = data.stores.filter((s) => s.medicine_home_delivery === 1).length;
    const marketListLink = medicineStoreListLink({ state, city, market_name: market });

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-7xl mx-auto px-4 py-5">
                <nav aria-label="Breadcrumb" className="flex items-center gap-1 fs-13 text-gray-500 mb-3">
                    <Link href="/" className="hover:text-primary">Careipro</Link>
                    <BiChevronRight className="shrink-0" />
                    <Link href={cityPageLink(state, city)} className="hover:text-primary">{cityName}</Link>
                    <BiChevronRight className="shrink-0" />
                    {town || catId ? (
                        <Link href={medicineStoreListLink({ state, city })} className="hover:text-primary">Medicine Stores</Link>
                    ) : <span className="text-gray-700 font-medium">Medicine Stores</span>}
                    {town && <>
                        <BiChevronRight className="shrink-0" />
                        {catId
                            ? <Link href={marketListLink} className="hover:text-primary">{marketName}</Link>
                            : <span className="text-gray-700 font-medium">{marketName}</span>}
                    </>}
                    {catId ? <>
                        <BiChevronRight className="shrink-0" />
                        <span className="text-gray-700 font-medium">{heading}</span>
                    </> : null}
                </nav>

                {/* thin 12:1 strip like the doctor list desktop, a 2:1 ad would run very tall at this width */}
                <UltraWideAd page_type="medicine_store_list" city={city} ad_selection="random" />

                <h1 className="text-2xl font-bold text-gray-900 leading-tight">{heading} in {place}</h1>
                {data.stores.length > 0 ? (
                    <p className="fs-14 text-gray-500 mt-0.5 mb-4">
                        {data.stores.length} {data.stores.length === 1 ? "pharmacy" : "pharmacies"}
                        {deliveringCount > 0 && <> · {deliveringCount} with home delivery</>}
                        {" "}· call or WhatsApp the store directly
                    </p>
                ) : <div className="mb-4" />}

                <div className="grid grid-cols-[7fr_3fr] gap-5 items-start">
                    <div className="min-w-0">
                        <StoreCategories categories={data.categories} state={state} city={city} market={market}
                            activeId={catId} title={"Find Medicine stores by Category"} desktop />

                        {data.stores.length > 0 ? (
                            <StoreResults data={data} state={state} city={city} town={town} hideCategoryFilter={!!catId} desktop />
                        ) : (
                            <div className="bg-white rounded-xl border border-gray-200 py-14 text-center">
                                <span className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                                    <GiMedicines className="text-3xl text-primary" />
                                </span>
                                <p className="font-semibold text-gray-700 mt-3">No {heading.toLowerCase()} listed in {marketName || cityName} yet</p>
                                {catId ? <>
                                    <p className="fs-14 text-gray-500 mt-1">Other pharmacies in {marketName} may still have what you need.</p>
                                    <Link href={marketListLink} className="button mt-4 inline-flex" data-size="small">
                                        See all medicine stores in {marketName}
                                    </Link>
                                </> : (
                                    <p className="fs-14 text-gray-500 mt-1">Try another area of {cityName}.</p>
                                )}
                            </div>
                        )}
                    </div>

                    <aside className="min-w-0 sticky top-[104px] flex flex-col gap-4">
                        {/* the city page shows the main market only, so the other markets are one click away */}
                        {otherMarkets.length > 0 && (
                            <div className="bg-white rounded-xl border border-gray-200 p-4">
                                <h2 className="flex items-center gap-2 font-bold text-gray-800 fs-15 mb-3">
                                    <BiCurrentLocation className="text-primary shrink-0" />
                                    Medicine stores in other areas of {cityName}
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {otherMarkets.map((m) => (
                                        <Link key={m} href={medicineStoreListLink({ state, city, market_name: m })}
                                            className="fs-13 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-700 hover:border-primary hover:text-primary transition-colors">
                                            {capitalizeEachWordFirstLetter(m)}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* the category page narrows the market, this goes back to every store in it */}
                        {catId ? (
                            <Link href={marketListLink}
                                className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 hover:border-primary transition-colors">
                                <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <MdDeliveryDining className="text-xl text-primary" />
                                </span>
                                <span className="flex-1 min-w-0">
                                    <span className="block font-bold text-gray-800 fs-15">All medicine stores in {marketName}</span>
                                    <span className="block fs-13 text-gray-500">Every pharmacy, whatever it stocks</span>
                                </span>
                                <BiChevronRight className="text-xl text-primary shrink-0" />
                            </Link>
                        ) : null}
                    </aside>
                </div>
            </main>
        </div>
    );
};
export default StoreListDesktop;
