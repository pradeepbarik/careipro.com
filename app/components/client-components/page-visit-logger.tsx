'use client';
import { useSearchParams } from "next/navigation";
import useSiteVisiterLogger from "@/lib/hooks/useSiteVisiterLogger"
import { useEffect } from "react";
type TLogData = {
    page_name: string,
    state: string,
    city: string,
    clinic_id?: number,
    doctor_id?: number,
    utm_campaign?: string,
    utm_medium?: string,
    utm_source?: string,
}
const PageVisitLogger = ({ data }: { data: TLogData }) => {
    const searchParams = useSearchParams()
    const { logPageVisit } = useSiteVisiterLogger();
    useEffect(() => {
        logPageVisit({
            utm_campaign: searchParams.get("utm_campaign") || "",
            utm_medium: searchParams.get("utm_medium") || "",
            utm_source: searchParams.get("utm_source")||"",
            referer:document.referrer,
            ...data,
        })
    }, [])
    return (
        <></>
    )
}
export default PageVisitLogger