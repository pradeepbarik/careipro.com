import Link from "next/link";
import Script from "next/script";
import { BiSolidMap, BiClinic, BiTimeFive, BiBuildings, BiRupee } from "react-icons/bi";
import { MdVerified } from "react-icons/md";
import { TDoctor } from "@/lib/types/doctor";
import { doctorProfilePic } from "@/lib/image";
import { doctorDetailPageUrl } from "@/lib/helper/link";
import { capitalizeFirstLetter } from "@/lib/helper/format-text";

function formatDateLabel(dateStr: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const diff = Math.round((date.getTime() - today.getTime()) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
}

function getSessionSlots(cd: NonNullable<TDoctor['matched_consult_date']>): string[] {
    const slots: string[] = [];
    if (cd.first_session_start_time && cd.first_session_end_time)
        slots.push(`${cd.first_session_start_time} – ${cd.first_session_end_time}`);
    if (cd.second_session_start_time && cd.second_session_end_time)
        slots.push(`${cd.second_session_start_time} – ${cd.second_session_end_time}`);
    if (cd.third_session_start_time && cd.third_session_end_time)
        slots.push(`${cd.third_session_start_time} – ${cd.third_session_end_time}`);
    return slots;
}

/**
 * A doctor row on the desktop listing. The wide column lets the three things a visitor compares sit
 * side by side, who the doctor is, where they sit and when they are next available, with the
 * booking action always in the same place on the right.
 */
const DoctorCard = ({ doctor }: { doctor: TDoctor }) => {
    const detailUrl = doctorDetailPageUrl({
        doctor_id: doctor.doctor_id,
        clinic_id: doctor.clinic_id,
        service_loc_id: doctor.service_location_id,
        seo_url: doctor.doctor_seo_url,
        city: doctor.city,
        state: doctor.state,
        market_name: doctor.market_name,
        type: doctor.business_type
    });
    const slots = doctor.matched_consult_date ? getSessionSlots(doctor.matched_consult_date) : [];
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-primary/40 transition-all">
            <div className="flex gap-4">
                <Link href={detailUrl} title={doctor.doctor_name} className="shrink-0">
                    <img
                        src={doctorProfilePic(doctor.doctor_profile_pic)}
                        alt={`Profile picture of ${doctor.doctor_name}`}
                        className="w-24 h-24 rounded-lg object-cover border border-gray-100"
                    />
                    {doctor.experience > 0 && (
                        <span className="mt-1.5 block fs-12 font-semibold text-red-700 border border-red-200 rounded-full px-2 py-0.5 text-center leading-tight">
                            {doctor.experience}+ Yrs Exp
                        </span>
                    )}
                </Link>

                <div className="flex-1 min-w-0">
                    <Link href={detailUrl} title={`${doctor.doctor_name} in ${doctor.clinic}, ${doctor.city}`} className="group inline-flex items-center gap-1">
                        <h3 className="font-bold text-gray-900 fs-17 group-hover:text-primary transition-colors">{doctor.doctor_name}</h3>
                        <MdVerified className="text-blue-500 shrink-0" />
                    </Link>
                    {doctor.qualification_disp && <p className="fs-13 text-gray-600 leading-snug">{doctor.qualification_disp}</p>}
                    {doctor.position && <p className="fs-13 text-gray-500 leading-snug">{doctor.position}</p>}
                    {doctor.specialists && <p className="fs-13 text-primary font-medium leading-snug">{doctor.specialists}</p>}
                    {doctor.branded_hospital && (
                        <span className="mt-1 inline-flex items-center gap-1 fs-12 font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-1.5 py-0.5">
                            <BiBuildings className="shrink-0" />{doctor.branded_hospital}
                        </span>
                    )}
                    <div className="mt-2 space-y-0.5">
                        {doctor.clinic && (
                            <p className="flex items-center gap-1.5 fs-13 text-gray-700 font-semibold">
                                <BiClinic className="text-primary shrink-0" />
                                <span className="truncate">{doctor.clinic}</span>
                            </p>
                        )}
                        {(doctor.locality || doctor.market_name) && (
                            <p className="flex items-center gap-1.5 fs-13 text-gray-500">
                                <BiSolidMap className="text-primary shrink-0" />
                                <span className="truncate">
                                    {[doctor.locality, doctor.market_name].filter(Boolean).map((part) => capitalizeFirstLetter(part)).join(', ')}
                                </span>
                            </p>
                        )}
                    </div>
                </div>

                {/* the availability and the action, pinned right so the eye can run down one column */}
                <div className="w-52 shrink-0 border-l border-gray-100 pl-4 flex flex-col">
                    {doctor.matched_consult_date ? (
                        <>
                            <span className="inline-flex items-center gap-1 fs-12 font-bold text-green-700 bg-green-50 border border-green-200 rounded-md px-1.5 py-0.5 w-fit">
                                <BiTimeFive className="shrink-0" />
                                {formatDateLabel(doctor.matched_consult_date.date)}
                            </span>
                            {slots.map((slot, i) => (
                                <span key={i} className="fs-12 text-gray-600 mt-0.5">{slot}</span>
                            ))}
                        </>
                    ) : doctor.display_consulting_timing && doctor.display_consulting_timing.length > 0 ? (
                        doctor.display_consulting_timing.slice(0, 2).map((dt, i) => (
                            <div key={i} className="fs-12 text-gray-600 leading-snug">
                                <span className="font-semibold flex items-center gap-1 text-gray-700">
                                    <BiTimeFive className="text-primary shrink-0" />{dt.label}
                                </span>
                                {dt.value.map((v, vi) => <span key={vi} className="block ml-4">{v}</span>)}
                            </div>
                        ))
                    ) : doctor.availability ? (
                        <span className="flex items-center gap-1 fs-13">
                            <BiTimeFive className="text-primary shrink-0" />
                            <span className="color-secondary font-semibold">{doctor.availability}</span>
                        </span>
                    ) : null}

                    {doctor.service_charge > 0 && (
                        <span className="mt-2 flex items-center fs-13 text-gray-700">
                            <span className="text-gray-400 ml-1">Fees</span>
                            <BiRupee className="shrink-0" />
                            <span className="font-bold">{doctor.service_charge}</span>
                        </span>
                    )}

                    <Link
                        href={detailUrl}
                        title={`Book an appointment with ${doctor.doctor_name}`}
                        className="mt-auto pt-3 block"
                    >
                        <span className="block w-full text-center bg-primary text-white font-semibold fs-14 rounded-lg py-2 hover:opacity-90 transition-opacity">
                            Book Appointment
                        </span>
                    </Link>
                </div>
            </div>
            {doctor.ldjson && (
                <Script type="application/ld+json" id={`ldjson-doctor-card-${doctor.doctor_id}-${doctor.clinic_id}`}>
                    {doctor.ldjson}
                </Script>
            )}
        </div>
    );
};

export default DoctorCard;
