import { API_BASE_URL } from '@/constants/client-apis';
import { userinfo, g_user_secreate_key } from '@/constants/storage_keys';

export type TSiteErrorType = 'page_crash' | 'js_error' | 'promise_rejection' | 'api_failure';
export type TSiteError = {
    type: TSiteErrorType,
    message: string,
    stack?: string,
    api_url?: string,
    api_method?: string,
    /** 0 = network error, no response */
    api_status?: number,
};

/* a broken component can throw on every render and a dead api fails every call, so a page load
   reports each distinct error once and at most MAX_REPORTS in total */
const MAX_REPORTS_PER_PAGE_LOAD = 20;
const reported = new Set<string>();
let reportCount = 0;

/* browser noise that is not a careipro bug: cross-origin "Script error." carries no detail,
   ResizeObserver warnings are harmless, and extensions inject their own failing scripts */
const IGNORED_MESSAGES = [/^script error\.?$/i, /resizeobserver loop/i, /^cancel(l)?ed$/i];
const IGNORED_SOURCES = /(chrome|moz|safari(-web)?)-extension:\/\//i;

/* the analytics endpoints are blocked by ad blockers all the time, a failure there is expected */
const IGNORED_API_PATHS = [/\/log-page-visit/, /\/log-event/, /\/log-error/, /\/feed-track/];

const isIgnored = (error: TSiteError) => {
    if (IGNORED_MESSAGES.some((re) => re.test((error.message || '').trim()))) return true;
    if (error.stack && IGNORED_SOURCES.test(error.stack)) return true;
    if (error.api_url && IGNORED_API_PATHS.some((re) => re.test(error.api_url || ''))) return true;
    return false;
};

/**
 * Sends an error the visitor ran into to POST /log-error (api.careipro.com), stored in
 * coll_site_errors and shown in branch admin, Home > Site Errors.
 *
 * Fire and forget: a beacon with a text/plain body, the same transport log-event uses, so it needs
 * no CORS preflight and survives the page unloading. It never throws - reporting an error must not
 * become another error. Does nothing on the server (server components render without a window).
 */
export const reportError = (error: TSiteError): void => {
    try {
        if (typeof window === 'undefined') return;
        if (isIgnored(error)) return;
        const key = `${error.type}|${error.message}|${error.api_url || ''}|${error.api_status ?? ''}`;
        if (reported.has(key) || reportCount >= MAX_REPORTS_PER_PAGE_LOAD) return;
        reported.add(key);
        reportCount++;

        let x_api_key = '';
        try { x_api_key = JSON.parse(window.localStorage.getItem(userinfo) || '{}').secreate_key || ''; } catch { /* no session */ }
        let g_api_key = '';
        try { g_api_key = window.localStorage.getItem(g_user_secreate_key) || ''; } catch { /* storage blocked */ }

        const payload = {
            type: error.type,
            message: (error.message || 'Unknown error').slice(0, 1000),
            stack: (error.stack || '').slice(0, 4000),
            page_url: window.location.href.slice(0, 1000),
            api_url: (error.api_url || '').slice(0, 500),
            api_method: error.api_method || '',
            api_status: error.api_status ?? '',
            x_api_key,
            g_api_key,
        };
        const url = `${API_BASE_URL}/log-error`;
        const body = new Blob([JSON.stringify(payload)], { type: 'text/plain' });
        if (navigator.sendBeacon && navigator.sendBeacon(url, body)) return;
        fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload), keepalive: true }).catch(() => { });
    } catch {
        // never let error reporting break the page
    }
};

/* an api call failed in a way worth tracking: no response at all, or a server error. 4xx are the
   api's normal "no" (validation, booking closed, not logged in) and are not reported. A network
   error while the browser is offline is the visitor's connection, not ours. */
export const reportApiFailure = (params: { url: string, method: string, status: number, message?: string }) => {
    if (typeof window === 'undefined') return;
    if (params.status === 0 && typeof navigator !== 'undefined' && navigator.onLine === false) return;
    if (params.status !== 0 && params.status < 500) return;
    reportError({
        type: 'api_failure',
        message: params.message || (params.status === 0 ? 'Network error, no response from the api' : `Server error ${params.status}`),
        api_url: params.url,
        api_method: params.method,
        api_status: params.status,
    });
};
