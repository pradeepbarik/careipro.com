'use client'
import { useEffect, useState } from "react";
import { getOpenStatus, TClinicTiming, TOpenStatus } from '@/lib/helper/clinic-timing';

/* Open or closed right now, worked out from clinic_timings.

   This is deliberately computed in an effect rather than during render. The page is a
   server component whose html can be cached, so a status baked in at render time would
   keep claiming "Open now" long after the clinic shut. Reading the clock on the client
   also keeps server and browser from disagreeing during hydration. */
const ClinicOpenStatus = ({ timing }: { timing: TClinicTiming | null }) => {
    const [status, setStatus] = useState<TOpenStatus | null>(null);

    useEffect(() => {
        if (!timing) {
            return;
        }
        const update = () => setStatus(getOpenStatus(timing, new Date()));
        update();
        /* re-check on the minute so the badge flips while the page is open */
        const timer = setInterval(update, 60000);
        return () => clearInterval(timer);
    }, [timing]);

    if (!timing || status === null) {
        return <></>
    }
    /* stacked rather than one line: "Closed opens tomorrow 8:00 AM" runs to the screen
       edge on a phone and crowds whatever sits to its left */
    return (
        <span className="ml-auto flex flex-col items-end shrink-0 leading-tight">
            <span className="flex items-center gap-1 fs-12 font-semibold">
                <span className={`h-2 w-2 rounded-full shrink-0 ${status.isOpen ? "bg-green-500" : "bg-red-500"}`} />
                <span className={status.isOpen ? "text-green-700" : "text-red-700"}>
                    {status.isOpen ? "Open now" : "Closed"}
                </span>
            </span>
            {status.nextChange &&
                <span className="fs-12 text-gray-400 text-nowrap">
                    {status.isOpen ? "till" : "Opens"} {status.nextChange}
                </span>
            }
        </span>
    )
}
export default ClinicOpenStatus;
