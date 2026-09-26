'use client'
import { useEffect, useState } from "react";
import { DAY_LABELS, WEEK_ORDER, formatDayHours, TClinicTiming } from '@/lib/helper/clinic-timing';

/* The weekly opening hours table.

   The rows themselves never change, but which one is today does, and this page's html
   can be cached. So the highlight is resolved on the client, the same way the open or
   closed badge is, rather than being frozen at render time on whatever day that was. */
const ClinicTimings = ({ timing }: { timing: TClinicTiming | null }) => {
    const [todayIndex, setTodayIndex] = useState<number | null>(null);

    useEffect(() => {
        setTodayIndex(new Date().getDay());
    }, []);

    if (!timing) {
        return <></>
    }
    return (
        <div className="flex flex-col">
            {WEEK_ORDER.map((dayIndex) => {
                const hours = formatDayHours(timing, dayIndex);
                const isToday = dayIndex === todayIndex;
                return (
                    <div key={dayIndex}
                        className={`flex items-center gap-3 py-[6px] fs-13 ${isToday ? "font-bold text-gray-900" : "text-gray-600"}`}>
                        <span className="shrink-0">
                            {DAY_LABELS[dayIndex]}
                            {isToday && <span className="ml-2 fs-12 font-semibold text-cyan-700">Today</span>}
                        </span>
                        <span className={`ml-auto text-right ${hours ? "" : "text-red-600"}`}>
                            {hours || "Closed"}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
export default ClinicTimings;
