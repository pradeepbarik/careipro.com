'use client'
import { useMemo, useState } from "react";
import Link from "next/link";
import { BiSearch, BiX, BiChevronRight } from "react-icons/bi";
import { TAllCategories } from "@/lib/hooks/useCategories";
import { groupCategoryDisplayName, groupCategoryHeading, capitalizeFirstLetter } from "@/lib/helper/format-text";
import { categoryResultPageLink, cityPageLink } from "@/lib/helper/link";
import { doctorSpecialityIcon } from "@/lib/image";

const groupAnchorId = (group: string) => `group-${group.replace(/\s+/g, '-')}`;

/* the site header is sticky and about 104px tall, so an anchored section has to stop below it or it
   lands underneath the header it just scrolled past */
const STICKY_OFFSET = "7rem";

type TProps = { data: TAllCategories, state: string, city: string, town?: string };

/**
 * Every category careipro lists, on desktop. The phone version is a narrow rail of group names
 * beside a scrolling column; here the groups become a sidebar and the categories a grid, because a
 * row of chips wrapping across 1200px is hard to read down.
 *
 * Search and the group jump both work the way they do on the phone, so the two pages behave the same
 * even though they look different.
 */
const AllSpecialistsDesktop = ({ data, state, city, town }: TProps) => {
    const [searchText, setSearchText] = useState("");
    const [activeGroup, setActiveGroup] = useState<string>(data.group_categories[0] || "");

    const searchActive = searchText.trim().length >= 2;
    const matchesSearch = (id: string) => !searchActive || (data.categoryData[id]?.name || "").toLowerCase().includes(searchText.trim().toLowerCase());

    const onSelectGroup = (group: string) => {
        setActiveGroup(group);
        document.getElementById(groupAnchorId(group))?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const buildLink = (id: string) => categoryResultPageLink({
        state, city, town: town || "",
        seo_url: data.categoryData[id].seo_url,
        seo_id: data.categoryData[id].seo_id,
        group_category: data.categoryData[id].group_category
    });

    /* one pass per group: the ids it would show, in the order the phone shows them, with the ones
       that have no children first */
    const groupMatches = useMemo(() => {
        const matches: Record<string, string[]> = {};
        for (const group of data.group_categories) {
            const mapping = data.categoryDataMapping[group];
            if (!mapping) continue;
            const ids = [
                ...mapping.no_child_cats.filter(matchesSearch),
                ...mapping.has_child_cats.flatMap((parentId) => (mapping[parentId] || []).filter(matchesSearch))
            ];
            if (ids.length > 0) matches[group] = ids;
        }
        return matches;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, searchText]);

    const shownGroups = data.group_categories.filter((group) => groupMatches[group]);
    const totalShown = shownGroups.reduce((sum, group) => sum + groupMatches[group].length, 0);
    const cityLabel = capitalizeFirstLetter(city || '');

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-7xl mx-auto px-4 py-5">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                    Specialists &amp; services in {cityLabel}
                </h1>
                <p className="fs-14 text-gray-500 mt-0.5 mb-4">
                    Doctor specialities, treatments, clinics, caretakers, physiotherapy and more
                </p>

                <div className="grid grid-cols-[16rem_1fr] gap-5 items-start">
                    <nav aria-label="Categories" className="sticky top-[104px] bg-white rounded-xl border border-gray-200 p-2">
                        {data.group_categories.map((group) => {
                            const count = groupMatches[group]?.length || 0;
                            const isActive = group === activeGroup;
                            return (
                                <button
                                    key={group}
                                    type="button"
                                    onClick={() => onSelectGroup(group)}
                                    disabled={count === 0}
                                    aria-current={isActive ? "true" : undefined}
                                    className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 fs-14 font-semibold text-left transition-colors ${count === 0
                                        ? "text-gray-300 cursor-not-allowed"
                                        : isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-primary"}`}
                                >
                                    <span className="min-w-0 truncate">{groupCategoryDisplayName(group)}</span>
                                    {count > 0 && <span className="ml-auto fs-12 text-gray-400 shrink-0">{count}</span>}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="min-w-0">
                        <div className="bg-white rounded-xl border border-gray-200 p-3 mb-4 flex items-center gap-3">
                            <div className="relative flex-1 max-w-lg">
                                <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
                                <input
                                    type="search"
                                    value={searchText}
                                    placeholder="Search specialists, treatments, services..."
                                    aria-label="Search specialists, treatments and services"
                                    className="w-full fs-14 text-gray-800 bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-8 py-2 outline-none focus:border-primary focus:bg-white transition-colors [&::-webkit-search-cancel-button]:hidden"
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                                {searchText.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchText("")}
                                        aria-label="Clear search"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <BiX className="text-lg" />
                                    </button>
                                )}
                            </div>
                            {searchActive && (
                                <p className="ml-auto fs-14 text-gray-500 shrink-0">
                                    <b className="text-gray-800">{totalShown}</b> {totalShown === 1 ? "match" : "matches"}
                                </p>
                            )}
                        </div>

                        {shownGroups.length === 0 ? (
                            <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
                                <BiSearch className="text-3xl text-gray-300 mx-auto" />
                                <p className="font-semibold text-gray-700 mt-2">No specialists found for &quot;{searchText}&quot;</p>
                                <button
                                    type="button"
                                    onClick={() => setSearchText("")}
                                    className="mt-2 fs-14 font-semibold text-primary hover:underline"
                                >
                                    Clear search
                                </button>
                            </div>
                        ) : shownGroups.map((group) => (
                            <section
                                key={group}
                                id={groupAnchorId(group)}
                                className="bg-white rounded-xl border border-gray-200 p-5 mb-4"
                                style={{ scrollMarginTop: STICKY_OFFSET }}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1 h-5 bg-primary rounded-full"></div>
                                    <h2 className="font-bold text-gray-800">{groupCategoryHeading(group)}</h2>
                                    <span className="fs-13 text-gray-400">{groupMatches[group].length}</span>
                                </div>
                                {/* one grid for the whole group rather than chips: the icon is optional in
                                    the data, so a tile without one keeps the same box and the rows stay
                                    aligned instead of ragging like wrapped pills */}
                                <div className="grid grid-cols-4 gap-2">
                                    {groupMatches[group].map((id) => (
                                        <Link
                                            key={id}
                                            href={buildLink(id)}
                                            title={data.categoryData[id].name}
                                            className="group flex items-center gap-2.5 rounded-lg border border-gray-200 px-3 py-2 hover:border-primary hover:bg-primary/5 transition-colors min-w-0"
                                        >
                                            {data.categoryData[id].icon ? (
                                                <img
                                                    src={doctorSpecialityIcon(data.categoryData[id].icon)}
                                                    alt=""
                                                    className="h-8 w-8 rounded-full object-cover shrink-0 bg-gray-50"
                                                />
                                            ) : (
                                                <span className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 fs-13 font-bold">
                                                    {data.categoryData[id].name.charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                            <span className="fs-13 font-semibold text-gray-700 group-hover:text-primary transition-colors min-w-0 truncate">
                                                {data.categoryData[id].name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>

                <nav aria-label="Breadcrumb" className="flex items-center gap-1 fs-13 text-gray-500 mt-5">
                    <Link href="/" className="hover:text-primary">Careipro</Link>
                    <BiChevronRight className="shrink-0" />
                    <Link href={cityPageLink(state, city)} className="hover:text-primary">{cityLabel}</Link>
                    <BiChevronRight className="shrink-0" />
                    <span className="text-gray-700 font-medium">Specialists &amp; services</span>
                </nav>
            </main>
        </div>
    );
};

export default AllSpecialistsDesktop;
