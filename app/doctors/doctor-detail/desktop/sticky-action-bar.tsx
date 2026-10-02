'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { BiPhone, BiLogoWhatsapp, BiCalendar, BiUser } from "react-icons/bi";
import { BsPersonRaisedHand, BsTelephone } from "react-icons/bs";
import TrackedLink from "@/app/components/client-components/tracked-link";

/**
 * What the main button does, worked out on the server from settings.book_by so this bar and the
 * booking rail can never disagree about how a clinic takes appointments.
 * scroll-to-booking is the desktop case, the form is on this page so there is nowhere to send them.
 */
export type TPrimaryAction =
    | { kind: 'scroll-to-booking', label: string }
    | { kind: 'link', label: string, href: string }
    | { kind: 'call', label: string, href: string };

type TProps = {
    doctorName: string;
    specialty?: string;
    photo: string;
    fee: string;
    clinicMobile?: string;
    whatsappNumber?: string;
    whatsappMessage: string;
    primaryAction: TPrimaryAction;
    //the id of the booking panel, used by the scroll-to-booking action
    bookingPanelId: string;
};

//far enough that the bar only turns up once the profile header has gone past
const SHOW_AFTER_PX = 220;

const StickyActionBar = ({ doctorName, specialty, photo, fee, clinicMobile, whatsappNumber, whatsappMessage, primaryAction, bookingPanelId }: TProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToBooking = () => {
        const panel = document.getElementById(bookingPanelId);
        if (panel) {
            panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const primaryClass = "flex items-center justify-center gap-2 bg-primary text-white font-semibold fs-14 rounded-lg px-6 py-2.5 hover:opacity-90 transition-opacity whitespace-nowrap";

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
            aria-hidden={!visible}
        >
            <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center gap-4">
                <img src={photo} alt="" className="h-11 w-11 rounded-lg object-cover bg-gray-100 shrink-0" />
                <div className="min-w-0">
                    <p className="font-semibold text-gray-900 fs-16 truncate">{doctorName}</p>
                    {specialty && <p className="fs-12 text-muted truncate">{specialty}</p>}
                </div>
                <div className="ml-auto flex items-center gap-2 shrink-0">
                    <span className="hidden xl:flex flex-col items-end leading-tight mr-2">
                        <span className="font-bold text-gray-900 fs-15">{fee}</span>
                        <span className="fs-12 text-muted">Consulting fee</span>
                    </span>
                    {clinicMobile && (
                        <TrackedLink
                            href={`tel:${clinicMobile}`}
                            ev_nm="call_click"
                            section_name="sticky_action_bar"
                            className="flex items-center gap-1.5 border border-primary text-primary font-semibold fs-14 rounded-lg px-4 py-2.5 hover:bg-primary hover:text-white transition-colors"
                        >
                            <BiPhone className="text-lg" />Call
                        </TrackedLink>
                    )}
                    {whatsappNumber && (
                        <TrackedLink
                            href={`https://wa.me/${whatsappNumber}?text=${encodeURI(whatsappMessage)}`}
                            ev_nm="whatsapp_click"
                            section_name="sticky_action_bar"
                            className="flex items-center gap-1.5 border border-green-500 text-green-700 font-semibold fs-14 rounded-lg px-4 py-2.5 hover:bg-green-50 transition-colors"
                        >
                            <BiLogoWhatsapp className="text-lg" />WhatsApp
                        </TrackedLink>
                    )}
                    {primaryAction.kind === 'scroll-to-booking' ? (
                        <button onClick={scrollToBooking} className={primaryClass}>
                            <BiCalendar className="text-lg" />{primaryAction.label}
                        </button>
                    ) : primaryAction.kind === 'call' ? (
                        <TrackedLink href={primaryAction.href} ev_nm="call_click" section_name="sticky_action_bar_cta" className={primaryClass}>
                            <BsTelephone className="text-lg" />{primaryAction.label}
                        </TrackedLink>
                    ) : (
                        <Link href={primaryAction.href} className={primaryClass}>
                            {primaryAction.label.toLowerCase().includes('login')
                                ? <BiUser className="text-lg" />
                                : <BsPersonRaisedHand className="text-lg" />}
                            {primaryAction.label}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StickyActionBar;
