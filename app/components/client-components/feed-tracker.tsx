'use client';
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { trackFeed, setFeedContext } from "@/lib/hooks/useUserFeed";

/** shorter than this is a bounce, not interest */
const MIN_REPORT_SEC = 5;

const toId = (v?: string | number) => (v && Number(v) > 0 ? Number(v) : undefined);

/**
 * Doctor detail page: records the view, then how long the tab was actually
 * visible. Time is flushed whenever the tab is hidden or the page is left, so a
 * phone that locks or a tab switch never loses what was already watched.
 * cat_id is the result-page category from ?cat_id= - without it only the
 * doctor feed moves.
 */
export const DoctorFeedTracker = ({ doctor_id, service_loc_id, clinic_id, cat_id }: {
    doctor_id: number, service_loc_id?: number, clinic_id?: number, cat_id?: string | number,
}) => {
    const { is_loggedin } = useSelector((state: RootState) => state.authSlice);
    const visibleSinceRef = useRef<number | null>(null);
    const pendingMsRef = useRef<number>(0);

    useEffect(() => {
        if (!is_loggedin || !doctor_id) return;
        const searchCat = toId(cat_id);
        trackFeed({ type: 'doctor_view', doctor_id, service_loc_id: toId(service_loc_id), clinic_id: toId(clinic_id), cat_id: searchCat });
        setFeedContext({ doctor_id, cat_id: searchCat });

        pendingMsRef.current = 0;
        visibleSinceRef.current = document.visibilityState === "visible" ? Date.now() : null;
        const pause = () => {
            if (visibleSinceRef.current !== null) {
                pendingMsRef.current += Date.now() - visibleSinceRef.current;
                visibleSinceRef.current = null;
            }
        };
        const flush = () => {
            pause();
            const seconds = Math.round(pendingMsRef.current / 1000);
            if (seconds < MIN_REPORT_SEC) return;
            pendingMsRef.current = 0;
            trackFeed({ type: 'dwell', doctor_id, seconds, cat_id: searchCat });
        };
        const onVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                flush();
            } else if (visibleSinceRef.current === null) {
                visibleSinceRef.current = Date.now();
            }
        };
        document.addEventListener("visibilitychange", onVisibilityChange);
        window.addEventListener("pagehide", flush);
        return () => {
            document.removeEventListener("visibilitychange", onVisibilityChange);
            window.removeEventListener("pagehide", flush);
            flush();// client side navigation to another page
            setFeedContext(null);
        };
    }, [is_loggedin, doctor_id, service_loc_id, clinic_id, cat_id]);

    return null;
};

/** Category result page: the user is looking for this specialty */
export const CategoryFeedTracker = ({ cat_id }: { cat_id?: string | number }) => {
    const { is_loggedin } = useSelector((state: RootState) => state.authSlice);
    useEffect(() => {
        const id = toId(cat_id);
        if (!is_loggedin || !id) return;
        trackFeed({ type: 'category_search', cat_id: id });
    }, [is_loggedin, cat_id]);
    return null;
};
