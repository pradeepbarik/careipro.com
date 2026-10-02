import { TClinic } from "@/lib/types/clinic";
import { getOpenStatus } from "@/lib/helper/clinic-timing";

/**
 * The filtering and sorting behind the clinics listing. Kept out of the component so the rules are
 * readable on their own, the same split the doctor listing uses.
 *
 * Every option offered is built from the clinics the page was rendered with, never from a fixed
 * list, because a category in one city carries labs with home collection and brand tie ups while the
 * same category in the next city carries none. A filter nobody on this page can satisfy is worse
 * than no filter at all.
 */

export type TClinicSort = "relevance" | "rating" | "doctors" | "name";

/* No area here: the listing is already scoped to one market by the url it was reached through, so an
   area picker would be a control that almost never narrows anything. */
export type TClinicFilters = {
    specialization: string | null,
    brand: string | null,
    openNow: boolean,
    rated: boolean,
    homeCollection: boolean,
};

export const EMPTY_CLINIC_FILTERS: TClinicFilters = {
    specialization: null, brand: null,
    openNow: false, rated: false, homeCollection: false
};

export const hasAnyClinicFilter = (filters: TClinicFilters) => !!(
    filters.specialization || filters.brand ||
    filters.openNow || filters.rated || filters.homeCollection
);

export type TClinicFilterOptions = {
    specializations: string[],
    brands: string[],
    /* whether the toggles are worth drawing at all for this city and category */
    anyOpenStatus: boolean,
    anyRated: boolean,
    anyHomeCollection: boolean,
};

const byLabel = (a: string, b: string) => a.localeCompare(b);

export function buildFilterOptions(clinics: TClinic[]): TClinicFilterOptions {
    const specializations = new Set<string>();
    const brands = new Set<string>();
    let anyOpenStatus = false, anyRated = false, anyHomeCollection = false;

    for (const clinic of clinics) {
        for (const specialization of clinic.doctor_specializations || []) {
            const value = (specialization || "").trim();
            if (value) specializations.add(value);
        }
        const brand = (clinic.partner_with || "").trim();
        if (brand) brands.add(brand);
        if (clinic.timing) anyOpenStatus = true;
        if (clinic.avg_rating) anyRated = true;
        if (clinic.sample_home_collection === 1) anyHomeCollection = true;
    }

    /* Array.from rather than a spread: the build targets es5, where a Set is not iterable */
    return {
        specializations: Array.from(specializations).sort(byLabel),
        brands: Array.from(brands).sort(byLabel),
        anyOpenStatus, anyRated, anyHomeCollection
    };
}

/**
 * `now` is null until the browser has mounted. Open-now is the one rule that depends on the clock,
 * and this html is cached for a day, so deciding it while rendering would both bake a stale answer
 * into the cache and make the server and the browser disagree. Until a clock arrives the filter
 * simply does not narrow anything.
 */
export function applyClinicFilters(clinics: TClinic[], filters: TClinicFilters, now: Date | null): TClinic[] {
    return clinics.filter((clinic) => {
        if (filters.specialization && !(clinic.doctor_specializations || []).some((s) => (s || "").trim() === filters.specialization)) return false;
        if (filters.brand && (clinic.partner_with || "").trim() !== filters.brand) return false;
        if (filters.rated && !(clinic.avg_rating && clinic.avg_rating >= 4)) return false;
        if (filters.homeCollection && clinic.sample_home_collection !== 1) return false;
        if (filters.openNow && now) {
            if (!clinic.timing) return false;
            if (!getOpenStatus(clinic.timing, now).isOpen) return false;
        }
        return true;
    });
}

export function searchClinics(clinics: TClinic[], query: string): TClinic[] {
    const needle = query.trim().toLowerCase();
    if (!needle) return clinics;
    return clinics.filter((clinic) =>
        clinic.name.toLowerCase().includes(needle) ||
        (clinic.locality || "").toLowerCase().includes(needle) ||
        (clinic.market_name || "").toLowerCase().includes(needle) ||
        (clinic.doctor_specializations || []).some((s) => (s || "").toLowerCase().includes(needle))
    );
}

/* "relevance" is the order the api sent, which already carries the prime and seo ranking, so it is
   returned untouched rather than re-sorted by anything this page can see. */
export function sortClinics(clinics: TClinic[], sort: TClinicSort): TClinic[] {
    if (sort === "relevance") return clinics;
    const sorted = [...clinics];
    if (sort === "rating") {
        sorted.sort((a, b) => (b.avg_rating || 0) - (a.avg_rating || 0) || (b.rating_cnt || 0) - (a.rating_cnt || 0));
    } else if (sort === "doctors") {
        sorted.sort((a, b) => b.doctors_count - a.doctors_count);
    } else if (sort === "name") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
}
