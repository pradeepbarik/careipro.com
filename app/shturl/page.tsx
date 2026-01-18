'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { fetchShortUrlInfo } from '@/lib/services/apicalls';
export default function ShturlRedirectPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    useEffect(() => {
        fetchShortUrlInfo(searchParams.get("sc") || "").then((res) => {
            if (res.code === 200) {
                // get query params from res.data.url and redirect
                let redirectUrl = res.data.url;
                // check if url contains full url or path only
                if (!redirectUrl.startsWith("http")) {
                    redirectUrl = "https://careipro.com" + redirectUrl;
                }
                const url = new URL(redirectUrl);
                const pathname = url.pathname;
                const redirectSearchParams = url.searchParams;
                searchParams.forEach((value, key) => {
                    if (!redirectSearchParams.has(key)) {
                        redirectSearchParams.append(key, value);
                    }
                });
                let finalUrl = pathname;
                const spString = redirectSearchParams.toString();
                if (spString) {
                    finalUrl += "?" + spString;
                }
               // console.log("finalUrl", finalUrl);
                router.replace(finalUrl);
            }
        })
    }, []);
    return null;
}