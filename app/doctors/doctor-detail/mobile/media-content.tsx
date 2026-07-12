"use client"
import { createPortal } from 'react-dom';
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { BiX, BiChevronLeft, BiChevronRight, BiPlayCircle, BiImages, BiCalendar, BiUser } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { SectionHeading } from "@/app/components/mobile/ui";
import { mediaUrl } from "@/lib/image";
import { TDoctorDetail } from "@/lib/types/doctor";

type TMediaItem = NonNullable<TDoctorDetail['media']>[number];
type TSection = { heading: string, items: TMediaItem[] };
type TBookingInfo = {
    bookBy: string,
    pageUrl: string,
    clinicMobile: string,
    isLoggedIn: boolean,
    loginRedirectUrl: string,
}

const BookingCta = ({ bookingInfo }: { bookingInfo: TBookingInfo }) => {
    const ctaClass = "flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2";
    if (bookingInfo.bookBy === "call") {
        return (
            <a href={`tel:${bookingInfo.clinicMobile}`} className={ctaClass}>
                <BsTelephone className="text-xl" />
                <span>Call Now</span>
            </a>
        )
    }
    if (bookingInfo.bookBy === "app" || bookingInfo.bookBy === "manually") {
        return bookingInfo.isLoggedIn ? (
            <Link href={bookingInfo.pageUrl + "/book-appointment"} className={ctaClass}>
                <BiCalendar className="text-xl" />
                <span>Book Appointment</span>
            </Link>
        ) : (
            <Link href={`/login?redirect_url=${bookingInfo.loginRedirectUrl}/book-appointment`} className={ctaClass}>
                <BiUser className="text-xl" />
                <span>Login & Book</span>
            </Link>
        )
    }
    return null;
}

const cssAspectRatio = (ratio?: string) => ratio ? ratio.replace(':', ' / ') : undefined;

const Lightbox = ({ items, index, onClose, onNavigate, bookingInfo }: { items: TMediaItem[], index: number, onClose: () => void, onNavigate: (i: number) => void, bookingInfo?: TBookingInfo }) => {
    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => { setIsBrowser(true); }, []);
    const item = items[index];
    // Remember the previously shown index so we know which way to slide the incoming image:
    // forward -> slides in from the right, back -> left. The ref is updated in an effect
    // (not during render) so React Strict Mode's double-invoke of the render body can't see
    // an already-mutated value and miscompute the direction on the second pass.
    const prevIndexRef = useRef(index);
    const slideClass = index >= prevIndexRef.current ? 'slideInRight' : 'slideInLeft';
    useEffect(() => {
        prevIndexRef.current = index;
    }, [index]);

    // Swipe left -> next, swipe right -> previous. Ignores short drags and mostly-vertical
    // gestures so it doesn't misfire while the user is just tapping or scrolling a caption.
    const touchStartRef = useRef<{ x: number, y: number } | null>(null);
    const SWIPE_THRESHOLD = 50;
    const handleTouchStart = (e: React.TouchEvent) => {
        const t = e.touches[0];
        touchStartRef.current = { x: t.clientX, y: t.clientY };
    };
    const handleTouchEnd = (e: React.TouchEvent) => {
        const start = touchStartRef.current;
        touchStartRef.current = null;
        if (!start) return;
        const t = e.changedTouches[0];
        const deltaX = t.clientX - start.x;
        const deltaY = t.clientY - start.y;
        if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) return;
        if (deltaX < 0 && index < items.length - 1) {
            onNavigate(index + 1);
        } else if (deltaX > 0 && index > 0) {
            onNavigate(index - 1);
        }
    };

    if (!isBrowser || !item) return null;
    return createPortal(
        <div className="fixed inset-0 bg-black flex flex-col" style={{ zIndex: 100 }}>
            <div className="flex items-center justify-between px-3 py-2 shrink-0">
                <div className="flex flex-col">
                    {item.category && <span className="color-white fs-15 font-semibold">{item.category}</span>}
                    <span className="color-white fs-12" style={{ opacity: 0.7 }}>{index + 1} / {items.length}</span>
                </div>
                <BiX className="text-3xl color-white" onClick={onClose} />
            </div>
            <div className="grow flex items-center justify-center relative overflow-hidden px-2" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                {index > 0 &&
                    <BiChevronLeft className="absolute left-1 text-4xl color-white bg-black/40 rounded-full shrink-0" style={{ zIndex: 1 }} onClick={() => onNavigate(index - 1)} />
                }
                {item.media_type === "video" ? (
                    <video key={item.media_url} src={mediaUrl(item.media_url || '')} controls autoPlay className={`max-h-full max-w-full ${slideClass}`} />
                ) : (
                    <img key={item.media_url} src={mediaUrl(item.media_url || '')} alt={item.media_description || 'Doctor treatment media'} className={`max-h-full max-w-full object-contain ${slideClass}`} />
                )}
                {index < items.length - 1 &&
                    <BiChevronRight className="absolute right-1 text-4xl color-white bg-black/40 rounded-full shrink-0" style={{ zIndex: 1 }} onClick={() => onNavigate(index + 1)} />
                }
            </div>
            {item.media_description &&
                <div className="px-3 py-2 color-white fs-14 text-center shrink-0">{item.media_description}</div>
            }
            {bookingInfo &&
                <div className="px-3 py-3 shrink-0 flex gap-2">
                    <BookingCta bookingInfo={bookingInfo} />
                </div>
            }
        </div>,
        document.body
    );
}

const MediaCard = ({ media, onClick }: { media: TMediaItem, onClick: () => void }) => (
    <div
        className="relative shrink-0 rounded-2xl overflow-hidden shadow-md border bg-gray-100 flex items-center justify-center"
        style={{ width: '44vw' }}
        onClick={onClick}
    >
        {media.media_type === "video" ? (
            <video src={mediaUrl(media.media_url || '')} preload="none" className="w-full block" style={{ aspectRatio: cssAspectRatio(media.aspect_ratio) || '4 / 3', objectFit: 'cover' }} />
        ) : (
            <img src={mediaUrl(media.media_url || '')} alt={media.media_description || 'Doctor treatment media'} loading="lazy" decoding="async" className="w-full block" style={{ aspectRatio: cssAspectRatio(media.aspect_ratio) || '4 / 3', objectFit: 'cover' }} />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent 40%)' }} />
        {media.media_type === "video" &&
            <BiPlayCircle className="absolute text-5xl color-white" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        }
    </div>
)

const MediaContent = ({ data, categories, bookingInfo }: { data: TDoctorDetail['media'], categories: TDoctorDetail['media_category'], bookingInfo?: TBookingInfo }) => {
    const [lightbox, setLightbox] = useState<{ items: TMediaItem[], index: number } | null>(null);

    const sections = useMemo<TSection[]>(() => {
        const list = data || [];
        if (!categories || categories.length === 0) {
            return list.length > 0 ? [{ heading: `Gallery (${list.length})`, items: list }] : [];
        }
        const grouped = categories
            .map((c) => ({ heading: `${c.category} (${c.count})`, items: list.filter((m) => m.category === c.category) }))
            .filter((s) => s.items.length > 0);
        const uncategorized = list.filter((m) => !m.category);
        if (uncategorized.length > 0) {
            grouped.push({ heading: `Other Photos (${uncategorized.length})`, items: uncategorized });
        }
        return grouped;
    }, [data, categories]);

    if (sections.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center px-4 py-16 color-grey">
                <BiImages className="text-5xl" />
                <span className="mt-2 fs-15">No photos or videos added yet.</span>
            </div>
        )
    }

    return (
        <>
            {sections.map((section) =>
                <div key={section.heading} className="mb-3">
                    <SectionHeading heading={section.heading} />
                    <div className="flex overflow-auto gap-3 px-2 pb-1 hide-scroll-bar">
                        {section.items.map((media, i) =>
                            <MediaCard key={`${media.media_url}-${i}`} media={media} onClick={() => setLightbox({ items: section.items, index: i })} />
                        )}
                    </div>
                </div>
            )}
            {lightbox &&
                <Lightbox items={lightbox.items} index={lightbox.index} onClose={() => setLightbox(null)} onNavigate={(i) => setLightbox({ items: lightbox.items, index: i })} bookingInfo={bookingInfo} />
            }
        </>
    )
}
export default MediaContent
