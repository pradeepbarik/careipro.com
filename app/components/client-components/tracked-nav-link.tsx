'use client'
import Link from 'next/link';
import { ComponentProps, ReactNode } from 'react';
import useEventLogger from '@/lib/hooks/useEventLogger';

type TProps = ComponentProps<typeof Link> & {
    /** stable event name - becomes the dashboard label. eg tab_click */
    ev_nm: string;
    section_name?: string;
    value?: string;
    children: ReactNode;
};

/**
 * Next Link that records a click before routing. Unlike TrackedLink this keeps
 * client side navigation, so it suits in-app tabs and internal links.
 */
const TrackedNavLink = ({ ev_nm, section_name, value, children, onClick, ...linkProps }: TProps) => {
    const { trackClick } = useEventLogger();
    return (
        <Link
            {...linkProps}
            onClick={(e) => {
                trackClick(ev_nm, section_name, value);
                onClick?.(e);
            }}
        >
            {children}
        </Link>
    );
};
export default TrackedNavLink;
