'use client';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { fetchJson, IResponse } from "@/lib/services/http-client";
import { USER_FEED_CLEARED_EVENT } from "@/lib/hooks/useUserFeed";

type TUserCacheFile = "feed" | "result-page";
type TUserCache = { cities?: Record<string, Record<string, any>> };

/**
 * Sections on one page ask at the same moment - they share a single read of
 * each of the user's cache files instead of each fetching it.
 */
const cacheReads = new Map<TUserCacheFile, { at: number, promise: Promise<TUserCache | null> }>();
/** after a hide or "Clear history" the files were rebuilt on the server - never reuse an older read */
export const forgetUserCacheReads = () => cacheReads.clear();

const readUserCache = (file: TUserCacheFile): Promise<TUserCache | null> => {
    const recent = cacheReads.get(file);
    if (recent && Date.now() - recent.at < 10000) return recent.promise;
    const promise = fetchJson<TUserCache>(`/user-cache/${file}.json`, false, {}, { passSecreateKey: true })
        .catch(() => null);// 404 = not built today yet
    cacheReads.set(file, { at: Date.now(), promise });
    return promise;
};

/**
 * Reads `pick(cities[city])` from today's per-user cache file; only when the
 * file or that part of it is missing does it call `apiPath`, which builds it
 * and writes it into the file for the rest of the day.
 * Returns [] for guests, and on any failure - a section must never break the page.
 */
const useUserCache = <T,>(params: {
    file: TUserCacheFile,
    apiPath: string,
    state: string,
    city: string,
    /** from the city's entry in the cache file - undefined means "not built yet" */
    fromCache: (cityEntry: Record<string, any> | undefined) => T[] | undefined,
    /** from the api response's data */
    fromApi: (data: any) => T[],
    deps: any[],
}): T[] => {
    const { is_loggedin } = useSelector((s: RootState) => s.authSlice);
    const [items, setItems] = useState<T[]>([]);
    const { file, apiPath, state, city } = params;

    useEffect(() => {
        if (!is_loggedin || !state || !city) {
            setItems([]);
            return;
        }
        let cancelled = false;
        const cityKey = city.trim().toLowerCase();
        const load = async (): Promise<T[]> => {
            const cache = await readUserCache(file);
            const cached = params.fromCache(cache?.cities?.[cityKey]);
            if (cached) return cached;
            const res = await fetchJson<IResponse<any>>(
                `${apiPath}?state=${encodeURIComponent(state.toLowerCase())}&city=${encodeURIComponent(cityKey)}`,
                false, {}, { passSecreateKey: true });
            return params.fromApi(res?.data) || [];
        };
        load().then((list) => {
            if (!cancelled) setItems(list);
        }).catch(() => { });
        // "Clear history" anywhere on the page empties this section too
        const onCleared = () => { forgetUserCacheReads(); setItems([]); };
        window.addEventListener(USER_FEED_CLEARED_EVENT, onCleared);
        return () => {
            cancelled = true;
            window.removeEventListener(USER_FEED_CLEARED_EVENT, onCleared);
        };
    }, [is_loggedin, state, city, file, apiPath, ...params.deps]);

    return items;
};

/** one home page section ("your_doctors", "recommended_doctors") from feed.json */
const useUserFeedSection = <T,>(section: string, apiPath: string, state: string, city: string): T[] =>
    useUserCache<T>({
        file: "feed", apiPath, state, city, deps: [section],
        fromCache: (entry) => (Array.isArray(entry?.[section]) ? entry![section] : undefined),
        fromApi: (data) => data?.doctors || [],
    });

/**
 * "You might be looking for" on a result page: the cards of one category from
 * result-page.json. The file holds every category of interest for the city,
 * so a category with no key there simply has no section.
 */
export const useResultPageDoctors = <T,>(state: string, city: string, cat_id: string | number | undefined): T[] =>
    useUserCache<T>({
        file: "result-page", apiPath: "/user/result-page-doctors", state, city, deps: [cat_id],
        fromCache: (entry) => (entry && entry.categories ? (entry.categories[String(cat_id)] || []) : undefined),
        fromApi: (data) => data?.categories?.[String(cat_id)] || [],
    });

export default useUserFeedSection;
