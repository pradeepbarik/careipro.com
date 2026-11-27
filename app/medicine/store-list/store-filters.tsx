'use client'
import { useState } from 'react';
import { capitalizeEachWordFirstLetter } from '@/lib/helper/format-text';

/* Built to the doctors list filter bar: a Filters chip that opens a bottom sheet holding every
   filter, then one chip per filter that drops a quick pick list under the bar. */

export type TStoreFilters = { category: number | null; area: string | null };
export const EMPTY_STORE_FILTERS: TStoreFilters = { category: null, area: null };
export type TStoreCategory = { id: number; name: string; count: number };

type TOpenPanel = 'category' | 'area' | null;

const ChevronDown = () => (
    <svg className="w-3 h-3 ml-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const GroupChip = ({ label, active, open, onClick }: { label: string; active: boolean; open: boolean; onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border whitespace-nowrap transition-all max-w-[12rem] ${active ? 'bg-primary text-white border-primary'
            : open ? 'bg-gray-100 text-gray-800 border-gray-300'
                : 'bg-white text-gray-600 border-gray-200'
            }`}
    >
        <span className="truncate">{label}</span>
        <ChevronDown />
    </button>
);

const OptionItem = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`w-full text-left text-sm px-4 py-2.5 flex items-center justify-between gap-3 transition-colors ${active ? 'text-primary font-semibold' : 'text-gray-700'}`}
    >
        {label}
        <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${active ? 'bg-primary border-primary' : 'border-gray-300'}`}>
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
        className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${active ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200'}`}
    >
        {label}
    </button>
);

const AreaSearch = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <div className="relative">
        <svg className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
        <input
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search area"
            aria-label="Search area"
            className="w-full text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-8 py-2 outline-none focus:border-primary focus:bg-white transition-colors [&::-webkit-search-cancel-button]:hidden"
        />
        {value && (
            <button onClick={() => onChange('')} aria-label="Clear area search"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        )}
    </div>
);

type TStoreFiltersProps = {
    //empty hides that filter
    categories: TStoreCategory[];
    areas: string[];
    filters: TStoreFilters;
    onChange: (filters: TStoreFilters) => void;
};

const StoreFilters = ({ categories, areas, filters, onChange }: TStoreFiltersProps) => {
    const [open, setOpen] = useState<TOpenPanel>(null);
    const [showModal, setShowModal] = useState(false);
    const [draft, setDraft] = useState<TStoreFilters>({ ...EMPTY_STORE_FILTERS });

    const areaLabel = (area: string) => capitalizeEachWordFirstLetter(area.trim());
    const categoryName = (id: number | null) => categories.find((c) => c.id === id)?.name || 'Category';
    const activeCount = [filters.category, filters.area].filter((v) => v !== null).length;
    const togglePanel = (panel: TOpenPanel) => { setAreaQuery(''); setOpen((o) => (o === panel ? null : panel)); };

    /* typed text narrows the area list, matched anywhere in the name and ignoring case. the
       picked area stays listed so it can still be unticked while a search is on */
    const [areaQuery, setAreaQuery] = useState('');
    const matchingAreas = (picked: string | null) => {
        const q = areaQuery.trim().toLowerCase();
        return q ? areas.filter((a) => a === picked || a.toLowerCase().includes(q)) : areas;
    };

    const pickCategory = (id: number) => {
        onChange({ ...filters, category: filters.category === id ? null : id });
        setOpen(null);
    };
    const pickArea = (area: string) => {
        onChange({ ...filters, area: filters.area === area ? null : area });
        setOpen(null);
    };
    const openModal = () => { setOpen(null); setAreaQuery(''); setDraft(filters); setShowModal(true); };
    const applyModal = () => { onChange(draft); setShowModal(false); };

    return (
        <>
            <div className="relative bg-white">
                <div className="flex items-center gap-2 px-3 overflow-x-auto hide-scroll-bar py-2 border-b border-gray-100">
                    <button
                        onClick={openModal}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border whitespace-nowrap font-semibold transition-all ${activeCount > 0 ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200'}`}
                    >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h2M9 16h6" />
                        </svg>
                        Filters
                        {activeCount > 0 && (
                            <span className="bg-white text-primary rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold">
                                {activeCount}
                            </span>
                        )}
                    </button>

                    {activeCount > 0 && (
                        <button
                            onClick={() => onChange({ ...EMPTY_STORE_FILTERS })}
                            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full border border-red-200 bg-red-50 text-red-500 whitespace-nowrap font-medium"
                        >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Clear
                        </button>
                    )}

                    {categories.length > 0 && (
                        <GroupChip
                            label={categoryName(filters.category)}
                            active={filters.category !== null}
                            open={open === 'category'}
                            onClick={() => togglePanel('category')}
                        />
                    )}
                    {areas.length > 0 && (
                        <GroupChip
                            label={filters.area ? areaLabel(filters.area) : 'Area'}
                            active={!!filters.area}
                            open={open === 'area'}
                            onClick={() => togglePanel('area')}
                        />
                    )}
                </div>

                {/* quick pick list under the bar, a tap outside closes it */}
                {open && <div className="fixed inset-0 z-[19]" onClick={() => setOpen(null)} />}
                {open && (
                    <div className="absolute left-0 right-0 top-full z-[21] mx-3 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                        {open === 'area' && (
                            <div className="p-2 border-b border-gray-100">
                                <AreaSearch value={areaQuery} onChange={setAreaQuery} />
                            </div>
                        )}
                        <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                            {open === 'category' && categories.map((c) => (
                                <OptionItem key={c.id} label={`${c.name} (${c.count})`} active={filters.category === c.id} onClick={() => pickCategory(c.id)} />
                            ))}
                            {open === 'area' && matchingAreas(filters.area).map((area) => (
                                <OptionItem key={area} label={areaLabel(area)} active={filters.area === area} onClick={() => pickArea(area)} />
                            ))}
                            {open === 'area' && matchingAreas(filters.area).length === 0 && (
                                <p className="px-4 py-3 text-sm text-gray-500">No area matches &quot;{areaQuery.trim()}&quot;</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* slide-up sheet with every filter, applied together */}
            {showModal && (
                /* a bottom sheet on a phone, a centred dialog from sm up where a full width sheet
                   would stretch across the whole desktop screen */
                <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
                    <div className="relative bg-white rounded-t-2xl sm:rounded-2xl sm:w-full sm:max-w-md z-10 max-h-[80vh] flex flex-col">
                        <div className="flex justify-center pt-3 pb-1">
                            <div className="w-10 h-1 rounded-full bg-gray-300" />
                        </div>
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                            <h3 className="text-base font-bold text-gray-800">Filters</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 p-1" aria-label="Close filters">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="overflow-y-auto flex-1 px-4 py-4 space-y-5">
                            {categories.length > 0 && (
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Category</p>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((c) => (
                                            <FilterPill key={c.id} label={`${c.name} (${c.count})`} active={draft.category === c.id}
                                                onClick={() => setDraft((d) => ({ ...d, category: d.category === c.id ? null : c.id }))} />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {areas.length > 0 && <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Area</p>
                                <div className="mb-2"><AreaSearch value={areaQuery} onChange={setAreaQuery} /></div>
                                <div className="flex flex-wrap gap-2">
                                    {matchingAreas(draft.area).map((area) => (
                                        <FilterPill key={area} label={areaLabel(area)} active={draft.area === area}
                                            onClick={() => setDraft((d) => ({ ...d, area: d.area === area ? null : area }))} />
                                    ))}
                                    {matchingAreas(draft.area).length === 0 && (
                                        <p className="text-sm text-gray-500">No area matches &quot;{areaQuery.trim()}&quot;</p>
                                    )}
                                </div>
                            </div>}
                        </div>

                        <div className="px-4 py-3 border-t border-gray-100 flex gap-3">
                            <button
                                onClick={() => setDraft({ ...EMPTY_STORE_FILTERS })}
                                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600"
                            >
                                Clear All
                            </button>
                            <button onClick={applyModal} className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold">
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StoreFilters;
