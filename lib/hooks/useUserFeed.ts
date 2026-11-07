import { API_BASE_URL } from '@/constants/client-apis';
import { userinfo } from '@/constants/storage_keys';

export type TFeedTrackPayload =
    | { type: 'doctor_view', doctor_id: number, service_loc_id?: number, clinic_id?: number, cat_id?: number }
    | { type: 'category_search', cat_id: number }
    | { type: 'dwell', doctor_id: number, seconds: number, cat_id?: number }
    | { type: 'action', doctor_id: number, action: string, cat_id?: number };

/** the logged-in user's token, or "" for guests - guests have no feed */
const loggedInKey = (): string => {
    try {
        return JSON.parse(window.localStorage.getItem(userinfo) || '{}').secreate_key || '';
    } catch (err) {
        return '';
    }
};

/**
 * Sends one signal to the personalised feed. Independent of the page-visit log.
 * Uses sendBeacon (text/plain, so no CORS preflight) so dwell flushed on page
 * hide and clicks on tel:/wa.me links still arrive; the token travels in the
 * body because beacons cannot set headers. No-op for guests.
 */
export const trackFeed = (payload: TFeedTrackPayload): void => {
    try {
        const x_api_key = loggedInKey();
        if (!x_api_key) return;
        const cleaned = Object.fromEntries(Object.entries(payload).filter(([, v]) => v !== undefined && v !== null && v !== ''));
        const json = JSON.stringify({ ...cleaned, x_api_key });
        const url = `${API_BASE_URL}/user/feed-track`;
        if (navigator.sendBeacon && navigator.sendBeacon(url, new Blob([json], { type: 'text/plain' }))) {
            return;
        }
        fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: json, keepalive: true }).catch(() => {});
    } catch (err) {
        // the feed must never break the page
    }
};

/**
 * Which doctor detail page is on screen, and the result-page category it was
 * opened from. Set by DoctorFeedTracker so click tracking anywhere on the page
 * can credit the feed without depending on the page-visit session.
 */
type TFeedContext = { doctor_id: number, cat_id?: number };
let feedContext: TFeedContext | null = null;
export const setFeedContext = (ctx: TFeedContext | null) => { feedContext = ctx; };
export const getFeedContext = () => feedContext;
