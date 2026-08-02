'use client'
import { useMemo, useState } from "react";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { TAllCategories } from "@/lib/hooks/useCategories";
import { groupCategoryDisplayName, groupCategoryHeading } from "@/lib/helper/format-text";
import { categoryResultPageLink } from "@/lib/helper/link";
import { doctorSpecialityIcon } from "@/lib/image";

const groupAnchorId = (group: string) => `group-${group.replace(/\s+/g, '-')}`;

const AllSpecialistsView = ({ data, state, city, town }: { data: TAllCategories, state: string, city: string, town?: string }) => {
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

    const groupsWithMatches = useMemo(() => {
        return data.group_categories.filter((group) => {
            const mapping = data.categoryDataMapping[group];
            if (!mapping) return false;
            const noChildMatches = mapping.no_child_cats.some(matchesSearch);
            const childMatches = mapping.has_child_cats.some((parentId) => (mapping[parentId] || []).some(matchesSearch));
            return noChildMatches || childMatches;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, searchText]);

    return (
        <>
            <div className="sticky top-0 z-10 bg-white px-2 py-2 border-b">
                <div className="relative">
                    <BiSearch className="absolute pointer-events-none" style={{ top: "50%", left: "0.75rem", transform: "translateY(-50%)" }} />
                    <input
                        type="text"
                        placeholder="Search specialists, treatments..."
                        value={searchText}
                        onChange={(e) => { setSearchText(e.target.value) }}
                        className="w-full h-10 rounded-full border outline-none fs-14"
                        style={{ textIndent: "1.9rem" }}
                    />
                </div>
            </div>
            <div className="flex">
                <div className="w-24 border-r px-1 py-2 overflow-auto flex-shrink-0" style={{ height: "calc(100vh - 108px)" }}>
                    {data.group_categories.map((gcat) => {
                        const isActive = gcat === activeGroup;
                        return (
                            <div
                                key={gcat}
                                onClick={() => { onSelectGroup(gcat) }}
                                className={`text-center rounded-md py-2 px-1 mb-1 fs-12 leading-tight ${isActive ? 'bg-primary-20 color-primary font-semibold' : 'color-text-light'}`}
                            >
                                {groupCategoryDisplayName(gcat)}
                            </div>
                        )
                    })}
                </div>
                <div className="grow px-2 overflow-auto" style={{ height: "calc(100vh - 108px)" }}>
                    {groupsWithMatches.length === 0 &&
                        <div className="flex flex-col items-center justify-center py-16 gap-2">
                            <BiSearch className="text-3xl color-text-light" />
                            <span className="fs-14 color-text-light">No specialists found for &quot;{searchText}&quot;</span>
                        </div>
                    }
                    {groupsWithMatches.map((group_category) => {
                        const mapping = data.categoryDataMapping[group_category];
                        const noChildIds = mapping.no_child_cats.filter(matchesSearch);
                        const childIds = mapping.has_child_cats.flatMap((parentId) => (mapping[parentId] || []).filter(matchesSearch));
                        return (
                            <div key={group_category} id={groupAnchorId(group_category)} className="mb-3" style={{ scrollMarginTop: "0.5rem" }}>
                                <div className="py-2 fs-14 font-semibold">{groupCategoryHeading(group_category)}</div>
                                <div className="flex gap-2 flex-wrap">
                                    {noChildIds.map((id) => (
                                        <Link href={buildLink(id)} key={id} className="border bg-white px-3 py-2 rounded-full fs-13 font-semibold color-text-light hover:border-color-primary hover:color-primary transition-colors">
                                            {data.categoryData[id].name}
                                        </Link>
                                    ))}
                                    {childIds.map((id) => (
                                        <Link href={buildLink(id)} key={id} className="border bg-white pl-1 pr-3 py-1 rounded-full flex items-center gap-2 hover:border-color-primary transition-colors">
                                            {data.categoryData[id].icon &&
                                                <img src={doctorSpecialityIcon(data.categoryData[id].icon)} alt={data.categoryData[id].name} className="h-7 w-7 rounded-full object-cover" />
                                            }
                                            <span className="fs-13 font-semibold color-text-light">{data.categoryData[id].name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default AllSpecialistsView;
