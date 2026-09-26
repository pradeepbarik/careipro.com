import { TclinicDetail } from '@/lib/hooks/useClinics';
export type TClinicTiming = TclinicDetail['timing'];
/* getDay() order, so the index from a Date maps straight onto the column prefix */
export const WEEK_DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;
export const DAY_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export type TSession = { start: number, end: number }
export type TOpenStatus = {
    isOpen: boolean,
    /* the time the clinic next opens or closes, already formatted, when there is one */
    nextChange: string | null,
}
/* clinic_timings stores display strings such as "8:00 AM", not 24 hour values */
export const parseTimeToMinutes = (value: string | null | undefined): number | null => {
    if (!value) {
        return null;
    }
    const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) {
        return null;
    }
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    if (match[3].toUpperCase() === "AM") {
        if (hours === 12) {
            hours = 0;
        }
    } else if (hours !== 12) {
        hours += 12;
    }
    return hours * 60 + minutes;
}
export const formatMinutes = (minutes: number) => {
    const hours24 = Math.floor(minutes / 60) % 24;
    const mins = minutes % 60;
    const meridiem = hours24 < 12 ? "AM" : "PM";
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    return `${hours12}:${mins.toString().padStart(2, "0")} ${meridiem}`;
}
/* A day is open when its flag is set and it has at least one usable session. Sessions
   that end before they start are dropped rather than treated as crossing midnight,
   because that pattern in this data is a data entry slip, not a night shift. */
export const getDaySessions = (timing: TClinicTiming, dayIndex: number): TSession[] => {
    const day = WEEK_DAYS[dayIndex];
    const row = timing as unknown as Record<string, unknown>;
    if (Number(row[day]) !== 1) {
        return [];
    }
    const sessions: TSession[] = [];
    for (const slot of ["1st", "2nd", "3rd"]) {
        const start = parseTimeToMinutes(row[`${day}_${slot}_session_start`] as string);
        const end = parseTimeToMinutes(row[`${day}_${slot}_session_end`] as string);
        if (start !== null && end !== null && end > start) {
            sessions.push({ start, end });
        }
    }
    return sessions.sort((a, b) => a.start - b.start);
}
/* "8:00 AM - 1:00 PM, 2:00 PM - 9:00 PM", or null when the clinic is shut that day */
export const formatDayHours = (timing: TClinicTiming, dayIndex: number): string | null => {
    const sessions = getDaySessions(timing, dayIndex);
    if (sessions.length === 0) {
        return null;
    }
    return sessions.map((session) => `${formatMinutes(session.start)} - ${formatMinutes(session.end)}`).join(", ");
}
/* Monday first, which is how opening hours are normally read, unlike getDay's order */
export const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];
export const getOpenStatus = (timing: TClinicTiming, now: Date): TOpenStatus => {
    const minutesNow = now.getHours() * 60 + now.getMinutes();
    const todaySessions = getDaySessions(timing, now.getDay());
    for (const session of todaySessions) {
        if (minutesNow >= session.start && minutesNow < session.end) {
            return { isOpen: true, nextChange: formatMinutes(session.end) };
        }
    }
    const laterToday = todaySessions.find((session) => session.start > minutesNow);
    if (laterToday) {
        /* say the day here too, so every closed case reads the same way and a caller
           never renders a bare time that could be read as tomorrow */
        return { isOpen: false, nextChange: `today ${formatMinutes(laterToday.start)}` };
    }
    /* look ahead for the next day that has any session at all */
    for (let ahead = 1; ahead <= 7; ahead++) {
        const dayIndex = (now.getDay() + ahead) % 7;
        const sessions = getDaySessions(timing, dayIndex);
        if (sessions.length > 0) {
            const label = ahead === 1 ? "tomorrow" : DAY_LABELS[dayIndex];
            return { isOpen: false, nextChange: `${label} ${formatMinutes(sessions[0].start)}` };
        }
    }
    return { isOpen: false, nextChange: null };
}
