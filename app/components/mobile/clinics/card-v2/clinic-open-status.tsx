'use client'
import { useEffect, useState } from "react";
import { getOpenStatus, TClinicTiming, TOpenStatus } from '@/lib/helper/clinic-timing';

/* The compact, single line form of the detail page's status badge, sized for a card
   where it shares a row with the rating.

   Computed in an effect rather than during render for the same reason as on the detail
   page: this listing's html is cached for a day, so a status baked in at render time
   would keep claiming "Open now" long after the clinic shut. */
const ClinicOpenStatus = ({ timing }: { timing: TClinicTiming | null | undefined }) => {
    const [status, setStatus] = useState<TOpenStatus | null>(null);

    useEffect(() => {
        if (!timing) {
            return;
        }
        const update = () => setStatus(getOpenStatus(timing, new Date()));
        update();
        /* re-check on the minute so the badge flips while the list is open */
        const timer = setInterval(update, 60000);
        return () => clearInterval(timer);
    }, [timing]);

    if (!timing || status === null) {
        return <></>
    }
    return (
        <span className="flex items-center gap-1 fs-12 font-semibold text-nowrap">
            <span className={`h-[6px] w-[6px] rounded-full shrink-0 ${status.isOpen ? "bg-green-500" : "bg-red-500"}`} />
            <span className={status.isOpen ? "text-green-700" : "text-red-600"}>
                {status.isOpen ? "Open now" : "Closed"}
            </span>
        </span>
    )
}
export default ClinicOpenStatus;
