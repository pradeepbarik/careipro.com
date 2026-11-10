'use client'
import { useEffect } from 'react';
import Link from 'next/link';
import { BiErrorCircle, BiRefresh, BiHomeAlt } from 'react-icons/bi';
import { reportError } from '@/lib/helper/error-reporter';

/**
 * Shown in place of a page that crashed while rendering. The root layout (header, footer) stays,
 * so the visitor can still move on. The crash is reported to Site Errors in branch admin.
 */
const PageError = ({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) => {
    useEffect(() => {
        reportError({
            type: 'page_crash',
            // a server component crash reaches the browser with its message hidden, only the digest
            // links it to the server log, so keep it in the message
            message: `${error.message || 'Page crashed'}${error.digest ? ` (digest ${error.digest})` : ''}`,
            stack: error.stack,
        });
    }, [error]);

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center shadow-sm border border-gray-100">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <BiErrorCircle className="text-4xl text-primary" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
                <p className="text-gray-600 text-sm">
                    We could not load this page. Our team has been notified. Please try again, or go back to the home page.
                </p>
                <div className="flex gap-2 mt-5">
                    <button type="button" onClick={() => reset()} className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm">
                        <BiRefresh className="text-lg" />Try again
                    </button>
                    <Link href="/" className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-lg border border-primary/40 text-primary font-semibold text-sm">
                        <BiHomeAlt className="text-lg" />Go to home
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default PageError;
