'use client';
import { useEffect, useRef } from "react";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { BiClinic, BiSolidMap } from "react-icons/bi";
import useUserFeedSection from "@/lib/hooks/useUserFeedSection";
import useEventLogger from "@/lib/hooks/useEventLogger";
import SectionHeading from "@/app/components/mobile/ui/section-heading";

type TRecommendedDoctor = {
    doctor_id: number,
    service_loc_id: number,
    clinic_id: number,
    name: string,
    image: string,
    position: string,
    qualification: string,
    specialty: string,
    clinic: string,
    locality: string,
    experience: number,
    rating: number,
    rating_count: number,
    url: string,
    reason: { cat_id: number, cat_name: string },
};

const SECTION = "recommended_for_you";

/**
 * "More doctors you may consider" on the city home page (below "Doctors you may
 * want to revisit") - new doctors in this city from
 * the logged-in user's top searched specialties. Client only: the page around
 * it is the same cached page for everyone. Guests and users without any
 * interest yet get nothing rendered, so the page looks exactly as before.
 */
const RecommendedDoctors = ({ state, city, variant }: { state: string, city: string, variant: "mobile" | "desktop" }) => {
    // today's per-user cache file first, the api only when it is not built yet
    const doctors = useUserFeedSection<TRecommendedDoctor>("recommended_doctors", "/user/recommended-doctors", state, city);
    const { trackClick, trackImpression } = useEventLogger();
    const impressionSent = useRef(false);

    useEffect(() => {
        if (doctors.length && !impressionSent.current) {
            impressionSent.current = true;
            trackImpression("recommended_doctors_shown", SECTION);
        }
    }, [doctors.length]);

    if (!doctors.length) return null;
    const onCardClick = (doctor: TRecommendedDoctor) => trackClick("recommended_doctor_click", SECTION, doctor.reason.cat_id.toString());

    if (variant === "desktop") {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                    <h2 className="text-xl font-bold text-gray-800">More doctors you may consider</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctors.map((doctor) => (
                        <Link key={doctor.doctor_id} href={doctor.url} onClick={() => onCardClick(doctor)} title={`${doctor.name}, ${doctor.specialty}`}
                            className="group flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all bg-white">
                            <div className="relative flex-shrink-0">
                                <img src={doctor.image} alt={"Profile picture of " + doctor.name} className="w-20 h-20 rounded-lg object-cover" />
                                {doctor.rating > 0 && (
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                                        <span>{doctor.rating}</span><AiFillStar className="text-[10px]" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-800 truncate group-hover:text-primary transition-colors">{doctor.name}</h3>
                                <p className="text-sm text-primary font-medium truncate">{doctor.specialty}</p>
                                {doctor.experience > 0 && <p className="text-xs text-gray-500">{doctor.experience}+ yrs experience</p>}
                                {doctor.clinic && <p className="flex items-center gap-1 mt-1 text-xs text-gray-600 truncate"><BiClinic className="text-gray-400 shrink-0" />{doctor.clinic}</p>}
                                <p className="mt-2 text-[11px] text-gray-400 truncate">Because you searched {doctor.reason.cat_name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <SectionHeading heading="More doctors you may consider" />
            <div className={`${doctors.length > 1 ? "flex" : ""} overflow-auto cp-section hide-scroll-bar`} style={{ gap: ".6rem" }}>
                {doctors.map((doctor) => (
                    <Link key={doctor.doctor_id} href={doctor.url} onClick={() => onCardClick(doctor)}
                        className="block shrink-0 bg-white shadow-md rounded-md p-2 border-l-4 border-primary"
                        style={{ width: doctors.length > 1 ? "80%" : "100%" }}>
                        <div className="flex gap-2">
                            <img src={doctor.image} alt={"Profile picture of " + doctor.name} className="w-16 h-16 rounded-full shrink-0 object-cover" />
                            <div className="flex flex-col min-w-0">
                                <span className="font-semibold one-line fs-16">{doctor.name}</span>
                                <span className="color-primary text-sm one-line">{doctor.specialty}</span>
                                {doctor.experience > 0 && <span className="text-xs text-gray-500">{doctor.experience}+ yrs experience</span>}
                                {doctor.rating > 0 && (
                                    <span className="flex items-center gap-0.5 text-xs text-green-700 font-semibold">
                                        <AiFillStar />{doctor.rating}{doctor.rating_count > 0 && <span className="text-gray-400 font-normal">&nbsp;({doctor.rating_count})</span>}
                                    </span>
                                )}
                            </div>
                        </div>
                        {(doctor.clinic || doctor.locality) && (
                            <div className="flex items-start gap-1 mt-1 text-xs text-gray-600">
                                <BiSolidMap className="color-primary shrink-0 mt-0.5" />
                                <span className="one-line">{[doctor.clinic, doctor.locality].filter(Boolean).join(" · ")}</span>
                            </div>
                        )}
                        <div className="mt-1 text-[11px] text-gray-400 one-line">Because you searched {doctor.reason.cat_name}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default RecommendedDoctors;
