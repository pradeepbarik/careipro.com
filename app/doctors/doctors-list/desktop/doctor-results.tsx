'use client'
import { useState } from "react";
import { BiSearch, BiX } from "react-icons/bi";
import { TDoctor } from "@/lib/types/doctor";
import { capitalizeFirstLetter } from "@/lib/helper/format-text";
import DoctorFilters, { TActiveFilters } from "../mobile/doctor-filters";
import { EMPTY_FILTERS, applyFilters, hasAnyFilter } from "../filter-doctors";
import DoctorCard from "./doctor-card";

type TProps = {
    doctors: TDoctor[];
    city: string;
    specialist_name: string;
    markets: Array<{ market_name: string }>;
    nearbyCities: Array<{ city: string; market_name: string }>;
    brandedHospitals: Array<{ label: string; value: string }>;
};

//how many rows to show before the visitor asks for the rest
const PAGE_SIZE = 10;

/**
 * The filter bar and the result list of the desktop listing. Filtering runs in the browser over the
 * doctors the page was rendered with, the same way the mobile page does it, so changing a filter
 * never costs a round trip.
 */
const DoctorResults = ({ doctors, city, specialist_name, markets, nearbyCities, brandedHospitals }: TProps) => {
    const [filters, setFilters] = useState<TActiveFilters>(EMPTY_FILTERS);
    const [query, setQuery] = useState("");
    const [visible, setVisible] = useState(PAGE_SIZE);

    const filtered = applyFilters(doctors, filters);
    const searched = query.trim()
        ? filtered.filter((d) =>
            d.doctor_name.toLowerCase().includes(query.trim().toLowerCase()) ||
            (d.clinic || '').toLowerCase().includes(query.trim().toLowerCase()))
        : filtered;
    const shown = searched.slice(0, visible);
    const filtersActive = hasAnyFilter(filters) || query.trim().length > 0;

    return (
        <>
            {/* filters across the top, the wide screen shows them all without a sheet */}
            <div className="bg-white rounded-xl border border-gray-200 mb-4 sticky top-[104px] z-30">
                <DoctorFilters
                    city={city}
                    nearbyCities={nearbyCities}
                    markets={markets}
                    brandedHospitals={brandedHospitals}
                    onFilterChange={(next) => { setFilters(next); setVisible(PAGE_SIZE); }}
                />
                <div className="border-t border-gray-100 px-3 py-2.5 flex items-center gap-3">
                    <div className="relative flex-1 max-w-md">
                        <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
                        <input
                            type="search"
                            value={query}
                            placeholder={`Search ${specialist_name} by name or clinic...`}
                            aria-label={`Search ${specialist_name} by name or clinic`}
                            className="w-full fs-14 text-gray-800 bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-8 py-2 outline-none focus:border-primary focus:bg-white transition-colors [&::-webkit-search-cancel-button]:hidden"
                            onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
                        />
                        {query.length > 0 && (
                            <button
                                onClick={() => { setQuery(""); setVisible(PAGE_SIZE); }}
                                aria-label="Clear search"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <BiX className="text-lg" />
                            </button>
                        )}
                    </div>
                    <p className="ml-auto fs-14 text-gray-500 shrink-0">
                        <b className="text-gray-800">{searched.length}</b> {searched.length === 1 ? 'doctor' : 'doctors'}
                        {filtersActive && doctors.length !== searched.length && <span className="text-gray-400"> of {doctors.length}</span>}
                        {' '}in {capitalizeFirstLetter(city)}
                    </p>
                </div>
            </div>

            {shown.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 py-14 text-center">
                    <img src="/icon/no-data.png" alt="" className="h-28 mx-auto" />
                    <p className="font-semibold text-gray-700 mt-3">No doctors match these filters</p>
                    <p className="fs-14 text-gray-500 mt-1">Try clearing a filter or searching a different name.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {shown.map((doctor) => (
                        <DoctorCard key={doctor.service_location_id} doctor={doctor} />
                    ))}
                </div>
            )}

            {visible < searched.length && (
                <div className="flex justify-center mt-5">
                    <button
                        onClick={() => setVisible((v) => v + PAGE_SIZE)}
                        className="rounded-full border border-primary text-primary font-semibold fs-14 px-6 py-2.5 hover:bg-primary hover:text-white transition-colors"
                    >
                        Show {Math.min(PAGE_SIZE, searched.length - visible)} more doctors
                    </button>
                </div>
            )}
        </>
    );
};

export default DoctorResults;
