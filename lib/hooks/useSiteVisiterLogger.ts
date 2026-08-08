import { fetchJson } from '@/lib/services/http-client';
import { API_BASE_URL } from '@/constants/client-apis';
import { userinfo, g_user_secreate_key } from '@/constants/storage_keys';

/**
 * URLSearchParams stringifies undefined/null as the literal "undefined"/"null",
 * which then fails validation server side and loses the whole log entry.
 */
const toQueryString = (data: Record<string, any>): string => {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') return;
        params.append(key, value.toString());
    });
    return params.toString();
};

const useSiteVisiterLogger = () => {
    const logPageVisit = (data: any): Promise<{ data: { page_sid: string } } | null> => {
        return fetchJson<{ data: { page_sid: string } }>(
            `/log-page-visit?${toQueryString(data)}`,
            false,
            {},
            { passGuserSecreateKey: true, passSecreateKey: true }
        ).catch(() => {
            // logging must never surface to the visitor
            return null;
        });
    };

    /**
     * Click/impression tracking. Uses sendBeacon because the common case is a
     * tel: or external link - a normal fetch is cancelled when the page unloads.
     */
    const logEvent = (data: {
        page_sid?: string;
        ev_tp: 'click' | 'imp';
        ev_nm: string;
        section_name?: string;
        value?: string;
        page_name?: string;
        clinic_id?: number;
        doctor_id?: number;
    }): void => {
        try {
            const user = JSON.parse(window.localStorage.getItem(userinfo) || '{}');
            const payload = {
                ...data,
                x_api_key: user.secreate_key || '',
                g_api_key: window.localStorage.getItem(g_user_secreate_key) || '',
            };
            const url = `${API_BASE_URL}/log-event`;
            // text/plain is CORS safelisted - application/json would force a
            // preflight, which sendBeacon cannot perform, so the event is dropped
            const body = new Blob([JSON.stringify(payload)], { type: 'text/plain' });
            if (navigator.sendBeacon && navigator.sendBeacon(url, body)) {
                return;
            }
            // keepalive lets the request outlive the page for browsers without sendBeacon
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                keepalive: true,
            }).catch(() => {});
        } catch (err) {
            // never let tracking break an interaction
        }
    };

    return {
        logPageVisit,
        logEvent,
    };
};
export default useSiteVisiterLogger;
