'use client'
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiFillCaretDown } from "react-icons/ai";
import { BiSearch, BiSolidMap, BiChevronRight } from "react-icons/bi";
import { fetchJson } from "@/lib/services/http-client";
import { Tcity, Tstate } from "@/lib/types";
import { cityPageLink } from "@/lib/helper/link";
import { capitalizeFirstLetter } from "@/lib/helper/format-text";

type TCitiesResponse = { states: Tstate[], data: Record<string, Tcity[]> };

/**
 * The city picker in the desktop header.
 *
 * On a phone the pill goes to the service available cities page, which is the right shape for a
 * small screen. On desktop there is room to choose without leaving the page, so the same pill opens
 * a panel with a search box instead.
 *
 * The city list is fetched the first time the panel is opened rather than with every page render.
 * The header sits in the root layout, so fetching it up front would cost a request on every page for
 * a panel most visitors never open.
 */
const CityDropdown = ({ state, city }: { state: string, city: string }) => {
    const router = useRouter();
    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [cities, setCities] = useState<Tcity[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (!open) return;
        inputRef.current?.focus();
        const onPointerDown = (e: MouseEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onPointerDown);
        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    useEffect(() => {
        if (!open || cities !== null || loading) return;
        setLoading(true);
        fetchJson<TCitiesResponse>("/cache/india/service-available-cities.json")
            .then((res) => {
                /* only the cities careipro actually serves: picking one it does not would land the
                   visitor on an empty city page */
                setCities(Object.values(res?.data || {}).flat().filter((c) => c.is_serviceable === 1));
            })
            .catch(() => {
                /* the panel falls back to its link out, which is the page that can also take a
                   request for a city that is not covered yet */
                setCities([]);
            })
            .finally(() => setLoading(false));
    }, [open, cities, loading]);

    const shown = useMemo(() => {
        const list = cities || [];
        const needle = query.trim().toLowerCase();
        const matched = needle
            ? list.filter((c) => (c.name_ln || c.name).toLowerCase().includes(needle) || (c.state || "").toLowerCase().includes(needle))
            : list;
        return [...matched].sort((a, b) => (a.name_ln || a.name).localeCompare(b.name_ln || b.name));
    }, [cities, query]);

    const onPick = (picked: Tcity) => {
        setOpen(false);
        setQuery("");
        router.push(cityPageLink(picked.state, picked.name));
    };

    return (
        <div className="relative shrink-0" ref={rootRef}>
            {/* still a real link to the cities page, so it is crawlable and a middle click or
                "open in new tab" behaves. only a plain left click opens the panel instead. */}
            <Link
                href="/service-available-cities"
                title="Change city"
                aria-haspopup="dialog"
                aria-expanded={open}
                onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                    e.preventDefault();
                    setOpen((was) => !was);
                }}
                className="flex items-center gap-1 rounded-full border border-line px-3 py-1.5 fs-14 font-semibold capitalize hover:border-primary hover:text-primary transition-colors"
            >
                <BiSolidMap className="text-primary text-base" />
                {city || 'Select City'}
                <AiFillCaretDown className={`text-xs text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
            </Link>

            {open && (
                <div
                    role="dialog"
                    aria-label="Choose a city"
                    className="absolute left-0 top-full mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-xl z-[110] overflow-hidden"
                >
                    <div className="p-3 border-b border-gray-100">
                        <div className="relative">
                            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
                            <input
                                ref={inputRef}
                                type="search"
                                value={query}
                                placeholder="Search your city..."
                                aria-label="Search your city"
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full fs-14 text-gray-800 bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 outline-none focus:border-primary focus:bg-white transition-colors"
                            />
                        </div>
                    </div>

                    <div className="max-h-80 overflow-y-auto py-1">
                        {loading && (
                            <div className="px-3 py-2 space-y-2">
                                {[0, 1, 2, 3].map((i) => <div key={i} className="h-7 bg-gray-100 rounded animate-pulse" />)}
                            </div>
                        )}
                        {!loading && shown.length === 0 && (
                            <p className="px-4 py-6 text-center fs-13 text-gray-500">
                                {query.trim() ? <>No serviceable city matches &quot;{query.trim()}&quot;</> : "City list is not available right now"}
                            </p>
                        )}
                        {!loading && shown.map((option) => {
                            const isCurrent = (option.name || "").toLowerCase() === (city || "").toLowerCase()
                                && (option.state || "").toLowerCase() === (state || "").toLowerCase();
                            return (
                                <button
                                    key={`${option.state}-${option.id}`}
                                    type="button"
                                    onClick={() => onPick(option)}
                                    aria-current={isCurrent ? "true" : undefined}
                                    className={`w-full flex items-center gap-2 px-4 py-2 fs-14 text-left transition-colors ${isCurrent
                                        ? "bg-primary/10 text-primary font-semibold"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-primary"}`}
                                >
                                    <BiSolidMap className={`shrink-0 ${isCurrent ? "text-primary" : "text-gray-300"}`} />
                                    <span className="min-w-0 truncate">{capitalizeFirstLetter(option.name_ln || option.name)}</span>
                                    <span className="ml-auto fs-12 text-gray-400 shrink-0 capitalize">{option.state}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* the page behind this panel can also take a request for a city careipro does not
                        cover yet, which the panel itself deliberately does not list */}
                    <Link
                        href="/service-available-cities"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-1 px-4 py-2.5 border-t border-gray-100 fs-13 font-semibold text-primary hover:bg-gray-50 transition-colors"
                    >
                        View all cities<BiChevronRight className="text-base" />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CityDropdown;
