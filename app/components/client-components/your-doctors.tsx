'use client';
import { useEffect, useRef, useState, MouseEvent } from "react";
import Link from "next/link";
import { BiSolidMap, BiX } from "react-icons/bi";
import useUserFeedSection, { forgetUserCacheReads } from "@/lib/hooks/useUserFeedSection";
import { hideFeedDoctor } from "@/lib/hooks/useUserFeed";
import useEventLogger from "@/lib/hooks/useEventLogger";
import SectionHeading from "@/app/components/mobile/ui/section-heading";
import { capitalizeFirstLetter } from "@/lib/helper/format-text";

export type TYourDoctor = {
    doctor_id: number,
    service_loc_id: number,
    clinic_id: number,
    name: string,
    image: string,
    position: string,
    specialty: string,
    clinic: string,
    locality: string,
    experience: number,
    rating: number,
    rating_count: number,
    url: string,
    relation: "booked" | "contacted" | "viewed",
    other_city: string,
};

const SECTION = "your_doctors";

/**
 * Right column of the card's bottom row, beside the clinic and location.
 *
 * Only "Booked" is ever shown - the user's own booking history is expected.
 * Viewed / contacted still decide the order of the cards but are never
 * labelled: on a shared family phone a "Viewed" badge on a sensitive specialty
 * says too much, and both read as "they are watching me".
 */
const Badges = ({ doctor }: { doctor: TYourDoctor }) => {
    const booked = doctor.relation === "booked";
    if (!booked && !doctor.other_city) return null;
    return (
    <div className="flex flex-wrap items-center justify-end gap-1 shrink-0">
        {booked && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Booked</span>
        )}
        {doctor.other_city && (
            <span className="flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-orange-700">
                <BiSolidMap />{capitalizeFirstLetter(doctor.other_city)}
            </span>
        )}
    </div>
    );
};

/** the x in a card's top-right corner - sits inside the card link, so it must not navigate */
const HideButton = ({ onHide }: { onHide: () => void }) => (
    <button type="button" aria-label="Remove this doctor" title="Remove this doctor"
        onClick={(e: MouseEvent) => { e.preventDefault(); e.stopPropagation(); onHide(); }}
        className="absolute top-1 right-1 z-10 w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100">
        <BiX className="text-lg" />
    </button>
);

/**
 * The card list shared by "Your doctors" (city home) and "You might be looking
 * for" (result page): same cards and badges, different heading and data.
 * Each card has an x to remove that doctor.
 * Logs `{event}_shown` once, `{event}_click` (value = relation) per click and
 * `{event}_hide` per x.
 */
export const DoctorRelationCards = ({ doctors, heading, variant, section, event, desktopColumns = 4 }: {
    doctors: TYourDoctor[], heading: string, variant: "mobile" | "desktop", section: string, event: string, desktopColumns?: 3 | 4,
}) => {
    const { trackClick, trackImpression } = useEventLogger();
    const impressionSent = useRef(false);
    // removed on this page right away; the server keeps them out from the next load
    const [hiddenIds, setHiddenIds] = useState<number[]>([]);
    const visible = doctors.filter(d => !hiddenIds.includes(d.doctor_id));

    useEffect(() => {
        if (doctors.length && !impressionSent.current) {
            impressionSent.current = true;
            trackImpression(`${event}_shown`, section);
        }
    }, [doctors.length]);

    if (!visible.length) return null;
    const onCardClick = (doctor: TYourDoctor) => trackClick(`${event}_click`, section, doctor.relation);
    const onHide = (doctor: TYourDoctor) => {
        setHiddenIds(ids => [...ids, doctor.doctor_id]);
        trackClick(`${event}_hide`, section, doctor.relation);
        // the server rebuilds today's cache files without the doctor - drop our copy of the old ones
        hideFeedDoctor(doctor.doctor_id).then(() => forgetUserCacheReads());
    };

    if (variant === "desktop") {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                    <h2 className="text-xl font-bold text-gray-800">{heading}</h2>
                </div>
                <div className={`grid grid-cols-1 md:grid-cols-2 ${desktopColumns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-4`}>
                    {visible.map((doctor) => (
                        <Link key={doctor.doctor_id} href={doctor.url} onClick={() => onCardClick(doctor)} title={`${doctor.name}, ${doctor.specialty}`}
                            className="relative group flex gap-3 p-3 rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all bg-white">
                            <HideButton onHide={() => onHide(doctor)} />
                            <img src={doctor.image} alt={"Profile picture of " + doctor.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                            <div className="flex-1 min-w-0 flex flex-col pr-5">
                                <h3 className="fs-15 font-semibold text-gray-800 truncate group-hover:text-primary transition-colors">{doctor.name}</h3>
                                <p className="fs-13 text-primary truncate">{doctor.specialty}</p>
                                <div className="flex items-end gap-2 mt-auto pt-1">
                                    <div className="flex-1 min-w-0">
                                        {doctor.clinic && <p className="text-xs text-gray-700 truncate">{doctor.clinic}</p>}
                                        {doctor.locality && <p className="text-xs text-gray-500 truncate">{doctor.locality}</p>}
                                    </div>
                                    <Badges doctor={doctor} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <SectionHeading heading={heading} />
            <div className={`${visible.length > 1 ? "flex" : ""} overflow-auto cp-section hide-scroll-bar`} style={{ gap: ".6rem" }}>
                {visible.map((doctor) => (
                    <Link key={doctor.doctor_id} href={doctor.url} onClick={() => onCardClick(doctor)}
                        className="relative block shrink-0 bg-white shadow-md rounded-md p-2"
                        style={{ width: visible.length > 1 ? "70%" : "100%" }}>
                        <HideButton onHide={() => onHide(doctor)} />
                        <div className="flex gap-2">
                            <img src={doctor.image} alt={"Profile picture of " + doctor.name} className="w-14 h-14 rounded-full shrink-0 object-cover" />
                            <div className="flex flex-col min-w-0 pr-5">
                                <span className="fs-15 font-semibold one-line">{doctor.name}</span>
                                <span className="fs-13 color-primary one-line">{doctor.specialty}</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-2 mt-1">
                            <div className="flex-1 min-w-0">
                                {doctor.clinic && <div className="text-xs text-gray-700 one-line">{doctor.clinic}</div>}
                                {doctor.locality && <div className="text-xs text-gray-500 one-line">{doctor.locality}</div>}
                            </div>
                            <Badges doctor={doctor} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

/**
 * "Your doctors" on the city home page - doctors the logged-in user booked or
 * contacted (any city, other cities labelled), then doctors they viewed in
 * this city. Sits above "Recommended for you"; the two never share a doctor.
 * Renders nothing for guests and for users with no history.
 */
const YourDoctors = ({ state, city, variant }: { state: string, city: string, variant: "mobile" | "desktop" }) => {
    // today's per-user cache file first, the api only when it is not built yet
    const doctors = useUserFeedSection<TYourDoctor>("your_doctors", "/user/your-doctors", state, city);
    return <DoctorRelationCards doctors={doctors} heading="Doctors you may want to revisit" variant={variant} section={SECTION} event="your_doctor" />;
};
export default YourDoctors;
