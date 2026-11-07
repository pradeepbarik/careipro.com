'use client';
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import useSiteVisiterLogger from "@/lib/hooks/useSiteVisiterLogger"
import { setPageSession, clearPageSession } from "@/lib/services/page-session";
import { useEffect, useRef } from "react";
type TLogData = {
    page_type?: "detail" | "listing" | "doctor_detail" | "clinic_detail" | "service_detail" | "home" | "other" | "",
    page_name: string,
    section_name?: string,
    state: string,
    city: string,
    market_name?: string,
    clinic_id?: number,
    doctor_id?: number,
    service_loc_id?: number,
    cat_id?: string,
    group_category?: string,
    vertical?: string,
    referer?: string,
    utm_campaign?: string,
    utm_medium?: string,
    utm_source?: string,
    business_name?: string,
}
const PageVisitLogger = ({ data }: { data: TLogData }) => {
    const searchParams = useSearchParams()
    const { logPageVisit, logEvent } = useSiteVisiterLogger();
    const { is_loggedin, guest_user_secreate_key } = useSelector((state: RootState) => state.authSlice);
    // identity is resolved once the visitor is logged in or a guest key exists
    const identityReady = is_loggedin || Boolean(guest_user_secreate_key);
    const loggedKey = useRef<string>("");
    // the page this visit document belongs to - time is only ever added to its own page
    const visitSidRef = useRef<{ key: string, sid: string } | null>(null);
    const visitKey = JSON.stringify(data);

    useEffect(() => {
        if (!identityReady) return;
        // guards against StrictMode double-invoke and re-renders that do not
        // change the page, while still logging again on client side navigation
        if (loggedKey.current === visitKey) return;
        loggedKey.current = visitKey;

        logPageVisit({
            utm_campaign: searchParams.get("utm_campaign") || "",
            utm_medium: searchParams.get("utm_medium") || "",
            utm_source: searchParams.get("utm_source") || "",
            referer: document.referrer,
            ...data,
        }).then((response) => {
            if (response?.data?.page_sid) {
                setPageSession({
                    page_sid: response.data.page_sid,
                    page_name: data.page_name,
                    clinic_id: data.clinic_id,
                    doctor_id: data.doctor_id,
                });
                // a slow response for a page already navigated away from must not claim the new page
                if (loggedKey.current === visitKey) {
                    visitSidRef.current = { key: visitKey, sid: response.data.page_sid };
                }
            }
        });
    }, [identityReady, visitKey])

    /**
     * Time on page: only time the tab is visible counts. Flushed whenever the tab
     * is hidden or the page is left, so a locked phone or tab switch never loses
     * what was already watched. Time spent before the visit is logged is kept and
     * sent with the first flush after the page_sid arrives.
     */
    useEffect(() => {
        if (!identityReady) return;
        const pageKey = visitKey;
        let pendingMs = 0;
        let visibleSince: number | null = document.visibilityState === "visible" ? Date.now() : null;

        const pause = () => {
            if (visibleSince !== null) {
                pendingMs += Date.now() - visibleSince;
                visibleSince = null;
            }
        };
        const flush = () => {
            pause();
            const seconds = Math.round(pendingMs / 1000);
            const visit = visitSidRef.current;
            if (seconds < 1 || !visit || visit.key !== pageKey) return;
            pendingMs = 0;
            logEvent({ page_sid: visit.sid, ev_tp: "imp", ev_nm: "page_dwell", page_name: data.page_name, value: seconds.toString() });
        };
        const onVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                flush();
            } else if (visibleSince === null) {
                visibleSince = Date.now();
            }
        };
        document.addEventListener("visibilitychange", onVisibilityChange);
        window.addEventListener("pagehide", flush);
        return () => {
            document.removeEventListener("visibilitychange", onVisibilityChange);
            window.removeEventListener("pagehide", flush);
            flush();// client side navigation to another page
        };
    }, [identityReady, visitKey])

    useEffect(() => clearPageSession, [])

    return (
        <></>
    )
}
export default PageVisitLogger
