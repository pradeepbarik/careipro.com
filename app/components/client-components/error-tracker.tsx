'use client'
import { useEffect } from 'react';
import { reportError } from '@/lib/helper/error-reporter';

/**
 * Mounted once in the root layout. Reports script errors and promise rejections that nothing in
 * the page caught. Render crashes are reported by app/error.tsx and app/global-error.tsx instead,
 * React handles those before they reach the window.
 */
const ErrorTracker = () => {
    useEffect(() => {
        const onError = (event: ErrorEvent) => {
            reportError({
                type: 'js_error',
                message: event.message || event.error?.message || 'Script error',
                stack: event.error?.stack || (event.filename ? `at ${event.filename}:${event.lineno}:${event.colno}` : ''),
            });
        };
        const onRejection = (event: PromiseRejectionEvent) => {
            const reason: any = event.reason;
            /* the api client rejects with the response body ({ code, message }) for normal "no"
               answers like validation or booking closed, a caller forgetting .catch on those is
               not a site error - real api failures are already reported by the http client */
            if (reason && typeof reason === 'object' && !(reason instanceof Error) && 'code' in reason) return;
            reportError({
                type: 'promise_rejection',
                message: reason instanceof Error ? reason.message : (typeof reason === 'string' ? reason : JSON.stringify(reason ?? 'Unhandled rejection')).slice(0, 1000),
                stack: reason instanceof Error ? reason.stack : '',
            });
        };
        window.addEventListener('error', onError);
        window.addEventListener('unhandledrejection', onRejection);
        return () => {
            window.removeEventListener('error', onError);
            window.removeEventListener('unhandledrejection', onRejection);
        };
    }, []);
    return null;
};
export default ErrorTracker;
