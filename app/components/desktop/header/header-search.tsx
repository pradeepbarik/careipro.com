'use client'
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BiSearch, BiX, BiMap } from "react-icons/bi";
import { fetchJson } from "@/lib/services/http-client";
import { searchPageUrl } from "@/lib/helper/link";
import { suggestionUrl, TSearchSuggestion } from "@/lib/helper/search-suggestion";

//the api only has something useful to say from two characters on
const MIN_CHARS = 2;
const DEBOUNCE_MS = 250;

/**
 * The header search on desktop.
 *
 * On a phone the box sends the visitor to the search page, which is the whole screen and the right
 * shape there. On desktop the suggestions drop under the box the way the city picker does, so a
 * visitor goes straight from typing to the doctor or specialism they wanted without a page in
 * between.
 *
 * The form around it is kept and still points at the search page: pressing enter on free text that
 * matches no suggestion has to land somewhere, and without javascript the box still works.
 */
const HeaderSearch = ({ state, city }: { state: string, city: string }) => {
    const router = useRouter();
    const rootRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<TSearchSuggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        const text = query.trim();
        if (text.length < MIN_CHARS) {
            setSuggestions([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        debounceRef.current = setTimeout(() => {
            fetchJson<{ code: number, data: TSearchSuggestion[] }>(
                `/auto-suggestions?q=${encodeURIComponent(text)}&city=${encodeURIComponent(city || "")}&limit=10`
            )
                .then((res: any) => setSuggestions(res?.code === 200 ? (res.data ?? []) : []))
                .catch(() => setSuggestions([]))
                .finally(() => setLoading(false));
        }, DEBOUNCE_MS);
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [query, city]);

    const onPick = (suggestion: TSearchSuggestion) => {
        //fire and forget, the count must not hold up the navigation
        if (suggestion._id) {
            fetchJson(`/auto-suggestions/click?id=${encodeURIComponent(suggestion._id)}`).catch(() => { });
        }
        const destination = suggestionUrl(suggestion, state, city);
        setOpen(false);
        if (!destination) {
            /* nothing addressable, which happens when no city is known yet. the search page can take
               the words and ask for a location, which beats the click doing nothing at all */
            router.push(`${searchPageUrl(state || '', city || '')}?q=${encodeURIComponent(suggestion.text)}`);
            return;
        }
        if (destination.newTab) {
            window.open(destination.url, "_blank", "noopener,noreferrer");
            return;
        }
        router.push(destination.url);
    };

    const showPanel = open && query.trim().length >= MIN_CHARS;

    return (
        <div className="relative flex-1 max-w-xl" ref={rootRef}>
            {/* a plain GET form, the rewrite of /:state/:city/search carries q through to the search page */}
            <form role="search" action={searchPageUrl(state || '', city || '')}>
                <label className="flex items-center gap-2 rounded-full border border-line bg-gray-50 px-4 h-10 focus-within:border-primary focus-within:bg-white transition-colors">
                    <BiSearch className="text-muted text-xl shrink-0" />
                    <input
                        type="search"
                        name="q"
                        value={query}
                        autoComplete="off"
                        placeholder="Search doctors, clinics, hospitals…"
                        aria-label="Search doctors, clinics, hospitals"
                        className="w-full bg-transparent outline-none fs-14 placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
                        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
                        onFocus={() => setOpen(true)}
                    />
                    {query.length > 0 && (
                        <button
                            type="button"
                            onClick={() => { setQuery(""); setSuggestions([]); }}
                            aria-label="Clear search"
                            className="text-gray-400 hover:text-gray-600 shrink-0"
                        >
                            <BiX className="text-lg" />
                        </button>
                    )}
                </label>
            </form>

            {showPanel && (
                <div
                    role="listbox"
                    aria-label="Search suggestions"
                    className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl border border-gray-200 shadow-xl z-[110] overflow-hidden"
                >
                    {loading && (
                        <div className="p-3 space-y-2">
                            {[0, 1, 2].map((i) => <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />)}
                        </div>
                    )}
                    {!loading && suggestions.length === 0 && (
                        <p className="px-4 py-6 text-center fs-13 text-gray-500">
                            Nothing matches &quot;{query.trim()}&quot; yet. Press enter to search the full site.
                        </p>
                    )}
                    {!loading && suggestions.length > 0 && (
                        <div className="max-h-96 overflow-y-auto py-1">
                            {suggestions.map((suggestion, i) => (
                                /* mousedown rather than click: the input losing focus must not close the
                                   panel before the click has a chance to land */
                                <button
                                    key={`${suggestion._id || suggestion.text}-${i}`}
                                    type="button"
                                    onMouseDown={() => onPick(suggestion)}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 group transition-colors"
                                >
                                    <span className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 fs-14">
                                        {suggestion.icon ? suggestion.icon : <BiSearch />}
                                    </span>
                                    <span className="flex flex-col min-w-0">
                                        <span className="fs-14 font-medium text-gray-800 capitalize truncate group-hover:text-primary transition-colors">
                                            {suggestion.text}
                                        </span>
                                        {suggestion.type && (
                                            <span className="flex items-center gap-1.5 fs-12 text-gray-400 capitalize min-w-0">
                                                {suggestion.type}
                                                {suggestion.type === "doctor" && (suggestion.location || suggestion.city) && (
                                                    <>
                                                        <span className="text-gray-300">•</span>
                                                        <span className="flex items-center gap-0.5 text-primary truncate">
                                                            <BiMap className="shrink-0" />
                                                            {suggestion.location || suggestion.city}
                                                        </span>
                                                    </>
                                                )}
                                            </span>
                                        )}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HeaderSearch;
