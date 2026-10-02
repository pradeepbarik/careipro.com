import { TDoctor } from "@/lib/types/doctor";
import { TActiveFilters } from "./mobile/doctor-filters";

/**
 * The filtering behind the doctor list, shared by the mobile and the desktop page so a change to
 * what "available this weekend" means only has to be made once.
 */
export const EMPTY_FILTERS: TActiveFilters = {
    availability: null, session: null, rating: null, area: null, nearbyCity: null, brandedHospital: null, symptoms: []
};

//filter options are built in the cache, doctor rows still carry the raw spelling so match on the normalized value
function normalizeHospital(name: string | undefined | null): string {
    return (name || '').trim().toLowerCase();
}

function parseLocalDate(dateStr: string): Date {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
}

// Parses "8:00 AM" → 8, "12:00 PM" → 12, "6:00 PM" → 18
function parseHour24(time: string | null | undefined): number | null {
    if (!time) return null;
    const upper = time.toUpperCase();
    const parts = upper.replace('AM', '').replace('PM', '').trim().split(':');
    let h = parseInt(parts[0], 10);
    if (isNaN(h)) return null;
    if (upper.includes('PM') && h !== 12) h += 12;
    if (upper.includes('AM') && h === 12) h = 0;
    return h;
}

function sessionStartHours(cd: NonNullable<TDoctor['consult_dates']>[number]): number[] {
    return [cd.first_session_start_time, cd.second_session_start_time, cd.third_session_start_time]
        .map(parseHour24)
        .filter((h): h is number => h !== null);
}

export function applyFilters(doctors: TDoctor[], filters: TActiveFilters): TDoctor[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const hasAvailFilter = !!(filters.availability || filters.session);
    const result: TDoctor[] = [];

    for (const dr of doctors) {
        if (filters.area && dr.market_name !== filters.area) continue;
        if (filters.brandedHospital && normalizeHospital(dr.branded_hospital) !== filters.brandedHospital) continue;

        let matched_consult_date: TDoctor['matched_consult_date'] = undefined;

        if (hasAvailFilter) {
            const dates = dr.consult_dates ?? [];
            if (dates.length === 0) continue;

            let availDates = filters.availability ? dates.filter(cd => {
                const d = parseLocalDate(cd.date);
                const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
                if (filters.availability === 'today') return diff === 0;
                if (filters.availability === 'tomorrow') return diff === 1;
                if (filters.availability === 'weekend') return diff >= 0 && diff <= 6 && (d.getDay() === 0 || d.getDay() === 6);
                return cd.date === filters.availability; // custom date
            }) : [...dates];

            if (filters.availability && availDates.length === 0) continue;

            if (filters.session) {
                availDates = availDates.filter(cd => {
                    const hours = sessionStartHours(cd);
                    if (filters.session === 'morning') return hours.some(h => h >= 6 && h < 12);
                    if (filters.session === 'afternoon') return hours.some(h => h >= 12 && h < 15);
                    if (filters.session === 'evening') return hours.some(h => h >= 16);
                    return false;
                });
                if (availDates.length === 0) continue;
            }

            matched_consult_date = availDates[0];
        }

        result.push({ ...dr, matched_consult_date });
    }
    return result;
}

export const hasAnyFilter = (filters: TActiveFilters) => !!(
    filters.availability || filters.session || filters.area || filters.nearbyCity ||
    filters.brandedHospital || filters.symptoms.length > 0
);
