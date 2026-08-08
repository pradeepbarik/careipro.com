'use client'
import { AnchorHTMLAttributes, ReactNode } from 'react';
import useEventLogger from '@/lib/hooks/useEventLogger';

type TProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    /** stable event name - becomes the dashboard label. eg call_click */
    ev_nm: string;
    section_name?: string;
    children: ReactNode;
};

/**
 * Anchor that records a click before navigating. Lets server rendered pages
 * track outbound actions (tel:, whatsapp, maps) without becoming client components.
 * Remaining props pass through, so it can replace an <a> in place.
 */
const TrackedLink = ({ href, ev_nm, section_name, children, onClick, ...anchorProps }: TProps) => {
    const { trackClick } = useEventLogger();
    return (
        <a
            {...anchorProps}
            href={href}
            onClick={(e) => {
                trackClick(ev_nm, section_name);
                onClick?.(e);
            }}
        >
            {children}
        </a>
    );
};
export default TrackedLink;
