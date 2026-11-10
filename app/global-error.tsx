'use client'
import { useEffect } from 'react';
import { reportError } from '@/lib/helper/error-reporter';

/**
 * Last resort: the root layout itself crashed, so app/error.tsx cannot render. This replaces the
 * whole document, which is why it carries its own html and body and plain inline styles - the
 * site stylesheet came with the layout that just failed.
 */
const GlobalError = ({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) => {
    useEffect(() => {
        reportError({
            type: 'page_crash',
            message: `[root layout] ${error.message || 'Site crashed'}${error.digest ? ` (digest ${error.digest})` : ''}`,
            stack: error.stack,
        });
    }, [error]);

    return (
        <html lang="en">
            <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#f3f4f6' }}>
                <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                    <div style={{ background: '#fff', borderRadius: 16, maxWidth: 420, width: '100%', padding: 24, textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                        <h2 style={{ fontSize: 20, color: '#1f2937', margin: '0 0 8px' }}>Something went wrong</h2>
                        <p style={{ fontSize: 14, color: '#4b5563', margin: 0 }}>
                            Careipro could not load. Our team has been notified. Please try again.
                        </p>
                        <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                            <button type="button" onClick={() => reset()} style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', background: 'rgb(8, 145, 178)', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
                                Try again
                            </button>
                            <a href="/" style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: '1px solid rgba(8, 145, 178, 0.4)', color: 'rgb(8, 145, 178)', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>
                                Go to home
                            </a>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
};
export default GlobalError;
