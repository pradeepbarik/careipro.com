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
    const { logPageVisit } = useSiteVisiterLogger();
    const { is_loggedin, guest_user_secreate_key } = useSelector((state: RootState) => state.authSlice);
    // identity is resolved once the visitor is logged in or a guest key exists
    const identityReady = is_loggedin || Boolean(guest_user_secreate_key);
    const loggedKey = useRef<string>("");

    useEffect(() => {
        if (!identityReady) return;
        // guards against StrictMode double-invoke and re-renders that do not
        // change the page, while still logging again on client side navigation
        const visitKey = JSON.stringify(data);
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
            }
        });
    }, [identityReady, data])

    useEffect(() => clearPageSession, [])

    return (
        <></>
    )
}
export default PageVisitLogger
