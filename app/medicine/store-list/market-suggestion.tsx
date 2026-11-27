import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";
import { medicineStoreListLink } from "@/lib/helper/link";

/**
 * Shown between the stores on the city page. That page lists the stores of the city's main market
 * only, so this points people who live elsewhere in the city to the store list of their own market.
 */
const MarketSuggestion = ({ state, city, markets }: { state: string, city: string, markets: string[] }) => {
    if (markets.length === 0) {
        return null;
    }
    return (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
            <p className="text-sm font-semibold text-deep">
                {markets.length === 1
                    ? <>Are you looking for medicine stores in {capitalizeEachWordFirstLetter(markets[0])}?</>
                    : <>Are you looking for medicine stores in another area?</>}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
                {markets.map((market) => (
                    <Link key={market} href={medicineStoreListLink({ state, city, market_name: market })}
                        className="flex items-center gap-1 text-xs font-semibold text-primary bg-white border border-primary/30 rounded-full pl-2.5 pr-1.5 py-1.5">
                        <FaMapMarkerAlt className="text-[10px]" />
                        {capitalizeEachWordFirstLetter(market)}
                        <BiChevronRight className="text-sm" />
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default MarketSuggestion;
