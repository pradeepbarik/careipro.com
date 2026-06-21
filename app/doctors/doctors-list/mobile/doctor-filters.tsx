'use client'
import React, { useState, useEffect } from 'react';

type TFilterOption = { label: string; value: string };

export type TActiveFilters = { availability: string | null; session: string | null; rating: string | null; area: string | null; nearbyCity: string | null; symptoms: string[] };

type TDoctorFiltersProps = {
    city: string;
    markets: Array<{ market_name: string }>;
    nearbyCities: Array<{ city: string; market_name: string }>;
    onFilterChange?: (filters: TActiveFilters) => void;
};

const availabilityOptions: TFilterOption[] = [
    { label: 'Available Today', value: 'today' },
    { label: 'Available Tomorrow', value: 'tomorrow' },
    { label: 'Available This Weekend', value: 'weekend' },
];

const sessionOptions: TFilterOption[] = [
    { label: 'Morning (6am – 11:30am)', value: 'morning' },
    { label: 'Afternoon (12pm – 3pm)', value: 'afternoon' },
    { label: 'Evening (5pm – 9pm)', value: 'evening' },
];

const ratingOptions: TFilterOption[] = [
    { label: '4+ Stars', value: '4' },
    { label: '3+ Stars', value: '3' },
];

// const symptomOptions: TFilterOption[] = [
//     { label: 'Irregular periods', value: 'irregular-periods' },
//     { label: 'Pregnancy checkup', value: 'pregnancy-checkup' },
//     { label: 'PCOS / PCOD', value: 'pcos-pcod' },
//     { label: 'White discharge', value: 'white-discharge' },
//     { label: 'Abdominal pain', value: 'abdominal-pain' },
//     { label: 'Infertility issues', value: 'infertility-issues' },
// ];

const EMPTY_FILTERS = { availability: null, session: null, rating: null, area: null, nearbyCity: null, symptoms: [] as string[] };

function getNext15Dates(): Array<{ label: string; value: string }> {
    const dates: Array<{ label: string; value: string }> = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 2; i <= 8; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        const label = d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
        dates.push({ label, value });
    }
    return dates;
}

function formatAvailabilityLabel(value: string | null): string {
    if (!value) return 'Availability';
    const found = availabilityOptions.find(o => o.value === value);
    if (found) return found.label.replace('Available ', '');
    const [y, m, d] = value.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

type TOpenPanel = 'availability' | 'session' | 'rating' | 'area' | 'nearbyCity' | 'symptoms' | null;

const ChevronDown = () => (
    <svg className="w-3 h-3 ml-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

type TGroupChipProps = { label: string; active: boolean; open: boolean; onClick: () => void };

const GroupChip = ({ label, active, open, onClick }: TGroupChipProps) => (
    <button
        onClick={onClick}
        className={`flex items-center font-semibold px-3 py-1.5 rounded-full border whitespace-nowrap transition-all ${active ? 'bg-cyan-500 text-white border-cyan-500'
            : open ? 'bg-gray-100 text-gray-800 border-gray-300'
                : 'bg-white text-gray-600 border-gray-200'
            }`}
    >
        {label}
        <ChevronDown />
    </button>
);

const OptionItem = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`w-full text-left text-sm px-4 py-2.5 flex items-center justify-between transition-colors ${active ? 'text-cyan-600 font-semibold' : 'text-gray-700'
            }`}
    >
        {label}
        <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${active ? 'bg-cyan-500 border-cyan-500' : 'border-gray-300'
            }`}>
            {active && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            )}
        </span>
    </button>
);

const FilterPill = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${active ? 'bg-cyan-500 text-white border-cyan-500' : 'bg-white text-gray-600 border-gray-200'
            }`}
    >
        {label}
    </button>
);

const DoctorFilters = ({ city, markets, nearbyCities, onFilterChange }: TDoctorFiltersProps) => {
    const [open, setOpen] = useState<TOpenPanel>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [filters, setFilters] = useState<TActiveFilters>({ ...EMPTY_FILTERS });
    const [draftFilters, setDraftFilters] = useState<TActiveFilters>({ ...EMPTY_FILTERS });
    useEffect(() => { onFilterChange?.(filters); }, [filters]);

    const toggle = (key: Exclude<keyof TActiveFilters, 'symptoms'>, value: string) =>
        setFilters(f => ({ ...f, [key]: f[key] === value ? null : value }));

    // const toggleSymptom = (value: string) =>
    //     setFilters(f => ({
    //         ...f,
    //         symptoms: f.symptoms.includes(value) ? f.symptoms.filter(s => s !== value) : [...f.symptoms, value],
    //     }));

    const draftToggle = (key: Exclude<keyof TActiveFilters, 'symptoms'>, value: string) =>
        setDraftFilters(f => ({ ...f, [key]: f[key] === value ? null : value }));

    const draftToggleSymptom = (value: string) =>
        setDraftFilters(f => ({
            ...f,
            symptoms: f.symptoms.includes(value) ? f.symptoms.filter(s => s !== value) : [...f.symptoms, value],
        }));

    const togglePanel = (panel: TOpenPanel) => { setShowDatePicker(false); setOpen(o => (o === panel ? null : panel)); };

    const openModal = () => { setDraftFilters(filters); setShowModal(true); };
    const applyModal = () => { setFilters(draftFilters); setShowModal(false); };


    const areaOptions: TFilterOption[] = markets.map(m => ({ label: m.market_name, value: m.market_name }));
    const cityOptions: TFilterOption[] = nearbyCities.map(c => ({ label: c.market_name || c.city, value: c.city }));
    const activeCount = [filters.availability, filters.session, filters.rating, filters.area, filters.nearbyCity].filter(Boolean).length + filters.symptoms.length;

    return (
        <>
            <div className="relative mb-2">
                {/* Filter bar */}
                <div className="flex items-center gap-2 px-3 overflow-x-auto hide-scroll-bar py-2 border-b border-gray-100">
                    {/* Filters chip */}
                    <button
                        onClick={openModal}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border whitespace-nowrap font-semibold transition-all ${activeCount > 0 ? 'bg-cyan-500 text-white border-cyan-500' : 'bg-white text-gray-600 border-gray-200'
                            }`}
                    >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h2M9 16h6" />
                        </svg>
                        Filters
                        {activeCount > 0 && (
                            <span className="bg-white text-cyan-600 rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold">
                                {activeCount}
                            </span>
                        )}
                    </button>

                    {/* Clear chip */}
                    {activeCount > 0 && (
                        <button
                            onClick={() => setFilters({ ...EMPTY_FILTERS })}
                            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full border border-red-200 bg-red-50 text-red-500 whitespace-nowrap font-medium"
                        >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Clear
                        </button>
                    )}
                    {/* <GroupChip
                        label={filters.symptoms.length > 0 ? `Symptoms (${filters.symptoms.length})` : 'Symptoms'}
                        active={filters.symptoms.length > 0}
                        open={open === 'symptoms'}
                        onClick={() => togglePanel('symptoms')}
                    /> */}
                    <GroupChip label={formatAvailabilityLabel(filters.availability)} active={!!filters.availability} open={open === 'availability'} onClick={() => togglePanel('availability')} />
                    <GroupChip
                        label={filters.session ? sessionOptions.find(o => o.value === filters.session)?.label ?? 'Session' : 'Session'}
                        active={!!filters.session}
                        open={open === 'session'}
                        onClick={() => togglePanel('session')}
                    />
                    {/* {areaOptions.length > 0 && (
                        <GroupChip label={filters.area || 'Area'} active={!!filters.area} open={open === 'area'} onClick={() => togglePanel('area')} />
                    )}
                    {cityOptions.length > 0 && (
                        <GroupChip label={filters.nearbyCity || 'Nearby City'} active={!!filters.nearbyCity} open={open === 'nearbyCity'} onClick={() => togglePanel('nearbyCity')} />
                    )} */}
                    {/* <GroupChip
                        label={filters.rating ? `${filters.rating}+ Stars` : 'Rating'}
                        active={!!filters.rating}
                        open={open === 'rating'}
                        onClick={() => togglePanel('rating')}
                    /> */}
                </div>

                {/* Dropdown panel */}
                {open && (
                    <div className="fixed inset-0 z-[19]" onClick={() => setOpen(null)} />
                )}
                {open && (
                    <div className="absolute left-0 right-0 top-full z-[21] mx-3 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                        <div className="divide-y divide-gray-50">
                            {open === 'availability' && <>
                                {!showDatePicker ? <>
                                    {availabilityOptions.map(o => (
                                        <OptionItem key={o.value} label={o.label} active={filters.availability === o.value}
                                            onClick={() => { toggle('availability', o.value); setOpen(null); }} />
                                    ))}
                                    <button
                                        onClick={() => setShowDatePicker(true)}
                                        className="w-full text-left text-sm px-4 py-2.5 flex items-center justify-between text-gray-700 border-t border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                        <span>Pick a date from next 7 days</span>
                                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </> : <>
                                    <button
                                        onClick={() => setShowDatePicker(false)}
                                        className="w-full text-left text-sm px-4 py-2.5 flex items-center gap-2 text-cyan-600 font-semibold bg-gray-50 border-b border-gray-100"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Pick a date from next 7 days
                                    </button>
                                    <div className="max-h-56 overflow-y-auto divide-y divide-gray-50">
                                        {getNext15Dates().map(d => (
                                            <OptionItem key={d.value} label={d.label} active={filters.availability === d.value}
                                                onClick={() => { toggle('availability', d.value); setOpen(null); setShowDatePicker(false); }} />
                                        ))}
                                    </div>
                                </>}
                            </>}
                            {open === 'session' && sessionOptions.map(o => (
                                <OptionItem key={o.value} label={o.label} active={filters.session === o.value}
                                    onClick={() => { toggle('session', o.value); setOpen(null); }} />
                            ))}
                            {/* {open === 'area' && areaOptions.map(o => (
                                <OptionItem key={o.value} label={o.label} active={filters.area === o.value}
                                    onClick={() => { toggle('area', o.value); setOpen(null); }} />
                            ))}
                            {open === 'symptoms' && symptomOptions.map(o => (
                                <OptionItem key={o.value} label={o.label} active={filters.symptoms.includes(o.value)}
                                    onClick={() => toggleSymptom(o.value)} />
                            ))}
                            {open === 'nearbyCity' && cityOptions.map(o => (
                                <OptionItem key={o.value} label={o.label} active={filters.nearbyCity === o.value}
                                    onClick={() => { toggle('nearbyCity', o.value); setOpen(null); }} />
                            ))} */}
                        </div>
                    </div>
                )}
            </div>

            {/* Slide-up modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
                    <div className="relative bg-white rounded-t-2xl z-10 max-h-[80vh] flex flex-col">
                        <div className="flex justify-center pt-3 pb-1">
                            <div className="w-10 h-1 rounded-full bg-gray-300" />
                        </div>
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                            <h3 className="text-base font-bold text-gray-800">Filters</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 p-1">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="overflow-y-auto flex-1 px-4 py-4 space-y-5">
                            {/* Availability */}
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Availability</p>
                                <div className="flex flex-wrap gap-2">
                                    {availabilityOptions.map(o => (
                                        <FilterPill key={o.value} label={o.label} active={draftFilters.availability === o.value}
                                            onClick={() => draftToggle('availability', o.value)} />
                                    ))}
                                </div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-3 mb-2">Pick a date from next 7 days</p>
                                <div className="flex flex-wrap gap-2">
                                    {getNext15Dates().map(d => (
                                        <FilterPill key={d.value} label={d.label} active={draftFilters.availability === d.value}
                                            onClick={() => draftToggle('availability', d.value)} />
                                    ))}
                                </div>
                            </div>
                            {/* Session */}
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Session</p>
                                <div className="flex flex-wrap gap-2">
                                    {sessionOptions.map(o => (
                                        <FilterPill key={o.value} label={o.label} active={draftFilters.session === o.value}
                                            onClick={() => draftToggle('session', o.value)} />
                                    ))}
                                </div>
                            </div>
                            {/* Symptoms — multi select */}
                            {/* <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                                    Symptoms
                                    <span className="ml-1 text-[10px] normal-case text-gray-300">(select multiple)</span>
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {symptomOptions.map(o => (
                                        <FilterPill key={o.value} label={o.label} active={draftFilters.symptoms.includes(o.value)}
                                            onClick={() => draftToggleSymptom(o.value)} />
                                    ))}
                                </div>
                            </div> */}
                            {/* Rating */}
                            {/* <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Rating</p>
                                <div className="flex flex-wrap gap-2">
                                    {ratingOptions.map(o => (
                                        <FilterPill key={o.value} label={o.label} active={draftFilters.rating === o.value}
                                            onClick={() => draftToggle('rating', o.value)} />
                                    ))}
                                </div>
                            </div> */}

                            {/* Area */}
                            {areaOptions.length > 0 && false && (
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Area</p>
                                    <div className="flex flex-wrap gap-2">
                                        {areaOptions.map(o => (
                                            <FilterPill key={o.value} label={o.label} active={draftFilters.area === o.value}
                                                onClick={() => draftToggle('area', o.value)} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Nearby City */}
                            {cityOptions.length > 0 && false && (
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Nearby City</p>
                                    <div className="flex flex-wrap gap-2">
                                        {cityOptions.map(o => (
                                            <FilterPill key={o.value} label={o.label} active={draftFilters.nearbyCity === o.value}
                                                onClick={() => draftToggle('nearbyCity', o.value)} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="px-4 py-3 border-t border-gray-100 flex gap-3">
                            <button
                                onClick={() => setDraftFilters({ ...EMPTY_FILTERS })}
                                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={applyModal}
                                className="flex-1 py-2.5 rounded-xl bg-cyan-500 text-white text-sm font-semibold"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DoctorFilters;
