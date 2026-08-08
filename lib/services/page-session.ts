/**
 * Holds the id of the visit document logged for the page currently on screen.
 *
 * PageVisitLogger is rendered as a sibling of the page content rather than a
 * wrapper, so a React context would not reach the buttons that need this.
 * Event logging attaches to page_sid so a click is tied to the visit that
 * produced it.
 */
type TPageSession = {
    page_sid: string;
    page_name: string;
    clinic_id?: number;
    doctor_id?: number;
};

let currentSession: TPageSession | null = null;

export const setPageSession = (session: TPageSession): void => {
    currentSession = session;
};

export const clearPageSession = (): void => {
    currentSession = null;
};

export const getPageSession = (): TPageSession | null => currentSession;
