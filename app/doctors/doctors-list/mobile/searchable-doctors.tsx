'use client'
import NIsToOneDoctorsSliders from "@/app/components/mobile/doctors/vertical-slider"
import { capitalizeFirstLetter } from "@/lib/helper/format-text";
import { TDoctor } from "@/lib/types/doctor"
import { useState, useRef, useEffect } from "react";
import DoctorFilters, { TActiveFilters } from "./doctor-filters";

const EMPTY_FILTERS: TActiveFilters = { availability: null, session: null, rating: null, area: null, nearbyCity: null, symptoms: [] };

function parseLocalDate(dateStr: string): Date {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
}

// Parses "8:00 AM" → 8, "12:00 PM" → 12, "6:00 PM" → 18
function parseHour24(time: string | null | undefined): number | null {
    if (!time) return null;
    const upper = time.toUpperCase();
    const parts = upper.replace('AM', '').replace('PM', '').trim().split(':');
    let h = parseInt(parts[0], 10);
    if (isNaN(h)) return null;
    if (upper.includes('PM') && h !== 12) h += 12;
    if (upper.includes('AM') && h === 12) h = 0;
    return h;
}

function sessionStartHours(cd: NonNullable<TDoctor['consult_dates']>[number]): number[] {
    return [cd.first_session_start_time, cd.second_session_start_time, cd.third_session_start_time]
        .map(parseHour24)
        .filter((h): h is number => h !== null);
}

function applyFilters(doctors: TDoctor[], filters: TActiveFilters): TDoctor[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const hasAvailFilter = !!(filters.availability || filters.session);
    const result: TDoctor[] = [];

    for (const dr of doctors) {
        if (filters.area && dr.market_name !== filters.area) continue;

        let matched_consult_date: TDoctor['matched_consult_date'] = undefined;

        if (hasAvailFilter) {
            const dates = dr.consult_dates ?? [];
            if (dates.length === 0) continue;

            let availDates = filters.availability ? dates.filter(cd => {
                const d = parseLocalDate(cd.date);
                const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
                if (filters.availability === 'today')   return diff === 0;
                if (filters.availability === 'tomorrow') return diff === 1;
                if (filters.availability === 'weekend') return diff >= 0 && diff <= 6 && (d.getDay() === 0 || d.getDay() === 6);
                return cd.date === filters.availability; // custom date
            }) : [...dates];

            if (filters.availability && availDates.length === 0) continue;

            if (filters.session) {
                availDates = availDates.filter(cd => {
                    const hours = sessionStartHours(cd);
                    if (filters.session === 'morning')   return hours.some(h => h >= 6  && h < 12);
                    if (filters.session === 'afternoon') return hours.some(h => h >= 12 && h < 15);
                    if (filters.session === 'evening')   return hours.some(h => h >= 16);
                    return false;
                });
                if (availDates.length === 0) continue;
            }

            matched_consult_date = availDates[0];
        }

        result.push({ ...dr, matched_consult_date });
    }
    return result;
}

type TProps = {
    doctors: TDoctor[];
    city: string;
    specialist_name: string;
    markets: Array<{ market_name: string }>;
    nearbyCities: Array<{ city: string; market_name: string }>;
};

const SearchableDoctors = ({ doctors, city, specialist_name, markets, nearbyCities }: TProps) => {
    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<TDoctor | null>(null);
    const [showAll, setShowAll] = useState(false);
    const [filters, setFilters] = useState<TActiveFilters>(EMPTY_FILTERS);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const filteredDoctors = applyFilters(doctors, filters);

    const suggestions = query.trim().length > 0
        ? filteredDoctors.filter(d => d.doctor_name.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
        : [];

    const handleSelect = (doctor: TDoctor) => {
        setSelectedDoctor(doctor);
        setQuery(doctor.doctor_name);
        setShowSuggestions(false);
    };

    const handleClear = () => {
        setQuery("");
        setSelectedDoctor(null);
        setShowSuggestions(false);
    };

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
                setShowSuggestions(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const hasActiveFilters = !!(filters.availability || filters.session || filters.area || filters.nearbyCity || filters.symptoms.length > 0);
    const previewDoctors = hasActiveFilters ? filteredDoctors : filteredDoctors.slice(4, 6);
    const remainingDoctors = hasActiveFilters ? [] : filteredDoctors.slice(6);

    return (
        <>
            <div className="sticky top-14 z-20 bg-white shadow-sm">
                <DoctorFilters city={city} nearbyCities={nearbyCities} markets={markets} onFilterChange={setFilters} />
            </div>
            {/* Search box with suggestions */}
            <div ref={wrapperRef} className="mx-3 mb-3 relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
                    type="text"
                    name="doctor filter search box"
                    value={query}
                    placeholder={`Filter By ${specialist_name} doctors name...`}
                    className="w-full text-sm text-gray-800 bg-white border border-gray-300 rounded-xl pl-9 pr-9 py-2.5 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition placeholder:text-gray-400"
                    onChange={e => { setQuery(e.target.value); setShowSuggestions(true); setSelectedDoctor(null); }}
                    onFocus={() => { if (query.trim()) setShowSuggestions(true); }}
                />
                {query.length > 0 && (
                    <button onClick={handleClear} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}

                {/* Suggestions dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-30 overflow-hidden">
                        {suggestions.map((doctor, i) => (
                            <button
                                key={doctor.service_location_id}
                                onClick={() => handleSelect(doctor)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors ${i !== 0 ? 'border-t border-gray-50' : ''}`}
                            >
                                {doctor.doctor_profile_pic ? (
                                    <img src={doctor.doctor_profile_pic} alt={doctor.doctor_name} className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-gray-100" />
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-cyan-600 text-xs font-bold">{doctor.doctor_name.charAt(0)}</span>
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 truncate">{doctor.doctor_name}</p>
                                    {doctor.clinic && <p className="text-xs text-gray-700 truncate">{doctor.clinic}</p>}
                                    <p className="text-xs text-gray-500 truncate">{capitalizeFirstLetter(doctor.locality || doctor.market_name)}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* No results message */}
                {showSuggestions && query.trim().length > 0 && suggestions.length === 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-cyan-100 rounded-xl shadow-lg z-30 overflow-hidden">
                        <div className="px-4 pt-4 pb-3 text-center">
                            <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center mx-auto mb-2">
                                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">No {specialist_name} Doctor found on name of &quot;{query}&quot;</p>
                            <p className="text-xs text-gray-400 mt-1">Don&apos;t worry! Let us know and we&apos;ll onboard them soon.</p>
                        </div>
                        <div className="border-t border-cyan-50 px-4 py-2.5 bg-cyan-50 flex items-center justify-between gap-2">
                            <p className="text-xs text-cyan-700 font-medium">Report this doctor to us</p>
                            <button className="text-xs bg-cyan-500 text-white font-semibold px-3 py-1.5 rounded-full active:scale-95 transition-all">
                                Report
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Show selected doctor */}
            {selectedDoctor && (
                <NIsToOneDoctorsSliders data={[selectedDoctor]} showAvaileTime={true} />
            )}

            {/* Default 2 doctors preview */}
            {!selectedDoctor && <NIsToOneDoctorsSliders data={previewDoctors} showAvaileTime={true} />}

            {/* More Doctors button */}
            {!showAll && !hasActiveFilters && !selectedDoctor && remainingDoctors.length > 0 && (
                <div className="flex justify-center my-3 overflow-hidden py-1">
                    <div className="relative inline-flex">
                        {/* Pulsing attention ring */}
                        <span className="absolute inset-0 rounded-full bg-orange-300 animate-ping opacity-25 pointer-events-none" />
                        <button
                            onClick={() => setShowAll(true)}
                            className="relative flex items-center gap-2 text-xs font-semibold text-orange-600 border border-orange-300 bg-orange-50 px-5 py-2 rounded-full active:scale-95 transition-all hover:bg-cyan-100 hover:shadow-md hover:border-cyan-400"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            +{remainingDoctors.length} More {filteredDoctors.length < doctors.length ? 'Matching ' : ''}Doctors In {capitalizeFirstLetter(city)}
                            <svg className="w-3.5 h-3.5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Show remaining doctors after clicking More or when filters active */}
            {(showAll || hasActiveFilters) && !selectedDoctor && (
                <NIsToOneDoctorsSliders data={remainingDoctors} showAvaileTime={true} />
            )}
        </>
    );
}
export default SearchableDoctors;
