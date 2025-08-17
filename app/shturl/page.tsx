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
                router.replace(res.data.url);
            }
        })
    }, []);
    return null;
}