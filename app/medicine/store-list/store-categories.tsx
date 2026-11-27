import Link from "next/link";
import { IconType } from "react-icons";
import { GiBabyBottle, GiHerbsBundle, GiMedicines, GiMortar } from "react-icons/gi";
import { MdFace } from "react-icons/md";
import { capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";
import { medicineStoreCategoryLink } from "@/lib/helper/link";
import { TStoreListResponse } from "@/lib/hooks/useMedicineStore";

/* the categories have no icon saved in the db yet, so one is picked from the name */
const ICONS: Array<[RegExp, IconType]> = [
    [/ayurved/i, GiHerbsBundle],
    [/homeo/i, GiMortar],
    [/pediatric|child|baby/i, GiBabyBottle],
    [/skin/i, MdFace],
];
const iconFor = (name: string) => ICONS.find(([re]) => re.test(name))?.[1] || GiMedicines;

/* a category's name as a heading: "General Medicine Store" -> "General Medicine Stores",
   "Ayurvedic" -> "Ayurvedic Medicine Stores". the category page uses it for the title too */
export const categoryHeading = (name?: string) => {
    const text = capitalizeEachWordFirstLetter(name || "Medicine");
    return /stores?$/i.test(text) ? text.replace(/store$/i, "Stores") : `${text} Medicine Stores`;
}

/**
 * The medicine store categories under the banner, each one opening that category's store list
 * for the market. Plain links in server html, so search engines follow them to the category pages.
 */
const StoreCategories = ({ categories, state, city, market, activeId, title = "Find Medicine stores by Category", desktop = false }: {
    categories: TStoreListResponse["categories"], state: string, city: string, market: string,
    //the category page marks the one it is showing
    activeId?: number, title?: string,
    //six to a row in the wide desktop column
    desktop?: boolean
}) => {
    if (!categories?.length || !market) {
        return null;
    }
    return (
        <section className={desktop ? "bg-white rounded-xl border border-gray-200 p-4 mb-4" : "px-4 pt-4"}>
            <h2 className="text-base font-semibold text-deep">{title}</h2>
            {/* four to a row, so the categories wrap onto a second line instead of scrolling sideways */}
            <div className={`grid gap-x-2 gap-y-4 mt-3 ${desktop ? "grid-cols-6" : "grid-cols-4"}`}>
                {categories.map((c) => {
                    const Icon = iconFor(c.name);
                    const active = c.id === activeId;
                    return (
                        <Link key={c.id}
                            href={medicineStoreCategoryLink({ state, city, market_name: market, seo_url: c.seo_url || c.name, cat_id: c.id })}
                            aria-current={active ? "page" : undefined}
                            className="min-w-0 flex flex-col items-center text-center">
                            <span className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${active ? "bg-primary border-primary" : "bg-primary/10 border-primary/20"}`}>
                                <Icon className={`text-2xl ${active ? "text-white" : "text-primary"}`} />
                            </span>
                            <span className={`mt-1.5 text-xs leading-tight line-clamp-2 ${active ? "font-semibold text-primary" : "font-medium text-gray-700"}`}>
                                {capitalizeEachWordFirstLetter(c.name)}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};
export default StoreCategories;
