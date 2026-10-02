'use client'
import { useEffect, useMemo, useState } from "react";
import { BiSearch, BiX, BiFilterAlt } from "react-icons/bi";
import { TClinic, TClinicTopDoctor } from "@/lib/types/clinic";
import { capitalizeFirstLetter } from "@/lib/helper/format-text";
import { NearbyToggle } from "@/app/components/mobile/clinics/card-v2/nearby-distance";
import {
    EMPTY_CLINIC_FILTERS, TClinicFilters, TClinicSort,
    applyClinicFilters, buildFilterOptions, hasAnyClinicFilter, searchClinics, sortClinics
} from "../filter-clinics";
import ClinicCard from "./clinic-card";

type TProps = {
    clinics: TClinic[],
    topDoctorsData: { [clinic_id: string]: { total_doctor: number, topDoctors: TClinicTopDoctor[] } },
    city: string,
    specialistName: string,
};

//how many cards to show before the visitor asks for the rest
const PAGE_SIZE = 10;

const SORT_OPTIONS: Array<{ value: TClinicSort, label: string }> = [
    { value: "relevance", label: "Relevance" },
    { value: "rating", label: "Rating" },
    { value: "doctors", label: "Most doctors" },
    { value: "name", label: "Name (A–Z)" },
];

const Toggle = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
    <button
        type="button"
        aria-pressed={active}
        onClick={onClick}
        className={`fs-13 font-semibold px-3 py-1.5 rounded-full border transition-colors ${active
            ? "border-primary bg-primary text-white"
            : "border-gray-200 bg-gray-50 text-gray-700 hover:border-primary hover:text-primary"}`}
    >
        {label}
    </button>
);

/* a select rather than a row of pills: areas and specializations run to dozens in a large city, and
   they would wrap into a filter bar taller than the first card */
const Picker = ({ label, value, options, onChange }: {
    label: string, value: string | null, options: string[], onChange: (next: string | null) => void
}) => {
    if (options.length < 2) return <></>;
    return (
        <select
            aria-label={label}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value || null)}
            className={`fs-13 font-semibold rounded-full border px-3 py-1.5 outline-none cursor-pointer transition-colors ${value
                ? "border-primary text-primary bg-primary/5"
                : "border-gray-200 text-gray-700 bg-gray-50 hover:border-primary"}`}
        >
            <option value="">{label}</option>
            {options.map((option) => (
                <option key={option} value={option}>{capitalizeFirstLetter(option)}</option>
            ))}
        </select>
    );
};

/**
 * The filter bar and the card list. Everything narrows the clinics the page was already rendered
 * with, so changing a filter never costs a round trip and the whole list stays indexable.
 */
const ClinicResults = ({ clinics, topDoctorsData, city, specialistName }: TProps) => {
    const [filters, setFilters] = useState<TClinicFilters>(EMPTY_CLINIC_FILTERS);
    const [sort, setSort] = useState<TClinicSort>("relevance");
    const [query, setQuery] = useState("");
    const [visible, setVisible] = useState(PAGE_SIZE);
    /* the clock arrives after mount so "open now" cannot bake a stale answer into the cached html,
       nor make the server and the browser render different lists */
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        setNow(new Date());
        const timer = setInterval(() => setNow(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const options = useMemo(() => buildFilterOptions(clinics), [clinics]);
    const matched = useMemo(
        () => sortClinics(searchClinics(applyClinicFilters(clinics, filters, now), query), sort),
        [clinics, filters, now, query, sort]
    );

    const shown = matched.slice(0, visible);
    const narrowed = hasAnyClinicFilter(filters) || query.trim().length > 0;
    const update = (next: Partial<TClinicFilters>) => {
        setFilters((current) => ({ ...current, ...next }));
        setVisible(PAGE_SIZE);
    };

    return (
        <>
            <div className="bg-white rounded-xl border border-gray-200 mb-4 sticky top-[104px] z-30">
                <div className="flex flex-wrap items-center gap-2 p-3">
                    <span className="flex items-center gap-1.5 fs-13 font-bold text-gray-700 shrink-0">
                        <BiFilterAlt className="text-primary text-lg" />Filters
                    </span>
                    <Picker label="All specializations" value={filters.specialization} options={options.specializations} onChange={(specialization) => update({ specialization })} />
                    <Picker label="All brands" value={filters.brand} options={options.brands} onChange={(brand) => update({ brand })} />
                    {options.anyOpenStatus && <Toggle label="Open now" active={filters.openNow} onClick={() => update({ openNow: !filters.openNow })} />}
                    {options.anyRated && <Toggle label="Rated 4+" active={filters.rated} onClick={() => update({ rated: !filters.rated })} />}
                    {options.anyHomeCollection && <Toggle label="Home collection" active={filters.homeCollection} onClick={() => update({ homeCollection: !filters.homeCollection })} />}
                    {hasAnyClinicFilter(filters) && (
                        <button
                            type="button"
                            onClick={() => { setFilters(EMPTY_CLINIC_FILTERS); setVisible(PAGE_SIZE); }}
                            className="flex items-center gap-1 fs-13 font-semibold text-gray-500 hover:text-red-600 transition-colors px-2 py-1.5"
                        >
                            <BiX className="text-lg" />Clear all
                        </button>
                    )}
                    {/* one ask for the whole page rather than a button on every card */}
                    <span className="ml-auto shrink-0"><NearbyToggle /></span>
                </div>

                <div className="border-t border-gray-100 px-3 py-2.5 flex items-center gap-3">
                    <div className="relative flex-1 max-w-md">
                        <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
                        <input
                            type="search"
                            value={query}
                            placeholder="Search by name, area or specialization..."
                            aria-label="Search clinics by name, area or specialization"
                            className="w-full fs-14 text-gray-800 bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-8 py-2 outline-none focus:border-primary focus:bg-white transition-colors [&::-webkit-search-cancel-button]:hidden"
                            onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
                        />
                        {query.length > 0 && (
                            <button
                                type="button"
                                onClick={() => { setQuery(""); setVisible(PAGE_SIZE); }}
                                aria-label="Clear search"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <BiX className="text-lg" />
                            </button>
                        )}
                    </div>

                    <label className="flex items-center gap-2 fs-13 text-gray-500 shrink-0">
                        Sort by
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as TClinicSort)}
                            className="fs-13 font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 outline-none cursor-pointer focus:border-primary"
                        >
                            {SORT_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </label>

                    <p className="ml-auto fs-14 text-gray-500 shrink-0">
                        <b className="text-gray-800">{matched.length}</b> {matched.length === 1 ? "result" : "results"}
                        {narrowed && clinics.length !== matched.length && <span className="text-gray-400"> of {clinics.length}</span>}
                        {' '}in {capitalizeFirstLetter(city)}
                    </p>
                </div>
            </div>

            {shown.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 py-14 text-center">
                    <img src="/icon/no-data.png" alt="" className="h-28 mx-auto" />
                    <p className="font-semibold text-gray-700 mt-3">No {specialistName.toLowerCase()} match these filters</p>
                    <p className="fs-14 text-gray-500 mt-1">Try clearing a filter or searching a different name.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {shown.map((clinic) => (
                        <ClinicCard
                            key={clinic.id}
                            clinic={clinic}
                            topDoctors={topDoctorsData?.[clinic.id.toString()]?.topDoctors || []}
                        />
                    ))}
                </div>
            )}

            {visible < matched.length && (
                <div className="flex justify-center mt-5">
                    <button
                        type="button"
                        onClick={() => setVisible((v) => v + PAGE_SIZE)}
                        className="rounded-full border border-primary text-primary font-semibold fs-14 px-6 py-2.5 hover:bg-primary hover:text-white transition-colors"
                    >
                        Show {Math.min(PAGE_SIZE, matched.length - visible)} more
                    </button>
                </div>
            )}
        </>
    );
};

export default ClinicResults;
