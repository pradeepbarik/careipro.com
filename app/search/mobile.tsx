"use client";
import { capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";
import { fetchJson } from "@/lib/services/http-client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { doctorsBySpecialistPageUrl,doctorDetailPageUrl } from "@/lib/helper/link";
import { TSearchPageData } from "@/lib/hooks/useSearch";
const LOCATION_SUGGESTIONS = [
    "Bhadrak, Odisha",
    "Bhubaneswar, Odisha",
    "Cuttack, Odisha",
    "Puri, Odisha",
    "Rourkela, Odisha",
    "Kolkata, West Bengal",
    "Mumbai, Maharashtra",
    "Delhi, Delhi",
];

const SearchBox = ({ state, city, q, data }: { state: string; city: string; q?: string; data: TSearchPageData }) => {
    const router = useRouter();
    const [query, setQuery] = useState(q || "");
    const [focused, setFocused] = useState(false);
    const [suggestions, setSuggestions] = useState<{ _id?: string; text: string; type?: string; icon?: string; vertical?: string; location?: string; city?: string; resolver_url?: { url: string; target?: string },resolver:any,doctor_info?:any }[]>([]);
    const [sugLoading, setSugLoading] = useState(false);
    const [locationOpen, setLocationOpen] = useState(false);
    const [locQuery, setLocQuery] = useState("");
    const [comingSoonOpen, setComingSoonOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(`${city || "Bhadrak"}, ${state || "Odisha"}`);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isDeletingRef = useRef(false);

    const fetchSuggestions = useCallback(async (q: string) => {
        if (!q.trim()) { setSuggestions([]); return; }
        setSugLoading(true);
        try {
            const city = selectedLocation.split(",")[0].trim();
            const json:any = await fetchJson<{ code: number; data: { text: string; type?: string; icon?: string; vertical?: string; resolver_url?: { url: string; target?: string } }[] }>(`/auto-suggestions?q=${encodeURIComponent(q)}&city=${encodeURIComponent(city)}&limit=10`);
            if (json.code === 200) {
                const data = json.data ?? [];
                setSuggestions(data);
                // report unresolved keyword only when user is typing forward
                if (data.length === 0 && !isDeletingRef.current && q.trim().length >= 3) {
                    fetchJson(`/auto-suggestions/unresolved?q=${encodeURIComponent(q)}&city=${encodeURIComponent(city)}`).catch(() => {});
                }
            }
        } catch { /* ignore */ } finally {
            setSugLoading(false);
        }
    }, [selectedLocation]);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => fetchSuggestions(query), 300);
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [query, fetchSuggestions]);

    const filteredLocs = locQuery.trim()
        ? LOCATION_SUGGESTIONS.filter(l => l.toLowerCase().includes(locQuery.toLowerCase()))
        : LOCATION_SUGGESTIONS;

    const handleSelectLocation = (loc: string) => {
        setSelectedLocation(loc);
        setLocationOpen(false);
        setLocQuery("");
    };

    const handleSuggestionClick = (s: typeof suggestions[number]) => {
        // fire-and-forget click count increment
        if (s._id) {
            fetchJson(`/auto-suggestions/click?id=${encodeURIComponent(s._id)}`).catch(() => {});
        }
        if (s.resolver_url?.url) {
            const target = s.resolver_url.target;
            if (target === "_blank") {
                window.open(s.resolver_url.url, "_blank");
            } else {
                router.push(s.resolver_url.url);
            }
            return;
        }
        const city = selectedLocation.split(",")[0].trim();
        const state = selectedLocation.split(",")[1]?.trim() ?? "";
        const q = encodeURIComponent(s.text);
        const vertical = (s.vertical ?? "").toLowerCase();
        let rurl = "";
        if (vertical === "doctor") {
            if (s.type === "specialists" || s.type === "disease") {
               rurl = doctorsBySpecialistPageUrl(s.text.toLowerCase().replace(/ /g, "-"), `CATG${s.resolver.cat_id}-${s.resolver.group_cat}`, state, city, { market_name: "" })+ `?q=${q}&frmpg=search_suggestion`;
            }else if(s.type === "doctor"){
                rurl = doctorDetailPageUrl({
                    doctor_id: s.resolver.doctor_id,
                    service_loc_id: s.doctor_info.service_loc_id,
                    clinic_id: s.doctor_info.clinic_id,
                    seo_url: s.text.toLowerCase().replace(/ /g, "-"),
                    state,
                    city,
                    type: "DOCTOR",
                    market_name: "",
                }) + `?q=${q}&frmpg=search_suggestion`;
            }
        }
        if (rurl) {
            router.push(rurl);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex flex-col">
            {/* Top bar with back button */}
            <div className="flex items-center px-3 pt-4 pb-1">
                <button
                    onClick={() => router.back()}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-sm border border-gray-100 text-gray-600 active:scale-95 transition-transform"
                    aria-label="Go back"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <span className="ml-3 text-sm font-semibold text-gray-700">Search</span>
            </div>
            {/* Search Card */}
            <div className="mt-2 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl shadow-cyan-100 p-4">
                    {/* Location row */}
                    <div className="flex items-center gap-2 mb-3 px-1">
                        <svg className="w-4 h-4 text-cyan-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-4-7-7.5-7-11a7 7 0 0 1 14 0c0 3.5-3 7-7 11z" />
                            <circle cx="12" cy="10" r="2" strokeWidth={2} />
                        </svg>
                        <span className="text-xs text-gray-500 flex-1 truncate">{capitalizeEachWordFirstLetter(selectedLocation)}</span>
                        <button
                            onClick={() => setComingSoonOpen(true)}
                            className="text-xs text-cyan-600 font-semibold flex-shrink-0"
                        >
                            Change
                        </button>
                    </div>
                    {/* Search input */}
                    <div className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 transition-colors ${focused ? "border-cyan-500 bg-cyan-50/40" : "border-gray-100 bg-gray-50"}`}>
                        <svg className={`w-5 h-5 flex-shrink-0 transition-colors ${focused ? "text-cyan-500" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyDown={e => { isDeletingRef.current = e.key === "Backspace" || e.key === "Delete"; }}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setTimeout(() => setFocused(false), 150)}
                            placeholder="Search doctors, clinics, symptoms..."
                            autoFocus
                            className="flex-1 bg-transparent text-gray-800 text-sm outline-none placeholder:text-gray-400"
                        />
                        {query && (
                            <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Dropdown suggestions */}
                <div className={`absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl shadow-cyan-100 overflow-hidden border border-gray-100 z-30 transition-all duration-200 ease-out
                    ${focused ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
                    {sugLoading ? (
                        <div className="px-4 py-3 space-y-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex items-center gap-3 animate-pulse">
                                    <div className="w-7 h-7 rounded-full bg-gray-200 flex-shrink-0" />
                                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                                        <div className="h-3 bg-gray-200 rounded-full" style={{ width: `${55 + i * 10}%` }} />
                                        <div className="h-2 bg-gray-100 rounded-full w-1/4" />
                                    </div>
                                    <div className="w-4 h-4 rounded bg-gray-100 flex-shrink-0" />
                                </div>
                            ))}
                        </div>
                    ) : suggestions.length > 0 ? (
                        <>
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-4 pt-3 pb-1">Results</p>
                            {suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onMouseDown={() => handleSuggestionClick(s)}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cyan-50 transition-colors text-left"
                                >
                                    <span className="w-7 h-7 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 text-base">
                                        {s.icon ?? (
                                            <svg className="w-3.5 h-3.5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                                            </svg>
                                        )}
                                    </span>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm text-gray-800 font-medium truncate capitalize">{s.text}</span>
                                        {s.type && (
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <span className="text-[11px] text-gray-400 capitalize">{s.type}</span>
                                                {s.type === "doctor" && (s.location || s.city) && (
                                                    <>
                                                        <span className="text-[10px] text-gray-300">•</span>
                                                        <span className="text-[11px] text-cyan-600 truncate capitalize flex items-center gap-0.5">
                                                            <svg className="w-2.5 h-2.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                                            </svg>
                                                            {[s.location, s.city].filter(Boolean).join(", ")}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <svg className="w-4 h-4 text-gray-300 ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ))}
                        </>
                    ) : query.trim() ? (
                        <p className="text-sm text-gray-400 text-center py-6">No results for &quot;{query}&quot;</p>
                    ) : null}
                </div>
            </div>

            {/* Quick category chips */}
            {/* <div className="px-4 mt-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Browse by category</p>
                <div className="grid grid-cols-3 gap-3">
                    <Link href={`/${state}/${city}/best-doctors`} className="flex flex-col items-center gap-1.5 bg-white rounded-2xl py-4 shadow-sm border border-gray-100 hover:border-cyan-300 hover:bg-cyan-50 active:scale-95 transition-all">
                        <span className="text-2xl">🩺</span>
                        <span className="text-xs font-semibold text-gray-600">Doctor</span>
                    </Link>
                    <Link href={`/${state}/${city}/Hospitals-And-Clinics`} className="flex flex-col items-center gap-1.5 bg-white rounded-2xl py-4 shadow-sm border border-gray-100 hover:border-cyan-300 hover:bg-cyan-50 active:scale-95 transition-all">
                        <span className="text-2xl">🏥</span>
                        <span className="text-xs font-semibold text-gray-600">Clinic</span>
                    </Link>
                    <Link href="/medicine" className="flex flex-col items-center gap-1.5 bg-white rounded-2xl py-4 shadow-sm border border-gray-100 hover:border-cyan-300 hover:bg-cyan-50 active:scale-95 transition-all">
                        <span className="text-2xl">💊</span>
                        <span className="text-xs font-semibold text-gray-600">Medicine</span>
                    </Link>
                    <Link href={`/${state}/${city}/caretakers`} className="flex flex-col items-center gap-1.5 bg-white rounded-2xl py-4 shadow-sm border border-gray-100 hover:border-cyan-300 hover:bg-cyan-50 active:scale-95 transition-all">
                        <span className="text-2xl">🧑‍⚕️</span>
                        <span className="text-xs font-semibold text-gray-600">Caretaker</span>
                    </Link>
                    <Link href="/physio" className="flex flex-col items-center gap-1.5 bg-white rounded-2xl py-4 shadow-sm border border-gray-100 hover:border-cyan-300 hover:bg-cyan-50 active:scale-95 transition-all">
                        <span className="text-2xl">🦴</span>
                        <span className="text-xs font-semibold text-gray-600">Physio</span>
                    </Link>
                    <Link href="/spa" className="flex flex-col items-center gap-1.5 bg-white rounded-2xl py-4 shadow-sm border border-gray-100 hover:border-cyan-300 hover:bg-cyan-50 active:scale-95 transition-all">
                        <span className="text-2xl">💆</span>
                        <span className="text-xs font-semibold text-gray-600">Spa</span>
                    </Link>
                </div>
            </div> */}
            {/* Trending searches */}
            <div className="px-4 mt-4 mb-8">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Trending searches</p>
                <div className="flex flex-wrap gap-2">
                    {data.tranding_searches.map(tag => (
                        <button
                            key={tag}
                            onMouseDown={() => { setQuery(tag); setFocused(true); }}
                            className="bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full hover:border-cyan-400 hover:text-cyan-600 hover:bg-cyan-50 transition-colors"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Location Bottom Sheet ─────────────────────────────── */}
            {/* Backdrop */}
            <div
                onClick={() => { setLocationOpen(false); setLocQuery(""); }}
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${locationOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            />
            {/* Slide-up panel */}
            <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${locationOpen ? "translate-y-0" : "translate-y-full"}`}>
                {/* Handle bar */}
                <div className="flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 bg-gray-200 rounded-full" />
                </div>
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-gray-800">Change Location</h2>
                        <button className="flex items-center gap-1 text-xs text-cyan-600 font-semibold bg-cyan-50 border border-cyan-200 px-2 py-1 rounded-full hover:bg-cyan-100 transition-colors">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <circle cx="12" cy="12" r="3" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M2 12h2m16 0h2" />
                            </svg>
                            Current Location
                        </button>
                    </div>
                    <button
                        onClick={() => { setLocationOpen(false); setLocQuery(""); }}
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {/* Location search input */}
                <div className="px-5 pt-4 pb-2">
                    <div className="flex items-center gap-3 border-2 border-cyan-400 bg-cyan-50/40 rounded-xl px-4 py-3">
                        <svg className="w-4 h-4 text-cyan-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-4-7-7.5-7-11a7 7 0 0 1 14 0c0 3.5-3 7-7 11z" />
                            <circle cx="12" cy="10" r="2" strokeWidth={2} />
                        </svg>
                        <input
                            type="text"
                            value={locQuery}
                            onChange={e => setLocQuery(e.target.value)}
                            placeholder="Search city, area or pincode..."
                            className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                        />
                        {locQuery && (
                            <button onClick={() => setLocQuery("")} className="text-gray-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
                {/* Location list */}
                <div className="px-3 pb-10 max-h-60 overflow-y-auto">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 py-2">
                        {locQuery ? "Results" : "Popular cities"}
                    </p>
                    {filteredLocs.map((loc, i) => (
                        <button
                            key={i}
                            onClick={() => handleSelectLocation(loc)}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-cyan-50 active:bg-cyan-100 transition-colors text-left"
                        >
                            <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-4-7-7.5-7-11a7 7 0 0 1 14 0c0 3.5-3 7-7 11z" />
                                    <circle cx="12" cy="10" r="2" strokeWidth={2} />
                                </svg>
                            </span>
                            <span className="text-sm text-gray-700">{loc}</span>
                            {loc === selectedLocation && (
                                <svg className="w-4 h-4 text-cyan-500 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                    {filteredLocs.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-6">No locations found</p>
                    )}
                </div>
            </div>

            {/* ── Coming Soon Modal ─────────────────────────────── */}
            <div
                onClick={() => setComingSoonOpen(false)}
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${comingSoonOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            />
            <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${comingSoonOpen ? "translate-y-0" : "translate-y-full"}`}>
                <div className="flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 bg-gray-200 rounded-full" />
                </div>
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                    <h2 className="text-base font-bold text-gray-800">Select Location</h2>
                    <button
                        onClick={() => setComingSoonOpen(false)}
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center px-6 py-10 gap-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-cyan-50 flex items-center justify-center">
                        <svg className="w-8 h-8 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-4-7-7.5-7-11a7 7 0 0 1 14 0c0 3.5-3 7-7 11z" />
                            <circle cx="12" cy="10" r="2" strokeWidth={1.5} />
                        </svg>
                    </div>
                    <div>
                        <p className="text-gray-800 font-bold text-base">Currently available in Bhadrak</p>
                        <p className="text-gray-400 text-sm mt-1">We&apos;re working hard to expand to more cities.<br />Stay tuned — more cities coming soon! 🚀</p>
                    </div>
                    <div className="w-full bg-cyan-50 border border-cyan-100 rounded-2xl px-4 py-4 text-center">
                        <p className="text-cyan-700 font-semibold text-sm">📢 We&apos;re hiring in your city!</p>
                        <p className="text-gray-500 text-xs mt-1">Want to bring Careipro to your city? We&apos;re onboarding local staff across India.</p>
                        <a
                            href="/contact-us"
                            className="inline-block mt-3 px-5 py-2 bg-cyan-500 text-white text-xs font-semibold rounded-full hover:bg-cyan-600 active:scale-95 transition-all"
                        >
                            Contact Us to Join
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SearchBox;
