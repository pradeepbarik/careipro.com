'use client'
import useSiteVisiterLogger from './useSiteVisiterLogger';
import { getPageSession } from '../services/page-session';

/**
 * Click/impression tracking bound to the page visit currently on screen.
 *
 * Keep ev_nm coarse and stable - it is the grouping key on the dashboard.
 * Put the specific place in section_name and the chosen option in value:
 *   trackClick('call_click', 'contact')
 *   trackClick('tab_click', 'expertise_in')
 *   trackClick('filter_apply', 'availability', 'today')
 */
const useEventLogger = () => {
    const { logEvent } = useSiteVisiterLogger();

    const track = (ev_tp: 'click' | 'imp', ev_nm: string, section_name?: string, value?: string) => {
        const session = getPageSession();
        logEvent({
            page_sid: session?.page_sid,
            page_name: session?.page_name,
            clinic_id: session?.clinic_id,
            doctor_id: session?.doctor_id,
            ev_tp,
            ev_nm,
            section_name,
            value,
        });
    };

    return {
        trackClick: (ev_nm: string, section_name?: string, value?: string) =>
            track('click', ev_nm, section_name, value),
        trackImpression: (ev_nm: string, section_name?: string, value?: string) =>
            track('imp', ev_nm, section_name, value),
    };
};
export default useEventLogger;
