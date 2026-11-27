'use client'
import { useEffect, useState } from "react";
import { BiChevronDown, BiTime } from "react-icons/bi";
import { DAY_LABELS, WEEK_ORDER, formatDayHours, getOpenStatus, TClinicTiming, TOpenStatus } from "@/lib/helper/clinic-timing";

/* Worked out in the browser on a minute timer, not at render: the store's page is served from
   a cache, so a status baked in on the server would keep saying "Open" after the store shut. */
const useNow = () => {
    const [now, setNow] = useState<Date | null>(null);
    useEffect(() => {
        setNow(new Date());
        const timer = setInterval(() => setNow(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);
    return now;
};

/** The header pill: "Open now · till 9:00 PM" or "Closed · opens tomorrow 9:00 AM".
    Nothing shows for a store that has not set its timings. */
export const StoreOpenStatus = ({ timing }: { timing: TClinicTiming | null | undefined }) => {
    const now = useNow();
    if (!timing || !now) {
        return null;
    }
    const status: TOpenStatus = getOpenStatus(timing, now);
    return (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {status.isOpen ? '● Open now' : '● Closed'}
            {status.nextChange && (
                <span className="font-medium"> · {status.isOpen ? `till ${status.nextChange}` : `opens ${status.nextChange}`}</span>
            )}
        </span>
    );
};

/** Today's hours from the weekly timings, falling back to the store's free text open_time */
export const StoreTodayHours = ({ timing, openTime }: { timing: TClinicTiming | null | undefined, openTime: string | null }) => {
    const now = useNow();
    if (timing && now) {
        return <>{formatDayHours(timing, now.getDay()) || "Closed today"}</>;
    }
    return <>{openTime || "Not shared by the store"}</>;
};

/** The Today's Hours row of Store Details. With weekly timings set, the row opens a sheet
    listing the whole week, Monday first, with today picked out. */
export const StoreHoursRow = ({ timing, openTime }: { timing: TClinicTiming | null | undefined, openTime: string | null }) => {
    const now = useNow();
    const [showWeek, setShowWeek] = useState(false);
    const today = now ? now.getDay() : -1;
    const status = timing && now ? getOpenStatus(timing, now) : null;

    const row = (
        <>
            <BiTime className="text-primary text-lg flex-shrink-0" />
            <div className="flex-1 min-w-0 text-left">
                <p className="text-xs text-gray-600">Today&apos;s Hours</p>
                <p className="text-sm font-semibold text-gray-800"><StoreTodayHours timing={timing} openTime={openTime} /></p>
            </div>
        </>
    );

    if (!timing) {
        return <div className="flex items-center gap-3">{row}</div>;
    }
    return (
        <>
            <button onClick={() => setShowWeek(true)} className="w-full flex items-center gap-3" aria-label="See opening hours for the week">
                {row}
                <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <BiChevronDown className="text-gray-600 text-lg" />
                </span>
            </button>

            {/* slide-up sheet, built like the store list's filter sheet. a centred dialog from sm up */}
            {showWeek && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowWeek(false)} />
                    <div className="relative bg-white rounded-t-2xl sm:rounded-2xl sm:w-full sm:max-w-md z-10 max-h-[80vh] flex flex-col">
                        <div className="flex justify-center pt-3 pb-1">
                            <div className="w-10 h-1 rounded-full bg-gray-300" />
                        </div>
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                            <div>
                                <h3 className="text-base font-bold text-gray-800">Opening Hours</h3>
                                {status && (
                                    <p className={`text-xs font-semibold mt-0.5 ${status.isOpen ? 'text-green-700' : 'text-red-600'}`}>
                                        {status.isOpen ? 'Open now' : 'Closed'}
                                        {status.nextChange && <span className="font-medium"> · {status.isOpen ? `till ${status.nextChange}` : `opens ${status.nextChange}`}</span>}
                                    </p>
                                )}
                            </div>
                            <button onClick={() => setShowWeek(false)} className="text-gray-400 p-1" aria-label="Close opening hours">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="overflow-y-auto px-4 py-2 pb-6 divide-y divide-gray-100">
                            {WEEK_ORDER.map((dayIndex) => {
                                const hours = formatDayHours(timing, dayIndex);
                                const isToday = dayIndex === today;
                                return (
                                    <div key={dayIndex} className={`flex items-start justify-between gap-4 py-3 text-sm ${isToday ? 'font-semibold' : ''}`}>
                                        <span className={isToday ? 'text-primary' : 'text-gray-700'}>
                                            {DAY_LABELS[dayIndex]}
                                            {isToday && <span className="ml-1.5 text-[10px] uppercase tracking-wide bg-primary/10 text-primary rounded px-1.5 py-0.5">Today</span>}
                                        </span>
                                        <span className={`text-right ${hours ? (isToday ? 'text-gray-900' : 'text-gray-700') : 'text-red-600'}`}>
                                            {hours ? hours.split(", ").map((session) => <span key={session} className="block">{session}</span>) : 'Closed'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
